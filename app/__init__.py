import os
from flask import Flask, abort, jsonify, flash, request
from models import setup_db, Disaster, Observer, WitnessReport, NaturalDisasterEnum
from flask_cors import CORS
from sqlalchemy import func, join
from random import randrange
from copy import copy
from authentication_utils import requires_auth

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
    @requires_auth('get:observers')
    def get_all_observers(payload):
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

    If the request's disaster data does not meet the conditions of requirement described
    above, a 400 status code error is returned
    '''
    @app.route('/disasters', methods=["POST"])
    @requires_auth('post:disasters')
    def send_disaster(payload):
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
    @requires_auth('post:witnessreports')
    def send_witness_report(payload):
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
    @requires_auth('patch:witnessreports')
    def update_disaster(payload):
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
    @requires_auth('patch:witnessreports')
    def update_witness_report(payload):
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

    '''
    A DELETE endpoint for deleting a witness report. If the listed id does not exist
    among witness reports, a 400 status error is returned.
    '''
    @app.route('/witnessreports/<witness_report_id>', methods=["DELETE"])
    @requires_auth('delete:witnessreports')
    def remove_witness_report(payload, witness_report_id):
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


# TEST heroku endpoints:

# curl -X GET https://sample-will.herokuapp.com/disasters
# curl -X GET https://sample-will.herokuapp.com/disasters/2
# curl -X POST https://sample-will.herokuapp.com/disasters --header "Content-Type: application/json" --header "Accept: application/vnd.heroku+json; version=3" --data '{"informal_name": "The Big Avalanche", "official_name": "Avalanche-202012110821", "disaster_type": "AVALANCHE", "is_ongoing": false, "location_latitude": 28.632662, "location_longitude": 83.833038 }'
# curl -X GET https://sample-will.herokuapp.com/observers
# curl -X POST https://sample-will.herokuapp.com/observers --header "Content-Type: application/json" --header "Accept: application/vnd.heroku+json; version=3" --data '{"username": "test_disaster_observer", "photograph_url": "https://www.incimages.com/uploaded_files/image/1920x1080/getty_844768902_299186.jpg"}'
# curl -X POST https://sample-will.herokuapp.com/witnessreports --header "Content-Type: application/json" --header "Accept: application/vnd.heroku+json; version=3" --data '{"disaster_id": 2, "observer_id": 2, "event_datetime": "2019-08-01 05:41:14-04", "image_url": "https://media4.s-nbcnews.com/i/newscms/2018_49/2669406/181204-japan-tsunami-earthquake-cs-920a_075a953d76eb5447a6bf4fd422e45244.jpg", "comment": "The waves are enormous and causing a lot of damage.", "people_affected": 15000, "location_latitude": 50.8, "location_longitude": 65.2}'
# curl -X PATCH https://sample-will.herokuapp.com/disasters --header "Content-Type: application/json" --header "Accept: application/vnd.heroku+json; version=3" --data '{"id": 2, "informal_name": "The Terrible Tsunami", "location_latitude": 8.1, "location_longitude": 130.5}'
# curl -X PATCH https://sample-will.herokuapp.com/witnessreports --header "Content-Type: application/json" --header "Accept: application/vnd.heroku+json; version=3" --data '{"id": 4, "severity": 8, "event_datetime": "2019-08-02 06:45:11-04", "people_affected": 16000}'
# curl -X DELETE https://sample-will.herokuapp.com/witnessreports/4


# curl -X GET https://sample-will.herokuapp.com/observers --header "Authorization: bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im4yWlN4YWR2T1F4V2xzMkxPTF9DRCJ9.eyJpc3MiOiJodHRwczovL2Rldi05eG81Z2RmYy51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NWY3ZmE3YmY2YmM3OTIwMDY4MjdmMzNhIiwiYXVkIjoiZGlzYXN0ZXJhcGkiLCJpYXQiOjE2MDc4OTE2NjIsImV4cCI6MTYwNzk3ODA2MiwiYXpwIjoiUkd1U2I4aHJhODlVeWRVaFZjanZKQXczblpIdEJEZFgiLCJzY29wZSI6IiIsInBlcm1pc3Npb25zIjpbImRlbGV0ZTp3aXRuZXNzcmVwb3J0cyIsImdldDpvYnNlcnZlcnMiLCJwYXRjaDpkaXNhc3RlcnMiLCJwYXRjaDp3aXRuZXNzcmVwb3J0cyIsInBvc3Q6ZGlzYXN0ZXJzIiwicG9zdDp3aXRuZXNzcmVwb3J0cyJdfQ.lsDjioNljG1J5ciw7yTmqNgwWo32owboYHQmYXLobgQX2P5VpggxtYlJDDmkSnfH2UpMPJD_3LGiG5hMayDOY8_MLxZbw7E_eu3kOtqpH-o0QsCZvwh6yoXHUqcAgd4-qf5-euOJnhAhzsp4gxaRJ_l0dc3-IPL9ayfkUm9nREstfIEZVVLsWgk2szGTdPxMvE-4tSB6iIrM-j7ftf5WaG3fCQHaHuOtdPIXLSe24RBAbJf45dN_QL6j1GICxUZ6b7jaNq7A0xPN20PULD99DIfsZPlGJgfAJzrpKqr2_us5BNFDstulNIf5UG2sJbRg2oAtAwLaR-d3mSKSZKJpJQ"



# curl -X GET http://127.0.0.1:5000/observers --header "Authorization: bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im4yWlN4YWR2T1F4V2xzMkxPTF9DRCJ9.eyJpc3MiOiJodHRwczovL2Rldi05eG81Z2RmYy51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NWY3ZmE3YmY2YmM3OTIwMDY4MjdmMzNhIiwiYXVkIjoiZGlzYXN0ZXJhcGkiLCJpYXQiOjE2MDc4OTE2NjIsImV4cCI6MTYwNzk3ODA2MiwiYXpwIjoiUkd1U2I4aHJhODlVeWRVaFZjanZKQXczblpIdEJEZFgiLCJzY29wZSI6IiIsInBlcm1pc3Npb25zIjpbImRlbGV0ZTp3aXRuZXNzcmVwb3J0cyIsImdldDpvYnNlcnZlcnMiLCJwYXRjaDpkaXNhc3RlcnMiLCJwYXRjaDp3aXRuZXNzcmVwb3J0cyIsInBvc3Q6ZGlzYXN0ZXJzIiwicG9zdDp3aXRuZXNzcmVwb3J0cyJdfQ.lsDjioNljG1J5ciw7yTmqNgwWo32owboYHQmYXLobgQX2P5VpggxtYlJDDmkSnfH2UpMPJD_3LGiG5hMayDOY8_MLxZbw7E_eu3kOtqpH-o0QsCZvwh6yoXHUqcAgd4-qf5-euOJnhAhzsp4gxaRJ_l0dc3-IPL9ayfkUm9nREstfIEZVVLsWgk2szGTdPxMvE-4tSB6iIrM-j7ftf5WaG3fCQHaHuOtdPIXLSe24RBAbJf45dN_QL6j1GICxUZ6b7jaNq7A0xPN20PULD99DIfsZPlGJgfAJzrpKqr2_us5BNFDstulNIf5UG2sJbRg2oAtAwLaR-d3mSKSZKJpJQ"


# curl -X POST https://sample-will.herokuapp.com/disasters --header "Content-Type: application/json" --header "Accept: application/vnd.heroku+json; version=3" --header "Authorization: bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im4yWlN4YWR2T1F4V2xzMkxPTF9DRCJ9.eyJpc3MiOiJodHRwczovL2Rldi05eG81Z2RmYy51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NWY3ZmE3YmY2YmM3OTIwMDY4MjdmMzNhIiwiYXVkIjoiZGlzYXN0ZXJhcGkiLCJpYXQiOjE2MDc4OTE2NjIsImV4cCI6MTYwNzk3ODA2MiwiYXpwIjoiUkd1U2I4aHJhODlVeWRVaFZjanZKQXczblpIdEJEZFgiLCJzY29wZSI6IiIsInBlcm1pc3Npb25zIjpbImRlbGV0ZTp3aXRuZXNzcmVwb3J0cyIsImdldDpvYnNlcnZlcnMiLCJwYXRjaDpkaXNhc3RlcnMiLCJwYXRjaDp3aXRuZXNzcmVwb3J0cyIsInBvc3Q6ZGlzYXN0ZXJzIiwicG9zdDp3aXRuZXNzcmVwb3J0cyJdfQ.lsDjioNljG1J5ciw7yTmqNgwWo32owboYHQmYXLobgQX2P5VpggxtYlJDDmkSnfH2UpMPJD_3LGiG5hMayDOY8_MLxZbw7E_eu3kOtqpH-o0QsCZvwh6yoXHUqcAgd4-qf5-euOJnhAhzsp4gxaRJ_l0dc3-IPL9ayfkUm9nREstfIEZVVLsWgk2szGTdPxMvE-4tSB6iIrM-j7ftf5WaG3fCQHaHuOtdPIXLSe24RBAbJf45dN_QL6j1GICxUZ6b7jaNq7A0xPN20PULD99DIfsZPlGJgfAJzrpKqr2_us5BNFDstulNIf5UG2sJbRg2oAtAwLaR-d3mSKSZKJpJQ" --data '{"informal_name": "The Medium Avalanche", "official_name": "Avalanche-202012140936", "disaster_type": "AVALANCHE", "is_ongoing": false, "location_latitude": 28.632662, "location_longitude": 83.833038 }'


# curl -X DELETE https://sample-will.herokuapp.com/witnessreports/5 --header "Authorization: bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im4yWlN4YWR2T1F4V2xzMkxPTF9DRCJ9.eyJpc3MiOiJodHRwczovL2Rldi05eG81Z2RmYy51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NWY3ZmE3YmY2YmM3OTIwMDY4MjdmMzNhIiwiYXVkIjoiZGlzYXN0ZXJhcGkiLCJpYXQiOjE2MDc4OTE2NjIsImV4cCI6MTYwNzk3ODA2MiwiYXpwIjoiUkd1U2I4aHJhODlVeWRVaFZjanZKQXczblpIdEJEZFgiLCJzY29wZSI6IiIsInBlcm1pc3Npb25zIjpbImRlbGV0ZTp3aXRuZXNzcmVwb3J0cyIsImdldDpvYnNlcnZlcnMiLCJwYXRjaDpkaXNhc3RlcnMiLCJwYXRjaDp3aXRuZXNzcmVwb3J0cyIsInBvc3Q6ZGlzYXN0ZXJzIiwicG9zdDp3aXRuZXNzcmVwb3J0cyJdfQ.lsDjioNljG1J5ciw7yTmqNgwWo32owboYHQmYXLobgQX2P5VpggxtYlJDDmkSnfH2UpMPJD_3LGiG5hMayDOY8_MLxZbw7E_eu3kOtqpH-o0QsCZvwh6yoXHUqcAgd4-qf5-euOJnhAhzsp4gxaRJ_l0dc3-IPL9ayfkUm9nREstfIEZVVLsWgk2szGTdPxMvE-4tSB6iIrM-j7ftf5WaG3fCQHaHuOtdPIXLSe24RBAbJf45dN_QL6j1GICxUZ6b7jaNq7A0xPN20PULD99DIfsZPlGJgfAJzrpKqr2_us5BNFDstulNIf5UG2sJbRg2oAtAwLaR-d3mSKSZKJpJQ"


# curl -X POST https://sample-will.herokuapp.com/witnessreports --header "Content-Type: application/json" --header "Accept: application/vnd.heroku+json; version=3" --data '{"disaster_id": 8, "observer_id": 2, "event_datetime": "2019-08-01 05:41:14-04", "image_url": "https://media4.s-nbcnews.com/i/newscms/2018_49/2669406/181204-japan-tsunami-earthquake-cs-920a_075a953d76eb5447a6bf4fd422e45244.jpg", "comment": "The waves are enormous and causing a lot of damage.", "people_affected": 15000, "location_latitude": 50.8, "location_longitude": 65.2}' --header "Authorization: bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im4yWlN4YWR2T1F4V2xzMkxPTF9DRCJ9.eyJpc3MiOiJodHRwczovL2Rldi05eG81Z2RmYy51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NWY5M2Y5Yzc3M2VmNDkwMDcwMzNiMmFkIiwiYXVkIjoiZGlzYXN0ZXJhcGkiLCJpYXQiOjE2MDc4ODk4NTAsImV4cCI6MTYwNzk3NjI1MCwiYXpwIjoiUkd1U2I4aHJhODlVeWRVaFZjanZKQXczblpIdEJEZFgiLCJzY29wZSI6IiIsInBlcm1pc3Npb25zIjpbInBhdGNoOndpdG5lc3NyZXBvcnRzIiwicG9zdDp3aXRuZXNzcmVwb3J0cyJdfQ.c1m8VppvPuQgSFxOUviu2LXa8lE1yGE72_yuBFhYriFjZVCXBZXXjDByRZ_eH0Zh6hzpfBzjERtJ0smmvq7USw1-Ll_Ek92yKhTbLQLlPLq7m4ez1z5l7xPXiDehOZCgBdrVhNstT1mCb_dXnHv_qIdcpOmuxuaAx1ZTBJivklLr_VTSX27RQiAlYfFm_NIpack3826k4yN4_36Ii9_pszAFeK4WVuVUDukGtR-yLnmabU2bx1lKWl5iVJKU8T9UQX6N-IYML21MeUFG7Mn93tMOqBUIMq0_vt1UFeSUDTaoEjzyUhVR-STti7KfOGzqqw5y3p-B-__eGiFYhJwouA"

# curl -X POST http://127.0.0.1:5000/witnessreports --header "Content-Type: application/json" --header "Accept: application/vnd.heroku+json; version=3" --data '{"disaster_id": 1, "observer_id": 2, "event_datetime": "2019-08-01 05:41:14-04", "image_url": "https://media4.s-nbcnews.com/i/newscms/2018_49/2669406/181204-japan-tsunami-earthquake-cs-920a_075a953d76eb5447a6bf4fd422e45244.jpg", "comment": "The waves are enormous and causing a lot of damage.", "people_affected": 15000, "location_latitude": 50.8, "location_longitude": 65.2}' --header "Authorization: bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im4yWlN4YWR2T1F4V2xzMkxPTF9DRCJ9.eyJpc3MiOiJodHRwczovL2Rldi05eG81Z2RmYy51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NWY5M2Y5Yzc3M2VmNDkwMDcwMzNiMmFkIiwiYXVkIjoiZGlzYXN0ZXJhcGkiLCJpYXQiOjE2MDc4ODk4NTAsImV4cCI6MTYwNzk3NjI1MCwiYXpwIjoiUkd1U2I4aHJhODlVeWRVaFZjanZKQXczblpIdEJEZFgiLCJzY29wZSI6IiIsInBlcm1pc3Npb25zIjpbInBhdGNoOndpdG5lc3NyZXBvcnRzIiwicG9zdDp3aXRuZXNzcmVwb3J0cyJdfQ.c1m8VppvPuQgSFxOUviu2LXa8lE1yGE72_yuBFhYriFjZVCXBZXXjDByRZ_eH0Zh6hzpfBzjERtJ0smmvq7USw1-Ll_Ek92yKhTbLQLlPLq7m4ez1z5l7xPXiDehOZCgBdrVhNstT1mCb_dXnHv_qIdcpOmuxuaAx1ZTBJivklLr_VTSX27RQiAlYfFm_NIpack3826k4yN4_36Ii9_pszAFeK4WVuVUDukGtR-yLnmabU2bx1lKWl5iVJKU8T9UQX6N-IYML21MeUFG7Mn93tMOqBUIMq0_vt1UFeSUDTaoEjzyUhVR-STti7KfOGzqqw5y3p-B-__eGiFYhJwouA"

# curl -X PATCH https://sample-will.herokuapp.com/disasters --header "Content-Type: application/json" --header "Accept: application/vnd.heroku+json; version=3" --data '{"id": 4, "informal_name": "The Very Terrible Avalanche", "location_latitude": 8.1, "location_longitude": 130.5}' --header "Authorization: bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im4yWlN4YWR2T1F4V2xzMkxPTF9DRCJ9.eyJpc3MiOiJodHRwczovL2Rldi05eG81Z2RmYy51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NWY3ZmE3YmY2YmM3OTIwMDY4MjdmMzNhIiwiYXVkIjoiZGlzYXN0ZXJhcGkiLCJpYXQiOjE2MDc4OTE2NjIsImV4cCI6MTYwNzk3ODA2MiwiYXpwIjoiUkd1U2I4aHJhODlVeWRVaFZjanZKQXczblpIdEJEZFgiLCJzY29wZSI6IiIsInBlcm1pc3Npb25zIjpbImRlbGV0ZTp3aXRuZXNzcmVwb3J0cyIsImdldDpvYnNlcnZlcnMiLCJwYXRjaDpkaXNhc3RlcnMiLCJwYXRjaDp3aXRuZXNzcmVwb3J0cyIsInBvc3Q6ZGlzYXN0ZXJzIiwicG9zdDp3aXRuZXNzcmVwb3J0cyJdfQ.lsDjioNljG1J5ciw7yTmqNgwWo32owboYHQmYXLobgQX2P5VpggxtYlJDDmkSnfH2UpMPJD_3LGiG5hMayDOY8_MLxZbw7E_eu3kOtqpH-o0QsCZvwh6yoXHUqcAgd4-qf5-euOJnhAhzsp4gxaRJ_l0dc3-IPL9ayfkUm9nREstfIEZVVLsWgk2szGTdPxMvE-4tSB6iIrM-j7ftf5WaG3fCQHaHuOtdPIXLSe24RBAbJf45dN_QL6j1GICxUZ6b7jaNq7A0xPN20PULD99DIfsZPlGJgfAJzrpKqr2_us5BNFDstulNIf5UG2sJbRg2oAtAwLaR-d3mSKSZKJpJQ"

# curl -X PATCH http://localhost:5000/disasters --header "Content-Type: application/json" --header "Accept: application/vnd.heroku+json; version=3" --data '{"id": 4, "informal_name": "The Very Terrible Avalanche", "location_latitude": 8.1, "location_longitude": 130.5}' --header "Authorization: bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im4yWlN4YWR2T1F4V2xzMkxPTF9DRCJ9.eyJpc3MiOiJodHRwczovL2Rldi05eG81Z2RmYy51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NWY3ZmE3YmY2YmM3OTIwMDY4MjdmMzNhIiwiYXVkIjoiZGlzYXN0ZXJhcGkiLCJpYXQiOjE2MDc4OTE2NjIsImV4cCI6MTYwNzk3ODA2MiwiYXpwIjoiUkd1U2I4aHJhODlVeWRVaFZjanZKQXczblpIdEJEZFgiLCJzY29wZSI6IiIsInBlcm1pc3Npb25zIjpbImRlbGV0ZTp3aXRuZXNzcmVwb3J0cyIsImdldDpvYnNlcnZlcnMiLCJwYXRjaDpkaXNhc3RlcnMiLCJwYXRjaDp3aXRuZXNzcmVwb3J0cyIsInBvc3Q6ZGlzYXN0ZXJzIiwicG9zdDp3aXRuZXNzcmVwb3J0cyJdfQ.lsDjioNljG1J5ciw7yTmqNgwWo32owboYHQmYXLobgQX2P5VpggxtYlJDDmkSnfH2UpMPJD_3LGiG5hMayDOY8_MLxZbw7E_eu3kOtqpH-o0QsCZvwh6yoXHUqcAgd4-qf5-euOJnhAhzsp4gxaRJ_l0dc3-IPL9ayfkUm9nREstfIEZVVLsWgk2szGTdPxMvE-4tSB6iIrM-j7ftf5WaG3fCQHaHuOtdPIXLSe24RBAbJf45dN_QL6j1GICxUZ6b7jaNq7A0xPN20PULD99DIfsZPlGJgfAJzrpKqr2_us5BNFDstulNIf5UG2sJbRg2oAtAwLaR-d3mSKSZKJpJQ"


# curl -X PATCH https://sample-will.herokuapp.com/witnessreports --header "Content-Type: application/json" --header "Accept: application/vnd.heroku+json; version=3" --data '{"id": 2, "severity": 9, "event_datetime": "2019-08-02 07:20:11-04", "people_affected": 16000}' --header "Authorization: bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im4yWlN4YWR2T1F4V2xzMkxPTF9DRCJ9.eyJpc3MiOiJodHRwczovL2Rldi05eG81Z2RmYy51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NWY5M2Y5Yzc3M2VmNDkwMDcwMzNiMmFkIiwiYXVkIjoiZGlzYXN0ZXJhcGkiLCJpYXQiOjE2MDc4ODk4NTAsImV4cCI6MTYwNzk3NjI1MCwiYXpwIjoiUkd1U2I4aHJhODlVeWRVaFZjanZKQXczblpIdEJEZFgiLCJzY29wZSI6IiIsInBlcm1pc3Npb25zIjpbInBhdGNoOndpdG5lc3NyZXBvcnRzIiwicG9zdDp3aXRuZXNzcmVwb3J0cyJdfQ.c1m8VppvPuQgSFxOUviu2LXa8lE1yGE72_yuBFhYriFjZVCXBZXXjDByRZ_eH0Zh6hzpfBzjERtJ0smmvq7USw1-Ll_Ek92yKhTbLQLlPLq7m4ez1z5l7xPXiDehOZCgBdrVhNstT1mCb_dXnHv_qIdcpOmuxuaAx1ZTBJivklLr_VTSX27RQiAlYfFm_NIpack3826k4yN4_36Ii9_pszAFeK4WVuVUDukGtR-yLnmabU2bx1lKWl5iVJKU8T9UQX6N-IYML21MeUFG7Mn93tMOqBUIMq0_vt1UFeSUDTaoEjzyUhVR-STti7KfOGzqqw5y3p-B-__eGiFYhJwouA"
# curl -X PATCH http://localhost:5000/witnessreports --header "Content-Type: application/json" --header "Accept: application/vnd.heroku+json; version=3" --data '{"id": 2, "severity": 9, "event_datetime": "2019-08-02 07:20:11-04", "people_affected": 16000}' --header "Authorization: bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im4yWlN4YWR2T1F4V2xzMkxPTF9DRCJ9.eyJpc3MiOiJodHRwczovL2Rldi05eG81Z2RmYy51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NWY5M2Y5Yzc3M2VmNDkwMDcwMzNiMmFkIiwiYXVkIjoiZGlzYXN0ZXJhcGkiLCJpYXQiOjE2MDc4ODk4NTAsImV4cCI6MTYwNzk3NjI1MCwiYXpwIjoiUkd1U2I4aHJhODlVeWRVaFZjanZKQXczblpIdEJEZFgiLCJzY29wZSI6IiIsInBlcm1pc3Npb25zIjpbInBhdGNoOndpdG5lc3NyZXBvcnRzIiwicG9zdDp3aXRuZXNzcmVwb3J0cyJdfQ.c1m8VppvPuQgSFxOUviu2LXa8lE1yGE72_yuBFhYriFjZVCXBZXXjDByRZ_eH0Zh6hzpfBzjERtJ0smmvq7USw1-Ll_Ek92yKhTbLQLlPLq7m4ez1z5l7xPXiDehOZCgBdrVhNstT1mCb_dXnHv_qIdcpOmuxuaAx1ZTBJivklLr_VTSX27RQiAlYfFm_NIpack3826k4yN4_36Ii9_pszAFeK4WVuVUDukGtR-yLnmabU2bx1lKWl5iVJKU8T9UQX6N-IYML21MeUFG7Mn93tMOqBUIMq0_vt1UFeSUDTaoEjzyUhVR-STti7KfOGzqqw5y3p-B-__eGiFYhJwouA"




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