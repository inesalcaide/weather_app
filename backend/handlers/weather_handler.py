from datetime import datetime
from functions import WeatherClient


class WeatherHandler:
    def __init__(self) -> None:
        self.weather_client = WeatherClient()
        self._saved_cities = []

    
    def get_city_weather(self, city: str):
        weather_response = self.get_weather(city)
        self._saved_cities.append(city)
        return weather_response
    

    def _transform_weather_responde(self, weather: dict):
        sunrise = self._transform_timestamp(weather["sys"]["sunrise"])
        sunset = self._transform_timestamp(weather["sys"]["sunset"])

        return {
            "city": weather["name"],
            "main": weather["weather"][0]["main"],
            "description": weather["weather"][0]["description"],
            "temperature": int(weather["main"]["temp"]),
            "feels_like": weather["main"]["feels_like"],
            "temp_min": int(weather["main"]["temp_min"]),
            "temp_max": int(weather["main"]["temp_max"]),
            "pressure": weather["main"]["pressure"],
            "humidity": weather["main"]["humidity"],
            "sunrise": sunrise,
            "sunset": sunset,
            "cloudiness" : weather["clouds"]["all"],
            "wind": weather["wind"]["speed"],
            "visibility": weather["visibility"],
        }

    def _transform_timestamp(self, ts: str):
        ts = int(ts)
        return datetime.utcfromtimestamp(ts).strftime('%H:%M')

    def get_saved_cities_weather(self):
        cities = []

        for city in self._saved_cities:
            weather_response = self.get_weather(city)
            cities.append(weather_response)
        return cities

    def get_weather(self, city: str):
        weather = self.weather_client.get_city_weather(city)
        weather_response = self._transform_weather_responde(weather)
        return weather_response
