"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const data = [
  { name: "Resumos", value: 42, color: "#8884d8" },
  { name: "Citações", value: 18, color: "#82ca9d" },
  { name: "Flashcards", value: 156, color: "#ffc658" },
  { name: "E-mails", value: 7, color: "#ff8042" },
]

export function ContentBreakdown() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`${value} itens`, "Quantidade"]} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}