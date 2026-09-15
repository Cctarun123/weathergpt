from fastapi import FastAPI, HTTPException

from models.weather_models import WeatherResponse, ForecastResponse

from services.weather_service import (
    get_current_weather,
    normalize_weather,
    get_forecast,
    normalize_forecast
)


app = FastAPI(
    title="WeatherGPT Backend",
    description="Backend API for WeatherGPT",
    version="1.0.0"
)


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "WeatherGPT Backend"
    }


@app.get("/api/weather", response_model=WeatherResponse)
def weather(location: str):
    try:
        data = get_current_weather(location)
        return normalize_weather(data)

    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e)
        )

    except TimeoutError as e:
        raise HTTPException(
            status_code=504,
            detail=str(e)
        )

    except ConnectionError as e:
        raise HTTPException(
            status_code=503,
            detail=str(e)
        )

    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Unable to fetch weather data"
        )


@app.get("/api/forecast", response_model=ForecastResponse)
def forecast(location: str):
    try:
        data = get_forecast(location)
        return normalize_forecast(data)

    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e)
        )

    except TimeoutError as e:
        raise HTTPException(
            status_code=504,
            detail=str(e)
        )

    except ConnectionError as e:
        raise HTTPException(
            status_code=503,
            detail=str(e)
        )

    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Unable to fetch forecast data"
        )