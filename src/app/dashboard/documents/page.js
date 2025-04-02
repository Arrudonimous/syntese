import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DocumentList } from "@/components/documents/document-list"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus, Upload } from "lucide-react"

export const metadata = {
  title: "Documentos | Syntese",
  description: "Gerencie seus documentos e arquivos",
}

export default function DocumentosPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Meus Documentos" text="Gerencie seus documentos e arquivos.">
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard/documents/upload">
              <Upload className="mr-2 h-4 w-4" /> Fazer Upload
            </Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/documents/new">
              <Plus className="mr-2 h-4 w-4" /> Novo Documento
            </Link>
          </Button>
        </div>
      </DashboardHeader>
      <DocumentList />
    </DashboardShell>
  )
}