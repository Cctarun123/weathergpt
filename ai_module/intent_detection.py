SUPPORTED_INTENTS = [
    "CURRENT_WEATHER",
    "FORECAST",
    "RAIN_FORECAST",
    "CLIMATE_INFO",
    "HISTORICAL_WEATHER",
    "ALERTS",
    "UNKNOWN",
]


def contains_keyword(text, keywords):
    """
    Check whether any keyword exists in the question.
    """
    return any(keyword in text for keyword in keywords)


def detect_intent(question):
    """
    Detect the intent of a weather-related question.
    """

    # Validate input
    if not isinstance(question, str) or not question.strip():
        raise ValueError("Question must be a non-empty string")

    # Convert question to lowercase
    text = question.lower().strip()

    # --------------------------------------------------
    # 1. ALERTS
    # --------------------------------------------------
    alert_keywords = [
        "alert",
        "warning",
        "cyclone",
        "storm warning",
        "heatwave",
        "heat wave",
        "flood warning",
        "severe weather",
        "weather warning",
    ]

    if contains_keyword(text, alert_keywords):
        return "ALERTS"

    # --------------------------------------------------
    # 2. HISTORICAL WEATHER
    # --------------------------------------------------
    historical_keywords = [
        "yesterday",
        "last week",
        "last month",
        "previous",
        "historical",
        "history",
        "past weather",
        "last year",
    ]

    if contains_keyword(text, historical_keywords):
        return "HISTORICAL_WEATHER"

    # --------------------------------------------------
    # 3. CLIMATE INFORMATION
    # --------------------------------------------------
    climate_keywords = [
        "climate",
        "monsoon",
        "summer season",
        "winter season",
        "average temperature",
        "best month to visit",
        "best season to visit",
        "climatic conditions",
    ]

    if contains_keyword(text, climate_keywords):
        return "CLIMATE_INFO"

    # --------------------------------------------------
    # 4. RAIN FORECAST
    # --------------------------------------------------
    rain_keywords = [
        "rain",
        "raining",
        "rainfall",
        "precipitation",
        "umbrella",
        "drizzle",
        "thunderstorm",
    ]

    if contains_keyword(text, rain_keywords):
        return "RAIN_FORECAST"

    # --------------------------------------------------
    # 5. GENERAL WEATHER FORECAST
    # --------------------------------------------------
    forecast_keywords = [
        "tomorrow",
        "next week",
        "this weekend",
        "next weekend",
        "forecast",
        "future weather",
        "coming days",
        "upcoming days",
        "will the weather",
    ]

    if contains_keyword(text, forecast_keywords):
        return "FORECAST"

    # --------------------------------------------------
    # 6. CURRENT WEATHER
    # --------------------------------------------------
    current_keywords = [
        "now",
        "currently",
        "current",
        "today",
        "temperature",
        "weather",
        "hot",
        "cold",
        "humid",
        "humidity",
        "wind",
        "wind speed",
        "pressure",
        "visibility",
        "uv index",
    ]

    if contains_keyword(text, current_keywords):
        return "CURRENT_WEATHER"

    # --------------------------------------------------
    # 7. UNKNOWN QUESTION
    # --------------------------------------------------
    return "UNKNOWN"


# ------------------------------------------------------
# TESTING THE FUNCTION
# ------------------------------------------------------
if __name__ == "__main__":

    questions = [
        "What is the weather in Hyderabad now?",
        "Will it rain in Bangalore tomorrow?",
        "What is the climate of Kerala?",
        "What was the temperature in Delhi yesterday?",
        "Is there a cyclone warning in Mumbai?",
        "What will the weather be this weekend?",
        "How humid is Chennai today?",
        "What was the weather last month?",
        "Should I carry an umbrella tomorrow?",
        "Who are you?",
        "Tell me a joke.",
    ]

    for question in questions:
        intent = detect_intent(question)

        print("Question:", question)
        print("Intent:", intent)
        print("-" * 50)