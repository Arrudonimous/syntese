"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Save, Plus, FileUp, Sparkles } from "lucide-react"
import { FlashcardEditor } from "@/components/flashcards/flashcard-editor"
import { useRouter } from "next/navigation"
import axios from "axios"
import { useToast } from "@/hooks/use-toast"

export default function NovoFlashcardDeckPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isGeneratingCardsByIA, setIsGeneratingCardsByIA] = useState(false)
  const [cards, setCards] = useState([
    { id: Date.now().toString(), front: "", back: "" }
  ])

  const [descriptionByIA, setDescriptionByIA] = useState("")
  const [generateType, setGenerateType] = useState("manual")
  const [cardsGenerateQTD, setCardsGenerateQTD] = useState("10")
  const [cardsGenerateDifficulty, setCardsGenerateDifficulty] = useState("medio")

  const handleAddCard = () => {
    setCards([...cards, { id: Date.now().toString(), front: "", back: "" }])
  }

  const handleRemoveCard = (id) => {
    if (cards.length <= 1) return
    setCards(cards.filter((card) => card.id !== id))
  }

  const handleCardChange = (id, field, value) => {
    setCards(cards.map((card) => (card.id === id ? { ...card, [field]: value } : card)))
  }

  const handleSaveDeck = async () => {
    try {
      setIsGenerating(true)

      const response = await axios.post("/api/flashcards", { 
        title, description, category, cards, generateByIA: generateType === 'ai', descriptionByIA, cardsGenerateQTD, cardsGenerateDifficulty
      })

      toast({
        description: response.data.message,
      })
    } catch (error) {
      console.log(error)
      const response = error.response.data
      toast({
        description: response.message,
      })
    } finally {
      setIsGenerating(false)
    }

    router.back()
  }

  const handleGenerateFromText = async () => {
    try {
      setIsGeneratingCardsByIA(true)
      const response = await axios.post(`/api/flashcards/IA`, {
        descriptionByIA,
        cardsGenerateQTD,
        cardsGenerateDifficulty
      })

      setCards(response.data.data)

      toast({
        description: response.data.message,
      })
    } catch (error) {
      console.log(error)
      const response = error.response.data
      toast({
        description: response.message,
      })
    } finally {
      setIsGeneratingCardsByIA(false)
    }
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Novo Deck de Flashcards" text="Crie um conjunto de flashcards para estudo.">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
        </Button>
      </DashboardHeader>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Informações do Deck</CardTitle>
            <CardDescription>Configure as informações básicas do seu deck de flashcards</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                placeholder="Ex: Biologia Celular"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                placeholder="Uma breve descrição sobre o conteúdo deste deck"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ciências">Ciências</SelectItem>
                    <SelectItem value="Idiomas">Idiomas</SelectItem>
                    <SelectItem value="História">História</SelectItem>
                    <SelectItem value="Tecnologia">Tecnologia</SelectItem>
                    <SelectItem value="Matemática">Matemática</SelectItem>
                    <SelectItem value="Literatura">Literatura</SelectItem>
                    <SelectItem value="Outros">Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-4 pt-2">
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="manual" className="space-y-4">
          <TabsList>
            <TabsTrigger value="manual" onClick={() => setGenerateType("manual")}>Criação Manual</TabsTrigger>
            <TabsTrigger value="ai" onClick={() => setGenerateType("ai")}>Geração por IA</TabsTrigger>
            <TabsTrigger value="import" onClick={() => setGenerateType("import")}>Importar</TabsTrigger>
          </TabsList>

          <TabsContent value="manual" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>Flashcards</CardTitle>
                  <Button onClick={handleAddCard} variant="outline" size="sm">
                    <Plus className="mr-1 h-4 w-4" /> Adicionar Card
                  </Button>
                </div>
                <CardDescription>
                  Crie seus flashcards manualmente. Cada card tem um lado frontal (pergunta) e um verso (resposta).
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {cards.map((card, index) => (
                  <FlashcardEditor
                    key={card.id}
                    index={index + 1}
                    card={card}
                    onChange={(field, value) => handleCardChange(card.id, field, value)}
                    onRemove={() => handleRemoveCard(card.id)}
                    canRemove={cards.length > 1}
                  />
                ))}
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-6">
                <Button variant="outline" onClick={handleAddCard}>
                  <Plus className="mr-2 h-4 w-4" /> Adicionar Card
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="ai" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Geração por IA</CardTitle>
                <CardDescription>
                  Gere flashcards automaticamente a partir de um texto ou tópico usando nossa inteligência artificial.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="source-text">Texto de Origem</Label>
                  <Textarea
                    id="source-text"
                    placeholder="Cole aqui o texto do qual você deseja gerar flashcards..."
                    rows={8}
                    onChange={(e) => setDescriptionByIA(e.target.value)}
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="card-count">Número de Cards</Label>
                    <Select defaultValue={cardsGenerateQTD} onValueChange={setCardsGenerateQTD}>
                      <SelectTrigger id="card-count">
                        <SelectValue placeholder="Quantidade de cards" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 cards</SelectItem>
                        <SelectItem value="10">10 cards</SelectItem>
                        <SelectItem value="15">15 cards</SelectItem>
                        <SelectItem value="20">20 cards</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Nível de Dificuldade</Label>
                    <Select defaultValue={cardsGenerateDifficulty} onValueChange={setCardsGenerateDifficulty} >
                      <SelectTrigger id="difficulty">
                        <SelectValue placeholder="Dificuldade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="facil">Fácil</SelectItem>
                        <SelectItem value="medio">Médio</SelectItem>
                        <SelectItem value="dificil">Difícil</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button className="w-full" onClick={handleGenerateFromText} disabled={isGeneratingCardsByIA}>
                  <Sparkles className="mr-2 h-4 w-4" /> Gerar Flashcards
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>Flashcards</CardTitle>
                  <Button onClick={handleAddCard} variant="outline" size="sm">
                    <Plus className="mr-1 h-4 w-4" /> Adicionar Card
                  </Button>
                </div>
                <CardDescription>
                  Cards gerados via IA
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {cards.map((card, index) => (
                  <FlashcardEditor
                    key={card.id}
                    index={index + 1}
                    card={card}
                    onChange={(field, value) => handleCardChange(card.id, field, value)}
                    onRemove={() => handleRemoveCard(card.id)}
                    canRemove={cards.length > 1}
                  />
                ))}
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-6">
                <Button variant="outline" onClick={handleAddCard}>
                  <Plus className="mr-2 h-4 w-4" /> Adicionar Card
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="import" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Importar Flashcards</CardTitle>
                <CardDescription>Importe flashcards de arquivos CSV, Excel ou de outros aplicativos.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg border border-dashed p-10 text-center dark:border-gray-700">
                  <FileUp className="mx-auto h-10 w-10 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    Arraste e solte seu arquivo aqui ou clique para selecionar
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">Suporta CSV, Excel (.xlsx), Anki (.apkg)</p>
                  <Button variant="outline" className="mt-4">
                    Selecionar Arquivo
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label>Formato de Exemplo</Label>
                  <div className="rounded-md bg-muted p-4 dark:bg-muted/20">
                    <code className="text-xs">
                      frente,verso
                      <br />
                      "O que é fotossíntese?","Processo pelo qual plantas convertem luz solar em energia química"
                      <br />
                      "Quais são as principais organelas da célula?","Núcleo, mitocôndria, ribossomos, retículo
                      endoplasmático, complexo de Golgi, lisossomos"
                    </code>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end">
          <Button size="lg" onClick={handleSaveDeck} disabled={!title.trim() || !description.trim() || !category.trim() || cards.length === 0 || isGenerating || isGeneratingCardsByIA}>
            {isGenerating ? (
              <><Save className="mr-2 h-4 w-4" /> Salvando Deck</>
            ) : (
              <>
                  <Save className="mr-2 h-4 w-4" /> Salvar Deck
              </>
            )}
          </Button>
        </div>
      </div>
    </DashboardShell>
  )
}

