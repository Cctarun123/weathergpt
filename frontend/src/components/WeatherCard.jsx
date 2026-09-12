import { motion } from 'framer-motion'

function WeatherCard({ data }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-gray-900 border border-gray-800 text-white p-6 rounded-2xl max-w-sm mx-auto mt-10 shadow-lg shadow-blue-500/10"
    >
      <h2 className="text-xl font-semibold text-gray-300">{data.city}</h2>
      <p className="text-6xl font-bold mt-2 text-blue-400 drop-shadow-[0_0_15px_rgba(96,165,250,0.35)]">
        {data.temperature}°C
      </p>
      <p className="text-lg mt-1 text-gray-400">{data.condition}</p>
      <div className="flex justify-between mt-4 text-sm text-gray-500 border-t border-gray-800 pt-3">
        <span>Humidity: {data.humidity}%</span>
        <span>Wind: {data.windSpeed} km/h</span>
      </div>
    </motion.div>
  )
}

export default WeatherCard