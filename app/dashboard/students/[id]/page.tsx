"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { EditStudentModal } from "@/components/modals/edit-student-modal"
import { DeleteConfirmationModal } from "@/components/modals/delete-confirmation-modal"
import { ArrowLeft, Pencil, Trash2, FileText, Calendar, ClipboardCheck } from "lucide-react"

interface Student {
  id: string
  name: string
  class: string
  gender: string
  parent: string
  contact: string
  status: string
  // Additional fields for the detailed view
  email?: string
  dateOfBirth?: string
  address?: string
  admissionDate?: string
  bloodGroup?: string
  emergencyContact?: string
  medicalConditions?: string
  religion?: string
  nationality?: string
  passportPhoto?: string | null
  // Academic information
  attendance?: number
  grades?: {
    subject: string
    grade: string
    score: number
  }[]
}

export default function StudentDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [student, setStudent] = useState<Student | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real application, this would be an API call
    // For now, we'll simulate fetching the student data
    const fetchStudent = () => {
      setLoading(true)
      // Simulate API delay
      setTimeout(() => {
        // Mock student data
        const mockStudent: Student = {
          id: params.id,
          name: "John Doe",
          class: "Grade 10A",
          gender: "Male",
          parent: "Robert Doe",
          contact: "(555) 123-4567",
          status: "Active",
          email: "john.doe@student.school.edu",
          dateOfBirth: "2008-05-15",
          address: "123 Student Lane, Education City, EC 12345",
          admissionDate: "2020-09-01",
          bloodGroup: "O+",
          emergencyContact: "(555) 987-6543",
          medicalConditions: "None",
          religion: "Christianity",
          nationality: "American",
          passportPhoto: "/placeholder.svg",
          attendance: 95,
          grades: [
            { subject: "Mathematics", grade: "A", score: 92 },
            { subject: "English", grade: "B+", score: 88 },
            { subject: "Science", grade: "A-", score: 90 },
            { subject: "History", grade: "B", score: 85 },
            { subject: "Physical Education", grade: "A", score: 95 },
          ],
        }
        setStudent(mockStudent)
        setLoading(false)
      }, 500)
    }

    fetchStudent()
  }, [params.id])

  const handleEditStudent = (updatedStudent: Student) => {
    setStudent(updatedStudent)
  }

  const handleDeleteStudent = () => {
    // In a real application, this would be an API call
    // For now, we'll just navigate back to the students list
    router.push("/students")
  }

  if (loading || !student) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <div className="text-lg font-medium">Loading student information...</div>
          <div className="mt-2 text-sm text-muted-foreground">Please wait while we fetch the student details.</div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.push("/students")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">Student Details</h2>
        </div>
        <div className="flex gap-2">
          <EditStudentModal
            student={student}
            onSave={handleEditStudent}
            trigger={
              <Button variant="outline">
                <Pencil className="mr-2 h-4 w-4" />
                Edit Student
              </Button>
            }
          />
          <DeleteConfirmationModal
            title="Delete Student"
            description={`Are you sure you want to delete ${student.name}? This action cannot be undone.`}
            onConfirm={handleDeleteStudent}
            trigger={
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Student
              </Button>
            }
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-6">
        {/* Student Profile Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Student personal information</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center">
            <Avatar className="h-32 w-32">
              {student.passportPhoto ? (
                <AvatarImage src={student.passportPhoto || "/placeholder.svg"} alt={student.name} />
              ) : (
                <AvatarFallback className="text-4xl">{student.name.charAt(0)}</AvatarFallback>
              )}
            </Avatar>
            <h3 className="mt-4 text-xl font-bold">{student.name}</h3>
            <p className="text-sm text-muted-foreground">ID: {student.id}</p>
            <Badge className="mt-2" variant={student.status === "Active" ? "default" : "outline"}>
              {student.status}
            </Badge>
            <div className="mt-6 w-full space-y-2 text-left">
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Class:</span>
                <span>{student.class}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Gender:</span>
                <span>{student.gender}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Date of Birth:</span>
                <span>{student.dateOfBirth}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Blood Group:</span>
                <span>{student.bloodGroup}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Admission Date:</span>
                <span>{student.admissionDate}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Religion:</span>
                <span>{student.religion}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Nationality:</span>
                <span>{student.nationality}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Student Details Tabs */}
        <div className="md:col-span-4">
          <Tabs defaultValue="contact" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="contact">Contact</TabsTrigger>
              <TabsTrigger value="academic">Academic</TabsTrigger>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
            </TabsList>
            <TabsContent value="contact">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>Student and parent/guardian contact details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="mb-2 font-medium">Student Contact</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between border-b pb-2">
                          <span>Email:</span>
                          <span>{student.email}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span>Phone:</span>
                          <span>{student.contact}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span>Address:</span>
                          <span>{student.address}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="mb-2 font-medium">Parent/Guardian Contact</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between border-b pb-2">
                          <span>Name:</span>
                          <span>{student.parent}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span>Phone:</span>
                          <span>{student.contact}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span>Emergency Contact:</span>
                          <span>{student.emergencyContact}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-2 font-medium">Medical Information</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between border-b pb-2">
                        <span>Medical Conditions:</span>
                        <span>{student.medicalConditions || "None"}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <FileText className="mr-2 h-4 w-4" />
                    Print Contact Information
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="academic">
              <Card>
                <CardHeader>
                  <CardTitle>Academic Performance</CardTitle>
                  <CardDescription>Current grades and academic standing</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="mb-2 font-medium">Current Term Grades</h4>
                      <div className="rounded-md border">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b bg-muted/50">
                              <th className="p-2 text-left">Subject</th>
                              <th className="p-2 text-left">Grade</th>
                              <th className="p-2 text-left">Score</th>
                            </tr>
                          </thead>
                          <tbody>
                            {student.grades?.map((grade, index) => (
                              <tr key={index} className="border-b">
                                <td className="p-2">{grade.subject}</td>
                                <td className="p-2">{grade.grade}</td>
                                <td className="p-2">{grade.score}%</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-md border p-4">
                        <h4 className="mb-2 font-medium">Average Grade</h4>
                        <div className="text-2xl font-bold">
                          {student.grades
                            ? (
                                student.grades.reduce((sum, grade) => sum + grade.score, 0) / student.grades.length
                              ).toFixed(1) + "%"
                            : "N/A"}
                        </div>
                        <p className="text-sm text-muted-foreground">Current term performance</p>
                      </div>
                      <div className="rounded-md border p-4">
                        <h4 className="mb-2 font-medium">Class Rank</h4>
                        <div className="text-2xl font-bold">5 / 30</div>
                        <p className="text-sm text-muted-foreground">Based on overall performance</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <FileText className="mr-2 h-4 w-4" />
                    Generate Academic Report
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="attendance">
              <Card>
                <CardHeader>
                  <CardTitle>Attendance Record</CardTitle>
                  <CardDescription>Student attendance history and statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="rounded-md border p-4">
                        <h4 className="mb-2 font-medium">Attendance Rate</h4>
                        <div className="text-2xl font-bold">{student.attendance}%</div>
                        <p className="text-sm text-muted-foreground">Current academic year</p>
                      </div>
                      <div className="rounded-md border p-4">
                        <h4 className="mb-2 font-medium">Days Present</h4>
                        <div className="text-2xl font-bold">152</div>
                        <p className="text-sm text-muted-foreground">Out of 160 school days</p>
                      </div>
                      <div className="rounded-md border p-4">
                        <h4 className="mb-2 font-medium">Days Absent</h4>
                        <div className="text-2xl font-bold">8</div>
                        <p className="text-sm text-muted-foreground">Total absences this year</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="mb-2 font-medium">Recent Attendance</h4>
                      <div className="rounded-md border">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b bg-muted/50">
                              <th className="p-2 text-left">Date</th>
                              <th className="p-2 text-left">Status</th>
                              <th className="p-2 text-left">Reason</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b">
                              <td className="p-2">2023-10-15</td>
                              <td className="p-2">
                                <Badge variant="default" className="bg-green-500">
                                  Present
                                </Badge>
                              </td>
                              <td className="p-2">-</td>
                            </tr>
                            <tr className="border-b">
                              <td className="p-2">2023-10-14</td>
                              <td className="p-2">
                                <Badge variant="default" className="bg-green-500">
                                  Present
                                </Badge>
                              </td>
                              <td className="p-2">-</td>
                            </tr>
                            <tr className="border-b">
                              <td className="p-2">2023-10-13</td>
                              <td className="p-2">
                                <Badge variant="outline">Absent</Badge>
                              </td>
                              <td className="p-2">Medical appointment</td>
                            </tr>
                            <tr className="border-b">
                              <td className="p-2">2023-10-12</td>
                              <td className="p-2">
                                <Badge variant="default" className="bg-green-500">
                                  Present
                                </Badge>
                              </td>
                              <td className="p-2">-</td>
                            </tr>
                            <tr className="border-b">
                              <td className="p-2">2023-10-11</td>
                              <td className="p-2">
                                <Badge variant="default" className="bg-green-500">
                                  Present
                                </Badge>
                              </td>
                              <td className="p-2">-</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Calendar className="mr-2 h-4 w-4" />
                    View Full Attendance Calendar
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Additional Cards */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Upcoming Assignments</CardTitle>
            <CardDescription>Pending assignments and due dates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Mathematics Problem Set</p>
                  <p className="text-sm text-muted-foreground">Due: Oct 25, 2023</p>
                </div>
                <Badge>Pending</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">English Literature Essay</p>
                  <p className="text-sm text-muted-foreground">Due: Oct 30, 2023</p>
                </div>
                <Badge>Pending</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Science Lab Report</p>
                  <p className="text-sm text-muted-foreground">Due: Nov 5, 2023</p>
                </div>
                <Badge>Pending</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Student's recent academic activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <ClipboardCheck className="h-8 w-8 text-muted-foreground" />
                <div>
                  <p className="font-medium">Completed History Quiz</p>
                  <p className="text-sm text-muted-foreground">Oct 18, 2023 - Score: 92%</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <FileText className="h-8 w-8 text-muted-foreground" />
                <div>
                  <p className="font-medium">Submitted Science Assignment</p>
                  <p className="text-sm text-muted-foreground">Oct 15, 2023</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Calendar className="h-8 w-8 text-muted-foreground" />
                <div>
                  <p className="font-medium">Participated in Math Competition</p>
                  <p className="text-sm text-muted-foreground">Oct 10, 2023</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
