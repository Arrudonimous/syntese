import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { CitacoesList } from "@/components/quotes/quotes-list"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"

export const metadata = {
  title: "Gerador de Citações | Syntese",
  description: "Gerencie suas citações acadêmicas",
}

export default function CitacoesPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Gerador de Citações" text="Crie e gerencie citações acadêmicas em diversos formatos.">
        <Button asChild>
          <Link href="/dashboard/quotes/new">
            <Plus className="mr-2 h-4 w-4" /> Nova Citação
          </Link>
        </Button>
      </DashboardHeader>
      <CitacoesList />
    </DashboardShell>
  )
}

