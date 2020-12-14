# Natural Disaster Tracker

## Background

The purpose of this application is to provide a website for listing natural disasters and providing witness reports of those disasters, including:
- earthquakes
- floods
- wildfires
- tornadoes
- hurricanes
- tsunamis
- landslides
- avalanches
- volcano

Currently, there is only a back-end and database for the application, hosted on heroku. The third-party authorization service Auth0 is used to allow log-in. Any user may view disasters and witness reports for any disaster. Users with the role of "disaster reporter" can also post witness reports of disasters and edit (i.e. patch) witness reports of disasters. Finally, users with the role of "disaster administrator" can do all things that disaster reporters can do but can also get a list of all users, post a new disaster, and delete a disaster report.

The login page can be found [here
](https://dev-9xo5gdfc.us.auth0.com/authorize?audience=disasterapi&response_type=token&client_id=RGuSb8hra89UydUhVcjvJAw3nZHtBDdX&redirect_uri=https://sample-will.herokuapp.com/). Upon creating an account and logging in, the user is directed [here](https://sample-will.herokuapp.com/) to a basic endpoint which returns the string `"Hello"`.


## Getting Started


### Dependencies

All dependencies are listed in `requirements.txt` and can be installed with the following command, which should be run in the top-level of this project's directory:

```
pip install -r requirements.txt
```

Note the use of Python 3.7. If you do not have this version of Python installed, follow instructions to install the latest version of python for your platform in the [python docs](https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/).


#### Key Dependencies
- [Flask](https://flask.palletsprojects.com/en/1.1.x/) is a lightweight backend microservices framework. Flask is required to handle requests and responses.

- [SQLAlchemy](https://www.sqlalchemy.org/) is the Python SQL toolkit and ORM (object relational mapping) I used to handle the database. Most of the logic is set up in `app/__init__.py` and references `models.py`.

<!-- - [Flask-CORS](https://flask-cors.readthedocs.io/en/latest/#) is the extension I used to handle cross origin requests from the frontend server. -->

### Database Set Up

As mentioned above, the application's database is handled by heroku; however, for local development, you must set up a postgresql database. Assuming that you have postgres installed and the psql command line tool, create the database to use for development with:


```bash
psql -U <user> createdb sample-capstoneDB
```

where <user> is replaced by a user account for psql. You may be prompted for the corresponding password for this user. This will create the database.

To add sample data to the database for ad hoc testing, first update the last line of `setup.sh` from

```bash
SELECT * FROM disasters" sample-capstoneDB postgres
```

to 

```bash
SELECT * FROM disasters" sample-capstoneDB <user>
```

where `<user>` is the name of the user used to create the database `sample-capstoneDB` above. (If the username used is `postgres`, then you do not have to change anything.)

Next run the following command, which will load the contents of `setup.sh` to the `sample-capstoneDB` database:

```bash
bash setup.sh
```

### Running The Local Server

If you have set up the local database as described above in the "Database Set Up" section, then you next need tokens for the disaster administrator role and the disaster reporter role. These can be obtained by navigating to [this endpoint](https://dev-9xo5gdfc.us.auth0.com/authorize?audience=disasterapi&response_type=token&client_id=RGuSb8hra89UydUhVcjvJAw3nZHtBDdX&redirect_uri=https://sample-will.herokuapp.com/) and either:

1) creating your own account with a password and contacting me to enable you as one of the two roles described above
2) follow these steps for the three kinds of users (warning - as the passwords used are being provided, do not upload sensitive information to this application):
    - create your own account at the above endpoint for a regular user
    - log in as will0000@mailinator.com with password azAZ09!@ for a disaster reporter role
    - log in as will-admin@mailinator.com with password azAZ09!@ for a disaster admin role

In the above three cases, upon logging in you will be re-directed from Auth0 to the application, which will include a bearer token in the URL. Take the value of the token for the disaster admin account and set that value for the `TOKEN` variable in `set_envVars.sh`. Similarly, take the value of the token for the disaster reporter account and set that value for the `REPORTER_TOKEN` in `set_envVars.sh`.

Having set the tokens, now run

```bash
source set_envVars.sh
```

Finally, run

```bash
flask run
```

to begin the local server on localhost port 5000. You can verify that the server is running properly by opening another terminal window and running the command

```bash
curl -X GET http://localhost:5000/
```

This should return the message "Hello!!!!!".

## Tests

All tests are present in `test_sample_will.py`. These tests include both tests for the correctness of the endpoints and tests for authorization. To run them successfully follow these steps:

1) Follow the instructions in the "Running The Local Server" section above to obtain tokens for the roles and set them in `set_envVars.sh`.

2) Run the following command to set the environment variables from `set_envVars.sh`

    ```bash
    source set_envVars.sh
    ```

3) Create a test postgresql database called `test-capstoneDB` with a user account using the following command:

    ```bash
    createdb -U <user> test-capstoneDB
    ```

    where `<user>` is replaced by your user account. You will likely be prompted for the password for that user account.

4) Set the environment variable `MY_PG_USER` for the `<user>` used above to create the test database with the following command:

    ```bash
    export MY_PG_USER=<user>
    ```

    where `<user>` is replaced by the user name used to create the test database.

5) Set the environment variable `MY_PG_PWD` for the password of the `<user>` used above to create the database with the following command:

    ```bash
    export MY_PG_PWD=<pwd>
    ```

    where `<pwd>` is the password of the user used to create the test database.

