import unittest
from unittest import mock
from app import create_app
import os
from models import setup_db, Observer, Disaster, NaturalDisasterEnum, WitnessReport
from flask_sqlalchemy import SQLAlchemy
import json
from datetime import datetime
import pytz


class SampleWillTestCase(unittest.TestCase):
    """This class represents the sample will test case"""

    def setUp(self):
        """Define test variables, initialize app; note: much of this code matches an
            earlier project that I completed -- the trivia API project"""
        self.app = create_app()
        self.app.secret_key = os.environ['SECRET_KEY']
        self.client = self.app.test_client
        self.database_name = "test-capstoneDB"
        self.database_path = "postgres://{}:{}@{}/{}".format(
            os.environ.get('MY_PG_USER'), os.environ.get('MY_PG_PWD'), 'localhost:5432',
            self.database_name)
        setup_db(self.app, self.database_path)

        with self.app.app_context():
            self.db = SQLAlchemy()
            self.db.init_app(self.app)
            self.db.create_all()

            observer_1 = Observer(
                "hurricane_tracker",
                "https://specials-images.forbesimg.com/imageserve/1130415291/960x0.jpg?fit=scale")
            self.db.session.add(observer_1)

            observer_2 = Observer(
                "safety_manager",
                "https://www.telegraph.co.uk/content/dam/news/2016/09/08/107667228_beech-tree-NEWS_trans_NvBQzQNjv4BqplGOf-dgG3z4gg9owgQTXEmhb5tXCQRHAvHRWfzHzHk.jpg"
            )
            self.db.session.add(observer_2)

            disaster_1 = Disaster(
                "The bad hurricane", "Hurricane-XYZ", NaturalDisasterEnum.HURRICANE,
                True, 0.0, 0.0
            )
            self.db.session.add(disaster_1)

            disaster_2 = Disaster(
                "The really bad hurricane", "Hurricane-123", NaturalDisasterEnum.HURRICANE,
                True, -76.0, 42.0
            )
            self.db.session.add(disaster_2)

            disaster_3 = Disaster(
                "A terrible tornado", "Tornado-987", NaturalDisasterEnum.TORNADO,
                False, -80.0, 38.8
            )
            self.db.session.add(disaster_3)
            self.db.session.commit()

            self.disaster_1_data = {
                "id": disaster_1.id,
                "informal_name": "The bad hurricane",
                "official_name": "Hurricane-XYZ",
                "disaster_type": "hurricane",
                "is_ongoing": True,
                "location": [0.0, 0.0],
                "people_affected": None,
                "severity": None,
                "first_observance": None,
                "last_observance": None,
                "num_reports": 0,
                "random_observer": None,
                "random_comment": None,
                "random_observer_url": None,
            }

            self.disaster_2_data = {
                "id": disaster_2.id,
                "informal_name": "The really bad hurricane",
                "official_name": "Hurricane-123",
                "disaster_type": "hurricane",
                "is_ongoing": True,
                "location": [-76.0, 42.0],
                "people_affected": 8000,
                "severity": 7.0,
                "first_observance": datetime(2018, 8, 23, 18, 31, 34).strftime("%a, %d %b %Y %H:%M:%S") + " GMT",
                "last_observance": datetime(2018, 8, 25, 23, 2, 24).strftime("%a, %d %b %Y %H:%M:%S") + " GMT",
                "num_reports": 2,
                "random_observer": mock.ANY,
                "random_comment": mock.ANY,
                "random_observer_url": mock.ANY,
            }

            self.disaster_3_data = {
                "id": disaster_3.id,
                "informal_name": "A terrible tornado",
                "official_name": "Tornado-987",
                "disaster_type": "tornado",
                "is_ongoing": False,
                "location": [-80.0, 38.8],
                "people_affected": None,
                "severity": None,
                "first_observance": None,
                "last_observance": None,
                "num_reports": 0,
                "random_observer": None,
                "random_comment": None,
                "random_observer_url": None,
            }

            self.observer_id_1 = observer_1.id
            self.observer_id_2 = observer_2.id

            witness_report_1 = WitnessReport(self.disaster_2_data["id"],
                self.observer_id_1, datetime(2018, 8, 23, 14, 31, 34), 8,
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgWBUS6RY8tdH1KgycMUKVY8HhvI7C6m_HkQ&usqp=CAU',
                "The amount of wind is quite severe!", 1200, -80.0, 32.8)
            self.db.session.add(witness_report_1)

            witness_report_2 = WitnessReport(self.disaster_2_data["id"],
                self.observer_id_2, datetime(2018, 8, 25, 19, 2, 24), 6,
                'https://s.abcnews.com/images/US/hurricane-laura-11-gty-llr-200827_1598555060545_hpMain_2_4x3_608.jpg',
                "Many people's homes are destroyed. There is great devastation.", 8000, -80.8, 32.6)
            self.db.session.add(witness_report_2)

            self.db.session.commit()


    def tearDown(self):
        """Executed after each test -- may be wasteful"""
        observer_1 = Observer.query.filter(Observer.id == self.observer_id_1).first()
        observer_2 = Observer.query.filter(Observer.id == self.observer_id_2).first()
        disaster_1 = Disaster.query.filter(Disaster.id == self.disaster_1_data["id"]).first()
        disaster_2 = Disaster.query.filter(Disaster.id == self.disaster_2_data["id"]).first()
        disaster_3 = Disaster.query.filter(Disaster.id == self.disaster_3_data["id"]).first()

        if observer_1:
            observer_1.delete()

        if observer_2:
            observer_2.delete()

        if disaster_1:
            disaster_1.delete()
        
        if disaster_2:
            disaster_2.delete()

        if disaster_3:
            disaster_3.delete()

    
    def test_get_general_disasters_success(self):
        """Test for successfully retrieving disasters"""
        res = self.client().get('/disasters')

        self.assertEqual(res.status_code, 200)

        data = json.loads(res.data)

        self.assertIn("total_disasters", data)
        self.assertIn("disasters", data)
        self.assertEqual(3, data["total_disasters"])
        self.assertDictEqual(self.disaster_1_data, data["disasters"][0])
        self.assertDictEqual(self.disaster_2_data, data["disasters"][1])
        self.assertDictEqual(self.disaster_3_data, data["disasters"][2])

    
    def test_get_general_disasters_failure(self):
        """Test for failure to retrieve disasters due to invalid page"""
        res = self.client().get('/disasters?page=-1')
        self.assertEqual(res.status_code, 422)
    

    def test_get_disasters_single_disaster_type_success(self):
        """Test for successfully retrieving disasters of a specific disaster_type"""
        res = self.client().get('/disasters?disaster_type=hurricane')

        self.assertEqual(res.status_code, 200)

        data = json.loads(res.data)

        self.assertIn("total_disasters", data)
        self.assertIn("disasters", data)
        self.assertEqual(2, data["total_disasters"])
        self.assertDictEqual(self.disaster_1_data, data["disasters"][0])
        self.assertDictEqual(self.disaster_2_data, data["disasters"][1])


    def test_get_disasters_single_disaster_type_failure(self):
        """Test for failure to retrieve disasters due to an unrecognized disaster_type"""
        res = self.client().get('/disasters?disaster_type=crisis')
        self.assertEqual(res.status_code, 404)


# Make tests executable
if __name__ == "__main__":
    unittest.main()