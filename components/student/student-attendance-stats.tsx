"use client"

import { Bar } from "@/components/ui/chart"
import { Card, CardContent } from "@/components/ui/card"

export function StudentAttendanceStats() {
  // Mock data for attendance by subject
  const data = [
    {
      name: "Mathematics",
      present: 18,
      absent: 0,
      late: 2,
    },
    {
      name: "English",
      present: 16,
      absent: 2,
      late: 2,
    },
    {
      name: "Science",
      present: 19,
      absent: 1,
      late: 0,
    },
    {
      name: "History",
      present: 17,
      absent: 0,
      late: 3,
    },
    {
      name: "Art",
      present: 15,
      absent: 0,
      late: 0,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <CardContent className="p-4">
            <div className="text-xs font-medium text-green-600 dark:text-green-400">Present</div>
            <div className="text-2xl font-bold">84%</div>
            <div className="text-xs text-muted-foreground">42 days</div>
          </CardContent>
        </Card>
        <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
          <CardContent className="p-4">
            <div className="text-xs font-medium text-red-600 dark:text-red-400">Absent</div>
            <div className="text-2xl font-bold">6%</div>
            <div className="text-xs text-muted-foreground">3 days</div>
          </CardContent>
        </Card>
        <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
          <CardContent className="p-4">
            <div className="text-xs font-medium text-amber-600 dark:text-amber-400">Late</div>
            <div className="text-2xl font-bold">10%</div>
            <div className="text-xs text-muted-foreground">5 days</div>
          </CardContent>
        </Card>
        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-4">
            <div className="text-xs font-medium text-blue-600 dark:text-blue-400">Required</div>
            <div className="text-2xl font-bold">90%</div>
            <div className="text-xs text-muted-foreground">Minimum attendance</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-sm font-medium mb-4">Attendance by Subject</h3>
          <div className="h-[300px] w-full">
            <Bar
              data={data}
              index="name"
              categories={["present", "late", "absent"]}
              colors={["#22c55e", "#f59e0b", "#ef4444"]}
              valueFormatter={(value) => `${value} days`}
              yAxisWidth={48}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
