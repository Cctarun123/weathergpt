import { useState, useEffect } from 'react'
import WeatherCard from './components/WeatherCard'
import ChatWindow from './components/ChatWindow'
import ForecastList from './components/ForecastList'
import ClimateAnswer from './components/ClimateAnswer'
import AlertDashboard from './components/AlertDashboard'
import SubscriptionForm from './components/SubscriptionForm'
import { fetchAlerts, fetchAlertHistory } from './mockApi'

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
  const [alertsData, setAlertsData] = useState([])
  const [subscriptions, setSubscriptions] = useState([])
  const [alertHistory, setAlertHistory] = useState([])

  useEffect(() => {
    fetchAlerts().then(setAlertsData)
    fetchAlertHistory().then(setAlertHistory)
  }, [])

  return (
    <div>
      <WeatherCard data={weatherData} />
      <ForecastList forecast={forecastData} />
      <ClimateAnswer data={climateData} />
      <SubscriptionForm subscriptions={subscriptions} onSubscribe={setSubscriptions} />
      <AlertDashboard alerts={alertsData} history={alertHistory} />
      <ChatWindow
        onWeatherUpdate={setWeatherData}
        onForecastUpdate={setForecastData}
        onClimateUpdate={setClimateData}
      />
    </div>
  )
}

export default App