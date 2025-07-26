import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen } from "lucide-react"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"

export function StudentCoursesOverview() {
  // Mock data - in a real app, this would come from an API
  const courses = [
    {
      id: "1",
      name: "Mathematics",
      code: "MATH101",
      progress: 75,
      grade: "A-",
      teacher: "Dr. Smith",
    },
    {
      id: "2",
      name: "Physics",
      code: "PHYS101",
      progress: 68,
      grade: "B+",
      teacher: "Prof. Johnson",
    },
    {
      id: "3",
      name: "English Literature",
      code: "ENG201",
      progress: 82,
      grade: "A",
      teacher: "Ms. Davis",
    },
    {
      id: "4",
      name: "Computer Science",
      code: "CS101",
      progress: 90,
      grade: "A+",
      teacher: "Mr. Wilson",
    },
  ]

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">My Courses</CardTitle>
        <BookOpen className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {courses.map((course) => (
            <div key={course.id} className="p-3 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="font-medium">{course.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {course.code} • {course.teacher}
                  </div>
                </div>
                <Badge>{course.grade}</Badge>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Course Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Button variant="outline" size="sm" asChild>
            <Link href="/student/courses">View All Courses</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
