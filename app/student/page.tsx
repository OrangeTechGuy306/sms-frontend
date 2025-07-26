import { StudentStats } from "@/components/student/student-stats"
import { StudentUpcomingAssignments } from "@/components/student/student-upcoming-assignments"
import { StudentScheduleOverview } from "@/components/student/student-schedule-overview"
import { StudentCoursesOverview } from "@/components/student/student-courses-overview"
import { StudentAttendanceOverview } from "@/components/student/student-attendance-overview"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Bell, BookOpen, Calendar, CheckCircle, Clock, FileText } from "lucide-react"
import Link from "next/link"

export default function StudentDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, Alex!</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Here's what's happening with your academic progress today.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="h-9">
            <Calendar className="mr-2 h-4 w-4" />
            View Calendar
          </Button>
          <Button size="sm" className="h-9 bg-violet-600 hover:bg-violet-700 text-white">
            <FileText className="mr-2 h-4 w-4" />
            Upcoming Tasks
          </Button>
        </div>
      </div>

      <StudentStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2 overflow-hidden border-0 shadow-md bg-gradient-to-br from-violet-500 to-purple-700 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Your Progress</h2>
              <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-0">
                View Details
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Semester Progress</span>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full">65%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2 mb-1">
                  <div className="bg-white h-2 rounded-full" style={{ width: "65%" }}></div>
                </div>
                <p className="text-xs text-white/70">10 weeks remaining</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Assignments</span>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full">75%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2 mb-1">
                  <div className="bg-white h-2 rounded-full" style={{ width: "75%" }}></div>
                </div>
                <p className="text-xs text-white/70">15/20 completed</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Attendance</span>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full">95%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2 mb-1">
                  <div className="bg-white h-2 rounded-full" style={{ width: "95%" }}></div>
                </div>
                <p className="text-xs text-white/70">1 absence this semester</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Notifications</h2>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/student/notifications">
                  View All <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="space-y-4">
              <div className="flex gap-3 items-start">
                <div className="bg-violet-100 dark:bg-violet-900 p-2 rounded-full">
                  <Bell className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">New assignment posted</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Physics: Lab Report due in 5 days</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">10 minutes ago</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">Assignment graded</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Mathematics: Problem Set - 92%</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">1 hour ago</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                  <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">Course material updated</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">English: New readings available</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">3 hours ago</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="bg-amber-100 dark:bg-amber-900 p-2 rounded-full">
                  <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">Schedule change</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">History class moved to Room 205</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Yesterday</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StudentScheduleOverview />
        <StudentUpcomingAssignments />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StudentCoursesOverview />
        <StudentAttendanceOverview />
      </div>
    </div>
  )
}
