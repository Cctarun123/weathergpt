# WeatherGPT NLP Query Specification

## 1. Purpose

The NLP module converts a user's natural-language weather question into a structured query.

This structured query will be used by:

* Backend weather API module
* RAG and database module
* LLM response-generation module
* Weather alerts module

The NLP module should identify:

1. User intent
2. Location
3. Date
4. Time
5. Weather parameter
6. Other relevant details

---

## 2. Supported Intents

### 2.1 CURRENT_WEATHER

Used when the user asks about the current weather.

**Examples:**

* What is the weather now?
* How is the weather in Hyderabad?
* Is it hot in Bangalore today?
* What is the current temperature?

**Required fields:**

* `intent`
* `location`
* `original_question`

**Optional fields:**

* `date`
* `time`
* `weather_parameter`

---

### 2.2 FORECAST

Used when the user asks about future weather conditions.

**Examples:**

* What will the weather be tomorrow?
* Give me the weather forecast for Hyderabad.
* What is the weather this weekend?
* Will it be cloudy tomorrow?

**Required fields:**

* `intent`
* `location`
* `original_question`

**Optional fields:**

* `date`
* `time`
* `forecast_range`
* `weather_parameter`

---

### 2.3 RAIN_FORECAST

Used when the user specifically asks about rain or precipitation.

**Examples:**

* Will it rain tomorrow?
* Is there a chance of rain today?
* Should I carry an umbrella?
* Will it rain in Chennai this evening?

**Required fields:**

* `intent`
* `location`
* `original_question`

**Optional fields:**

* `date`
* `time`
* `forecast_range`

---

### 2.4 CLIMATE_INFO

Used when the user asks about climate-related information.

**Examples:**

* What is the climate of Kerala?
* Which month is best to visit Ooty?
* What is the average temperature in Delhi?
* Explain the monsoon season in India.

**Required fields:**

* `intent`
* `location`
* `original_question`

**Optional fields:**

* `month`
* `season`
* `topic`

---

### 2.5 HISTORICAL_WEATHER

Used when the user asks about weather from the past.

**Examples:**

* What was the temperature yesterday?
* How was the weather last week?
* What was the rainfall in Mumbai last month?
* Show the weather history of Hyderabad.

**Required fields:**

* `intent`
* `location`
* `original_question`

**Optional fields:**

* `date`
* `date_range`
* `weather_parameter`

---

### 2.6 ALERTS

Used when the user asks about severe weather or weather warnings.

**Examples:**

* Is there any storm warning?
* Are there heavy rainfall alerts?
* Is there a cyclone warning in Chennai?
* Will there be extreme weather tomorrow?

**Required fields:**

* `intent`
* `location`
* `original_question`

**Optional fields:**

* `date`
* `alert_type`
* `severity`

---

## 3. Structured Query Format

The NLP module should convert a user question into the following format:

```json
{
  "intent": "RAIN_FORECAST",
  "location": "Hyderabad",
  "date": "tomorrow",
  "time": null,
  "weather_parameter": "rain",
  "forecast_range": null,
  "original_question": "Will it rain in Hyderabad tomorrow?"
}
```

---

## 4. Field Definitions

### intent

Identifies the type of weather question.

Possible values:

```text
CURRENT_WEATHER
FORECAST
RAIN_FORECAST
CLIMATE_INFO
HISTORICAL_WEATHER
ALERTS
```

### location

The place mentioned by the user.

**Examples:**

```text
Hyderabad
Bangalore
Chennai
Delhi
Mumbai
```

If the location is missing, the value should be:

```json
null
```

The system should then ask the user for their location.

### date

The date or relative day mentioned by the user.

**Examples:**

```text
today
tomorrow
yesterday
next Monday
15 September 2026
```

### time

The time mentioned by the user.

**Examples:**

```text
morning
afternoon
evening
night
6 PM
```

### weather_parameter

The weather information requested by the user.

**Examples:**

```text
temperature
rainfall
humidity
wind_speed
pressure
visibility
uv_index
```

### forecast_range

Used when the user asks for weather over a period.

**Examples:**

```text
today
tomorrow
next 3 days
this week
next week
this weekend
```

### original_question

The complete question entered by the user.

### date_range

Used for historical weather questions involving a period.

**Examples:**

```text
last week
last month
January 2025
1 June 2025 to 7 June 2025
```

### topic

The climate-related topic requested by the user.

**Examples:**

```text
monsoon
summer
winter
average temperature
best travel season
```

### alert_type

The type of weather alert.

**Examples:**

