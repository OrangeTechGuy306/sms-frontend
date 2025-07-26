import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, CheckCircle, Clock, XCircle } from "lucide-react"
import { StudentAttendanceCalendar } from "@/components/student/student-attendance-calendar"
import { StudentAttendanceStats } from "@/components/student/student-attendance-stats"
import { StudentAttendanceHistory } from "@/components/student/student-attendance-history"

export default function StudentAttendancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Attendance</h1>
        <p className="text-muted-foreground">View and manage your attendance records</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle>Attendance Overview</CardTitle>
            <CardDescription>Your attendance for the current semester</CardDescription>
          </CardHeader>
          <CardContent>
            <StudentAttendanceStats />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>Current attendance summary</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium">Present</span>
              </div>
              <span className="text-sm font-bold">42</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <XCircle className="h-5 w-5 text-red-500" />
                <span className="text-sm font-medium">Absent</span>
              </div>
              <span className="text-sm font-bold">3</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-amber-500" />
                <span className="text-sm font-medium">Late</span>
              </div>
              <span className="text-sm font-bold">5</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CalendarIcon className="h-5 w-5 text-blue-500" />
                <span className="text-sm font-medium">Total Days</span>
              </div>
              <span className="text-sm font-bold">50</span>
            </div>
            <div className="pt-2">
              <div className="text-xs text-muted-foreground mb-1">Attendance Rate</div>
              <div className="flex items-center gap-2">
                <div className="h-2 flex-1 rounded-full bg-slate-200 dark:bg-slate-700">
                  <div className="h-full rounded-full bg-green-500" style={{ width: "84%" }}></div>
                </div>
                <span className="text-sm font-medium">84%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="calendar" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="history">Attendance History</TabsTrigger>
        </TabsList>
        <TabsContent value="calendar" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Calendar</CardTitle>
              <CardDescription>View your attendance by date</CardDescription>
            </CardHeader>
            <CardContent>
              <StudentAttendanceCalendar />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="history" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Attendance History</CardTitle>
              <CardDescription>Detailed record of your attendance</CardDescription>
            </CardHeader>
            <CardContent>
              <StudentAttendanceHistory />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
