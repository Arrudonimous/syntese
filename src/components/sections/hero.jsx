import { Button } from "../ui/button";

export default function HeroSection(){
  return (
    <section className="relative overflow-hidden px-4 pt-16 pb-16 md:px-6 lg:pt-20 lg:pb-20">
      <div className="container mx-auto">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-4xl font-black text-transparent sm:text-6xl md:text-7xl">
            IA para Estudantes e Profissionais
          </h1>
          <p className="mt-6 text-xl text-gray-600 md:text-2xl font-inter">
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
  )
}