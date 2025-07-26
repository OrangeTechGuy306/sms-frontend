import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Clock, FileText } from "lucide-react"
import Link from "next/link"

export function StudentUpcomingAssignments() {
  // Mock data - in a real app, this would come from an API
  const assignments = [
    {
      id: "1",
      title: "Mathematics Problem Set",
      course: "Mathematics",
      dueDate: "2025-05-06T23:59:00",
      status: "pending",
      priority: "high",
    },
    {
      id: "2",
      title: "English Literature Essay",
      course: "English",
      dueDate: "2025-05-08T23:59:00",
      status: "pending",
      priority: "medium",
    },
    {
      id: "3",
      title: "Physics Lab Report",
      course: "Physics",
      dueDate: "2025-05-10T23:59:00",
      status: "pending",
      priority: "medium",
    },
    {
      id: "4",
      title: "History Research Paper",
      course: "History",
      dueDate: "2025-05-15T23:59:00",
      status: "pending",
      priority: "low",
    },
  ]

  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  // Function to calculate days remaining
  const getDaysRemaining = (dateString: string) => {
    const dueDate = new Date(dateString)
    const today = new Date()
    const diffTime = dueDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  // Function to get priority color
  const getPriorityColor = (priority: string, daysRemaining: number) => {
    if (daysRemaining <= 2) return "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400"
    if (priority === "high") return "bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-400"
    if (priority === "medium") return "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
    return "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
  }

  return (
    <Card className="border-0 shadow-md h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-6 px-6">
        <CardTitle className="text-lg font-semibold">Upcoming Assignments</CardTitle>
        <FileText className="h-5 w-5 text-slate-500 dark:text-slate-400" />
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="space-y-4">
          {assignments.map((assignment) => {
            const daysRemaining = getDaysRemaining(assignment.dueDate)
            const priorityColor = getPriorityColor(assignment.priority, daysRemaining)
            return (
              <div
                key={assignment.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <div className="space-y-1">
                  <div className="font-medium">{assignment.title}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">{assignment.course}</div>
                  <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                    <Clock className="mr-1 h-3 w-3" />
                    <span>Due: {formatDate(assignment.dueDate)}</span>
                  </div>
                </div>
                <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2 mt-2 sm:mt-0">
                  <Badge className={`${priorityColor} border-0`}>
                    {daysRemaining === 0 ? "Due today" : daysRemaining < 0 ? "Overdue" : `${daysRemaining} days left`}
                  </Badge>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0 rounded-full">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
        <div className="mt-4 text-center">
          <Button variant="outline" size="sm" asChild className="w-full">
            <Link href="/student/assignments">View All Assignments</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
