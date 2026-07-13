import { UniversalCRUDLayout } from "@/components/layout/UniversalCRUDLayout"

function MasterDataLayout({ title, description, columns, data = [] }) {
  return (
    <UniversalCRUDLayout
      title={title}
      description={description}
      hasData={data.length > 0}
      table={
        <table className="w-full whitespace-nowrap text-left text-sm">
          <thead className="bg-slate-50 dark:bg-slate-900/50 dark:text-white text-slate-900">
            <tr>
              {columns.map(c => <th key={c.key} className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200">{c.label}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-transparent">
            {data.map((row, i) => (
              <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                {columns.map(c => (
                  <td key={c.key} className="px-6 py-4 text-slate-500 dark:text-slate-400">
                    {row[c.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      }
    />
  )
}

export function Departments() {
  const columns = [
    { key: "name", label: "Department Name", isPrimary: true },
    { key: "head", label: "Department Head" },
    { key: "employees", label: "Employees" },
  ]
  return <MasterDataLayout title="Departments" description="Manage company departments and structures." columns={columns} entity="department" />
}

export function Teams() {
  const columns = [
    { key: "name", label: "Team Name", isPrimary: true },
    { key: "department", label: "Department" },
    { key: "members", label: "Members" },
  ]
  return <MasterDataLayout title="Teams" description="Manage cross-functional teams." columns={columns} entity="team" />
}

export function UserActivityTimeline() {
  const columns = [
    { key: "user", label: "User", isPrimary: true },
    { key: "action", label: "Action" },
    { key: "module", label: "Module" },
    { key: "timestamp", label: "Timestamp" },
  ]
  const data = [
    { user: "Alice Freeman", action: "Created new Pipeline Deal", module: "CRM", timestamp: "2 mins ago" },
    { user: "Robert Johnson", action: "Updated Settings", module: "System", timestamp: "1 hour ago" },
  ]
  // Note: For now Activity Timeline stays static as requested for User Management Phase.
  return <MasterDataLayout title="Activity Timeline" description="View global user activities and audit trails." columns={columns} entity="" data={data} />
}
