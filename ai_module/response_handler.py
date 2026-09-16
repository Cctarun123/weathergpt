def handle_parsed_query(parsed_query):
    confidence = parsed_query["confidence_score"]

    if confidence < 0.5:
        return {
            "status": "clarification_required",
            "message": "Please provide a location, such as Tirupati or Chennai."
        }

    return {
        "status": "success",
        "message": "Query successfully understood.",
        "parsed_query": parsed_query
    }


if __name__ == "__main__":
    from query_parser import parse_weather_query

    queries = [
        "What is the weather in Tirupati today?",
        "Hello"
    ]

    for query in queries:
        parsed_query = parse_weather_query(query)
        response = handle_parsed_query(parsed_query)

        print("\nUser Query:", query)
        print(response)