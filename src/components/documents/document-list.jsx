"use client"

import { useState } from "react"
import Link from "next/link"
import { FileText, MoreHorizontal, Pencil, Trash2, Download, Search, Eye, FileUp, Plus } from "lucide-react"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Dados de exemplo para demonstração
const documentosSample = [
  {
    id: "1",
    title: "Notas de Aula - Biologia Celular",
    type: "PDF",
    size: "2.4 MB",
    created: "2023-07-15T10:30:00Z",
    category: "Aulas",
    tags: ["biologia", "celular", "notas"],
  },
  {
    id: "2",
    title: "Artigo - Inteligência Artificial na Educação",
    type: "PDF",
    size: "1.8 MB",
    created: "2023-07-12T14:45:00Z",
    category: "Artigos",
    tags: ["IA", "educação", "tecnologia"],
  },
  {
    id: "3",
    title: "Apresentação - Projeto Final",
    type: "PPTX",
    size: "5.2 MB",
    created: "2023-07-10T09:15:00Z",
    category: "Projetos",
    tags: ["apresentação", "projeto", "final"],
  },
  {
    id: "4",
    title: "Planilha de Dados - Experimento",
    type: "XLSX",
    size: "1.1 MB",
    created: "2023-07-08T16:20:00Z",
    category: "Dados",
    tags: ["planilha", "experimento", "dados"],
  },
  {
    id: "5",
    title: "Livro - Metodologia Científica",
    type: "PDF",
    size: "8.7 MB",
    created: "2023-07-05T11:30:00Z",
    category: "Livros",
    tags: ["metodologia", "científica", "pesquisa"],
  },
]

