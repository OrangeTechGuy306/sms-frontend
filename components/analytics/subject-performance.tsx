"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Mathematics",
    average: 82,
    highest: 98,
    lowest: 65,
  },
  {
    name: "English",
    average: 85,
    highest: 97,
    lowest: 70,
  },
  {
    name: "Science",
    average: 79,
    highest: 96,
    lowest: 62,
  },
  {
    name: "History",
    average: 84,
    highest: 95,
    lowest: 68,
  },
  {
    name: "Computer Science",
    average: 88,
    highest: 99,
    lowest: 72,
  },
  {
    name: "Art",
    average: 90,
    highest: 100,
    lowest: 75,
  },
  {
    name: "Physical Education",
    average: 92,
    highest: 100,
    lowest: 80,
  },
]

export function SubjectPerformance() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" domain={[0, 100]} />
        <YAxis dataKey="name" type="category" width={150} />
        <Tooltip />
        <Legend />
        <Bar dataKey="average" name="Average Score %" fill="#8884d8" />
        <Bar dataKey="highest" name="Highest Score %" fill="#82ca9d" />
        <Bar dataKey="lowest" name="Lowest Score %" fill="#ff8042" />
      </BarChart>
    </ResponsiveContainer>
  )
}
