import { FileText, Mail, Zap } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "resumo",
    title: "Resumo criado",
    description: "Você criou um resumo do artigo 'Inteligência Artificial na Educação'",
    time: "Há 2 horas",
    icon: <Zap className="h-4 w-4" />,
  },
  {
    id: 2,
    type: "email",
    title: "E-mail gerado",
    description: "Você gerou um e-mail profissional para contato com professor",
    time: "Há 5 horas",
    icon: <Mail className="h-4 w-4" />,
  },
  {
    id: 3,
    type: "documento",
    title: "Documento adicionado",
    description: "Você adicionou o documento 'Notas de Aula - Matemática'",
    time: "Há 1 dia",
    icon: <FileText className="h-4 w-4" />,
  },
]

export function RecentActivity() {
  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold">Atividade Recente</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
              {activity.icon}
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">{activity.title}</p>
              <p className="text-xs text-muted-foreground">{activity.description}</p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
