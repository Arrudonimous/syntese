import Image from "next/image"
import Link from "next/link"
import { Zap, BookOpen, Brain, Mail, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { NavigationMenu } from "../components/navigation-menu"
import { TestimonialCarousel } from "../components/testimonial-carousel"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <NavigationMenu />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-4 pt-16 pb-16 md:px-6 lg:pt-20 lg:pb-20">
          <div className="container mx-auto">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-5xl font-black text-transparent sm:text-6xl md:text-7xl">
                IA para Estudantes e Profissionais
              </h1>
              <p className="mt-6 text-xl text-gray-600 md:text-2xl">
                Potencialize seus estudos e sua carreira com ferramentas inteligentes de resumo, citações, flashcards e
                automação de e-mails profissionais.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                <Button
                  size="lg"
                  className="group relative overflow-hidden rounded-full bg-purple-600 px-8 py-3 text-lg font-semibold text-white transition-all duration-300 ease-out hover:bg-purple-700 hover:shadow-lg"
                >
                  <span className="relative z-10">Experimente Grátis</span>
                  <span className="absolute bottom-0 left-0 h-full w-full origin-bottom scale-y-0 transform bg-gradient-to-t from-purple-400 to-purple-600 transition-transform duration-300 ease-out group-hover:scale-y-100"></span>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full border-purple-300 px-8 py-3 text-lg font-semibold text-purple-700 transition-all duration-300 hover:bg-purple-100 hover:shadow-lg"
                >
                  Saiba Mais
                </Button>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-gradient-to-br from-purple-300 to-pink-300 opacity-50 blur-3xl"></div>
          <div className="absolute -right-16 top-32 h-64 w-64 rounded-full bg-gradient-to-br from-blue-300 to-teal-300 opacity-50 blur-3xl"></div>
        </section>

        {/* User Groups Section */}
        <section className="px-4 py-16 md:px-6 lg:py-20">
          <div className="container mx-auto">
            <h2 className="text-center text-4xl font-bold tracking-tighter text-gray-900 sm:text-5xl mb-12">
              Quem Pode se Beneficiar do Syntese?
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-lg bg-gradient-to-br from-purple-100 to-indigo-100 p-8 shadow-lg">
                <h3 className="text-2xl font-semibold text-purple-800 mb-4">Estudantes</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-purple-600 mr-2" />
                    <span>Resumos automáticos para revisões eficientes</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-purple-600 mr-2" />
                    <span>Flashcards inteligentes para memorização</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-purple-600 mr-2" />
                    <span>Geração de citações para trabalhos acadêmicos</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-lg bg-gradient-to-br from-teal-100 to-blue-100 p-8 shadow-lg">
                <h3 className="text-2xl font-semibold text-teal-800 mb-4">Profissionais</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-teal-600 mr-2" />
                    <span>Automação de e-mails profissionais</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-teal-600 mr-2" />
                    <span>Resumos de reuniões e relatórios</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-teal-600 mr-2" />
                    <span>Organização eficiente de informações</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-4 py-16 md:px-6 lg:py-20">
          <div className="container mx-auto">
            <h2 className="text-center text-4xl font-bold tracking-tighter text-gray-900 sm:text-5xl">
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

        {/* Testimonial Section */}
        <section className="bg-white px-4 py-16 md:px-6 lg:py-20">
          <div className="container mx-auto">
            <h2 className="text-center text-4xl font-bold tracking-tighter text-gray-900 sm:text-5xl">
              O que nossos usuários dizem
            </h2>
            <TestimonialCarousel />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="px-4 py-16 md:px-6 lg:py-20">
          <div className="container mx-auto">
            <h2 className="text-center text-4xl font-bold tracking-tighter text-gray-900 sm:text-5xl">
              Perguntas Frequentes
            </h2>
            <div className="mx-auto mt-8 max-w-3xl">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-b border-purple-200">
                  <AccordionTrigger className="text-left text-lg font-semibold text-gray-700 hover:text-purple-600">
                    Como funciona o resumo automático?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Nossa tecnologia utiliza IA avançada para analisar textos e criar resumos concisos mantendo os
                    pontos principais e ideias essenciais do conteúdo original.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border-b border-purple-200">
                  <AccordionTrigger className="text-left text-lg font-semibold text-gray-700 hover:text-purple-600">
                    Os flashcards são personalizáveis?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Sim! Você pode personalizar seus flashcards com texto, imagens e áudio, além de organizá-los em
                    diferentes categorias e níveis de dificuldade.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="border-b border-purple-200">
                  <AccordionTrigger className="text-left text-lg font-semibold text-gray-700 hover:text-purple-600">
                    Quais formatos de citação são suportados?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Suportamos os principais formatos acadêmicos como ABNT, APA, MLA e Vancouver, garantindo citações
                    precisas e atualizadas.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4" className="border-b border-purple-200">
                  <AccordionTrigger className="text-left text-lg font-semibold text-gray-700 hover:text-purple-600">
                    Posso usar o Syntese offline?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Algumas funcionalidades estão disponíveis offline, mas para melhor experiência e acesso a todas as
                    ferramentas, recomendamos conexão com internet.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden px-4 py-16 md:px-6 lg:py-20">
          <div className="container relative z-10 mx-auto text-center">
            <h2 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl">
              Comece a otimizar seus estudos hoje
            </h2>
            <p className="mx-auto mt-4 max-w-[600px] text-xl text-purple-100 md:text-2xl">
              Junte-se a milhares de estudantes e profissionais que já transformaram sua forma de estudar e trabalhar.
            </p>
            <Button
              size="lg"
              className="mt-8 rounded-full bg-white px-8 py-3 text-lg font-semibold text-purple-600 transition-all duration-300 hover:bg-purple-100 hover:shadow-lg"
            >
              Experimente Grátis
            </Button>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-indigo-600"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTYiIGhlaWdodD0iMTAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNTYiIGhlaWdodD0iMTAwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDU2IDAgTCAwIDAgMCAxMDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjIpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-10"></div>
        </section>
      </main>

      <footer className="border-t bg-white px-4 py-6 md:px-6">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center space-x-2">
            {/* <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/syntese-0QoonbFlkdSdC2duJrLuusMG9H8lTh.png"
              alt="Syntese Logo"
              width={24}
              height={24}
            /> */}
            <span className="text-sm text-gray-500">
              © {new Date().getFullYear()} Syntese. Todos os direitos reservados.
            </span>
          </div>
          <nav className="flex gap-4">
            <Link href="/termos" className="text-sm text-gray-500 hover:text-purple-600">
              Termos
            </Link>
            <Link href="/privacidade" className="text-sm text-gray-500 hover:text-purple-600">
              Privacidade
            </Link>
            <Link href="/contato" className="text-sm text-gray-500 hover:text-purple-600">
              Contato
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({
  title,
  description,
  href,
  icon,
}) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-lg bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
      <div className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 transform bg-gradient-to-r from-purple-400 to-pink-400 transition-transform duration-300 group-hover:scale-x-100"></div>
    </Link>
  )
}

