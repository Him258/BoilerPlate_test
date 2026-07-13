import { useState } from "react"
import { Bell, Search, Settings, Filter, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { useToast } from "@/components/ui/ToastContext"

const initialNotifications = [
  { id: 1, title: "New Deal Created", message: "Alice created a new deal: Acme Corp", time: "10 mins ago", unread: true, type: "system" },
  { id: 2, title: "Payment Failed", message: "Subscription renewal failed for tenant XYZ", time: "2 hours ago", unread: true, type: "billing" },
  { id: 3, title: "System Update", message: "Platform will be down for maintenance at 2 AM", time: "Yesterday", unread: false, type: "alert" },
  { id: 4, title: "Welcome to Kiaan Core", message: "Thanks for setting up your account.", time: "Oct 1", unread: false, type: "system" },
]

export function NotificationCenter() {
  const [notificationsData, setNotificationsData] = useState(initialNotifications)
  const [activeFilter, setActiveFilter] = useState("All")
  const { addToast } = useToast()

  const handleMarkAllRead = () => {
    setNotificationsData(notificationsData.map(n => ({ ...n, unread: false })))
    addToast("All notifications marked as read.")
  }

  const handleSettingsClick = () => {
    addToast("Notification settings opened.", "info")
  }

  const filteredNotifications = notificationsData.filter(n => {
    if (activeFilter === "All") return true
    if (activeFilter === "Unread") return n.unread
    return n.type.toLowerCase() === activeFilter.toLowerCase()
  })

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center">
            <Bell className="mr-2 h-6 w-6 text-slate-400" /> Notification Center
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            View and manage all system alerts and messages.
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={handleMarkAllRead}>
            <CheckCircle2 className="mr-2 h-4 w-4" /> Mark All as Read
          </Button>
          <Button variant="outline" size="icon" onClick={handleSettingsClick}>
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-2 border-b border-slate-200 dark:border-slate-800 pb-4">
        {['All', 'Unread', 'Billing', 'System'].map(filter => (
          <Button 
            key={filter}
            variant={activeFilter === filter ? "secondary" : "outline"} 
            className={`rounded-full ${activeFilter !== filter ? 'border-transparent hover:bg-slate-100 dark:hover:bg-slate-800' : ''}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </Button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <div key={notification.id} className={`flex items-start p-4 rounded-xl border transition-colors ${
              notification.unread 
                ? 'bg-blue-50/50 border-blue-100 dark:bg-blue-900/10 dark:border-blue-900/30' 
                : 'bg-white border-slate-200 dark:bg-slate-950 dark:border-slate-800'
            }`}>
              <div className={`mt-1 h-2 w-2 shrink-0 rounded-full ${notification.unread ? 'bg-primary' : 'bg-transparent'} mr-4`} />
              <div className="flex-1">
                <div className="flex justify-between items-baseline">
                  <h4 className={`text-sm font-medium ${notification.unread ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                    {notification.title}
                  </h4>
                  <span className="text-xs text-slate-500">{notification.time}</span>
                </div>
                <p className={`mt-1 text-sm ${notification.unread ? 'text-slate-600 dark:text-slate-300' : 'text-slate-500 dark:text-slate-400'}`}>
                  {notification.message}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-slate-500 dark:text-slate-400">
            No notifications found.
          </div>
        )}
      </div>
    </div>
  )
}
