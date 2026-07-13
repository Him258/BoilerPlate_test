import { Outlet } from "react-router-dom"

export function AuthLayout() {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Left pane - Form */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:w-1/2 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Kiaan Core
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Enterprise SaaS Boilerplate
            </p>
          </div>
          <div className="mt-8">
            <Outlet />
          </div>
        </div>
      </div>
      
      {/* Right pane - Branding/Image */}
      <div className="hidden lg:block lg:flex-1 relative bg-slate-900">
        <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
        <div className="flex h-full items-center justify-center p-12">
          <div className="max-w-lg text-center space-y-6">
            <h1 className="text-4xl font-bold text-white tracking-tight">
              Build your SaaS faster than ever before.
            </h1>
            <p className="text-lg text-slate-300">
              A premium, mobile-first, complete frontend foundation with Dashboard, Authentication, Roles, Billing and more.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
