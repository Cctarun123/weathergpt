from pydantic import BaseModel


class WeatherResponse(BaseModel):
    location: str
    temperature: float
    humidity: int
    wind_speed: float
    condition: str
    rain_probability: float | None


class ForecastItem(BaseModel):
    datetime: str
    temperature: float
    humidity: int
    wind_speed: float
    condition: str
    rain_probability: float


class ForecastResponse(BaseModel):
    location: str
    forecast: list[ForecastItem]