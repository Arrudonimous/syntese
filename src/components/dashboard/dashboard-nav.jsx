"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, BookOpen, Brain, FileText, Home, Mail, Settings, Zap } from "lucide-react"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Navegação</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/dashboard"}>
                <Link href="/dashboard">
                  <Home className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/dashboard/analytics"}>
                <Link href="/dashboard/analytics">
                  <BarChart3 className="h-4 w-4" />
                  <span>Análises</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel>Ferramentas</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === "/dashboard/abstracts" || pathname.startsWith("/dashboard/abstracts/")}
              >
                <Link href="/dashboard/abstracts">
                  <Zap className="h-4 w-4" />
                  <span>Resumo Automático</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === "/dashboard/quotes" || pathname.startsWith("/dashboard/quotes/")}
              >
                <Link href="/dashboard/quotes">
                  <BookOpen className="h-4 w-4" />
                  <span>Gerador de Citações</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === "/dashboard/flashcards" || pathname.startsWith("/dashboard/flashcards/")}
              >
                <Link href="/dashboard/flashcards">
                  <Brain className="h-4 w-4" />
                  <span>Flashcards</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === "/dashboard/emails" || pathname.startsWith("/dashboard/emails/")}
              >
                <Link href="/dashboard/emails">
                  <Mail className="h-4 w-4" />
                  <span>Automação de E-mails</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel>Documentos</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === "/dashboard/documents" || pathname.startsWith("/dashboard/documents/")}
              >
                <Link href="/dashboard/documents">
                  <FileText className="h-4 w-4" />
                  <span>Meus Documentos</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel>Configurações</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/dashboard/settings"}>
                <Link href="/dashboard/settings">
                  <Settings className="h-4 w-4" />
                  <span>Configurações</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  )
}

