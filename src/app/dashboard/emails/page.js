import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { EmailList } from "@/components/emails/email-list"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"

export const metadata = {
  title: "Automação de E-mails | Syntese",
  description: "Crie e-mails profissionais de forma rápida e eficiente",
}

export default function EmailsPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Automação de E-mails"
        text="Crie e-mails profissionais de forma rápida e eficiente para diversos fins."
      >
        <Button asChild>
          <Link href="/dashboard/emails/new">
            <Plus className="mr-2 h-4 w-4" /> Novo E-mail
          </Link>
        </Button>
      </DashboardHeader>
      <EmailList />
    </DashboardShell>
  )
}