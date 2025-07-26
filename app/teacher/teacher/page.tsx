import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TeacherStats } from "@/components/teacher/teacher-stats"
import { TeacherScheduleOverview } from "@/components/teacher/teacher-schedule-overview"
import { TeacherUpcomingEvents } from "@/components/teacher/teacher-upcoming-events"
import { TeacherClassesOverview } from "@/components/teacher/teacher-classes-overview"

export default function TeacherDashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Teacher Dashboard</h2>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="classes">Classes</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <TeacherStats />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Today's Schedule</CardTitle>
                <CardDescription>Your classes and activities for today</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <TeacherScheduleOverview />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Your upcoming events and deadlines</CardDescription>
              </CardHeader>
              <CardContent>
                <TeacherUpcomingEvents />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Schedule</CardTitle>
              <CardDescription>View your complete weekly schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <TeacherScheduleOverview fullWeek />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="classes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Classes</CardTitle>
              <CardDescription>Overview of all your classes</CardDescription>
            </CardHeader>
            <CardContent>
              <TeacherClassesOverview />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
