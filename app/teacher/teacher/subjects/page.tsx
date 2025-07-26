import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, BookOpen, Users, Clock, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function TeacherSubjectsPage() {
  // Mock data for subjects
  const subjects = [
    {
      id: 1,
      name: "Mathematics",
      classes: ["Class 9A", "Class 10B"],
      totalStudents: 53,
      completedTopics: 12,
      totalTopics: 20,
      nextClass: "Today, 10:30 AM",
      description: "Algebra, Geometry, Trigonometry, and Calculus for secondary school students.",
      progress: 60,
    },
    {
      id: 2,
      name: "Physics",
      classes: ["Class 11C"],
      totalStudents: 22,
      completedTopics: 8,
      totalTopics: 15,
      nextClass: "Tomorrow, 9:15 AM",
      description: "Mechanics, Thermodynamics, Optics, and Electromagnetism for higher secondary students.",
      progress: 53,
    },
    {
      id: 3,
      name: "Chemistry",
      classes: ["Class 11D"],
      totalStudents: 24,
      completedTopics: 10,
      totalTopics: 18,
      nextClass: "Wednesday, 11:45 AM",
      description: "Organic and Inorganic Chemistry for higher secondary students.",
      progress: 55,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Subjects</h2>
          <p className="text-muted-foreground">Manage and view your teaching subjects</p>
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search subjects..."
            className="w-full min-w-[200px] pl-8 md:w-[200px] lg:w-[300px]"
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {subjects.map((subject) => (
          <Card key={subject.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{subject.name}</CardTitle>
                <Badge>{subject.classes.length} Classes</Badge>
              </div>
              <CardDescription>{subject.description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{subject.totalStudents} Students</span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>
                      {subject.completedTopics}/{subject.totalTopics} Topics
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Syllabus Progress</span>
                    <span>{subject.progress}%</span>
                  </div>
                  <Progress value={subject.progress} />
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>Next Class: {subject.nextClass}</span>
                </div>
                <div>
                  <div className="text-sm font-medium">Classes:</div>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {subject.classes.map((cls) => (
                      <Badge key={cls} variant="outline">
                        {cls}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t bg-muted/50 px-6 py-3">
              <Button variant="ghost" size="sm">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule
              </Button>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
