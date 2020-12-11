import os
from flask import Flask, abort, jsonify, flash, request
from models import setup_db, Disaster, Observer, WitnessReport, NaturalDisasterEnum
from flask_cors import CORS
from sqlalchemy import func, join
from random import randrange
from copy import copy

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
                disaster["average_severity"] = affected_map[disaster["id"]][1]
                disaster["first_observance"] = affected_map[disaster["id"]][2]
                disaster["last_observance"] = affected_map[disaster["id"]][3]
                disaster["num_reports"] = affected_map[disaster["id"]][4]
            else:
                disaster["people_affected"] = None
                disaster["average_severity"] = None
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


    def combine_single_disaster_data(disaster, formatted_additional_data, formatted_reports, page) -> dict:
        all_data = copy(disaster)
        all_data["people_affected"] = formatted_additional_data[1]
        all_data["average_severity"] = formatted_additional_data[2]
        all_data["first_observance"] = formatted_additional_data[3]
        all_data["last_observance"] = formatted_additional_data[4]
        all_data["num_reports"] = formatted_additional_data[5]

        all_data["reports"] = get_page_of_resource(formatted_reports, page)

        for report in all_data["reports"]:
            del report["disaster_id"]

        return all_data


    '''
    A GET endpoint to get all disasters or disasters by disaster type. This endpoint takes 
    an optional parameter 'disaster_type' for the disaster_type. If no disaster_type parameter
    is provided, then the data for all disasters is returned. If the disaster_type parameter
    is provided but is not one of the recognized enums, a 404 error is raised.

    The endpoint also has an optional page request parameter corresponding to the paginated
    page to use. The current default for the size of a page is 10. If the page is non-positive,
    then a 422 error occurs.
    
    This endpoint does not return any of the witness reports associated with a specific disaster.
    For each disaster, the data in the disaster table is returned along with a random comment
    and the author of that comment from a witness of the disaster (if any) and some descriptive
    data about the disaster reports per disaster (namely, the number of reports, the first
    observance, the last observance, and the number of people affected).
    '''
    @app.route('/disasters')
    def disasters():
        page = int(request.args.get("page", "1"))
        disaster_type = request.args.get("disaster_type", None)

        try:
            if disaster_type is not None and disaster_type.upper() not in NaturalDisasterEnum.__members__:
                raise AttributeError("Unrecognized natural disaster type.")
            formatted_disasters = []

            if disaster_type is None:
                disasters = Disaster.query.all()
            else:
                disasters = Disaster.query.filter(
                    Disaster.disaster_type == disaster_type.upper()).all()

            total_disasters = len(disasters)
            formatted_disasters = get_page_of_resource([disaster.format() for disaster in disasters], page)

            additional_data = WitnessReport.query.with_entities(
                    WitnessReport.disaster_id,
                    func.max(WitnessReport.people_affected),
                    func.avg(WitnessReport.severity),
                    func.min(WitnessReport.event_datetime),
                    func.max(WitnessReport.event_datetime),
                    func.count(WitnessReport.disaster_id),
                ).group_by(WitnessReport.disaster_id).all()
            
            formatted_additional_data = [(report[0], report[1], float(report[2]), report[3],
                report[4], report[5]) for report in additional_data]

            # disaster_id, observer_id, comment
            all_witness_reports = WitnessReport.query.with_entities(WitnessReport.disaster_id,
                WitnessReport.observer_id, WitnessReport.comment).all()
            random_report_data = get_random_report_data(all_witness_reports) # dictionary containing some random report data per disaster

            all_users = [user.format() for user in Observer.query.all()]

            return jsonify({
                'total_disasters': total_disasters,
                'disasters': combine_disaster_data(formatted_disasters, formatted_additional_data, random_report_data, all_users),
            })
        except AttributeError as ex:
            flash('An error occurred.')
            abort(404)
        except Exception as ex:
            flash("An error occurred.")
            abort(422)


    '''
    A GET endpoint to get the details of a single disaster, including:
        - id (int)
        - informal_name (str)
        - official_name (str)
        - disaster_type (enum str)
        - is_ongoing (bool)
        - location (list of pair of floats)
        - people_affected (maximum over all reports if there exist reports, otherwise None)
        - average_severity (float)
        - first_observance (datetime str)
        - last_observance (datetime str)
        - num_reports (int; if no reports exist, it is 0)
        - reports (list)
    
    The reports property contains a list of individual witness reports, each including:
        - id (int)
        - observer_id (int)
        - event_datetime (datetime str)
        - severity (int)
        - image_url (str)
        - comment (str)
        - people_affected (int)
        - location (list of pair of floats)
        - username (str)
        - user_photograph_url (str)

    A page query parameter allows the page setting of the reports with 10 per page; if the
    page is invalid, a 422 error is returned; otherwise, if the id provided does not correspond
    to an existing disaster, a 404 error is returned
    '''
    @app.route('/disasters/<disaster_id>')
    def retrieve_disaster_by_id(disaster_id):
        page = int(request.args.get("page", "1"))
        try:
            if page <= 0:
                raise ValueError("The request page must be positive.")
            disaster = Disaster.query.filter(Disaster.id == disaster_id).first()

            additional_data = WitnessReport.query.filter(WitnessReport.disaster_id == disaster_id).with_entities(
                    WitnessReport.disaster_id,
                    func.max(WitnessReport.people_affected),
                    func.avg(WitnessReport.severity),
                    func.min(WitnessReport.event_datetime),
                    func.max(WitnessReport.event_datetime),
                    func.count(WitnessReport.disaster_id),
                ).group_by(WitnessReport.disaster_id).first()

            if additional_data:
                formatted_additional_data = (additional_data[0], additional_data[1], float(additional_data[2]), additional_data[3], additional_data[4], additional_data[5])
            else:
                formatted_additional_data = (None, None, None, None, None, 0)

            reports, observer_map = WitnessReport.observer_join(disaster_id)
            formatted_reports = [report.format() for report in reports]
            for fr in formatted_reports:
                fr["username"] = observer_map[fr["observer_id"]][0]
                fr["user_photograph_url"] = observer_map[fr["observer_id"]][1]
            
            return jsonify(combine_single_disaster_data(disaster.format(), formatted_additional_data, formatted_reports, page))
        except AttributeError as ex:
            flash("An attribute error occurred.")
            abort(404)
        except Exception as ex:
            flash("An error occurred.")
            abort(422)


    '''
    A GET endpoint to retrieve a page of the set of observers, including the observers' ids,
    usernames, and the URLs of their user photographs. The page can be specified as a query
    parameter and if none is provided, it will be assumed to be 1. The use of an invalid
    page (i.e. a non-positive page) will cause a status 422 error to be returned.
    '''
    @app.route('/observers', methods=["GET"])
    def get_all_observers():
        page = int(request.args.get("page", "1"))
        try:
            observers = Observer.query.all()
            page_observers = get_page_of_resource(observers, page)
            formatted_observers = [observer.format() for observer in page_observers]
            return jsonify({ "observers": formatted_observers })
        except Exception as ex:
            flash("An error occurred.")
            abort(422)


    '''
    A POST endpoint to insert a disaster into the database. The body for the 
    request is a dictionary with the following keys:

        - informal_name (str)
        - official_name (str, required, must be unique)
        - disaster_type (str, disaster enum)
        - is_ongoing (bool, default True)
        - location_latitude (float, required)
        - location_longitude (float, required)

    If the request's disaster data does not meet the conditions of requirmemente described
    above, a 400 status code error is returned
    '''
    @app.route('/disasters', methods=["POST"])
    def send_disaster():
        try:
            body = request.get_json()
            disaster = Disaster(
                body.get("informal_name"),
                body.get("official_name"),
                body.get("disaster_type"),
                body.get("is_ongoing"),
                body.get("location_latitude"),
                body.get("location_longitude"),
            )
            disaster.insert()
            return jsonify({ "id": disaster.id })
        except Exception as ex:
            flash("An error occurred.")
            abort(400)


    '''
    A POST endpoint to insert a user into the database. THe body for the
    request is a dictionary with the following keys:

        - username (str, required, unique)
        - photograph_url (str)

    If the request's data does not meet the conditions of requirement described above,
    then a 400 status code error is returned
    '''
    @app.route('/observers', methods=["POST"])
    def send_user():
        try:
            body = request.get_json()
            observer = Observer(body.get("username"), body.get("photograph_url"))
            observer.insert()
            return jsonify({ "id": observer.id })
        except Exception as ex:
            flash("An error occurred.")
            abort(400)


    '''
    A POST endpoint to insert a witness's report into the database. The body
    for the request is a dictionary with the following keys:

        - disaster_id (int, required)
        - observer_id (int, required)
        - event_datetime (datetime str, required)
        - severity (int)
        - image_url (str)
        - comment (str)
        - people_affected (int, default = 0)
        - location_latitude (float)
        - location_longitude (float)

    If the request's data does not meet the conditions of requirement described above,
    then a 400 status code error is returned
    '''
    @app.route('/witnessreports', methods=["POST"])
    def send_witness_report():
        try:
            body = request.get_json()
            witness_report = WitnessReport(
                body.get("disaster_id"),
                body.get("observer_id"),
                body.get("event_datetime"),
                body.get("severity"), # optional
                body.get("image_url"), # optional
                body.get("comment"), # optional
                body.get("people_affected"),
                body.get("location_latitude"),
                body.get("location_longitude")
            )
            witness_report.insert()
            return jsonify({ "id": witness_report.id })
        except Exception as ex:
            flash("An error occurred.")
            abort(400)


    '''
    A PATCH endpoint to update a disaster. The body of the request is a dictionary with
    the following keys, all of which are optional except for id:

        - id (int)
        - informal_name (str)
        - official_name (str)
        - disaster_type (str)
        - is_ongoing (str)
        - location_latitude (str)
        - location_longitude (str)
    
    If no id is provided, then a 400 status code error is returned. If an id is provided
    but it does not match that of any disaster in the database, a 404 status code error
    is returned. Otherwise, if there are any malformed parts of the update data dictionary,
    then a 422 error is thrown.
    '''
    @app.route('/disasters', methods=["PATCH"])
    def update_disaster():
        try:
            body = request.get_json()
            if "id" not in body:
                raise AttributeError("id is not present as a property in the sent data.")
            disaster = Disaster.query.filter(Disaster.id == body["id"]).first()

            if disaster is None:
                raise ValueError("Unrecognized disaster id")

            if "informal_name" in body:
                disaster.informal_name = body["informal_name"]
            if "official_name" in body:
                disaster.official_name = body["official_name"]
            if "disaster_type" in body:
                disaster.disaster_type = body["disaster_type"]
            if "is_ongoing" in body:
                disaster.is_ongoing = body["is_ongoing"]
            if "location_latitude" in body:
                disaster.location_latitude = body["location_latitude"]
            if "location_longitude" in body:
                disaster.location_longitude = body["location_longitude"]

            disaster.update()
            return jsonify(disaster.format())
        except AttributeError as err:
            flash(str(err))
            abort(400)
        except ValueError as err:
            flash(str(err))
            abort(404)
        except Exception as err:
            flash("An error occurred.")
            abort(422)


    '''
    A PATCH endpoint to update a witness report of disaster. The body of the request is a
    dictionary with the following keys, all of which are optional except for id (all
    fields except for id represent fields which are being changed):

        - id (int, required)
        - event_datetime (datetime str)
        - severity (int)
        - image_url (str)
        - comment (str)
        - people_affected (int)
        - location_latitude (str)
        - location_longitude (str)
    
    If no id is provided, then a 400 status code error is returned. If an id is provided
    but it does not match that of any witness report in the database, a 404 status code 
    error is returned. Otherwise, if there are any malformed parts of the update data 
    dictionary, then a 422 error is thrown.
    '''
    @app.route('/witnessreports', methods=["PATCH"])
    def update_witness_report():
        try:
            body = request.get_json()
            if "id" not in body:
                raise AttributeError("id is not present as a property in the sent data.")
            witness_report = WitnessReport.query.filter(WitnessReport.id == body["id"]).first()

            if witness_report is None:
                raise ValueError("Unrecognized witness report id")

            if "event_datetime" in body:
                witness_report.event_datetime = body["event_datetime"]
            if "severity" in body:
                witness_report.severity = body["severity"]
            if "image_url" in body:
                witness_report.image_url = body["image_url"]
            if "comment" in body:
                witness_report.comment = body["comment"]
            if "people_affected" in body:
                witness_report.people_affected = body["people_affected"]
            if "location_latitude" in body:
                witness_report.location_latitude = body["location_latitude"]
            if "location_longitude" in body:
                witness_report.location_longitude = body["location_longitude"]

            witness_report.update()
            return jsonify(witness_report.format())
        except AttributeError as err:
            flash(str(err))
            abort(400)
        except ValueError as err:
            flash(str(err))
            abort(404)
        except Exception as err:
            flash("An error occurred.")
            abort(422)


    @app.route('/witnessreports/<witness_report_id>', methods=["DELETE"])
    def remove_witness_report(witness_report_id):
        try:
            witness_report = WitnessReport.query.filter(WitnessReport.id == witness_report_id).first()
            if witness_report is None:
                raise AttributeError("Entry not found")
            witness_report.delete()
            return jsonify({
                "success": True,
                "delete": witness_report_id,
            })
        except Exception as err:
            flash(str(err))
            # print("\n\n")
            # print(type(err).__name__)
            # print(err)
            # print("\n\n")
            abort(400)


    @app.errorhandler(400)
    def bad_request(error):
        return jsonify({
            "success": False,
            "error": 400,
            "message": "malformed request - " + str(error)
        }), 400


    @app.errorhandler(401)
    def authorization_header_missing(error):
        return jsonify({
            "success": False,
            "error": 401,
            "message": "authorization issue - " + str(error)
        }), 401


    @app.errorhandler(404)
    def resource_not_found(error):
        return jsonify({
            "success": False,
            "error": 404,
            "message": "resource not found - " + str(error)
        }), 404


    @app.errorhandler(422)
    def unprocessable(error):
        return jsonify({
            "success": False,
            "error": 422,
            "message": "unprocessable - " + str(error),
        }), 422

    return app

