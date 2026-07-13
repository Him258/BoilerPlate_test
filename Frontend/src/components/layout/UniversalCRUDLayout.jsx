import React, { useState } from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function UniversalCRUDLayout({
  title,
  description,
  toolbarActions,
  searchProps = { value: '', onChange: () => {} },
  filters,
  table,
  pagination,
  modals,
  emptyState,
  hasData = true,
  children
}) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-200 pb-4 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{title}</h1>
          {description && (
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {description}
            </p>
          )}
        </div>
        
        {/* Toolbar section */}
        <div className="flex space-x-3">
          {filters && (
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)} 
              className={showFilters ? 'bg-slate-100 dark:bg-slate-800' : ''}
            >
              <Filter className="mr-2 h-4 w-4" /> Filters
            </Button>
          )}
          {toolbarActions}
        </div>
      </div>

      {/* Top Content (Cards, Charts) */}
      {children && (
        <div className="mb-6">
          {children}
        </div>
      )}

      {/* Main content wrapper */}
      <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
        
        {/* Search section */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800 space-y-4 sm:space-y-0">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder={searchProps.placeholder || "Search..."}
              value={searchProps.value}
              onChange={searchProps.onChange}
              className="h-10 w-full rounded-md border border-slate-300 bg-white pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:border-slate-700 dark:bg-slate-900 dark:text-white text-slate-900"
            />
          </div>
        </div>

        {/* Filters section */}
        {showFilters && filters && (
          <div className="border-b border-slate-200 px-6 py-4 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white text-slate-900">
            {filters}
          </div>
        )}

        {/* Table / Content section */}
        {!hasData && emptyState ? (
          emptyState
        ) : (
          <div className="overflow-x-auto">
            {table}
          </div>
        )}
        
        {/* Pagination section */}
        {hasData && pagination && (
          <div className="border-t border-slate-200 px-6 py-4 dark:border-slate-800">
            {pagination}
          </div>
        )}
      </div>

      {/* Modals & Dialogs */}
      {modals}
    </div>
  );
}
