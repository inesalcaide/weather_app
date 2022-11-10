import os
import requests

class WeatherClient: # TODO nome do ficheiro devia ser o nome da classe em minuscualas separada por um _
    def __init__(self) -> None:
        #self.__api_key = os.environ.get("API_KEY")
        self.api_key = "e080a86cd0fc61f959575665f9a20954"

    def get_city_weather(self, city: str):
        """Lookup citys in API dict"""

        # Contact API
        try:
            url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={self.api_key}&units=metric"
            response = requests.get(url)
            response.raise_for_status
        except requests.RequestException:
            return None

        # Parse Response
        try:
            weather = response.json()
            return weather
        except (KeyError, TypeError, ValueError):
            return None