6) Run the following command to now run all tests:

    ```bash
    python3 test_sample_will.py
    ```


## API Referencee

### General Notes

- This project can be run locally as described above using the base URL `http://localhost:5000`.
- It is also hosted remotely through heroku, for which the base URL is `https://sample-will.herokuapp.com/`. For endpoints which require authentication, the corresponding authentication token can be set. With cURL, this can be done by appending the string `'--header "Authorization: bearer '` followed by the bearer token value.

### Error Handling

Errors are returned as JSON objects in the following format:

```json
{
  "success": false,
  "error": 400,
  "message": "The request was malformed."
}
```

The API returns four error types when requests fail:
- 400: malformed request
- 401: authorization issue
- 404: resource not found
- 422: unprocessable

### Endpoints

- GET '/disasters'
- GET '/disasters/<disaster_id>'
- GET '/observers'
- POST '/disasters'
- POST '/observers'
- POST '/witnessreports'
- PATCH '/disasters'
- PATCH '/witnessreports'
- DELETE '/witnessreports/<witness_report_id>'

**GET '/disasters'**

- A GET endpoint to get all disasters or disasters by disaster type. This endpoint takes an optional parameter 'disaster_type' for the disaster_type. If no disaster_type parameter is provided, then the data for all disasters is returned. If the disaster_type parameter is provided but is not one of the recognized enums, a 404 error is raised.
- Role: None required
- Request arguments: None
- Query parameters: optional `page` number
- Returns: This endpoint does not return any of the witness reports associated with a specific disaster. For each disaster, the data in the disaster table is returned along with a random comment and the author of that comment from a witness of the disaster (if any) and some descriptive data about the disaster reports per disaster (namely, the number of reports, the first observance, the last observance, and the number of people affected).
- Sample: `curl -X GET https://sample-will.herokuapp.com/disasters`
- Response:

    ```json
    {
        "disasters":[
            {
                "average_severity":null,
                "disaster_type":"avalanche",
                "first_observance":null,
                "id":4,
                "informal_name":"The Big Avalanche",
                "is_ongoing":false,
                "last_observance":null,
                "location":[
                    28.632662,
                    83.833038
                ],
                "num_reports":0,
                "official_name":"Avalanche-202012110821",
                "people_affected":null,
                "random_comment":null,
                "random_observer":null,
                "random_observer_url":null
            },
            {
                "average_severity":3.0,
                "disaster_type":"tsunami",
                "first_observance":"Wed, 31 Jul 2019 13:01:47 GMT",
                "id":2,
                "informal_name":"The Terrible Tsunami",
                "is_ongoing":false,
                "last_observance":"Wed, 31 Jul 2019 13:01:47 GMT",
                "location":[
                    8.1,
                    130.5
                ],
                "num_reports":1,
                "official_name":"Tsunami-1",
                "people_affected":1300,
                "random_comment":"The disaster is quite bad",
                "random_observer":"disaster_recorder",
                "random_observer_url":"https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg"
            }
        ],
        "total_disasters":2
    }
    ```


**GET '/disasters/<disaster_id>'**

- A GET endpoint to get the details of a single disaster, including:
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
- The reports property contains a list of individual witness reports, each including:
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
- Role: None required
- Request arguments: None
- Query parameters: optional `page` number
- Sample: `curl -X GET https://sample-will.herokuapp.com/disasters/2`
- Response:

    ```json
    {
        "average_severity":3.0,
        "disaster_type":"tsunami",
        "first_observance":"Wed, 31 Jul 2019 13:01:47 GMT",
        "id":2,
        "informal_name":"The Terrible Tsunami",
        "is_ongoing":false,
        "last_observance":"Wed, 31 Jul 2019 13:01:47 GMT",
        "location":[
            8.1,
            130.5
        ],
        "num_reports":1,
        "official_name":"Tsunami-1",
        "people_affected":1300,
        "reports":[
            {
                "comment":"The disaster is quite bad",
                "event_datetime":"Wed, 31 Jul 2019 13:01:47 GMT",
                "id":2,
                "image_url":"https://hgtvhome.sndimg.com/content/dam/images/grdn/fullset/2012/8/20/0/0403_051.jpg.rend.hgtvcom.1280.1920.suffix/1452646441575.jpeg",
                "location":[
                    23.4,
                    -10.3
                ],
                "observer_id":1,
                "people_affected":1300,
                "severity":3,
                "user_photograph_url":"https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg",
                "username":"disaster_recorder"
            }
        ]
    }
    ```


**GET '/observers'**

- A GET endpoint to retrieve a page of the set of observers, including the observers' ids, usernames, and the URLs of their user photographs. The page can be specified as a query parameter and if none is provided, it will be assumed to be 1. The use of an invalid page (i.e. a non-positive page) will cause a status 422 error to be returned.
- Query parameters: optional `page` number
- Sample: curl -X GET https://sample-will.herokuapp.com/observers --header "Authorization: bearer <token>" (token omitted due to length)
- Response:

    ```json
    {
        "observers":[
            {
                "id":1,
                "photograph_url":"https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg",
                "username":"disaster_recorder"
            },
            {
                "id":2,
                "photograph_url":"https://www.incimages.com/uploaded_files/image/1920x1080/getty_844768902_299186.jpg",
                "username":"test_disaster_observer"
            }
        ]
    }
    ```