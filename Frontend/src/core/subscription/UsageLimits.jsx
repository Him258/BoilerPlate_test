import { useState, useEffect } from "react"
import { Database, Users, HardDrive, Cpu, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/Button"

// Map icon strings back to actual lucide-react components
const iconMap = {
  Users: Users,
  HardDrive: HardDrive,
  Database: Database,
  Cpu: Cpu
}

export function UsageLimits() {
  const [limits, setLimits] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchLimits = () => {
    setLimits([
      { id: 1, name: 'Users', used: 4, limit: 5, unit: '', warning: true },
      { id: 2, name: 'Database', used: 250, limit: 500, unit: 'MB', color: 'bg-emerald-500' },
      { id: 3, name: 'Cpu', used: 85, limit: 100, unit: '%', warning: true }
    ])
    setIsLoading(false)
  }

  useEffect(() => {
    fetchLimits()
  }, [])

  if (isLoading) {
    return <div className="p-8 text-center text-slate-500">Loading usage limits...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Usage & Limits</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Monitor your current usage against your plan limits.
          </p>
        </div>
        <Button variant="outline" className="shrink-0 text-primary border-primary hover:bg-primary/5 dark:hover:bg-primary/10">
          Upgrade Plan
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
        {limits.length === 0 ? (
          <div className="col-span-full text-center text-slate-500 py-12">
            No usage limits recorded yet.
          </div>
        ) : limits.map((item) => {
          const percentage = (item.used / item.limit) * 100
          const isNearLimit = percentage >= 85 || item.warning
          
          // Fallback to Database icon if mapping fails
          const IconComponent = iconMap[item.name] || Database

          return (
            <div key={item.id} className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-slate-100 dark:bg-slate-900`}>
                    <IconComponent className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{item.name}</h3>
                </div>
                {isNearLimit && (
                  <div className="flex items-center text-xs font-medium text-orange-600 bg-orange-50 dark:bg-orange-900/20 dark:text-orange-400 px-2 py-1 rounded-full">
                    <AlertTriangle className="mr-1 h-3 w-3" /> Near Limit
                  </div>
                )}
              </div>
              
              <div className="mt-2 flex items-baseline justify-between text-sm">
                <span className="font-bold text-slate-900 dark:text-white text-2xl">
                  {item.used}{item.unit || ''}
                </span>
                <span className="text-slate-500 dark:text-slate-400 font-medium">
                  of {item.limit}{item.unit || ''} limit
                </span>
              </div>

              <div className="mt-4 w-full bg-slate-100 rounded-full h-2.5 dark:bg-slate-800 overflow-hidden">
                <div 
                  className={`h-2.5 rounded-full ${isNearLimit ? 'bg-orange-500' : (item.color || 'bg-blue-500')}`} 
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 text-right">
                {percentage.toFixed(1)}% used
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
