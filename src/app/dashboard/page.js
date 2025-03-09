import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Overview } from "@/components/dashboard/overview"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { UpcomingTasks } from "@/components/dashboard/upcoming-tasks"

export const metadata = {
  title: "Dashboard | Syntese",
  description: "Gerencie seus estudos e aumente sua produtividade com o Syntese",
}

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Bem-vindo de volta! Aqui está um resumo da sua atividade recente." />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <QuickActions />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Overview className="col-span-4" />
        <div className="col-span-3 space-y-4">
          <UpcomingTasks />
          <RecentActivity />
        </div>
      </div>
    </DashboardShell>
  )
}

