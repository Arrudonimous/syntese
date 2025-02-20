import { CheckCircle } from "lucide-react"

export default function UserGroupsSection(){
  return(
    <section className="px-4 py-16 md:px-6 lg:py-20">
      <div className="container mx-auto">
        <h2 className="text-center text-4xl font-bold tracking-tighter text-gray-900 sm:text-5xl mb-12">
          Quem Pode se Beneficiar do Syntese?
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-lg bg-gradient-to-br from-purple-100 to-indigo-100 p-8 shadow-lg">
            <h3 className="text-2xl font-semibold text-purple-800 mb-4">Estudantes</h3>
            <ul className="space-y-2 font-inter">
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
            <ul className="space-y-2 font-inter">
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
  )
}