app = create_app()


app.secret_key = os.environ['SECRET_KEY']

if __name__ == '__main__':
    app.run()


# curl -X POST https://sample-will.herokuapp.com/disasters --header "Content-Type: application/json" --header "Accept: application/vnd.heroku+json; version=3" --data '{"informal_name": "The Tsunami", "official_name": "Tsunami-1", "disaster_type": "TSUNAMI", "is_ongoing": false, "location_latitude": 8.0, "location_longitude": 130.4 }'

# curl -X POST https://sample-will.herokuapp.com/disasters --header "Content-Type: application/json" --data '{"informal_name": "The Tsunami", "official_name": "Tsunami-1", "disaster_type": "TSUNAMI", "is_ongoing": false, "location_latitude": 8.0, "location_longitude": 130.4 }'


# curl -X POST https://sample-will.herokuapp.com/disasters --header "Content-Type: application/json" --data '{"disaster_type": "TSUNAMI", "is_ongoing": false, "location_latitude": 8.0, "location_longitude": 130.4 }'

# curl -X POST http://127.0.0.1:5000/disasters --header "Content-Type: application/json" --data '{"disaster_type": "TSUNAMI", "is_ongoing": false, "location_latitude": 8.0, "location_longitude": 130.4 }'

# curl -X POST http://127.0.0.1:5000/observers --header "Content-Type: application/json" --data '{"username": "disaster_recorder", "photograph_url": "https://ichef.bbci.co.uk/images/ic/960x960/p08634k6.jpg"}'

