"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"
import { useEffect, useState } from "react"
import axios from "axios"

export function PerformanceChart({ className }) {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const analytics = await axios.get("/api/analytics")
        setData(analytics.data.data)
      } catch (error) {
        console.error("Erro ao buscar analytics:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])


  if(isLoading){
    return (
      <div className={`rounded-lg border bg-card p-6 shadow-sm animate-pulse ${className}`}>
        <div className="flex flex-col space-y-4">
          <div className="h-6 w-32 rounded bg-muted" />
          <div className="h-4 w-64 rounded bg-muted" />
          <div className="h-[300px] w-full space-y-2 mt-4">
            <div className="flex items-end justify-between h-full">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex flex-col items-center space-y-2">
                  <div className="w-6 rounded bg-muted" style={{ height: `${Math.random() * 100 + 50}px` }} />
                  <div className="h-3 w-6 rounded bg-muted-foreground" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className={`rounded-lg border bg-card p-6 shadow-sm ${className}`}>
      <div className="flex flex-col space-y-4">
        <h3 className="text-lg font-semibold">Uso por Mês</h3>
        <p className="text-sm text-muted-foreground">Número de itens criados por mês</p>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip
                formatter={(value, name) => {
                  const labels = {
                    resumos: "Resumos",
                    citacoes: "Citações",
                    flashcards: "Flashcards",
                    emails: "E-mails",
                  }
                  return [value, labels[name] || name]
                }}
              />
              <Legend
                formatter={(value) => {
                  const labels = {
                    resumos: "Resumos",
                    citacoes: "Citações",
                    flashcards: "Flashcards",
                    emails: "E-mails",
                  }
                  return labels[value] || value
                }}
              />
              <Bar dataKey="resumos" fill="#8884d8" radius={[4, 4, 0, 0]} />
              <Bar dataKey="citacoes" fill="#82ca9d" radius={[4, 4, 0, 0]} />
              <Bar dataKey="flashcards" fill="#ffc658" radius={[4, 4, 0, 0]} />
              <Bar dataKey="emails" fill="#ff8042" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}