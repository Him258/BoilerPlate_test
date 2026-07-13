import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export function Drawer({ isOpen, onClose, title, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-lg transform transition-all ease-in-out duration-300">
        <div className="flex max-h-[85vh] flex-col overflow-hidden rounded-xl bg-white shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:text-white text-slate-900">
          
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 dark:text-white text-slate-900">
            <h2 className="text-lg font-semibold leading-6 text-slate-900 dark:text-white">
              {title}
            </h2>
            <div className="ml-3 flex h-7 items-center">
              <button
                type="button"
                className="rounded-md text-slate-400 hover:text-slate-500 focus:outline-none dark:hover:text-slate-300 transition-colors"
                onClick={onClose}
              >
                <span className="sr-only">Close panel</span>
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
          
          <div className="relative flex-1 overflow-y-auto px-6 py-6">
            {children}
          </div>

        </div>
      </div>
    </div>
  );
}
