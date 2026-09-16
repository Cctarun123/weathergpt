import os
import requests
from requests.exceptions import Timeout, RequestException
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("OPENWEATHER_API_KEY")

BASE_URL = "https://api.openweathermap.org/data/2.5/weather"
FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast"


def get_current_weather(location: str):
    if not API_KEY:
        raise ValueError("OpenWeather API key is not configured")

    params = {
        "q": location,
        "appid": API_KEY,
        "units": "metric"
    }

    try:
        response = requests.get(
            BASE_URL,
            params=params,
            timeout=10
        )
    except Timeout:
        raise TimeoutError("Weather provider request timed out")
    except RequestException:
        raise ConnectionError("Unable to connect to weather provider")

    if response.status_code == 404:
        raise ValueError(f"Location '{location}' not found")

    response.raise_for_status()

    return response.json()


def normalize_weather(data):
    try:
        return {
            "location": data["name"],
            "temperature": data["main"]["temp"],
            "humidity": data["main"]["humidity"],
            "wind_speed": data["wind"]["speed"],
            "condition": data["weather"][0]["description"],
            "rain_probability": None
        }
    except (KeyError, IndexError, TypeError):
        raise ValueError("Weather provider returned incomplete weather data")


def get_forecast(location: str):
    if not API_KEY:
        raise ValueError("OpenWeather API key is not configured")

    params = {
        "q": location,
        "appid": API_KEY,
        "units": "metric"
    }

    try:
        response = requests.get(
            FORECAST_URL,
            params=params,
            timeout=10
        )
    except Timeout:
        raise TimeoutError("Weather provider request timed out")
    except RequestException:
        raise ConnectionError("Unable to connect to weather provider")

    if response.status_code == 404:
        raise ValueError(f"Location '{location}' not found")

    response.raise_for_status()

    return response.json()


def normalize_forecast(data):
    try:
        forecast = []

        for item in data["list"]:
            forecast.append({
                "datetime": item["dt_txt"],
                "temperature": item["main"]["temp"],
                "humidity": item["main"]["humidity"],
                "wind_speed": item["wind"]["speed"],
                "condition": item["weather"][0]["description"],
                "rain_probability": item.get("pop", 0) * 100
            })

        return {
            "location": data["city"]["name"],
            "forecast": forecast
        }

    except (KeyError, IndexError, TypeError):
        raise ValueError("Weather provider returned incomplete forecast data")