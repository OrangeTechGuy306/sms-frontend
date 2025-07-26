"use client"

import { Scatter } from "@/components/ui/chart"

export function StudentAttendancePerformance() {
  // Mock data for attendance vs performance
  const data = [
    {
      subject: "Math",
      attendance: 95,
      grade: 85,
      size: 10,
    },
    {
      subject: "English",
      attendance: 98,
      grade: 92,
      size: 10,
    },
    {
      subject: "Science",
      attendance: 85,
      grade: 78,
      size: 10,
    },
    {
      subject: "History",
      attendance: 90,
      grade: 88,
      size: 10,
    },
    {
      subject: "Art",
      attendance: 100,
      grade: 95,
      size: 10,
    },
    {
      subject: "Physical Education",
      attendance: 92,
      grade: 90,
      size: 10,
    },
    {
      subject: "Music",
      attendance: 88,
      grade: 85,
      size: 10,
    },
    {
      subject: "Computer Science",
      attendance: 96,
      grade: 94,
      size: 10,
    },
  ]

  return (
    <div className="h-[400px] w-full">
      <Scatter
        data={data}
        xAxisKey="attendance"
        yAxisKey="grade"
        sizeKey="size"
        colorKey="subject"
        showLegend={false}
        valueFormatter={{
          attendance: (value) => `${value}% Attendance`,
          grade: (value) => `${value}% Grade`,
        }}
        axisConfig={{
          xAxis: {
            min: 80,
            max: 100,
            tickCount: 5,
            label: "Attendance Percentage",
          },
          yAxis: {
            min: 70,
            max: 100,
            tickCount: 6,
            label: "Grade Percentage",
          },
        }}
      />
    </div>
  )
}
