"use client"
import Image from "next/image"
import Link from "next/link"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export function NavigationMenu() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex space-x-3">
          <Link href="/" className="lg:flex items-center hidden sm:block">
            <Image
              src="/images/syntese.png"
              alt="Syntese Logo"
              width={32}
              height={32}
            />
          </Link>
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-semibold">Syntese</span>
          </Link>
        </div>
        <nav className="hidden gap-6 md:flex">
          <Link href="/features" className="text-sm font-medium text-gray-500 hover:text-gray-900">
            Funcionalidades
          </Link>
          <Link href="/pricing" className="text-sm font-medium text-gray-500 hover:text-gray-900">
            Preços
          </Link>
          <Link href="/about" className="text-sm font-medium text-gray-500 hover:text-gray-900">
            Sobre
          </Link>
          <Link href="/contact" className="text-sm font-medium text-gray-500 hover:text-gray-900">
            Contato
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="hidden md:inline-flex">
            Entrar
          </Button>
          <Button className="hidden bg-purple-600 hover:bg-purple-700 md:inline-flex">Começar Grátis</Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Image
                  src="/images/syntese.png"
                  alt="Syntese Logo"
                  width={24}
                  height={24}
                />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-4">
                <Link href="/features" className="text-lg font-medium text-gray-500 hover:text-gray-900">
                  Funcionalidades
                </Link>
                <Link href="/pricing" className="text-lg font-medium text-gray-500 hover:text-gray-900">
                  Preços
                </Link>
                <Link href="/about" className="text-lg font-medium text-gray-500 hover:text-gray-900">
                  Sobre
                </Link>
                <Link href="/contact" className="text-lg font-medium text-gray-500 hover:text-gray-900">
                  Contato
                </Link>
                <Button className="mt-4 w-full bg-purple-600 hover:bg-purple-700">Começar Grátis</Button>
                <Button variant="outline" className="w-full">
                  Entrar
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

