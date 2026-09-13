import { useState, useEffect } from 'react'
import NavBar from './components/NavBar'
import HeroSection from './components/HeroSection'
import WeatherCard from './components/WeatherCard'
import RiskCard from './components/RiskCard'
import ChatWindow from './components/ChatWindow'
import ForecastList from './components/ForecastList'
import ClimateAnswer from './components/ClimateAnswer'
import AlertDashboard from './components/AlertDashboard'
import SubscriptionForm from './components/SubscriptionForm'
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
    <div className="min-h-screen bg-gray-950 pb-10">
      <NavBar notifications={notifications} />
      <HeroSection />

      <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <WeatherCard data={weatherData} />
        <RiskCard alerts={alertsData} />
      </div>

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