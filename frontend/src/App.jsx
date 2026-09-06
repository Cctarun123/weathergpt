import { useState } from 'react'
import WeatherCard from './components/WeatherCard'
import ChatWindow from './components/ChatWindow'

function App() {
  const [weatherData, setWeatherData] = useState({
    city: 'Ludhiana',
    temperature: 28,
    condition: 'Partly Cloudy',
    humidity: 60,
    windSpeed: 12,
  })

  return (
    <div>
      <WeatherCard data={weatherData} />
      <ChatWindow onWeatherUpdate={setWeatherData} />
    </div>
  )
}

export default App