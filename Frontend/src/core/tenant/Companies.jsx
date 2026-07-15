import React, { useState, useEffect } from 'react';
import { useTenants } from '@/hooks/useTenants';
import { Button } from '@/components/ui/Button';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { UniversalCRUDLayout } from '@/components/layout/UniversalCRUDLayout';
import { Drawer } from '@/components/ui/Drawer';
import { StatCard } from '@/components/ui/StatCard';
import { MockChart } from '@/components/ui/MockChart';
import { SkeletonTable } from '@/components/ui/LoadingSkeleton';

export function Companies() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ organization: '', plan: '', totalUsers: '', databaseSize: '', status: '' });

  const { tenants: data, loading, fetchTenants, createTenant, updateTenant, deleteTenant } = useTenants();

  useEffect(() => {
    fetchTenants();
  }, [fetchTenants]);

  const handleOpenDrawer = (row = null) => {
    if (row) {
      setEditingId(row.id);
      setFormData(row);
    } else {
      setEditingId(null);
      setFormData({ organization: '', plan: 'Free', totalUsers: '0', databaseSize: '0 GB', status: 'Active' });
    }
    setIsDrawerOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        await updateTenant(editingId, formData);
      } else {
        await createTenant(formData);
      }
      setIsDrawerOpen(false);
    } catch (err) {
      alert(err.message || 'Failed to save tenant');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this tenant?')) {
      try {
        await deleteTenant(id);
      } catch (err) {
        alert(err.message || 'Failed to delete tenant');
      }
    }
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

  if (loading && data.length === 0) {
    return (
      <div className="p-6">
        <SkeletonTable rows={4} />
      </div>
    );
  }

  return (
    <>
    <UniversalCRUDLayout
      title="Tenants"
      description="Manage all isolated tenants and organizations on the platform."
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
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Tenant ID</th>
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Tenant Name</th>
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Plan</th>
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Users</th>
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Database Size</th>
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Status</th>
              <th className="px-6 py-4 text-right font-semibold text-slate-900 dark:text-slate-200">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-transparent">
            {filteredData.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{row.id?.substring ? row.id.substring(0, 8) : row.id}</td>
                <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{row.organization}</td>
                <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{row.plan}</td>
                <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{row.totalUsers}</td>
                <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{row.databaseSize}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    row.status === 'Active' || row.status === 'Success' || row.status === 'Trusted' || row.status === 'Verified' || row.status === 'Paid' || row.status === 'System' || row.status === 'Published' || row.status === 'Enabled'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                      : row.status === 'Expired' || row.status === 'Failed' || row.status === 'Blocked' || row.status === 'Suspended' || row.status === 'Archived' || row.status === 'Disabled'
                      ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                  }`}>
                    {row.status || 'Active'}
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
        <StatCard title="Total Tenants" value={data.length.toString()} icon="Database" trend={`+${data.filter(t => t.status === 'Active').length}`} color="blue" />
        <StatCard title="Active Plans" value={data.filter(t => t.status === 'Active').length.toString()} icon="CreditCard" trend={`${data.filter(t => t.status === 'Suspended').length} suspended`} color="green" />
        <StatCard title="Enterprise Tenants" value={data.filter(t => t.plan === 'Enterprise').length.toString()} icon="Globe" trend={`${data.filter(t => t.plan === 'Pro').length} Pro`} color="purple" />
        <StatCard title="Total Users" value={data.reduce((sum, t) => sum + (parseInt(t.totalUsers) || 0), 0).toLocaleString()} icon="HardDrive" trend={`across ${data.length} tenants`} color="orange" />
      </div>
    </UniversalCRUDLayout>
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title={editingId ? "Edit Record" : "Add Record"}>
        <div className="space-y-4 mt-4">

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tenant Name</label>
            <input name="organization" value={formData.organization || ''} onChange={handleChange} type="text" className="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-slate-900 dark:text-white dark:ring-slate-700" placeholder="Enter Tenant Name..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Plan</label>
            <select name="plan" value={formData.plan || ''} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-slate-900 dark:text-white dark:ring-slate-700">
              <option value="">Select Plan...</option>
              <option value="Free">Free</option>
              <option value="Basic">Basic</option>
              <option value="Pro">Pro</option>
              <option value="Enterprise">Enterprise</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Users</label>
            <input name="totalUsers" value={formData.totalUsers || ''} onChange={handleChange} type="text" className="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-slate-900 dark:text-white dark:ring-slate-700" placeholder="Enter Users..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Database Size</label>
            <input name="databaseSize" value={formData.databaseSize || ''} onChange={handleChange} type="text" className="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-slate-900 dark:text-white dark:ring-slate-700" placeholder="Enter Database Size..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Status</label>
            <select name="status" value={formData.status || ''} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-slate-900 dark:text-white dark:ring-slate-700">
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
