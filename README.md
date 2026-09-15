\# WeatherGPT



WeatherGPT is an AI-powered weather application that provides current weather information and forecasts through a simple backend API.



\## Backend



The WeatherGPT backend is built using:



\- Python 3.10

\- FastAPI

\- Uvicorn

\- OpenWeather API

\- Pydantic

\- Requests

\- python-dotenv



\## Backend Features



\- Current weather information

\- Weather forecast information

\- Location-based weather queries

\- Consistent JSON responses

\- Invalid-location handling

\- Weather provider timeout handling

\- Weather provider connection error handling

\- Automatic API documentation with Swagger UI



\## Backend Project Structure



```text

backend/

├── main.py

├── requirements.txt

├── .env

├── models/

│   └── weather\_models.py

└── services/

&#x20;   └── weather\_service.py

