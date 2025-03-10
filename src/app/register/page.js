"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Eye, EyeOff, CheckCircle, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { NavigationMenu } from "@/components/navigation-menu"

export default function GetStartedPage() {
  const { setIsLogged } = useAuth()
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const res = await createUser()
      toast.success(res.message)
      resetFields()

      await login()

      setIsLogged(true)
      router.push("/dashboard")
    } catch (error) {
      const response = error.response.data
      toast.error(response.message)
    } finally {
      setIsLoading(false)
    }
  }

  const createUser = async () => {
    const res = await axios.post("/api/user", { name, email, password })
    return res.data
  }

  const login = async () => {
    const res = await axios.post("/api/login", { email, password })
    return res.data
  }

  const resetFields = () => {
    setName("")
    setEmail("")
    setPassword("")
    setAgreeTerms(false)
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-purple-950/30 dark:to-indigo-950/40">
      <main className="flex flex-1 px-4 py-12 md:px-6 lg:py-16">
        <div className="container mx-auto grid gap-8 lg:grid-cols-2">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-gray-100">
              Comece a otimizar seus estudos e trabalho hoje
            </h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
              Junte-se a milhares de estudantes e profissionais que já transformaram sua forma de estudar e trabalhar com o Syntese.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start">
                <CheckCircle className="mr-3 h-6 w-6 text-purple-600" />
                <div>
                  <h3 className="font-semibold dark:text-gray-200">Resumos automáticos</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Transforme textos longos em resumos concisos e objetivos.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="mr-3 h-6 w-6 text-purple-600" />
                <div>
                  <h3 className="font-semibold dark:text-gray-200">Flashcards inteligentes</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Estude de forma eficiente com flashcards personalizados.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="mr-3 h-6 w-6 text-purple-600" />
                <div>
                  <h3 className="font-semibold dark:text-gray-200">E-mails profissionais</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Crie e-mails profissionais rapidamente com nossa ferramenta inteligente.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800 dark:border dark:border-gray-700">
              <div className="mb-6 text-center">
                <Image src="/images/syntese.png" alt="Syntese Logo" width={48} height={48} className="mx-auto" />
                <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-gray-100">Crie sua conta gratuita</h2>
              </div>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="name">Nome completo</Label>
                  <Input id="name" type="text" placeholder="Seu nome" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <div className="relative">
                    <Input id="password" type={showPassword ? "text" : "password"} placeholder="Crie uma senha forte" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox id="terms" checked={agreeTerms} onCheckedChange={(checked) => setAgreeTerms(!!checked)} className="mt-1" />
                  <Label htmlFor="terms" className="text-sm text-gray-600">
                    Eu concordo com os <Link href="/terms" className="text-purple-600 hover:underline dark:text-purple-400">Termos de Uso</Link> e <Link href="/privacy" className="text-purple-600 hover:underline dark:text-purple-400">Política de Privacidade</Link>
                  </Label>
                </div>
                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={!agreeTerms || isLoading}>
                  {isLoading && <Loader2 className="animate-spin" />} Criar conta
                </Button>
              </form>
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Já tem uma conta? <Link href="/login" className="font-medium text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300">Faça login</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <ToastContainer position="top-left" autoClose={1000} />
    </div>
  )
}
