"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Check, RotateCcw, ThumbsUp, ThumbsDown } from "lucide-react"
import Link from "next/link"

// Sample flashcards for demonstration
const sampleFlashcards = [
  {
    id: "1",
    front: "O que é fotossíntese?",
    back: "Processo pelo qual plantas convertem luz solar em energia química",
    difficulty: "medium",
  },
  {
    id: "2",
    front: "Quais são as principais organelas da célula?",
    back: "Núcleo, mitocôndria, ribossomos, retículo endoplasmático, complexo de Golgi, lisossomos",
    difficulty: "hard",
  },
  {
    id: "3",
    front: "O que é a Lei de Mendel?",
    back: "Princípios que descrevem como os traços são transmitidos de pais para filhos através de genes",
    difficulty: "medium",
  },
  {
    id: "4",
    front: "Defina osmose",
    back: "Movimento de água através de uma membrana semipermeável de uma região de baixa concentração de soluto para uma região de alta concentração de soluto",
    difficulty: "easy",
  },
  {
    id: "5",
    front: "O que é o DNA?",
    back: "Ácido desoxirribonucleico, molécula que contém as instruções genéticas para o desenvolvimento e funcionamento de todos os organismos vivos",
    difficulty: "medium",
  },
]

export default function EstudarFlashcardsPage() {
  const params = useParams()
  const router = useRouter()
  const deckId = params.id

  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [progress, setProgress] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [knownCards, setKnownCards] = useState([])

  useEffect(() => {
    // Calculate progress
    setProgress((currentCardIndex / sampleFlashcards.length) * 100)

    // Check if study session is complete
    if (currentCardIndex >= sampleFlashcards.length) {
      setCompleted(true)
    }
  }, [currentCardIndex])

  const currentCard = sampleFlashcards[currentCardIndex]

  const handleFlip = () => {
    setFlipped(!flipped)
  }

  const handleNext = () => {
    setFlipped(false)
    setCurrentCardIndex((prev) => prev + 1)
  }

  const handleKnown = () => {
    setKnownCards((prev) => [...prev, currentCard.id])
    handleNext()
  }

  const handleUnknown = () => {
    handleNext()
  }

  const handleRestart = () => {
    setCurrentCardIndex(0)
    setFlipped(false)
    setProgress(0)
    setCompleted(false)
    setKnownCards([])
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Estudar Flashcards" text="Biologia Celular">
        <Button variant="outline" asChild>
          <Link href="/dashboard/flashcards">
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para Decks
          </Link>
        </Button>
      </DashboardHeader>

      <div className="space-y-6">
        {!completed ? (
          <>
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Card {currentCardIndex + 1} de {sampleFlashcards.length}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{Math.round(progress)}%</span>
                <Progress value={progress} className="w-[100px] h-2" />
              </div>
            </div>

            <div className="relative mx-auto max-w-xl cursor-pointer perspective-1000" onClick={handleFlip}>
              <div className={`relative transition-all duration-500 preserve-3d ${flipped ? "rotate-y-180" : ""}`}>
                <div className="min-h-[300px] rounded-xl bg-card p-8 shadow-lg backface-hidden">
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <h3 className="mb-6 text-xl font-semibold">Pergunta:</h3>
                    <p className="text-lg">{currentCard.front}</p>
                    <div className="mt-8 text-sm text-muted-foreground">Clique para ver a resposta</div>
                  </div>
                </div>

                <div className="absolute inset-0 min-h-[300px] rounded-xl bg-card p-8 shadow-lg backface-hidden rotate-y-180">
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <h3 className="mb-6 text-xl font-semibold">Resposta:</h3>
                    <p className="text-lg">{currentCard.back}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              {!flipped ? (
                <Button size="lg" onClick={handleFlip}>
                  Virar Card
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleUnknown}
                    className="border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 dark:border-red-900/30 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30 dark:hover:text-red-300"
                  >
                    <ThumbsDown className="mr-2 h-4 w-4" /> Não Sabia
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleKnown}
                    className="border-green-200 bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700 dark:border-green-900/30 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/30 dark:hover:text-green-300"
                  >
                    <ThumbsUp className="mr-2 h-4 w-4" /> Sabia
                  </Button>
                </>
              )}
            </div>
          </>
        ) : (
          <Card className="flex flex-col items-center justify-center p-10 text-center">
            <div className="mb-4 rounded-full bg-primary/10 p-3">
              <Check className="h-8 w-8 text-primary" />
            </div>
            <h2 className="mb-2 text-2xl font-bold">Estudo Concluído!</h2>
            <p className="mb-6 text-muted-foreground">
              Você completou todos os {sampleFlashcards.length} flashcards neste deck.
            </p>
            <div className="mb-8 w-full max-w-md space-y-2">
              <div className="flex items-center justify-between">
                <span>Cards conhecidos:</span>
                <span className="font-medium">
                  {knownCards.length} de {sampleFlashcards.length}
                </span>
              </div>
              <Progress value={(knownCards.length / sampleFlashcards.length) * 100} className="h-2" />
            </div>
            <div className="flex gap-4">
              <Button variant="outline" onClick={handleRestart}>
                <RotateCcw className="mr-2 h-4 w-4" /> Estudar Novamente
              </Button>
              <Button asChild>
                <Link href="/dashboard/flashcards">
                  <ArrowRight className="mr-2 h-4 w-4" /> Voltar para Decks
                </Link>
              </Button>
            </div>
          </Card>
        )}
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </DashboardShell>
  )
}