import { motion } from 'framer-motion'
import Globe from './Globe'
import WeatherCard from './WeatherCard'
import RiskCard from './RiskCard'

function HeroSection({ weatherData, alertsData }) {
  return (
    <div className="max-w-5xl mx-auto px-6 pt-6 pb-4 flex flex-col sm:flex-row items-center gap-6">
      <div className="flex-1 w-full">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-3xl sm:text-4xl font-bold text-white text-center sm:text-left"
        >
          Weather & Climate Insights
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-gray-400 mt-2 text-sm sm:text-base text-center sm:text-left"
        >
          Ask about the weather anywhere, understand climate trends, and stay ahead of alerts.
        </motion.p>

        <div className="mt-6 space-y-4">
          <WeatherCard data={weatherData} />
          <RiskCard alerts={alertsData} />
        </div>
      </div>

      <div className="flex-1 w-full">
        <Globe />
      </div>
    </div>
  )
}

export default HeroSection