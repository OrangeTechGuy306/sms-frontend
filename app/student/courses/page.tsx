import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, FileText, GraduationCap, Users, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function CoursesPage() {
  // Mock data - in a real app, this would come from an API
  const courses = [
    {
      id: "1",
      name: "Mathematics",
      code: "MATH101",
      description: "Introduction to Calculus and Algebra",
      teacher: "Dr. Smith",
      progress: 75,
      grade: "A-",
      assignments: 12,
      completed: 9,
      students: 28,
      nextClass: "Tomorrow, 10:00 AM",
      nextAssignment: "Problem Set 10 (Due in 3 days)",
      color: "violet",
    },
    {
      id: "2",
      name: "Physics",
      code: "PHYS101",
      description: "Fundamentals of Physics",
      teacher: "Prof. Johnson",
      progress: 68,
      grade: "B+",
      assignments: 10,
      completed: 7,
      students: 24,
      nextClass: "Today, 2:00 PM",
      nextAssignment: "Lab Report 5 (Due in 5 days)",
      color: "blue",
    },
    {
      id: "3",
      name: "English Literature",
      code: "ENG201",
      description: "Analysis of Classic Literature",
      teacher: "Ms. Davis",
      progress: 82,
      grade: "A",
      assignments: 8,
      completed: 7,
      students: 22,
      nextClass: "Wednesday, 11:30 AM",
      nextAssignment: "Essay on Shakespeare (Due in 7 days)",
      color: "green",
    },
    {
      id: "4",
      name: "Computer Science",
      code: "CS101",
      description: "Introduction to Programming",
      teacher: "Mr. Wilson",
      progress: 90,
      grade: "A+",
      assignments: 15,
      completed: 14,
      students: 30,
      nextClass: "Thursday, 9:00 AM",
      nextAssignment: "Final Project (Due in 14 days)",
      color: "amber",
    },
    {
      id: "5",
      name: "History",
      code: "HIST101",
      description: "World History: Ancient Civilizations",
      teacher: "Dr. Brown",
      progress: 70,
      grade: "B",
      assignments: 9,
      completed: 6,
      students: 26,
      nextClass: "Friday, 1:00 PM",
      nextAssignment: "Research Paper (Due in 10 days)",
      color: "red",
    },
    {
      id: "6",
      name: "Biology",
      code: "BIO101",
      description: "Introduction to Biology",
      teacher: "Prof. Garcia",
      progress: 85,
      grade: "A-",
      assignments: 11,
      completed: 9,
      students: 28,
      nextClass: "Monday, 11:00 AM",
      nextAssignment: "Lab Report 6 (Due in 4 days)",
      color: "emerald",
    },
  ]

  const getGradeColor = (grade: string) => {
    if (grade.startsWith("A")) return "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400"
    if (grade.startsWith("B")) return "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
    if (grade.startsWith("C")) return "bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-400"
    if (grade.startsWith("D")) return "bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400"
    return "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400"
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return "bg-green-500 dark:bg-green-400"
    if (progress >= 75) return "bg-emerald-500 dark:bg-emerald-400"
    if (progress >= 60) return "bg-blue-500 dark:bg-blue-400"
    if (progress >= 40) return "bg-amber-500 dark:bg-amber-400"
    return "bg-red-500 dark:bg-red-400"
  }

  const getCourseColor = (color: string) => {
    switch (color) {
      case "violet":
        return "border-t-4 border-violet-500 dark:border-violet-400"
      case "blue":
        return "border-t-4 border-blue-500 dark:border-blue-400"
      case "green":
        return "border-t-4 border-green-500 dark:border-green-400"
      case "amber":
        return "border-t-4 border-amber-500 dark:border-amber-400"
      case "red":
        return "border-t-4 border-red-500 dark:border-red-400"
      case "emerald":
        return "border-t-4 border-emerald-500 dark:border-emerald-400"
      default:
        return "border-t-4 border-slate-500 dark:border-slate-400"
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Courses</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">View and manage all your enrolled courses.</p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="h-9">
            <BookOpen className="mr-2 h-4 w-4" />
            All Courses
          </Button>
          <Button variant="outline" size="sm" className="h-9">
            <Clock className="mr-2 h-4 w-4" />
            Schedule
          </Button>
          <Button variant="outline" size="sm" className="h-9">
            <GraduationCap className="mr-2 h-4 w-4" />
            Grades
          </Button>
        </div>
        <Button size="sm" className="h-9 bg-violet-600 hover:bg-violet-700 text-white">
          <FileText className="mr-2 h-4 w-4" />
          Course Catalog
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <div className="overflow-x-auto">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="all">All Courses</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="all" className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className={`overflow-hidden border-0 shadow-md ${getCourseColor(course.color)}`}>
                <CardHeader className="pb-2 pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{course.name}</CardTitle>
                      <CardDescription>{course.code}</CardDescription>
                    </div>
                    <Badge className={`${getGradeColor(course.grade)} border-0`}>{course.grade}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{course.description}</p>

                  <div className="space-y-1 mb-4">
                    <div className="flex justify-between text-xs">
                      <span>Course Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress
                      value={course.progress}
                      className="h-2"
                      indicatorClassName={getProgressColor(course.progress)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <FileText className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                      <span>
                        {course.completed}/{course.assignments} Tasks
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                      <span>{course.students} Students</span>
                    </div>
                  </div>

                  <div className="text-sm mb-4">
                    <p>
                      <strong>Teacher:</strong> {course.teacher}
                    </p>
                    <p>
                      <strong>Next Class:</strong> {course.nextClass}
                    </p>
                  </div>

                  <Button asChild className="w-full bg-violet-600 hover:bg-violet-700 text-white">
                    <Link href={`/student/courses/${course.id}`}>
                      View Course <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="in-progress">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses
              .filter((course) => course.progress < 100)
              .map((course) => (
                <Card key={course.id} className={`overflow-hidden border-0 shadow-md ${getCourseColor(course.color)}`}>
                  <CardHeader className="pb-2 pt-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{course.name}</CardTitle>
                        <CardDescription>{course.code}</CardDescription>
                      </div>
                      <Badge className={`${getGradeColor(course.grade)} border-0`}>{course.grade}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{course.description}</p>

                    <div className="space-y-1 mb-4">
                      <div className="flex justify-between text-xs">
                        <span>Course Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress
                        value={course.progress}
                        className="h-2"
                        indicatorClassName={getProgressColor(course.progress)}
                      />
                    </div>

                    <Button asChild className="w-full bg-violet-600 hover:bg-violet-700 text-white">
                      <Link href={`/student/courses/${course.id}`}>
                        View Course <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
        <TabsContent value="completed">
          <div className="text-center py-16 px-4">
            <div className="bg-slate-100 dark:bg-slate-800 rounded-full p-6 w-24 h-24 mx-auto flex items-center justify-center mb-4">
              <GraduationCap className="h-12 w-12 text-slate-500 dark:text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold">No Completed Courses</h3>
            <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-md mx-auto">
              You haven't completed any courses yet. Keep learning and check back when you've finished a course!
            </p>
            <Button className="mt-6 bg-violet-600 hover:bg-violet-700 text-white">Browse Course Catalog</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
