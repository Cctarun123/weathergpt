import { useState } from 'react'

function NotificationBell({ notifications }) {
  const [open, setOpen] = useState(false)
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="relative max-w-md mx-auto mt-4 flex justify-end pr-2">
      <button
        onClick={() => setOpen(!open)}
        className="relative bg-gray-800 border border-gray-700 rounded-full w-10 h-10 flex items-center justify-center text-lg"
      >
        🔔
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute top-12 right-2 bg-gray-800 border border-gray-700 rounded-lg shadow-lg w-64 p-3 z-10">
          <p className="text-sm font-semibold text-gray-200 mb-2">Notifications</p>
          {notifications.length === 0 ? (
            <p className="text-xs text-gray-400">No notifications yet.</p>
          ) : (
            <ul className="space-y-2">
              {notifications.map((n) => (
                <li key={n.id} className="text-xs text-gray-300 border-b border-gray-700 pb-1">
                  {n.message}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

export default NotificationBell