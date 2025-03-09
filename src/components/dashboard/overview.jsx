"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    total: 12,
  },
  {
    name: "Fev",
    total: 16,
  },
  {
    name: "Mar",
    total: 24,
  },
  {
    name: "Abr",
    total: 28,
  },
  {
    name: "Mai",
    total: 32,
  },
  {
    name: "Jun",
    total: 38,
  },
  {
    name: "Jul",
    total: 42,
  },
]

export function Overview({ className }) {
  return (
    <div className={`rounded-lg border bg-card p-6 shadow-sm ${className}`}>
      <div className="flex flex-col space-y-4">
        <h3 className="text-lg font-semibold">Atividade Mensal</h3>
        <p className="text-sm text-muted-foreground">Número de documentos processados por mês</p>
        <div className="h-[200px]">
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
              <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

