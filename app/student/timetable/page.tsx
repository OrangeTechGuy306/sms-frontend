import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StudentWeeklyTimetable } from "@/components/student/student-weekly-timetable"
import { StudentDailyTimetable } from "@/components/student/student-daily-timetable"

export default function StudentTimetablePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Timetable</h1>
        <p className="text-muted-foreground">View your class schedule</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Schedule Overview</CardTitle>
          <CardDescription>Your weekly class schedule</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="weekly" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4 max-w-[400px]">
              <TabsTrigger value="weekly">Weekly View</TabsTrigger>
              <TabsTrigger value="daily">Daily View</TabsTrigger>
            </TabsList>
            <TabsContent value="weekly" className="mt-0">
              <StudentWeeklyTimetable />
            </TabsContent>
            <TabsContent value="daily" className="mt-0">
              <StudentDailyTimetable />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