export function DocumentList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("todos")
  const [documentos, setDocumentos] = useState(documentosSample)

  const filteredDocumentos = documentos.filter((documento) => {
    const matchesSearch =
      documento.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      documento.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = categoryFilter === "todos" || documento.category === categoryFilter

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
    setDocumentos(documentos.filter((documento) => documento.id !== id))
    // Aqui você também chamaria sua API para excluir o documento
  }

  const getFileIcon = (type) => {
    switch (type) {
      case "PDF":
        return <FileText className="h-10 w-10 text-red-500" />
      case "DOCX":
        return <FileText className="h-10 w-10 text-blue-500" />
      case "PPTX":
        return <FileText className="h-10 w-10 text-orange-500" />
      case "XLSX":
        return <FileText className="h-10 w-10 text-green-500" />
      default:
        return <FileText className="h-10 w-10 text-gray-500" />
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case "Aulas":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
      case "Artigos":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
      case "Projetos":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
      case "Dados":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      case "Livros":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue="grid" className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar documentos..."
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
                <SelectItem value="Aulas">Aulas</SelectItem>
                <SelectItem value="Artigos">Artigos</SelectItem>
                <SelectItem value="Projetos">Projetos</SelectItem>
                <SelectItem value="Dados">Dados</SelectItem>
                <SelectItem value="Livros">Livros</SelectItem>
              </SelectContent>
            </Select>
            <TabsList>
              <TabsTrigger value="grid">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-grid-2x2"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M3 12h18" />
                  <path d="M12 3v18" />
                </svg>
              </TabsTrigger>
              <TabsTrigger value="list">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-list"
                >
                  <line x1="8" x2="21" y1="6" y2="6" />
                  <line x1="8" x2="21" y1="12" y2="12" />
                  <line x1="8" x2="21" y1="18" y2="18" />
                  <line x1="3" x2="3.01" y1="6" y2="6" />
                  <line x1="3" x2="3.01" y1="12" y2="12" />
                  <line x1="3" x2="3.01" y1="18" y2="18" />
                </svg>
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <TabsContent value="grid">
          {filteredDocumentos.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <FileText className="h-10 w-10 text-muted-foreground" />
                <p className="mt-2 text-center text-muted-foreground">
                  Nenhum documento encontrado. Faça upload ou crie um novo documento para começar.
                </p>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" asChild>
                    <Link href="/dashboard/documents/upload">
                      <FileUp className="mr-2 h-4 w-4" /> Fazer Upload
                    </Link>
                  </Button>
                  <Button asChild>
                    <Link href="/dashboard/documents/novo">
                      <Plus className="mr-2 h-4 w-4" /> Novo Documento
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredDocumentos.map((documento) => (
                <Card key={documento.id} className="flex flex-col">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="line-clamp-1 text-lg">{documento.title}</CardTitle>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="-mr-2 h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Ações</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/documents/${documento.id}`}>
                              <Eye className="mr-2 h-4 w-4" /> Visualizar
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/documents/${documento.id}/edit`}>
                              <Pencil className="mr-2 h-4 w-4" /> Editar
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" /> Download
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => handleDelete(documento.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" /> Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <CardDescription className="line-clamp-2 pt-1">
                      {documento.type} • {documento.size}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 pb-2">
                    <div className="flex items-center gap-4 mb-4">
                      {getFileIcon(documento.type)}
                      <div>
                        <Badge className={getCategoryColor(documento.category)} variant="secondary">
                          {documento.category}
                        </Badge>
                      </div>
                    </div>
                    <ScrollArea className="h-10">
                      <div className="flex flex-wrap gap-1">
                        {documento.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between border-t pt-3">
                    <div className="text-xs text-muted-foreground">Criado em: {formatDate(documento.created)}</div>
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/dashboard/documents/${documento.id}`}>
                        <Eye className="mr-1 h-3 w-3" /> Abrir
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}

              {/* Cartão para adicionar novo documento */}
              <Card className="flex flex-col border-dashed">
                <CardContent className="flex h-full flex-col items-center justify-center p-6">
                  <div className="mb-4 rounded-full bg-primary/10 p-3">
                    <Plus className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-lg font-medium">Adicionar Documento</h3>
                  <p className="mb-4 text-center text-sm text-muted-foreground">
                    Faça upload de um arquivo ou crie um novo documento
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" asChild>
                      <Link href="/dashboard/documents/upload">
                        <FileUp className="mr-2 h-4 w-4" /> Upload
                      </Link>
                    </Button>
                    <Button asChild>
                      <Link href="/dashboard/documents/novo">
                        <Plus className="mr-2 h-4 w-4" /> Criar
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Todos os Documentos</CardTitle>
              <CardDescription>Visualize e gerencie seus documentos em formato de lista</CardDescription>
            </CardHeader>
            <CardContent>
              {filteredDocumentos.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10">
                  <FileText className="h-10 w-10 text-muted-foreground" />
                  <p className="mt-2 text-center text-muted-foreground">
                    Nenhum documento encontrado. Faça upload ou crie um novo documento para começar.
                  </p>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" asChild>
                      <Link href="/dashboard/documents/upload">
                        <FileUp className="mr-2 h-4 w-4" /> Fazer Upload
                      </Link>
                    </Button>
                    <Button asChild>
                      <Link href="/dashboard/documents/novo">
                        <Plus className="mr-2 h-4 w-4" /> Novo Documento
                      </Link>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredDocumentos.map((documento) => (
                    <div
                      key={documento.id}
                      className="flex items-center justify-between rounded-md border p-3 hover:bg-accent/50"
                    >
                      <div className="flex items-center gap-3">
                        {getFileIcon(documento.type)}
                        <div>
                          <h4 className="font-medium">{documento.title}</h4>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>
                              {documento.type} • {documento.size}
                            </span>
                            <span>•</span>
                            <span>Criado em: {formatDate(documento.created)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost" asChild>
                          <Link href={`/dashboard/documents/${documento.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button size="sm" variant="ghost" asChild>
                          <Link href={`/dashboard/documents/${documento.id}/edit`}>
                            <Pencil className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDelete(documento.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}