```text
cyclone
storm
heavy rainfall
flood
heatwave
thunderstorm
```

### severity

The seriousness of the alert.

Possible values:

```text
low
moderate
high
extreme
unknown
```

---

## 5. Example Queries

### Example 1: Current weather

**User question:**

```text
What is the weather in Hyderabad now?
```

**Expected structured output:**

```json
{
  "intent": "CURRENT_WEATHER",
  "location": "Hyderabad",
  "date": "today",
  "time": "now",
  "weather_parameter": null,
  "forecast_range": null,
  "original_question": "What is the weather in Hyderabad now?"
}
```

### Example 2: Rain forecast

**User question:**

```text
Will it rain in Bangalore tomorrow?
```

**Expected structured output:**

```json
{
  "intent": "RAIN_FORECAST",
  "location": "Bangalore",
  "date": "tomorrow",
  "time": null,
  "weather_parameter": "rainfall",
  "forecast_range": null,
  "original_question": "Will it rain in Bangalore tomorrow?"
}
```

### Example 3: General forecast

**User question:**

```text
What will the weather be like in Chennai this weekend?
```

**Expected structured output:**

```json
{
  "intent": "FORECAST",
  "location": "Chennai",
  "date": null,
  "time": null,
  "weather_parameter": null,
  "forecast_range": "this weekend",
  "original_question": "What will the weather be like in Chennai this weekend?"
}
```

### Example 4: Climate information

**User question:**

```text
What is the climate of Kerala?
```

**Expected structured output:**

```json
{
  "intent": "CLIMATE_INFO",
  "location": "Kerala",
  "date": null,
  "time": null,
  "weather_parameter": null,
  "forecast_range": null,
  "topic": "climate",
  "original_question": "What is the climate of Kerala?"
}
```

### Example 5: Historical weather

**User question:**

```text
What was the temperature in Delhi yesterday?
```

**Expected structured output:**

```json
{
  "intent": "HISTORICAL_WEATHER",
  "location": "Delhi",
  "date": "yesterday",
  "time": null,
  "weather_parameter": "temperature",
  "forecast_range": null,
  "original_question": "What was the temperature in Delhi yesterday?"
}
```

### Example 6: Weather alert

**User question:**

```text
Is there a cyclone warning in Mumbai?
```

**Expected structured output:**

```json
{
  "intent": "ALERTS",
  "location": "Mumbai",
  "date": null,
  "time": null,
  "weather_parameter": null,
  "forecast_range": null,
  "alert_type": "cyclone",
  "severity": "unknown",
  "original_question": "Is there a cyclone warning in Mumbai?"
}
```

---

## 6. Missing Information Handling

### 6.1 Missing location

**User question:**

```text
Will it rain tomorrow?
```

**Expected output:**

```json
{
  "intent": "RAIN_FORECAST",
  "location": null,
  "date": "tomorrow",
  "time": null,
  "weather_parameter": "rainfall",
  "forecast_range": null,
  "original_question": "Will it rain tomorrow?"
}
```

**System response:**

```text
Which location would you like the weather forecast for?
```

---

### 6.2 Missing date

**User question:**

```text
What is the weather in Hyderabad?
```

**Expected behavior:**

* Extract location as Hyderabad.
* Identify current weather if the user asks about the present.
* Use conversation context when available.
* Ask a clarification question if the request is ambiguous.

---

### 6.3 Ambiguous question

**User question:**

```text
Is it good outside?
```

**Expected behavior:**

* Identify that the question is ambiguous.
* Ask for the location.
* Ask whether the user wants current weather, rain information, temperature, or another detail.

---

## 7. Initial Implementation Approach

The first version will not train a custom machine-learning model.

The initial NLP implementation can use:

* Rule-based keyword matching
* Entity extraction
* Date and time recognition
* LLM-based structured output
* Output validation
* Test questions

The NLP module must return predictable structured data instead of only returning free-form text.

---

## 8. Validation Rules

The output should follow these rules:

1. `intent` must be one of the supported intents.
2. `original_question` must not be empty.
3. `location` can be `null` when the user does not mention a location.
4. Unknown fields should be set to `null`.
5. The output must be valid JSON.
6. The output should not contain extra explanations outside the JSON object.
7. The system should ask a clarification question when important information is missing.
8. The original user question must be preserved exactly.

---

## 9. Future Improvements

Possible future improvements include:

* Conversation memory
* Multi-location questions
* Multiple weather parameters
* Multilingual weather questions
* Voice input support
* Better date resolution
* Personalized weather alerts
* Confidence scores for intent detection
