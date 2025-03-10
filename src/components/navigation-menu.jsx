"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/mode-toggle";

export function NavigationMenu() {
  const router = useRouter();
  const { isLogged, setIsLogged, handleLoggout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm dark:bg-gray-950/80 dark:border-gray-800">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex space-x-3">
          <Link href="/" className="lg:flex items-center hidden sm:block">
            <Image
              src="/images/syntese.png"
              alt="Syntese Logo"
              width={32}
              height={32}
              className="flex dark:hidden"
            />
            <Image
              src="/images/syntese-dark.png"
              alt="Syntese Logo"
              width={32}
              height={32}
              className="hidden dark:flex"
            />
          </Link>
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-semibold">Syntese</span>
          </Link>
        </div>
        {!isLogged && (
          <nav className="hidden gap-6 md:flex">
            <Link href="/features" className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
              Funcionalidades
            </Link>
            <Link href="/pricing" className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
              Preços
            </Link>
            <Link href="/about" className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
              Sobre
            </Link>
            <Link href="/contact" className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
              Contato
            </Link>
          </nav>
        )}

        <div className="flex items-center gap-4">
          <ModeToggle />
          {!isLogged ? (
            <>
              <Button variant="ghost" className="hidden md:inline-flex" onClick={() => router.push("/login")}>
                Entrar
              </Button>
              <Button className="hidden bg-purple-600 hover:bg-purple-700 md:inline-flex dark:bg-purple-700 dark:hover:bg-purple-800" onClick={() => router.push("/register")}>
                Começar Grátis
              </Button>
            </>
          ) : (
            <>
              <Button className="hidden bg-purple-600 hover:bg-purple-700 md:inline-flex dark:bg-purple-700 dark:hover:bg-purple-800" onClick={() => router.push("/dashboard")}>
                Dashboard
              </Button>
              <Button variant="ghost" className="hidden md:inline-flex" onClick={handleLoggout}>
                Sair
              </Button>
            </>
          )}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Image
                  src="/images/syntese.png"
                  alt="Syntese Logo"
                  width={24}
                  height={24}
                  className="flex dark:hidden"
                />
                <Image
                  src="/images/syntese-dark.png"
                  alt="Syntese Logo"
                  width={24}
                  height={24}
                  className="hidden dark:flex"
                />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-4">
                <Link href="/features" className="text-lg font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                  Funcionalidades
                </Link>
                <Link href="/pricing" className="text-lg font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                  Preços
                </Link>
                <Link href="/about" className="text-lg font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                  Sobre
                </Link>
                <Link href="/contact" className="text-lg font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                  Contato
                </Link>
                {isLogged ? (
                  <>
                    <Button className="mt-4 w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800" onClick={() => router.push('/register')}>
                      Começar Grátis
                    </Button>
                    <Button variant="outline" className="w-full" onClick={() => router.push('/login')}>
                      Entrar
                    </Button>
                  </>
                ) : (
                  <>
                    <Button className="mt-4 w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800" onClick={() => router.push('/dashboard')}>
                      Dashboard
                    </Button>
                    <Button variant="outline" className="w-full" onClick={handleLoggout}>
                      Sair
                    </Button>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
