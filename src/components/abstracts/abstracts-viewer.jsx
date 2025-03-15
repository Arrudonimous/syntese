"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"

export function AbstractViewer({ content }) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Determina se o conteúdo deve ser truncado
  const shouldTruncate = content.length > 800 && !isExpanded
  const displayContent = shouldTruncate ? content.substring(0, 800) + "..." : content

  // Função para formatar o conteúdo
  const formatContent = (text) => {
    return text
      // Adiciona quebra de linha antes e depois de *** e remove os ***
      .replace(/\*\*\*/g, "<br/>")
  }

  return (
    <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
      <div dangerouslySetInnerHTML={{ __html: formatContent(displayContent) }} className="leading-relaxed" />

      {content.length > 800 && (
        <div className="mt-4 print:hidden">
          <Button
            variant="ghost"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center text-muted-foreground hover:text-foreground"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="mr-1 h-4 w-4" />
                Mostrar menos
              </>
            ) : (
              <>
                <ChevronDown className="mr-1 h-4 w-4" />
                Mostrar mais
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  )
}
