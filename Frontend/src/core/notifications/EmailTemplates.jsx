import { useState, useMemo, useEffect } from "react"
import { Mail, Search, Plus, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Modal } from "@/components/ui/Modal"
import { useToast } from "@/components/ui/ToastContext"

export function EmailTemplates() {
  const [emailTemplates, setEmailTemplates] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  
  const [formData, setFormData] = useState({})
  const [selectedItem, setSelectedItem] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const { addToast } = useToast()

  const fetchTemplates = () => {
    setEmailTemplates([
      { id: 1, name: 'Welcome Email', subject: 'Welcome to Kiaan Core', body: 'Hello {{name}}, welcome to our platform!' },
      { id: 2, name: 'Password Reset', subject: 'Reset Your Password', body: 'Click here to reset your password: {{link}}' }
    ]);
  }

  useEffect(() => {
    fetchTemplates()
  }, [])

  const filteredList = useMemo(() => {
    if (!searchTerm) return emailTemplates
    return emailTemplates.filter(item => 
      Object.values(item).some(val => 
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }, [emailTemplates, searchTerm])

  const handleOpenAdd = () => {
    setFormData({ name: '', subject: '', body: '' })
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
    const newItem = { ...formData, id: Date.now() }
    setEmailTemplates([newItem, ...emailTemplates])
    setIsAddModalOpen(false)
    addToast(`Template created successfully!`)
  }

  const handleEditSubmit = (e) => {
    e.preventDefault()
    setEmailTemplates(emailTemplates.map(item => item.id === selectedItem.id ? { ...item, ...formData } : item))
    setIsEditModalOpen(false)
    addToast(`Template updated successfully!`)
  }

  const handleDeleteSubmit = () => {
    setEmailTemplates(emailTemplates.filter(item => item.id !== selectedItem.id))
    setIsDeleteModalOpen(false)
    addToast(`Template deleted successfully!`)
  }

  const handleInputChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }

  

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-200 pb-4 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center">
            <Mail className="mr-2 h-6 w-6 text-slate-400" /> Email Templates
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Create and manage reusable email templates for your CRM.
          </p>
        </div>
        <Button onClick={handleOpenAdd}>
          <Plus className="mr-2 h-4 w-4" /> New Template
        </Button>
      </div>

      <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <div className="flex flex-col sm:flex-row items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800 space-y-4 sm:space-y-0">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-10 w-full rounded-md border border-slate-300 bg-white pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:border-slate-700 dark:bg-slate-900 dark:text-white text-slate-900"
            />
          </div>
        </div>

        {filteredList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-slate-100 p-3 dark:bg-slate-800 mb-4">
              <Mail className="h-6 w-6 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 dark:text-white">No templates found</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Get started by creating a new email template.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full whitespace-nowrap text-left text-sm">
              <thead className="bg-slate-50 dark:bg-slate-900/50 dark:text-white text-slate-900">
                <tr>
                  <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Template Name</th>
                  <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Subject Line</th>
                  <th className="px-6 py-4 text-right font-semibold text-slate-900 dark:text-slate-200">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-transparent">
                {filteredList.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400 truncate max-w-xs">
                      {item.subject}
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

      <Modal isOpen={isAddModalOpen || isEditModalOpen} onClose={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }} title={isAddModalOpen ? "New Email Template" : "Edit Template"}>
        <form onSubmit={isAddModalOpen ? handleAddSubmit : handleEditSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Template Name</label>
            <input type="text" required value={formData.name || ''} onChange={(e) => handleInputChange('name', e.target.value)} placeholder="e.g. Welcome Series 1" className="w-full h-10 px-3 rounded-md border border-slate-300 bg-white text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:border-slate-700 dark:bg-slate-900 dark:text-white text-slate-900" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Subject Line</label>
            <input type="text" required value={formData.subject || ''} onChange={(e) => handleInputChange('subject', e.target.value)} placeholder="Subject of the email" className="w-full h-10 px-3 rounded-md border border-slate-300 bg-white text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:border-slate-700 dark:bg-slate-900 dark:text-white text-slate-900" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Body</label>
            <textarea 
              required 
              rows={6}
              value={formData.body || ''} 
              onChange={(e) => handleInputChange('body', e.target.value)} 
              placeholder="Hi {{name}}, ..." 
              className="w-full p-3 rounded-md border border-slate-300 bg-white text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:border-slate-700 dark:bg-slate-900 dark:text-white resize-none text-slate-900"
            />
            <p className="text-xs text-slate-500 mt-1">Use {'{{name}}'}, {'{{company}}'} for dynamic variables.</p>
          </div>
          <div className="mt-6 flex justify-end space-x-3 border-t border-slate-100 dark:border-slate-800 pt-4">
            <Button variant="outline" type="button" onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }}>Cancel</Button>
            <Button type="submit" disabled={isLoading}>{isLoading ? 'Saving...' : (isAddModalOpen ? 'Save Template' : 'Update Template')}</Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Confirm Deletion">
        <div className="py-2">
          <p className="text-slate-600 dark:text-slate-300">
            Are you sure you want to delete template <strong>{selectedItem?.name}</strong>? This action cannot be undone.
          </p>
        </div>
        <div className="mt-6 flex justify-end space-x-3 border-t border-slate-100 dark:border-slate-800 pt-4">
          <Button variant="outline" type="button" disabled={isLoading} onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
          <Button type="button" disabled={isLoading} className="bg-red-600 hover:bg-red-700 text-white" onClick={handleDeleteSubmit}>
            {isLoading ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </Modal>
    </div>
  )
}
