"use client"

import { useState } from "react"
import Link from "next/link"
import { BookOpen, MoreHorizontal, Pencil, Trash2, Copy, Download, Search, Filter } from "lucide-react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample data for demonstration
const citacoesSample = [
  {
    id: "1",
    title: "Inteligência Artificial: Uma Abordagem Moderna",
    author: "Stuart Russell e Peter Norvig",
    year: "2020",
    publisher: "Pearson",
    format: "ABNT",
    date: "2023-07-15T10:30:00Z",
    tags: ["IA", "computação", "livro"],
  },
  {
    id: "2",
    title: "O Impacto da Tecnologia na Educação",
    author: "Maria Silva",
    year: "2021",
    publisher: "Revista Brasileira de Educação",
    format: "APA",
    date: "2023-07-10T14:45:00Z",
    tags: ["educação", "tecnologia", "artigo"],
  },
  {
    id: "3",
    title: "Desenvolvimento Sustentável: Desafios e Oportunidades",
    author: "João Santos et al.",
    year: "2019",
    publisher: "Editora Ambiente",
    format: "Vancouver",
    date: "2023-07-05T09:15:00Z",
    tags: ["sustentabilidade", "meio ambiente", "livro"],
  },
  {
    id: "4",
    title: "A Neurociência da Aprendizagem",
    author: "Carlos Oliveira",
    year: "2022",
    publisher: "Journal of Neuroscience",
    format: "MLA",
    date: "2023-06-28T16:20:00Z",
    tags: ["neurociência", "aprendizagem", "artigo"],
  },
]

export function CitacoesList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [formatFilter, setFormatFilter] = useState("todos")
  const [citacoes, setCitacoes] = useState(citacoesSample)

  const filteredCitacoes = citacoes.filter((citacao) => {
    const matchesSearch =
      citacao.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      citacao.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      citacao.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesFormat = formatFilter === "todos" || citacao.format === formatFilter

    return matchesSearch && matchesFormat
  })

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date)
  }

  const handleDelete = (id) => {
    setCitacoes(citacoes.filter((citacao) => citacao.id !== id))
    // Here you would also call your API to delete the citation
  }

  const formatBadgeColor = (format) => {
    switch (format) {
      case "ABNT":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
      case "APA":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      case "MLA":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
      case "Vancouver":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por título, autor ou tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={formatFilter} onValueChange={setFormatFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Formato" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os formatos</SelectItem>
              <SelectItem value="ABNT">ABNT</SelectItem>
              <SelectItem value="APA">APA</SelectItem>
              <SelectItem value="MLA">MLA</SelectItem>
              <SelectItem value="Vancouver">Vancouver</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredCitacoes.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <BookOpen className="h-10 w-10 text-muted-foreground" />
            <p className="mt-2 text-center text-muted-foreground">
              Nenhuma citação encontrada. Crie uma nova citação para começar.
            </p>
            <Button asChild className="mt-4">
              <Link href="/dashboard/quotes/new">Criar Citação</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredCitacoes.map((citacao) => (
            <Card key={citacao.id} className="flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="line-clamp-1 text-lg">{citacao.title}</CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="-mr-2 h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Ações</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/quotes/${citacao.id}`}>
                          <BookOpen className="mr-2 h-4 w-4" /> Ver
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/quotes/${citacao.id}/edit`}>
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
                        onClick={() => handleDelete(citacao.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardDescription className="line-clamp-2 pt-1">
                  {citacao.author}, {citacao.year}. {citacao.publisher}.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 pb-2">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={formatBadgeColor(citacao.format)} variant="secondary">
                    {citacao.format}
                  </Badge>
                </div>
                <ScrollArea className="h-10">
                  <div className="flex flex-wrap gap-1">
                    {citacao.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter className="flex items-center justify-between border-t pt-3">
                <div className="text-xs text-muted-foreground">Criado em: {formatDate(citacao.date)}</div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}