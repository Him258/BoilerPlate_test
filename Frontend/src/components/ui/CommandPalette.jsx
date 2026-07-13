import { useEffect, useState } from 'react'
import { Command } from 'cmdk'
import { useNavigate } from 'react-router-dom'
import { 
  Search,
  LayoutDashboard,
  Users,
  Settings,
  CreditCard,
  Building2,
  ShieldCheck,
  Plus
} from 'lucide-react'
import { navigation } from '../layout/Sidebar'

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const getAllNavItems = () => {
    const items = [];
    navigation.forEach(item => {
      if (item.children) {
        item.children.forEach(child => {
          items.push({ name: child.name, href: child.href, icon: item.icon, parent: item.name });
        });
      } else {
        if (item.href) {
          items.push({ name: item.name, href: item.href, icon: item.icon });
        }
      }
    });
    return items;
  }
  
  const navItems = getAllNavItems();

  useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const runCommand = (command) => {
    setOpen(false)
    command()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-slate-900/50 backdrop-blur-sm">
      <div className="w-full max-w-2xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-950">
        <Command className="flex h-full w-full flex-col overflow-hidden bg-transparent">
          <div className="flex items-center border-b border-slate-200 px-3 dark:border-slate-800">
            <Search className="mr-2 h-5 w-5 shrink-0 text-slate-400" />
            <Command.Input
              autoFocus
              className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-100"
              placeholder="Type a command or search..."
            />
            <span className="text-xs text-slate-400">ESC to close</span>
          </div>
          
          <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2">
            <Command.Empty className="py-6 text-center text-sm text-slate-500">
              No results found.
            </Command.Empty>

            <Command.Group heading="Navigation" className="px-2 py-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
              {navItems.map((item, idx) => (
                <Command.Item 
                  key={idx}
                  onSelect={() => runCommand(() => navigate(item.href))}
                  className="flex cursor-pointer items-center rounded-md px-2 py-2 text-sm text-slate-700 aria-selected:bg-slate-100 aria-selected:text-slate-900 dark:text-slate-300 dark:aria-selected:bg-slate-800 dark:aria-selected:text-white"
                >
                  {item.icon && <item.icon className="mr-2 h-4 w-4" />} {item.parent ? `${item.parent} > ` : ''}{item.name}
                </Command.Item>
              ))}
            </Command.Group>
            
            <Command.Group heading="Quick Actions" className="mt-2 px-2 py-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
              <Command.Item 
                onSelect={() => runCommand(() => navigate('/access/users'))}
                className="flex cursor-pointer items-center rounded-md px-2 py-2 text-sm text-slate-700 aria-selected:bg-slate-100 aria-selected:text-slate-900 dark:text-slate-300 dark:aria-selected:bg-slate-800 dark:aria-selected:text-white"
              >
                <Plus className="mr-2 h-4 w-4" /> Create User
              </Command.Item>
              <Command.Item 
                onSelect={() => runCommand(() => navigate('/multitenant/tenants'))}
                className="flex cursor-pointer items-center rounded-md px-2 py-2 text-sm text-slate-700 aria-selected:bg-slate-100 aria-selected:text-slate-900 dark:text-slate-300 dark:aria-selected:bg-slate-800 dark:aria-selected:text-white"
              >
                <Building2 className="mr-2 h-4 w-4" /> Create Tenant
              </Command.Item>
              <Command.Item 
                onSelect={() => runCommand(() => navigate('/access/roles'))}
                className="flex cursor-pointer items-center rounded-md px-2 py-2 text-sm text-slate-700 aria-selected:bg-slate-100 aria-selected:text-slate-900 dark:text-slate-300 dark:aria-selected:bg-slate-800 dark:aria-selected:text-white"
              >
                <ShieldCheck className="mr-2 h-4 w-4" /> Create Role
              </Command.Item>
            </Command.Group>

          </Command.List>
        </Command>
      </div>
    </div>
  )
}
