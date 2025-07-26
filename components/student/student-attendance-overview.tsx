import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function StudentAttendanceOverview() {
  // Mock data - in a real app, this would come from an API
  const attendanceData = {
    overall: 95,
    present: 57,
    absent: 3,
    late: 0,
    excused: 0,
    total: 60,
    bySubject: [
      { name: "Mathematics", present: 15, absent: 0, late: 0, total: 15, percentage: 100 },
      { name: "Physics", present: 14, absent: 1, late: 0, total: 15, percentage: 93 },
      { name: "English", present: 14, absent: 1, late: 0, total: 15, percentage: 93 },
      { name: "Computer Science", present: 14, absent: 1, late: 0, total: 15, percentage: 93 },
    ],
  }

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">Attendance Overview</CardTitle>
        <UserCheck className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex justify-center mb-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-500">{attendanceData.overall}%</div>
            <div className="text-sm text-muted-foreground">Overall Attendance</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="text-center p-2 bg-muted rounded-md">
            <div className="text-lg font-semibold">{attendanceData.present}</div>
            <div className="text-xs text-muted-foreground">Present</div>
          </div>
          <div className="text-center p-2 bg-muted rounded-md">
            <div className="text-lg font-semibold">{attendanceData.absent}</div>
            <div className="text-xs text-muted-foreground">Absent</div>
          </div>
          <div className="text-center p-2 bg-muted rounded-md">
            <div className="text-lg font-semibold">{attendanceData.total}</div>
            <div className="text-xs text-muted-foreground">Total Classes</div>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium">By Subject</h4>
          {attendanceData.bySubject.map((subject) => (
            <div key={subject.name} className="flex items-center justify-between text-sm">
              <span>{subject.name}</span>
              <span
                className={`font-medium ${
                  subject.percentage >= 90
                    ? "text-green-500"
                    : subject.percentage >= 80
                      ? "text-amber-500"
                      : "text-red-500"
                }`}
              >
                {subject.percentage}%
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4 text-center">
          <Button variant="outline" size="sm" asChild>
            <Link href="/student/attendance">View Full Attendance</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
