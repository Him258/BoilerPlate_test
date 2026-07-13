import { useState } from "react"
import { User, Mail, CreditCard, Palette, Shield, MessageCircle } from "lucide-react"

const tabs = [
  { id: 'general', name: 'General', icon: User },
  { id: 'email', name: 'Email & Notifications', icon: Mail },
  { id: 'whatsapp', name: 'WhatsApp Settings', icon: MessageCircle },
  { id: 'payment', name: 'Payment Gateways', icon: CreditCard },
  { id: 'theme', name: 'Theme & Branding', icon: Palette },
  { id: 'security', name: 'Security', icon: Shield },
]

export function SettingsLayout() {
  const [activeTab, setActiveTab] = useState('general')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Settings</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-1/4">
          <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 overflow-x-auto pb-4 lg:pb-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  group flex items-center rounded-md px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors
                  ${activeTab === tab.id
                    ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-white'
                  }
                `}
              >
                <tab.icon
                  className={`mr-3 h-5 w-5 flex-shrink-0 transition-colors
                    ${activeTab === tab.id ? 'text-primary' : 'text-slate-400 group-hover:text-slate-500 dark:group-hover:text-slate-300'}
                  `}
                  aria-hidden="true"
                />
                {tab.name}
              </button>
            ))}
          </nav>
        </aside>

        <div className="lg:w-3/4">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950 min-h-[400px]">
            {activeTab === 'general' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-slate-900 dark:text-white">General Profile</h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Update your basic profile information.</p>
                </div>
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-slate-900 dark:text-slate-300">First name</label>
                    <div className="mt-2">
                      <input type="text" name="first-name" id="first-name" className="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-slate-900 dark:text-white dark:ring-slate-700" />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-slate-900 dark:text-slate-300">Last name</label>
                    <div className="mt-2">
                      <input type="text" name="last-name" id="last-name" className="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-slate-900 dark:text-white dark:ring-slate-700" />
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                  <button type="button" className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                    Save Changes
                  </button>
                </div>
              </div>
            )}
            
            {activeTab === 'email' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-slate-900 dark:text-white">Email Settings</h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Configure SMTP and email notification preferences.</p>
                </div>
                <div className="rounded-md bg-blue-50 p-4 dark:bg-blue-900/20">
                  <div className="flex">
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">SMTP Not Configured</h3>
                      <div className="mt-2 text-sm text-blue-700 dark:text-blue-400">
                        <p>Please enter your SendGrid or AWS SES credentials to enable outbound emails.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'whatsapp' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-slate-900 dark:text-white">WhatsApp Integration</h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Configure WhatsApp Cloud API for sending messages to customers.</p>
                </div>
                
                <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                  <div className="grid grid-cols-1 gap-y-6 max-w-lg">
                    <div>
                      <label className="block text-sm font-medium leading-6 text-slate-700 dark:text-slate-300">WhatsApp Business Account ID</label>
                      <input type="text" placeholder="e.g. 10423456789" className="mt-1 block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-slate-900 dark:text-white dark:ring-slate-700" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium leading-6 text-slate-700 dark:text-slate-300">Phone Number ID</label>
                      <input type="text" placeholder="e.g. 1023456789" className="mt-1 block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-slate-900 dark:text-white dark:ring-slate-700" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium leading-6 text-slate-700 dark:text-slate-300">Access Token (API Key)</label>
                      <input type="password" placeholder="EAAD..." className="mt-1 block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-slate-900 dark:text-white dark:ring-slate-700" />
                    </div>
                  </div>
                  
                  <div className="mt-6 flex items-center justify-between max-w-lg p-4 rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white text-slate-900">
                    <div>
                      <h4 className="text-sm font-medium text-slate-900 dark:text-white">Enable Automated Notifications</h4>
                      <p className="text-xs text-slate-500 mt-1">Send automatic WhatsApp alerts for invoices and deal updates.</p>
                    </div>
                    <button type="button" className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-slate-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:bg-slate-700" role="switch" aria-checked="false">
                      <span aria-hidden="true" className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out translate-x-0"></span>
                    </button>
                  </div>
                  
                  <div className="mt-6">
                    <button type="button" className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90">
                      Save WhatsApp Settings
                    </button>
                  </div>
                </div>
              </div>
            )}


            {activeTab === 'payment' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-slate-900 dark:text-white">Payment Integrations</h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Connect Stripe or Razorpay to accept payments.</p>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="relative flex items-center space-x-3 rounded-lg border border-slate-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-500 dark:text-white text-slate-900">
                    <div className="min-w-0 flex-1">
                      <span className="absolute inset-0" aria-hidden="true" />
                      <p className="text-sm font-medium text-slate-900 dark:text-white">Stripe</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Status: Disconnected</p>
                    </div>
                  </div>
                  <div className="relative flex items-center space-x-3 rounded-lg border border-slate-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-500 dark:text-white text-slate-900">
                    <div className="min-w-0 flex-1">
                      <span className="absolute inset-0" aria-hidden="true" />
                      <p className="text-sm font-medium text-slate-900 dark:text-white">Razorpay</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Status: Disconnected</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'theme' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-slate-900 dark:text-white">Branding</h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Customize the look and feel of your tenant.</p>
                </div>
                
                {/* Logo Upload */}
                <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                  <h4 className="text-md font-medium text-slate-900 dark:text-white mb-4">Company Logo</h4>
                  <div className="flex items-center space-x-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 dark:text-white text-slate-900">
                      <span className="text-xs text-slate-400">Upload</span>
                    </div>
                    <div>
                      <button type="button" className="rounded-md bg-white dark:bg-slate-800 px-3 py-2 text-sm font-semibold text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700">
                        Change Logo
                      </button>
                      <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">PNG, JPG, SVG up to 2MB.</p>
                    </div>
                  </div>
                </div>

                {/* Theme Colors */}
                <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                  <h4 className="text-md font-medium text-slate-900 dark:text-white mb-4">Primary Color</h4>
                  <div className="flex items-center space-x-3">
                    <button className="h-8 w-8 rounded-full bg-indigo-600 ring-2 ring-indigo-600 ring-offset-2 dark:ring-offset-slate-950"></button>
                    <button className="h-8 w-8 rounded-full bg-blue-600 border border-slate-200 dark:border-slate-700"></button>
                    <button className="h-8 w-8 rounded-full bg-emerald-600 border border-slate-200 dark:border-slate-700"></button>
                    <button className="h-8 w-8 rounded-full bg-rose-600 border border-slate-200 dark:border-slate-700"></button>
                    <button className="h-8 w-8 rounded-full bg-amber-500 border border-slate-200 dark:border-slate-700"></button>
                    <button className="h-8 w-8 rounded-full bg-slate-900 border border-slate-200 dark:border-slate-700 dark:bg-slate-200"></button>
                  </div>
                  <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">Select the primary color for buttons and highlights.</p>
                </div>

                {/* Appearance Mode */}
                <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                  <h4 className="text-md font-medium text-slate-900 dark:text-white mb-4">Appearance</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="cursor-pointer rounded-lg border-2 border-primary bg-white p-4 shadow-sm dark:bg-slate-900 dark:text-white text-slate-900">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-slate-900 dark:text-white">System</p>
                        <div className="h-4 w-4 rounded-full border-4 border-primary bg-white"></div>
                      </div>
                    </div>
                    <div className="cursor-pointer rounded-lg border border-slate-200 bg-white p-4 shadow-sm hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 dark:text-white text-slate-900">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-slate-900 dark:text-white">Light</p>
                        <div className="h-4 w-4 rounded-full border border-slate-300 dark:border-slate-600"></div>
                      </div>
                    </div>
                    <div className="cursor-pointer rounded-lg border border-slate-200 bg-slate-900 p-4 shadow-sm hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-white">Dark</p>
                        <div className="h-4 w-4 rounded-full border border-slate-600"></div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-slate-900 dark:text-white">Security</h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Manage 2FA and active sessions.</p>
                </div>
                
                {/* Change Password */}
                <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                  <h4 className="text-md font-medium text-slate-900 dark:text-white mb-4">Change Password</h4>
                  <div className="grid grid-cols-1 gap-y-4 max-w-md">
                    <div>
                      <label className="block text-sm font-medium leading-6 text-slate-700 dark:text-slate-300">Current Password</label>
                      <input type="password" placeholder="••••••••" className="mt-1 block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-slate-900 dark:text-white dark:ring-slate-700" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium leading-6 text-slate-700 dark:text-slate-300">New Password</label>
                      <input type="password" placeholder="••••••••" className="mt-1 block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-slate-900 dark:text-white dark:ring-slate-700" />
                    </div>
                    <div>
                      <button type="button" className="mt-2 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90">
                        Update Password
                      </button>
                    </div>
                  </div>
                </div>

                {/* 2FA */}
                <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-md font-medium text-slate-900 dark:text-white">Two-Factor Authentication</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Add an extra layer of security to your account.</p>
                    </div>
                    <button type="button" className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-slate-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:bg-slate-700" role="switch" aria-checked="false">
                      <span aria-hidden="true" className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out translate-x-0"></span>
                    </button>
                  </div>
                </div>

                {/* Active Sessions */}
                <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                  <h4 className="text-md font-medium text-slate-900 dark:text-white mb-4">Active Sessions</h4>
                  <div className="rounded-lg border border-slate-200 dark:border-slate-800 divide-y divide-slate-200 dark:divide-slate-800">
                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 dark:text-white text-slate-900">
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">Windows PC - Chrome</p>
                        <p className="text-xs text-slate-500 mt-0.5">Mumbai, India • Active now</p>
                      </div>
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">Current</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-950">
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">iPhone 13 - Safari</p>
                        <p className="text-xs text-slate-500 mt-0.5">Delhi, India • Last active 2 hours ago</p>
                      </div>
                      <button type="button" className="text-sm font-medium text-red-600 hover:text-red-500">Revoke</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
