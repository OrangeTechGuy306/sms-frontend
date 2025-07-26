import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StudentCalendar } from "@/components/student/student-calendar"
import { StudentUpcomingEvents } from "@/components/student/student-upcoming-events"

export default function StudentCalendarPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
        <p className="text-muted-foreground">View your academic calendar and events</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Academic Calendar</CardTitle>
            <CardDescription>View and manage your schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <StudentCalendar />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Your scheduled events</CardDescription>
          </CardHeader>
          <CardContent>
            <StudentUpcomingEvents />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
