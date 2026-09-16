try:
    from .intent_detection import detect_intent
    from .entity_extraction import extract_entities
except (ImportError, ValueError):
    from intent_detection import detect_intent
    from entity_extraction import extract_entities


def calculate_confidence(intent, entities):
    score = 0.0

    # Intent confidence
    if intent != "UNKNOWN":
        score += 0.5

    # Location confidence
    if entities["location"] is not None:
        score += 0.2

    # Date confidence
    if entities["date"] is not None:
        score += 0.1

    # Forecast range confidence
    if entities["forecast_range"] is not None:
        score += 0.1

    # Alert type confidence
    if entities["alert_type"] is not None:
        score += 0.1

    return round(score, 2)


def parse_weather_query(query):
    entities = extract_entities(query)
    intent = detect_intent(query)

    confidence = calculate_confidence(
        intent,
        entities
    )

    return {
        "query": query,
        "intent": intent,
        "location": entities["location"],
        "date": entities["date"],
        "forecast_range": entities["forecast_range"],
        "alert_type": entities["alert_type"],
        "confidence_score": confidence
    }


if __name__ == "__main__":
    queries = [
        "What is the weather in Tirupati today?",
        "Will it rain in Chennai tomorrow?",
        "Give me the forecast for Bangalore next week",
        "Set a rain alert in Hyderabad",
        "Hello"
    ]

    for query in queries:
        print("\nQuery:", query)
        print(parse_weather_query(query))