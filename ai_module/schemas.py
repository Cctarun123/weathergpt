from dataclasses import dataclass
from typing import Optional


@dataclass
class WeatherQuery:
    intent: str
    location: Optional[str] = None
    date: Optional[str] = None
    time: Optional[str] = None
    weather_parameter: Optional[str] = None
    forecast_range: Optional[str] = None
    date_range: Optional[str] = None
    topic: Optional[str] = None
    alert_type: Optional[str] = None
    severity: Optional[str] = None
    original_question: str = ""