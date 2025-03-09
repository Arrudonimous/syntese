"use client"

import { usePathname } from "next/navigation"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { UserNav } from "@/components/dashboard/user-nav"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarProvider } from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function DashboardShell({ children }) {
  const pathname = usePathname()

  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen flex-col">
        {/* Mobile header */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:hidden">
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/syntese.png"
              alt="Syntese Logo"
              width={28}
              height={28}
            />
            <span className="text-lg font-semibold">Syntese</span>
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <UserNav />
          </div>
        </header>

        <div className="flex flex-1">
          <Sidebar>
            <SidebarHeader className="flex h-16 items-center border-b px-6">
              <Link href="/" className="flex items-center space-x-2">
                <Image
                  src="/images/syntese.png"
                  alt="Syntese Logo"
                  width={28}
                  height={28}
                />
                <span className="text-lg font-semibold">Syntese</span>
              </Link>
            </SidebarHeader>
            <SidebarContent>
              <DashboardNav />
            </SidebarContent>
            <SidebarFooter className="flex items-center justify-between p-6">
              <UserNav />
              <ModeToggle />
            </SidebarFooter>
          </Sidebar>

          <main className="flex-1 overflow-x-hidden bg-muted/40 pb-16 pt-8">
            <div className="container space-y-8">{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}