import os
from flask import Flask, abort, jsonify, flash
from models import setup_db, Disaster, WitnessReport
from flask_cors import CORS
from sqlalchemy import func


def create_app(test_config=None):

    app = Flask(__name__)
    setup_db(app)
    CORS(app)

    @app.route('/')
    def get_greeting():
        excited = os.environ['EXCITED']
        greeting = "Hello" 
        if excited == 'true': greeting = greeting + "!!!!!"
        return greeting

    @app.route('/coolkids')
    def be_cool():
        return "Be cool, man, be coooool! You're almost an FSND grad!"

    return app

app = create_app()


'''
A GET endpoint to get all disasters. This endpoint takes no parameters. This endpoint does
not return any of the witness reports associated with a specific disaster. For each
disaster, the data in the disaster table is returned along with a random comment and the
author of that comment from a witness of the disaster (if any) and some descriptive
data about the disaster reports per disaster (namely, the number of reports, the first
observance, the last observance, and the number of people affected).
'''
@app.route('/disasters')
def disasters():
    try:
        formatted_disasters = []
        disasters = Disaster.query.all()
        formatted_disasters = [disaster.format() for disaster in disasters]
        # X = [disaster.format() for disaster in disasters] 

        list_people_affected = []
        # list_people_affected = WitnessReport.query.groupby(WitnessReport.disaster_id).all()
        # list_people_affected = WitnessReport.query(func.max(WitnessReport.people_affected).label('people_affected'), WitnessReport.disaster_id).groupby(WitnessReport.disaster_id).all()

        return jsonify({
            'disasters': formatted_disasters,
            'list_people_affected': list_people_affected,
        })
    except Exception as ex:
        print("\n\n")
        print(ex)
        print("\n\n")
        flash('An error occurred.')
        abort(404)

app.secret_key = os.environ['SECRET_KEY']

if __name__ == '__main__':
    app.run()