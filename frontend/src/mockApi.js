export function fetchWeather(city) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.1) {
        reject(new Error('Failed to fetch weather data'))
        return
      }
      resolve({
        city: city,
        temperature: Math.floor(Math.random() * 15) + 20,
        condition: 'Partly Cloudy',
        humidity: 60,
        windSpeed: 12,
      })
    }, 1000)
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
    }, 800)
  })
}

export function fetchClimateAnswer(question) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        answer: `Based on historical climate data, this region has seen a gradual rise in average temperatures over the past decade, with more frequent heatwaves and shifting monsoon patterns.`,
        sources: ['IPCC Climate Report 2023', 'IMD Regional Climate Data'],
      })
    }, 1000)
  })
}

export function fetchAlerts() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          severity: 'High',
          reason: 'Heavy rainfall expected',
          location: 'Ludhiana',
          time: '2026-09-12 06:00',
        },
        {
          id: 2,
          severity: 'Medium',
          reason: 'Strong winds likely',
          location: 'Phagwara',
          time: '2026-09-12 14:00',
        },
        {
          id: 3,
          severity: 'Low',
          reason: 'Slight temperature drop',
          location: 'Jalandhar',
          time: '2026-09-13 09:00',
        },
      ])
    }, 800)
  })
}

export function fetchAlertHistory() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 101,
          severity: 'High',
          reason: 'Flash flood warning',
          location: 'Ludhiana',
          time: '2026-09-08 10:00',
          resolved: true,
        },
        {
          id: 102,
          severity: 'Low',
          reason: 'Fog advisory',
          location: 'Jalandhar',
          time: '2026-09-06 06:30',
          resolved: true,
        },
      ])
    }, 800)
  })
}