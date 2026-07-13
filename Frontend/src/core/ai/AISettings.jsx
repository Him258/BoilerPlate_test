import { useState } from "react"
import { Settings, CheckCircle2, XCircle, Key } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Modal } from "@/components/ui/Modal"
import { useToast } from "@/components/ui/ToastContext"
import { useSystem } from "@/contexts/SystemContext"

export function AISettings() {
  const { aiSettings, setAiSettings, addAuditLog } = useSystem()
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState(null)
  const [apiKey, setApiKey] = useState("")
  const { addToast } = useToast()

  const handleOpenEdit = (provider) => {
    setSelectedProvider(provider)
    setApiKey(provider.apiKey || "")
    setIsEditModalOpen(true)
  }

  const handleSaveSettings = (e) => {
    e.preventDefault()
    const newStatus = apiKey.length > 5 ? "Active" : "Not Configured"
    setAiSettings(aiSettings.map(s => 
      s.id === selectedProvider.id 
        ? { ...s, apiKey, status: newStatus } 
        : s
    ))
    addAuditLog("AI", `Updated API Key for ${selectedProvider.provider}`)
    setIsEditModalOpen(false)
    addToast(`${selectedProvider.provider} settings saved!`)
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-200 pb-4 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center">
            <Settings className="mr-2 h-6 w-6 text-purple-500" /> AI Providers & Settings
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Configure API keys for different LLM providers used across your workspace.
          </p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {aiSettings.map((setting) => (
          <div key={setting.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950 flex flex-col">
            <div className="p-5 flex-1">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{setting.provider}</h3>
                {setting.status === "Active" ? (
                  <span className="flex items-center text-xs font-medium text-green-600 dark:text-green-400">
                    <CheckCircle2 className="mr-1 h-3.5 w-3.5" /> Active
                  </span>
                ) : (
                  <span className="flex items-center text-xs font-medium text-slate-400 dark:text-slate-500">
                    <XCircle className="mr-1 h-3.5 w-3.5" /> Missing Key
                  </span>
                )}
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                  <Key className="mr-2 h-4 w-4" />
                  <span className="truncate">
                    {setting.apiKey ? `••••••••${setting.apiKey.slice(-4)}` : 'No API Key set'}
                  </span>
                </div>
              </div>
            </div>
            <div className="border-t border-slate-100 bg-slate-50 px-5 py-3 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white text-slate-900">
              <button 
                onClick={() => handleOpenEdit(setting)}
                className="text-sm font-medium text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 w-full text-center"
              >
                Configure Settings
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title={`Configure ${selectedProvider?.provider}`}>
        <form onSubmit={handleSaveSettings} className="space-y-4">
          <div className="rounded-md bg-purple-50 p-4 dark:bg-purple-900/20 mb-4">
            <p className="text-sm text-purple-800 dark:text-purple-300">
              Your API keys are encrypted at rest. We never share them with third parties.
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">API Key</label>
            <input 
              type="password" 
              value={apiKey} 
              onChange={(e) => setApiKey(e.target.value)} 
              placeholder={`Enter your ${selectedProvider?.provider} API key`} 
              className="w-full h-10 px-3 rounded-md border border-slate-300 bg-white text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white text-slate-900" 
            />
          </div>
          <div className="mt-6 flex justify-end space-x-3 border-t border-slate-100 dark:border-slate-800 pt-4">
            <Button variant="outline" type="button" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">Save Configuration</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
