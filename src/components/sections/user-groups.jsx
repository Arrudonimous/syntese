import { CheckCircle } from "lucide-react"

export default function UserGroupsSection(){
  return(
    <section className="px-4 py-16 md:px-6 lg:py-20">
      <div className="container mx-auto">
        <h2 className="text-center text-4xl font-bold tracking-tighter text-gray-900 sm:text-5xl mb-12 dark:text-gray-100">
          Quem Pode se Beneficiar do Syntese?
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-lg bg-gradient-to-br from-purple-100 to-indigo-100 p-8 shadow-lg dark:from-purple-900/40 dark:to-indigo-900/40 dark:border dark:border-purple-800/30">
            <h3 className="text-2xl font-semibold text-purple-800 mb-4 dark:text-purple-300">Estudantes</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-purple-600 mr-2" />
                <span className="text-gray-600 dark:text-gray-300">
                  Resumos automáticos para revisões eficientes
                </span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-purple-600 mr-2" />
                <span className="text-gray-600 dark:text-gray-300">Flashcards inteligentes para memorização</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-purple-600 mr-2" />
                <span className="text-gray-600 dark:text-gray-300">
                  Geração de citações para trabalhos acadêmicos
                </span>
              </li>
            </ul>
          </div>
          <div className="rounded-lg bg-gradient-to-br from-teal-100 to-blue-100 p-8 shadow-lg dark:from-teal-900/40 dark:to-blue-900/40 dark:border dark:border-teal-800/30">
            <h3 className="text-2xl font-semibold text-teal-800 mb-4 dark:text-teal-300">Profissionais</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-teal-600 mr-2" />
                <span className="text-gray-600 dark:text-gray-300">Automação de e-mails profissionais</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-teal-600 mr-2" />
                <span className="text-gray-600 dark:text-gray-300">Resumos de reuniões e relatórios</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-teal-600 mr-2" />
                <span className="text-gray-600 dark:text-gray-300">Organização eficiente de informações</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}