import unittest
from app import create_app
import os
from models import setup_db, Observer, Disaster, NaturalDisasterEnum
from flask_sqlalchemy import SQLAlchemy


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
            self.observer_id_1 = observer_1.id

            disaster_1 = Disaster(
                "The bad hurricance", "Hurricane-XYZ", NaturalDisasterEnum.HURRICANE,
                True, 0.0, 0.0
            )
            self.db.session.add(disaster_1)
            self.disaster_id_1 = disaster_1.id

            self.db.session.commit()


    def tearDown(self):
        """Executed after each test -- may be wasteful"""
        observer_1 = Observer.query.filter(Observer.id == self.observer_id_1).first()
        disaster_1 = Disaster.query.filter(Disaster.id == self.disaster_id_1).first()
        if observer_1:
            observer_1.delete()

        if disaster_1:
            disaster_1.delete()


    def test_operations(self):
        self.assertTrue(True)


# Make tests executable
if __name__ == "__main__":
    unittest.main()