import { useState } from 'react'
import WeatherCard from './components/WeatherCard'
import ChatWindow from './components/ChatWindow'
import ForecastList from './components/ForecastList'

function App() {
  const [weatherData, setWeatherData] = useState({
    city: 'Ludhiana',
    temperature: 28,
    condition: 'Partly Cloudy',
    humidity: 60,
    windSpeed: 12,
  })
  const [forecastData, setForecastData] = useState([])

  return (
    <div>
      <WeatherCard data={weatherData} />
      <ForecastList forecast={forecastData} />
      <ChatWindow onWeatherUpdate={setWeatherData} onForecastUpdate={setForecastData} />
    </div>
  )
}

export default App