"use client"

import { logTypes } from "@/utils/logTypes"
import axios from "axios"
import { FileText, Mail, Zap, BookOpen, Brain } from "lucide-react"
import React, { useEffect, useState } from "react"
import { Skeleton } from "../ui/skeleton"
import sliceWord from "@/utils/sliceWord"
import renderSkeletonCards from "../skeletonCards"

const mockActivities = [
  {
    id: 1,
    type: "resumo",
    title: "Resumo criado",
    description: "Você criou um resumo do artigo 'Inteligência Artificial na Educação'",
    time: "Há 2 horas",
    icon: <Zap className="h-4 w-4" />,
  },
  {
    id: 2,
    type: "email",
    title: "E-mail gerado",
    description: "Você gerou um e-mail profissional para contato com professor",
    time: "Há 5 horas",
    icon: <Mail className="h-4 w-4" />,
  },
  {
    id: 3,
    type: "citacao",
    title: "Citação gerada",
    description: "Você gerou uma citação no formato ABNT para o livro 'Metodologia Científica'",
    time: "Há 8 horas",
    icon: <BookOpen className="h-4 w-4" />,
  },
  {
    id: 4,
    type: "flashcard",
    title: "Sessão de estudo",
    description: "Você estudou 25 flashcards do deck 'Biologia Celular'",
    time: "Há 1 dia",
    icon: <Brain className="h-4 w-4" />,
  },
  {
    id: 5,
    type: "documento",
    title: "Documento adicionado",
    description: "Você adicionou o documento 'Notas de Aula - Matemática'",
    time: "Há 2 dias",
    icon: <FileText className="h-4 w-4" />,
  },
]

export function ActivityTimeline() {
  const [isLoading, setIsLoading] = useState(true)
  const [activities, setActivities] = useState([])

  const getActivitieIcon = (type) => {
    if (type === 1 || type === 2) return <Zap className="h-4 w-4" />
    if (type === 3 || type === 4) return <BookOpen className="h-4 w-4" />
    if (type === 5 || type === 6) return <Brain className="h-4 w-4" />
  }

  const getActivitieTime = (date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    const seconds = diffInSeconds;
    const minutes = Math.floor(diffInSeconds / 60);
    const hours = Math.floor(diffInSeconds / 3600);
    const days = Math.floor(diffInSeconds / 86400);

    if (days > 0) {
      return `Há ${days} dias`;
    } else if (hours > 0) {
      return `Há ${hours} horas`;
    } else if (minutes > 0) {
      return `Há ${minutes} minutos`;
    } else if (seconds > 0) {
      return `Há ${seconds} segundos`;
    } else {
      return "Agora mesmo";
    }
  };

  const getActivities = (activitiesIncoming) => {
    return activitiesIncoming.map((item => {
      return {
        title: logTypes.find((logType) => logType.id === item.logType).title,
        icon: getActivitieIcon(item.logType),
        time: getActivitieTime(new Date(item.createdAt)),
        ...item
      }
    }))
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const logs = await axios.get("/api/logs")
        const analytics = await axios.get("/api/analytics/actualMonth")

        console.log(analytics.data.data)

        setActivities(getActivities(logs.data.data))
      } catch (error) {
        console.error("Erro ao buscar logs:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="space-y-4">
      {isLoading ? renderSkeletonCards() : activities.map((activity) => (
        <div key={activity.id} className="flex items-start space-x-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
            {activity.icon}
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">{activity.title}</p>
            <p className="text-xs text-muted-foreground">{sliceWord(activity.description, 70)}</p>
            <p className="text-xs text-muted-foreground">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}