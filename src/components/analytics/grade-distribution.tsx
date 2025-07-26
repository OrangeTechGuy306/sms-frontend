"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts"

const data = [
  { name: "A (90-100%)", value: 48, color: "#4CAF50" },
  { name: "B (80-89%)", value: 156, color: "#8BC34A" },
  { name: "C (70-79%)", value: 195, color: "#FFC107" },
  { name: "D (60-69%)", value: 30, color: "#FF9800" },
  { name: "F (Below 60%)", value: 9, color: "#F44336" },
]

export function GradeDistribution() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={true}
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`${value} students`, "Count"]} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
