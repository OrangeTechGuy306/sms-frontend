"use client"

import { Bar } from "@/components/ui/chart"

export function StudentSubjectComparison() {
  // Mock data for subject comparison
  const data = [
    {
      subject: "Math",
      score: 85,
      average: 78,
    },
    {
      subject: "English",
      score: 92,
      average: 80,
    },
    {
      subject: "Science",
      score: 78,
      average: 75,
    },
    {
      subject: "History",
      score: 88,
      average: 82,
    },
    {
      subject: "Art",
      score: 95,
      average: 85,
    },
  ]

  return (
    <div className="h-[300px] w-full">
      <Bar
        data={data}
        index="subject"
        categories={["score", "average"]}
        colors={["#8b5cf6", "#94a3b8"]}
        valueFormatter={(value) => `${value}%`}
        yAxisWidth={40}
        showLegend={true}
        legendProps={{
          itemNameFormatter: (name) => {
            return (
              {
                score: "Your Score",
                average: "Class Average",
              }[name] || name
            )
          },
        }}
      />
    </div>
  )
}
