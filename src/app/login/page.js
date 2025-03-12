"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import axios from "axios"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const { toast } = useToast()
  const { setIsLogged } = useAuth()
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const res = await login()
      toast({
        description: res.message,
      })
      setIsLogged(true)
      router.push("/dashboard")

    } catch (error) {
      const response = error.response.data

      toast({
        description: response.message,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const login = async () => {
    const res = await axios.post("/api/login", { email, password })
    return res.data
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-purple-950/30 dark:to-indigo-950/40">
      <main className="flex flex-1 items-center justify-center px-4 py-12 md:px-6 lg:py-16">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Image
              src="/images/syntese.png"
              alt="Syntese Logo"
              width={60}
              height={60}
              className="flex dark:hidden mx-auto"
            />
            <Image
              src="/images/syntese-dark.png"
              alt="Syntese Logo"
              width={60}
              height={60}
              className="hidden dark:flex mx-auto"
            />
            <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
              Entrar na sua conta
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Acesse sua conta para continuar otimizando seus estudos e produtividade
            </p>
          </div>

          <div className="mt-8 rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800 dark:border dark:border-gray-700">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <Link
                    href="/recuperar-senha"
                    className="text-sm text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300"
                  >
                    Esqueceu a senha?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="remember" checked={rememberMe} onCheckedChange={(checked) => setRememberMe(!!checked)} />
                <Label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Lembrar de mim
                </Label>
              </div>

              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
                {isLoading && <Loader2 className="animate-spin" />}
                Entrar
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Não tem uma conta?{" "}
                <Link href="/register" className="font-medium text-purple-600 hover:text-purple-800">
                  Comece grátis
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
