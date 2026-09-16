import re


def extract_location(query):
    location_patterns = [
        r"\bin ([A-Za-z]+(?: [A-Za-z]+)*)",
        r"\bat ([A-Za-z]+(?: [A-Za-z]+)*)",
        r"\bfor ([A-Za-z]+(?: [A-Za-z]+)*)"
    ]

    for pattern in location_patterns:
        match = re.search(pattern, query, re.IGNORECASE)

        if match:
            location = match.group(1).strip()

            # Remove common time words accidentally captured
            location = re.split(
                r"\b(today|tomorrow|tonight|now|next week)\b",
                location,
                flags=re.IGNORECASE
            )[0].strip()

            return location.title()

    return None


def extract_date(query):
    query = query.lower()

    if "today" in query:
        return "today"

    if "tomorrow" in query:
        return "tomorrow"

    if "tonight" in query:
        return "tonight"

    if "next week" in query:
        return "next_week"

    if "this week" in query:
        return "this_week"

    return None


def extract_forecast_range(query):
    query = query.lower()

    if "next week" in query:
        return "7_days"

    if "next 5 days" in query:
        return "5_days"

    if "next 3 days" in query:
        return "3_days"

    if "next few days" in query:
        return "3_days"

    if "tomorrow" in query:
        return "1_day"

    return None


def extract_alert_type(query):
    query = query.lower()

    if "rain" in query:
        return "rain"

    if "storm" in query:
        return "storm"

    if "wind" in query:
        return "wind"

    if "temperature" in query or "heat" in query:
        return "temperature"

    if "flood" in query:
        return "flood"

    return None


def extract_entities(query):
    return {
        "location": extract_location(query),
        "date": extract_date(query),
        "forecast_range": extract_forecast_range(query),
        "alert_type": extract_alert_type(query)
    }


if __name__ == "__main__":
    test_queries = [
        "What is the weather in Tirupati today?",
        "Will it rain in Chennai tomorrow?",
        "Give me the forecast for Bangalore next week",
        "Set a rain alert in Hyderabad",
        "Will there be strong winds in Delhi?"
    ]

    for query in test_queries:
        print("\nQuery:", query)
        print(extract_entities(query))