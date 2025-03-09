"use client"
import { useState } from "react"
import Image from "next/image"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"

export default function LoginPage() {
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
      toast.success(res.message)
      setIsLogged(true)
      router.push("/dashboard")
    } catch (error) {
      const response = error.response.data
      toast.error(response.message)
    } finally{
      setIsLoading(false)
    }
  }

  const login = async () => {
    const res = await axios.post("/api/login", { email, password })
    return res.data
  }

  return (
    <>
      <div className="flex min-h-screen flex-col bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
        <main className="flex flex-1 items-center justify-center px-4 py-12 md:px-6 lg:py-16">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center items-center">
              <div className="flex space-x-3 justify-center items-center">
                <Image src="/images/syntese.png" alt="Syntese Logo" width={32} height={32} />
                <span className="text-xl font-semibold">Syntese</span>
              </div>
              <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">Entrar na sua conta</h1>
            </div>

            <div className="mt-8 rounded-lg bg-white p-8 shadow-lg">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <div className="relative">
                    <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  disabled={isLoading}
                >
                  {isLoading && <Loader2 className="animate-spin" />}
                  Entrar
                </Button>
              </form>
            </div>
          </div>
        </main>
      </div>
      <ToastContainer position="top-left" autoClose={2000} />
    </>
  )
}
