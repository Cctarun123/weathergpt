import { motion } from 'framer-motion'

function HeroSection() {
  return (
    <div className="relative max-w-5xl mx-auto px-6 pt-6 pb-10 text-center overflow-hidden">
      <div className="absolute inset-0 flex justify-center items-center -z-10">
        <div className="w-72 h-72 rounded-full bg-blue-500/20 blur-3xl" />
      </div>
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl sm:text-4xl font-bold text-white"
      >
        Weather & Climate Insights
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="text-gray-400 mt-2 text-sm sm:text-base"
      >
        Ask about the weather anywhere, understand climate trends, and stay ahead of alerts.
      </motion.p>
    </div>
  )
}

export default HeroSection