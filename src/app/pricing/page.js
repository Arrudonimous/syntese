"use client"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function PricingPage() {
  const router = useRouter()
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-purple-950/30 dark:to-indigo-950/40">
      <main className="flex-1">
        <section className="px-4 py-16 md:px-6 lg:py-20">
          <div className="container mx-auto">
            <h1 className="mb-8 text-center text-4xl font-bold tracking-tighter text-gray-900 sm:text-5xl md:text-6xl dark:text-gray-100">
              Planos e Preços
            </h1>
            <p className="mx-auto mb-12 max-w-2xl text-center text-xl text-gray-600 dark:text-gray-300">
              Escolha o plano perfeito para suas necessidades e comece a otimizar seus estudos e trabalho hoje mesmo.
            </p>
            <div className="grid gap-8 md:grid-cols-3">
              <PricingCard
                title="Básico"
                price="Grátis"
                description="Perfeito para começar"
                features={[
                  "Resumos automáticos limitados",
                  "Geração de citações básica",
                  "50 flashcards por mês",
                  "Suporte por email",
                ]}
                buttonText="Começar Grátis"
                onClickButton={() => router.push('/register')}
              />
              <PricingCard
                title="Pro"
                price="R$ 19,90/mês"
                description="Ideal para estudantes e profissionais"
                features={[
                  "Resumos automáticos ilimitados",
                  "Geração de citações avançada",
                  "Flashcards ilimitados",
                  "Automação de e-mails básica",
                  "Suporte prioritário",
                ]}
                buttonText="Assinar Agora"
                highlighted={true}
                onClickButton={() => router.push('/register')}
              />
              <PricingCard
                title="Empresas"
                price="Personalizado"
                description="Para equipes e organizações"
                features={[
                  "Todas as funcionalidades Pro",
                  "Automação de e-mails avançada",
                  "Integração com ferramentas empresariais",
                  "Gerenciamento de equipe",
                  "Suporte dedicado",
                ]}
                buttonText="Fale Conosco"
                onClickButton={() => router.push('/contact')}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

function PricingCard({
  title,
  price,
  description,
  features,
  buttonText,
  highlighted = false,
  onClickButton
}) {
  return (
    <div
      className={`rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800 ${highlighted ? "border-2 border-purple-500 ring-2 ring-purple-500 ring-opacity-50" : "dark:border dark:border-gray-700"
        }`}
    >
      <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-gray-100">{title}</h3>
      <p className="mb-4 text-gray-600 dark:text-gray-300">{description}</p>
      <p className="mb-6 text-4xl font-bold text-purple-600 dark:text-purple-400">{price}</p>
      <ul className="mb-8 space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
            <span className="dark:text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>
      <Button
        className={`w-full ${highlighted ? "bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800" : "bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600"}`}
        onClick={onClickButton}
      >
        {buttonText}
      </Button>
    </div>
  )
}

