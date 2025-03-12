"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"

export function AccountSettings() {
  const { toast } = useToast()
  const handlePasswordChange = (e) => {
    e.preventDefault()
    toast({
      title: "Senha atualizada",
      description: "Sua senha foi atualizada com sucesso.",
    })
  }

  const handleDeleteAccount = () => {
    toast({
      title: "Ação requer confirmação",
      description: "Para excluir sua conta, confirme por e-mail primeiro.",
      variant: "destructive",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informações da Conta</CardTitle>
          <CardDescription>Atualize suas informações de conta e gerencie suas preferências.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Nome de Usuário</Label>
            <Input id="username" value="joaosilva" readOnly />
            <p className="text-xs text-muted-foreground">Seu nome de usuário não pode ser alterado.</p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="language">Idioma</Label>
            <Select defaultValue="pt-BR">
              <SelectTrigger id="language">
                <SelectValue placeholder="Selecione um idioma" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                <SelectItem value="en-US">English (US)</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="timezone">Fuso Horário</Label>
            <Select defaultValue="America/Sao_Paulo">
              <SelectTrigger id="timezone">
                <SelectValue placeholder="Selecione um fuso horário" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="America/Sao_Paulo">Brasília (GMT-3)</SelectItem>
                <SelectItem value="America/New_York">New York (GMT-4)</SelectItem>
                <SelectItem value="Europe/London">London (GMT+1)</SelectItem>
                <SelectItem value="Asia/Tokyo">Tokyo (GMT+9)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Alterar Senha</CardTitle>
          <CardDescription>Atualize sua senha para manter sua conta segura.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="current-password">Senha Atual</Label>
              <Input id="current-password" type="password" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="new-password">Nova Senha</Label>
              <Input id="new-password" type="password" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
              <Input id="confirm-password" type="password" />
            </div>

            <Button type="submit">Atualizar Senha</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Plano e Assinatura</CardTitle>
          <CardDescription>Gerencie seu plano atual e informações de pagamento.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md bg-primary/10 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Plano Atual: Pro</h3>
                <p className="text-sm text-muted-foreground">Renovação em 15/08/2023</p>
              </div>
              <Button variant="outline">Gerenciar Plano</Button>
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Método de Pagamento</Label>
            <div className="flex items-center justify-between rounded-md border p-4">
              <div className="flex items-center gap-4">
                <div className="rounded-md bg-muted p-2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-credit-card"
                  >
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <line x1="2" x2="22" y1="10" y2="10" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Cartão de Crédito</p>
                  <p className="text-sm text-muted-foreground">Visa terminando em 4242</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                Editar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Zona de Perigo</CardTitle>
          <CardDescription>Ações irreversíveis que afetam sua conta.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Atenção</AlertTitle>
            <AlertDescription>
              A exclusão da conta é permanente e irá remover todos os seus dados. Esta ação não pode ser desfeita.
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter>
          <Button variant="destructive" onClick={handleDeleteAccount}>
            Excluir Conta
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}