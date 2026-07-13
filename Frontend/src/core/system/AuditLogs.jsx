import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { UniversalCRUDLayout } from '@/components/layout/UniversalCRUDLayout';
import { StatCard } from '@/components/ui/StatCard';
import { Modal } from '@/components/ui/Modal';

export function AuditLogs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [logs, setLogs] = useState([
    { id: 1, c1: "evt_101", c2: "plan.downgraded (Pro to Free)", c3: "rahul@system", c4: "Client X (tnt_105)", c5: "192.168.1.1", c6: "Today 2:15 PM" },
    { id: 2, c1: "evt_102", c2: "api_key.deleted", c3: "client@wayne.com", c4: "key_404 (Stripe Prod)", c5: "10.0.0.1", c6: "Yesterday 11:30 PM" },
    { id: 3, c1: "evt_103", c2: "webhook.added", c3: "bob@stark.com", c4: "hook_22", c5: "172.16.0.4", c6: "1 hour ago" },
    { id: 4, c1: "evt_104", c2: "user.created", c3: "admin@system", c4: "usr_501 (John Doe)", c5: "192.168.2.10", c6: "2 hours ago" },
    { id: 5, c1: "evt_105", c2: "tenant.suspended", c3: "system", c4: "tnt_105", c5: "127.0.0.1", c6: "Yesterday" },
    { id: 6, c1: "evt_106", c2: "invoice.paid", c3: "stripe_webhook", c4: "inv_2026", c5: "3.3.3.3", c6: "Yesterday" },
    { id: 7, c1: "evt_107", c2: "user.deleted", c3: "diana@them.gov", c4: "usr_802", c5: "10.1.1.20", c6: "2 days ago" },
    { id: 8, c1: "evt_108", c2: "login.failed", c3: "unknown", c4: "usr_admin", c5: "45.22.11.9", c6: "2 days ago" }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLog, setEditingLog] = useState(null);
  
  const [formData, setFormData] = useState({
    c1: '', c2: '', c3: '', c4: '', c5: '', c6: 'Just now'
  });

  const handleOpenModal = (logItem = null) => {
    if (logItem) {
      setEditingLog(logItem);
      setFormData(logItem);
    } else {
      setEditingLog(null);
      setFormData({ c1: `evt_${Date.now().toString().slice(-3)}`, c2: '', c3: '', c4: '', c5: '', c6: 'Just now' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingLog(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (editingLog) {
      setLogs(logs.map(l => l.id === editingLog.id ? { ...formData, id: l.id } : l));
    } else {
      setLogs([{ ...formData, id: Date.now() }, ...logs]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    setLogs(logs.filter(l => l.id !== id));
  };

  const filteredData = logs.filter(item => 
    Object.values(item).some(val => 
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <UniversalCRUDLayout
      title="Audit Logs"
      description="Immutable record of system-wide changes."
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
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Event ID</th>
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Action</th>
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Actor</th>
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Resource</th>
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">IP Address</th>
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Timestamp</th>
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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard title="Total Events" value={logs.length.toString()} icon="Activity" trend="system wide" color="blue" />
        <StatCard title="Critical Events" value={logs.filter(l => l.c2.includes('failed') || l.c2.includes('deleted')).length.toString()} icon="AlertTriangle" trend="needs review" color="orange" />
        <StatCard title="Security Alerts" value={logs.filter(l => l.c3.includes('unknown') || l.c2.includes('suspended')).length.toString()} icon="ShieldAlert" trend="high priority" color="red" />
        <StatCard title="Storage Used" value={`${(logs.length * 0.05).toFixed(1)} MB`} icon="Database" trend="approximate" color="purple" />
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingLog ? "Edit Audit Log" : "Add New Audit Log"}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Event ID</label>
            <input 
              name="c1"
              value={formData.c1}
              onChange={handleChange}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 dark:text-white dark:border-slate-700 dark:bg-slate-900"
              placeholder="e.g. evt_101"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Action</label>
            <input 
              name="c2"
              value={formData.c2}
              onChange={handleChange}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 dark:text-white dark:border-slate-700 dark:bg-slate-900"
              placeholder="e.g. user.created"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Actor</label>
            <input 
              name="c3"
              value={formData.c3}
              onChange={handleChange}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 dark:text-white dark:border-slate-700 dark:bg-slate-900"
              placeholder="e.g. alice@acme.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Resource</label>
            <input 
              name="c4"
              value={formData.c4}
              onChange={handleChange}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 dark:text-white dark:border-slate-700 dark:bg-slate-900"
              placeholder="e.g. usr_501"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">IP Address</label>
            <input 
              name="c5"
              value={formData.c5}
              onChange={handleChange}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 dark:text-white dark:border-slate-700 dark:bg-slate-900"
              placeholder="e.g. 192.168.1.1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Timestamp</label>
            <input 
              name="c6"
              value={formData.c6}
              onChange={handleChange}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 dark:text-white dark:border-slate-700 dark:bg-slate-900"
              placeholder="e.g. Just now"
            />
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
