import { Users, Building2, CreditCard, ActivitySquare, Database, Cpu, Send, DollarSign } from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { Link } from 'react-router-dom'
import { useDashboard } from '@/hooks/useDashboard'
import React, { useEffect } from 'react'

export function Dashboard() {
  const { data, loading, error, fetchAnalytics } = useDashboard();

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const s = data?.stats || {};
  const c = data?.chartData || [];

  const stats = [
    { name: 'Total Users', value: (s.totalUsers || 0).toLocaleString(), change: '+12% from last month', icon: Users, link: '/access/users' },
    { name: 'Active Users', value: (s.activeUsers || 0).toLocaleString(), change: `+${(s.totalUsers || 0) - (s.activeUsers || 0)} inactive`, icon: ActivitySquare, link: '/access/users' },
    { name: 'Total Companies', value: (s.totalCompanies || 0).toLocaleString(), change: '+5% from last month', icon: Building2, link: '/multitenant/tenants' },
    { name: 'Branches', value: (s.branches || 0).toLocaleString(), change: '+2% from last month', icon: Building2, link: '/organization/branches' },
    { name: 'Revenue', value: `$${(s.totalRevenue || 0).toLocaleString()}`, change: '+24% from last month', icon: DollarSign, link: '/subscription/billing' },
    { name: 'Active Plans', value: (s.activePlans || 0).toLocaleString(), change: '+6% from last month', icon: CreditCard, link: '/subscription/plans' },
    { name: 'Storage Usage', value: `${((s.storageUsageBytes || 0) / (1024 * 1024)).toFixed(1)} MB`, change: '+8% from last month', icon: Database, link: '/storage/files' },
    { name: 'API Requests', value: `${((s.apiRequests || 0) / 1000000).toFixed(1)}M`, change: '+14% from last month', icon: Send, link: '/api/keys' },
    { name: 'AI Usage (Tokens)', value: `${((s.aiUsageTokens || 0) / 1000000).toFixed(1)}M`, change: '+45% from last month', icon: Cpu, link: '/ai/providers' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Dashboard Overview</h1>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.name} to={stat.link} className="block group">
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950 transition-all hover:border-primary/50 hover:shadow-md dark:hover:border-primary/50 h-full">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 group-hover:text-primary transition-colors">{stat.name}</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                </div>
                <div className="rounded-full bg-primary/10 p-3 text-primary dark:bg-primary/20 group-hover:bg-primary group-hover:text-white transition-colors">
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="font-medium text-green-600 dark:text-green-400">{stat.change.split(' ')[0]}</span>
                <span className="ml-2 text-slate-500 dark:text-slate-400">{stat.change.split(' ').slice(1).join(' ')}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Revenue Growth</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={c} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#aa3bff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#aa3bff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#aa3bff" fillOpacity={1} fill="url(#colorTotal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">User Growth</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={c} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="users" fill="#aa3bff" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

