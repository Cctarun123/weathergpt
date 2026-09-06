import { useState } from 'react'

function ChatWindow() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! Ask me about the weather anywhere.' },
    { sender: 'user', text: 'What\'s the weather in Ludhiana?' },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSend = () => {
    if (!input.trim()) return
    setMessages([...messages, { sender: 'user', text: input }])
    setInput('')
    setLoading(true)

    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Fetching weather data...' }])
      setLoading(false)
    }, 1000)
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
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a message..."
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default ChatWindow