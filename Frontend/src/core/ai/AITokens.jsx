import { Bot, Search, Zap } from "lucide-react"
import { useSystem } from "@/contexts/SystemContext"

export function AITokens() {
  const { aiTokensUsed } = useSystem()

  // Format number with commas
  const formattedTokens = new Intl.NumberFormat().format(aiTokensUsed)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-200 pb-4 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center">
            <Zap className="mr-2 h-6 w-6 text-slate-400" /> Token Usage
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Monitor your organization's AI token consumption across all providers.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <div className="flex items-center text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
            <Bot className="mr-2 h-4 w-4 text-purple-500" /> Total Tokens Used
          </div>
          <div className="text-3xl font-bold text-slate-900 dark:text-white">
            {formattedTokens}
          </div>
          <div className="mt-2 text-xs text-green-600 dark:text-green-400">
            Within monthly limit of 500,000 tokens
          </div>
        </div>
      </div>
    </div>
  )
}
