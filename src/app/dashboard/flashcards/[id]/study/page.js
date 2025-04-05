"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, RotateCcw, ThumbsUp, ThumbsDown, Brain, Badge, Timer, Zap, Trophy } from "lucide-react"
import Link from "next/link"
import axios from "axios"
import { cn } from "@/lib/utils"

// Sample flashcards for demonstration
const sampleFlashCardDeck = [
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
  const deckId = params.id

  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [progress, setProgress] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [knownCards, setKnownCards] = useState([])
  const [flashCardDeck, setFlashCardDeck] = useState()
  const [flashCardDeckCards, setFlashCardDeckCards] = useState(sampleFlashCardDeck)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [studyStartTime, setStudyStartTime] = useState(Date.now())
  const [streak, setStreak] = useState(0)
  const [showFeedback, setShowFeedback] = useState(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Calculate progress
    setProgress((currentCardIndex / flashCardDeckCards.length) * 100)

    // Check if study session is complete
    if (currentCardIndex >= flashCardDeckCards.length) {
      setCompleted(true)
    }
  }, [currentCardIndex])


  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const deck = await axios.get(`/api/flashcards/${deckId}`)

        console.log(deck.data.data)
        setFlashCardDeckCards(deck.data.data.cards)
        setFlashCardDeck(deck.data.data)
      } catch (error) {
        console.error("Erro ao buscar deck:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    // Update elapsed time every second
    const timer = setInterval(() => {
      if (!completed) {
        setElapsedTime(Math.floor((Date.now() - studyStartTime) / 1000))
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [completed, studyStartTime])

  const currentCard = flashCardDeckCards[currentCardIndex]

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  const handleFlip = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setFlipped(!flipped)
    setTimeout(() => setIsAnimating(false), 300)
  }

  const handleNext = () => {
    setFlipped(false)
    setShowFeedback(null)
    setTimeout(() => {
      setCurrentCardIndex((prev) => prev + 1)
    }, 300)
  }

  const handleKnown = () => {
    setKnownCards((prev) => [...prev, currentCard.id])
    setStreak((prev) => prev + 1)
    setShowFeedback("correct")
    setTimeout(() => {
      handleNext()
    }, 800)
  }

  const handleUnknown = () => {
    setStreak(0)
    setShowFeedback("incorrect")
    setTimeout(() => {
      handleNext()
    }, 800)
  }

  const handleRestart = () => {
    setCurrentCardIndex(0)
    setFlipped(false)
    setProgress(0)
    setCompleted(false)
    setKnownCards([])
    setStudyStartTime(Date.now())
    setElapsedTime(0)
    setStreak(0)
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
      case "hard":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }
  

  if(!isLoading){
    return (
      <DashboardShell>
        <DashboardHeader heading="Estudar Flashcards" text={flashCardDeck.title}>
          <Button variant="outline" asChild>
            <Link href="/dashboard/flashcards">
              <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para Decks
            </Link>
          </Button>
        </DashboardHeader>

        <div className="space-y-6">
          {!completed ? (
            <>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                    <Brain className="h-4 w-4" />
                    <span>
                      Card {currentCardIndex + 1} de {flashCardDeckCards.length}
                    </span>
                  </div>

                  {currentCard && (
                    <Badge className={cn("text-xs", getDifficultyColor(currentCard.difficulty))}>
                      {currentCard.difficulty === "easy"
                        ? "Fácil"
                        : currentCard.difficulty === "medium"
                          ? "Médio"
                          : "Difícil"}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-sm">
                    <Timer className="h-4 w-4 text-muted-foreground" />
                    <span>{formatTime(elapsedTime)}</span>
                  </div>

                  <div className="flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-sm">
                    <Zap className={cn("h-4 w-4", streak > 0 ? "text-yellow-500" : "text-muted-foreground")} />
                    <span className={cn(streak > 0 ? "text-yellow-500 font-medium" : "")}>
                      {streak} {streak === 1 ? "acerto" : "acertos"} seguidos
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative mx-auto max-w-2xl">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium">{Math.round(progress)}% concluído</span>
                  <Progress value={progress} className="w-full max-w-[250px] h-2" />
                </div>

                <div
                  className={cn(
                    "relative perspective-1000 cursor-pointer",
                    showFeedback === "correct"
                      ? "animate-pulse-success"
                      : showFeedback === "incorrect"
                        ? "animate-pulse-error"
                        : "",
                  )}
                  onClick={handleFlip}
                >
                  <div
                    className={cn(
                      "relative transition-all duration-300 preserve-3d",
                      flipped ? "rotate-y-180" : "",
                      isAnimating ? "pointer-events-none" : "",
                    )}
                  >
                    {/* Front of card */}
                    <div className="min-h-[350px] rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-8 shadow-lg backface-hidden border-2 border-transparent hover:border-primary/50 card-pattern">
                      <div className="flex h-full flex-col items-center justify-center text-center">
                        <div className="mb-6 rounded-full bg-primary/10 p-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-primary"
                          >
                            <path d="M8 3v3a2 2 0 0 1-2 2H3" />
                            <path d="M21 8V5a2 2 0 0 0-2-2H8" />
                            <path d="M3 16v3a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-3" />
                            <path d="M16 3v3a2 2 0 0 0 2 2h3" />
                          </svg>
                        </div>
                        <h3 className="mb-6 text-xl font-semibold">Pergunta:</h3>
                        <p className="text-lg">{currentCard?.front}</p>
                        <div className="mt-8 text-sm text-muted-foreground">Clique para ver a resposta</div>
                      </div>
                    </div>

                    {/* Back of card */}
                    <div className="absolute inset-0 min-h-[350px] rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-8 shadow-lg backface-hidden rotate-y-180 border-2 border-transparent hover:border-primary/50 card-pattern">
                      <div className="flex h-full flex-col items-center justify-center text-center">
                        <div className="mb-6 rounded-full bg-primary/10 p-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-primary"
                          >
                            <path d="M9.5 14.5 3 9l3-3 5.5 5.5" />
                            <path d="M14.5 9.5 21 3l-3-3-5.5 5.5" />
                            <path d="M3 21l7.5-7.5" />
                            <path d="M14.5 14.5 21 21" />
                          </svg>
                        </div>
                        <h3 className="mb-6 text-xl font-semibold">Resposta:</h3>
                        <p className="text-lg">{currentCard?.back}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-center gap-4">
                  {!flipped ? (
                    <Button size="lg" onClick={handleFlip} className="min-w-[200px] bg-primary hover:bg-primary/90">
                      Virar Card
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={handleUnknown}
                        className="min-w-[160px] border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 dark:border-red-900/30 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30 dark:hover:text-red-300"
                      >
                        <ThumbsDown className="mr-2 h-4 w-4" /> Não Sabia
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={handleKnown}
                        className="min-w-[160px] border-green-200 bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700 dark:border-green-900/30 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/30 dark:hover:text-green-300"
                      >
                        <ThumbsUp className="mr-2 h-4 w-4" /> Sabia
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </>
          ) : (
            <Card className="flex flex-col items-center justify-center p-10 text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <Trophy className="h-8 w-8 text-primary" />
              </div>
              <h2 className="mb-2 text-2xl font-bold">Parabéns! Estudo Concluído!</h2>
              <p className="mb-6 text-muted-foreground">
                Você completou todos os {flashCardDeckCards.length} flashcards neste deck.
              </p>
              <div className="mb-8 grid w-full max-w-md gap-6 sm:grid-cols-2">
                <div className="rounded-lg bg-muted p-4 text-center">
                  <div className="text-3xl font-bold text-primary">{knownCards.length}</div>
                  <div className="text-sm text-muted-foreground">Cards conhecidos</div>
                </div>
                <div className="rounded-lg bg-muted p-4 text-center">
                  <div className="text-3xl font-bold text-primary">{formatTime(elapsedTime)}</div>
                  <div className="text-sm text-muted-foreground">Tempo de estudo</div>
                </div>
              </div>

              <div className="mb-6 w-full max-w-md space-y-2">
                <div className="flex items-center justify-between">
                  <span>Taxa de acerto:</span>
                  <span className="font-medium">{Math.round((knownCards.length / flashCardDeckCards.length) * 100)}%</span>
                </div>
                <Progress
                  value={(knownCards.length / flashCardDeckCards.length) * 100}
                  className="h-2"
                  indicatorClassName={cn(
                    knownCards.length / flashCardDeckCards.length >= 0.8
                      ? "bg-green-500"
                      : knownCards.length / flashCardDeckCards.length >= 0.5
                        ? "bg-yellow-500"
                        : "bg-red-500",
                  )}
                />
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

        <style jsx global>{`
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
        
        @keyframes pulse-success {
          0%, 100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
          50% { box-shadow: 0 0 0 8px rgba(34, 197, 94, 0.3); }
        }
        
        @keyframes pulse-error {
          0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
          50% { box-shadow: 0 0 0 8px rgba(239, 68, 68, 0.3); }
        }
        
        .animate-pulse-success {
          animation: pulse-success 0.8s ease-in-out;
        }
        
        .animate-pulse-error {
          animation: pulse-error 0.8s ease-in-out;
        }
      `}</style>
      </DashboardShell>
    )
  }
}