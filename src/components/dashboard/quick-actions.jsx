import Link from "next/link"
import { BookOpen, Brain, Mail, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const actions = [
  {
    title: "Resumo",
    description: "Criar um novo resumo",
    icon: <Zap className="h-5 w-5" />,
    href: "/dashboard/abstracts/new",
    color: "text-purple-500",
    bgColor: "bg-purple-100",
  },
  {
    title: "Citações",
    description: "Gerar citações",
    icon: <BookOpen className="h-5 w-5" />,
    href: "/dashboard/quotes/new",
    color: "text-teal-500",
    bgColor: "bg-teal-100",
  },
  {
    title: "Flashcards",
    description: "Criar flashcards",
    icon: <Brain className="h-5 w-5" />,
    href: "/dashboard/flashcards/new",
    color: "text-orange-500",
    bgColor: "bg-orange-100",
  },
  {
    title: "E-mail",
    description: "Gerar e-mail",
    icon: <Mail className="h-5 w-5" />,
    href: "/dashboard/emails/new",
    color: "text-blue-500",
    bgColor: "bg-blue-100",
  },
]

export function QuickActions() {
  return (
    <>
      {actions.map((action) => (
        <Link key={action.title} href={action.href}>
          <Card className="h-full transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{action.title}</CardTitle>
              <div className={`rounded-full p-2 ${action.bgColor}`}>
                <span className={action.color}>{action.icon}</span>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>{action.description}</CardDescription>
            </CardContent>
          </Card>
        </Link>
      ))}
    </>
  )
}