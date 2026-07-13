import { useState, useMemo } from "react"
import { Bot, Search, Plus, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Modal } from "@/components/ui/Modal"
import { useToast } from "@/components/ui/ToastContext"
import { useSystem } from "@/contexts/SystemContext"

export function AITemplates() {
  const { aiTemplates, setAiTemplates, addAuditLog } = useSystem()
  
  const [searchTerm, setSearchTerm] = useState("")
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  
  const [formData, setFormData] = useState({})
  const [selectedItem, setSelectedItem] = useState(null)

  const { addToast } = useToast()

  const filteredList = useMemo(() => {
    if (!searchTerm) return aiTemplates
    return aiTemplates.filter(item => 
      Object.values(item).some(val => 
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }, [aiTemplates, searchTerm])

  const handleOpenAdd = () => {
    setFormData({ name: '', model: 'GPT-4', prompt: '' })
    setIsAddModalOpen(true)
  }

  const handleOpenEdit = (item) => {
    setSelectedItem(item)
    setFormData({ ...item })
    setIsEditModalOpen(true)
  }

  const handleOpenDelete = (item) => {
    setSelectedItem(item)
    setIsDeleteModalOpen(true)
  }

  const handleAddSubmit = (e) => {
    e.preventDefault()
    setAiTemplates([{ ...formData, id: Date.now() }, ...aiTemplates])
    addAuditLog("AI", `Created Prompt Template: ${formData.name}`)
    setIsAddModalOpen(false)
    addToast(`Template created successfully!`)
  }

  const handleEditSubmit = (e) => {
    e.preventDefault()
    setAiTemplates(aiTemplates.map(t => t.id === selectedItem.id ? { ...formData, id: selectedItem.id } : t))
    addAuditLog("AI", `Updated Prompt Template: ${formData.name}`)
    setIsEditModalOpen(false)
    addToast(`Template updated successfully!`)
  }

  const handleDeleteSubmit = () => {
    setAiTemplates(aiTemplates.filter(t => t.id !== selectedItem.id))
    addAuditLog("AI", `Deleted Prompt Template: ${selectedItem.name}`)
    setIsDeleteModalOpen(false)
    addToast(`Template deleted successfully!`, 'info')
  }

  const handleInputChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }

  

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-200 pb-4 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center">
            <Bot className="mr-2 h-6 w-6 text-purple-500" /> Prompt Templates
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Manage your AI prompt templates and assign them to specific models.
          </p>
        </div>
        <Button onClick={handleOpenAdd} className="bg-purple-600 hover:bg-purple-700 text-white">
          <Plus className="mr-2 h-4 w-4" /> New Prompt
        </Button>
      </div>

      <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <div className="flex flex-col sm:flex-row items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800 space-y-4 sm:space-y-0">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search prompts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-10 w-full rounded-md border border-slate-300 bg-white pl-10 pr-4 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white text-slate-900"
            />
          </div>
        </div>

        {filteredList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-slate-100 p-3 dark:bg-slate-800 mb-4">
              <Bot className="h-6 w-6 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 dark:text-white">No prompt templates</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Create your first AI prompt template.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full whitespace-nowrap text-left text-sm">
              <thead className="bg-slate-50 dark:bg-slate-900/50 dark:text-white text-slate-900">
                <tr>
                  <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Template Name</th>
                  <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Model</th>
                  <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Prompt Snippet</th>
                  <th className="px-6 py-4 text-right font-semibold text-slate-900 dark:text-slate-200">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-transparent">
                {filteredList.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                      {item.name}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                        {item.model}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400 truncate max-w-xs">
                      {item.prompt}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <button onClick={() => handleOpenEdit(item)} className="p-1 rounded-md text-slate-400 hover:bg-slate-100 hover:text-primary dark:hover:bg-slate-800 transition-colors">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleOpenDelete(item)}
                          className="p-1 rounded-md text-slate-400 hover:bg-slate-100 hover:text-red-500 dark:hover:bg-slate-800 dark:hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal isOpen={isAddModalOpen || isEditModalOpen} onClose={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }} title={isAddModalOpen ? "New Prompt Template" : "Edit Template"}>
        <form onSubmit={isAddModalOpen ? handleAddSubmit : handleEditSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Template Name</label>
            <input type="text" required value={formData.name || ''} onChange={(e) => handleInputChange('name', e.target.value)} placeholder="e.g. Email Summarizer" className="w-full h-10 px-3 rounded-md border border-slate-300 bg-white text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white text-slate-900" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Target AI Model</label>
            <select 
              value={formData.model || 'GPT-4'} 
              onChange={(e) => handleInputChange('model', e.target.value)}
              className="w-full h-10 px-3 rounded-md border border-slate-300 bg-white text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white text-slate-900"
            >
              <option value="GPT-4">GPT-4</option>
              <option value="GPT-3.5-Turbo">GPT-3.5-Turbo</option>
              <option value="Claude 3">Claude 3</option>
              <option value="Gemini Pro">Gemini Pro</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Linked Knowledge Base (Optional)</label>
            <select 
              value={formData.knowledgeBase || ''} 
              onChange={(e) => handleInputChange('knowledgeBase', e.target.value)}
              className="w-full h-10 px-3 rounded-md border border-slate-300 bg-white text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white text-slate-900"
            >
              <option value="">None (General Knowledge)</option>
              <option value="Company Policy 2026">Company Policy 2026</option>
              <option value="API Documentation">API Documentation</option>
              <option value="Product Catalog">Product Catalog</option>
              <option value="HR Handbook">HR Handbook</option>
              <option value="Website Crawl">Website Crawl</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Prompt Configuration</label>
            <textarea 
              required 
              rows={5}
              value={formData.prompt || ''} 
              onChange={(e) => handleInputChange('prompt', e.target.value)} 
              placeholder="System prompt instructions..." 
              className="w-full p-3 rounded-md border border-slate-300 bg-white text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white resize-none text-slate-900"
            />
            <p className="text-xs text-slate-500 mt-1">Use {'{{variable}}'} to inject dynamic data at runtime.</p>
          </div>
          <div className="mt-6 flex justify-end space-x-3 border-t border-slate-100 dark:border-slate-800 pt-4">
            <Button variant="outline" type="button" onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }}>Cancel</Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">Save Template</Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Confirm Deletion">
        <div className="py-2">
          <p className="text-slate-600 dark:text-slate-300">
            Are you sure you want to delete template <strong>{selectedItem?.name}</strong>?
          </p>
        </div>
        <div className="mt-6 flex justify-end space-x-3 border-t border-slate-100 dark:border-slate-800 pt-4">
          <Button variant="outline" type="button" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
          <Button type="button" className="bg-red-600 hover:bg-red-700 text-white" onClick={handleDeleteSubmit}>
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  )
}
