import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { fetchWeather, fetchForecast, fetchClimateAnswer } from '../mockApi'

function ChatWindow({ onWeatherUpdate, onForecastUpdate, onClimateUpdate }) {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! Ask me about the weather anywhere.' },
    { sender: 'user', text: "What's the weather in Ludhiana?" },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const isClimateQuestion = (text) => {
    const keywords = ['climate', 'change', 'trend', 'history', 'historical']
    return keywords.some((word) => text.toLowerCase().includes(word))
  }

  const handleClear = () => {
    setMessages([{ sender: 'bot', text: 'Hi! Ask me about the weather anywhere.' }])
  }

  const handleSend = async () => {
    if (!input.trim()) return
    const userText = input
    setMessages((prev) => [...prev, { sender: 'user', text: userText }])
    setInput('')
    setLoading(true)

    try {
      if (isClimateQuestion(userText)) {
        const climate = await fetchClimateAnswer(userText)
        onClimateUpdate(climate)
        setMessages((prev) => [
          ...prev,
          { sender: 'bot', text: 'Here\'s what I found about the climate trend — check the card above.' },
        ])
      } else {
        const data = await fetchWeather(userText)
        onWeatherUpdate(data)

        const forecast = await fetchForecast(userText)
        onForecastUpdate(forecast)

        setMessages((prev) => [
          ...prev,
          { sender: 'bot', text: `${data.city}: ${data.temperature}°C, ${data.condition}` },
        ])
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: "Sorry, couldn't fetch that. Try again?" },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-gray-900 border border-gray-800 rounded-2xl shadow-lg flex flex-col h-[500px]">
      <div className="flex justify-between items-center px-4 py-2 border-b border-gray-800 rounded-t-2xl">
        <span className="text-sm font-semibold text-gray-300">WeatherGPT Chat</span>
        <button
          onClick={handleClear}
          className="text-xs font-medium text-red-400 border border-red-900 rounded-full px-3 py-1 hover:bg-red-950 transition"
        >
          Clear chat
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`rounded-2xl px-4 py-2 max-w-xs ${
                msg.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-800 text-gray-200'
              }`}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl px-4 py-2 bg-gray-800 text-gray-400">Typing...</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex border-t border-gray-800 p-2">
        <input
          className="flex-1 border rounded-lg px-3 py-2 mr-2 bg-gray-800 text-white border-gray-700 placeholder-gray-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !loading && handleSend()}
          placeholder="Type a message..."
          disabled={loading}
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50 hover:bg-blue-600 transition"
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default ChatWindow