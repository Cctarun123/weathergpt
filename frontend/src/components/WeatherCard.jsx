function WeatherCard() {
  return (
    <div className="bg-blue-500 text-white p-6 rounded-2xl max-w-sm mx-auto mt-10 shadow-lg">
      <h2 className="text-2xl font-bold">Ludhiana</h2>
      <p className="text-5xl font-bold mt-2">28°C</p>
      <p className="text-lg mt-1">Partly Cloudy</p>
      <div className="flex justify-between mt-4 text-sm text-blue-100">
        <span>Humidity: 60%</span>
        <span>Wind: 12 km/h</span>
      </div>
    </div>
  )
}

export default WeatherCard