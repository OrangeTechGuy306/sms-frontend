"use client"

import { Line } from "@/components/ui/chart"

export function StudentPerformanceChart() {
  // Mock data for performance over time
  const data = [
    {
      month: "Jan",
      average: 78,
      classAverage: 75,
    },
    {
      month: "Feb",
      average: 82,
      classAverage: 76,
    },
    {
      month: "Mar",
      average: 80,
      classAverage: 78,
    },
    {
      month: "Apr",
      average: 85,
      classAverage: 77,
    },
    {
      month: "May",
      average: 88,
      classAverage: 79,
    },
  ]

  return (
    <div className="h-[300px] w-full">
      <Line
        data={data}
        index="month"
        categories={["average", "classAverage"]}
        colors={["#8b5cf6", "#94a3b8"]}
        valueFormatter={(value) => `${value}%`}
        yAxisWidth={40}
        showLegend={true}
        showXGrid={false}
        showYGrid={true}
        legendProps={{
          itemNameFormatter: (name) => {
            return (
              {
                average: "Your Average",
                classAverage: "Class Average",
              }[name] || name
            )
          },
        }}
      />
    </div>
  )
}
