"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const data = [
  { name: "Resumos", value: 42, color: "#8884d8" },
  { name: "Citações", value: 18, color: "#82ca9d" },
  { name: "Flashcards", value: 156, color: "#ffc658" },
  { name: "E-mails", value: 7, color: "#ff8042" },
]

export function ContentBreakdown() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const analytics = await axios.get("/api/analytics/actualMonth")
        const newData = []

        analytics.data.data.forEach((item, index) => {
          switch (index) {
            case 0:
              newData.push({ name: 'Resumos', value: Number(item.value), color: "#8884d8" })
              break
            case 1:
              newData.push({ name: 'Citações', value: Number(item.value), color: "#82ca9d" })
              break
            case 2:
              newData.push({ name: 'Flashcards', value: Number(item.value), color: "#ffc658" })
              break
            case 3:
              newData.push({ name: 'Emails', value: Number(item.value), color: "#ff8042" })
              break
          }
        })

        setData(newData)
        console.log(newData)
      } catch (error) {
        console.error("Erro ao buscar logs:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])


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