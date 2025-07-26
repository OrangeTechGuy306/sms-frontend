"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

export function TeacherGradeDistribution() {
  // Mock data for grade distribution
  const data = [
    { grade: "A (90-100)", count: 5, fill: "#22c55e" },
    { grade: "B (80-89)", count: 8, fill: "#84cc16" },
    { grade: "C (70-79)", count: 12, fill: "#eab308" },
    { grade: "D (60-69)", count: 4, fill: "#f97316" },
    { grade: "F (0-59)", count: 2, fill: "#ef4444" },
  ]

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {data.map((item) => (
          <div key={item.grade} className="rounded-md border p-3">
            <div className="text-sm font-medium">{item.grade}</div>
            <div className="mt-1 flex items-center gap-1">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.fill }} />
              <div className="text-xl font-bold">{item.count}</div>
              <div className="text-xs text-muted-foreground">students</div>
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-md border">
        <div className="p-4 font-medium">Grade Distribution</div>
        <div className="p-4 pt-0 h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="grade" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="var(--primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
