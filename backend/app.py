from handlers.weather_handler import WeatherHandler
from handlers.autentication_handler import login_required
from flask import Flask, request, json, render_template
from flask_session import Session
from flask_cors import CORS, cross_origin
from handlers.Errors import Error


app = Flask(__name__)
cors = CORS(app)

# Configure session
app.config['SESSION_PERMANENT'] = False
app.config['SESSION_TYPE'] = 'fylesystem'
app.config['CORS_HEADERS'] = 'Content-Type'
Session(app)

CITIES_LIST = []


def _load_cities_list():
    # Opening JSON file
    f = open('city.list.min.json')

    # returns JSON object as 
    # a dictionary
    data = json.load(f)
    for i in data:
        CITIES_LIST.append(i["name"])

    # Closing file
    f.close()


_load_cities_list()
weather_handler = WeatherHandler()


@app.route("/")
def index():
    """if not session.get("name"):"""
    _load_cities_list()
    return render_template("index.html", citys=CITIES_LIST)


@app.route('/weather', methods=['GET'])
@cross_origin()
def get_weather():

    # Validate city
    city = request.args.get("city")
    city = city.lower().capitalize()
    if not city:
        print(Error.NO_CITY.value)
        return {"error": Error.NO_CITY.value}
    if city not in CITIES_LIST:
        print(Error.CITY_NOT_IN_LIST.value)
        return {"error": Error.CITY_NOT_IN_LIST.value}

    weather_response = weather_handler.get_weather(city)

    return {"weather": weather_response}


@app.route("/cities")
@login_required
def cities():
    print("HERE")
    cities_response = weather_handler.get_saved_cities_weather()
    print(cities_response)
    if len(cities_response) == 0:
        return {"error": "No cities in the database"}
    return {"cities": cities_response}


@app.route("/list")
@cross_origin()
def get_cities_list():
    return {"cities": CITIES_LIST}
