import NotificationBell from './NotificationBell'

function NavBar({ notifications }) {
  return (
    <nav className="flex items-center justify-between px-6 py-4 max-w-5xl mx-auto">
      <div className="flex items-center gap-2">
        <span className="text-xl">🌦️</span>
        <span className="font-semibold text-white">WeatherGPT</span>
      </div>
      <div className="hidden sm:flex gap-6 text-sm text-gray-400">
        <span>Weather</span>
        <span>Climate</span>
        <span>Alerts</span>
      </div>
      <div className="flex items-center gap-3">
        <NotificationBell notifications={notifications} />
        <button className="bg-white text-gray-900 text-sm font-medium px-4 py-1.5 rounded-full">
          Get Started
        </button>
      </div>
    </nav>
  )
}

export default NavBar