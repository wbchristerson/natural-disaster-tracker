import os
from flask import Flask, abort, jsonify, flash, request
from models import setup_db, Disaster, WitnessReport
from flask_cors import CORS
from sqlalchemy import func

PAGE_SIZE = 10

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


def get_page_of_resource(arr, page):
    if page <= 0:
        raise ValueError("A non-positive page is not recognized.")

    start = min((page-1) * PAGE_SIZE, len(arr))
    end = min(page * PAGE_SIZE, len(arr))
    return arr[start:end]


'''
A GET endpoint to get all disasters. This endpoint takes no parameters. This endpoint does
not return any of the witness reports associated with a specific disaster. For each
disaster, the data in the disaster table is returned along with a random comment and the
author of that comment from a witness of the disaster (if any) and some descriptive
data about the disaster reports per disaster (namely, the number of reports, the first
observance, the last observance, and the number of people affected).

This endpoint has a page request parameter corresponding to the paginated page to use.
THe current default for the size of a page is 10.
'''
@app.route('/disasters')
def disasters():
    page = int(request.args.get("page", "1"))
    try:
        formatted_disasters = []
        disasters = Disaster.query.all()
        total_disasters = len(disasters)
        formatted_disasters = get_page_of_resource([disaster.format() for disaster in disasters], page)

        affected_people = WitnessReport.query.with_entities(
                WitnessReport.disaster_id,
                func.max(WitnessReport.people_affected),
                func.avg(WitnessReport.severity),
                func.min(WitnessReport.event_datetime),
                func.max(WitnessReport.event_datetime),
            ).group_by(WitnessReport.disaster_id).all()

        formatted_affected_people = [(report[0], report[1], float(report[2]), report[3], report[4]) for report in affected_people]

        print("\n\n\n\n")
        print(formatted_affected_people)
        print("\n\n\n\n")

        return jsonify({
            'total_disasters': total_disasters,
            'disasters': formatted_disasters,
            'list_people_affected': formatted_affected_people,
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