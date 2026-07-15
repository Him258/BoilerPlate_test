import React, { useState, useEffect } from 'react';
// API client removed
import { Button } from '@/components/ui/Button';
import { Plus, Edit, Trash2, Users } from 'lucide-react';
import { UniversalCRUDLayout } from '@/components/layout/UniversalCRUDLayout';
import { Drawer } from '@/components/ui/Drawer';
import { StatCard } from '@/components/ui/StatCard';
import { useTeams } from '@/hooks/useTeams';
import { useDepartments } from '@/hooks/useDepartments';

const cls = "block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-primary sm:text-sm dark:bg-slate-900 dark:text-white dark:ring-slate-700";
const labelCls = "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1";

export function Teams() {
  const { teams, fetchTeams, createTeam, updateTeam, deleteTeam } = useTeams();
  const { departments, fetchDepartments } = useDepartments();

  const [searchTerm, setSearchTerm] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const emptyForm = { teamName: '', departmentId: '', tenantId: '', lead: '', members: '', velocity: '', status: 'Active' };
  
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    fetchTeams();
    fetchDepartments();
  }, [fetchTeams, fetchDepartments]);

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
      const selectedDept = departments.find(d => d.id === formData.departmentId);
      const payload = {
        ...formData,
        tenantId: selectedDept ? selectedDept.tenantId : formData.tenantId
      };

      if (editingId) {
        await updateTeam(editingId, payload);
      } else {
        await createTeam(payload);
      }
      setIsDrawerOpen(false);
    } catch (error) {
      console.error("Failed to save team", error);
      alert("Failed to save team");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this team?")) {
      try {
        await deleteTeam(id);
      } catch (error) {
        console.error("Failed to delete team", error);
        alert("Failed to delete team");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const filteredData = teams.filter(item => 
    (item.teamName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.department?.departmentName || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    <UniversalCRUDLayout
      title="Teams"
      description="Manage teams within departments."
      toolbarActions={
        <Button onClick={() => handleOpenDrawer()}>
          <Plus className="mr-2 h-4 w-4" /> Add Team
        </Button>
      }
      searchProps={{
        value: searchTerm,
        onChange: (e) => setSearchTerm(e.target.value),
        placeholder: "Search team or department..."
      }}
      hasData={filteredData.length > 0}
      table={
        <table className="w-full whitespace-nowrap text-left text-sm">
          <thead className="bg-slate-50 dark:bg-slate-900/50 dark:text-white text-slate-900">
            <tr>
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Team Name</th>
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Linked Department</th>
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Team Lead</th>
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Members</th>
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Velocity / Output</th>
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Status</th>
              <th className="px-6 py-4 text-right font-semibold text-slate-900 dark:text-slate-200">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-transparent">
            {filteredData.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    {row.teamName}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {row.department?.departmentName || row.departmentId ? (
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                      {row.department?.departmentName || row.departmentId}
                    </span>
                  ) : <span className="text-slate-400">—</span>}
                </td>
                <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{row.lead}</td>
                <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{row.members}</td>
                <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{row.velocity}</td>
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
        <StatCard title="Total Teams" value={teams.length.toString()} icon="Users" trend={`+${teams.filter(t => t.status === 'Active').length} active`} color="orange" />
        <StatCard title="Avg Members/Team" value={teams.length > 0 ? (teams.reduce((sum, t) => sum + (parseInt(t.members) || 0), 0) / teams.length).toFixed(1) : '0'} icon="ActivitySquare" trend={`across ${teams.length} teams`} color="blue" />
        <StatCard title="Total Members" value={teams.reduce((sum, t) => sum + (parseInt(t.members) || 0), 0).toString()} icon="TrendingUp" trend={`in ${teams.length} teams`} color="green" />
        <StatCard title="Active Teams" value={teams.filter(t => t.status === 'Active').length.toString()} icon="BarChart3" trend={`${teams.filter(t => t.status !== 'Active').length} inactive`} color="purple" />
      </div>
    </UniversalCRUDLayout>

    <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title={editingId ? "Edit Team" : "Add Team"}>
      <div className="space-y-4 mt-4">
        <div>
          <label className={labelCls}>Team Name</label>
          <input name="teamName" value={formData.teamName} onChange={handleChange} type="text" className={cls} placeholder="e.g. Frontend Squad, Apollo..." />
        </div>
        
        <div>
          <label className={labelCls}>Linked Department <span className="text-xs text-slate-400 font-normal ml-2">(Parent Department)</span></label>
          <select name="departmentId" value={formData.departmentId} onChange={handleChange} className={cls}>
            <option value="">Select Parent Department...</option>
            {departments.map(d => (
              <option key={d.id} value={d.id}>{d.departmentName}</option>
            ))}
          </select>
          {departments.length === 0 && <p className="text-xs text-amber-500 mt-1">⚠ No departments found. Create a department first.</p>}
        </div>

        <div>
          <label className={labelCls}>Team Lead</label>
          <input name="lead" value={formData.lead} onChange={handleChange} type="text" className={cls} placeholder="Enter Team Lead Name..." />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Total Members</label>
            <input name="members" value={formData.members} onChange={handleChange} type="number" className={cls} placeholder="0" />
          </div>
          <div>
            <label className={labelCls}>Velocity / Output</label>
            <input name="velocity" value={formData.velocity} onChange={handleChange} type="text" className={cls} placeholder="e.g. 45 Points/Sprint" />
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
