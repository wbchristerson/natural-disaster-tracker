import unittest
from app import create_app
import os
from models import setup_db, Observer, Disaster, NaturalDisasterEnum
from flask_sqlalchemy import SQLAlchemy
import json


class SampleWillTestCase(unittest.TestCase):
    """This class represents the sample will test case"""

    def setUp(self):
        """Define test variables, initialize app; note: much of this code matches an
            earlier project that I completed -- the trivia API project"""
        self.app = create_app()
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

            self.db.session.commit()

            self.disaster_id_1 = disaster_1.id
            self.disaster_id_2 = disaster_2.id
            self.observer_id_1 = observer_1.id
            self.observer_id_2 = observer_2.id


    def tearDown(self):
        """Executed after each test -- may be wasteful"""
        observer_1 = Observer.query.filter(Observer.id == self.observer_id_1).first()
        observer_2 = Observer.query.filter(Observer.id == self.observer_id_2).first()
        disaster_1 = Disaster.query.filter(Disaster.id == self.disaster_id_1).first()
        disaster_2 = Disaster.query.filter(Disaster.id == self.disaster_id_2).first()

        if observer_1:
            observer_1.delete()

        if observer_2:
            observer_2.delete()

        if disaster_1:
            disaster_1.delete()
        
        if disaster_2:
            disaster_2.delete()


    def test_operations(self):
        self.assertTrue(True)

    
    def test_get_disasters_success_simple(self):
        res = self.client().get('/disasters')

        self.assertEqual(res.status_code, 200)

        data = json.loads(res.data)

        self.assertIn("total_disasters", data)
        self.assertIn("disasters", data)

        self.assertEqual(2, data["total_disasters"])
        # self.assertEqual(self.disaster_id_1, data["disasters"][0]["id"])
        # self.assertEqual(self.disaster_id_2, data["disasters"][1]["id"])

        disaster_1_data = {
            "id": self.disaster_id_1,
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

        self.assertDictEqual(disaster_1_data, data["disasters"][0])


# Make tests executable
if __name__ == "__main__":
    unittest.main()