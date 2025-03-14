"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart as RechartsBarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Generate mock data for the chart
const generateData = () => {
  const hours = []
  const now = new Date()
  const currentHour = now.getHours()

  // Generate data for the past 12 hours
  for (let i = 0; i < 12; i++) {
    const hour = (currentHour - 11 + i + 24) % 24
    const value = Math.floor(Math.random() * 50) + 20 // Random value between 20 and 70
    hours.push({
      hour: `${hour}:00`,
      voters: value,
    })
  }

  return hours
}

export function VotingChart() {
  const [data, setData] = useState(generateData())

  // Regenerate data every 5 minutes
  useEffect(() => {
    const interval = setInterval(
      () => {
        setData(generateData())
      },
      5 * 60 * 1000,
    )

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="hour" tick={{ fontSize: 12 }} tickLine={false} />
          <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
          <Tooltip
            formatter={(value) => [`${value} voters`, "Verified"]}
            labelFormatter={(label) => `Hour: ${label}`}
          />
          <Bar dataKey="voters" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={30} />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  )
}

