import React, { useState, useEffect } from 'react';
// API client removed for UI-only mode
import { Button } from '@/components/ui/Button';
import { Plus, Edit, Trash2, Globe } from 'lucide-react';
import { UniversalCRUDLayout } from '@/components/layout/UniversalCRUDLayout';
import { Drawer } from '@/components/ui/Drawer';

const cls = "block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-primary sm:text-sm dark:bg-slate-900 dark:text-white dark:ring-slate-700";
const labelCls = "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1";

const statusColor = (s) => {
  if (s === 'Active' || s === 'Verified') return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
  if (s === 'Failed' || s === 'Inactive') return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
  return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
};

const emptyForm = { tenantId: '', domain: '', provider: '', sslStatus: 'Pending', status: 'Active' };

export function Domains() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [data, setData] = useState([
    { id: 1, tenantId: 1, domain: 'app.acme.com', provider: 'Cloudflare', sslStatus: 'Verified', status: 'Active' },
    { id: 2, tenantId: 2, domain: 'stark.industry.net', provider: 'AWS Route53', sslStatus: 'Verified', status: 'Active' }
  ]);
  const [tenants, setTenants] = useState([
    { id: 1, organization: 'Acme Corp' },
    { id: 2, organization: 'Stark Industries' }
  ]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  // fetch logic removed as we use local data

  // Helper: get tenant org name by id
  const getTenantName = (tenantId) => {
    const t = tenants.find(t => t.id === tenantId);
    return t ? t.organization : tenantId;
  };

  const handleOpenDrawer = (row = null) => {
    if (row) {
      setEditingId(row.id);
      setFormData({
        tenantId: row.tenantId || '',
        domain: row.endpointUrl || row.domain || '',
        provider: row.provider || '',
        sslStatus: row.sslStatus || 'Pending',
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

  const handleSave = () => {
    const payload = {
      tenantId: formData.tenantId ? parseInt(formData.tenantId) : null,
      domain: formData.domain,
      provider: formData.provider,
      sslStatus: formData.sslStatus,
      status: formData.status,
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
    (item.endpointUrl || item.domain || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (getTenantName(item.tenantId) || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <UniversalCRUDLayout
        title="Custom Domains"
        description="Assign custom domains to Tenants. Each Tenant can have its own branded URL."
        toolbarActions={
          <Button onClick={() => handleOpenDrawer()}>
            <Plus className="mr-2 h-4 w-4" /> Add Domain
          </Button>
        }
        searchProps={{
          value: searchTerm,
          onChange: (e) => setSearchTerm(e.target.value),
          placeholder: 'Search domain or tenant...'
        }}
        hasData={filtered.length > 0}
        table={
          <table className="w-full whitespace-nowrap text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-900/50 dark:text-white text-slate-900">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Domain</th>
                <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Tenant</th>
                <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Provider</th>
                <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">SSL</th>
                <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Status</th>
                <th className="px-6 py-4 text-right font-semibold text-slate-900 dark:text-slate-200">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-transparent">
              {filtered.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-primary" />
                      <span className="font-medium text-slate-900 dark:text-white">{row.endpointUrl || row.domain}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {row.tenantId ? (
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                        {getTenantName(row.tenantId)}
                      </span>
                    ) : <span className="text-slate-400 text-xs">—</span>}
                  </td>
                  <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{row.provider || '—'}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor(row.sslStatus)}`}>
                      {row.sslStatus || 'Pending'}
                    </span>
                  </td>
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

      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title={editingId ? 'Edit Domain' : 'Add Domain'}>
        <div className="space-y-5 mt-4">

          {/* Tenant — linked from Tenants */}
          <div>
            <label className={labelCls}>Tenant <span className="text-red-400">*</span></label>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Which organization does this domain belong to?</p>
            <select name="tenantId" value={formData.tenantId} onChange={handleChange} className={cls}>
              <option value="">Select Tenant...</option>
              {tenants.map(t => (
                <option key={t.id} value={t.id}>{t.organization}</option>
              ))}
            </select>
            {tenants.length === 0 && (
              <p className="text-xs text-amber-500 mt-1">⚠ No tenants found. Create tenants first from Multi Tenant → Tenants.</p>
            )}
          </div>

          {/* Domain URL */}
          <div>
            <label className={labelCls}>Domain URL <span className="text-red-400">*</span></label>
            <input name="domain" value={formData.domain} onChange={handleChange} type="text" className={cls} placeholder="e.g. app.acmecorp.com" />
          </div>

          {/* Provider */}
          <div>
            <label className={labelCls}>DNS Provider</label>
            <select name="provider" value={formData.provider} onChange={handleChange} className={cls}>
              <option value="">Select Provider...</option>
              <option value="Cloudflare">Cloudflare</option>
              <option value="AWS Route53">AWS Route53</option>
              <option value="GoDaddy">GoDaddy</option>
              <option value="Vercel">Vercel</option>
              <option value="Namecheap">Namecheap</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* SSL Status */}
          <div>
            <label className={labelCls}>SSL Status</label>
            <select name="sslStatus" value={formData.sslStatus} onChange={handleChange} className={cls}>
              <option value="Pending">Pending</option>
              <option value="Verified">Verified</option>
              <option value="Failed">Failed</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className={labelCls}>Status</label>
            <select name="status" value={formData.status} onChange={handleChange} className={cls}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="pt-4 flex justify-end space-x-2 border-t dark:border-slate-700">
            <Button variant="outline" onClick={() => setIsDrawerOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save Domain</Button>
          </div>
        </div>
      </Drawer>
    </>
  );
}
