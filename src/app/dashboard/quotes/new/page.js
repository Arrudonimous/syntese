"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Copy, Save, Download, FileUp, Sparkles, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { useToast } from "@/hooks/use-toast"
import { DatePicker } from "@/components/ui/date-picker"

export default function NovaCitacaoPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [quoteType, setQuoteType] = useState("manual")
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [year, setYear] = useState("")
  const [publisher, setPublisher] = useState("")
  const [url, setUrl] = useState("")
  const [doi, setDoi] = useState("")
  const [format, setFormat] = useState("ABNT")
  const [includeAccessDate, setIncludeAccessDate] = useState(true)
  const [accessDate, setAccessDate] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedCitation, setGeneratedCitation] = useState("")

  const handleGenerate = async () => {

    try {
      setIsGenerating(true)

      const response = await axios.post("/api/quotes", { title, author, year, publisher, url, doi, format, includeAccessDate, accessDate, quoteType })

      setGeneratedCitation(response.data.data)

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
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCitation)
    // You could add a toast notification here
  }

  const getDisabledGenerateButton = () => {
    if(quoteType === 'manual'){
      return !title.trim() || !author.trim() || !year.trim() || !publisher.trim() || (includeAccessDate && (accessDate === null || accessDate === undefined)) || isGenerating
    } else if (quoteType === 'DOI') {
      return !doi.trim() || (includeAccessDate && (accessDate === null || accessDate === undefined)) || isGenerating
    } else if (quoteType === 'URL') {
      return !url.trim() || (includeAccessDate && (accessDate === null || accessDate === undefined)) || isGenerating
    }
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Nova Citação" text="Gere uma citação acadêmica em diversos formatos.">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
        </Button>
      </DashboardHeader>

      <Tabs defaultValue="manual" className="space-y-4">
        <TabsList>
          <TabsTrigger value="manual" onClick={(e) => setQuoteType(e.target.textContent)}>Entrada Manual</TabsTrigger>
          <TabsTrigger value="doi" onClick={(e) => setQuoteType(e.target.textContent)}>DOI</TabsTrigger>
          <TabsTrigger value="url" onClick={(e) => setQuoteType(e.target.textContent)}>URL</TabsTrigger>
        </TabsList>

        <TabsContent value="manual" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informações da Fonte</CardTitle>
              <CardDescription>Preencha os detalhes da fonte que você deseja citar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    placeholder="Título da obra"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="author">Autor</Label>
                  <Input
                    id="author"
                    placeholder="Nome do autor"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="year">Ano</Label>
                  <Input
                    id="year"
                    placeholder="Ano de publicação"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="publisher">Editora/Periódico</Label>
                  <Input
                    id="publisher"
                    placeholder="Nome da editora ou periódico"
                    value={publisher}
                    onChange={(e) => setPublisher(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="url">URL (opcional)</Label>
                  <Input id="url" placeholder="URL da fonte" value={url} onChange={(e) => setUrl(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="doi">DOI (opcional)</Label>
                  <Input
                    id="doi"
                    placeholder="Digital Object Identifier"
                    value={doi}
                    onChange={(e) => setDoi(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="doi" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Buscar por DOI</CardTitle>
              <CardDescription>
                Insira o DOI (Digital Object Identifier) para gerar a citação automaticamente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="doi-search">DOI</Label>
                <div className="flex gap-2">
                  <Input id="doi-search" placeholder="Ex: 10.1000/xyz123" className="flex-1" onChange={(e) => setDoi(e.target.value)} />
                </div>
                <p className="text-xs text-muted-foreground">
                  O DOI é um identificador único para documentos acadêmicos. Exemplo: 10.1000/xyz123
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="url" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Extrair de URL</CardTitle>
              <CardDescription>Insira a URL de um artigo ou publicação para extrair os metadados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="url-extract">URL</Label>
                <div className="flex gap-2">
                  <Input id="url-extract" placeholder="https://exemplo.com/artigo" className="flex-1" onChange={(e) => setUrl(e.target.value)} />
                </div>
              </div>
              <div className="mt-4 flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed p-6 dark:border-gray-700">
                <FileUp className="h-8 w-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Ou arraste e solte um arquivo PDF para extrair metadados
                </p>
                <Input type="file" className="max-w-xs" accept=".pdf" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <Card>
          <CardHeader>
            <CardTitle>Opções de Formatação</CardTitle>
            <CardDescription>Personalize como você deseja que sua citação seja gerada</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="citation-format">Formato da Citação</Label>
              <Select value={format} onValueChange={setFormat}>
                <SelectTrigger id="citation-format">
                  <SelectValue placeholder="Selecione um formato" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ABNT">ABNT (Associação Brasileira de Normas Técnicas)</SelectItem>
                  <SelectItem value="APA">APA (American Psychological Association)</SelectItem>
                  <SelectItem value="MLA">MLA (Modern Language Association)</SelectItem>
                  <SelectItem value="Vancouver">Vancouver</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="include-access-date" checked={includeAccessDate} onCheckedChange={setIncludeAccessDate} />
              <Label htmlFor="include-access-date">Incluir data de acesso (para fontes online)</Label>
            </div>

            {includeAccessDate && (
              <div className="space-y-2">
                <Label htmlFor="access-date">Data de Acesso</Label>
                <DatePicker value={accessDate} onChange={setAccessDate} />
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleGenerate}
              disabled={getDisabledGenerateButton()}
              className="w-full"
            >
              {isGenerating && <Loader2 className="animate-spin" />}
              <Sparkles className="mr-2 h-4 w-4" /> Gerar Citação
            </Button>

          </CardFooter>
        </Card>

        {generatedCitation && (
          <Card>
            <CardHeader>
              <CardTitle>Citação Gerada</CardTitle>
              <CardDescription>Sua citação foi gerada no formato {format}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="whitespace-pre-line rounded-md border bg-muted p-4 dark:bg-muted/20">
                {generatedCitation}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleCopy}>
                  <Copy className="mr-2 h-4 w-4" /> Copiar
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" /> Exportar
                </Button>
              </div>
              <Button size="sm">
                <Save className="mr-2 h-4 w-4" /> Salvar Citação
              </Button>
            </CardFooter>
          </Card>
        )}
      </Tabs>
    </DashboardShell>
  )
}