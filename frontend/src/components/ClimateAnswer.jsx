import { motion } from 'framer-motion'

function ClimateAnswer({ data }) {
  if (!data) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-green-50 border border-green-200 text-green-700 rounded-2xl px-6 py-4 max-w-md mx-auto mt-6 text-center text-sm"
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
      className="bg-green-100 border border-green-300 rounded-2xl p-6 max-w-md mx-auto mt-6 shadow-sm"
    >
      <p className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-2">
        Climate Insight
      </p>
      <p className="text-gray-800">{data.answer}</p>
      <div className="mt-4 pt-3 border-t border-green-300">
        <p className="text-xs font-semibold text-green-700 mb-1">Sources</p>
        <ul className="text-xs text-green-800 list-disc list-inside">
          {data.sources.map((src, i) => (
            <li key={i}>{src}</li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

export default ClimateAnswer