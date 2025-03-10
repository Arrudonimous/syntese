import Link from "next/link"

export default function TermsOfUsePage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-purple-950/30 dark:to-indigo-950/40">
      <main className="flex-1 px-4 py-12 md:px-6 lg:py-16">
        <div className="container mx-auto max-w-4xl">
          <h1 className="mb-8 text-center text-4xl font-bold tracking-tighter text-gray-900 sm:text-5xl dark:text-gray-100">
            Termos de Uso
          </h1>
          <div className="prose prose-lg mx-auto dark:prose-invert" >
            <p>
              Bem-vindo aos Termos de Uso do Syntese. Ao acessar ou usar nosso serviço, você concorda em cumprir estes
              termos. Por favor, leia-os atentamente.
            </p>

            <h2>1. Aceitação dos Termos</h2>
            <p>
              Ao usar o Syntese, você concorda com estes Termos de Uso. Se você não concordar com qualquer parte destes
              termos, não poderá usar nosso serviço.
            </p>

            <h2>2. Alterações nos Termos</h2>
            <p>
              Reservamo-nos o direito de modificar estes termos a qualquer momento. Continuando a usar o serviço após as
              alterações, você aceita os novos termos.
            </p>

            <h2>3. Uso do Serviço</h2>
            <p>
              Você concorda em usar o Syntese apenas para fins legais e de acordo com estes termos. Você não deve usar o
              serviço de maneira que possa danificar, desativar ou sobrecarregar o Syntese.
            </p>

            <h2>4. Contas de Usuário</h2>
            <p>
              Você é responsável por manter a confidencialidade de sua conta e senha. Notifique-nos imediatamente sobre
              qualquer uso não autorizado de sua conta.
            </p>

            <h2>5. Conteúdo do Usuário</h2>
            <p>
              Você mantém todos os direitos sobre o conteúdo que envia ao Syntese. Ao enviar conteúdo, você nos concede
              uma licença mundial, não exclusiva e isenta de royalties para usar, modificar, executar publicamente e
              exibir o conteúdo em conexão com o serviço.
            </p>

            <h2>6. Propriedade Intelectual</h2>
            <p>
              O Syntese e seu conteúdo original, recursos e funcionalidades são e permanecerão propriedade exclusiva do
              Syntese e seus licenciadores.
            </p>

            <h2>7. Rescisão</h2>
            <p>
              Podemos encerrar ou suspender seu acesso imediatamente, sem aviso prévio ou responsabilidade, por qualquer
              motivo, incluindo, sem limitação, se você violar os Termos.
            </p>

            <h2>8. Limitação de Responsabilidade</h2>
            <p>
              Em nenhum caso o Syntese, nem seus diretores, funcionários, parceiros, agentes, fornecedores ou afiliados,
              serão responsáveis por quaisquer danos indiretos, incidentais, especiais, consequenciais ou punitivos.
            </p>

            <h2>9. Lei Aplicável</h2>
            <p>
              Estes termos serão regidos e interpretados de acordo com as leis do Brasil, sem considerar suas
              disposições sobre conflitos de leis.
            </p>

            <h2>10. Contato</h2>
            <p>
              Se você tiver alguma dúvida sobre estes Termos, entre em contato conosco em{" "}
              <Link href="mailto:syntese.app@gmail.com" className="text-purple-600 hover:underline">
                syntese.app@gmail.com
              </Link>
              .
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

