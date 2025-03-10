import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQSection(){
  return (
    <section className="px-4 py-16 md:px-6 lg:py-20">
      <div className="container mx-auto">
        <h2 className="text-center text-4xl font-bold tracking-tighter text-gray-900 sm:text-5xl dark:text-gray-100">
          Perguntas Frequentes
        </h2>
        <div className="mx-auto mt-8 max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-b border-purple-200">
              <AccordionTrigger className="text-left text-lg font-semibold text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400">
                Como funciona o resumo automático?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-400">
                Nossa tecnologia utiliza IA avançada para analisar textos e criar resumos concisos mantendo os
                pontos principais e ideias essenciais do conteúdo original.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-b border-purple-200">
              <AccordionTrigger className="text-left text-lg font-semibold text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400">
                Os flashcards são personalizáveis?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-400">
                Sim! Você pode personalizar seus flashcards com texto, imagens e áudio, além de organizá-los em
                diferentes categorias e níveis de dificuldade.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-b border-purple-200">
              <AccordionTrigger className="text-left text-lg font-semibold text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400">
                Quais formatos de citação são suportados?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-400">
                Suportamos os principais formatos acadêmicos como ABNT, APA, MLA e Vancouver, garantindo citações
                precisas e atualizadas.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border-b border-purple-200">
              <AccordionTrigger className="text-left text-lg font-semibold text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400">
                Posso usar o Syntese offline?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-400">
                Algumas funcionalidades estão disponíveis offline, mas para melhor experiência e acesso a todas as
                ferramentas, recomendamos conexão com internet.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  )
}