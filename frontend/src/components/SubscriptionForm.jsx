import { useState } from 'react'

function SubscriptionForm({ subscriptions, onSubscribe }) {
  const [location, setLocation] = useState('')
  const [alertType, setAlertType] = useState('All')
  const [confirmed, setConfirmed] = useState(false)

  const handleSubscribe = () => {
    if (!location.trim()) return
    onSubscribe([...subscriptions, { location, alertType }])
    setLocation('')
    setConfirmed(true)
    setTimeout(() => setConfirmed(false), 2000)
  }

  return (
    <div className="max-w-md mx-auto mt-6 bg-gray-900 border border-gray-800 rounded-xl p-4 shadow-sm">
      <h2 className="text-sm font-semibold text-gray-200 mb-3">Subscribe to Alerts</h2>
      <div className="flex gap-2">
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location"
          className="flex-1 border rounded-lg px-3 py-2 text-sm bg-gray-800 text-white border-gray-700 placeholder-gray-500"
        />
        <select
          value={alertType}
          onChange={(e) => setAlertType(e.target.value)}
          className="border rounded-lg px-2 py-2 text-sm bg-gray-800 text-white border-gray-700"
        >
          <option>All</option>
          <option>Rain</option>
          <option>Wind</option>
          <option>Heat</option>
        </select>
        <button
          onClick={handleSubscribe}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition"
        >
          Subscribe
        </button>
      </div>
      {confirmed && (
        <p className="text-green-400 text-xs mt-2">Subscribed successfully!</p>
      )}
      {subscriptions.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-800">
          <p className="text-xs font-semibold text-gray-400 mb-1">Your subscriptions</p>
          <ul className="text-xs text-gray-400 space-y-1">
            {subscriptions.map((sub, i) => (
              <li key={i}>{sub.location} — {sub.alertType}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default SubscriptionForm