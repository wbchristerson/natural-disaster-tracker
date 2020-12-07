import unittest
from unittest import mock
from app import create_app
import os
from models import setup_db, Observer, Disaster, NaturalDisasterEnum, WitnessReport
from flask_sqlalchemy import SQLAlchemy
import json
from datetime import datetime
import pytz
from copy import copy


class SampleWillTestCase(unittest.TestCase):
    """This class represents the sample will test case"""

    def setUp(self):
        """Define test variables, initialize app; note: much of this code matches an
            earlier project that I completed -- the trivia API project"""

        self.maxDiff = None
        self.app = create_app()
        self.app.secret_key = os.environ['SECRET_KEY']
        self.client = self.app.test_client
        self.database_name = "test-capstoneDB"
        self.database_path = "postgres://{}:{}@{}/{}".format(
            os.environ.get('MY_PG_USER'), os.environ.get('MY_PG_PWD'), 'localhost:5432',
            self.database_name)
        setup_db(self.app, self.database_path)
        self.added_disaster_ids = []
        self.added_observer_ids = []

        with self.app.app_context():
            self.db = SQLAlchemy()
            self.db.init_app(self.app)
            self.db.create_all()

            observer_1 = Observer(
                "hurricane_tracker",
                "https://specials-images.forbesimg.com/imageserve/1130415291/960x0.jpg?fit=scale")
            observer_1.insert()

            observer_2 = Observer(
                "safety_manager",
                "https://www.telegraph.co.uk/content/dam/news/2016/09/08/107667228_beech-tree-NEWS_trans_NvBQzQNjv4BqplGOf-dgG3z4gg9owgQTXEmhb5tXCQRHAvHRWfzHzHk.jpg"
            )
            observer_2.insert()

            disaster_1 = Disaster(
                "The bad hurricane", "Hurricane-XYZ", NaturalDisasterEnum.HURRICANE,
                True, 0.0, 0.0
            )
            disaster_1.insert()

            disaster_2 = Disaster(
                "The really bad hurricane", "Hurricane-123", NaturalDisasterEnum.HURRICANE,
                True, -76.0, 42.0
            )
            disaster_2.insert()

            disaster_3 = Disaster(
                "A terrible tornado", "Tornado-987", NaturalDisasterEnum.TORNADO,
                False, -80.0, 38.8
            )
            disaster_3.insert()

            self.disaster_1_data = {
                "id": disaster_1.id,
                "informal_name": "The bad hurricane",
                "official_name": "Hurricane-XYZ",
                "disaster_type": "hurricane",
                "is_ongoing": True,
                "location": [0.0, 0.0],
                "people_affected": None,
                "average_severity": None,
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
                "average_severity": 7.0,
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
                "average_severity": None,
                "first_observance": None,
                "last_observance": None,
                "num_reports": 0,
                "random_observer": None,
                "random_comment": None,
                "random_observer_url": None,
            }

            self.observer_1_data = observer_1.format()
            self.observer_2_data = observer_2.format()

            witness_report_1 = WitnessReport(self.disaster_2_data["id"],
                self.observer_1_data["id"], datetime(2018, 8, 23, 14, 31, 34), 8,
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgWBUS6RY8tdH1KgycMUKVY8HhvI7C6m_HkQ&usqp=CAU',
                "The amount of wind is quite severe!", 1200, -80.0, 32.8)
            witness_report_1.insert()

            witness_report_2 = WitnessReport(self.disaster_2_data["id"],
                self.observer_2_data["id"], datetime(2018, 8, 25, 19, 2, 24), 6,
                'https://s.abcnews.com/images/US/hurricane-laura-11-gty-llr-200827_1598555060545_hpMain_2_4x3_608.jpg',
                "Many people's homes are destroyed. There is great devastation.", 8000, -80.8, 32.6)
            witness_report_2.insert()

            self.witness_report_1_data = witness_report_1.format()
            self.witness_report_2_data = witness_report_2.format()


    def tearDown(self):
        """Executed after each test -- may be wasteful"""
        observer_1 = Observer.query.filter(Observer.id == self.observer_1_data["id"]).first()
        observer_2 = Observer.query.filter(Observer.id == self.observer_2_data["id"]).first()
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

        for id in self.added_disaster_ids:
            inserted_disaster = Disaster.query.filter(Disaster.id == id).first()
            inserted_disaster.delete()

        for id in self.added_observer_ids:
            inserted_observer = Observer.query.filter(Observer.id == id).first()
            inserted_observer.delete()

    
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
    

    def test_get_disasters_single_type_success(self):
        """Test for successfully retrieving disasters of a specific disaster_type"""
        res = self.client().get('/disasters?disaster_type=hurricane')
        self.assertEqual(res.status_code, 200)
        data = json.loads(res.data)

        self.assertIn("total_disasters", data)
        self.assertIn("disasters", data)
        self.assertEqual(2, data["total_disasters"])
        self.assertDictEqual(self.disaster_1_data, data["disasters"][0])
        self.assertDictEqual(self.disaster_2_data, data["disasters"][1])


    def test_get_disasters_single_type_failure(self):
        """Test for failure to retrieve disasters due to an unrecognized disaster_type"""
        res = self.client().get('/disasters?disaster_type=crisis')
        self.assertEqual(res.status_code, 404)


    def test_get_single_disaster_no_reports_success(self):
        """Test for successfully retrieving the details of a specific disaster which 
            has no reports"""
        res = self.client().get('/disasters/' + str(self.disaster_1_data["id"]))
        self.assertEqual(res.status_code, 200)
        data = json.loads(res.data)

        reports_data = copy(self.disaster_1_data)
        del reports_data["random_observer"]
        del reports_data["random_comment"]
        del reports_data["random_observer_url"]
        reports_data["reports"] = []

        self.assertDictEqual(reports_data, data)


    def test_get_single_disaster_with_reports_success(self):
        """Test for successfully retrieving the details of a specific disaster which
            includes reports"""
        res = self.client().get('/disasters/' + str(self.disaster_2_data["id"]))
        self.assertEqual(res.status_code, 200)
        data = json.loads(res.data)

        reports_data = copy(self.disaster_2_data)
        del reports_data["random_observer"]
        del reports_data["random_comment"]
        del reports_data["random_observer_url"]

        reports_data["reports"] = [
            self.witness_report_1_data,
            self.witness_report_2_data
        ]

        reports_data["reports"][0]["location"] = list(reports_data["reports"][0]["location"])
        reports_data["reports"][0]["username"] = self.observer_1_data["username"]
        reports_data["reports"][0]["user_photograph_url"] = self.observer_1_data["photograph_url"]
        reports_data["reports"][0]["event_datetime"] = datetime(2018, 8, 23, 18, 31, 34).strftime("%a, %d %b %Y %H:%M:%S") + " GMT"
        del reports_data["reports"][0]["disaster_id"]

        reports_data["reports"][1]["location"] = list(reports_data["reports"][1]["location"])
        reports_data["reports"][1]["username"] = self.observer_2_data["username"]
        reports_data["reports"][1]["user_photograph_url"] = self.observer_2_data["photograph_url"]
        reports_data["reports"][1]["event_datetime"] = datetime(2018, 8, 25, 23, 2, 24).strftime("%a, %d %b %Y %H:%M:%S") + " GMT"
        del reports_data["reports"][1]["disaster_id"]

        self.assertDictEqual(reports_data, data)
    

    def test_get_single_disaster_failure(self):
        """Test for failure to retrieve details of single disaster"""
        res = self.client().get('/disasters/0')
        self.assertEqual(res.status_code, 404)


    def test_insert_disaster_success(self):
        """Test for successfully inserting a new disaster"""
        disaster_info = {
            "informal_name": "Dangerous Volcanic Eruption",
            "official_name": "Volcano Eruption-1843",
            "disaster_type": "volcano",
            "is_ongoing": True,
            "location_latitude": 20.669765,
            "location_longitude":  -156.339161,
        }
        res = self.client().post('/disasters', data=json.dumps(disaster_info), headers={'Content-Type': 'application/json'})
        self.assertEqual(200, res.status_code)
        data = json.loads(res.data)

        self.added_disaster_ids.append(data["id"])
        matching_disaster = Disaster.query.filter(Disaster.id == data["id"]).first()

        self.assertIsNotNone(matching_disaster)
        self.assertEqual(disaster_info["informal_name"], matching_disaster.informal_name)
        self.assertEqual(disaster_info["official_name"], matching_disaster.official_name)
        self.assertEqual(disaster_info["disaster_type"], matching_disaster.disaster_type)
        self.assertEqual(disaster_info["is_ongoing"], matching_disaster.is_ongoing)
        self.assertEqual(disaster_info["location_latitude"], matching_disaster.location_latitude)
        self.assertEqual(disaster_info["location_longitude"], matching_disaster.location_longitude)


    def test_insert_disaster_no_location_failure(self):
        """Test for a failed attempt to insert a disaster due to no latitude or longitude being given"""
        disaster_info = {
            "informal_name": "Dangerous Volcanic Eruption",
            "official_name": "Volcano Eruption-1843",
            "disaster_type": "volcano",
            "is_ongoing": True,
        }
        res = self.client().post('/disasters', data=json.dumps(disaster_info), headers={'Content-Type': 'application/json'})
        self.assertEqual(400, res.status_code)

    
    def test_insert_disaster_duplicate_failure(self):
        """Test for a failed attempt to insert a disaster due to no latitude or longitude being given"""
        disaster_data = {
            "informal_name": "Dangerous Volcanic Eruption",
            "official_name": "Volcano Eruption-1843",
            "disaster_type": "volcano",
            "is_ongoing": True,
            "location_latitude": 20.669765,
            "location_longitude":  -156.339161,
        }
        res1 = self.client().post('/disasters', data=json.dumps(disaster_data), headers={'Content-Type': 'application/json'})
        self.assertEqual(200, res1.status_code)
        data = json.loads(res1.data)
        self.added_disaster_ids.append(data["id"])

        res2 = self.client().post('/disasters', data=json.dumps(disaster_data), headers={'Content-Type': 'application/json'})
        self.assertEqual(400, res2.status_code)


    def test_insert_observer_success(self):
        """Test for successfully inserting a new observer"""
        observer_data = {
            "username": "disaster_recorder",
            "photograph_url": "https://ichef.bbci.co.uk/images/ic/960x960/p08634k6.jpg"
        }
        res = self.client().post('/observers', data=json.dumps(observer_data), headers={'Content-Type': 'application/json'})
        self.assertEqual(200, res.status_code)
        data = json.loads(res.data)
        self.added_observer_ids.append(data["id"])

        matching_observer = Observer.query.filter(Observer.id == data["id"]).first()

        self.assertIsNotNone(matching_observer)
        self.assertEqual(observer_data["username"], matching_observer.username)
        self.assertEqual(observer_data["photograph_url"], matching_observer.photograph_url)


    def test_insert_observer_no_username_failure(self):
        """Test for failing to insert a new observer due to the lack of a username"""
        observer_data = {
            "photograph_url": "https://www.gardeningknowhow.com/wp-content/uploads/2017/07/hardwood-tree.jpg",
        }
        res = self.client().post('/observers', data=json.dumps(observer_data), headers={'Content-Type': 'application/json'})
        self.assertEqual(400, res.status_code)
        matching_observer = Observer.query.filter(Observer.photograph_url == observer_data["photograph_url"]).first()
        self.assertIsNone(matching_observer)


    def test_insert_observer_duplicate_failure(self):
        """Test for failing to insert a new observer due to a duplicate username"""
        observer_data = {
            "username": "hurricane_tracker",
            "photograph_url": "https://www.gardeningknowhow.com/wp-content/uploads/2017/07/hardwood-tree.jpg"
        }
        res = self.client().post('/observers', data=json.dumps(observer_data), headers={'Content-Type': 'application/json'})
        self.assertEqual(400, res.status_code)


    def test_insert_witness_report_success(self):
        """Test for successfully inserting a new witness report"""
        # curl -X POST http://127.0.0.1:5000/witnessreports --header "Content-Type: application/json" --data '{"disaster_id": 2,  "observer_id": 1, "event_datetime": "2019-07-31 09:01:47-04", "severity": 3, "image_url": "https://hgtvhome.sndimg.com/content/dam/images/grdn/fullset/2012/8/20/0/0403_051.jpg.rend.hgtvcom.1280.1920.suffix/1452646441575.jpeg", "comment": "The disaster is quite bad", "people_affected": 1300, "location_latitude": 23.4, "location_longitude": -10.3 }'
        
    


# Make tests executable
if __name__ == "__main__":
    unittest.main()