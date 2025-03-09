"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";

export function NavigationMenu() {
  const router = useRouter();
  const { isLogged, setIsLogged, checkAuth } = useAuth();

  const handleLoggout = async () => {
    await axios.post("/api/logout");
    setIsLogged(false);
    router.push("/");
  };

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
        {!isLogged && (
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
        )}

        <div className="flex items-center gap-4">
          {!isLogged ? (
            <>
              <Button variant="ghost" className="hidden md:inline-flex" onClick={() => router.push("/login")}>
                Entrar
              </Button>
              <Button className="hidden bg-purple-600 hover:bg-purple-700 md:inline-flex" onClick={() => router.push("/register")}>
                Começar Grátis
              </Button>
            </>
          ) : (
            <>
              <Button className="hidden bg-purple-600 hover:bg-purple-700 md:inline-flex" onClick={() => router.push("/dashboard")}>
                Dashboard
              </Button>
              <Button variant="ghost" className="hidden md:inline-flex" onClick={handleLoggout}>
                Sair
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
