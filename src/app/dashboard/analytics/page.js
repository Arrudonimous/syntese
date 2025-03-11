import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UsageMetrics } from "@/components/analytics/usage-metrics"
import { ActivityTimeline } from "@/components/analytics/activity-timeline"
import { PerformanceChart } from "@/components/analytics/performance-chart"
import { ContentBreakdown } from "@/components/analytics/content-breakdown"

export const metadata = {
  title: "Análises | Syntese",
  description: "Visualize estatísticas e métricas sobre seu uso da plataforma",
}

export default function AnalyticsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Análises" text="Visualize estatísticas e métricas sobre seu uso da plataforma." />

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="usage">Uso</TabsTrigger>
          <TabsTrigger value="performance">Desempenho</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <UsageMetrics />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <PerformanceChart className="col-span-4" />
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Atividade Recente</CardTitle>
                <CardDescription>Suas últimas ações na plataforma</CardDescription>
              </CardHeader>
              <CardContent>
                <ActivityTimeline />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="usage" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Uso por Ferramenta</CardTitle>
                <CardDescription>Distribuição de uso entre as diferentes ferramentas</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ContentBreakdown />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Limites de Uso</CardTitle>
                <CardDescription>Seu uso atual em relação aos limites do plano</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <UsageLimitItem title="Resumos" current={42} limit={50} unit="resumos" />
                  <UsageLimitItem title="Citações" current={18} limit={100} unit="citações" />
                  <UsageLimitItem title="Flashcards" current={156} limit={500} unit="cards" />
                  <UsageLimitItem title="E-mails" current={7} limit={20} unit="e-mails" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Histórico de Uso</CardTitle>
              <CardDescription>Seu uso ao longo do tempo</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <UsageHistoryChart />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Desempenho de Estudo</CardTitle>
                <CardDescription>Métricas de aprendizado com flashcards</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <StudyPerformanceChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Eficiência de Resumos</CardTitle>
                <CardDescription>Tempo economizado com resumos automáticos</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <SummaryEfficiencyChart />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Progresso de Aprendizado</CardTitle>
              <CardDescription>Seu progresso em diferentes áreas de estudo</CardDescription>
            </CardHeader>
            <CardContent>
              <LearningProgressTable />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

// Componentes auxiliares para a página
function UsageLimitItem({
  title,
  current,
  limit,
  unit,
}) {
  const percentage = Math.min(Math.round((current / limit) * 100), 100)
  const isNearLimit = percentage >= 80

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{title}</span>
        <span className="text-sm text-muted-foreground">
          {current} / {limit} {unit}
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-secondary">
        <div
          className={`h-full rounded-full ${isNearLimit ? "bg-amber-500" : "bg-primary"}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

function UsageHistoryChart() {
  return (
    <div className="flex h-full items-center justify-center text-muted-foreground">
      Gráfico de histórico de uso seria renderizado aqui
    </div>
  )
}

function StudyPerformanceChart() {
  return (
    <div className="flex h-full items-center justify-center text-muted-foreground">
      Gráfico de desempenho de estudo seria renderizado aqui
    </div>
  )
}

function SummaryEfficiencyChart() {
  return (
    <div className="flex h-full items-center justify-center text-muted-foreground">
      Gráfico de eficiência de resumos seria renderizado aqui
    </div>
  )
}

function LearningProgressTable() {
  return (
    <div className="flex h-[200px] items-center justify-center text-muted-foreground">
      Tabela de progresso de aprendizado seria renderizada aqui
    </div>
  )
}