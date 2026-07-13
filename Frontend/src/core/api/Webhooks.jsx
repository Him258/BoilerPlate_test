import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { UniversalCRUDLayout } from '@/components/layout/UniversalCRUDLayout';
import { Modal } from '@/components/ui/Modal';

export function Webhooks() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [hooks, setHooks] = useState([
    { id: 1, c1: "https://api.acme.com/hook", c2: "user.created, payment.*", c3: "Production", c4: "100%", c5: "Just now", c6: "Active" },
    { id: 2, c1: "https://test.stark.com/events", c2: "* (All)", c3: "Staging", c4: "85%", c5: "2 days ago", c6: "Failing" },
    { id: 3, c1: "https://hooks.slack.com/...", c2: "ticket.created", c3: "Production", c4: "99.9%", c5: "1 hour ago", c6: "Active" },
    { id: 4, c1: "https://zapier.com/hooks/...", c2: "lead.updated", c3: "Production", c4: "100%", c5: "Yesterday", c6: "Active" },
    { id: 5, c1: "https://erp.wayne.com/sync", c2: "invoice.paid", c3: "Production", c4: "0%", c5: "1 week ago", c6: "Disabled" },
    { id: 6, c1: "https://dev.local/webhook", c2: "user.*", c3: "Development", c4: "10%", c5: "5 mins ago", c6: "Failing" },
    { id: 7, c1: "https://analytics.hooli.com/in", c2: "session.started", c3: "Production", c4: "99.9%", c5: "Just now", c6: "Active" },
    { id: 8, c1: "https://cyberdyne.io/events", c2: "system.alert", c3: "Production", c4: "100%", c5: "1 month ago", c6: "Active" }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHook, setEditingHook] = useState(null);
  
  const [formData, setFormData] = useState({
    c1: '', c2: '* (All)', c3: 'Production', c4: '100%', c6: 'Active'
  });

  const handleOpenModal = (hookItem = null) => {
    if (hookItem) {
      setEditingHook(hookItem);
      setFormData(hookItem);
    } else {
      setEditingHook(null);
      setFormData({ c1: '', c2: '* (All)', c3: 'Production', c4: '100%', c6: 'Active' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingHook(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (editingHook) {
      setHooks(hooks.map(h => h.id === editingHook.id ? { ...formData, id: h.id, c5: h.c5 } : h));
    } else {
      setHooks([...hooks, { ...formData, id: Date.now(), c5: 'Never' }]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    setHooks(hooks.filter(h => h.id !== id));
  };

  const filteredData = hooks.filter(item => 
    Object.values(item).some(val => 
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <UniversalCRUDLayout
      title="Webhooks"
      description="Manage event-driven HTTP callbacks."
      toolbarActions={
        <Button onClick={() => handleOpenModal()}>
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
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Endpoint URL</th>
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Events</th>
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Environment</th>
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Success Rate</th>
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Last Ping</th>
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
                    row.c6 === 'Active' || row.c6 === 'Good'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                      : row.c6 === 'Suspended' || row.c6 === 'Failing' || row.c6 === 'Revoked' || row.c6 === 'Critical'
                      ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                  }`}>
                    {row.c6 || 'Active'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end space-x-2">
                    <button 
                      onClick={() => handleOpenModal(row)}
                      className="p-1 rounded-md text-slate-400 hover:bg-slate-100 hover:text-primary dark:hover:bg-slate-800 transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(row.id)}
                      className="p-1 rounded-md text-slate-400 hover:bg-slate-100 hover:text-red-500 dark:hover:bg-slate-800 transition-colors"
                    >
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
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingHook ? "Edit Webhook" : "Add New Webhook"}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Endpoint URL</label>
            <input 
              name="c1"
              value={formData.c1}
              onChange={handleChange}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 dark:text-white dark:border-slate-700 dark:bg-slate-900"
              placeholder="e.g. https://api.example.com/webhook"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Events (Triggers from Automations)</label>
            <select 
              name="c2"
              value={formData.c2}
              onChange={handleChange}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 dark:text-white dark:border-slate-700 dark:bg-slate-900"
            >
              <option value="* (All)">* (All Events)</option>
              <option value="user.created">user.created (Identity)</option>
              <option value="payment.failed">payment.failed (Subscription)</option>
              <option value="ticket.created">ticket.created (Support)</option>
              <option value="invoice.paid">invoice.paid (Subscription)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tenant (Client)</label>
            <select 
              name="tenant"
              value={formData.tenant || ''}
              onChange={handleChange}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 dark:text-white dark:border-slate-700 dark:bg-slate-900"
            >
              <option value="">Select Tenant...</option>
              <option value="Acme Corp">Acme Corp</option>
              <option value="Stark Ind.">Stark Ind.</option>
              <option value="Wayne Ent.">Wayne Ent.</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Environment</label>
            <select 
              name="c3"
              value={formData.c3}
              onChange={handleChange}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 dark:text-white dark:border-slate-700 dark:bg-slate-900"
            >
              <option value="Production">Production</option>
              <option value="Staging">Staging</option>
              <option value="Development">Development</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Status</label>
            <select 
              name="c6"
              value={formData.c6}
              onChange={handleChange}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 dark:text-white dark:border-slate-700 dark:bg-slate-900"
            >
              <option value="Active">Active</option>
              <option value="Disabled">Disabled</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={handleCloseModal}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      </Modal>
    </UniversalCRUDLayout>
  );
}
