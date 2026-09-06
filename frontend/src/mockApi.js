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