import React, { useState, useEffect } from 'react';
import { useTenants } from '@/hooks/useTenants';
import { useBrandings } from '@/hooks/useBrandings';
import { Button } from '@/components/ui/Button';
import { Plus, Edit, Trash2, Palette } from 'lucide-react';
import { UniversalCRUDLayout } from '@/components/layout/UniversalCRUDLayout';
import { Drawer } from '@/components/ui/Drawer';

const cls = "block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-primary sm:text-sm dark:bg-slate-900 dark:text-white dark:ring-slate-700";
const labelCls = "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1";

const statusColor = (s) => {
  if (s === 'Active' || s === 'Published' || s === 'Enabled') return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
  if (s === 'Draft') return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
  return 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400';
};

const emptyForm = { tenantId: '', primaryColor: '#6366F1', font: 'Inter', logoUrl: '', customCss: '', status: 'Active' };

export function Branding() {
  const { tenants, fetchTenants } = useTenants();
  const { brandings, fetchBrandings, createBranding, updateBranding, deleteBranding } = useBrandings();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    fetchTenants();
    fetchBrandings();
  }, [fetchTenants, fetchBrandings]);

  const getTenantName = (tenantId) => {
    const t = tenants.find(t => t.id === tenantId);
    return t ? t.organization : tenantId;
  };

  const handleOpenDrawer = (row = null) => {
    if (row) {
      setEditingId(row.id);
      setFormData({
        tenantId: row.tenantId || '',
        primaryColor: row.primaryColor || '#6366F1',
        font: row.font || 'Inter',
        logoUrl: row.logoUrl || '',
        customCss: row.customCss || '',
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
        tenantId: formData.tenantId,
        tenantName: getTenantName(formData.tenantId),
        primaryColor: formData.primaryColor,
        font: formData.font,
        logoUrl: formData.logoUrl,
        customCss: formData.customCss,
        status: formData.status,
      };

      if (editingId) {
        await updateBranding(editingId, payload);
      } else {
        await createBranding(payload);
      }
      setIsDrawerOpen(false);
    } catch (error) {
      console.error("Failed to save branding", error);
      const errMsg = error.response?.data?.error?.message || error.message || "Failed to save branding";
      alert("Error saving branding: " + errMsg);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this branding?")) {
      try {
        await deleteBranding(id);
      } catch (error) {
        console.error("Failed to delete branding", error);
        alert("Failed to delete branding");
      }
    }
  };

  const filtered = brandings.filter(item =>
    (item.tenantName || item.tenantId || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <UniversalCRUDLayout
        title="Tenant Branding"
        description="Customize the look and feel for each Tenant — colors, fonts, logos."
        toolbarActions={
          <Button onClick={() => handleOpenDrawer()}>
            <Plus className="mr-2 h-4 w-4" /> Add Branding
          </Button>
        }
        searchProps={{
          value: searchTerm,
          onChange: (e) => setSearchTerm(e.target.value),
          placeholder: 'Search tenant...'
        }}
        hasData={filtered.length > 0}
        table={
          <table className="w-full whitespace-nowrap text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-900/50 dark:text-white text-slate-900">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Tenant</th>
                <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Primary Color</th>
                <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Font</th>
                <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Logo</th>
                <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Status</th>
                <th className="px-6 py-4 text-right font-semibold text-slate-900 dark:text-slate-200">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-transparent">
              {filtered.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Palette className="h-4 w-4 text-primary" />
                      <span className="font-medium text-slate-900 dark:text-white">
                        {getTenantName(row.tenantId) || row.tenantName || '—'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-block h-5 w-5 rounded-full border border-slate-200"
                        style={{ backgroundColor: row.primaryColor || '#6366F1' }}
                      />
                      <span className="text-slate-500 dark:text-slate-400 font-mono text-xs">{row.primaryColor || '—'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{row.font || '—'}</td>
                  <td className="px-6 py-4 text-slate-500 dark:text-slate-400 text-xs truncate max-w-[150px]">
                    {row.logoUrl ? (
                      <a href={row.logoUrl} target="_blank" rel="noreferrer" className="text-primary hover:underline">{row.logoUrl}</a>
                    ) : '—'}
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

      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title={editingId ? 'Edit Branding' : 'Add Branding'}>
        <div className="space-y-5 mt-4">

          {/* Tenant — linked from Tenants */}
          <div>
            <label className={labelCls}>Tenant <span className="text-red-400">*</span></label>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Which organization's branding are you setting?</p>
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

          {/* Primary Color */}
          <div>
            <label className={labelCls}>Primary Color</label>
            <div className="flex items-center gap-3">
              <input
                name="primaryColor"
                value={formData.primaryColor}
                onChange={handleChange}
                type="color"
                className="h-9 w-16 rounded-md border border-slate-300 cursor-pointer"
              />
              <input
                name="primaryColor"
                value={formData.primaryColor}
                onChange={handleChange}
                type="text"
                className={cls}
                placeholder="#6366F1"
              />
            </div>
          </div>

          {/* Font */}
          <div>
            <label className={labelCls}>Font Family</label>
            <select name="font" value={formData.font} onChange={handleChange} className={cls}>
              <option value="Inter">Inter</option>
              <option value="Roboto">Roboto</option>
              <option value="Outfit">Outfit</option>
              <option value="Poppins">Poppins</option>
              <option value="DM Sans">DM Sans</option>
              <option value="Nunito">Nunito</option>
              <option value="Open Sans">Open Sans</option>
            </select>
          </div>

          {/* Logo URL */}
          <div>
            <label className={labelCls}>Logo URL</label>
            <input name="logoUrl" value={formData.logoUrl} onChange={handleChange} type="text" className={cls} placeholder="https://example.com/logo.png" />
          </div>

          {/* Custom CSS */}
          <div>
            <label className={labelCls}>Custom CSS <span className="text-xs text-slate-400">(optional)</span></label>
            <textarea name="customCss" value={formData.customCss} onChange={handleChange} rows={3} className={cls} placeholder=":root { --primary: #6366F1; }" />
          </div>

          {/* Status */}
          <div>
            <label className={labelCls}>Status</label>
            <select name="status" value={formData.status} onChange={handleChange} className={cls}>
              <option value="Active">Active</option>
              <option value="Draft">Draft</option>
              <option value="Disabled">Disabled</option>
            </select>
          </div>

          <div className="pt-4 flex justify-end space-x-2 border-t dark:border-slate-700">
            <Button variant="outline" onClick={() => setIsDrawerOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save Branding</Button>
          </div>
        </div>
      </Drawer>
    </>
  );
}
