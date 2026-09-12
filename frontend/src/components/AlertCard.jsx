import { motion } from 'framer-motion'

function AlertCard({ alert }) {
  const severityStyles = {
    High: 'border-red-500 bg-red-50 text-red-700',
    Medium: 'border-yellow-500 bg-yellow-50 text-yellow-700',
    Low: 'border-blue-500 bg-blue-50 text-blue-700',
  }

  const style = severityStyles[alert.severity] || severityStyles.Low

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02, boxShadow: '0 8px 20px rgba(0,0,0,0.12)' }}
      className={`border-l-4 rounded-lg p-4 shadow-sm ${style} ${alert.resolved ? 'grayscale opacity-70' : ''}`}
    >
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-bold uppercase tracking-wide">
          {alert.severity} severity {alert.resolved && '· Resolved'}
        </span>
        <span className="text-xs text-gray-500">{alert.time}</span>
      </div>
      <p className="font-medium text-gray-800">{alert.reason}</p>
      <p className="text-sm text-gray-600 mt-1">{alert.location}</p>
    </motion.div>
  )
}

export default AlertCard