import { useState, useEffect } from "react"
import { UniversalCRUDLayout } from "@/components/layout/UniversalCRUDLayout"
import { Button } from '@/components/ui/Button';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Drawer } from '@/components/ui/Drawer';

function MasterDataLayout({ title, description, columns, data, setData }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  
  const initialFormKeys = columns.reduce((acc, col) => {
    acc[col.key] = '';
    return acc;
  }, {});
  
  const [formData, setFormData] = useState(initialFormKeys);

  const handleOpenDrawer = (row = null, index = null) => {
    if (row) {
      setEditingIndex(index);
      setFormData(row);
    } else {
      setEditingIndex(null);
      setFormData(initialFormKeys);
    }
    setIsDrawerOpen(true);
  };

  const handleSave = () => {
    if (editingIndex !== null) {
      const newData = [...data];
      newData[editingIndex] = formData;
      setData(newData);
    } else {
      setData([formData, ...data]);
    }
    setIsDrawerOpen(false);
  };

  const handleDelete = (index) => {
    setData(data.filter((_, i) => i !== index));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const filteredData = data.filter(item => 
    Object.values(item).some(val => 
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <>
      <UniversalCRUDLayout
        title={title}
        description={description}
        toolbarActions={
          <Button onClick={() => handleOpenDrawer()}>
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Button>
        }
        searchProps={{
          value: searchTerm,
          onChange: (e) => setSearchTerm(e.target.value),
          placeholder: "Search..."
        }}
        hasData={filteredData.length > 0}
        table={
          <table className="w-full whitespace-nowrap text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-900/50 dark:text-white text-slate-900">
              <tr>
                {columns.map(c => <th key={c.key} className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">{c.label}</th>)}
                <th className="px-6 py-4 text-right font-semibold text-slate-900 dark:text-slate-200">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-transparent">
              {filteredData.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  {columns.map(c => (
                    <td key={c.key} className="px-6 py-4 text-slate-500 dark:text-slate-400">
                      {row[c.key]}
                    </td>
                  ))}
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <button onClick={() => handleOpenDrawer(row, i)} className="p-1 rounded-md text-slate-400 hover:bg-slate-100 hover:text-primary dark:hover:bg-slate-800 transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDelete(i)} className="p-1 rounded-md text-slate-400 hover:bg-slate-100 hover:text-red-500 dark:hover:bg-slate-800 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        }
      />
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title={editingIndex !== null ? `Edit ${title}` : `Add ${title}`}>
        <div className="space-y-4 mt-4">
          {columns.map(c => (
            <div key={c.key}>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{c.label}</label>
              <input 
                name={c.key} 
                value={formData[c.key] || ''} 
                onChange={handleChange} 
                type="text" 
                className="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-slate-900 dark:text-white dark:ring-slate-700" 
                placeholder={`Enter ${c.label}...`} 
              />
            </div>
          ))}
          <div className="pt-4 flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsDrawerOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      </Drawer>
    </>
  )
}

export function BillingOverview() {
  const [data, setData] = useState([
    { metric: "Current MRR", value: "$1,200" },
    { metric: "Active Subscriptions", value: "14" }
  ])
  const columns = [{ key: "metric", label: "Metric" }, { key: "value", label: "Value" }]
  return <MasterDataLayout title="Billing Overview" description="Summary of your billing metrics." columns={columns} data={data} setData={setData} />
}

export function Transactions() {
  const [data, setData] = useState([
    { id: 'tx-101', amount: '$49.00', status: 'Completed' },
    { id: 'tx-102', amount: '$199.00', status: 'Pending' }
  ])
  const columns = [{ key: "id", label: "Transaction ID" }, { key: "amount", label: "Amount" }, { key: "status", label: "Status" }]
  return <MasterDataLayout title="Transactions" description="View all payment transactions." columns={columns} data={data} setData={setData} />
}

export function ScheduledReports() {
  const [data, setData] = useState([{ name: "Weekly Revenue", schedule: "Every Monday 9AM" }])
  const columns = [{ key: "name", label: "Report Name" }, { key: "schedule", label: "Schedule" }]
  return <MasterDataLayout title="Scheduled Reports" description="Automated report deliveries." columns={columns} data={data} setData={setData} />
}

export function ExportsCenter() {
  const [data, setData] = useState([{ file: "users_export_2023.csv", date: "Today", status: "Completed" }])
  const columns = [{ key: "file", label: "File Name" }, { key: "date", label: "Export Date" }, { key: "status", label: "Status" }]
  return <MasterDataLayout title="Exports Center" description="Download center for background exports." columns={columns} data={data} setData={setData} />
}

export function UIComponents() {
  const [data, setData] = useState([{ component: "Button", status: "Stable" }, { component: "Modal", status: "Beta" }])
  const columns = [{ key: "component", label: "Component Name" }, { key: "status", label: "Status" }]
  return <MasterDataLayout title="UI Components" description="Component library reference." columns={columns} data={data} setData={setData} />
}
