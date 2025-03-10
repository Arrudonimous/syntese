"use client"
import { Button } from "@/components/ui/button"
import { Zap, BookOpen, Brain, Mail } from "lucide-react"
import { useRouter } from "next/navigation"

export default function FeaturesPage() {
  const router = useRouter()
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-purple-950/30 dark:to-indigo-950/40">
      <main className="flex-1">
        <section className="px-4 py-16 md:px-6 lg:py-20">
          <div className="container mx-auto">
            <h1 className="mb-8 text-center text-4xl font-bold tracking-tighter text-gray-900 sm:text-5xl md:text-6xl dark:text-gray-100">
              Funcionalidades do Syntese
            </h1>
            <p className="mx-auto mb-12 max-w-2xl text-center text-xl text-gray-600 dark:text-gray-300">
              Descubra como o Syntese pode transformar sua maneira de estudar e trabalhar com nossas poderosas
              ferramentas de IA.
            </p>
            <div className="grid gap-8 md:grid-cols-2">
              <FeatureCard
                icon={<Zap className="h-12 w-12 text-purple-500" />}
                title="Resumo Automático"
                description="Transforme textos longos em resumos concisos e objetivos automaticamente. Ideal para estudos e relatórios profissionais."
              />
              <FeatureCard
                icon={<BookOpen className="h-12 w-12 text-teal-500" />}
                title="Gerador de Citações"
                description="Crie citações profissionais em diferentes formatos acadêmicos para seus trabalhos e artigos com facilidade e precisão."
              />
              <FeatureCard
                icon={<Brain className="h-12 w-12 text-orange-500" />}
                title="Flashcards Inteligentes"
                description="Estude e memorize informações de forma eficiente com flashcards personalizados e adaptáveis ao seu ritmo de aprendizado."
              />
              <FeatureCard
                icon={<Mail className="h-12 w-12 text-blue-500" />}
                title="Automação de E-mails"
                description="Crie e-mails profissionais rapidamente, economizando tempo e melhorando a comunicação no ambiente de trabalho."
              />
            </div>
          </div>
        </section>
        <section className="bg-white px-4 py-16 md:px-6 lg:py-20 dark:bg-gray-900">
          <div className="container mx-auto text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-gray-100">Pronto para experimentar?</h2>
            <p className="mb-8 text-xl text-gray-600 dark:text-gray-300">
              Comece a usar o Syntese gratuitamente e transforme sua produtividade.
            </p>
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800" onClick={() => router.push('/register')}>
              Começar Agora
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}

function FeatureCard({ icon, title, description}) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800 dark:border dark:border-gray-700">
      <div className="mb-4">{icon}</div>
      <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  )
}

