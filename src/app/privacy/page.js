import Link from "next/link"

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <main className="flex-1 px-4 py-12 md:px-6 lg:py-16">
        <div className="container mx-auto max-w-4xl">
          <h1 className="mb-8 text-center text-4xl font-bold tracking-tighter text-gray-900 sm:text-5xl">
            Política de Privacidade
          </h1>
          <div className="prose prose-lg mx-auto">
            <p>
              Sua privacidade é importante para nós. Esta Política de Privacidade explica como o Syntese coleta, usa,
              divulga e protege suas informações pessoais.
            </p>

            <h2>1. Informações que Coletamos</h2>
            <p>
              Coletamos informações que você nos fornece diretamente, como nome, endereço de e-mail e informações de
              perfil. Também coletamos informações automaticamente quando você usa nosso serviço, incluindo dados de uso
              e informações do dispositivo.
            </p>

            <h2>2. Como Usamos Suas Informações</h2>
            <p>Usamos suas informações para:</p>
            <ul>
              <li>Fornecer, manter e melhorar nosso serviço</li>
              <li>Personalizar sua experiência</li>
              <li>Comunicar-nos com você sobre o serviço</li>
              <li>Detectar, prevenir e resolver problemas técnicos</li>
            </ul>

            <h2>3. Compartilhamento de Informações</h2>
            <p>
              Não vendemos suas informações pessoais. Podemos compartilhar suas informações com terceiros apenas nas
              seguintes circunstâncias:
            </p>
            <ul>
              <li>Com seu consentimento</li>
              <li>Para cumprir obrigações legais</li>
              <li>Para proteger os direitos e a segurança do Syntese e seus usuários</li>
            </ul>

            <h2>4. Segurança de Dados</h2>
            <p>
              Implementamos medidas de segurança para proteger suas informações contra acesso não autorizado, alteração,
              divulgação ou destruição.
            </p>

            <h2>5. Seus Direitos</h2>
            <p>
              Você tem o direito de acessar, corrigir ou excluir suas informações pessoais. Você também pode optar por
              não receber comunicações de marketing.
            </p>

            <h2>6. Cookies e Tecnologias Similares</h2>
            <p>
              Usamos cookies e tecnologias similares para coletar informações e melhorar sua experiência. Você pode
              gerenciar suas preferências de cookies através das configurações do seu navegador.
            </p>

            <h2>7. Alterações nesta Política</h2>
            <p>
              Podemos atualizar nossa Política de Privacidade periodicamente. Notificaremos você sobre quaisquer
              alterações publicando a nova Política de Privacidade nesta página.
            </p>

            <h2>8. Transferências Internacionais de Dados</h2>
            <p>
              Suas informações podem ser transferidas e processadas em países fora do seu país de residência, onde as
              leis de proteção de dados podem ser diferentes.
            </p>

            <h2>9. Menores de Idade</h2>
            <p>
              Nosso serviço não se destina a menores de 13 anos. Não coletamos intencionalmente informações pessoais de
              crianças menores de 13 anos.
            </p>

            <h2>10. Contato</h2>
            <p>
              Se você tiver alguma dúvida sobre esta Política de Privacidade, entre em contato conosco em{" "}
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

