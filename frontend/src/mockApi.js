export function fetchWeather(city) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        city: city,
        temperature: Math.floor(Math.random() * 15) + 20, // fake temp 20-35°C
        condition: 'Partly Cloudy',
        humidity: 60,
        windSpeed: 12,
      })
    }, 1000) // simulates network delay
  })
}

export function fetchForecast(city) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      const conditions = ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy', 'Clear']
      const forecast = days.map((day) => ({
        day,
        temperature: Math.floor(Math.random() * 15) + 20,
        condition: conditions[Math.floor(Math.random() * conditions.length)],
      }))
      resolve(forecast)
    }, 1000)
  })
}