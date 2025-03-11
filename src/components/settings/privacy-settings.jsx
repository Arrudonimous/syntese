"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"

export function PrivacySettings() {
  const handleSave = () => {
    // toast({
    //   title: "Configurações de privacidade salvas",
    //   description: "Suas configurações de privacidade foram atualizadas com sucesso.",
    // })
  }

  const handleDataExport = () => {
    // toast({
    //   title: "Solicitação enviada",
    //   description: "Sua solicitação de exportação de dados foi enviada. Você receberá um e-mail em breve.",
    // })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Visibilidade do Perfil</CardTitle>
          <CardDescription>Controle quem pode ver seu perfil e suas atividades.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup defaultValue="private">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="public" id="public" />
              <Label htmlFor="public" className="flex flex-col space-y-1">
                <span>Público</span>
                <span className="text-sm font-normal text-muted-foreground">
                  Qualquer pessoa pode ver seu perfil e atividades.
                </span>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="limited" id="limited" />
              <Label htmlFor="limited" className="flex flex-col space-y-1">
                <span>Limitado</span>
                <span className="text-sm font-normal text-muted-foreground">
                  Apenas usuários conectados podem ver seu perfil e atividades.
                </span>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="private" id="private" />
              <Label htmlFor="private" className="flex flex-col space-y-1">
                <span>Privado</span>
                <span className="text-sm font-normal text-muted-foreground">
                  Apenas você pode ver seu perfil e atividades.
                </span>
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Compartilhamento de Dados</CardTitle>
          <CardDescription>Controle como seus dados são compartilhados e utilizados.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="analytics" className="flex flex-col space-y-1">
              <span>Análise de Uso</span>
              <span className="text-sm font-normal text-muted-foreground">
                Permitir que coletemos dados anônimos para melhorar o serviço.
              </span>
            </Label>
            <Switch id="analytics" defaultChecked />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="personalization" className="flex flex-col space-y-1">
              <span>Personalização</span>
              <span className="text-sm font-normal text-muted-foreground">
                Permitir que usemos seus dados para personalizar sua experiência.
              </span>
            </Label>
            <Switch id="personalization" defaultChecked />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="third-party" className="flex flex-col space-y-1">
              <span>Compartilhamento com Terceiros</span>
              <span className="text-sm font-normal text-muted-foreground">
                Permitir que compartilhemos seus dados com parceiros confiáveis.
              </span>
            </Label>
            <Switch id="third-party" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Seus Dados</CardTitle>
          <CardDescription>Gerencie seus dados pessoais e histórico de atividades.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md border p-4">
            <h3 className="text-sm font-medium">Exportar Dados</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Baixe uma cópia de todos os seus dados, incluindo documentos, resumos, flashcards e configurações.
            </p>
            <Button variant="outline" className="mt-4" onClick={handleDataExport}>
              Solicitar Exportação
            </Button>
          </div>

          <Separator />

          <div className="rounded-md border p-4">
            <h3 className="text-sm font-medium">Limpar Histórico de Atividades</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Remova seu histórico de atividades e uso da plataforma.
            </p>
            <Button variant="outline" className="mt-4">
              Limpar Histórico
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave}>Salvar Configurações</Button>
        </CardFooter>
      </Card>
    </div>
  )
}