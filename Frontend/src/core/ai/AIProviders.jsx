import { useState } from "react"
import { Bot, Cpu, Zap, MoreVertical, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Modal } from "@/components/ui/Modal"
import { useToast } from "@/components/ui/ToastContext"
import { Dropdown, DropdownItem } from "@/components/ui/Dropdown"

const initialProviders = [
  {
    id: 1,
    name: "OpenAI",
    description: "GPT-4 and GPT-3.5 models for advanced reasoning.",
    status: "Active",
    tokens: "2.4M",
    logo: "bg-emerald-500",
  },
  {
    id: 2,
    name: "Anthropic Claude",
    description: "Claude 3 Opus and Sonnet models.",
    status: "Active",
    tokens: "1.1M",
    logo: "bg-orange-500",
  },
  {
    id: 3,
    name: "Google Gemini",
    description: "Gemini 1.5 Pro multimodal capabilities.",
    status: "Inactive",
    tokens: "0",
    logo: "bg-blue-500",
  }
]

export function AIProviders() {
  const [list, setList] = useState(initialProviders)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [formData, setFormData] = useState({})
  const [selectedItem, setSelectedItem] = useState(null)
  
  const { addToast } = useToast()

  const handleOpenAdd = () => {
    setFormData({ name: '', description: '', status: 'Active' })
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
    const newRecord = { ...formData, id: Date.now(), tokens: "0", logo: "bg-indigo-500" }
    setList([newRecord, ...list])
    setIsAddModalOpen(false)
    addToast(`Provider added successfully!`)
  }

  const handleEditSubmit = (e) => {
    e.preventDefault()
    setList(list.map(item => item.id === selectedItem.id ? { ...item, ...formData } : item))
    setIsEditModalOpen(false)
    addToast(`Provider updated successfully!`)
  }

  const handleDeleteSubmit = () => {
    setList(list.filter(item => item.id !== selectedItem.id))
    setIsDeleteModalOpen(false)
    addToast(`Provider deleted successfully!`, 'info')
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">AI Providers</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage external AI models and provider settings</p>
        </div>
        <Button onClick={handleOpenAdd} className="bg-primary text-white hover:bg-primary/90">
          <Bot className="mr-2 h-4 w-4" /> Add Provider
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {list.map((provider) => (
          <div key={provider.id} className="relative group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950 hover:border-primary/50 transition-colors">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${provider.logo || 'bg-primary'}`}>
                  <Cpu className="h-6 w-6" />
                </div>
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                    provider.status === 'Active' 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                      : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                  }`}>
                    {provider.status}
                  </span>
                  
                  <Dropdown
                    trigger={<button className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><MoreVertical className="h-4 w-4" /></button>}
                  >
                    <DropdownItem onClick={() => handleOpenEdit(provider)}><Edit className="mr-2 h-4 w-4" /> Edit</DropdownItem>
                    <DropdownItem onClick={() => handleOpenDelete(provider)} className="text-red-600"><Trash2 className="mr-2 h-4 w-4" /> Delete</DropdownItem>
                  </Dropdown>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">{provider.name}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 min-h-[40px]">{provider.description}</p>
              
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Zap className="h-4 w-4 text-amber-500" />
                  <span>Tokens used</span>
                </div>
                <span className="font-semibold text-slate-900 dark:text-white">{provider.tokens}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add AI Provider">
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Provider Name</label>
            <input
              type="text"
              required
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              value={formData.name || ''}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
            <textarea
              required
              rows={3}
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              value={formData.description || ''}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Status</label>
            <select
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:border-slate-700 dark:bg-slate-900 dark:text-white text-slate-900"
              value={formData.status || 'Active'}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button type="submit">Add Provider</Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit AI Provider">
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Provider Name</label>
            <input
              type="text"
              required
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              value={formData.name || ''}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
            <textarea
              required
              rows={3}
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              value={formData.description || ''}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Status</label>
            <select
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:border-slate-700 dark:bg-slate-900 dark:text-white text-slate-900"
              value={formData.status || 'Active'}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Confirm Deletion">
        <div className="space-y-4">
          <p className="text-slate-600 dark:text-slate-300">Are you sure you want to delete <span className="font-semibold text-slate-900 dark:text-white">{selectedItem?.name}</span>? This action cannot be undone.</p>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={handleDeleteSubmit}>Delete</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
