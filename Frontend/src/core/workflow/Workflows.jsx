import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { UniversalCRUDLayout } from '@/components/layout/UniversalCRUDLayout';
import { Drawer } from '@/components/ui/Drawer';
import { StatCard } from '@/components/ui/StatCard';
import { MockChart } from '@/components/ui/MockChart';

export function Workflows() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [data, setData] = useState([
  {
    "id": 1,
    "c1": "User Onboarding",
    "c2": "user.created",
    "c3": "45",
    "c4": "99.5%",
    "c5": "Just now",
    "c6": "Active"
  },
  {
    "id": 2,
    "c1": "Invoice Generation",
    "c2": "cron (monthly)",
    "c3": "0",
    "c4": "100%",
    "c5": "2 days ago",
    "c6": "Active"
  },
  {
    "id": 3,
    "c1": "Data Export",
    "c2": "Manual",
    "c3": "2",
    "c4": "95.0%",
    "c5": "1 hour ago",
    "c6": "Active"
  },
  {
    "id": 4,
    "c1": "Webhook Retry",
    "c2": "webhook.failed",
    "c3": "12",
    "c4": "80.5%",
    "c5": "5 mins ago",
    "c6": "Warning"
  },
  {
    "id": 5,
    "c1": "Sync to Salesforce",
    "c2": "lead.updated",
    "c3": "0",
    "c4": "0%",
    "c5": "Never",
    "c6": "Failed"
  },
  {
    "id": 6,
    "c1": "Trial Expiration Alert",
    "c2": "cron (daily)",
    "c3": "0",
    "c4": "100%",
    "c5": "Yesterday",
    "c6": "Active"
  },
  {
    "id": 7,
    "c1": "Welcome Email Series",
    "c2": "user.subscribed",
    "c3": "120",
    "c4": "99.9%",
    "c5": "10 mins ago",
    "c6": "Active"
  },
  {
    "id": 8,
    "c1": "Dormant Account Deletion",
    "c2": "cron (yearly)",
    "c3": "0",
    "c4": "100%",
    "c5": "Jan 1, 2026",
    "c6": "Active"
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
      title="Active Workflows"
      description="Monitor multi-step state machines and background jobs."
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
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Workflow Name</th>
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Trigger</th>
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Active Runs</th>
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Success Rate</th>
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Last Execution</th>
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
                    row.c6 === 'Active' || row.c6 === 'Success' || row.c6 === 'Delivered' || row.c6 === 'Indexed' || row.c6 === 'Valid'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                      : row.c6 === 'Failed' || row.c6 === 'Bounced' || row.c6 === 'Invalid' || row.c6 === 'Timeout' 
                      ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                  }`}>
                    {row.c6 || 'Active'}
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
        <StatCard title="Total Workflows" value={data.length.toString()} icon="ActivitySquare" trend={`+${data.filter(d => d.c6 === 'Active').length} active`} color="blue" />
        <StatCard title="Active Workflows" value={data.filter(d => d.c6 === 'Active').length.toString()} icon="PlayCircle" trend={`out of ${data.length} total`} color="purple" />
        <StatCard title="Warning Status" value={data.filter(d => d.c6 === 'Warning').length.toString()} icon="Clock" trend="check logs" color="orange" />
        <StatCard title="Failed Workflows" value={data.filter(d => d.c6 === 'Failed').length.toString()} icon="AlertOctagon" trend="action required" color="red" />
      </div>
    </UniversalCRUDLayout>
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title={editingId ? "Edit Record" : "Add Record"}>
        <div className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Workflow Name</label>
            <input name="c1" value={formData.c1} onChange={handleChange} type="text" className="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-slate-900 dark:text-white dark:ring-slate-700" placeholder="Enter Workflow Name..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Trigger</label>
            <select name="c2" value={formData.c2} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-slate-900 dark:text-white dark:ring-slate-700">
              <option value="">Select Trigger...</option>
              <option value="user.created">user.created</option>
              <option value="cron (daily)">cron (daily)</option>
              <option value="cron (monthly)">cron (monthly)</option>
              <option value="Manual">Manual</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Active Runs</label>
            <input name="c3" value={formData.c3} onChange={handleChange} type="text" className="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-slate-900 dark:text-white dark:ring-slate-700" placeholder="Enter Active Runs..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Success Rate</label>
            <input name="c4" value={formData.c4} onChange={handleChange} type="text" className="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-slate-900 dark:text-white dark:ring-slate-700" placeholder="Enter Success Rate..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Last Execution</label>
            <input name="c5" value={formData.c5} onChange={handleChange} type="text" className="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-slate-900 dark:text-white dark:ring-slate-700" placeholder="Enter Last Execution..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Status</label>
            <select name="c6" value={formData.c6} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-slate-900 dark:text-white dark:ring-slate-700">
              <option value="Active">Active</option>
              <option value="Failed">Failed</option>
              <option value="Warning">Warning</option>
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
