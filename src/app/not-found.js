import Link from "next/link"
import Image from "next/image"
import { Home, Search } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-purple-950/30 dark:to-indigo-950/40">
      <main className="flex flex-1 items-center justify-center px-4 py-12 md:px-6 lg:py-16">
        <div className="container mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="relative mb-8 h-40 w-40">
            <div className="absolute -left-4 -top-4 h-40 w-40 animate-pulse rounded-full bg-purple-300 opacity-50 blur-xl"></div>
            <div className="absolute -bottom-4 -right-4 h-40 w-40 animate-pulse rounded-full bg-blue-300 opacity-50 blur-xl"></div>
            <div className="relative flex h-full w-full items-center justify-center rounded-full bg-white shadow-lg dark:bg-gray-800">
              <span className="text-7xl font-bold text-gray-900 dark:text-gray-100">404</span>
            </div>
          </div>

          <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-gray-100">Página não encontrada</h1>

          <p className="mb-8 text-xl text-gray-600 dark:text-gray-300">
            Ops! Parece que você se perdeu. A página que você está procurando não existe ou foi movida.
          </p>

          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Button asChild className="bg-purple-600 hover:bg-purple-700">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Voltar para a página inicial
              </Link>
            </Button>

            <Button asChild variant="outline">
              <Link href="/contact">
                <Search className="mr-2 h-4 w-4" />
                Procurar ajuda
              </Link>
            </Button>
          </div>

          <div className="mt-12 flex items-center justify-center">
            <Image
              src="/images/syntese.png"
              alt="Syntese Logo"
              width={32}
              height={32}
              className="flex dark:hidden mr-2"
            />
            <Image
              src="/images/syntese-dark.png"
              alt="Syntese Logo"
              width={32}
              height={32}
              className="hidden dark:flex mr-2"
            />
            <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">Syntese</span>
          </div>
        </div>
      </main>
    </div>
  )
}

