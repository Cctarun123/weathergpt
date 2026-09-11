import { useState, useEffect } from 'react'
import WeatherCard from './components/WeatherCard'
import ChatWindow from './components/ChatWindow'
import ForecastList from './components/ForecastList'
import ClimateAnswer from './components/ClimateAnswer'
import AlertDashboard from './components/AlertDashboard'
import SubscriptionForm from './components/SubscriptionForm'
import NotificationBell from './components/NotificationBell'
import SettingsPanel from './components/SettingsPanel'
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
  const [alertHistory, setAlertHistory] = useState([])
  const [subscriptions, setSubscriptions] = useState([])
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    fetchAlerts().then((alerts) => {
      setAlertsData(alerts)
      const newNotifs = alerts.map((a) => ({
        id: `alert-${a.id}`,
        message: `${a.severity} alert: ${a.reason} in ${a.location}`,
        read: false,
      }))
      setNotifications((prev) => {
        const existingIds = new Set(prev.map((n) => n.id))
        const filtered = newNotifs.filter((n) => !existingIds.has(n.id))
        return [...prev, ...filtered]
      })
    })
    fetchAlertHistory().then(setAlertHistory)
  }, [])

  const handleSubscribe = (newSubs) => {
    setSubscriptions(newSubs)
    const latest = newSubs[newSubs.length - 1]
    setNotifications((prev) => [
      ...prev,
      { id: `sub-${Date.now()}`, message: `Subscribed to ${latest.alertType} alerts for ${latest.location}`, read: false },
    ])
  }

  return (
    <div>
      <NotificationBell notifications={notifications} />
      <WeatherCard data={weatherData} />
      <ForecastList forecast={forecastData} />
      <ClimateAnswer data={climateData} />
      <SubscriptionForm subscriptions={subscriptions} onSubscribe={handleSubscribe} />
      <AlertDashboard alerts={alertsData} history={alertHistory} />
      <SettingsPanel />
      <ChatWindow
        onWeatherUpdate={setWeatherData}
        onForecastUpdate={setForecastData}
        onClimateUpdate={setClimateData}
      />
    </div>
  )
}

export default App