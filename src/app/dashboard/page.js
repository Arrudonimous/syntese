import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Overview } from "@/components/dashboard/overview"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { UpcomingTasks } from "@/components/dashboard/upcoming-tasks"
import { ActivityTimeline } from "@/components/analytics/activity-timeline"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

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
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Atividade Recente</CardTitle>
              <CardDescription>Suas últimas ações na plataforma</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64">
                <ActivityTimeline />
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  )
}

