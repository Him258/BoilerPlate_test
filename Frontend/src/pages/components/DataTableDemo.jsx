import { useState } from "react"
import { Search, Filter, Download, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Dropdown, DropdownItem } from "@/components/ui/Dropdown"
import { useToast } from "@/components/ui/ToastContext"

const data = [
  { id: 1, name: 'John Doe', email: 'john@kiaan.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@acme.com', role: 'User', status: 'Inactive' },
  { id: 3, name: 'Robert Johnson', email: 'robert@kiaan.com', role: 'Manager', status: 'Active' },
  { id: 4, name: 'Emily Davis', email: 'emily@acme.com', role: 'User', status: 'Active' },
  { id: 5, name: 'Michael Wilson', email: 'michael@kiaan.com', role: 'User', status: 'Pending' },
]

export function DataTableDemo() {
  const [selected, setSelected] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const { addToast } = useToast()

  const toggleAll = (e) => setSelected(e.target.checked ? data.map(d => d.id) : [])
  const toggleRow = (id) => setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])

  const filteredData = data.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.role.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = statusFilter === "All" || item.status === statusFilter
    return matchesSearch && matchesFilter
  })

  const handleExport = () => {
    addToast("Exporting CSV file...")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">DataTable Showcase</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Reusable advanced data table with search, filters, pagination, and bulk actions.
        </p>
      </div>

      <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <div className="flex flex-col sm:flex-row items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800 space-y-4 sm:space-y-0">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search records..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-10 w-full rounded-md border border-slate-300 bg-white pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:border-slate-700 dark:bg-slate-900 dark:text-white text-slate-900"
            />
          </div>
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <Dropdown
              align="right"
              trigger={
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" /> 
                  {statusFilter === "All" ? "Filters" : statusFilter}
                </Button>
              }
            >
              <DropdownItem onClick={() => setStatusFilter("All")}>All Statuses</DropdownItem>
              <DropdownItem onClick={() => setStatusFilter("Active")}>Active</DropdownItem>
              <DropdownItem onClick={() => setStatusFilter("Pending")}>Pending</DropdownItem>
              <DropdownItem onClick={() => setStatusFilter("Inactive")}>Inactive</DropdownItem>
            </Dropdown>
            <Button variant="outline" onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" /> Export CSV
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-900/50 dark:text-white text-slate-900">
              <tr>
                <th scope="col" className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">
                  <input type="checkbox" onChange={toggleAll} checked={selected.length === filteredData.length && filteredData.length > 0} className="rounded border-slate-300 text-primary focus:ring-primary dark:border-slate-700 dark:bg-slate-900 dark:text-white text-slate-900" />
                </th>
                <th scope="col" className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Name</th>
                <th scope="col" className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Email</th>
                <th scope="col" className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Role</th>
                <th scope="col" className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Status</th>
                <th scope="col" className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-transparent">
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="px-6 py-4">
                      <input type="checkbox" checked={selected.includes(item.id)} onChange={() => toggleRow(item.id)} className="rounded border-slate-300 text-primary focus:ring-primary dark:border-slate-700 dark:bg-slate-900 dark:text-white text-slate-900" />
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{item.name}</td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{item.email}</td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{item.role}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        item.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                        item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                        'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-400 hover:text-slate-500 dark:hover:text-slate-300">
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">
                    No results found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-slate-200 px-6 py-3 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 dark:text-white text-slate-900">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Showing <span className="font-medium text-slate-900 dark:text-white">{filteredData.length > 0 ? 1 : 0}</span> to <span className="font-medium text-slate-900 dark:text-white">{filteredData.length}</span> of <span className="font-medium text-slate-900 dark:text-white">{filteredData.length}</span> results
          </p>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="px-2" disabled>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="px-2" disabled>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
