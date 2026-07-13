import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { UniversalCRUDLayout } from '@/components/layout/UniversalCRUDLayout';
import { Drawer } from '@/components/ui/Drawer';
import { StatCard } from '@/components/ui/StatCard';
import { MockChart } from '@/components/ui/MockChart';

export function LoginLogs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [data, setData] = useState([
  {
    "id": 1,
    "c1": "alice@example.com",
    "c2": "192.168.1.1",
    "c3": "United States",
    "c4": "Chrome 120",
    "c5": "Success",
    "c6": "2026-06-27 10:00:00"
  },
  {
    "id": 2,
    "c1": "bob@example.com",
    "c2": "10.0.0.5",
    "c3": "United Kingdom",
    "c4": "Safari 17",
    "c5": "Success",
    "c6": "2026-06-27 09:45:12"
  },
  {
    "id": 3,
    "c1": "charlie@example.com",
    "c2": "172.16.0.4",
    "c3": "Germany",
    "c4": "Edge 119",
    "c5": "Failed",
    "c6": "2026-06-27 09:30:45"
  },
  {
    "id": 4,
    "c1": "diana@example.com",
    "c2": "192.168.2.10",
    "c3": "France",
    "c4": "Firefox 121",
    "c5": "Success",
    "c6": "2026-06-27 09:15:22"
  },
  {
    "id": 5,
    "c1": "evan@example.com",
    "c2": "10.1.1.20",
    "c3": "Japan",
    "c4": "Chrome 120",
    "c5": "Success",
    "c6": "2026-06-27 09:00:10"
  },
  {
    "id": 6,
    "c1": "fiona@example.com",
    "c2": "172.16.1.5",
    "c3": "Australia",
    "c4": "Safari 16",
    "c5": "Failed",
    "c6": "2026-06-27 08:45:05"
  },
  {
    "id": 7,
    "c1": "george@example.com",
    "c2": "192.168.1.50",
    "c3": "Canada",
    "c4": "Edge 119",
    "c5": "Success",
    "c6": "2026-06-27 08:30:00"
  },
  {
    "id": 8,
    "c1": "hannah@example.com",
    "c2": "10.0.0.12",
    "c3": "UAE",
    "c4": "Chrome 120",
    "c5": "Failed",
    "c6": "2026-06-27 08:15:33"
  }
]);

  
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ c1: '', c2: '', c3: '', c4: '', c5: '', c6: '' });

  const handleOpenDrawer = (row = null) => {
    if (row) {
      setEditingId(row.id);
      setFormData(row);
    } else {
      setEditingId(null);
      setFormData({ c1: '', c2: '', c3: '', c4: '', c5: '', c6: '' });
    }
    setIsDrawerOpen(true);
  };

  const handleSave = () => {
    if (editingId) {
      setData(data.map(d => d.id === editingId ? { ...formData, id: editingId } : d));
    } else {
      setData([{ ...formData, id: Date.now() }, ...data]);
    }
    setIsDrawerOpen(false);
  };

  const handleDelete = (id) => {
    setData(data.filter(d => d.id !== id));
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
      title="Login History"
      description="Audit trail of all login attempts across the platform."
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
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">User</th>
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">IP Address</th>
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Country</th>
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Browser</th>
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Status</th>
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Date</th>
              <th className="px-6 py-4 text-right font-semibold text-slate-900 dark:text-slate-200">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-transparent">
            {filteredData.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{row.c1}</td>
                <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{row.c2}</td>
                <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{row.c3}</td>
                <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{row.c4}</td>
                <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{row.c5}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    row.c6 === 'Active' || row.c6 === 'Success' || row.c6 === 'Trusted' || row.c6 === 'Indexed' || row.c6 === 'Published'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                      : row.c6 === 'Expired' || row.c6 === 'Failed' || row.c6 === 'Blocked' || row.c6 === 'Suspended' 
                      ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                  }`}>
                    {row.c6}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end space-x-2">
                    <button onClick={() => handleOpenDrawer(row)} className="p-1 rounded-md text-slate-400 hover:bg-slate-100 hover:text-primary dark:hover:bg-slate-800 transition-colors">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleDelete(row.id)} className="p-1 rounded-md text-slate-400 hover:bg-slate-100 hover:text-red-500 dark:hover:bg-slate-800 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
  <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
    <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">Login Trend</h3>
    <MockChart type="area" color="#3b82f6" />
  </div>
  <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
    <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">Successful Logins</h3>
    <MockChart type="bar" color="#10b981" />
  </div>
  <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
    <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">Failed Logins</h3>
    <MockChart type="bar" color="#ef4444" />
  </div>
</div>
    </UniversalCRUDLayout>
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title={editingId ? "Edit Record" : "Add Record"}>
        <div className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">User</label>
            <select name="c1" value={formData.c1} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-slate-900 dark:text-white dark:ring-slate-700">
              <option value="">Select a User...</option>
              <option value="alice@example.com">alice@example.com</option>
              <option value="bob@example.com">bob@example.com</option>
              <option value="charlie@example.com">charlie@example.com</option>
              <option value="diana@example.com">diana@example.com</option>
              <option value="evan@example.com">evan@example.com</option>
              <option value="fiona@example.com">fiona@example.com</option>
              <option value="george@example.com">george@example.com</option>
              <option value="hannah@example.com">hannah@example.com</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">IP Address</label>
            <input name="c2" value={formData.c2} onChange={handleChange} type="text" className="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-slate-900 dark:text-white dark:ring-slate-700" placeholder="Enter IP Address..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Country</label>
            <input name="c3" value={formData.c3} onChange={handleChange} type="text" className="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-slate-900 dark:text-white dark:ring-slate-700" placeholder="Enter Country..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Browser</label>
            <input name="c4" value={formData.c4} onChange={handleChange} type="text" className="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-slate-900 dark:text-white dark:ring-slate-700" placeholder="Enter Browser..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Status</label>
            <select name="c5" value={formData.c5} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-slate-900 dark:text-white dark:ring-slate-700">
              <option value="Success">Success</option>
              <option value="Failed">Failed</option>
              <option value="Blocked">Blocked</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Date</label>
            <input name="c6" value={formData.c6} onChange={handleChange} type="text" className="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-slate-900 dark:text-white dark:ring-slate-700" placeholder="Enter Date..." />
          </div>
          <div className="pt-4 flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsDrawerOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </div>
      </Drawer>
    </>
  );
}
