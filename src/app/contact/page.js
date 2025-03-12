"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone } from "lucide-react"
import { useState } from "react"
import emailjs from "emailjs-com"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const { toast } = useToast()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')


  const resetFields = () => {
    setName("")
    setEmail("")
    setSubject("")
    setMessage("")
  }


  const handleSubmitForm = (e) => {
    e.preventDefault()

    try {
      emailjs.send(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, {
        from_name: name,
        to_name: "Syntese",
        email,
        message: message,
        subject
      }, process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY)


      
      toast({
        description: "Solicitação aberta com sucesso!",
      })
    } catch (error) {
      toast({
        description: `Erro ao abrir solicitação! ${error}`,
      })
    } finally{
      resetFields()
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-purple-950/30 dark:to-indigo-950/40">
      <main className="flex-1">
        <section className="px-4 py-16 md:px-6 lg:py-20">
          <div className="container mx-auto">
            <h1 className="mb-8 text-center text-4xl font-bold tracking-tighter text-gray-900 sm:text-5xl md:text-6xl dark:text-gray-100">
              Entre em Contato
            </h1>
            <div className="mx-auto max-w-4xl">
              <div className="mb-12 grid gap-8 md:grid-cols-2">
                <div>
                  <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-gray-100">Fale Conosco</h2>
                  <p className="mb-6 text-gray-600 dark:text-gray-300">
                    Tem alguma dúvida ou sugestão? Nossa equipe está pronta para ajudar. Preencha o formulário ou use um
                    de nossos canais de contato.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Mail className="mr-2 h-5 w-5 text-purple-600" />
                      <span className="dark:text-gray-300">syntese.app@gmail.com</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="mr-2 h-5 w-5 text-purple-600" />
                      <span className="dark:text-gray-300">+55 (11) 95026-0410</span>
                    </div>
                  </div>
                </div>
                <form className="space-y-4" onSubmit={handleSubmitForm}>
                  <Input placeholder="Seu nome" value={name} onChange={(e) => setName(e.target.value)} />
                  <Input type="email" placeholder="Seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <Input placeholder="Assunto" value={subject} onChange={(e) => setSubject(e.target.value)} />
                  <Textarea placeholder="Sua mensagem" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} />
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

