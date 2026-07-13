import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { UniversalCRUDLayout } from '@/components/layout/UniversalCRUDLayout';
import { StatCard } from '@/components/ui/StatCard';
import { Modal } from '@/components/ui/Modal';

export function ScheduledReports() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const [reports, setReports] = useState([
    { id: 1, c1: "Weekly Revenue Summary", c2: "Financial", c3: "Every Monday 9AM", c4: "finance@acme.com", c5: "Yesterday", c6: "Active" },
    { id: 2, c1: "Daily User Signups", c2: "Growth", c3: "Every Day 12AM", c4: "marketing@acme.com", c5: "Today", c6: "Active" },
    { id: 3, c1: "Monthly System Uptime", c2: "IT", c3: "1st of Month", c4: "it@acme.com", c5: "May 1", c6: "Active" },
    { id: 4, c1: "Quarterly Churn", c2: "Retention", c3: "Start of Quarter", c4: "execs@acme.com", c5: "Apr 1", c6: "Active" },
    { id: 5, c1: "Daily Error Logs", c2: "Engineering", c3: "Every Day 1AM", c4: "devs@acme.com", c5: "Today", c6: "Active" },
    { id: 6, c1: "Weekly Support Tickets", c2: "Support", c3: "Every Friday 5PM", c4: "support@acme.com", c5: "Last Friday", c6: "Active" },
    { id: 7, c1: "Old Inactive Users", c2: "Growth", c3: "Every Month", c4: "growth@acme.com", c5: "Never", c6: "Paused" },
    { id: 8, c1: "API Usage Stats", c2: "Engineering", c3: "Every Sunday 11PM", c4: "api@acme.com", c5: "Last Sunday", c6: "Active" }
  ]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReport, setEditingReport] = useState(null);
  
  const [formData, setFormData] = useState({
    c1: '', c2: '', c3: '', c4: '', c6: 'Active'
  });

  const handleOpenModal = (report = null) => {
    if (report) {
      setEditingReport(report);
      setFormData(report);
    } else {
      setEditingReport(null);
      setFormData({ c1: '', c2: '', c3: '', c4: '', c6: 'Active' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingReport(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (editingReport) {
      setReports(reports.map(r => r.id === editingReport.id ? { ...formData, id: r.id, c5: r.c5 } : r));
    } else {
      setReports([...reports, { ...formData, id: Date.now(), c5: 'Never' }]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    setReports(reports.filter(r => r.id !== id));
  };

  const filteredData = reports.filter(item => 
    Object.values(item).some(val => 
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <UniversalCRUDLayout
      title="Scheduled Reports"
      description="Automated report generation and delivery."
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
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Report Name</th>
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Type</th>
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Schedule</th>
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Recipients</th>
              <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">Last Run</th>
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
        <StatCard title="Total Reports" value={reports.length.toString()} icon="FileText" trend={`+${reports.filter(r => r.c6 === 'Active').length} active`} color="blue" />
        <StatCard title="Delivered" value={reports.filter(r => r.c5 !== 'Never').length.toString()} icon="Send" trend="recently" color="green" />
        <StatCard title="Failed Deliveries" value={reports.filter(r => r.c6 === 'Failed').length.toString()} icon="AlertTriangle" trend="needs review" color="red" />
        <StatCard title="Paused Reports" value={reports.filter(r => r.c6 === 'Paused').length.toString()} icon="Save" trend="inactive" color="purple" />
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingReport ? "Edit Report" : "Add New Report"}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Report Name</label>
            <input 
              name="c1"
              value={formData.c1}
              onChange={handleChange}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 dark:text-white dark:border-slate-700 dark:bg-slate-900"
              placeholder="e.g. Weekly Revenue Summary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Type</label>
            <input 
              name="c2"
              value={formData.c2}
              onChange={handleChange}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 dark:text-white dark:border-slate-700 dark:bg-slate-900"
              placeholder="e.g. Financial"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Schedule</label>
            <input 
              name="c3"
              value={formData.c3}
              onChange={handleChange}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 dark:text-white dark:border-slate-700 dark:bg-slate-900"
              placeholder="e.g. Every Monday 9AM"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Recipients</label>
            <input 
              name="c4"
              value={formData.c4}
              onChange={handleChange}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 dark:text-white dark:border-slate-700 dark:bg-slate-900"
              placeholder="e.g. email@example.com"
            />
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
              <option value="Paused">Paused</option>
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
