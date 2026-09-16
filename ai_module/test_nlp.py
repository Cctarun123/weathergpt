try:
    from ai_module.entity_extraction import extract_entities
    from ai_module.intent_detection import detect_intent
    from ai_module.query_parser import parse_weather_query
except ImportError:
    from entity_extraction import extract_entities
    from intent_detection import detect_intent
    from query_parser import parse_weather_query


def test_intent_detection():
    assert detect_intent("What is the weather today?") == "CURRENT_WEATHER"
    assert detect_intent("Will it rain tomorrow?") == "RAIN_FORECAST"
    assert detect_intent("Set an alert for heavy rain") == "ALERTS"


def test_entity_extraction():
    result = extract_entities("What is the weather in Tirupati tomorrow?")

    assert result["location"] == "Tirupati"
    assert result["date"] == "tomorrow"


def test_query_parser():
    result = parse_weather_query("Will it rain in Tirupati tomorrow?")

    assert result["intent"] == "RAIN_FORECAST"
    assert result["location"] == "Tirupati"
    assert result["date"] == "tomorrow"


# if __name__ == "__main__":
#     test_intent_detection()
#     test_entity_extraction()
#     test_query_parser()

#     print("All NLP tests passed successfully!")

if __name__ == "__main__":
    queries = [
        "What is the weather today?",
        "Will it rain tomorrow in Tirupati?",
        "Give me the forecast for Chennai",
        "Set an alert for heavy rain",
        "What is the temperature in Bangalore?"
    ]

    for query in queries:
        print("\nQuery:", query)
        print(parse_weather_query(query))