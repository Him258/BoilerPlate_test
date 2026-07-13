import React from 'react';
import * as LucideIcons from 'lucide-react';

export function StatCard({ title, value, icon, trend, trendLabel, color = "primary" }) {
  const IconComponent = LucideIcons[icon] || LucideIcons.Activity;

  const colorMap = {
    primary: "text-primary bg-primary/10",
    blue: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30",
    green: "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-900/30",
    red: "text-rose-600 bg-rose-100 dark:text-rose-400 dark:bg-rose-900/30",
    orange: "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-900/30",
    purple: "text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/30"
  };

  const isPositive = trend && trend.startsWith('+');
  const isNegative = trend && trend.startsWith('-');

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950 flex flex-col justify-between hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
        <div className={`p-2 rounded-lg ${colorMap[color] || colorMap.primary}`}>
          <IconComponent className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{value}</h3>
        {trend && (
          <div className="mt-2 flex items-center text-sm">
            <span className={`font-medium ${isPositive ? 'text-emerald-600 dark:text-emerald-400' : isNegative ? 'text-rose-600 dark:text-rose-400' : 'text-slate-500'}`}>
              {trend}
            </span>
            {trendLabel && (
              <span className="ml-2 text-slate-500 dark:text-slate-400">{trendLabel}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
