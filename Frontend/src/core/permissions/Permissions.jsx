import React, { useState, useEffect } from 'react';
// API client removed for UI-only mode
import { Button } from '@/components/ui/Button';
import { Plus, Edit, Trash2, Check, X, Shield } from 'lucide-react';
import { UniversalCRUDLayout } from '@/components/layout/UniversalCRUDLayout';
import { Drawer } from '@/components/ui/Drawer';

const MODULES = [
  'Dashboard', 'Users', 'Roles', 'Permissions', 'Organizations',
  'Branches', 'Departments', 'Teams', 'Tenants', 'Domains',
  'Branding', 'Plans', 'Features', 'Billing', 'Invoices',
  'Notifications', 'Storage', 'AI Platform', 'Workflows', 'API Keys',
  'Reports', 'Analytics', 'Settings', 'Audit Logs'
];

const ACTIONS = [
  { key: 'canView',    label: 'View' },
  { key: 'canCreate',  label: 'Create' },
  { key: 'canUpdate',  label: 'Update' },
  { key: 'canDelete',  label: 'Delete' },
  { key: 'canImport',  label: 'Import' },
  { key: 'canExport',  label: 'Export' },
  { key: 'canApprove', label: 'Approve' },
];

const emptyForm = {
  roleId: '',
  module: '',
  canView: false, canCreate: false, canUpdate: false,
  canDelete: false, canImport: false, canExport: false, canApprove: false
};

const toBool = (val) => val === true || val === 'true' || val === '✔️' || val === 'yes';

function PermBadge({ val }) {
  return toBool(val)
    ? <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30"><Check className="h-3.5 w-3.5 text-green-600 dark:text-green-400" /></span>
    : <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30"><X className="h-3.5 w-3.5 text-red-500 dark:text-red-400" /></span>;
}

const cls = "block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-primary sm:text-sm dark:bg-slate-900 dark:text-white dark:ring-slate-700";
const labelCls = "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1";

export function Permissions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [data, setData] = useState([
    { id: 1, roleId: 1, module: 'Users', canView: true, canCreate: true, canUpdate: true, canDelete: true, canImport: false, canExport: false, canApprove: false },
    { id: 2, roleId: 2, module: 'Dashboard', canView: true, canCreate: false, canUpdate: false, canDelete: false, canImport: false, canExport: false, canApprove: false }
  ]);
  const [roles, setRoles] = useState([
    { id: 1, roleName: 'Super Admin' },
    { id: 2, roleName: 'Sales Agent' }
  ]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  // fetch logic removed as we use local data

  // Helper: get role name by id
  const getRoleName = (roleId) => {
    const role = roles.find(r => r.id === roleId);
    return role ? role.roleName : roleId;
  };

  const handleOpenDrawer = (row = null) => {
    if (row) {
      setEditingId(row.id);
      setFormData({
        roleId: row.roleId || '',
        module: row.module || '',
        canView: toBool(row.canView),
        canCreate: toBool(row.canCreate),
        canUpdate: toBool(row.canUpdate),
        canDelete: toBool(row.canDelete),
        canImport: toBool(row.canImport),
        canExport: toBool(row.canExport),
        canApprove: toBool(row.canApprove),
      });
    } else {
      setEditingId(null);
      setFormData(emptyForm);
    }
    setIsDrawerOpen(true);
  };

  const handleToggle = (key) => {
    setFormData(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    const payload = {
      roleId: formData.roleId ? parseInt(formData.roleId) : null,
      module: formData.module,
      canView: formData.canView,
      canCreate: formData.canCreate,
      canUpdate: formData.canUpdate,
      canDelete: formData.canDelete,
      canImport: formData.canImport,
      canExport: formData.canExport,
      canApprove: formData.canApprove,
    };
    if (editingId) {
      setData(data.map(d => d.id === editingId ? { ...d, ...payload } : d));
    } else {
      setData([{ ...payload, id: Date.now() }, ...data]);
    }
    setIsDrawerOpen(false);
  };

  const handleDelete = (id) => {
    setData(data.filter(d => d.id !== id));
  };

  const filtered = data.filter(item =>
    (item.module || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (getRoleName(item.roleId) || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <UniversalCRUDLayout
        title="Permission Matrix"
        description="Define which actions each Role can perform on each Module."
        toolbarActions={
          <Button onClick={() => handleOpenDrawer()}>
            <Plus className="mr-2 h-4 w-4" /> Add Permission
          </Button>
        }
        searchProps={{
          value: searchTerm,
          onChange: (e) => setSearchTerm(e.target.value),
          placeholder: 'Search role or module...'
        }}
        hasData={filtered.length > 0}
        table={
          <table className="w-full whitespace-nowrap text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-900/50 dark:text-white text-slate-900">
              <tr>
                {/* Role column first */}
                <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Role</th>
                <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Module</th>
                {ACTIONS.map(a => (
                  <th key={a.key} className="px-4 py-4 font-semibold text-center text-slate-900 dark:text-slate-200">{a.label}</th>
                ))}
                <th className="px-6 py-4 text-right font-semibold text-slate-900 dark:text-slate-200">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-transparent">
              {filtered.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  {/* Role badge */}
                  <td className="px-6 py-4">
                    {row.roleId ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                        <Shield className="h-3 w-3" />
                        {getRoleName(row.roleId)}
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400 italic">All Roles</span>
                    )}
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">{row.module}</td>
                  {ACTIONS.map(a => (
                    <td key={a.key} className="px-4 py-4 text-center">
                      <PermBadge val={row[a.key]} />
                    </td>
                  ))}
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

      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title={editingId ? 'Edit Permission' : 'Add Permission'}>
        <div className="space-y-5 mt-4">

          {/* Role — linked from Roles list */}
          <div>
            <label className={labelCls}>Role <span className="text-red-400">*</span></label>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Which role does this permission apply to?</p>
            <select
              value={formData.roleId}
              onChange={(e) => setFormData(prev => ({ ...prev, roleId: e.target.value }))}
              className={cls}
            >
              <option value="">Select Role...</option>
              {roles.map(r => (
                <option key={r.id} value={r.id}>{r.roleName}</option>
              ))}
            </select>
            {roles.length === 0 && (
              <p className="text-xs text-amber-500 mt-1">⚠ No roles found. Create roles first from Access Control → Roles.</p>
            )}
          </div>

          {/* Module */}
          <div>
            <label className={labelCls}>Module <span className="text-red-400">*</span></label>
            <select
              value={formData.module}
              onChange={(e) => setFormData(prev => ({ ...prev, module: e.target.value }))}
              className={cls}
            >
              <option value="">Select Module...</option>
              {MODULES.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          {/* Permission Toggles */}
          <div>
            <label className={`${labelCls} mb-3`}>Allowed Actions</label>
            <div className="space-y-3">
              {ACTIONS.map(a => (
                <label key={a.key} className="flex items-center justify-between cursor-pointer group">
                  <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">{a.label}</span>
                  <button
                    type="button"
                    onClick={() => handleToggle(a.key)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                      formData[a.key] ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                      formData[a.key] ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </label>
              ))}
            </div>
          </div>

          <div className="pt-4 flex justify-end space-x-2 border-t dark:border-slate-700">
            <Button variant="outline" onClick={() => setIsDrawerOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save Permission</Button>
          </div>
        </div>
      </Drawer>
    </>
  );
}
