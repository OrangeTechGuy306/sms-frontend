import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, GraduationCap, LineChart, TrendingUp, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export default function GradesPage() {
  // Mock data - in a real app, this would come from an API
  const currentSemester = {
    name: "Spring 2025",
    gpa: 3.8,
    credits: 18,
    courses: [
      {
        id: "1",
        name: "Mathematics",
        code: "MATH101",
        credits: 3,
        grade: "A-",
        percentage: 92,
        color: "violet",
        assignments: [
          { name: "Homework 1", score: 95, weight: 5 },
          { name: "Homework 2", score: 88, weight: 5 },
          { name: "Quiz 1", score: 92, weight: 10 },
          { name: "Midterm", score: 90, weight: 30 },
          { name: "Homework 3", score: 94, weight: 5 },
          { name: "Quiz 2", score: 89, weight: 10 },
          { name: "Final Project", score: 95, weight: 15 },
          { name: "Final Exam", score: 93, weight: 20 },
        ],
      },
      {
        id: "2",
        name: "Physics",
        code: "PHYS101",
        credits: 4,
        grade: "B+",
        percentage: 88,
        color: "blue",
        assignments: [
          { name: "Lab 1", score: 90, weight: 10 },
          { name: "Homework 1", score: 85, weight: 5 },
          { name: "Quiz 1", score: 82, weight: 10 },
          { name: "Lab 2", score: 88, weight: 10 },
          { name: "Midterm", score: 87, weight: 25 },
          { name: "Lab 3", score: 92, weight: 10 },
          { name: "Homework 2", score: 90, weight: 5 },
          { name: "Final Exam", score: 89, weight: 25 },
        ],
      },
      {
        id: "3",
        name: "English Literature",
        code: "ENG201",
        credits: 3,
        grade: "A",
        percentage: 94,
        color: "green",
        assignments: [
          { name: "Essay 1", score: 92, weight: 15 },
          { name: "Participation", score: 95, weight: 10 },
          { name: "Midterm Essay", score: 94, weight: 25 },
          { name: "Presentation", score: 96, weight: 20 },
          { name: "Final Essay", score: 93, weight: 30 },
        ],
      },
      {
        id: "4",
        name: "Computer Science",
        code: "CS101",
        credits: 4,
        grade: "A+",
        percentage: 97,
        color: "amber",
        assignments: [
          { name: "Coding Assignment 1", score: 98, weight: 10 },
          { name: "Quiz 1", score: 95, weight: 5 },
          { name: "Project 1", score: 96, weight: 15 },
          { name: "Midterm", score: 97, weight: 20 },
          { name: "Coding Assignment 2", score: 99, weight: 10 },
          { name: "Quiz 2", score: 94, weight: 5 },
          { name: "Project 2", score: 98, weight: 15 },
          { name: "Final Exam", score: 96, weight: 20 },
        ],
      },
      {
        id: "5",
        name: "History",
        code: "HIST101",
        credits: 3,
        grade: "B",
        percentage: 85,
        color: "red",
        assignments: [
          { name: "Essay 1", score: 84, weight: 15 },
          { name: "Quiz 1", score: 82, weight: 10 },
          { name: "Midterm", score: 86, weight: 25 },
          { name: "Research Paper", score: 87, weight: 20 },
          { name: "Final Exam", score: 85, weight: 30 },
        ],
      },
      {
        id: "6",
        name: "Biology",
        code: "BIO101",
        credits: 4,
        grade: "A-",
        percentage: 91,
        color: "emerald",
        assignments: [
          { name: "Lab 1", score: 92, weight: 10 },
          { name: "Quiz 1", score: 88, weight: 5 },
          { name: "Lab 2", score: 90, weight: 10 },
          { name: "Midterm", score: 91, weight: 25 },
          { name: "Lab 3", score: 93, weight: 10 },
          { name: "Research Project", score: 94, weight: 15 },
          { name: "Final Exam", score: 90, weight: 25 },
        ],
      },
    ],
  }

  const previousSemesters = [
    {
      name: "Fall 2024",
      gpa: 3.7,
      credits: 16,
    },
    {
      name: "Spring 2024",
      gpa: 3.6,
      credits: 15,
    },
  ]

  const cumulativeGPA = 3.7
  const totalCredits = 49

  // Helper function to get letter grade color
  const getGradeColor = (grade: string) => {
    if (grade.startsWith("A")) return "text-green-600 dark:text-green-400"
    if (grade.startsWith("B")) return "text-blue-600 dark:text-blue-400"
    if (grade.startsWith("C")) return "text-amber-600 dark:text-amber-400"
    if (grade.startsWith("D")) return "text-orange-600 dark:text-orange-400"
    return "text-red-600 dark:text-red-400"
  }

  const getGradeBadgeColor = (grade: string) => {
    if (grade.startsWith("A")) return "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 border-0"
    if (grade.startsWith("B")) return "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 border-0"
    if (grade.startsWith("C")) return "bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-400 border-0"
    if (grade.startsWith("D")) return "bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400 border-0"
    return "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 border-0"
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 dark:text-green-400"
    if (score >= 80) return "text-blue-600 dark:text-blue-400"
    if (score >= 70) return "text-amber-600 dark:text-amber-400"
    if (score >= 60) return "text-orange-600 dark:text-orange-400"
    return "text-red-600 dark:text-red-400"
  }

  const getCourseColor = (color: string) => {
    switch (color) {
      case "violet":
        return "border-l-4 border-violet-500 dark:border-violet-400"
      case "blue":
        return "border-l-4 border-blue-500 dark:border-blue-400"
      case "green":
        return "border-l-4 border-green-500 dark:border-green-400"
      case "amber":
        return "border-l-4 border-amber-500 dark:border-amber-400"
      case "red":
        return "border-l-4 border-red-500 dark:border-red-400"
      case "emerald":
        return "border-l-4 border-emerald-500 dark:border-emerald-400"
      default:
        return "border-l-4 border-slate-500 dark:border-slate-400"
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Grades</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">View your academic performance and grades.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-2 pt-6">
            <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">Current GPA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="bg-violet-100 dark:bg-violet-900 p-3 rounded-lg">
                <GraduationCap className="h-6 w-6 text-violet-600 dark:text-violet-400" />
              </div>
              <div>
                <div className="text-3xl font-bold">{currentSemester.gpa}</div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Spring 2025</p>
                <div className="mt-2 flex items-center text-xs text-green-600 dark:text-green-400">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  <span>+0.1 from last semester</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-2 pt-6">
            <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">Cumulative GPA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
                <LineChart className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <div className="text-3xl font-bold">{cumulativeGPA}</div>
                <p className="text-xs text-slate-500 dark:text-slate-400">{totalCredits} Credits Completed</p>
                <div className="mt-2 flex items-center text-xs text-green-600 dark:text-green-400">
                  <LineChart className="mr-1 h-3 w-3" />
                  <span>On track for honors</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md sm:col-span-2 lg:col-span-1">
          <CardHeader className="pb-2 pt-6">
            <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">Current Standing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                <GraduationCap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="text-3xl font-bold">Dean's List</div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Academic Achievement</p>
                <div className="mt-2 flex items-center text-xs text-blue-600 dark:text-blue-400">
                  <GraduationCap className="mr-1 h-3 w-3" />
                  <span>Top 10% of class</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="current" className="space-y-6">
        <div className="overflow-x-auto">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="current">Current Semester</TabsTrigger>
            <TabsTrigger value="previous">Previous Semesters</TabsTrigger>
            <TabsTrigger value="transcript">Transcript</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="current" className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <h2 className="text-xl font-semibold">{currentSemester.name}</h2>
            <Button variant="outline" size="sm" className="bg-white dark:bg-slate-900">
              <Download className="mr-2 h-4 w-4" />
              Export Grades
            </Button>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50 dark:bg-slate-800">
                  <TableHead>Course</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Credits</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead className="text-right">Percentage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentSemester.courses.map((course) => (
                  <TableRow key={course.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-6 rounded-full bg-${course.color}-500 dark:bg-${course.color}-400`}
                        ></div>
                        {course.name}
                      </div>
                    </TableCell>
                    <TableCell>{course.code}</TableCell>
                    <TableCell>{course.credits}</TableCell>
                    <TableCell>
                      <Badge className={getGradeBadgeColor(course.grade)}>{course.grade}</Badge>
                    </TableCell>
                    <TableCell className="text-right">{course.percentage}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Course Details</h3>
            <div className="space-y-4">
              {currentSemester.courses.map((course) => (
                <Accordion type="single" collapsible key={course.id}>
                  <AccordionItem value={course.id} className={`border rounded-lg ${getCourseColor(course.color)}`}>
                    <AccordionTrigger className="px-4 py-3 hover:no-underline">
                      <div className="flex items-center gap-3">
                        <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-lg">
                          <BookOpen className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium">{course.name}</div>
                          <div className="text-sm text-slate-500 dark:text-slate-400">{course.code}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 mr-2">
                        <Badge className={getGradeBadgeColor(course.grade)}>{course.grade}</Badge>
                        <span className="text-sm font-medium">{course.percentage}%</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Course Progress</span>
                            <span>{course.percentage}%</span>
                          </div>
                          <Progress value={course.percentage} className="h-2" />
                        </div>
                        <div className="overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow className="bg-slate-50 dark:bg-slate-800">
                                <TableHead>Assignment</TableHead>
                                <TableHead>Weight</TableHead>
                                <TableHead className="text-right">Score</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {course.assignments.map((assignment, index) => (
                                <TableRow key={index} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                  <TableCell className="font-medium">{assignment.name}</TableCell>
                                  <TableCell>{assignment.weight}%</TableCell>
                                  <TableCell className={`text-right ${getScoreColor(assignment.score)}`}>
                                    {assignment.score}%
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
            </div>
          </div>
        </TabsContent>
        {/* Other tab content remains the same but should have similar responsive fixes */}
      </Tabs>
    </div>
  )
}
