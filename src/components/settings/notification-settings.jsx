"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export function NotificationSettings() {
  const { toast } = useToast()
  const handleSave = () => {
    toast({
      title: "Preferências de notificação salvas",
      description: "Suas preferências de notificação foram atualizadas com sucesso.",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notificações por E-mail</CardTitle>
          <CardDescription>Escolha quais e-mails você deseja receber.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="marketing" className="flex flex-col space-y-1">
              <span>Atualizações de Marketing</span>
              <span className="text-sm font-normal text-muted-foreground">
                Receba e-mails sobre novos recursos, dicas e promoções.
              </span>
            </Label>
            <Switch id="marketing" defaultChecked />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="social" className="flex flex-col space-y-1">
              <span>Atualizações Sociais</span>
              <span className="text-sm font-normal text-muted-foreground">
                Receba e-mails sobre interações com outros usuários e comentários.
              </span>
            </Label>
            <Switch id="social" defaultChecked />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="security" className="flex flex-col space-y-1">
              <span>Alertas de Segurança</span>
              <span className="text-sm font-normal text-muted-foreground">
                Receba e-mails sobre atividades suspeitas e alterações de segurança.
              </span>
            </Label>
            <Switch id="security" defaultChecked />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="account" className="flex flex-col space-y-1">
              <span>Atualizações da Conta</span>
              <span className="text-sm font-normal text-muted-foreground">
                Receba e-mails sobre alterações na sua conta e faturamento.
              </span>
            </Label>
            <Switch id="account" defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notificações no Aplicativo</CardTitle>
          <CardDescription>Configure quais notificações você deseja ver dentro do aplicativo.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="app-updates" className="flex flex-col space-y-1">
              <span>Atualizações do Aplicativo</span>
              <span className="text-sm font-normal text-muted-foreground">
                Receba notificações sobre novos recursos e atualizações.
              </span>
            </Label>
            <Switch id="app-updates" defaultChecked />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="reminders" className="flex flex-col space-y-1">
              <span>Lembretes de Estudo</span>
              <span className="text-sm font-normal text-muted-foreground">
                Receba lembretes para revisar flashcards e continuar seus estudos.
              </span>
            </Label>
            <Switch id="reminders" defaultChecked />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="mentions" className="flex flex-col space-y-1">
              <span>Menções e Comentários</span>
              <span className="text-sm font-normal text-muted-foreground">
                Receba notificações quando alguém mencionar você ou comentar em seu conteúdo.
              </span>
            </Label>
            <Switch id="mentions" defaultChecked />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave}>Salvar Preferências</Button>
        </CardFooter>
      </Card>
    </div>
  )
}