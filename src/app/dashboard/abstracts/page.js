import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"
import { AbstractsList } from "@/components/abstracts/abstracts-list"

export const metadata = {
  title: "Resumos Automáticos | Syntese",
  description: "Gerencie seus resumos automáticos",
}

export default function AbstractsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Resumos Automáticos" text="Gerencie seus resumos automáticos.">
        <Button asChild>
          <Link href="/dashboard/abstracts/new">
            <Plus className="mr-2 h-4 w-4" /> Novo Resumo
          </Link>
        </Button>
      </DashboardHeader>
      <AbstractsList />
    </DashboardShell>
  )
}