# curl -X POST https://sample-will.herokuapp.com/observers --header "Content-Type: application/json" --data '{"username": "disaster_recorder", "photograph_url": "https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg"}'

# curl -X POST http://127.0.0.1:5000/witnessreports --header "Content-Type: application/json" --data '{"disaster_id": 2,  "observer_id": 1, "event_datetime": "2019-07-31 09:01:47-04", "severity": 3, "image_url": "https://hgtvhome.sndimg.com/content/dam/images/grdn/fullset/2012/8/20/0/0403_051.jpg.rend.hgtvcom.1280.1920.suffix/1452646441575.jpeg", "comment": "The disaster is quite bad", "people_affected": 1300, "location_latitude": 23.4, "location_longitude": -10.3 }'

# Post witness report:
# curl -X POST http://127.0.0.1:5000/witnessreports --header "Content-Type: application/json" --data '{"disaster_id": 2,  "observer_id": 1, "event_datetime": "2019-07-31 09:01:47-04", "severity": 3, "image_url": "https://hgtvhome.sndimg.com/content/dam/images/grdn/fullset/2012/8/20/0/0403_051.jpg.rend.hgtvcom.1280.1920.suffix/1452646441575.jpeg", "comment": "The disaster is quite bad", "people_affected": 1300, "location_latitude": 23.4, "location_longitude": -10.3 }'

