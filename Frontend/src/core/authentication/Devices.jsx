import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { UniversalCRUDLayout } from '@/components/layout/UniversalCRUDLayout';
import { Drawer } from '@/components/ui/Drawer';
import { StatCard } from '@/components/ui/StatCard';
import { MockChart } from '@/components/ui/MockChart';

export function Devices() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [data, setData] = useState([
  {
    "id": 1,
    "c1": "Alice MacBook Pro",
    "c2": "Alice Freeman",
    "c3": "Chrome",
    "c4": "macOS 14",
    "c5": "192.168.1.1",
    "c6": "New York, US",
    "c7": "Today, 10:00 AM",
    "c8": "Trusted"
  },
  {
    "id": 2,
    "c1": "Bob iPhone 15",
    "c2": "Bob Smith",
    "c3": "Safari",
    "c4": "iOS 17",
    "c5": "10.0.0.5",
    "c6": "London, UK",
    "c7": "Yesterday",
    "c8": "Trusted"
  },
  {
    "id": 3,
    "c1": "Charlie ThinkPad",
    "c2": "Charlie Davis",
    "c3": "Edge",
    "c4": "Windows 11",
    "c5": "172.16.0.4",
    "c6": "Berlin, DE",
    "c7": "Today, 08:30 AM",
    "c8": "Trusted"
  },
  {
    "id": 4,
    "c1": "Unknown Linux Box",
    "c2": "Diana Prince",
    "c3": "Firefox",
    "c4": "Ubuntu 22.04",
    "c5": "192.168.2.10",
    "c6": "Paris, FR",
    "c7": "Jan 15, 2026",
    "c8": "Blocked"
  },
  {
    "id": 5,
    "c1": "Evan Pixel 8",
    "c2": "Evan Wright",
    "c3": "Chrome",
    "c4": "Android 14",
    "c5": "10.1.1.20",
    "c6": "Tokyo, JP",
    "c7": "Today, 09:15 AM",
    "c8": "Trusted"
  },
  {
    "id": 6,
    "c1": "Fiona iMac",
    "c2": "Fiona Gallagher",
    "c3": "Safari",
    "c4": "macOS 13",
    "c5": "172.16.1.5",
    "c6": "Sydney, AU",
    "c7": "2 hours ago",
    "c8": "Pending"
  },
  {
    "id": 7,
    "c1": "George Surface",
    "c2": "George Miller",
    "c3": "Edge",
    "c4": "Windows 10",
    "c5": "192.168.1.50",
    "c6": "Toronto, CA",
    "c7": "5 mins ago",
    "c8": "Trusted"
  },
  {
    "id": 8,
    "c1": "Hannah iPad Pro",
    "c2": "Hannah Abbott",
    "c3": "Safari",
    "c4": "iPadOS 17",
    "c5": "10.0.0.12",
    "c6": "Dubai, UAE",
    "c7": "Yesterday",
    "c8": "Trusted"
  }
]);

  
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ c1: '', c2: '', c3: '', c4: '', c5: '', c6: '', c7: '', c8: '' });

  const handleOpenDrawer = (row = null) => {
    if (row) {
      setEditingId(row.id);
      setFormData(row);
    } else {
      setEditingId(null);
      setFormData({ c1: '', c2: '', c3: '', c4: '', c5: '', c6: '', c7: '', c8: '' });
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
      title="Registered Devices"
      description="Manage trusted devices for users."
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
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Device Name</th>
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Owner</th>
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Browser</th>
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Operating System</th>
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">IP</th>
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Location</th>
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Last Login</th>
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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard title="Registered Devices" value={data.length.toString()} icon="Laptop" trend={`across ${data.length} users`} color="primary" />
        <StatCard title="Trusted Devices" value={data.filter(d => d.c8 === 'Trusted').length.toString()} icon="ShieldCheck" trend="secured" color="green" />
        <StatCard title="Blocked Devices" value={data.filter(d => d.c8 === 'Blocked').length.toString()} icon="ShieldAlert" trend="requires action" color="red" />
        <StatCard title="Unknown Devices" value={data.filter(d => d.c8 === 'Pending').length.toString()} icon="HelpCircle" trend="awaiting review" color="orange" />
      </div>
    </UniversalCRUDLayout>
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title={editingId ? "Edit Record" : "Add Record"}>
        <div className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Device Name</label>
            <select name="c1" value={formData.c1} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-slate-900 dark:text-white dark:ring-slate-700">
              <option value="">Select Device...</option>
              <option value="MacBook Pro">MacBook Pro</option>
              <option value="ThinkPad">ThinkPad</option>
              <option value="Surface Pro">Surface Pro</option>
              <option value="iPhone 15">iPhone 15</option>
              <option value="iPad Pro">iPad Pro</option>
              <option value="Pixel 8">Pixel 8</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Owner</label>
            <select name="c2" value={formData.c2} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-slate-900 dark:text-white dark:ring-slate-700">
              <option value="">Select Owner...</option>
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
            <input name="c3" value={formData.c3} onChange={handleChange} type="text" className="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-slate-900 dark:text-white dark:ring-slate-700" placeholder="Enter Browser..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Operating System</label>
            <input name="c4" value={formData.c4} onChange={handleChange} type="text" className="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-slate-900 dark:text-white dark:ring-slate-700" placeholder="Enter Operating System..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">IP</label>
            <input name="c5" value={formData.c5} onChange={handleChange} type="text" className="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-slate-900 dark:text-white dark:ring-slate-700" placeholder="Enter IP..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Location</label>
            <input name="c6" value={formData.c6} onChange={handleChange} type="text" className="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-slate-900 dark:text-white dark:ring-slate-700" placeholder="Enter Location..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Last Login</label>
            <input name="c7" value={formData.c7} onChange={handleChange} type="text" className="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-slate-900 dark:text-white dark:ring-slate-700" placeholder="Enter Last Login..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Status</label>
            <select name="c8" value={formData.c8} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-slate-900 dark:text-white dark:ring-slate-700">
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Suspended">Suspended</option>
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
