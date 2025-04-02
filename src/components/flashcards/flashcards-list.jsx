"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Brain, MoreHorizontal, Pencil, Trash2, Play, Search, Clock, BarChart, Plus, Layers } from "lucide-react"
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
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import axios from "axios"
import renderSkeletonCards from "../skeletonCards"

export function FlashcardsList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("todos")
  const [decks, setDecks] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const filteredDecks = decks.filter((deck) => {
    const matchesSearch =
      deck.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deck.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = categoryFilter === "todos" || deck.category === categoryFilter

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
    setDecks(decks.filter((deck) => deck.id !== id))
    // Here you would also call your API to delete the deck
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case "Ciências":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      case "Idiomas":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
      case "História":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
      case "Tecnologia":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const flashcardsDeck = await axios.get("/api/flashcards")

        console.log(flashcardsDeck.data.data)
        setDecks(flashcardsDeck.data.data)
      } catch (error) {
        console.error("Erro ao buscar flashcards:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar decks de flashcards..."
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
              <SelectItem value="Ciências">Ciências</SelectItem>
              <SelectItem value="Idiomas">Idiomas</SelectItem>
              <SelectItem value="História">História</SelectItem>
              <SelectItem value="Tecnologia">Tecnologia</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>



      {isLoading ? renderSkeletonCards() : filteredDecks.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <Brain className="h-10 w-10 text-muted-foreground" />
            <p className="mt-2 text-center text-muted-foreground">
              Nenhum deck de flashcards encontrado. Crie um novo deck para começar.
            </p>
            <Button asChild className="mt-4">
              <Link href="/dashboard/flashcards/novo">Criar Deck</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredDecks.map((deck) => (
              <Card key={deck.id} className="flex flex-col">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="line-clamp-1 text-lg">{deck.title}</CardTitle>
                      <Badge className={`mt-1 ${getCategoryColor(deck.category)}`} variant="secondary">
                        {deck.category}
                      </Badge>
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
                          <Link href={`/dashboard/flashcards/${deck.id}/study`}>
                            <Play className="mr-2 h-4 w-4" /> Estudar
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/flashcards/${deck.id}`}>
                            <Layers className="mr-2 h-4 w-4" /> Ver Cards
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/flashcards/${deck.id}/editar`}>
                            <Pencil className="mr-2 h-4 w-4" /> Editar
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/flashcards/${deck.id}/estatisticas`}>
                            <BarChart className="mr-2 h-4 w-4" /> Estatísticas
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleDelete(deck.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardDescription className="line-clamp-2 pt-1">{deck.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 pb-2">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progresso</span>
                      <span className="font-medium">{deck.progress}%</span>
                    </div>
                    <Progress value={deck.progress} className="h-2" />
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Layers className="mr-1 h-4 w-4" />
                        <span>{deck.cardCount} cards</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>{deck.dueCards} pendentes</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between border-t pt-3">
                  <div className="text-xs text-muted-foreground">Último estudo: {formatDate(deck.lastUpdated)}</div>
                  <Button size="sm" asChild>
                    <Link href={`/dashboard/flashcards/${deck.id}/study`}>
                      <Play className="mr-1 h-3 w-3" /> Estudar
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}

            {/* Add New Deck Card */}
            <Card className="flex flex-col border-dashed">
              <CardContent className="flex h-full flex-col items-center justify-center p-6">
                <div className="mb-4 rounded-full bg-primary/10 p-3">
                  <Plus className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-medium">Criar Novo Deck</h3>
                <p className="mb-4 text-center text-sm text-muted-foreground">
                  Adicione um novo conjunto de flashcards para estudar
                </p>
                <Button asChild>
                  <Link href="/dashboard/flashcards/new">
                    <Plus className="mr-2 h-4 w-4" /> Novo Deck
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
      )}
    </div>
  )
}