# Patch disaster by updating official_name:
# curl -X PATCH http://127.0.0.1:5000/disasters --header "Content-Type: application/json" --data '{"id": 1, "official_name": "Hurricane Sandy Severe Storm" }'


# Post witness report:
# curl -X POST https://sample-will.herokuapp.com/witnessreports --header "Content-Type: application/json" --data '{"disaster_id": 2,  "observer_id": 1, "event_datetime": "2019-07-31 09:01:47-04", "severity": 3, "image_url": "https://hgtvhome.sndimg.com/content/dam/images/grdn/fullset/2012/8/20/0/0403_051.jpg.rend.hgtvcom.1280.1920.suffix/1452646441575.jpeg", "comment": "The disaster is quite bad", "people_affected": 1300, "location_latitude": 23.4, "location_longitude": -10.3 }'


# Patch witness report:
# curl -X PATCH http://127.0.0.1:5000/witnessreports --header "Content-Type: application/json" --data '{"id": 2,  "event_datetime": "2019-07-31 09:01:47-04", "severity": 4, "image_url": "https://hgtvhome.sndimg.com/content/dam/images/grdn/fullset/2012/8/20/0/0403_051.jpg.rend.hgtvcom.1280.1920.suffix/1452646441575.jpeg", "comment": "The disaster is quite bad.", "people_affected": 1300, "location_latitude": 23.4, "location_longitude": -10.3 }'