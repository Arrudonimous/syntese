"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight, BookOpen, Brain, Mail, Zap } from "lucide-react"
import { useEffect, useState } from "react"
import { Skeleton } from "../ui/skeleton"
import axios from "axios"

const metrics = [
  {
    title: "Resumos Criados",
    value: "42",
    change: "+12%",
    trend: "up",
    icon: <Zap className="h-4 w-4" />,
  },
  {
    title: "Citações Geradas",
    value: "18",
    change: "+5%",
    trend: "up",
    icon: <BookOpen className="h-4 w-4" />,
  },
  {
    title: "Flashcards Estudados",
    value: "156",
    change: "+28%",
    trend: "up",
    icon: <Brain className="h-4 w-4" />,
  },
  {
    title: "E-mails Criados",
    value: "7",
    change: "-3%",
    trend: "down",
    icon: <Mail className="h-4 w-4" />,
  },
]

export function UsageMetrics() {
  const [metrics, setMetrics] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  console.log(metrics)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const analytics = await axios.get("/api/analytics/actualMonth")

        setMetrics(analytics.data.data)
      } catch (error) {
        console.error("Erro ao buscar logs:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if(isLoading){
    return (
      <>
        {[...Array(4)].map((_, index) => (
          <Card key={index} className="animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-6 w-6 rounded-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-20 mb-2" /> {/* valor */}
              <Skeleton className="h-3 w-36" />
            </CardContent>
          </Card>
        ))}
      </>
    );
  }

  return (
    <>
      {metrics.map((metric) => (
        <Card key={metric.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            <div
              className={`rounded-full p-1 ${metric.trend === "up"
                  ? "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400"
                  : "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                }`}
            >
              {metric.trend === "up" ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className="text-xs text-muted-foreground">{metric.change} em relação ao mês anterior</p>
          </CardContent>
        </Card>
      ))}
    </>
  )
}