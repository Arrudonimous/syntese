"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"

const data = [
  {
    name: "Jan",
    resumos: 12,
    citacoes: 8,
    flashcards: 24,
    emails: 5,
  },
  {
    name: "Fev",
    resumos: 16,
    citacoes: 10,
    flashcards: 30,
    emails: 7,
  },
  {
    name: "Mar",
    resumos: 24,
    citacoes: 15,
    flashcards: 45,
    emails: 9,
  },
  {
    name: "Abr",
    resumos: 28,
    citacoes: 12,
    flashcards: 52,
    emails: 6,
  },
  {
    name: "Mai",
    resumos: 32,
    citacoes: 18,
    flashcards: 68,
    emails: 8,
  },
  {
    name: "Jun",
    resumos: 38,
    citacoes: 22,
    flashcards: 75,
    emails: 10,
  },
]

export function PerformanceChart({ className }) {
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