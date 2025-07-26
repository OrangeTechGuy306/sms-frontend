import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function TeacherClassesOverview() {
  // Mock classes data
  const classes = [
    {
      id: 1,
      name: "Grade 10A",
      subject: "Mathematics",
      students: 28,
      averageGrade: "B+",
      attendance: 94,
      nextClass: "Monday, 8:00 AM",
      room: "Room 101",
    },
    {
      id: 2,
      name: "Grade 11B",
      subject: "Mathematics",
      students: 25,
      averageGrade: "A-",
      attendance: 96,
      nextClass: "Monday, 11:00 AM",
      room: "Room 203",
    },
    {
      id: 3,
      name: "Grade 9B",
      subject: "Mathematics",
      students: 30,
      averageGrade: "B",
      attendance: 92,
      nextClass: "Tuesday, 9:30 AM",
      room: "Room 105",
    },
    {
      id: 4,
      name: "Grade 12A",
      subject: "Mathematics",
      students: 22,
      averageGrade: "A",
      attendance: 98,
      nextClass: "Wednesday, 8:00 AM",
      room: "Room 301",
    },
    {
      id: 5,
      name: "Grade 11A",
      subject: "Mathematics",
      students: 26,
      averageGrade: "B+",
      attendance: 95,
      nextClass: "Thursday, 8:00 AM",
      room: "Room 202",
    },
  ]

  return (
    <div className="space-y-6">
      {classes.map((cls) => (
        <div key={cls.id} className="rounded-md border p-4">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-medium">{cls.name}</h3>
                <Badge>{cls.subject}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {cls.students} students • Room {cls.room} • Next class: {cls.nextClass}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Take Attendance
              </Button>
              <Button variant="outline" size="sm">
                Manage Grades
              </Button>
              <Button size="sm">View Details</Button>
            </div>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-sm font-medium">Average Grade</p>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-2xl font-bold">{cls.averageGrade}</span>
                <span className="text-sm text-muted-foreground">Class average</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">Attendance Rate</p>
              <div className="mt-1">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{cls.attendance}%</span>
                  <span className="text-sm text-muted-foreground">Overall</span>
                </div>
                <Progress value={cls.attendance} className="mt-2" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">Upcoming Assignments</p>
              <div className="mt-1">
                <span className="text-2xl font-bold">2</span>
                <span className="ml-2 text-sm text-muted-foreground">Due this week</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
