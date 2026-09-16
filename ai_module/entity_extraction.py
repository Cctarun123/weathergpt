import re


def extract_location(question):
    """
    Extract a location from a weather question.

    This is a basic version using common Indian city names.
    """

    locations = [
        "hyderabad",
        "bangalore",
        "bengaluru",
        "chennai",
        "mumbai",
        "delhi",
        "kolkata",
        "pune",
        "tirupati",
        "vijayawada",
        "visakhapatnam",
        "kerala",
        "goa",
        "ooty",
        "jaipur",
        "lucknow",
        "ahmedabad",
    ]

    text = question.lower()

    for location in locations:
        if location in text:
            return location.title()

    return None


def extract_date(question):
    """
    Extract a relative date or simple date phrase.
    """

    text = question.lower()

    date_patterns = [
        r"\btoday\b",
        r"\btomorrow\b",
        r"\byesterday\b",
        r"\btonight\b",
        r"\bthis weekend\b",
        r"\bnext weekend\b",
        r"\bnext week\b",
        r"\blast week\b",
        r"\blast month\b",
        r"\bnext month\b",
    ]

    for pattern in date_patterns:
        match = re.search(pattern, text)

        if match:
            return match.group()

    return None


def extract_time(question):
    """
    Extract common time expressions.
    """

    text = question.lower()

    time_patterns = [
        r"\bmorning\b",
        r"\bafternoon\b",
        r"\bevening\b",
        r"\bnight\b",
        r"\bnoon\b",
        r"\bmidnight\b",
        r"\b\d{1,2}\s?(am|pm)\b",
    ]

    for pattern in time_patterns:
        match = re.search(pattern, text)

        if match:
            return match.group()

    return None


def extract_weather_parameter(question):
    """
    Extract the weather parameter requested by the user.
    """

    text = question.lower()

    parameter_keywords = {
        "temperature": [
            "temperature",
            "hot",
            "cold",
        ],
        "rainfall": [
            "rain",
            "raining",
            "rainfall",
            "precipitation",
        ],
        "humidity": [
            "humidity",
            "humid",
        ],
        "wind_speed": [
            "wind",
            "wind speed",
        ],
        "pressure": [
            "pressure",
        ],
        "visibility": [
            "visibility",
        ],
        "uv_index": [
            "uv index",
            "uv",
        ],
    }

    for parameter, keywords in parameter_keywords.items():
        for keyword in keywords:
            if keyword in text:
                return parameter

    return None


def extract_entities(question):
    """
    Extract all available entities from the question.
    """

    if not isinstance(question, str) or not question.strip():
        raise ValueError("Question must be a non-empty string")

    return {
        "location": extract_location(question),
        "date": extract_date(question),
        "time": extract_time(question),
        "weather_parameter": extract_weather_parameter(question),
    }


if __name__ == "__main__":

    questions = [
        "What is the weather in Hyderabad now?",
        "Will it rain in Bangalore tomorrow?",
        "What is the temperature in Chennai this evening?",
        "How humid is Mumbai today?",
        "What is the wind speed in Delhi tomorrow morning?",
        "What is the weather in Tirupati?",
        "Will it rain tomorrow?",
    ]

    for question in questions:
        print("Question:", question)
        print("Entities:", extract_entities(question))
        print("-" * 60)