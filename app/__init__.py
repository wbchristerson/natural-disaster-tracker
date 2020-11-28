import os
from flask import Flask, abort, jsonify, flash, request
from models import setup_db, Disaster, Observer, WitnessReport
from flask_cors import CORS
from sqlalchemy import func
from random import randrange

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


def get_random_report_data(witness_reports):
    disaster_map = dict()
    for (disaster_id, observer_id, comment) in witness_reports:
        if disaster_id not in disaster_map:
            disaster_map[disaster_id] = list()
        disaster_map[disaster_id].append((observer_id, comment))
    
    random_report_data = dict()
    for k, v in disaster_map.items():
        random_report_data[k] = v[randrange(len(v))]
    return random_report_data


def combine_disaster_data(formatted_disasters : list, formatted_affected_people : list,
    random_report_data : dict, all_users : list) -> dict:
    affected_map = { A[0]: (A[1], A[2], A[3], A[4], A[5]) for A in formatted_affected_people }
    user_map = { user["id"] : {"username": user["username"], "photograph_url": user["photograph_url"] } for user in all_users }

    for disaster in formatted_disasters:
        if disaster["id"] in affected_map:
            disaster["people_affected"] = affected_map[disaster["id"]][0]
            disaster["severity"] = affected_map[disaster["id"]][1]
            disaster["first_observance"] = affected_map[disaster["id"]][2]
            disaster["last_observance"] = affected_map[disaster["id"]][3]
            disaster["num_reports"] = affected_map[disaster["id"]][4]
        else:
            disaster["people_affected"] = None
            disaster["severity"] = None
            disaster["first_observance"] = None
            disaster["last_observance"] = None
            disaster["num_reports"] = 0

        if disaster["id"] in random_report_data:
            user_info = random_report_data[disaster["id"]]
            disaster["random_observer"] = user_map[user_info[0]]["username"]
            disaster["random_observer_url"] = user_map[user_info[0]]["photograph_url"]
            disaster["random_comment"] = user_info[1]
        else:
            disaster["random_observer"] = None
            disaster["random_observer_url"] = None
            disaster["random_comment"] = None
    
    return formatted_disasters


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
                func.count(WitnessReport.disaster_id),
            ).group_by(WitnessReport.disaster_id).all()
        
        formatted_affected_people = [(report[0], report[1], float(report[2]), report[3],
            report[4], report[5]) for report in affected_people]

        # disaster_id, observer_id, comment
        all_witness_reports = WitnessReport.query.with_entities(WitnessReport.disaster_id,
            WitnessReport.observer_id, WitnessReport.comment).all()
        random_report_data = get_random_report_data(all_witness_reports) # dictionary containing some random report data per disaster

        all_users = [user.format() for user in Observer.query.all()]

        print("\n\n\n\n")
        print(all_witness_reports)
        print("\n\n")
        print(formatted_affected_people)
        print("\n\n\n\n")

        return jsonify({
            'total_disasters': total_disasters,
            'disasters': combine_disaster_data(formatted_disasters, formatted_affected_people, random_report_data, all_users),
        })
    except Exception as ex:
        print("\n\n")
        print(ex)
        print("\n\n")
        flash('An error occurred.')
        abort(404)


@app.errorhandler(400)
def bad_request(error):
    return jsonify({
        "success": False,
        "error": 400,
        "message": "malformed request"
    }), 400


@app.errorhandler(401)
def authorization_header_missing(error):
    return jsonify({
        "success": False,
        "error": 401,
        "message": "authorization issue"
    }), 401


@app.errorhandler(404)
def resource_not_found(error):
    return jsonify({
        "success": False,
        "error": 404,
        "message": "resource not found"
    }), 404


@app.errorhandler(422)
def unprocessable(error):
    return jsonify({
        "success": False,
        "error": 422,
        "message": "unprocessable",
    }), 422


app.secret_key = os.environ['SECRET_KEY']

if __name__ == '__main__':
    app.run()