import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileSettings } from "@/components/settings/profile-settings"
import { AccountSettings } from "@/components/settings/account-settings"
import { AppearanceSettings } from "@/components/settings/appearance-settings"
import { NotificationSettings } from "@/components/settings/notification-settings"
import { PrivacySettings } from "@/components/settings/privacy-settings"

export const metadata = {
  title: "Configurações | Syntese",
  description: "Gerencie suas configurações e preferências",
}

export default function ConfiguracoesPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Configurações" text="Gerencie suas configurações e preferências." />

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="account">Conta</TabsTrigger>
          <TabsTrigger value="appearance">Aparência</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="privacy">Privacidade</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <ProfileSettings />
        </TabsContent>

        <TabsContent value="account">
          <AccountSettings />
        </TabsContent>

        <TabsContent value="appearance">
          <AppearanceSettings />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationSettings />
        </TabsContent>

        <TabsContent value="privacy">
          <PrivacySettings />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}