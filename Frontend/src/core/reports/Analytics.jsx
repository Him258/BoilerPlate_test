import React, { useState } from 'react';
import { UniversalCRUDLayout } from '@/components/layout/UniversalCRUDLayout';
import { Drawer } from '@/components/ui/Drawer';
import { StatCard } from '@/components/ui/StatCard';
import { MockChart } from '@/components/ui/MockChart';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/ToastContext';

export function Analytics() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [timeRange, setTimeRange] = useState("30d");
  const { addToast } = useToast();
  return (
    <>
    <UniversalCRUDLayout
      title="Platform Analytics"
      description="High-level metrics and usage trends."
      toolbarActions={
        <select 
          value={timeRange}
          onChange={(e) => {
            setTimeRange(e.target.value);
            addToast(`Analytics data updated for: ${e.target.options[e.target.selectedIndex].text}`);
          }}
          className="h-9 rounded-md border border-slate-300 bg-white px-3 text-sm font-medium text-slate-700 shadow-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
        >
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="90d">Last 90 Days</option>
          <option value="1y">This Year</option>
          <option value="all">All Time</option>
        </select>
      }
      hasData={false}
      emptyState={<div className="p-8 text-center text-slate-500">All analytics loaded above.</div>}
    >
      {(() => {
        const analyticsData = {
          "7d": { mrr: "$12,400", churn: "1.2%", api: "250K", tokens: "120K", mrrTrend: "+2%", churnTrend: "-0.1%", apiTrend: "+5%", tokenTrend: "+1%" },
          "30d": { mrr: "$45,200", churn: "2.4%", api: "1.2M", tokens: "845K", mrrTrend: "+12.5%", churnTrend: "-0.5%", apiTrend: "+15%", tokenTrend: "+5.2%" },
          "90d": { mrr: "$130,500", churn: "3.1%", api: "3.5M", tokens: "2.5M", mrrTrend: "+8%", churnTrend: "-0.2%", apiTrend: "+10%", tokenTrend: "+4%" },
          "1y": { mrr: "$520,000", churn: "4.5%", api: "15M", tokens: "10M", mrrTrend: "+40%", churnTrend: "-1.5%", apiTrend: "+25%", tokenTrend: "+12%" },
          "all": { mrr: "$1.2M", churn: "5.2%", api: "45M", tokens: "32M", mrrTrend: "+150%", churnTrend: "-2.0%", apiTrend: "+50%", tokenTrend: "+30%" }
        };
        const currentData = analyticsData[timeRange];
        return (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <StatCard title={`MRR (${timeRange})`} value={currentData.mrr} icon="DollarSign" trend={currentData.mrrTrend} color="green" />
            <StatCard title={`Churn Rate (${timeRange})`} value={currentData.churn} icon="TrendingDown" trend={currentData.churnTrend} color="red" />
            <StatCard title={`API Requests (${timeRange})`} value={currentData.api} icon="Activity" trend={currentData.apiTrend} color="blue" />
            <StatCard title={`AI Tokens (${timeRange})`} value={currentData.tokens} icon="Cpu" trend={currentData.tokenTrend} color="purple" />
          </div>
        );
      })()}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">User Growth</h3>
          <MockChart type="area" color="#3b82f6" />
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">Revenue Trend</h3>
          <MockChart type="line" color="#10b981" />
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">Active Users</h3>
          <MockChart type="bar" color="#8b5cf6" />
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">Churn Analysis</h3>
          <MockChart type="line" color="#ef4444" />
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">API Usage (Requests)</h3>
          <MockChart type="bar" color="#f59e0b" />
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">AI Model Usage (Tokens)</h3>
          <MockChart type="area" color="#8b5cf6" />
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">Device Analytics</h3>
          <MockChart type="bar" color="#06b6d4" />
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">Browser Analytics</h3>
          <MockChart type="area" color="#ec4899" />
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">Country Analytics</h3>
          <MockChart type="line" color="#14b8a6" />
        </div>
      </div>
    </UniversalCRUDLayout>
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title="Add/Edit Platform Analytics">
        <div className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Name</label>
            <input type="text" className="mt-1 block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-slate-900 dark:text-white dark:ring-slate-700" placeholder="Enter name..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Description</label>
            <textarea className="mt-1 block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-slate-900 dark:text-white dark:ring-slate-700" rows="3" placeholder="Enter details..."></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Status</label>
            <select className="mt-1 block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-slate-900 dark:text-white dark:ring-slate-700">
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
          <div className="pt-4 flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsDrawerOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsDrawerOpen(false)}>Save Changes</Button>
          </div>
        </div>
      </Drawer>
    </>
  );
}
