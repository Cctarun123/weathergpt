import { motion } from 'framer-motion'

function ForecastList({ forecast }) {
  if (!forecast || forecast.length === 0) return null

  return (
    <div className="flex gap-3 justify-center mt-6 flex-wrap max-w-md mx-auto">
      {forecast.map((day, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.05 }}
          whileHover={{ y: -4, boxShadow: '0 8px 20px rgba(59,130,246,0.15)' }}
          className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-center min-w-[70px] cursor-default"
        >
          <p className="font-semibold text-sm text-gray-300">{day.day}</p>
          <p className="text-2xl mt-1">🌤️</p>
          <p className="text-sm mt-1 text-blue-400 font-medium">{day.temperature}°C</p>
        </motion.div>
      ))}
    </div>
  )
}

export default ForecastList