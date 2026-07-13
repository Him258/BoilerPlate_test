import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { UniversalCRUDLayout } from '@/components/layout/UniversalCRUDLayout';
import { StatCard } from '@/components/ui/StatCard';
import { Modal } from '@/components/ui/Modal';

export function SuperAdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [tenants, setTenants] = useState([
    { id: 1, c1: "tnt_101", c2: "Acme Corp", c3: "Enterprise", c4: "$4,990", c5: "Good", c6: "Active" },
    { id: 2, c1: "tnt_102", c2: "Stark Ind.", c3: "Enterprise", c4: "$9,990", c5: "Good", c6: "Active" },
    { id: 3, c1: "tnt_103", c2: "Wayne Ent.", c3: "Pro", c4: "$990", c5: "Warning", c6: "Active" },
    { id: 4, c1: "tnt_104", c2: "Umbrella Corp", c3: "Enterprise", c4: "$15,000", c5: "Critical", c6: "Suspended" },
    { id: 5, c1: "tnt_105", c2: "Small Biz", c3: "Startup", c4: "$49", c5: "Good", c6: "Active" },
    { id: 6, c1: "tnt_106", c2: "Cyberdyne", c3: "Pro", c4: "$990", c5: "Good", c6: "Active" },
    { id: 7, c1: "tnt_107", c2: "Initech", c3: "Startup", c4: "$49", c5: "Good", c6: "Active" },
    { id: 8, c1: "tnt_108", c2: "Massive Dynamic", c3: "Enterprise", c4: "$4,990", c5: "Good", c6: "Active" }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTenant, setEditingTenant] = useState(null);
  
  const [formData, setFormData] = useState({
    c1: '', c2: '', c3: 'Startup', c4: '', c5: 'Good', c6: 'Active'
  });

  const handleOpenModal = (tenantItem = null) => {
    if (tenantItem) {
      setEditingTenant(tenantItem);
      setFormData(tenantItem);
    } else {
      setEditingTenant(null);
      setFormData({ c1: `tnt_${Date.now().toString().slice(-3)}`, c2: '', c3: 'Startup', c4: '', c5: 'Good', c6: 'Active' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTenant(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (editingTenant) {
      setTenants(tenants.map(t => t.id === editingTenant.id ? { ...formData, id: t.id } : t));
    } else {
      setTenants([{ ...formData, id: Date.now() }, ...tenants]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    setTenants(tenants.filter(t => t.id !== id));
  };

  const filteredData = tenants.filter(item => 
    Object.values(item).some(val => 
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <UniversalCRUDLayout
      title="Super Admin Dashboard"
      description="Global control center for the entire SaaS platform."
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
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Tenant ID</th>
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Name</th>
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Plan</th>
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">MRR</th>
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Health</th>
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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard title="Total Tenants" value={tenants.length.toString()} icon="Database" trend={`+${tenants.filter(t => t.c6 === 'Active').length} active`} color="blue" />
        <StatCard title="Total Revenue (MRR)" value={`$${tenants.reduce((sum, t) => sum + parseInt(t.c4.replace(/[^0-9]/g, '') || 0), 0).toLocaleString()}`} icon="DollarSign" trend="monthly recurring" color="green" />
        <StatCard title="Active Subscriptions" value={tenants.filter(t => t.c6 === 'Active').length.toString()} icon="CreditCard" trend="currently active" color="purple" />
        <StatCard title="Suspended Tenants" value={tenants.filter(t => t.c6 === 'Suspended').length.toString()} icon="AlertTriangle" trend="needs review" color="orange" />
        <StatCard title="System Health" value={tenants.filter(t => t.c5 === 'Critical').length > 0 ? "Warning" : "Optimal"} icon="Activity" trend={`${tenants.filter(t => t.c5 === 'Good').length} healthy`} color={tenants.filter(t => t.c5 === 'Critical').length > 0 ? "red" : "green"} />
        <StatCard title="Enterprise Plans" value={tenants.filter(t => t.c3 === 'Enterprise').length.toString()} icon="Star" trend="highest tier" color="blue" />
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingTenant ? "Edit Tenant" : "Add New Tenant"}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tenant ID</label>
            <input 
              name="c1"
              value={formData.c1}
              onChange={handleChange}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 dark:text-white dark:border-slate-700 dark:bg-slate-900"
              placeholder="e.g. tnt_101"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Name</label>
            <input 
              name="c2"
              value={formData.c2}
              onChange={handleChange}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 dark:text-white dark:border-slate-700 dark:bg-slate-900"
              placeholder="e.g. Acme Corp"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Plan</label>
            <select 
              name="c3"
              value={formData.c3}
              onChange={handleChange}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 dark:text-white dark:border-slate-700 dark:bg-slate-900"
            >
              <option value="Startup">Startup</option>
              <option value="Pro">Pro</option>
              <option value="Enterprise">Enterprise</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">MRR</label>
            <input 
              name="c4"
              value={formData.c4}
              onChange={handleChange}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 dark:text-white dark:border-slate-700 dark:bg-slate-900"
              placeholder="e.g. $49"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Health</label>
            <select 
              name="c5"
              value={formData.c5}
              onChange={handleChange}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 dark:text-white dark:border-slate-700 dark:bg-slate-900"
            >
              <option value="Good">Good</option>
              <option value="Warning">Warning</option>
              <option value="Critical">Critical</option>
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
              <option value="Suspended">Suspended</option>
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
