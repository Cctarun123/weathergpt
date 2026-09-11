import { useState } from 'react'

function SettingsPanel() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [unit, setUnit] = useState('C')
  const [defaultLocation, setDefaultLocation] = useState('')

  return (
    <div className="max-w-md mx-auto mt-6 bg-gray-800 border border-gray-700 rounded-xl p-4 shadow-sm">
      <h2 className="text-sm font-semibold text-gray-100 mb-3">Settings</h2>

      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-gray-300">Enable notifications</span>
        <button
          onClick={() => setNotificationsEnabled(!notificationsEnabled)}
          className={`w-10 h-6 rounded-full transition ${
            notificationsEnabled ? 'bg-blue-500' : 'bg-gray-600'
          }`}
        >
          <div
            className={`w-4 h-4 bg-white rounded-full transition transform ${
              notificationsEnabled ? 'translate-x-5' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-gray-300">Temperature unit</span>
        <div className="flex gap-2">
          <button
            onClick={() => setUnit('C')}
            className={`px-3 py-1 rounded-lg text-xs ${unit === 'C' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'}`}
          >
            °C
          </button>
          <button
            onClick={() => setUnit('F')}
            className={`px-3 py-1 rounded-lg text-xs ${unit === 'F' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'}`}
          >
            °F
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-300">Default location</span>
        <input
          value={defaultLocation}
          onChange={(e) => setDefaultLocation(e.target.value)}
          placeholder="e.g. Ludhiana"
          className="border rounded-lg px-2 py-1 text-xs bg-gray-700 text-white border-gray-600 placeholder-gray-400 w-32"
        />
      </div>
    </div>
  )
}

export default SettingsPanel
