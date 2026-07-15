import React, { useState, useEffect } from 'react';
import { useRoles } from '@/hooks/useRoles';
import { Button } from '@/components/ui/Button';
import { Plus, Edit, Trash2, Shield } from 'lucide-react';
import { UniversalCRUDLayout } from '@/components/layout/UniversalCRUDLayout';
import { Drawer } from '@/components/ui/Drawer';
import { SkeletonTable } from '@/components/ui/LoadingSkeleton';

const inputCls = "block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-slate-900 dark:text-white dark:ring-slate-700";
const labelCls = "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1";

const statusColor = (s) => {
  if (s === 'Active') return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
  if (s === 'Inactive' || s === 'Suspended') return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
  return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
};

const emptyForm = { roleName: '', description: '', type: 'Custom', status: 'Active' };

export function RolesList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  const { roles, loading, fetchRoles, createRole, updateRole, deleteRole } = useRoles();

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  const handleOpenDrawer = (row = null) => {
    if (row) {
      setEditingId(row.id);
      setFormData({
        roleName: row.roleName || '',
        description: row.description || '',
        type: row.type || 'Custom',
        status: row.status || 'Active',
      });
    } else {
      setEditingId(null);
      setFormData(emptyForm);
    }
    setIsDrawerOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  const handleSave = async () => {
    try {
      const payload = {
        roleName: formData.roleName,
        description: formData.description,
        type: formData.type,
        status: formData.status,
      };
      if (editingId) {
        await updateRole(editingId, payload);
      } else {
        await createRole(payload);
      }
      setIsDrawerOpen(false);
    } catch (err) {
      alert(err.message || 'Failed to save role');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      try {
        await deleteRole(id);
      } catch (err) {
        alert(err.message || 'Failed to delete role');
      }
    }
  };

  const filtered = roles.filter(item =>
    (item.roleName || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && roles.length === 0) {
    return (
      <div className="p-6">
        <SkeletonTable rows={4} />
      </div>
    );
  }

  return (
    <>
      <UniversalCRUDLayout
        title="Roles"
        description="Create roles and assign permissions to them. Users are then assigned a Role."
        toolbarActions={
          <Button onClick={() => handleOpenDrawer()}>
            <Plus className="mr-2 h-4 w-4" /> Add Role
          </Button>
        }
        searchProps={{
          value: searchTerm,
          onChange: (e) => setSearchTerm(e.target.value),
          placeholder: 'Search roles...'
        }}
        hasData={filtered.length > 0}
        table={
          <table className="w-full whitespace-nowrap text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-900/50 dark:text-white text-slate-900">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Role Name</th>
                <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Type</th>
                <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Permissions</th>
                <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Users</th>
                <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Status</th>
                <th className="px-6 py-4 text-right font-semibold text-slate-900 dark:text-slate-200">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-transparent">
              {filtered.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-primary" />
                      <span className="font-semibold text-slate-900 dark:text-white">{row.roleName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      row.type === 'System' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
                    }`}>
                      {row.type || 'Custom'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{row.permissionsGranted || '0'} permissions</td>
                  <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{row.totalUsers || '0'} users</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor(row.status)}`}>
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
      </UniversalCRUDLayout>

      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title={editingId ? 'Edit Role' : 'Create Role'}>
        <div className="space-y-5 mt-4">
          {/* Role Name */}
          <div>
            <label className={labelCls}>Role Name</label>
            <input name="roleName" value={formData.roleName} onChange={handleChange} type="text" className={inputCls} placeholder="e.g. Manager, HR Admin..." />
          </div>

          {/* Description */}
          <div>
            <label className={labelCls}>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows={2} className={inputCls} placeholder="What does this role do?" />
          </div>

          {/* Type */}
          <div>
            <label className={labelCls}>Type</label>
            <select name="type" value={formData.type} onChange={handleChange} className={inputCls}>
              <option value="Custom">Custom</option>
              <option value="System">System</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className={labelCls}>Status</label>
            <select name="status" value={formData.status} onChange={handleChange} className={inputCls}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="pt-4 flex justify-end space-x-2 border-t dark:border-slate-700">
            <Button variant="outline" onClick={() => setIsDrawerOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save Role</Button>
          </div>
        </div>
      </Drawer>
    </>
  );
}
