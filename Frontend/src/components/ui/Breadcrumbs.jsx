import { Link, useLocation } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

export function Breadcrumbs() {
  const location = useLocation()
  
  // Split pathname and remove empty strings
  const pathnames = location.pathname.split('/').filter((x) => x)

  return (
    <nav className="flex mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        <li>
          <div>
            <Link to="/" className="text-slate-400 hover:text-slate-500 dark:hover:text-slate-300 transition-colors">
              <Home className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>
        {pathnames.map((value, index) => {
          const isLast = index === pathnames.length - 1
          const to = `/${pathnames.slice(0, index + 1).join('/')}`
          
          // Capitalize first letter and format text (e.g. create-user -> Create User)
          const title = value
            .split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')

          return (
            <li key={to}>
              <div className="flex items-center">
                <ChevronRight className="h-4 w-4 flex-shrink-0 text-slate-400" aria-hidden="true" />
                {isLast ? (
                  <span className="ml-2 text-sm font-medium text-slate-700 dark:text-slate-300" aria-current="page">
                    {title}
                  </span>
                ) : (
                  <Link
                    to={to}
                    className="ml-2 text-sm font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300 transition-colors"
                  >
                    {title}
                  </Link>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
