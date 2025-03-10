"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"

export function EmailPreview({ subject, content }) {
  // Função para converter sintaxe semelhante a Markdown para HTML
  const formatContent = (text) => {
    if (!text) return ""

    // Substitui quebras de linha por tags <br>
    let formatted = text.replace(/\n/g, "<br>")

    // Negrito
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")

    // Itálico
    formatted = formatted.replace(/_(.*?)_/g, "<em>$1</em>")

    // Sublinhado
    formatted = formatted.replace(/__(.*?)__/g, "<u>$1</u>")

    // Links
    formatted = formatted.replace(
      /\[(.*?)\]$$(.*?)$$/g,
      '<a href="$2" class="text-blue-600 dark:text-blue-400 hover:underline">$1</a>',
    )

    // Listas com marcadores
    formatted = formatted.replace(/• (.*?)(?:<br>|$)/g, "<li>$1</li>")

    // Listas numeradas
    formatted = formatted.replace(/(\d+)\. (.*?)(?:<br>|$)/g, "<li>$2</li>")

    return formatted
  }

  return (
    <Card className="p-6 shadow-sm border">
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-10 w-10 border">
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@você" />
            <AvatarFallback>SN</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium">Seu Nome</p>
            <p className="text-xs text-muted-foreground">seu.email@exemplo.com</p>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-base font-medium">{subject || "Sem Assunto"}</h3>
          <div
            className="prose prose-sm dark:prose-invert max-w-none break-words"
            dangerouslySetInnerHTML={{ __html: formatContent(content) }}
          />
        </div>
      </div>
    </Card>
  )
}