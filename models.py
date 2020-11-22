from sqlalchemy import Column, String, Integer, create_engine, ForeignKey, Boolean, Enum, DateTime
from sqlalchemy.orm import relationship
from flask_sqlalchemy import SQLAlchemy
import json
import os
import enum

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


class NaturalDisasterEnum(enum.Enum):
  earthquake = 1
  flood = 2
  wildfire = 3
  tornado = 4
  hurricane = 5
  tsunami = 6
  landslide = 7
  avalanche = 8
  other = 9


'''
Disaster
'''
class Disaster(db.Model):
  __tablename__ = 'disasters'

  id = Column(Integer, primary_key=True)
  informal_name = Column(String(50))
  official_name = Column(String(100))
  disaster_type = Column('value', Enum(NaturalDisasterEnum))
  witness_reports = relationship('WitnessReport', backref="witness_report_disaster",
    cascade="all, delete, delete-orphan")
  is_ongoing = Column(Boolean, default=True)
  # location

  def __init__(self, informal_name, official_name, disaster_type, is_ongoing):
    self.informal_name = informal_name
    self.official_name = official_name
    self.disaster_type = disaster_type
    self.is_ongoing = is_ongoing

  def format(self):
    return {
      'id': self.id,
      'informal_name': self.informal_name,
      'official_name': self.official_name,
      'disaster_type': self.disaster_type,
      'is_ongoing': self.is_ongoing,
    }


'''
Observer
'''
class Observer(db.Model):
  __tablename__ = 'observers'

  id = Column(Integer, primary_key=True)
  username = Column(Integer, nullable=False)
  photograph_url = Column(String(120), nullable=True)
  witness_reports = relationship('WitnessReport', backref="witness_report_observer",
    cascade="all, delete, delete-orphan")

  def __init__(self, username, photograph_url=None):
    self.username = username
    self.photograph_url = photograph_url
  
  def format(self):
    return {
      'id': self.id,
      'username': self.username,
      'photograph_url': self.photograph_url,
    }


'''
WitnessReport
'''
class WitnessReport(db.Model):
  __tablename__ = 'witnessReports'

  id = Column(Integer, primary_key=True)
  disaster_id = Column(Integer, ForeignKey('disasters.id'), nullable=False)
  observer_id = Column(Integer, ForeignKey('observers.id'), nullable=False)
  event_datetime = Column(DateTime, nullable=False)
  severity = Column(Integer, nullable=True)
  image_url = Column(String(120), nullable=True)
  comment = Column(String(500), nullable=True)
  people_affected = Column(Integer, default=0)
  # location = Column(, nullable=False)

  def __init__(self, disaster_id, observer_id, event_datetime):
    self.disaster_id = disaster_id
    self.observer_id = observer_id
    self.event_datetime = event_datetime

  def __repr__(self):
    return {
      'id': self.id,
      'disaster_id': self.disaster_id,
      'observer_id': self.observer_id,
    }


