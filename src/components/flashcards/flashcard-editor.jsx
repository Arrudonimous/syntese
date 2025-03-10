"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Trash2, Image, ArrowLeftRight } from "lucide-react"

export function FlashcardEditor({ index, card, onChange, onRemove, canRemove }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Card #{index}</h3>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => setFlipped(!flipped)} className="h-8 px-2 text-xs">
            <ArrowLeftRight className="mr-1 h-3.5 w-3.5" />
            {flipped ? "Ver Frente" : "Ver Verso"}
          </Button>
          {canRemove && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onRemove}
              className="h-8 px-2 text-xs text-destructive hover:text-destructive"
            >
              <Trash2 className="mr-1 h-3.5 w-3.5" />
              Remover
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className={`space-y-2 ${flipped ? "hidden sm:block" : ""}`}>
          <Label htmlFor={`front-${card.id}`}>Frente (Pergunta)</Label>
          <Textarea
            id={`front-${card.id}`}
            placeholder="Digite a pergunta ou termo"
            value={card.front}
            onChange={(e) => onChange("front", e.target.value)}
            rows={3}
            className="resize-none"
          />
        </div>
        <div className={`space-y-2 ${!flipped ? "hidden sm:block" : ""}`}>
          <Label htmlFor={`back-${card.id}`}>Verso (Resposta)</Label>
          <Textarea
            id={`back-${card.id}`}
            placeholder="Digite a resposta ou definição"
            value={card.back}
            onChange={(e) => onChange("back", e.target.value)}
            rows={3}
            className="resize-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="text-xs">
          <Image className="mr-1 h-3.5 w-3.5" />
          Adicionar Imagem
        </Button>
        <span className="text-xs text-muted-foreground">Opcional: adicione uma imagem para ajudar na memorização</span>
      </div>
    </div>
  )
}