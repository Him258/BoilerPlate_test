import React, { useState, useEffect } from 'react';
import { useUsers } from '@/hooks/useUsers';
import { useRoles } from '@/hooks/useRoles';
import { useTenants } from '@/hooks/useTenants';
import { Button } from '@/components/ui/Button';
import { Plus, Edit, Trash2, User } from 'lucide-react';
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

const emptyForm = { name: '', email: '', roleId: '', tenantId: '', status: 'Active' };

export function UsersList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  const { users, loading, fetchUsers, createUser, updateUser, deleteUser } = useUsers();
  const { roles, fetchRoles } = useRoles();
  const { tenants, fetchTenants } = useTenants();

  useEffect(() => {
    fetchUsers();
    fetchRoles();
    fetchTenants();
  }, [fetchUsers, fetchRoles, fetchTenants]);

  const handleOpenDrawer = (row = null) => {
    if (row) {
      setEditingId(row.id);
      setFormData({
        name: row.name || '',
        email: row.email || '',
        roleId: row.roleId || row.role?.id || '',
        tenantId: row.tenantId || row.tenant?.id || '',
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
      // Create a payload. Role and Tenant might need to be integers.
      const payload = {
        ...formData,
        roleId: formData.roleId || null,
        tenantId: formData.tenantId || null,
      };

      if (editingId) {
        await updateUser(editingId, payload);
      } else {
        await createUser(payload);
      }
      setIsDrawerOpen(false);
    } catch (err) {
      alert(err.message || 'Failed to save user');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id);
      } catch (err) {
        alert(err.message || 'Failed to delete user');
      }
    }
  };

  const filtered = users.filter(item => {
    const roleName = item.role?.roleName || roles.find(r => r.id === item.roleId)?.roleName || '';
    const tenantName = item.tenant?.organization || tenants.find(t => t.id === item.tenantId)?.organization || '';
    return [(item.name || ''), (item.email || ''), roleName, tenantName]
      .some(v => v.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  if (loading && users.length === 0) {
    return (
      <div className="p-6">
        <SkeletonTable rows={4} />
      </div>
    );
  }

  return (
    <>
      <UniversalCRUDLayout
        title="Users"
        description="Invite and manage platform users. Assign a Role to control their access."
        toolbarActions={
          <Button onClick={() => handleOpenDrawer()}>
            <Plus className="mr-2 h-4 w-4" /> Invite User
          </Button>
        }
        searchProps={{
          value: searchTerm,
          onChange: (e) => setSearchTerm(e.target.value),
          placeholder: 'Search users...'
        }}
        hasData={filtered.length > 0}
        table={
          <table className="w-full whitespace-nowrap text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-900/50 dark:text-white text-slate-900">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Name</th>
                <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Email</th>
                <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Role</th>
                <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Organization</th>
                <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Status</th>
                <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Last Login</th>
                <th className="px-6 py-4 text-right font-semibold text-slate-900 dark:text-slate-200">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-transparent">
              {filtered.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <span className="font-medium text-slate-900 dark:text-white">{row.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{row.email}</td>
                  <td className="px-6 py-4">
                    {(() => {
                      const roleName = row.role?.roleName || roles.find(r => r.id === row.roleId)?.roleName;
                      return roleName ? (
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                          {roleName}
                        </span>
                      ) : <span className="text-slate-400 text-xs">No role</span>;
                    })()}
                  </td>
                  <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                    {row.tenant?.organization || tenants.find(t => t.id === row.tenantId)?.organization || '—'}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor(row.status)}`}>
                      {row.status || 'Active'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500 dark:text-slate-400 text-xs">{row.lastLogin || 'Never'}</td>
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

      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title={editingId ? 'Edit User' : 'Invite User'}>
        <div className="space-y-5 mt-4">
          {/* Name */}
          <div>
            <label className={labelCls}>Full Name</label>
            <input name="name" value={formData.name} onChange={handleChange} type="text" className={inputCls} placeholder="e.g. Rahul Sharma" />
          </div>

          {/* Email */}
          <div>
            <label className={labelCls}>Email Address</label>
            <input name="email" value={formData.email} onChange={handleChange} type="email" className={inputCls} placeholder="user@example.com" />
          </div>

          {/* Role — from Roles list */}
          <div>
            <label className={labelCls}>Assign Role</label>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Role determines what this user can see and do</p>
            <select name="roleId" value={formData.roleId} onChange={handleChange} className={inputCls}>
              <option value="">Select Role...</option>
              {roles.map(r => (
                <option key={r.id} value={r.id}>{r.roleName}</option>
              ))}
            </select>
            {roles.length === 0 && (
              <p className="text-xs text-amber-500 mt-1">⚠ No roles found. Create roles first from Access Control → Roles.</p>
            )}
          </div>

          {/* Organization — from Tenants list */}
          <div>
            <label className={labelCls}>Organization</label>
            <select name="tenantId" value={formData.tenantId} onChange={handleChange} className={inputCls}>
              <option value="">Select Organization...</option>
              {tenants.map(org => (
                <option key={org.id} value={org.id}>{org.organization}</option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <label className={labelCls}>Status</label>
            <select name="status" value={formData.status} onChange={handleChange} className={inputCls}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>

          <div className="pt-4 flex justify-end space-x-2 border-t dark:border-slate-700">
            <Button variant="outline" onClick={() => setIsDrawerOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>{editingId ? 'Save Changes' : 'Invite User'}</Button>
          </div>
        </div>
      </Drawer>
    </>
  );
}
