import unittest
from unittest import mock
from app import create_app
import os
from models import (
    setup_db,
    Observer,
    Disaster,
    NaturalDisasterEnum,
    WitnessReport
)
from flask_sqlalchemy import SQLAlchemy
import json
from datetime import datetime
import pytz
from copy import copy
import psycopg2


class SampleWillTestCase(unittest.TestCase):
    """This class represents the sample will test case"""

    def setUp(self):
        """Define test variables, initialize app; note: much of this code
        matches an earlier project that I completed -- the trivia API project
        """

        self.maxDiff = None
        self.app = create_app()
        self.app.secret_key = os.environ['SECRET_KEY']
        self.client = self.app.test_client
        self.database_name = "test-capstoneDB"
        self.database_path = "postgres://{}:{}@{}/{}".format(
            os.environ.get('MY_PG_USER'), os.environ.get(
                'MY_PG_PWD'), 'localhost:5432',
            self.database_name)
        setup_db(self.app, self.database_path)
        self.added_disaster_ids = []
        self.added_observer_ids = []
        self.headers = {
            'Authorization': 'bearer ' + os.environ['TOKEN'],
            'Content-Type': 'application/json', 'Token': os.environ['TOKEN']}

        with self.app.app_context():
            self.db = SQLAlchemy()
            self.db.init_app(self.app)
            self.db.create_all()

            observer_1 = Observer(
                "hurricane_tracker",
                "https://specials-images.forbesimg.com/imageserve/11304" +
                "15291/960x0.jpg?fit=scale")
            observer_1.insert()

            observer_2 = Observer(
                "safety_manager",
                "https://www.telegraph.co.uk/content/dam/news/2016/09/08/" +
                "107667228_beech-tree-NEWS_trans_NvBQzQNjv4BqplGOf-dgG3z4" +
                "gg9owgQTXEmhb5tXCQRHAvHRWfzHzHk.jpg"
            )
            observer_2.insert()

            disaster_1 = Disaster(
                "The bad hurricane", "Hurricane-XYZ",
                NaturalDisasterEnum.HURRICANE, True, 0.0, 0.0
            )
            disaster_1.insert()

            disaster_2 = Disaster(
                "The really bad hurricane", "Hurricane-123",
                NaturalDisasterEnum.HURRICANE, True, -76.0, 42.0
            )
            disaster_2.insert()

            disaster_3 = Disaster(
                "A terrible tornado", "Tornado-987",
                NaturalDisasterEnum.TORNADO, False, -80.0, 38.8
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
                "first_observance": datetime(2018, 8, 23, 18, 31, 34).strftime(
                    "%a, %d %b %Y %H:%M:%S") + " GMT",
                "last_observance": datetime(2018, 8, 25, 23, 2, 24).strftime(
                    "%a, %d %b %Y %H:%M:%S") + " GMT",
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

            witness_report_1 = WitnessReport(
                self.disaster_2_data["id"],
                self.observer_1_data["id"],
                datetime(2018, 8, 23, 14, 31, 34),
                8,
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgWBU' +
                'S6RY8tdH1KgycMUKVY8HhvI7C6m_HkQ&usqp=CAU',
                "The wind speed is quite severe!", 1200, -80.0, 32.8)
            witness_report_1.insert()

            witness_report_2 = WitnessReport(
                self.disaster_2_data["id"],
                self.observer_2_data["id"],
                datetime(2018, 8, 25, 19, 2, 24),
                6,
                'https://s.abcnews.com/images/US/hurricane-laura-11-gty-llr-' +
                '200827_1598555060545_hpMain_2_4x3_608.jpg',
                "Many people's homes are destroyed. There is devastation.",
                8000, -80.8, 32.6)
            witness_report_2.insert()

            self.witness_report_1_data = witness_report_1.format()
            self.witness_report_2_data = witness_report_2.format()

    def tearDown(self):
        """Executed after each test -- may be wasteful"""
        observer_1 = Observer.query.filter(
            Observer.id == self.observer_1_data["id"]).first()
        observer_2 = Observer.query.filter(
            Observer.id == self.observer_2_data["id"]).first()
        disaster_1 = Disaster.query.filter(
            Disaster.id == self.disaster_1_data["id"]).first()
        disaster_2 = Disaster.query.filter(
            Disaster.id == self.disaster_2_data["id"]).first()
        disaster_3 = Disaster.query.filter(
            Disaster.id == self.disaster_3_data["id"]).first()

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
            inserted_disaster = Disaster.query.filter(
                Disaster.id == id).first()
            inserted_disaster.delete()

        for id in self.added_observer_ids:
            inserted_observer = Observer.query.filter(
                Observer.id == id).first()
            inserted_observer.delete()

    def test_get_general_disasters_success(self):
        """Test for successfully retrieving disasters"""
        res = self.client().get('/api/disasters')

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
        res = self.client().get('/api/disasters?page=-1')
        self.assertEqual(res.status_code, 422)

    def test_get_disasters_single_type_success(self):
        """Test for successfully retrieving disasters of a specific
        disaster_type
        """
        res = self.client().get('/api/disasters?disaster_type=hurricane')
        self.assertEqual(res.status_code, 200)
        data = json.loads(res.data)

        self.assertIn("total_disasters", data)
        self.assertIn("disasters", data)
        self.assertEqual(2, data["total_disasters"])
        self.assertDictEqual(self.disaster_1_data, data["disasters"][0])
        self.assertDictEqual(self.disaster_2_data, data["disasters"][1])

    def test_get_disasters_single_type_failure(self):
        """Test for failure to retrieve disasters due to an unrecognized
        disaster_type
        """
        res = self.client().get('/api/disasters?disaster_type=crisis')
        self.assertEqual(res.status_code, 404)

    def test_get_single_disaster_no_reports_success(self):
        """Test for successfully retrieving the details of a specific disaster
        which has no reports"""
        res = self.client().get(
            '/api/disasters/' + str(self.disaster_1_data["id"]))
        self.assertEqual(res.status_code, 200)
        data = json.loads(res.data)

        reports_data = copy(self.disaster_1_data)
        del reports_data["random_observer"]
        del reports_data["random_comment"]
        del reports_data["random_observer_url"]
        reports_data["reports"] = []

        self.assertDictEqual(reports_data, data)

    def test_get_single_disaster_with_reports_success(self):
        """Test for successfully retrieving the details of a specific disaster
        which includes reports"""
        res = self.client().get(
            '/api/disasters/' + str(self.disaster_2_data["id"]))
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

        reports_data["reports"][0]["location"] = list(
            reports_data["reports"][0]["location"])
        reports_data["reports"][0]["username"] = \
            self.observer_1_data["username"]
        reports_data["reports"][0]["user_photograph_url"] = \
            self.observer_1_data["photograph_url"]
        reports_data["reports"][0]["event_datetime"] = datetime(
            2018, 8, 23, 18, 31, 34).strftime("%a, %d %b %Y %H:%M:%S") + " GMT"
        del reports_data["reports"][0]["disaster_id"]

        reports_data["reports"][1]["location"] = list(
            reports_data["reports"][1]["location"])
        reports_data["reports"][1]["username"] = \
            self.observer_2_data["username"]
        reports_data["reports"][1]["user_photograph_url"] = \
            self.observer_2_data["photograph_url"]
        reports_data["reports"][1]["event_datetime"] = datetime(
            2018, 8, 25, 23, 2, 24).strftime("%a, %d %b %Y %H:%M:%S") + " GMT"
        del reports_data["reports"][1]["disaster_id"]

        self.assertDictEqual(reports_data, data)

    def test_get_single_disaster_failure(self):
        """Test for failure to retrieve details of single disaster"""
        res = self.client().get('/api/disasters/0')
        self.assertEqual(res.status_code, 404)

    def test_insert_disaster_success(self):
        """Test for successfully inserting a new disaster"""
        disaster_info = {
            "informal_name": "Dangerous Volcanic Eruption",
            "official_name": "Volcano Eruption-1843",
            "disaster_type": "volcano",
            "is_ongoing": True,
            "location_latitude": 20.669765,
            "location_longitude": -156.339161,
        }
        res = self.client().post(
            '/api/disasters', data=json.dumps(disaster_info),
            headers=self.headers)
        self.assertEqual(200, res.status_code)
        data = json.loads(res.data)

        self.added_disaster_ids.append(data["id"])
        matching_disaster = Disaster.query.filter(
            Disaster.id == data["id"]).first()

        self.assertIsNotNone(matching_disaster)
        self.assertEqual(
            disaster_info["informal_name"], matching_disaster.informal_name)
        self.assertEqual(
            disaster_info["official_name"], matching_disaster.official_name)
        self.assertEqual(
            disaster_info["disaster_type"], matching_disaster.disaster_type)
        self.assertEqual(disaster_info["is_ongoing"],
                         matching_disaster.is_ongoing)
        self.assertEqual(
            disaster_info["location_latitude"],
            matching_disaster.location_latitude)
        self.assertEqual(
            disaster_info["location_longitude"],
            matching_disaster.location_longitude)

    def test_insert_disaster_no_location_failure(self):
        """Test for a failed attempt to insert a disaster due to no latitude or
        longitude being given"""
        disaster_info = {
            "informal_name": "Dangerous Volcanic Eruption",
            "official_name": "Volcano Eruption-1843",
            "disaster_type": "volcano",
            "is_ongoing": True,
        }
        res = self.client().post(
            '/api/disasters', data=json.dumps(disaster_info),
            headers=self.headers)
        self.assertEqual(400, res.status_code)

    def test_insert_disaster_duplicate_failure(self):
        """Test for a failed attempt to insert a disaster due to no latitude or
        longitude being given"""
        disaster_data = {
            "informal_name": "Dangerous Volcanic Eruption",
            "official_name": "Volcano Eruption-1843",
            "disaster_type": "volcano",
            "is_ongoing": True,
            "location_latitude": 20.669765,
            "location_longitude": -156.339161,
        }
        res1 = self.client().post(
            '/api/disasters', data=json.dumps(disaster_data),
            headers=self.headers)
        self.assertEqual(200, res1.status_code)
        data = json.loads(res1.data)
        self.added_disaster_ids.append(data["id"])

        res2 = self.client().post(
            '/api/disasters', data=json.dumps(disaster_data),
            headers=self.headers)
        self.assertEqual(400, res2.status_code)

    def test_insert_observer_success(self):
        """Test for successfully inserting a new observer"""
        observer_data = {
            "username": "disaster_recorder",
            "photograph_url": "https://ichef.bbci.co.uk/images/ic/960x960/" +
            "p08634k6.jpg"
        }
        res = self.client().post(
            '/api/observers', data=json.dumps(observer_data),
            headers=self.headers)
        self.assertEqual(200, res.status_code)
        data = json.loads(res.data)
        self.added_observer_ids.append(data["id"])

        matching_observer = Observer.query.filter(
            Observer.id == data["id"]).first()

        self.assertIsNotNone(matching_observer)
        self.assertEqual(observer_data["username"], matching_observer.username)
        self.assertEqual(
            observer_data["photograph_url"], matching_observer.photograph_url)

    def test_insert_observer_no_username_failure(self):
        """Test for failing to insert a new observer due to the lack of a
        username"""
        observer_data = {
            "photograph_url": "https://www.gardeningknowhow.com/wp-content/" +
            "uploads/2017/07/hardwood-tree.jpg",
        }
        res = self.client().post(
            '/api/observers', data=json.dumps(observer_data),
            headers=self.headers)
        self.assertEqual(400, res.status_code)
        matching_observer = Observer.query.filter(
            Observer.photograph_url == observer_data["photograph_url"]).first()
        self.assertIsNone(matching_observer)

    def test_insert_observer_duplicate_failure(self):
        """Test for failing to insert a new observer due to a duplicate
        username"""
        observer_data = {
            "username": "hurricane_tracker",
            "photograph_url": "https://www.gardeningknowhow.com/wp-content/" +
            "uploads/2017/07/hardwood-tree.jpg"
        }
        res = self.client().post(
            '/api/observers', data=json.dumps(observer_data),
            headers=self.headers)
        self.assertEqual(400, res.status_code)

    def test_insert_witness_report_success(self):
        """Test for successfully inserting a new witness report"""
        report_data = {
            "disaster_id": self.disaster_1_data["id"],
            "observer_id": self.observer_1_data["id"],
            "event_datetime": "2019-07-31 09:01:47-04",
            "severity": 9,
            "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:" +
            "ANd9GcSxuuXdroSPZEb_Y9vDdBYpt8daNclg_Vj6bQ&usqp=CAU",
            "comment": "The damage caused by the hurricane is quite serious.",
            "people_affected": 12000,
            "location_latitude": -80.0,
            "location_longitude": -30.4,
        }
        res = self.client().post('/api/witnessreports',
                                 data=json.dumps(report_data),
                                 headers=self.headers)
        self.assertEqual(200, res.status_code)

        data = json.loads(res.data)

        matching_report = WitnessReport.query.filter(
            WitnessReport.id == data["id"]).first()

        self.assertIsNotNone(matching_report)
        self.assertEqual(report_data["disaster_id"],
                         matching_report.disaster_id)
        self.assertEqual(report_data["observer_id"],
                         matching_report.observer_id)
        self.assertEqual(
            report_data["event_datetime"],
            matching_report.event_datetime.strftime(
                "%Y-%m-%d %H:%M:%S%z")[:-2])
        self.assertEqual(report_data["severity"], matching_report.severity)
        self.assertEqual(report_data["image_url"], matching_report.image_url)
        self.assertEqual(report_data["comment"], matching_report.comment)
        self.assertEqual(report_data["people_affected"],
                         matching_report.people_affected)
        self.assertEqual(report_data["location_latitude"],
                         matching_report.location_latitude)
        self.assertEqual(
            report_data["location_longitude"],
            matching_report.location_longitude)

    def test_insert_witness_report_missing_disaster_id_failure(self):
        """Test for failing to insert a new witness report because a disaster
        id has not been provided"""
        report_data = {
            "observer_id": self.observer_1_data["id"],
            "event_datetime": "2019-07-31 09:01:47-04",
            "severity": 9,
            "image_url": "https://encrypted-tbn0.gstatic.com/images?q=" +
            "tbn:ANd9GcSxuuXdroSPZEb_Y9vDdBYpt8daNclg_Vj6bQ&usqp=CAU",
            "comment": "The damage caused by the hurricane is quite serious.",
            "people_affected": 12000,
            "location_latitude": -80.0,
            "location_longitude": -30.4,
        }
        res = self.client().post('/api/witnessreports',
                                 data=json.dumps(report_data),
                                 headers=self.headers)
        self.assertEqual(400, res.status_code)

    def test_update_disaster_success(self):
        """Test for successfully updating a disaster"""
        update_data = {
            "id": self.disaster_1_data["id"],
            "informal_name": "The bad tornado",
            "official_name": "Tornado-XYZ",
            "disaster_type": "tornado",
            "is_ongoing": True,
            "location_latitude": 38.4,
            "location_longitude": -86.5,
        }
        res = self.client().patch(
            '/api/disasters', data=json.dumps(update_data),
            headers=self.headers)

        self.assertEqual(200, res.status_code)
        data = json.loads(res.data)

        self.assertEqual(update_data["id"], data["id"])
        self.assertEqual(update_data["informal_name"], data["informal_name"])
        self.assertEqual(update_data["official_name"], data["official_name"])
        self.assertEqual(update_data["disaster_type"], data["disaster_type"])
        self.assertEqual(update_data["is_ongoing"], data["is_ongoing"])
        self.assertSequenceEqual((update_data["location_latitude"],
                                  update_data["location_longitude"]),
                                 data["location"])

        matching_disaster = Disaster.query.filter(
            Disaster.id == update_data["id"]).first()

        self.assertIsNotNone(matching_disaster)
        self.assertEqual(update_data["id"], matching_disaster.id)
        self.assertEqual(update_data["informal_name"],
                         matching_disaster.informal_name)
        self.assertEqual(update_data["official_name"],
                         matching_disaster.official_name)
        self.assertEqual(update_data["disaster_type"],
                         matching_disaster.disaster_type)
        self.assertEqual(update_data["is_ongoing"],
                         matching_disaster.is_ongoing)
        self.assertEqual(update_data["location_latitude"],
                         matching_disaster.location_latitude)
        self.assertEqual(
            update_data["location_longitude"],
            matching_disaster.location_longitude)

    def test_update_disaster_no_provided_id_failure(self):
        """Test for failure to update a disaster because no id is provided in
        update data"""
        update_data = {
            "informal_name": "The bad tornado",
            "official_name": "Tornado-XYZ",
            "disaster_type": "tornado",
            "is_ongoing": True,
            "location_latitude": 38.4,
            "location_longitude": -86.5,
        }
        res = self.client().patch(
            '/api/disasters', data=json.dumps(update_data),
            headers=self.headers)
        self.assertEqual(400, res.status_code)

    def test_update_disaster_no_matching_id_failure(self):
        """Test for failure to update a disaster because there is no disaster
        with a matching id"""
        update_data = {
            "id": 0,
            "informal_name": "The bad tornado",
            "official_name": "Tornado-XYZ",
            "disaster_type": "tornado",
            "is_ongoing": True,
            "location_latitude": 38.4,
            "location_longitude": -86.5,
        }
        res = self.client().patch(
            '/api/disasters', data=json.dumps(update_data),
            headers=self.headers)
        self.assertEqual(404, res.status_code)

    def test_update_disaster_invalid_type_failure(self):
        """Test for failure to update a disaster because the provided type is
        not valid"""
        update_data = {
            "id": self.disaster_1_data["id"],
            "informal_name": "The bad tornado",
            "official_name": "Tornado-XYZ",
            "disaster_type": "power outage",
            "is_ongoing": True,
            "location_latitude": 38.4,
            "location_longitude": -86.5,
        }
        res = self.client().patch(
            '/api/disasters', data=json.dumps(update_data),
            headers=self.headers)
        self.assertEqual(422, res.status_code)

    def test_retrieve_observers_success(self):
        """Test for successfully retrieving the first page of observers"""
        res = self.client().get('/api/observers', headers=self.headers)
        self.assertEqual(200, res.status_code)
        data = json.loads(res.data)

        expected_result = {
            "observers": [self.observer_1_data, self.observer_2_data],
        }
        self.assertDictEqual(expected_result, data)

    def test_retrieve_observers_invalid_page_failure(self):
        """Test for failure to retrieve data about observers for invalid page
        """
        res = self.client().get('/api/observers?page=-1', headers=self.headers)
        self.assertEqual(422, res.status_code)

    def test_update_witness_report_success(self):
        """Test for successfully updating a witness report"""
        update_data = {
            "id": self.witness_report_1_data["id"],
            "event_datetime": "2019-07-31 09:01:47-04",
            "severity": 4,
            "image_url": "https://hgtvhome.sndimg.com/content/dam/images/" +
            "grdn/fullset/2012/8/20/0/0403_051.jpg.rend.hgtvcom.1280." +
            "1920.suffix/1452646441575.jpeg",
            "comment": "The disaster is quite bad.",
            "people_affected": 1300,
            "location_latitude": 23.4,
            "location_longitude": -10.3,
        }
        res = self.client().patch('/api/witnessreports',
                                  data=json.dumps(update_data),
                                  headers=self.headers)
        self.assertEqual(200, res.status_code)

        update_data["disaster_id"] = self.witness_report_1_data["disaster_id"]
        update_data["observer_id"] = self.witness_report_1_data["observer_id"]
        update_data["event_datetime"] = 'Wed, 31 Jul 2019 13:01:47 GMT'
        update_data["location"] = [
            update_data["location_latitude"],
            update_data["location_longitude"]
        ]
        del update_data["location_latitude"]
        del update_data["location_longitude"]

        data = json.loads(res.data)
        self.assertDictEqual(update_data, data)

        matching_witness_report = WitnessReport.query.filter(
            WitnessReport.id == update_data["id"]).first()
        update_data["location"] = tuple(update_data["location"])
        update_data["event_datetime"] = datetime(
            2019, 7, 31, 9, 1, 47, 0, psycopg2.tz.FixedOffsetTimezone(
                offset=-240, name=None))

        self.assertDictEqual(update_data, matching_witness_report.format())

    def test_update_witness_report_no_id_failure(self):
        """Test for failure to update a witness report due to a lack of an id
        """
        update_data = {
            "event_datetime": "2019-07-31 09:01:47-04",
            "severity": 4,
            "image_url": "https://hgtvhome.sndimg.com/content/dam/images/" +
            "grdn/fullset/2012/8/20/0/0403_051.jpg.rend.hgtvcom.1280." +
            "1920.suffix/1452646441575.jpeg",
            "comment": "The disaster is quite bad.",
            "people_affected": 1300,
            "location_latitude": 23.4,
            "location_longitude": -10.3,
        }
        res = self.client().patch('/api/witnessreports',
                                  data=json.dumps(update_data),
                                  headers=self.headers)
        self.assertEqual(400, res.status_code)

    def test_update_witness_report_no_match_failure(self):
        """Test for failure to update a witness report due to a lack of a
        matching witness report"""
        update_data = {
            "id": 0,
            "event_datetime": "2019-07-31 09:01:47-04",
            "severity": 4,
            "image_url": "https://hgtvhome.sndimg.com/content/dam/images/" +
            "grdn/fullset/2012/8/20/0/0403_051.jpg.rend.hgtvcom.1280." +
            "1920.suffix/1452646441575.jpeg",
            "comment": "The disaster is quite bad.",
            "people_affected": 1300,
            "location_latitude": 23.4,
            "location_longitude": -10.3,
        }
        res = self.client().patch('/api/witnessreports',
                                  data=json.dumps(update_data),
                                  headers=self.headers)
        self.assertEqual(404, res.status_code)

    def test_delete_witness_report_success(self):
        """Test for successfully deleting a witness report"""
        delete_id = self.witness_report_1_data["id"]
        res = self.client().delete(
            '/api/witnessreports/' + str(delete_id),
            headers=self.headers)
        self.assertEqual(200, res.status_code)

        data = json.loads(res.data)
        self.assertIn("success", data)
        self.assertTrue(data["success"])
        self.assertIn("delete", data)
        self.assertEqual(delete_id, int(data["delete"]))

        matching_witness_report = WitnessReport.query.filter(
            WitnessReport.id == delete_id).first()
        self.assertIsNone(matching_witness_report)

    def test_delete_witness_report_no_matching_id_failure(self):
        """Test for failure to delete a witness report because there is no
        matching witness report id"""
        res = self.client().delete(
            '/api/witnessreports/0', headers=self.headers)
        self.assertEqual(400, res.status_code)

    # Authorization tests

    # disaster administrator tests

    def test_retrieve_observers_no_authorization_failure(self):
        """Test for failure to retrieve data about observers due to no
        authorization parameter being present"""
        res = self.client().get(
            '/api/observers', headers={'Content-Type': 'application/json'})
        self.assertEqual(401, res.status_code)

    def test_retrieve_observers_expired_token_failure(self):
        """Test for failure to retrieve data about observers due to expired
        token"""
        res = self.client().get('/api/observers', headers={
            'Content-Type': 'application/json',
            'Authorization': 'bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsI' +
            'mtpZCI6Im4yWlN4YWR2T1F4V2xzMkxPTF9DRCJ9.eyJpc3MiOiJodHRwc' +
            'zovL2Rldi05eG81Z2RmYy51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aD' +
            'B8NWY3ZmE3YmY2YmM3OTIwMDY4MjdmMzNhIiwiYXVkIjoiZGlzYXN0ZXJ' +
            'hcGkiLCJpYXQiOjE2MDc4NzM1MzEsImV4cCI6MTYwNzg4MDczMSwiYXpw' +
            'IjoiUkd1U2I4aHJhODlVeWRVaFZjanZKQXczblpIdEJEZFgiLCJzY29wZ' +
            'SI6IiIsInBlcm1pc3Npb25zIjpbImRlbGV0ZTp3aXRuZXNzcmVwb3J0cy' +
            'IsImdldDpvYnNlcnZlcnMiLCJwYXRjaDpkaXNhc3RlcnMiLCJwYXRjaDp' +
            '3aXRuZXNzcmVwb3J0cyIsInBvc3Q6ZGlzYXN0ZXJzIiwicG9zdDp3aXRu' +
            'ZXNzcmVwb3J0cyJdfQ.PN60BoZqcxYzy7OuGIa9zqXQj7dmKdYqQXCfFW' +
            'WBRFoMSb91DQVmt_gkwi9tVfMAe2YSjkp5Adb5gABCKGonC2cEVZtG_T9' +
            'ok5soVRHgmuoCG2gGRQEQNn6r1yzcE9g_yGMlYzEV8w52git9KSD8cDnX' +
            'xSAbX4gsF-Cbx_X9UJDwSGXOwgyu1qfHjdXQm4C9_s9IzhnKjcs8vBC0-' +
            'erewMNs7subjbHEoEDVyflu8rC0Y419KuGFe_9fwEg-PBeGPrxnxTMBPO' +
            'mh1cJnpwwq9cSWLCi__AbpxdNWSc3ir9hLMDKq9xw6LTYb556BuSj9swS' +
            '4FZ1mSTOl9BtQykHRCg'})
        self.assertEqual(401, res.status_code)

    # disaster reporter tests

    def test_retrieve_observers_insufficient_authorization_failure(self):
        """Test for failure to retrieve data about observers due to provided
        token belonging to disaster reporter when authorization requires user
        to be disaster administrator"""
        res = self.client().get(
            '/api/observers',
            headers={'Content-Type': 'application/json',
                     'Authorization': 'bearer ' + os.environ["REPORTER_TOKEN"]}
        )
        self.assertEqual(403, res.status_code)

    def test_update_witness_report_disaster_reporter_authorization_success(
            self):
        """Test for successfully updating a witness report as a disaster
        reporter"""
        update_data = {
            "id": self.witness_report_1_data["id"],
            "event_datetime": "2019-07-31 09:01:47-04",
            "severity": 4,
            "image_url": "https://hgtvhome.sndimg.com/content/dam/images/" +
            "grdn/fullset/2012/8/20/0/0403_051.jpg.rend.hgtvcom.1280." +
            "1920.suffix/1452646441575.jpeg",
            "comment": "The disaster is quite bad.",
            "people_affected": 1300,
            "location_latitude": 23.4,
            "location_longitude": -10.3,
        }
        res = self.client().patch('/api/witnessreports',
                                  data=json.dumps(update_data),
                                  headers={'Content-Type': 'application/json',
                                           'Authorization': 'bearer ' +
                                           os.environ["REPORTER_TOKEN"]})
        self.assertEqual(200, res.status_code)

        update_data["disaster_id"] = self.witness_report_1_data["disaster_id"]
        update_data["observer_id"] = self.witness_report_1_data["observer_id"]
        update_data["event_datetime"] = 'Wed, 31 Jul 2019 13:01:47 GMT'
        update_data["location"] = [
            update_data["location_latitude"],
            update_data["location_longitude"]
        ]
        del update_data["location_latitude"]
        del update_data["location_longitude"]

        data = json.loads(res.data)
        self.assertDictEqual(update_data, data)

        matching_witness_report = WitnessReport.query.filter(
            WitnessReport.id == update_data["id"]).first()
        update_data["location"] = tuple(update_data["location"])
        update_data["event_datetime"] = datetime(
            2019, 7, 31, 9, 1, 47, 0, psycopg2.tz.FixedOffsetTimezone(
                offset=-240, name=None))

        self.assertDictEqual(update_data, matching_witness_report.format())


# Make tests executable
if __name__ == "__main__":
    unittest.main()
