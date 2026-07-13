import { Link } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { KeyRound } from "lucide-react"

export function ForgotPassword() {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
          <KeyRound className="h-6 w-6 text-primary" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Forgot password?
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          No worries, we'll send you reset instructions.
        </p>
      </div>

      <form action="#" method="POST" className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Email address
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="block w-full appearance-none rounded-md border border-slate-300 px-3 py-2 placeholder-slate-400 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white text-slate-900"
            />
          </div>
        </div>

        <div>
          <Button type="submit" className="w-full">
            Reset password
          </Button>
        </div>
      </form>
      
      <div className="mt-6 text-center text-sm">
        <Link to="/login" className="font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white">
          &larr; Back to login
        </Link>
      </div>
    </div>
  )
}
