import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { X, Bell } from 'lucide-react'

const initialNotifications = [
  { id: 1, type: 'System', title: 'System Update', time: '2h ago', message: 'Kiaan Core has been updated to version 2.0 with new enterprise features.', read: false },
  { id: 2, type: 'Billing', title: 'Invoice Generated', time: '5h ago', message: 'Invoice #INV-2024-001 has been generated for your recent subscription.', read: true },
  { id: 3, type: 'System', title: 'Security Alert', time: '1d ago', message: 'A new sign-in was detected from an unrecognized device.', read: false },
  { id: 4, type: 'Billing', title: 'Payment Failed', time: '2d ago', message: 'Your recent payment method was declined. Please update your billing info.', read: false },
]

export function NotificationDrawer({ open, setOpen }) {
  const [activeTab, setActiveTab] = useState('All')

  const filteredNotifications = initialNotifications.filter(n => {
    if (activeTab === 'All') return true
    if (activeTab === 'Unread') return !n.read
    return n.type === activeTab
  })

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col bg-white shadow-xl dark:bg-slate-950 dark:border-l dark:border-slate-800">
                    <div className="flex items-center justify-between px-4 py-6 sm:px-6">
                      <Dialog.Title className="text-lg font-semibold leading-6 text-slate-900 dark:text-white flex items-center">
                        <Bell className="mr-2 h-5 w-5" /> Notifications
                      </Dialog.Title>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          className="rounded-md bg-white text-slate-400 hover:text-slate-500 focus:outline-none dark:bg-slate-950 dark:hover:text-slate-300"
                          onClick={() => setOpen(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <X className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="border-b border-slate-200 px-4 sm:px-6 dark:border-slate-800">
                      <nav className="-mb-px flex space-x-6">
                        {['All', 'Unread', 'Billing', 'System'].map((tab) => (
                          <button
                            key={tab}
                            type="button"
                            onClick={() => setActiveTab(tab)}
                            className={`whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium transition-colors ${
                              activeTab === tab
                                ? 'border-primary text-primary'
                                : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700 dark:text-slate-400 dark:hover:border-slate-700 dark:hover:text-slate-300'
                            }`}
                          >
                            {tab}
                          </button>
                        ))}
                      </nav>
                    </div>

                    <div className="relative mt-6 flex-1 px-4 sm:px-6 overflow-y-auto">
                      {/* Placeholder for notification items */}
                      <div className="space-y-4 pb-8">
                        {filteredNotifications.length === 0 ? (
                          <div className="text-center py-8 text-slate-500 dark:text-slate-400 text-sm">
                            No {activeTab.toLowerCase()} notifications found.
                          </div>
                        ) : (
                          filteredNotifications.map((n) => (
                            <div key={n.id} className={`rounded-lg border p-4 transition-colors ${
                              n.read 
                                ? 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950/50' 
                                : 'border-primary/20 bg-primary/5 dark:border-primary/30 dark:bg-primary/10'
                            }`}>
                              <div className="flex justify-between items-start">
                                <h4 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center">
                                  {!n.read && <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>}
                                  {n.title}
                                </h4>
                                <span className="text-xs text-slate-500 whitespace-nowrap ml-2">{n.time}</span>
                              </div>
                              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                                {n.message}
                              </p>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
