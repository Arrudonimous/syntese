
import { Zap, BookOpen, Brain, Mail } from "lucide-react"
import FeatureCard from "../feature-card"

export default function FeaturesSection(){
  return (
    <section className="px-4 py-16 md:px-6 lg:py-20">
      <div className="container mx-auto">
        <h2 className="text-center text-4xl font-bold tracking-tighter text-gray-900 sm:text-5xl dark:text-gray-100">
          Funcionalidades Principais
        </h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            title="Resumo Automático"
            description="Transforme textos longos em resumos concisos, ideal para estudos e relatórios profissionais."
            href="/resumo"
            icon={<Zap className="h-8 w-8 text-purple-500" />}
          />
          <FeatureCard
            title="Gerador de Citações"
            description="Crie citações profissionais em diferentes formatos acadêmicos para seus trabalhos e artigos."
            href="/citacoes"
            icon={<BookOpen className="h-8 w-8 text-teal-500" />}
          />
          <FeatureCard
            title="Flashcards Inteligentes"
            description="Estude e memorize informações de forma eficiente, perfeito para estudantes e profissionais em constante aprendizado."
            href="/flashcards"
            icon={<Brain className="h-8 w-8 text-orange-500" />}
          />
          <FeatureCard
            title="Automação de E-mails"
            description="Crie e-mails profissionais rapidamente, economizando tempo e melhorando a comunicação no trabalho."
            href="/emails"
            icon={<Mail className="h-8 w-8 text-blue-500" />}
          />
        </div>
      </div>
    </section>
  )
}