import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <main className="flex-1">
        <section className="px-4 py-16 md:px-6 lg:py-20">
          <div className="container mx-auto">
            <h1 className="mb-8 text-center text-4xl font-bold tracking-tighter text-gray-900 sm:text-5xl md:text-6xl">
              Entre em Contato
            </h1>
            <div className="mx-auto max-w-4xl">
              <div className="mb-12 grid gap-8 md:grid-cols-2">
                <div>
                  <h2 className="mb-4 text-2xl font-semibold text-gray-900">Fale Conosco</h2>
                  <p className="mb-6 text-gray-600">
                    Tem alguma dúvida ou sugestão? Nossa equipe está pronta para ajudar. Preencha o formulário ou use um
                    de nossos canais de contato.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Mail className="mr-2 h-5 w-5 text-purple-600" />
                      <span>contato@syntese.com</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="mr-2 h-5 w-5 text-purple-600" />
                      <span>+55 (11) 1234-5678</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-5 w-5 text-purple-600" />
                      <span>Av. Paulista, 1000 - São Paulo, SP</span>
                    </div>
                  </div>
                </div>
                <form className="space-y-4">
                  <Input placeholder="Seu nome" />
                  <Input type="email" placeholder="Seu e-mail" />
                  <Input placeholder="Assunto" />
                  <Textarea placeholder="Sua mensagem" rows={4} />
                  <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                    Enviar Mensagem
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

