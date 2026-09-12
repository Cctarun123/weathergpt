
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
          whileHover={{ y: -4, boxShadow: '0 8px 20px rgba(0,0,0,0.15)' }}
          className="bg-gray-100 rounded-xl px-4 py-3 text-center shadow-sm min-w-[70px] cursor-default"
        >
          <p className="font-semibold text-sm">{day.day}</p>
          <p className="text-2xl mt-1">🌤️</p>
          <p className="text-sm mt-1">{day.temperature}°C</p>
        </motion.div>
      ))}
    </div>
  )
}

export default ForecastList