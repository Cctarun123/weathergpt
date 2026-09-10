function ForecastList({ forecast }) {
  if (!forecast || forecast.length === 0) return null

  return (
    <div className="flex gap-3 justify-center mt-6 flex-wrap max-w-md mx-auto">
      {forecast.map((day, i) => (
        <div
          key={i}
          className="bg-gray-100 rounded-xl px-4 py-3 text-center shadow-sm min-w-[70px]"
        >
          <p className="font-semibold text-sm">{day.day}</p>
          <p className="text-2xl mt-1">🌤️</p>
          <p className="text-sm mt-1">{day.temperature}°C</p>
        </div>
      ))}
    </div>
  )
}

export default ForecastList