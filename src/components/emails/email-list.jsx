"use client"

import { useState } from "react"
import Link from "next/link"
import { Mail, MoreHorizontal, Pencil, Trash2, Copy, Send, Search, Star, StarOff, Plus } from "lucide-react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Dados de exemplo para demonstração
const emailsSample = [
  {
    id: "1",
    title: "Acompanhamento de Candidatura",
    preview: "Agradeço a oportunidade de entrevista para a posição...",
    created: "2023-07-15T10:30:00Z",
    category: "Profissional",
    tags: ["emprego", "acompanhamento", "entrevista"],
    favorite: true,
  },
  {
    id: "2",
    title: "Atualização de Status do Projeto",
    preview: "Escrevo para fornecer uma atualização sobre o status atual do projeto...",
    created: "2023-07-12T14:45:00Z",
    category: "Trabalho",
    tags: ["projeto", "atualização", "status"],
    favorite: false,
  },
  {
    id: "3",
    title: "Solicitação de Reunião com Professor",
    preview: "Espero que esteja bem. Gostaria de agendar uma reunião...",
    created: "2023-07-10T09:15:00Z",
    category: "Acadêmico",
    tags: ["reunião", "professor", "solicitação"],
    favorite: true,
  },
  {
    id: "4",
    title: "Consulta ao Suporte ao Cliente",
    preview: "Recentemente adquiri seu produto e tenho enfrentado um problema...",
    created: "2023-07-08T16:20:00Z",
    category: "Atendimento",
    tags: ["suporte", "consulta", "produto"],
    favorite: false,
  },
]

export function EmailList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("todos")
  const [emails, setEmails] = useState(emailsSample)

  const filteredEmails = emails.filter((email) => {
    const matchesSearch =
      email.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.preview.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = categoryFilter === "todos" || email.category === categoryFilter

    return matchesSearch && matchesCategory
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
    setEmails(emails.filter((email) => email.id !== id))
    // Aqui você também chamaria sua API para excluir o e-mail
  }

  const toggleFavorite = (id) => {
    setEmails(emails.map((email) => (email.id === id ? { ...email, favorite: !email.favorite } : email)))
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case "Profissional":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
      case "Trabalho":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
      case "Acadêmico":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      case "Atendimento":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
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
            placeholder="Buscar e-mails..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todas as categorias</SelectItem>
              <SelectItem value="Profissional">Profissional</SelectItem>
              <SelectItem value="Trabalho">Trabalho</SelectItem>
              <SelectItem value="Acadêmico">Acadêmico</SelectItem>
              <SelectItem value="Atendimento">Atendimento ao Cliente</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredEmails.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <Mail className="h-10 w-10 text-muted-foreground" />
            <p className="mt-2 text-center text-muted-foreground">
              Nenhum e-mail encontrado. Crie um novo e-mail para começar.
            </p>
            <Button asChild className="mt-4">
              <Link href="/dashboard/emails/new">Criar E-mail</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredEmails.map((email) => (
            <Card key={email.id} className="flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-2">
                    <CardTitle className="line-clamp-1 text-lg">{email.title}</CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-amber-500 dark:text-amber-400"
                      onClick={() => toggleFavorite(email.id)}
                    >
                      {email.favorite ? <Star className="h-4 w-4 fill-current" /> : <StarOff className="h-4 w-4" />}
                      <span className="sr-only">Favorito</span>
                    </Button>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="-mr-2 h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Ações</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/emails/${email.id}`}>
                          <Mail className="mr-2 h-4 w-4" /> Visualizar
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/emails/${email.id}/edit`}>
                          <Pencil className="mr-2 h-4 w-4" /> Editar
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          navigator.clipboard.writeText(email.preview)
                        }}
                      >
                        <Copy className="mr-2 h-4 w-4" /> Copiar Texto
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Send className="mr-2 h-4 w-4" /> Enviar E-mail
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => handleDelete(email.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardDescription className="line-clamp-2 pt-1">{email.preview}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 pb-2">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={getCategoryColor(email.category)} variant="secondary">
                    {email.category}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-1">
                  {email.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between border-t pt-3">
                <div className="text-xs text-muted-foreground">Criado em: {formatDate(email.created)}</div>
                <Button size="sm" variant="outline" asChild>
                  <Link href={`/dashboard/emails/${email.id}`}>
                    <Mail className="mr-1 h-3 w-3" /> Abrir
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}

          {/* Cartão para adicionar novo e-mail */}
          <Card className="flex flex-col border-dashed">
            <CardContent className="flex h-full flex-col items-center justify-center p-6">
              <div className="mb-4 rounded-full bg-primary/10 p-3">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-medium">Criar Novo E-mail</h3>
              <p className="mb-4 text-center text-sm text-muted-foreground">
                Gere e-mails profissionais rapidamente com assistência de IA
              </p>
              <Button asChild>
                <Link href="/dashboard/emails/new">
                  <Plus className="mr-2 h-4 w-4" /> Novo E-mail
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}