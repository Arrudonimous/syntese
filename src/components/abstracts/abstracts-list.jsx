"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { FileText, MoreHorizontal, Trash2, Copy, Download, Search } from "lucide-react"
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
import axios from "axios"
import sliceWord from "@/utils/sliceWord"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import renderSkeletonCards from "../skeletonCards"

export function AbstractsList() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)
  const [resumos, setResumos] = useState([])
  const [deleteId, setDeleteId] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const abstracts = await axios.get("/api/abstracts")

        setResumos(abstracts.data.data)
      } catch (error) {
        console.error("Erro ao buscar abstracts:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

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

  const handleDelete = async () => {
    if (!deleteId) return

    try {
      setIsDeleting(true)
      await axios.delete(`/api/abstracts/${deleteId}`)
      setResumos(resumos.filter((resumo) => resumo.id !== deleteId))
      setIsDialogOpen(false)
    } catch (error) {
      console.error("Erro ao excluir resumo:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleCopy = (description) => {
    navigator.clipboard.writeText(description.replace(/\*\*\* \*\*\*/g, ' '))
    toast({
      title: "Texto copiado",
      description: "O conteúdo do resumo foi copiado para a área de transferência.",
    })
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

      {isLoading ? renderSkeletonCards() : filteredResumos.length === 0 ? (
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
            <Card key={resumo.id} className="flex flex-col" disabled={isDeleting}>
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
                        <Link href={`/dashboard/abstracts/${resumo.id}`}>
                          <FileText className="mr-2 h-4 w-4" /> Ver
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleCopy(resumo.description)}>
                        <Copy className="mr-2 h-4 w-4" /> Copiar
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" /> Exportar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => {
                          setDeleteId(resumo.id)
                          setIsDialogOpen(true)
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardDescription className="line-clamp-2 pt-1">{sliceWord(resumo.description)}</CardDescription>
              </CardHeader>
              <CardFooter className="flex items-center justify-between border-t pt-3">
                <div className="text-xs text-muted-foreground">{formatDate(resumo.createdAt)}</div>
                <div className="text-xs text-muted-foreground">{resumo.wordsCount} palavras</div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* AlertDialog para confirmar a exclusão */}
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
