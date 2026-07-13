import { Link } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { AlertTriangle } from "lucide-react"

export function Error404() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 py-12 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-md flex-col items-center justify-center text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
          <AlertTriangle className="h-10 w-10 text-red-600 dark:text-red-500" aria-hidden="true" />
        </div>
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
          404
        </h1>
        <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">Page not found</h2>
        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
          Sorry, we couldn't find the page you're looking for. It might have been removed or renamed.
        </p>
        <div className="mt-8 flex justify-center">
          <Link to="/">
            <Button>Go back home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
