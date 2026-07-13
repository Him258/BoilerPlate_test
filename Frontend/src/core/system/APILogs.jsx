import { Activity, Search } from "lucide-react"
import { useSystem } from "@/contexts/SystemContext"

export function APILogs() {
  const { auditLogs } = useSystem()

  // Filter logs for API and other general activities (excluding LOGIN and ERROR)
  const logs = auditLogs.filter(log => log.type !== "LOGIN" && log.type !== "ERROR")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-200 pb-4 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center">
            <Activity className="mr-2 h-6 w-6 text-slate-400" /> API & System Logs
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Track all API requests, file uploads, and communication events.
          </p>
        </div>
      </div>

      <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
        {logs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-slate-100 p-3 dark:bg-slate-800 mb-4">
              <Activity className="h-6 w-6 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 dark:text-white">No system logs</h3>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full whitespace-nowrap text-left text-sm">
              <thead className="bg-slate-50 dark:bg-slate-900/50 dark:text-white text-slate-900">
                <tr>
                  <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Time</th>
                  <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Module</th>
                  <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Message</th>
                  <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">User</th>
                  <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-transparent">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{log.time}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                        {log.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{log.message}</td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{log.user}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
