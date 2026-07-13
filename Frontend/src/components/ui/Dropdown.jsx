import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { cn } from '@/lib/utils'

export function Dropdown({ trigger, children, className, align = 'right' }) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button as={Fragment}>
          {trigger}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={cn(
            "absolute z-50 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none dark:bg-slate-900 dark:ring-white/10",
            align === 'right' ? 'right-0' : 'left-0',
            className
          )}
        >
          <div className="py-1">
            {children}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export function DropdownItem({ children, onClick, className, icon: Icon }) {
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          onClick={onClick}
          className={cn(
            active ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white' : 'text-slate-700 dark:text-slate-300',
            'group flex w-full items-center px-4 py-2 text-sm',
            className
          )}
        >
          {Icon && (
            <Icon
              className="mr-3 h-4 w-4 text-slate-400 group-hover:text-slate-500 dark:group-hover:text-slate-300"
              aria-hidden="true"
            />
          )}
          {children}
        </button>
      )}
    </Menu.Item>
  )
}
