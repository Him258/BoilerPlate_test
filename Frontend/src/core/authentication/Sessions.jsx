import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { UniversalCRUDLayout } from '@/components/layout/UniversalCRUDLayout';
import { Drawer } from '@/components/ui/Drawer';
import { StatCard } from '@/components/ui/StatCard';
import { MockChart } from '@/components/ui/MockChart';

export function Sessions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    c1: '', c2: '', c3: '', c4: '', c5: '', c6: '', c7: 'Just now', c8: 'Active'
  });

  const [data, setData] = useState([
  {
    "id": 1,
    "c1": "Alice Freeman",
    "c2": "Chrome 120",
    "c3": "macOS 14",
    "c4": "Desktop",
    "c5": "192.168.1.1",
    "c6": "New York, US",
    "c7": "Just now",
    "c8": "Active"
  },
  {
    "id": 2,
    "c1": "Bob Smith",
    "c2": "Safari 17",
    "c3": "iOS 17",
    "c4": "Mobile",
    "c5": "10.0.0.5",
    "c6": "London, UK",
    "c7": "5 mins ago",
    "c8": "Active"
  },
  {
    "id": 3,
    "c1": "Charlie Davis",
    "c2": "Edge 119",
    "c3": "Windows 11",
    "c4": "Desktop",
    "c5": "172.16.0.4",
    "c6": "Berlin, DE",
    "c7": "1 hour ago",
    "c8": "Active"
  },
  {
    "id": 4,
    "c1": "Diana Prince",
    "c2": "Firefox 121",
    "c3": "Ubuntu 22.04",
    "c4": "Desktop",
    "c5": "192.168.2.10",
    "c6": "Paris, FR",
    "c7": "2 hours ago",
    "c8": "Expired"
  },
  {
    "id": 5,
    "c1": "Evan Wright",
    "c2": "Chrome Mobile",
    "c3": "Android 14",
    "c4": "Mobile",
    "c5": "10.1.1.20",
    "c6": "Tokyo, JP",
    "c7": "Just now",
    "c8": "Active"
  },
  {
    "id": 6,
    "c1": "Fiona Gallagher",
    "c2": "Safari 16",
    "c3": "macOS 13",
    "c4": "Desktop",
    "c5": "172.16.1.5",
    "c6": "Sydney, AU",
    "c7": "3 days ago",
    "c8": "Blocked"
  },
  {
    "id": 7,
    "c1": "George Miller",
    "c2": "Opera",
    "c3": "Windows 10",
    "c4": "Desktop",
    "c5": "192.168.1.50",
    "c6": "Toronto, CA",
    "c7": "15 mins ago",
    "c8": "Active"
  },
  {
    "id": 8,
    "c1": "Hannah Abbott",
    "c2": "Chrome 120",
    "c3": "macOS 14",
    "c4": "Desktop",
    "c5": "10.0.0.12",
    "c6": "Dubai, UAE",
    "c7": "Yesterday",
    "c8": "Expired"
  }
  ]);

  const handleOpenDrawer = (row = null) => {
    if (row) {
      setEditingId(row.id);
      setFormData(row);
    } else {
      setEditingId(null);
      setFormData({ c1: '', c2: '', c3: '', c4: '', c5: '', c6: '', c7: 'Just now', c8: 'Active' });
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
      title="Active Sessions"
      description="Monitor and terminate active user sessions."
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
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Browser</th>
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">OS</th>
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Device</th>
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">IP Address</th>
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Location</th>
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Last Activity</th>
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Status</th>
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
                <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{row.c6}</td>
                <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{row.c7}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    row.c8 === 'Active' || row.c8 === 'Success' || row.c8 === 'Trusted' || row.c8 === 'Indexed' || row.c8 === 'Published'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                      : row.c8 === 'Expired' || row.c8 === 'Failed' || row.c8 === 'Blocked' || row.c8 === 'Suspended' 
                      ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                  }`}>
                    {row.c8}
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
        <StatCard title="Active Sessions" value={data.filter(d => d.c8 === 'Active').length.toString()} icon="Monitor" trend={`out of ${data.length} total`} color="green" />
        <StatCard title="Expired Sessions" value={data.filter(d => d.c8 === 'Expired').length.toString()} icon="Clock" trend="requires re-login" color="blue" />
        <StatCard title="Blocked Sessions" value={data.filter(d => d.c8 === 'Blocked').length.toString()} icon="Ban" trend="security flagged" color="red" />
      </div>
    </UniversalCRUDLayout>
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title={editingId ? "Edit Session" : "Add Session"}>
        <div className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">User</label>
            <select name="c1" value={formData.c1} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-slate-900 dark:text-white dark:ring-slate-700">
              <option value="">Select a User...</option>
              <option value="Alice Freeman">Alice Freeman</option>
              <option value="Bob Smith">Bob Smith</option>
              <option value="Charlie Davis">Charlie Davis</option>
              <option value="Diana Prince">Diana Prince</option>
              <option value="Evan Wright">Evan Wright</option>
              <option value="Fiona Gallagher">Fiona Gallagher</option>
              <option value="George Miller">George Miller</option>
              <option value="Hannah Abbott">Hannah Abbott</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Browser</label>
            <input name="c2" value={formData.c2} onChange={handleChange} type="text" className="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-slate-900 dark:text-white dark:ring-slate-700" placeholder="e.g. Chrome 120" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">OS</label>
            <select name="c3" value={formData.c3} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-slate-900 dark:text-white dark:ring-slate-700">
              <option value="">Select OS...</option>
              <option value="Windows 11">Windows 11</option>
              <option value="Windows 10">Windows 10</option>
              <option value="macOS 14">macOS 14</option>
              <option value="macOS 13">macOS 13</option>
              <option value="Linux">Linux</option>
              <option value="Ubuntu 22.04">Ubuntu 22.04</option>
              <option value="iOS 17">iOS 17</option>
              <option value="Android 14">Android 14</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Device</label>
            <select name="c4" value={formData.c4} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-slate-900 dark:text-white dark:ring-slate-700">
              <option value="">Select Device...</option>
              <option value="Desktop">Desktop</option>
              <option value="Laptop">Laptop</option>
              <option value="Mobile">Mobile</option>
              <option value="Tablet">Tablet</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">IP Address</label>
            <input name="c5" value={formData.c5} onChange={handleChange} type="text" className="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-slate-900 dark:text-white dark:ring-slate-700" placeholder="e.g. 192.168.1.1" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Location</label>
            <input name="c6" value={formData.c6} onChange={handleChange} type="text" className="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-slate-900 dark:text-white dark:ring-slate-700" placeholder="e.g. New York, US" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Status</label>
            <select name="c8" value={formData.c8} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-slate-900 dark:text-white dark:ring-slate-700">
              <option>Active</option>
              <option>Expired</option>
              <option>Blocked</option>
            </select>
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
