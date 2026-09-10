import { useState } from 'react'
import WeatherCard from './components/WeatherCard'
import ChatWindow from './components/ChatWindow'
import ForecastList from './components/ForecastList'
import ClimateAnswer from './components/ClimateAnswer'

function App() {
  const [weatherData, setWeatherData] = useState({
    city: 'Ludhiana',
    temperature: 28,
    condition: 'Partly Cloudy',
    humidity: 60,
    windSpeed: 12,
  })
  const [forecastData, setForecastData] = useState([])
  const [climateData, setClimateData] = useState(null)

  return (
    <div>
      <WeatherCard data={weatherData} />
      <ForecastList forecast={forecastData} />
      <ClimateAnswer data={climateData} />
      <ChatWindow onWeatherUpdate={setWeatherData} onForecastUpdate={setForecastData}  onClimateUpdate={setClimateData}/>
    </div>
  )
}

export default App