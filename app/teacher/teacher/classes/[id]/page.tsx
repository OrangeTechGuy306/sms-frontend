"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, FileText, ClipboardCheck, Award, MessageSquare, BookOpen } from "lucide-react"

interface Student {
  id: string
  name: string
  attendance: number
  grade: string
  lastAssignment: string
  performance: "Excellent" | "Good" | "Average" | "Needs Improvement"
}

interface ClassDetails {
  id: number
  name: string
  subject: string
  students: Student[]
  averageGrade: string
  attendance: number
  nextClass: string
  room: string
  description: string
  syllabus: string
}

export default function ClassDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [classDetails, setClassDetails] = useState<ClassDetails | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to fetch class details
    const fetchClassDetails = async () => {
      setLoading(true)

      // Mock data
      const mockStudents: Student[] = Array.from({ length: 28 }, (_, i) => ({
        id: `STU-${1000 + i}`,
        name: [
          "John Smith",
          "Emma Johnson",
          "Michael Brown",
          "Sophia Davis",
          "William Wilson",
          "Olivia Martinez",
          "James Taylor",
          "Isabella Anderson",
          "Benjamin Thomas",
          "Mia Jackson",
          "Jacob White",
          "Charlotte Harris",
          "Ethan Martin",
          "Amelia Thompson",
          "Alexander Garcia",
          "Harper Lewis",
          "Daniel Lee",
          "Evelyn Walker",
          "Matthew Hall",
          "Abigail Allen",
          "David Young",
          "Emily King",
          "Joseph Wright",
          "Elizabeth Scott",
          "Samuel Green",
          "Sofia Baker",
          "Andrew Nelson",
          "Avery Carter",
        ][i],
        attendance: Math.floor(Math.random() * 21) + 80, // 80-100%
        grade: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C"][Math.floor(Math.random() * 8)],
        lastAssignment: ["Completed", "Late", "Missing"][Math.floor(Math.random() * 3)],
        performance: ["Excellent", "Good", "Average", "Needs Improvement"][Math.floor(Math.random() * 4)] as any,
      }))

      const mockClass: ClassDetails = {
        id: Number.parseInt(params.id),
        name: "Grade 10A",
        subject: "Mathematics",
        students: mockStudents,
        averageGrade: "B+",
        attendance: 94,
        nextClass: "Monday, 8:00 AM",
        room: "Room 101",
        description:
          "This course covers fundamental concepts in algebra, geometry, and trigonometry. Students will develop problem-solving skills and mathematical reasoning through various exercises and projects.",
        syllabus:
          "Unit 1: Algebraic Expressions\nUnit 2: Linear Equations\nUnit 3: Quadratic Functions\nUnit 4: Geometry\nUnit 5: Trigonometry\nUnit 6: Statistics and Probability",
      }

      setTimeout(() => {
        setClassDetails(mockClass)
        setLoading(false)
      }, 500)
    }

    fetchClassDetails()
  }, [params.id])

  if (loading || !classDetails) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <div className="text-lg font-medium">Loading class information...</div>
          <div className="mt-2 text-sm text-muted-foreground">Please wait while we fetch the class details.</div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.push("/teacher/classes")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">Class Details</h2>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
          <Button>
            <MessageSquare className="mr-2 h-4 w-4" />
            Message Class
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-6">
        {/* Class Overview Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Class Overview</CardTitle>
            <CardDescription>Class information and statistics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold">{classDetails.name}</h3>
              <Badge>{classDetails.subject}</Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Room:</span>
                <span>{classDetails.room}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Next Class:</span>
                <span>{classDetails.nextClass}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Students:</span>
                <span>{classDetails.students.length}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Average Grade:</span>
                <span>{classDetails.averageGrade}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Attendance Rate:</span>
                <span>{classDetails.attendance}%</span>
              </div>
            </div>
            <div>
              <h4 className="mb-2 font-medium">Class Description</h4>
              <p className="text-sm text-muted-foreground">{classDetails.description}</p>
            </div>
            <div>
              <h4 className="mb-2 font-medium">Syllabus</h4>
              <p className="whitespace-pre-line text-sm text-muted-foreground">{classDetails.syllabus}</p>
            </div>
          </CardContent>
        </Card>

        {/* Class Details Tabs */}
        <div className="md:col-span-4">
          <Tabs defaultValue="students" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
              <TabsTrigger value="grades">Grades</TabsTrigger>
            </TabsList>
            <TabsContent value="students">
              <Card>
                <CardHeader>
                  <CardTitle>Student List</CardTitle>
                  <CardDescription>All students enrolled in this class</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="p-2 text-left">ID</th>
                          <th className="p-2 text-left">Name</th>
                          <th className="p-2 text-left">Attendance</th>
                          <th className="p-2 text-left">Grade</th>
                          <th className="p-2 text-left">Performance</th>
                          <th className="p-2 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {classDetails.students.slice(0, 10).map((student) => (
                          <tr key={student.id} className="border-b">
                            <td className="p-2">{student.id}</td>
                            <td className="p-2 font-medium">{student.name}</td>
                            <td className="p-2">{student.attendance}%</td>
                            <td className="p-2">{student.grade}</td>
                            <td className="p-2">
                              <Badge
                                variant={
                                  student.performance === "Excellent"
                                    ? "default"
                                    : student.performance === "Good"
                                      ? "secondary"
                                      : student.performance === "Average"
                                        ? "outline"
                                        : "destructive"
                                }
                              >
                                {student.performance}
                              </Badge>
                            </td>
                            <td className="p-2">
                              <Button variant="ghost" size="sm">
                                View
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-2 text-center text-sm text-muted-foreground">
                    Showing 10 of {classDetails.students.length} students
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="attendance">
              <Card>
                <CardHeader>
                  <CardTitle>Attendance Tracking</CardTitle>
                  <CardDescription>Monitor and manage class attendance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6 space-y-4">
                    <div>
                      <h4 className="mb-2 font-medium">Attendance Overview</h4>
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="rounded-md border p-3 text-center">
                          <div className="text-2xl font-bold">{classDetails.attendance}%</div>
                          <div className="text-sm text-muted-foreground">Overall Attendance</div>
                        </div>
                        <div className="rounded-md border p-3 text-center">
                          <div className="text-2xl font-bold">
                            {classDetails.students.filter((s) => s.attendance >= 90).length}
                          </div>
                          <div className="text-sm text-muted-foreground">Excellent Attendance (90%+)</div>
                        </div>
                        <div className="rounded-md border p-3 text-center">
                          <div className="text-2xl font-bold">
                            {classDetails.students.filter((s) => s.attendance < 80).length}
                          </div>
                          <div className="text-sm text-muted-foreground">At Risk (Below 80%)</div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="mb-2 font-medium">Recent Attendance</h4>
                      <div className="rounded-md border p-3">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="font-medium">October 20, 2023</span>
                          <Badge>96% Present</Badge>
                        </div>
                        <div className="mb-2 flex items-center justify-between">
                          <span className="font-medium">October 18, 2023</span>
                          <Badge>93% Present</Badge>
                        </div>
                        <div className="mb-2 flex items-center justify-between">
                          <span className="font-medium">October 16, 2023</span>
                          <Badge>89% Present</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <Button>
                      <ClipboardCheck className="mr-2 h-4 w-4" />
                      Take Attendance
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="grades">
              <Card>
                <CardHeader>
                  <CardTitle>Grade Management</CardTitle>
                  <CardDescription>Track and manage student grades</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6 space-y-4">
                    <div>
                      <h4 className="mb-2 font-medium">Grade Distribution</h4>
                      <div className="grid gap-4 md:grid-cols-4">
                        <div className="rounded-md border p-3 text-center">
                          <div className="text-2xl font-bold">
                            {classDetails.students.filter((s) => s.grade.startsWith("A")).length}
                          </div>
                          <div className="text-sm text-muted-foreground">A Range</div>
                        </div>
                        <div className="rounded-md border p-3 text-center">
                          <div className="text-2xl font-bold">
                            {classDetails.students.filter((s) => s.grade.startsWith("B")).length}
                          </div>
                          <div className="text-sm text-muted-foreground">B Range</div>
                        </div>
                        <div className="rounded-md border p-3 text-center">
                          <div className="text-2xl font-bold">
                            {classDetails.students.filter((s) => s.grade.startsWith("C")).length}
                          </div>
                          <div className="text-sm text-muted-foreground">C Range</div>
                        </div>
                        <div className="rounded-md border p-3 text-center">
                          <div className="text-2xl font-bold">
                            {
                              classDetails.students.filter(
                                (s) => !s.grade.startsWith("A") && !s.grade.startsWith("B") && !s.grade.startsWith("C"),
                              ).length
                            }
                          </div>
                          <div className="text-sm text-muted-foreground">Below C</div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="mb-2 font-medium">Recent Assignments</h4>
                      <div className="rounded-md border">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b bg-muted/50">
                              <th className="p-2 text-left">Assignment</th>
                              <th className="p-2 text-left">Due Date</th>
                              <th className="p-2 text-left">Completion Rate</th>
                              <th className="p-2 text-left">Average Score</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b">
                              <td className="p-2 font-medium">Quadratic Equations Quiz</td>
                              <td className="p-2">Oct 18, 2023</td>
                              <td className="p-2">100%</td>
                              <td className="p-2">85%</td>
                            </tr>
                            <tr className="border-b">
                              <td className="p-2 font-medium">Geometry Problem Set</td>
                              <td className="p-2">Oct 12, 2023</td>
                              <td className="p-2">96%</td>
                              <td className="p-2">82%</td>
                            </tr>
                            <tr className="border-b">
                              <td className="p-2 font-medium">Algebra Mid-term Exam</td>
                              <td className="p-2">Oct 5, 2023</td>
                              <td className="p-2">100%</td>
                              <td className="p-2">79%</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center gap-2">
                    <Button variant="outline">
                      <FileText className="mr-2 h-4 w-4" />
                      Grade Report
                    </Button>
                    <Button>
                      <Award className="mr-2 h-4 w-4" />
                      Enter Grades
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Additional Cards */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Upcoming Assignments</CardTitle>
            <CardDescription>Scheduled assignments and assessments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Trigonometry Quiz</p>
                  <p className="text-sm text-muted-foreground">Due: Oct 27, 2023</p>
                </div>
                <Badge>Upcoming</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Problem Set #5</p>
                  <p className="text-sm text-muted-foreground">Due: Nov 3, 2023</p>
                </div>
                <Badge>Upcoming</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Mid-term Project</p>
                  <p className="text-sm text-muted-foreground">Due: Nov 10, 2023</p>
                </div>
                <Badge>Upcoming</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Teaching Resources</CardTitle>
            <CardDescription>Available materials for this class</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <BookOpen className="h-8 w-8 text-muted-foreground" />
                <div>
                  <p className="font-medium">Mathematics Textbook</p>
                  <p className="text-sm text-muted-foreground">Advanced Algebra - 10th Edition</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <FileText className="h-8 w-8 text-muted-foreground" />
                <div>
                  <p className="font-medium">Lesson Plans</p>
                  <p className="text-sm text-muted-foreground">Current Term - Mathematics</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Award className="h-8 w-8 text-muted-foreground" />
                <div>
                  <p className="font-medium">Assessment Materials</p>
                  <p className="text-sm text-muted-foreground">Quizzes, Tests, and Projects</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
