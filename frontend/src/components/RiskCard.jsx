import { motion } from 'framer-motion'

function RiskCard({ alerts }) {
  const hasHigh = alerts.some((a) => a.severity === 'High')
  const hasMedium = alerts.some((a) => a.severity === 'Medium')

  let level = 'Low'
  let percent = 15
  let color = 'text-blue-400'
  let barColor = 'bg-blue-500'

  if (hasHigh) {
    level = 'High'
    percent = 80
    color = 'text-red-400'
    barColor = 'bg-red-500'
  } else if (hasMedium) {
    level = 'Moderate'
    percent = 45
    color = 'text-yellow-400'
    barColor = 'bg-yellow-500'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="bg-gray-900 border border-gray-800 rounded-2xl p-6 max-w-sm mx-auto mt-6 shadow-lg"
    >
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
        Weather Risk
      </p>
      <p className={`text-4xl font-bold ${color}`}>{percent}%</p>
      <p className="text-sm text-gray-400 mt-1">{level} risk based on active alerts</p>
      <div className="w-full bg-gray-800 rounded-full h-2 mt-4">
        <div
          className={`h-2 rounded-full ${barColor}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </motion.div>
  )
}

export default RiskCard