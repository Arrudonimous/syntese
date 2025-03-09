import { CheckCircle2 } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

const tasks = [
  {
    id: 1,
    title: "Revisar resumo de Biologia",
    completed: false,
    dueDate: "Hoje, 18:00",
  },
  {
    id: 2,
    title: "Preparar apresentação de História",
    completed: false,
    dueDate: "Amanhã, 10:00",
  },
  {
    id: 3,
    title: "Estudar flashcards de Inglês",
    completed: true,
    dueDate: "Ontem, 20:00",
  },
  {
    id: 4,
    title: "Enviar e-mail para coordenador",
    completed: false,
    dueDate: "Sexta, 12:00",
  },
]

export function UpcomingTasks() {
  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Tarefas Pendentes</h3>
        <span className="text-sm text-muted-foreground">
          {tasks.filter((task) => !task.completed).length} restantes
        </span>
      </div>
      <div className="mt-4 space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={cn("flex items-start space-x-3 rounded-md border p-3", task.completed && "bg-muted/50")}
          >
            <Checkbox id={`task-${task.id}`} checked={task.completed} />
            <div className="flex-1 space-y-1">
              <label
                htmlFor={`task-${task.id}`}
                className={cn(
                  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                  task.completed && "line-through text-muted-foreground",
                )}
              >
                {task.title}
              </label>
              <p className="text-xs text-muted-foreground">{task.dueDate}</p>
            </div>
            {task.completed && <CheckCircle2 className="h-4 w-4 text-primary" />}
          </div>
        ))}
      </div>
    </div>
  )
}