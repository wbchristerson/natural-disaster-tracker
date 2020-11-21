from sqlalchemy import Column, String, Integer, create_engine
from flask_sqlalchemy import SQLAlchemy
import json
import os

database_path = os.environ['DATABASE_URL']
# database_path = "postgres://{}:{}@{}/{}".format(os.environ.get('MY_PG_USER'), os.environ.get('MY_PG_PWD'), 'localhost:5432', os.environ['MY_DATABASE_URL'])

# print("\n\ndatabase_path: ", database_path)
# print("\n\n")

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


'''
Disaster
'''
class Disaster(db.Model):
  __tablename__ = 'Disaster'

  id = Column(db.Integer, primary_key=True)
  informal_name = Column(String(50))
  official_name = Column(String(100))
  disaster_type = Column(Integer)

  def __init__(self, informal_name, official_name, disaster_type):
    self.informal_name = informal_name
    self.official_name = official_name
    self.disaster_type = disaster_type

  def format(self):
    return {
      'id': self.id,
      'informal_name': self.informal_name,
      'official_name': self.official_name,
      'disaster_type': self.disaster_type,
    }


'''
Observer
'''
class Observer(db.Model):
  __tablename__ = 'Observer'

  id = Column(db.Integer, parimary_key=True)
  username = Column(db.Integer, primary_key=True)
  photograph_url = Column(String(120), nullable=True)

  def __init__(self, username, photograph_url=None):
    self.username = username
    self.photograph_url = photograph_url
  
  def format(self):
    return {
      'id': self.id,
      'username': self.username,
      'photograph_url': self.photograph_url,
    }