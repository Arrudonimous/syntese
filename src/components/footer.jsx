import Image from "next/image"
import Link from "next/link"

export const Footer = () => {
  return(
    <footer className="border-t bg-white px-4 py-6 md:px-6">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center space-x-2">
          <Image
            src="/images/syntese.png"
              alt="Syntese Logo"
              width={24}
              height={24}
            />
          <span className="text-sm text-gray-500">
            © {new Date().getFullYear()} Syntese. Todos os direitos reservados.
          </span>
        </div>
        <nav className="flex gap-4">
          <Link href="/termos" className="text-sm text-gray-500 hover:text-purple-600">
            Termos
          </Link>
          <Link href="/privacidade" className="text-sm text-gray-500 hover:text-purple-600">
            Privacidade
          </Link>
          <Link href="/contato" className="text-sm text-gray-500 hover:text-purple-600">
            Contato
          </Link>
        </nav>
      </div>
    </footer>
  )
}