import AlertCard from './AlertCard'

function AlertDashboard({ alerts, history }) {
  return (
    <div className="max-w-md mx-auto mt-6">
      <h2 className="text-sm font-semibold text-gray-300 mb-2 px-1">Active Alerts</h2>
      {alerts.length === 0 ? (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-center text-sm text-gray-400">
          No active alerts right now.
        </div>
      ) : (
        <div className="space-y-3">
          {alerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </div>
      )}

      <h2 className="text-sm font-semibold text-gray-300 mb-2 px-1 mt-6">Alert History</h2>
      {history.length === 0 ? (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-center text-sm text-gray-400">
          No past alerts yet.
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </div>
      )}
    </div>
  )
}

export default AlertDashboard