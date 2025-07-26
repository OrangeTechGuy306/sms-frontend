"use client"

import { Radar } from "@/components/ui/chart"

export function StudentSkillsRadar() {
  // Mock data for skills assessment
  const data = [
    {
      skill: "Critical Thinking",
      value: 85,
      average: 75,
    },
    {
      skill: "Problem Solving",
      value: 90,
      average: 78,
    },
    {
      skill: "Communication",
      value: 75,
      average: 80,
    },
    {
      skill: "Teamwork",
      value: 82,
      average: 85,
    },
    {
      skill: "Time Management",
      value: 70,
      average: 72,
    },
    {
      skill: "Research",
      value: 88,
      average: 76,
    },
  ]

  return (
    <div className="h-[400px] w-full">
      <Radar
        data={data}
        index="skill"
        categories={["value", "average"]}
        colors={["#8b5cf6", "#94a3b8"]}
        valueFormatter={(value) => `${value}%`}
        showLegend={true}
        legendProps={{
          itemNameFormatter: (name) => {
            return (
              {
                value: "Your Skills",
                average: "Class Average",
              }[name] || name
            )
          },
        }}
      />
    </div>
  )
}
