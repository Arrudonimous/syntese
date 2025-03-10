"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft, Mail, Copy, Send, Save, Sparkles, Maximize2, Minimize2 } from "lucide-react"
import Link from "next/link"
import { EmailEditor } from "@/components/emails/email-editor"
import { EmailPreview } from "@/components/emails/email-preview"

export default function NewEmailPage() {
  const [purpose, setPurpose] = useState("")
  const [recipient, setRecipient] = useState("")
  const [subject, setSubject] = useState("")
  const [keyPoints, setKeyPoints] = useState("")
  const [tone, setTone] = useState("professional")
  const [formalityLevel, setFormalityLevel] = useState([3])
  const [length, setLength] = useState("medium")
  const [includeSignature, setIncludeSignature] = useState(true)
  const [emailContent, setEmailContent] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const formatOptions = [
    { value: "professional", label: "Profissional" },
    { value: "friendly", label: "Amigável" },
    { value: "formal", label: "Formal" },
    { value: "persuasive", label: "Persuasivo" },
    { value: "informative", label: "Informativo" },
  ]

  const lengthOptions = [
    { value: "short", label: "Curto (100-150 palavras)" },
    { value: "medium", label: "Médio (200-300 palavras)" },
    { value: "long", label: "Longo (400+ palavras)" },
  ]

  const purposeOptions = [
    { value: "job_application", label: "Candidatura a Emprego" },
    { value: "follow_up", label: "Acompanhamento" },
    { value: "meeting_request", label: "Solicitação de Reunião" },
    { value: "introduction", label: "Apresentação" },
    { value: "thank_you", label: "Agradecimento" },
    { value: "project_update", label: "Atualização de Projeto" },
    { value: "customer_support", label: "Suporte ao Cliente" },
    { value: "request", label: "Solicitação" },
    { value: "other", label: "Outro" },
  ]

  const handleGenerate = () => {
    if (!purpose && !keyPoints.trim()) return

    setIsGenerating(true)

    // Simula chamada de API com timeout
    setTimeout(() => {
      // Aqui você chamaria sua API real
      const fakeEmail = generateSampleEmail()
      setEmailContent(fakeEmail)
      setIsGenerating(false)
    }, 2000)
  }

  const generateSampleEmail = () => {
    const signatures = {
      professional: "\n\nAtenciosamente,\nSeu Nome\nCargo | Empresa\nTelefone | Email",
      friendly: "\n\nAbraços,\nSeu Nome",
      formal: "\n\nCordialmente,\nSeu Nome\nCargo\nNome da Empresa\nInformações de Contato",
    }

    const signatureToUse = includeSignature
      ? signatures[tone] || signatures.professional
      : ""

    // Diferentes exemplos de e-mail com base na finalidade
    let emailBody = ""

    switch (purpose) {
      case "job_application":
        emailBody = `Prezado(a) ${recipient || "Recrutador(a)"},

Venho por meio deste expressar meu interesse na vaga de [Cargo] em sua empresa. Com minha formação em [área relevante] e experiência em [habilidades relevantes], acredito que seria uma adição valiosa à sua equipe.

${keyPoints ? `Aqui estão alguns pontos importantes sobre minhas qualificações:\n${keyPoints}\n\n` : ""}Sou particularmente atraído(a) por sua empresa devido a [motivo específico da empresa]. Estou entusiasmado(a) com a oportunidade de contribuir para [projeto específico ou objetivo da empresa].

Anexei meu currículo para sua análise e gostaria de ter a oportunidade de discutir minha candidatura em uma entrevista. Agradeço a consideração de minha candidatura.`
        break

      case "meeting_request":
        emailBody = `Prezado(a) ${recipient || "Colega"},

Espero que esteja bem. Escrevo para solicitar uma reunião para discutir [tópico da reunião].

${keyPoints ? `Gostaria de abordar os seguintes pontos:\n${keyPoints}\n\n` : ""}Você estaria disponível para uma reunião de [duração] em [data/hora proposta]? Caso contrário, por favor, informe-me quais horários seriam mais adequados para sua agenda.

Agradeço a consideração deste pedido e aguardo nossa conversa.`
        break

      case "follow_up":
        emailBody = `Prezado(a) ${recipient || "Contato"},

Espero que esteja bem. Escrevo para dar seguimento à nossa recente [conversa/reunião/entrevista] sobre [tópico].

${keyPoints ? `Para recapitular, discutimos:\n${keyPoints}\n\n` : ""}Estou particularmente interessado(a) em avançar com [próximo passo específico]. Poderia, por favor, fornecer uma atualização sobre [informação específica solicitada]?

Agradeço seu tempo e aguardo seu retorno em breve.`
        break

      default:
        emailBody = `Prezado(a) ${recipient || "Destinatário(a)"},

Espero que esta mensagem o(a) encontre bem. ${keyPoints || "Escrevo a respeito de nossa recente discussão e gostaria de dar seguimento aos próximos passos."} 

${tone === "formal" ? "Por favor, não hesite em entrar em contato caso necessite de informações adicionais." : "Avise-me se precisar de algo mais da minha parte."}

Aguardo seu retorno.`
    }

    return emailBody + signatureToUse
  }

  const handleSave = () => {
    // Aqui você chamaria sua API para salvar o e-mail
    console.log({
      purpose,
      recipient,
      subject,
      keyPoints,
      tone,
      formalityLevel,
      length,
      includeSignature,
      emailContent,
    })
    // Em seguida, redirecionar ou mostrar mensagem de sucesso
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(emailContent)
    // Você poderia adicionar uma notificação toast aqui
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Criar Novo E-mail" text="Gere e-mails profissionais rapidamente com assistência de IA.">
        <Button variant="outline" asChild>
          <Link href="/dashboard/emails">
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
          </Link>
        </Button>
      </DashboardHeader>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className={`space-y-6 ${showPreview ? "lg:col-span-2" : "lg:col-span-3"}`}>
          <Tabs defaultValue="ai" className="space-y-4">
            <TabsList>
              <TabsTrigger value="ai">Geração por IA</TabsTrigger>
              <TabsTrigger value="template">Modelos</TabsTrigger>
              <TabsTrigger value="scratch">Do Zero</TabsTrigger>
            </TabsList>

            <TabsContent value="ai" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Detalhes do E-mail</CardTitle>
                  <CardDescription>Forneça informações para gerar seu e-mail</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="purpose">Finalidade</Label>
                    <Select value={purpose} onValueChange={setPurpose}>
                      <SelectTrigger id="purpose">
                        <SelectValue placeholder="Selecione a finalidade do seu e-mail" />
                      </SelectTrigger>
                      <SelectContent>
                        {purposeOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="recipient">Destinatário (Opcional)</Label>
                      <Input
                        id="recipient"
                        placeholder="Nome ou título do destinatário"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Linha de Assunto (Opcional)</Label>
                      <Input
                        id="subject"
                        placeholder="Assunto do e-mail"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="key-points">Pontos-Chave a Incluir</Label>
                    <Textarea
                      id="key-points"
                      placeholder="Digite os principais pontos que deseja abordar (um por linha)"
                      value={keyPoints}
                      onChange={(e) => setKeyPoints(e.target.value)}
                      rows={4}
                    />
                    <p className="text-xs text-muted-foreground">
                      Cada linha será tratada como um ponto separado em seu e-mail
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Estilo e Tom</CardTitle>
                  <CardDescription>Personalize como seu e-mail deve soar</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="tone">Tom</Label>
                    <Select value={tone} onValueChange={setTone}>
                      <SelectTrigger id="tone">
                        <SelectValue placeholder="Selecione o tom" />
                      </SelectTrigger>
                      <SelectContent>
                        {formatOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="formality">Nível de Formalidade</Label>
                      <span className="text-sm text-muted-foreground">
                        {formalityLevel[0] <= 2 ? "Casual" : formalityLevel[0] === 3 ? "Neutro" : "Formal"}
                      </span>
                    </div>
                    <Slider
                      id="formality"
                      min={1}
                      max={5}
                      step={1}
                      value={formalityLevel}
                      onValueChange={setFormalityLevel}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="length">Tamanho do E-mail</Label>
                    <Select value={length} onValueChange={setLength}>
                      <SelectTrigger id="length">
                        <SelectValue placeholder="Selecione o tamanho" />
                      </SelectTrigger>
                      <SelectContent>
                        {lengthOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="signature" checked={includeSignature} onCheckedChange={setIncludeSignature} />
                    <Label htmlFor="signature">Incluir assinatura</Label>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={handleGenerate}
                    disabled={(!purpose && !keyPoints.trim()) || isGenerating}
                    className="w-full"
                  >
                    {isGenerating ? (
                      <>Gerando e-mail...</>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" /> Gerar E-mail
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="template" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Modelos de E-mail</CardTitle>
                  <CardDescription>Escolha entre modelos de e-mail pré-projetados</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-md border p-4 hover:bg-accent/50 cursor-pointer">
                      <h3 className="font-medium mb-1">Candidatura a Emprego</h3>
                      <p className="text-sm text-muted-foreground">Para se candidatar a vagas de emprego</p>
                    </div>
                    <div className="rounded-md border p-4 hover:bg-accent/50 cursor-pointer">
                      <h3 className="font-medium mb-1">Solicitação de Reunião</h3>
                      <p className="text-sm text-muted-foreground">Para agendar reuniões</p>
                    </div>
                    <div className="rounded-md border p-4 hover:bg-accent/50 cursor-pointer">
                      <h3 className="font-medium mb-1">Agradecimento</h3>
                      <p className="text-sm text-muted-foreground">Expresse gratidão profissionalmente</p>
                    </div>
                    <div className="rounded-md border p-4 hover:bg-accent/50 cursor-pointer">
                      <h3 className="font-medium mb-1">Proposta de Projeto</h3>
                      <p className="text-sm text-muted-foreground">Para propor novos projetos</p>
                    </div>
                    <div className="rounded-md border p-4 hover:bg-accent/50 cursor-pointer">
                      <h3 className="font-medium mb-1">Apresentação</h3>
                      <p className="text-sm text-muted-foreground">Apresente-se profissionalmente</p>
                    </div>
                    <div className="rounded-md border p-4 hover:bg-accent/50 cursor-pointer">
                      <h3 className="font-medium mb-1">Acompanhamento</h3>
                      <p className="text-sm text-muted-foreground">Acompanhamento após reuniões ou entrevistas</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="scratch" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Escrever do Zero</CardTitle>
                  <CardDescription>Componha seu e-mail manualmente com o editor de texto</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="manual-subject">Assunto</Label>
                      <Input id="manual-subject" placeholder="Digite o assunto do e-mail" />
                    </div>

                    <EmailEditor
                      placeholder="Escreva o conteúdo do seu e-mail aqui..."
                      onChange={setEmailContent}
                      value={emailContent}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className={`space-y-6 ${showPreview ? "lg:col-span-3" : "lg:col-span-2"}`}>
          <Card className="h-full flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-md font-medium">Visualização</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setShowPreview(!showPreview)}>
                {showPreview ? (
                  <>
                    <Minimize2 className="h-4 w-4 mr-1" />
                    <span className="sr-only md:not-sr-only md:inline">Minimizar</span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="h-4 w-4 mr-1" />
                    <span className="sr-only md:not-sr-only md:inline">Expandir</span>
                  </>
                )}
              </Button>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto">
              {emailContent ? (
                <EmailPreview subject={subject} content={emailContent} />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-4">
                  <Mail className="h-12 w-12 text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Visualização do E-mail</h3>
                  <p className="text-sm text-muted-foreground">Seu e-mail aparecerá aqui após a geração</p>
                </div>
              )}
            </CardContent>
            {emailContent && (
              <CardFooter className="flex justify-between space-x-2 border-t">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={handleCopy}>
                    <Copy className="mr-2 h-4 w-4" /> Copiar
                  </Button>
                  <Button variant="outline" size="sm">
                    <Send className="mr-2 h-4 w-4" /> Enviar E-mail
                  </Button>
                </div>
                <Button size="sm" onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" /> Salvar E-mail
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </DashboardShell>
  )
}