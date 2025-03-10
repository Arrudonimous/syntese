"use client"
import Image from "next/image"

export default function LoadingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100  dark:from-gray-900 dark:via-purple-950/30 dark:to-indigo-950/40">
      <div className="flex flex-col items-center">
        <div className="relative mb-8">
          <div className="absolute -inset-4 animate-pulse rounded-full bg-purple-300 opacity-50 blur-xl"></div>
          <Image
            src="/images/syntese.png"
            alt="Syntese Logo"
            width={80}
            height={80}
            className="flex dark:hidden relative animate-bounce"
          />
          <Image
            src="/images/syntese-dark.png"
            alt="Syntese Logo"
            width={80}
            height={80}
            className="hidden dark:flex relative animate-bounce"
          />
        </div>

        <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-gray-100">Carregando...</h2>
        <p className="text-center text-gray-600 dark:text-gray-300">
          Estamos preparando tudo para você. Isso levará apenas alguns segundos.
        </p>

        <div className="mt-8 flex justify-center">
          <div className="flex space-x-2">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className="h-3 w-3 rounded-full bg-purple-600"
                style={{
                  animation: `bounce 1.4s infinite ease-in-out both`,
                  animationDelay: `${index * 0.16}s`,
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  )
}

