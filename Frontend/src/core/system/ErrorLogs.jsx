import { AlertTriangle, Search } from "lucide-react"
import { useSystem } from "@/contexts/SystemContext"

export function ErrorLogs() {
  const { auditLogs } = useSystem()

  // Filter logs for ERROR type
  const logs = auditLogs.filter(log => log.type === "ERROR")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-200 pb-4 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center">
            <AlertTriangle className="mr-2 h-6 w-6 text-slate-400" /> Error Logs
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Track system errors, failures, and exceptions.
          </p>
        </div>
      </div>

      <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
        {logs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-slate-100 p-3 dark:bg-slate-800 mb-4">
              <AlertTriangle className="h-6 w-6 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 dark:text-white">No errors found</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              System is running smoothly.
            </p>
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
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-transparent">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{log.time}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900/30 dark:text-red-400">
                        {log.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{log.message}</td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{log.user}</td>
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
