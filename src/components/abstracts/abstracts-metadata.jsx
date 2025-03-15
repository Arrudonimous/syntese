import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "../ui/skeleton"

export function AbstractMetadata({ resumo, isLoading }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <h3 className="text-lg font-medium">Informações</h3>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Criado em:</span>
            {isLoading ? <Skeleton className="w-full h-10 rounded-xl" /> : <span>{formatDate(resumo.createdAt)}</span>}
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Palavras:</span>
            {isLoading ? <Skeleton className="w-[60%] h-5 rounded-xl" /> : <span>{resumo.wordsCount}</span>}
            
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Texto original:</span>
            {isLoading ? <Skeleton className="w-[60%] h-5 rounded-xl" /> : <span>{resumo.originalWordsCount} palavras</span>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}