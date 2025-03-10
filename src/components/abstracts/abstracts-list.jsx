"use client"

import { useState } from "react"
import Link from "next/link"
import { FileText, MoreHorizontal, Pencil, Trash2, Copy, Download, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

// Sample data for demonstration
const resumosSample = [
  {
    id: "1",
    title: "Inteligência Artificial na Educação",
    excerpt: "Este resumo aborda como a IA está transformando o cenário educacional...",
    date: "2023-07-15T10:30:00Z",
    tags: ["educação", "tecnologia", "IA"],
    wordCount: 250,
  },
  {
    id: "2",
    title: "Métodos de Estudo Eficientes",
    excerpt: "Uma análise dos métodos de estudo mais eficientes para estudantes universitários...",
    date: "2023-07-10T14:45:00Z",
    tags: ["estudo", "produtividade", "universidade"],
    wordCount: 320,
  },
  {
    id: "3",
    title: "O Futuro do Trabalho Remoto",
    excerpt: "Este resumo explora as tendências e desafios do trabalho remoto no mundo pós-pandemia...",
    date: "2023-07-05T09:15:00Z",
    tags: ["trabalho", "remoto", "tendências"],
    wordCount: 280,
  },
  {
    id: "4",
    title: "Sustentabilidade Empresarial",
    excerpt: "Uma análise das práticas sustentáveis adotadas por grandes empresas...",
    date: "2023-06-28T16:20:00Z",
    tags: ["sustentabilidade", "empresas", "meio ambiente"],
    wordCount: 310,
  },
]

export function AbstractsList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [resumos, setResumos] = useState(resumosSample)

  const filteredResumos = resumos.filter(
    (resumo) =>
      resumo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resumo.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date)
  }

  const handleDelete = (id) => {
    setResumos(resumos.filter((resumo) => resumo.id !== id))
    // Here you would also call your API to delete the resumo
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por título ou tag..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {filteredResumos.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <FileText className="h-10 w-10 text-muted-foreground" />
            <p className="mt-2 text-center text-muted-foreground">
              Nenhum resumo encontrado. Crie um novo resumo para começar.
            </p>
            <Button asChild className="mt-4">
              <Link href="/dashboard/abstracts/new">Criar Resumo</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredResumos.map((resumo) => (
            <Card key={resumo.id} className="flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="line-clamp-1 text-lg">{resumo.title}</CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="-mr-2 h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Ações</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/resumos/${resumo.id}`}>
                          <FileText className="mr-2 h-4 w-4" /> Ver
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/resumos/${resumo.id}/editar`}>
                          <Pencil className="mr-2 h-4 w-4" /> Editar
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="mr-2 h-4 w-4" /> Copiar
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" /> Exportar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => handleDelete(resumo.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardDescription className="line-clamp-2 pt-1">{resumo.excerpt}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 pb-2">
                <ScrollArea className="h-10">
                  <div className="flex flex-wrap gap-1">
                    {resumo.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter className="flex items-center justify-between border-t pt-3">
                <div className="text-xs text-muted-foreground">{formatDate(resumo.date)}</div>
                <div className="text-xs text-muted-foreground">{resumo.wordCount} palavras</div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}