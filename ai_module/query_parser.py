from intent_detection import detect_intent
from entity_extraction import extract_entities


def parse_weather_query(question):
    """
    Convert a natural-language weather question
    into a structured weather query.
    """

    if not isinstance(question, str) or not question.strip():
        raise ValueError("Question must be a non-empty string")

    intent = detect_intent(question)
    entities = extract_entities(question)

    weather_query = {
        "intent": intent,
        "location": entities["location"],
        "date": entities["date"],
        "time": entities["time"],
        "weather_parameter": entities["weather_parameter"],
        "forecast_range": None,
        "date_range": None,
        "topic": None,
        "alert_type": None,
        "severity": None,
        "original_question": question,
    }

    return weather_query


if __name__ == "__main__":

    questions = [
        "What is the weather in Hyderabad now?",
        "Will it rain in Bangalore tomorrow?",
        "What is the temperature in Chennai this evening?",
        "How humid is Mumbai today?",
        "Is there a cyclone warning in Delhi?",
        "What was the weather in Tirupati yesterday?",
        "Will it rain tomorrow?",
    ]

    for question in questions:
        print("Question:", question)
        print("Parsed Query:")

        result = parse_weather_query(question)

        print(result)
        print("-" * 70)