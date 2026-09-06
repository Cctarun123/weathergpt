function WeatherCard({ data }) {
  return (
    <div className="bg-blue-500 text-white p-6 rounded-2xl max-w-sm mx-auto mt-10 shadow-lg">
      <h2 className="text-2xl font-bold">{data.city}</h2>
      <p className="text-5xl font-bold mt-2">{data.temperature}°C</p>
      <p className="text-lg mt-1">{data.condition}</p>
      <div className="flex justify-between mt-4 text-sm text-blue-100">
        <span>Humidity: {data.humidity}%</span>
        <span>Wind: {data.windSpeed} km/h</span>
      </div>
    </div>
  )
}

export default WeatherCard
  