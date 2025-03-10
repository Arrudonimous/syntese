import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { FlashcardsList } from "@/components/flashcards/flashcards-list"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"

export const metadata = {
  title: "Flashcards Inteligentes | Syntese",
  description: "Crie e estude com flashcards inteligentes",
}

export default function FlashcardsPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Flashcards Inteligentes"
        text="Crie e estude com flashcards para memorização eficiente."
      >
        <Button asChild>
          <Link href="/dashboard/flashcards/new">
            <Plus className="mr-2 h-4 w-4" /> Novo Deck
          </Link>
        </Button>
      </DashboardHeader>
      <FlashcardsList />
    </DashboardShell>
  )
}