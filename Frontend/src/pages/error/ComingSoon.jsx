import { Construction } from "lucide-react"
import { EmptyState } from "@/components/ui/EmptyState"

export function ComingSoon({ moduleName }) {
  return (
    <div className="py-10">
      <EmptyState
        icon={Construction}
        title={`${moduleName} Module`}
        description="This module is part of the Kiaan Core Boilerplate and is currently being developed. Stay tuned for updates!"
      />
    </div>
  )
}
