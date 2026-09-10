import { useState } from 'react'
import { fetchWeather, fetchForecast, fetchClimateAnswer } from '../mockApi'

function ChatWindow({ onWeatherUpdate, onForecastUpdate, onClimateUpdate }) {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! Ask me about the weather anywhere.' },
    { sender: 'user', text: "What's the weather in Ludhiana?" },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const isClimateQuestion = (text) => {
    const keywords = ['climate', 'change', 'trend', 'history', 'historical']
    return keywords.some((word) => text.toLowerCase().includes(word))
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
    <div className="max-w-md mx-auto mt-10 border rounded-2xl shadow-lg flex flex-col h-[500px]">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`rounded-2xl px-4 py-2 max-w-xs ${
                msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl px-4 py-2 bg-gray-200 text-black">Typing...</div>
          </div>
        )}
      </div>
      <div className="flex border-t p-2">
        <input
          className="flex-1 border rounded-lg px-3 py-2 mr-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !loading && handleSend()}
          placeholder="Type a message..."
          disabled={loading}
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default ChatWindow