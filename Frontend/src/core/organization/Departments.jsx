import React, { useState, useEffect } from 'react';
// API client removed
import { Button } from '@/components/ui/Button';
import { Plus, Edit, Trash2, Briefcase } from 'lucide-react';
import { UniversalCRUDLayout } from '@/components/layout/UniversalCRUDLayout';
import { Drawer } from '@/components/ui/Drawer';
import { StatCard } from '@/components/ui/StatCard';
import { useDepartments } from '@/hooks/useDepartments';
import { useTenants } from '@/hooks/useTenants';

const cls = "block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-primary sm:text-sm dark:bg-slate-900 dark:text-white dark:ring-slate-700";
const labelCls = "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1";

export function Departments() {
  const { departments, fetchDepartments, createDepartment, updateDepartment, deleteDepartment } = useDepartments();
  const { tenants, fetchTenants } = useTenants();

  const [searchTerm, setSearchTerm] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const emptyForm = { departmentName: '', tenantId: '', organization: '', headOfDepartment: '', employees: '', budget: '', status: 'Active' };
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    fetchDepartments();
    fetchTenants();
  }, [fetchDepartments, fetchTenants]);

  const handleOpenDrawer = (row = null) => {
    if (row) {
      setEditingId(row.id);
      setFormData(row);
    } else {
      setEditingId(null);
      setFormData(emptyForm);
    }
    setIsDrawerOpen(true);
  };

  const handleSave = async () => {
    try {
      const selectedTenant = tenants.find(t => t.id === formData.tenantId);
      const payload = {
        ...formData,
        organization: selectedTenant ? selectedTenant.organization : formData.organization
      };

      if (editingId) {
        await updateDepartment(editingId, payload);
      } else {
        await createDepartment(payload);
      }
      setIsDrawerOpen(false);
    } catch (error) {
      console.error("Failed to save department", error);
      alert("Failed to save department");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      try {
        await deleteDepartment(id);
      } catch (error) {
        console.error("Failed to delete department", error);
        alert("Failed to delete department");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const filteredData = departments.filter(item => 
    (item.departmentName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.organization || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    <UniversalCRUDLayout
      title="Departments"
      description="Manage departments within branches."
      toolbarActions={
        <Button onClick={() => handleOpenDrawer()}>
          <Plus className="mr-2 h-4 w-4" /> Add Department
        </Button>
      }
      searchProps={{
        value: searchTerm,
        onChange: (e) => setSearchTerm(e.target.value),
        placeholder: "Search department or branch..."
      }}
      hasData={filteredData.length > 0}
      table={
        <table className="w-full whitespace-nowrap text-left text-sm">
          <thead className="bg-slate-50 dark:bg-slate-900/50 dark:text-white text-slate-900">
            <tr>
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Department Name</th>
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Linked Tenant</th>
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Head of Department</th>
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Employees</th>
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Budget</th>
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Status</th>
              <th className="px-6 py-4 text-right font-semibold text-slate-900 dark:text-slate-200">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-transparent">
            {filteredData.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-primary" />
                    {row.departmentName}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {row.tenant?.organization || row.organization ? (
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                      {row.tenant?.organization || row.organization}
                    </span>
                  ) : <span className="text-slate-400">—</span>}
                </td>
                <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{row.headOfDepartment}</td>
                <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{row.employees}</td>
                <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{row.budget}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    row.status === 'Active' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                      : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                  }`}>
                    {row.status}
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
        <StatCard title="Total Departments" value={departments.length.toString()} icon="Briefcase" trend={`+${departments.filter(d => d.status === 'Active').length} active`} color="purple" />
        <StatCard title="Active Employees" value={departments.reduce((sum, d) => sum + (parseInt(d.employees) || 0), 0).toLocaleString()} icon="Users" trend={`in ${departments.length} depts`} color="green" />
        <StatCard title="Total Budget" value={departments.length > 0 ? departments.map(d => d.budget || '$0').join(', ') : '$0'} icon="DollarSign" trend={`across ${departments.length} depts`} color="blue" />
        <StatCard title="Avg Employees/Dept" value={departments.length > 0 ? (departments.reduce((sum, d) => sum + (parseInt(d.employees) || 0), 0) / departments.length).toFixed(1) : '0'} icon="BarChart3" trend={`${departments.filter(d => d.status !== 'Active').length} inactive`} color="orange" />
      </div>
    </UniversalCRUDLayout>

    <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title={editingId ? "Edit Department" : "Add Department"}>
      <div className="space-y-4 mt-4">
        <div>
          <label className={labelCls}>Department Name</label>
          <input name="departmentName" value={formData.departmentName} onChange={handleChange} type="text" className={cls} placeholder="e.g. Engineering, Sales..." />
        </div>
        
        <div>
          <label className={labelCls}>Linked Tenant <span className="text-xs text-slate-400 font-normal ml-2">(Parent Company)</span></label>
          <select name="tenantId" value={formData.tenantId} onChange={handleChange} className={cls}>
            <option value="">Select Tenant...</option>
            {tenants.map(t => (
              <option key={t.id} value={t.id}>{t.organization}</option>
            ))}
          </select>
          {tenants.length === 0 && <p className="text-xs text-amber-500 mt-1">⚠ No tenants found. Create a tenant first.</p>}
        </div>

        <div>
          <label className={labelCls}>Head of Department</label>
          <input name="headOfDepartment" value={formData.headOfDepartment} onChange={handleChange} type="text" className={cls} placeholder="Enter HOD Name..." />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Employees</label>
            <input name="employees" value={formData.employees} onChange={handleChange} type="number" className={cls} placeholder="0" />
          </div>
          <div>
            <label className={labelCls}>Budget</label>
            <input name="budget" value={formData.budget} onChange={handleChange} type="text" className={cls} placeholder="e.g. $100,000" />
          </div>
        </div>

        <div>
          <label className={labelCls}>Status</label>
          <select name="status" value={formData.status} onChange={handleChange} className={cls}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="pt-4 flex justify-end space-x-2 border-t dark:border-slate-700 mt-6">
          <Button variant="outline" onClick={() => setIsDrawerOpen(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>
    </Drawer>
    </>
  );
}
