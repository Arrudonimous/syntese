"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Copy, Download, Share2, Star, StarOff, Printer } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { AbstractViewer } from "@/components/abstracts/abstracts-viewer"
import { AbstractMetadata } from "@/components/abstracts/abstracts-metadata"
import axios from "axios"
import { Skeleton } from "@/components/ui/skeleton"

export default function ResumoViewPage() {
  const router = useRouter()
  const params = useParams()
  const abstractId = params.id
  const [abstract, setAbstract] = useState()
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const abstract = await axios.get(`/api/abstracts/${abstractId}`)

        setAbstract(abstract.data.data)
      } catch (error) {
        console.error("Erro ao buscar abstract:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleCopy = () => {
    navigator.clipboard.writeText(abstract.description)
    toast({
      title: "Texto copiado",
      description: "O conteúdo do resumo foi copiado para a área de transferência.",
    })
  }

  const handleDownload = () => {
    // Criando um blob com o conteúdo do resumo
    const blob = new Blob([abstract.description.replace(/\*\*\* \*\*\*/g, ' ')], { type: "text/plain" })
    const url = URL.createObjectURL(blob)

    // Criando um link temporário para download
    const a = document.createElement("a")
    a.href = url
    a.download = `${abstract.title.replace(/\s+/g, "_")}.txt`
    document.body.appendChild(a)
    a.click()

    // Limpeza
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Download iniciado",
      description: "O resumo está sendo baixado como arquivo de texto.",
    })
  }

  const handleShare = () => {
    // Aqui você implementaria a lógica de compartilhamento
    // Por exemplo, abrir um modal com opções de compartilhamento
    toast({
      title: "Compartilhar",
      description: "Funcionalidade de compartilhamento seria aberta aqui.",
    })
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <DashboardShell>
      <DashboardHeader heading={isLoading ? '' : abstract.title} text="Visualização do resumo gerado.">
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Button onClick={() => router.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
            </Button>
          </Button>
        </div>
      </DashboardHeader>

      <div className="space-y-6 print:space-y-8">
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2 print:shadow-none print:border-none">
            <CardHeader className="print:pb-0">
              {isLoading ? <Skeleton className="w-full h-10 rounded-xl" /> : (
                <div className="flex flex-wrap gap-2 print:hidden">
                  {abstract.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </CardHeader>
            <CardContent>
              {isLoading ? <Skeleton className="w-full h-[500px] rounded-xl" /> : <AbstractViewer content={abstract.description} />}
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6 print:hidden">

              {isLoading ? <Skeleton className="w-full h-20 rounded-xl" /> : (
                <>
                  <div className="text-sm text-muted-foreground">
                    {abstract.wordsCount} palavras ({abstract.originalWordsCount} do original)
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleCopy}>
                      <Copy className="mr-2 h-4 w-4" /> Copiar
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleDownload}>
                      <Download className="mr-2 h-4 w-4" /> Baixar
                    </Button>
                    <Button variant="outline" size="sm" onClick={handlePrint}>
                      <Printer className="mr-2 h-4 w-4" /> Imprimir
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleShare}>
                      <Share2 className="mr-2 h-4 w-4" /> Compartilhar
                    </Button>
                  </div>
                </>
              )}

            </CardFooter>
          </Card>

          <div className="space-y-6 print:hidden">
            <AbstractMetadata resumo={abstract} isLoading={isLoading} />

            <Card>
              <CardHeader className="pb-3">
                <h3 className="text-lg font-medium">Ações Rápidas</h3>
              </CardHeader>
              <CardContent className="space-y-2">
                {isLoading ? <Skeleton className="w-full h-20 rounded-xl" /> : (
                  <>
                    <Button className="w-full justify-start" variant="outline" asChild>
                      <Link href={`/dashboard/resumos/new?source=${abstractId}`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2"
                        >
                          <path d="M16 3H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Z" />
                          <path d="M16 3v4h4" />
                          <path d="m14 15-4-4 4-4" />
                        </svg>
                        Criar novo resumo similar
                      </Link>
                    </Button>
                    <Button className="w-full justify-start" variant="outline" asChild>
                      <Link href={`/dashboard/flashcards/new?source=${abstractId}`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2"
                        >
                          <rect width="18" height="18" x="3" y="3" rx="2" />
                          <path d="M3 9h18" />
                        </svg>
                        Gerar flashcards a partir deste resumo
                      </Link>
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                      >
                        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                        <polyline points="16 6 12 2 8 6" />
                        <line x1="12" x2="12" y1="2" y2="15" />
                      </svg>
                      Exportar para PDF
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}