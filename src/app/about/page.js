import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <main className="flex-1">
        <section className="px-4 py-16 md:px-6 lg:py-20">
          <div className="container mx-auto">
            <h1 className="mb-8 text-center text-4xl font-bold tracking-tighter text-gray-900 sm:text-5xl md:text-6xl">
              Sobre o Syntese
            </h1>
            <div className="mx-auto max-w-3xl">
              <p className="mb-6 text-xl text-gray-600">
                O Syntese nasceu da visão de tornar o aprendizado e o trabalho mais eficientes e acessíveis através da
                inteligência artificial. Nossa missão é capacitar estudantes e profissionais com ferramentas inovadoras
                que otimizem seu tempo e potencializem seus resultados.
              </p>
              <p className="mb-6 text-xl text-gray-600">
                Fundada por um grupo de entusiastas em educação e tecnologia, a Syntese combina expertise em IA,
                pedagogia e design de produto para criar soluções que realmente fazem a diferença na vida de nossos
                usuários.
              </p>
              <p className="mb-12 text-xl text-gray-600">
                Acreditamos que o futuro da educação e do trabalho está na integração inteligente entre humanos e
                máquinas, e estamos comprometidos em liderar essa transformação.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <TeamMember name="Diego Arruda" role="CEO & CTO & Fundador" image="/images/diego.jpg" />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

function TeamMember({ name, role, image }) {
  return (
    <div className="text-center">
      <Image
        src={image || "/placeholder.svg"}
        alt={name}
        width={300}
        height={300}
        className="mx-auto mb-4 rounded-full"
      />
      <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
      <p className="text-gray-600">{role}</p>
    </div>
  )
}

