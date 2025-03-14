"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { FileUp, Sparkles, ArrowLeft, Copy, Save, Download } from "lucide-react"
import { useRouter } from 'next/navigation'
import axios from "axios"
import { useToast } from "@/hooks/use-toast"

export default function NovoResumoPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [prompt, setPrompt] = useState("")
  const [abstractSize, setAbstractSize] = useState([50])
  const [abstractType, setAbstractType] = useState("conciso")
  const [includeKeyPoints, setIncludeKeyPoints] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedAbstract, setGeneratedAbstract] = useState("")

  const handleGenerate = async () => {
    if (!prompt.trim()) return


    try {
      setIsGenerating(true)
      const abstractSizeValue = abstractSize[0]
      const response = await axios.post("/api/abstracts", { prompt, abstractType, abstractSize: abstractSizeValue, includeKeyPoints })

      console.log(response.data)

      setGeneratedAbstract(response.data.data)

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

    // Simulate API call with timeout
//     setTimeout(() => {
//       // This is where you would call your actual API
//       const fakeSummary = `Este é um resumo automático gerado com base no texto fornecido. O resumo foi configurado para ser ${abstractType} e ter aproximadamente ${abstractSize}% do tamanho original.

// O texto aborda temas importantes relacionados à educação e tecnologia, destacando como ferramentas de inteligência artificial podem auxiliar no processo de aprendizagem. 

// ${includeKeyPoints
//           ? `
// Pontos-chave:
// • A integração de tecnologia na educação é essencial
// • Ferramentas de IA podem personalizar a experiência de aprendizado
// • O uso de resumos automáticos economiza tempo para estudantes
// • A adaptação a novos métodos de estudo é fundamental para o sucesso acadêmico`
//           : ""
//         }

// Este resumo foi gerado pelo Syntese, uma ferramenta de IA projetada para otimizar seus estudos e aumentar sua produtividade.`

//       setGeneratedAbstract(fakeSummary)
//       setIsGenerating(false)
//     }, 2000)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedAbstract)
    // You could add a toast notification here
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Novo Resumo" text="Gere um resumo automático a partir de texto ou documento.">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
        </Button>
      </DashboardHeader>

      <Tabs defaultValue="texto" className="space-y-4">
        <TabsList>
          <TabsTrigger value="texto">Texto</TabsTrigger>
          <TabsTrigger value="arquivo">Arquivo</TabsTrigger>
        </TabsList>

        <TabsContent value="texto" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Texto para resumir</CardTitle>
              <CardDescription>Cole ou digite o texto que você deseja resumir</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Cole ou digite seu texto aqui..."
                className="min-h-[200px]"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="arquivo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Enviar arquivo</CardTitle>
              <CardDescription>Envie um arquivo PDF, DOCX ou TXT para resumir</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed p-10 dark:border-gray-700">
                <FileUp className="h-10 w-10 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Arraste e solte seu arquivo aqui ou clique para selecionar
                </p>
                <Input type="file" className="max-w-xs" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <Card>
          <CardHeader>
            <CardTitle>Opções de resumo</CardTitle>
            <CardDescription>Personalize como você deseja que seu resumo seja gerado</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="summary-length">Tamanho do resumo</Label>
                <span className="text-sm text-muted-foreground">{abstractSize}%</span>
              </div>
              <Slider
                id="summary-length"
                min={10}
                max={90}
                step={5}
                value={abstractSize}
                onValueChange={setAbstractSize}
              />
              <p className="text-xs text-muted-foreground">Porcentagem do tamanho do texto original</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="summary-style">Estilo do resumo</Label>
              <Select value={abstractType} onValueChange={setAbstractType}>
                <SelectTrigger id="summary-style">
                  <SelectValue placeholder="Selecione um estilo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conciso">Conciso</SelectItem>
                  <SelectItem value="detalhado">Detalhado</SelectItem>
                  <SelectItem value="academico">Acadêmico</SelectItem>
                  <SelectItem value="simples">Simplificado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="include-key-points" checked={includeKeyPoints} onCheckedChange={setIncludeKeyPoints} />
              <Label htmlFor="include-key-points">Incluir pontos-chave</Label>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleGenerate} disabled={!prompt.trim() || isGenerating} className="w-full">
              {isGenerating ? (
                <>Gerando resumo...</>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" /> Gerar Resumo
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        {generatedAbstract && (
          <Card>
            <CardHeader>
              <CardTitle>Resumo Gerado</CardTitle>
              <CardDescription>Seu resumo foi gerado com sucesso</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="whitespace-pre-line rounded-md border bg-muted p-4 dark:bg-muted/20">
                {generatedAbstract}
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
                <Save className="mr-2 h-4 w-4" /> Salvar Resumo
              </Button>
            </CardFooter>
          </Card>
        )}
      </Tabs>
    </DashboardShell>
  )
}