import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { UniversalCRUDLayout } from '@/components/layout/UniversalCRUDLayout';
import { Drawer } from '@/components/ui/Drawer';

export function Automations() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [data, setData] = useState([
  {
    "id": 1,
    "c1": "Auto-assign Lead",
    "c2": "Lead Created",
    "c3": "Assign User",
    "c4": "Sales Team",
    "c5": "8,450",
    "c6": "Active"
  },
  {
    "id": 2,
    "c1": "Payment Failed Alert",
    "c2": "Charge Failed",
    "c3": "Send Slack",
    "c4": "#finance-alerts",
    "c5": "142",
    "c6": "Active"
  },
  {
    "id": 3,
    "c1": "New Ticket Slack",
    "c2": "Ticket Created",
    "c3": "Send Slack",
    "c4": "#support",
    "c5": "12,400",
    "c6": "Active"
  },
  {
    "id": 4,
    "c1": "VIP Tagging",
    "c2": "Spend > $1000",
    "c3": "Add Tag",
    "c4": "User Profile",
    "c5": "45",
    "c6": "Active"
  },
  {
    "id": 5,
    "c1": "Spam Filter",
    "c2": "Comment Posted",
    "c3": "AI Moderation",
    "c4": "Content",
    "c5": "45,200",
    "c6": "Active"
  },
  {
    "id": 6,
    "c1": "Auto-close Stale Ticket",
    "c2": "Ticket Inactive > 7d",
    "c3": "Update Status",
    "c4": "Ticket",
    "c5": "1,200",
    "c6": "Active"
  },
  {
    "id": 7,
    "c1": "Webhook to Zapier",
    "c2": "Order Placed",
    "c3": "POST HTTP",
    "c4": "Zapier URL",
    "c5": "0",
    "c6": "Draft"
  },
  {
    "id": 8,
    "c1": "Legacy Sync",
    "c2": "User Updated",
    "c3": "POST HTTP",
    "c4": "Legacy API",
    "c5": "100,200",
    "c6": "Failed"
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
      title="Automations"
      description="Configure simple IF-THEN rules and trigger-based actions."
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
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Rule Name</th>
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Event Trigger</th>
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Action</th>
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Target</th>
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Executions</th>
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
      
    </UniversalCRUDLayout>
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title={editingId ? "Edit Record" : "Add Record"}>
        <div className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Rule Name</label>
            <input name="c1" value={formData.c1} onChange={handleChange} type="text" className="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-slate-900 dark:text-white dark:ring-slate-700" placeholder="Enter Rule Name..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Event Trigger</label>
            <select name="c2" value={formData.c2} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-slate-900 dark:text-white dark:ring-slate-700">
              <option value="">Select Trigger...</option>
              <option value="User Signed Up">User Signed Up</option>
              <option value="Payment Failed">Payment Failed</option>
              <option value="New Support Ticket">New Support Ticket</option>
              <option value="Webhook Received">Webhook Received</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Action</label>
            <select name="c3" value={formData.c3} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-slate-900 dark:text-white dark:ring-slate-700">
              <option value="">Select Action...</option>
              <option value="Send Email Template">Send Email Template</option>
              <option value="Run AI Prompt">Run AI Prompt</option>
              <option value="Change Subscription Plan">Change Subscription Plan</option>
              <option value="Send Slack Message">Send Slack Message</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Target (Connects to Modules)</label>
            <select name="c4" value={formData.c4} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-slate-900 dark:text-white dark:ring-slate-700">
              <option value="">Select Target...</option>
              <optgroup label="Email Templates">
                <option value="Welcome Email">Welcome Email</option>
                <option value="Password Reset">Password Reset</option>
              </optgroup>
              <optgroup label="AI Prompts">
                <option value="Support Bot Prompt">Support Bot Prompt</option>
                <option value="Email Summarizer">Email Summarizer</option>
              </optgroup>
              <optgroup label="Subscription Plans">
                <option value="Free Tier">Free Tier</option>
                <option value="Pro Plan">Pro Plan</option>
              </optgroup>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Executions</label>
            <input name="c5" value={formData.c5} onChange={handleChange} type="text" className="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-slate-900 dark:text-white dark:ring-slate-700" placeholder="Enter Executions..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Status</label>
            <select name="c6" value={formData.c6} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-slate-900 dark:text-white dark:ring-slate-700">
              <option value="Active">Active</option>
              <option value="Draft">Draft</option>
              <option value="Failed">Failed</option>
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
