"use client"

import React, { useState } from "react"
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
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { useEffect } from "react"
import axios from "axios"
import { Skeleton } from "../ui/skeleton"
import { useToast } from "@/hooks/use-toast"
import sliceWord from "@/utils/sliceWord"
import renderSkeletonCards from "../skeletonCards"

export function CitacoesList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [formatFilter, setFormatFilter] = useState("todos")
  const [citacoes, setCitacoes] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const { toast } = useToast()

  const filteredCitacoes = citacoes.filter((citacao) => {
    const matchesSearch =
      citacao.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      citacao.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      citacao.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesFormat = formatFilter === "todos" || citacao.quoteType === formatFilter

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

  const handleDelete = async () => {
    if (!deleteId) return

    try {
      setIsDeleting(true)
      await axios.delete(`/api/quotes/${deleteId}`)
      setIsDialogOpen(false)
    } catch (error) {
      console.error("Erro ao excluir citação:", error)
    } finally {
      setIsDeleting(false)
    }

    setCitacoes(citacoes.filter((citacao) => citacao.id !== id))

    
  }

  const formatBadgeColor = (quoteType) => {
    switch (quoteType) {
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

  const handleCopy = (description) => {
    navigator.clipboard.writeText(description)
    toast({
      title: "Texto copiado",
      description: "O conteúdo da citação foi copiado para a área de transferência.",
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)

      try {
        const res = await axios.get('/api/quotes')

        setCitacoes(res.data.data)
      } catch (error) {
        
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
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


      {isLoading ? renderSkeletonCards() : filteredCitacoes.length === 0 ? (
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
          {filteredCitacoes.map((quote) => (
            <Card key={quote.id} className="flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="line-clamp-1 text-lg">{quote.title}</CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="-mr-2 h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Ações</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleCopy(quote.description)}>
                        <Copy className="mr-2 h-4 w-4" /> Copiar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => {
                          setDeleteId(quote.id)
                          setIsDialogOpen(true)
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardDescription className="pt-1">
                  {sliceWord(quote.description)}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 pb-2">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={formatBadgeColor(quote.quoteType)} variant="secondary">
                    {quote.quoteType}
                  </Badge>
                </div>
                <ScrollArea className="h-10">
                  <div className="flex flex-wrap gap-1">
                    {quote.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter className="flex items-center justify-between border-t pt-3">
                <div className="text-xs text-muted-foreground">Criado em: {formatDate(quote.createdAt)}</div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza que deseja excluir?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. O resumo será permanentemente removido.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Excluir</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}