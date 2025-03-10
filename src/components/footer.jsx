import Image from "next/image"
import Link from "next/link"

export const Footer = () => {
  return(
    <footer className="border-t bg-white px-4 py-6 md:px-6 dark:bg-gray-950 dark:border-gray-800">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center space-x-2">
          <Image
            src="/images/syntese.png"
              alt="Syntese Logo"
              width={24}
              height={24}
            />
          <span className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Syntese. Todos os direitos reservados.
          </span>
        </div>
        <nav className="flex gap-4">
          <Link href="/terms" className="text-sm text-gray-500 hover:text-purple-600 dark:text-gray-400">
            Termos
          </Link>
          <Link href="/privacy" className="text-sm text-gray-500 hover:text-purple-600 dark:text-gray-400">
            Privacidade
          </Link>
          <Link href="/contact" className="text-sm text-gray-500 hover:text-purple-600 dark:text-gray-400">
            Contato
          </Link>
        </nav>
      </div>
    </footer>
  )
}