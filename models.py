from sqlalchemy import (
    Column,
    String,
    Integer,
    create_engine,
    ForeignKey,
    Boolean,
    Enum,
    DateTime,
    Float,
    func,
    TIMESTAMP
)
from sqlalchemy.orm import relationship
from flask_sqlalchemy import SQLAlchemy
import json
import os
import enum
import datetime
import pytz


database_path = os.environ['DATABASE_URL']
db = SQLAlchemy()

'''
setup_db(app)
    binds a flask application and a SQLAlchemy service
'''


def setup_db(app, database_path=database_path):
    app.config["SQLALCHEMY_DATABASE_URI"] = database_path
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.app = app
    db.init_app(app)
    db.create_all()


class NaturalDisasterEnum(str, enum.Enum):
    EARTHQUAKE: str = "earthquake"
    FLOOD: str = "flood"
    WILDFIRE: str = "wildfire"
    TORNADO: str = "tornado"
    HURRICANE: str = "hurricane"
    TSUNAMI: str = "tsunami"
    LANDSLIDE: str = "landslide"
    AVALANCHE: str = "avalanche"
    VOLCANO: str = "volcano"
    OTHER: str = "other"


'''
Base class including common functionality of all models
'''


class DisasterData(db.Model):
    __abstract__ = True

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def update(self):
        db.session.commit()


'''
Disaster
'''


class Disaster(DisasterData):
    __tablename__ = 'disasters'

    id = Column(Integer, primary_key=True)
    informal_name = Column(String(50), nullable=False)
    official_name = Column(String(100), unique=True, nullable=False)
    disaster_type = Column('disaster_type', Enum(
        NaturalDisasterEnum), nullable=False)
    witness_reports = relationship(
        'WitnessReport', backref="witness_report_disaster",
        cascade="all, delete, delete-orphan")
    is_ongoing = Column(Boolean, default=True, nullable=False)
    location_latitude = Column(Float, nullable=False)
    location_longitude = Column(Float, nullable=False)
    last_update_datetime = Column(TIMESTAMP(True), nullable=False)

    def __init__(self, informal_name, official_name, disaster_type, is_ongoing,
                 location_latitude, location_longitude):

        self.informal_name = informal_name
        self.official_name = official_name
        self.disaster_type = disaster_type
        self.is_ongoing = is_ongoing
        self.location_latitude = location_latitude
        self.location_longitude = location_longitude

    def insert(self):
        d = datetime.datetime.now()
        timezone = pytz.timezone("America/New_York")
        d_aware = timezone.localize(d)
        self.last_update_datetime = d_aware
        super(Disaster, self).insert()

    def update(self):
        d = datetime.datetime.now()
        timezone = pytz.timezone("America/New_York")
        d_aware = timezone.localize(d)
        self.last_update_datetime = d_aware
        super(Disaster, self).update()

    def format(self):
        return {
            'id': self.id,
            'informal_name': self.informal_name,
            'official_name': self.official_name,
            'disaster_type': self.disaster_type,
            'is_ongoing': self.is_ongoing,
            'location': (self.location_latitude, self.location_longitude),
        }


'''
Observer
'''


class Observer(DisasterData):
    __tablename__ = 'observers'

    id = Column(Integer, primary_key=True)
    username = Column(String(50), nullable=False, unique=True)
    auth0_id = Column(String(40), nullable=False, unique=True)
    photograph_url = Column(String(200), nullable=True)
    witness_reports = relationship(
        'WitnessReport', backref="witness_report_observer",
        cascade="all, delete, delete-orphan")

    def __init__(self, username, auth0_id, photograph_url=None):
        self.username = username
        self.auth0_id = auth0_id
        self.photograph_url = photograph_url

    def format(self):
        return {
            'id': self.id,
            'username': self.username,
            'auth0_id': self.auth0_id,
            'photograph_url': self.photograph_url,
        }


'''
WitnessReport
'''


class WitnessReport(DisasterData):
    __tablename__ = 'witnessreports'

    id = Column(Integer, primary_key=True)
    disaster_id = Column(Integer, ForeignKey('disasters.id'), nullable=False)
    observer_id = Column(Integer, ForeignKey('observers.id'), nullable=False)
    event_datetime = Column(TIMESTAMP(True), nullable=False)
    severity = Column(Integer, nullable=True)
    image_url = Column(String(250), nullable=True)
    comment = Column(String(500), nullable=True)
    people_affected = Column(Integer, default=0)
    location_latitude = Column(Float, nullable=True)
    location_longitude = Column(Float, nullable=True)
    last_update_datetime = Column(TIMESTAMP(True), nullable=False)

    def __init__(self, disaster_id, observer_id, event_datetime, severity,
                 image_url, comment, people_affected, location_latitude,
                 location_longitude):
        self.disaster_id = disaster_id
        self.observer_id = observer_id
        self.event_datetime = event_datetime
        self.severity = severity
        self.image_url = image_url
        self.comment = comment
        self.people_affected = people_affected
        self.location_latitude = location_latitude
        self.location_longitude = location_longitude

    def format(self):
        return {
            'id': self.id,
            'disaster_id': self.disaster_id,
            'observer_id': self.observer_id,
            'event_datetime': self.event_datetime,
            'severity': self.severity,
            'image_url': self.image_url,
            'comment': self.comment,
            'people_affected': self.people_affected,
            'location': (self.location_latitude, self.location_longitude),
        }
    
    def insert(self):
        d = datetime.datetime.now()
        timezone = pytz.timezone("America/New_York")
        d_aware = timezone.localize(d)
        self.last_update_datetime = d_aware
        super(WitnessReport, self).insert()
    
    def update(self):
        d = datetime.datetime.now()
        timezone = pytz.timezone("America/New_York")
        d_aware = timezone.localize(d)
        self.last_update_datetime = d_aware
        super(WitnessReport, self).update()

    @staticmethod
    def observer_join(disaster_id):
        reports = \
            db.session.query(WitnessReport).join(
                Observer, Observer.id == WitnessReport.observer_id).filter(
                    WitnessReport.disaster_id == disaster_id).order_by(WitnessReport.last_update_datetime.desc()).all()
        observers = db.session.query(Observer).join(
            WitnessReport, Observer.id == WitnessReport.observer_id).filter(
                WitnessReport.disaster_id == disaster_id).all()

        observer_map = dict()
        for observer in observers:
            observer_map[observer.id] = (
                observer.username, observer.photograph_url)

        return reports, observer_map
