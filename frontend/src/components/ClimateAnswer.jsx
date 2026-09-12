import { motion } from 'framer-motion'

function ClimateAnswer({ data }) {
  if (!data) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-gray-900 border border-gray-800 text-gray-400 rounded-2xl px-6 py-4 max-w-md mx-auto mt-6 text-center text-sm"
      >
        Ask a climate question to see an answer with sources here.
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-gray-900 border border-gray-800 rounded-2xl p-6 max-w-md mx-auto mt-6 shadow-lg shadow-green-500/10"
    >
      <p className="text-xs font-semibold text-green-400 uppercase tracking-wide mb-2">
        Climate Insight
      </p>
      <p className="text-gray-300">{data.answer}</p>
      <div className="mt-4 pt-3 border-t border-gray-800">
        <p className="text-xs font-semibold text-green-400 mb-1">Sources</p>
        <ul className="text-xs text-gray-500 list-disc list-inside">
          {data.sources.map((src, i) => (
            <li key={i}>{src}</li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

export default ClimateAnswer