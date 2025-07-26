import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"
import Link from "next/link"

export function StudentScheduleOverview() {
  // Get current day
  const today = new Date()
  const dayOfWeek = today.toLocaleDateString("en-US", { weekday: "long" })
  const formattedDate = today.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  // Mock data - in a real app, this would come from an API
  const todayClasses = [
    {
      id: "1",
      subject: "Mathematics",
      time: "08:30 - 09:30",
      room: "Room 101",
      teacher: "Dr. Smith",
      status: "completed",
      color: "violet",
    },
    {
      id: "2",
      subject: "Physics",
      time: "10:00 - 11:00",
      room: "Lab 3",
      teacher: "Prof. Johnson",
      status: "completed",
      color: "blue",
    },
    {
      id: "3",
      subject: "English Literature",
      time: "11:30 - 12:30",
      room: "Room 205",
      teacher: "Ms. Davis",
      status: "current",
      color: "green",
    },
    {
      id: "4",
      subject: "Computer Science",
      time: "14:00 - 15:30",
      room: "Lab 5",
      teacher: "Mr. Wilson",
      status: "upcoming",
      color: "amber",
    },
  ]

  const getStatusClasses = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
      case "current":
        return "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400"
      case "upcoming":
        return "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
      default:
        return "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
    }
  }

  const getSubjectColor = (color: string) => {
    switch (color) {
      case "violet":
        return "border-l-4 border-violet-500 dark:border-violet-400"
      case "green":
        return "border-l-4 border-green-500 dark:border-green-400"
      case "blue":
        return "border-l-4 border-blue-500 dark:border-blue-400"
      case "amber":
        return "border-l-4 border-amber-500 dark:border-amber-400"
      default:
        return "border-l-4 border-slate-500 dark:border-slate-400"
    }
  }

  return (
    <Card className="border-0 shadow-md h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-6 px-6">
        <CardTitle className="text-lg font-semibold">Today's Schedule</CardTitle>
        <Calendar className="h-5 w-5 text-slate-500 dark:text-slate-400" />
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="mb-4">
          <h3 className="font-semibold text-lg">{dayOfWeek}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">{formattedDate}</p>
        </div>
        <div className="space-y-4">
          {todayClasses.map((classItem) => (
            <div
              key={classItem.id}
              className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 ${getSubjectColor(
                classItem.color,
              )}`}
            >
              <div className="space-y-1">
                <div className="font-medium">{classItem.subject}</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">{classItem.time}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {classItem.room} • {classItem.teacher}
                </div>
              </div>
              <div className="mt-2 sm:mt-0">
                <Badge className={`${getStatusClasses(classItem.status)} border-0`}>
                  {classItem.status === "completed"
                    ? "Completed"
                    : classItem.status === "current"
                      ? "Current"
                      : "Upcoming"}
                </Badge>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Button variant="outline" size="sm" asChild className="w-full">
            <Link href="/student/timetable">View Full Schedule</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
