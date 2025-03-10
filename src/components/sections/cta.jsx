"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function CTASection(){
  const router = useRouter()
  return (
    <section className="relative overflow-hidden px-4 py-16 md:px-6 lg:py-20">
      <div className="container relative z-10 mx-auto text-center">
        <h2 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl">
          Comece a otimizar seus estudos hoje
        </h2>
        <p className="mx-auto mt-4 max-w-[600px] text-xl text-purple-100 md:text-2xl font-inter">
          Junte-se a milhares de estudantes e profissionais que já transformaram sua forma de estudar e trabalhar.
        </p>
        <Button
          size="lg"
          className="mt-8 rounded-full bg-white px-8 py-3 text-lg font-semibold text-purple-600 transition-all duration-300 hover:bg-purple-100 hover:shadow-lg dark:bg-gray-100 dark:text-purple-700 dark:hover:bg-gray-200"
          onClick={() => router.push('/register')}
        >
          Experimente Grátis
        </Button>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-indigo-600 dark:from-purple-800 dark:to-indigo-900"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTYiIGhlaWdodD0iMTAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNTYiIGhlaWdodD0iMTAwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDU2IDAgTCAwIDAgMCAxMDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjIpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-10"></div>
    </section>
  )
}