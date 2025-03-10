"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Bold, Italic, List, ListOrdered, Underline, LinkIcon } from "lucide-react"

export function EmailEditor({ value, onChange, placeholder }) {
  const [selection, setSelection] = useState(null)

  const handleTextareaSelect = (e) => {
    const target = e.target
    setSelection({
      start: target.selectionStart,
      end: target.selectionEnd,
    })
  }

  const applyFormat = (prefix, suffix = prefix) => {
    if (!selection) return

    const newText =
      value.substring(0, selection.start) +
      prefix +
      value.substring(selection.start, selection.end) +
      suffix +
      value.substring(selection.end)

    onChange(newText)
  }

  const insertList = (ordered) => {
    if (!selection) return

    const selectedText = value.substring(selection.start, selection.end)
    const lines = selectedText.split("\n")

    let formattedText = ""
    if (ordered) {
      formattedText = lines.map((line, i) => `${i + 1}. ${line}`).join("\n")
    } else {
      formattedText = lines.map((line) => `• ${line}`).join("\n")
    }

    const newText = value.substring(0, selection.start) + formattedText + value.substring(selection.end)

    onChange(newText)
  }

  const insertLink = () => {
    if (!selection) return

    const selectedText = value.substring(selection.start, selection.end)
    const linkText = selectedText || "texto do link"

    const newText = value.substring(0, selection.start) + `[${linkText}](url)` + value.substring(selection.end)

    onChange(newText)
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1 p-1 border rounded-md bg-muted/40">
        <Button variant="ghost" size="sm" onClick={() => applyFormat("**")} className="h-8 px-2 text-xs">
          <Bold className="h-3.5 w-3.5" />
          <span className="sr-only">Negrito</span>
        </Button>
        <Button variant="ghost" size="sm" onClick={() => applyFormat("_")} className="h-8 px-2 text-xs">
          <Italic className="h-3.5 w-3.5" />
          <span className="sr-only">Itálico</span>
        </Button>
        <Button variant="ghost" size="sm" onClick={() => applyFormat("__")} className="h-8 px-2 text-xs">
          <Underline className="h-3.5 w-3.5" />
          <span className="sr-only">Sublinhado</span>
        </Button>
        <Button variant="ghost" size="sm" onClick={() => insertList(false)} className="h-8 px-2 text-xs">
          <List className="h-3.5 w-3.5" />
          <span className="sr-only">Lista com Marcadores</span>
        </Button>
        <Button variant="ghost" size="sm" onClick={() => insertList(true)} className="h-8 px-2 text-xs">
          <ListOrdered className="h-3.5 w-3.5" />
          <span className="sr-only">Lista Numerada</span>
        </Button>
        <Button variant="ghost" size="sm" onClick={insertLink} className="h-8 px-2 text-xs">
          <LinkIcon className="h-3.5 w-3.5" />
          <span className="sr-only">Inserir Link</span>
        </Button>
      </div>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        onSelect={handleTextareaSelect}
        className="min-h-[300px] font-mono text-sm"
      />
      <p className="text-xs text-muted-foreground">
        Você pode usar formatação Markdown: **negrito**, _itálico_, __sublinhado__, e [links](url).
      </p>
    </div>
  )
}