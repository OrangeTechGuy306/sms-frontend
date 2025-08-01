"use client"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { EditTeacherModal } from "@/components/modals/edit-teacher-modal"
import { DeleteConfirmationModal } from "@/components/modals/delete-confirmation-modal"
import { ArrowLeft, Pencil, Trash2, FileText, Calendar, BookOpen, Clock } from "lucide-react"

interface Teacher {
  id: string
  name: string
  subject: string
  contact: string
  joined: string
  status: string
  // Additional fields for the detailed view
  email?: string
  dateOfBirth?: string
  address?: string
  qualification?: string
  department?: string
  specialization?: string
  // Schedule information
  schedule?: {
    day: string
    periods: {
      time: string
      class: string
      subject: string
    }[]
  }[]
  // Classes taught
  classes?: {
    name: string
    students: number
    averageGrade: string
  }[]
}

export default function TeacherDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap params using React.use()
  const resolvedParams = use(params)
  const router = useRouter()
  const [teacher, setTeacher] = useState<Teacher | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real application, this would be an API call
    // For now, we'll simulate fetching the teacher data
    const fetchTeacher = () => {
      setLoading(true)
      // Simulate API delay
      setTimeout(() => {
        // Mock teacher data
        const mockTeacher: Teacher = {
          id: resolvedParams.id,
          name: "Dr. Robert Wilson",
          subject: "Mathematics",
          contact: "(555) 111-2222",
          joined: "Sep 2018",
          status: "Active",
          email: "robert.wilson@school.edu",
          dateOfBirth: "1975-08-22",
          address: "456 Faculty Avenue, Education City, EC 12345",
          qualification: "Ph.D. in Mathematics, University of Cambridge",
          department: "Mathematics",
          specialization: "Calculus, Linear Algebra",
          schedule: [
            {
              day: "Monday",
              periods: [
                { time: "8:00 - 9:30", class: "Grade 10A", subject: "Mathematics" },
                { time: "11:00 - 12:30", class: "Grade 11B", subject: "Mathematics" },
              ],
            },
            {
              day: "Tuesday",
              periods: [
                { time: "9:30 - 11:00", class: "Grade 9B", subject: "Mathematics" },
                { time: "1:00 - 2:30", class: "Office Hours", subject: "Consultation" },
              ],
            },
            {
              day: "Wednesday",
              periods: [
                { time: "8:00 - 9:30", class: "Grade 12A", subject: "Mathematics" },
                { time: "1:00 - 2:30", class: "Department Meeting", subject: "Meeting" },
              ],
            },
            {
              day: "Thursday",
              periods: [
                { time: "8:00 - 9:30", class: "Grade 11A", subject: "Mathematics" },
                { time: "11:00 - 12:30", class: "Grade 10B", subject: "Mathematics" },
              ],
            },
            {
              day: "Friday",
              periods: [
                { time: "9:30 - 11:00", class: "Office Hours", subject: "Consultation" },
                { time: "1:00 - 2:30", class: "Grade 9A", subject: "Mathematics" },
              ],
            },
          ],
          classes: [
            { name: "Grade 10A", students: 28, averageGrade: "B+" },
            { name: "Grade 11B", students: 25, averageGrade: "A-" },
            { name: "Grade 9B", students: 30, averageGrade: "B" },
            { name: "Grade 12A", students: 22, averageGrade: "A" },
            { name: "Grade 11A", students: 26, averageGrade: "B+" },
          ],
        }
        setTeacher(mockTeacher)
        setLoading(false)
      }, 500)
    }

    fetchTeacher()
  }, [resolvedParams.id])

  const handleEditTeacher = (updatedTeacher: Teacher) => {
    setTeacher(updatedTeacher)
  }

  const handleDeleteTeacher = () => {
    // In a real application, this would be an API call
    // For now, we'll just navigate back to the teachers list
    router.push("/teachers")
  }

  if (loading || !teacher) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <div className="text-lg font-medium">Loading teacher information...</div>
          <div className="mt-2 text-sm text-muted-foreground">Please wait while we fetch the teacher details.</div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.push("/teachers")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">Teacher Details</h2>
        </div>
        <div className="flex gap-2">
          <EditTeacherModal
            teacher={teacher}
            onSave={handleEditTeacher}
            trigger={
              <Button variant="outline">
                <Pencil className="mr-2 h-4 w-4" />
                Edit Teacher
              </Button>
            }
          />
          <DeleteConfirmationModal
            title="Delete Teacher"
            description={`Are you sure you want to delete ${teacher.name}? This action cannot be undone.`}
            onConfirm={handleDeleteTeacher}
            trigger={
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Teacher
              </Button>
            }
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-6">
        {/* Teacher Profile Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Teacher personal information</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center">
            <Avatar className="h-32 w-32">
              <AvatarImage src="/placeholder.svg" alt={teacher.name} />
              <AvatarFallback className="text-4xl">
                {teacher.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <h3 className="mt-4 text-xl font-bold">{teacher.name}</h3>
            <p className="text-sm text-muted-foreground">ID: {teacher.id}</p>
            <Badge className="mt-2" variant={teacher.status === "Active" ? "default" : "outline"}>
              {teacher.status}
            </Badge>
            <div className="mt-6 w-full space-y-2 text-left">
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Department:</span>
                <span>{teacher.department}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Subject:</span>
                <span>{teacher.subject}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Joined:</span>
                <span>{teacher.joined}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Specialization:</span>
                <span>{teacher.specialization}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Teacher Details Tabs */}
        <div className="md:col-span-4">
          <Tabs defaultValue="contact" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="contact">Contact</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="classes">Classes</TabsTrigger>
            </TabsList>
            <TabsContent value="contact">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>Teacher contact details and qualifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="mb-2 font-medium">Contact Details</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between border-b pb-2">
                          <span>Email:</span>
                          <span>{teacher.email}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span>Phone:</span>
                          <span>{teacher.contact}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span>Address:</span>
                          <span>{teacher.address}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="mb-2 font-medium">Personal Information</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between border-b pb-2">
                          <span>Date of Birth:</span>
                          <span>{teacher.dateOfBirth}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-2 font-medium">Qualifications</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between border-b pb-2">
                        <span>Qualification:</span>
                        <span>{teacher.qualification}</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span>Years of Experience:</span>
                        <span>12 years</span>
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
            <TabsContent value="schedule">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Schedule</CardTitle>
                  <CardDescription>Teacher's weekly class and meeting schedule</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {teacher.schedule?.map((day, index) => (
                      <div key={index}>
                        <h4 className="mb-2 font-medium">{day.day}</h4>
                        <div className="rounded-md border">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b bg-muted/50">
                                <th className="p-2 text-left">Time</th>
                                <th className="p-2 text-left">Class</th>
                                <th className="p-2 text-left">Subject</th>
                              </tr>
                            </thead>
                            <tbody>
                              {day.periods.map((period, periodIndex) => (
                                <tr key={periodIndex} className="border-b">
                                  <td className="p-2">{period.time}</td>
                                  <td className="p-2">{period.class}</td>
                                  <td className="p-2">{period.subject}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Calendar className="mr-2 h-4 w-4" />
                    View Full Calendar
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="classes">
              <Card>
                <CardHeader>
                  <CardTitle>Classes Taught</CardTitle>
                  <CardDescription>Classes and student performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="p-2 text-left">Class</th>
                          <th className="p-2 text-left">Students</th>
                          <th className="p-2 text-left">Average Grade</th>
                          <th className="p-2 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {teacher.classes?.map((classInfo, index) => (
                          <tr key={index} className="border-b">
                            <td className="p-2">{classInfo.name}</td>
                            <td className="p-2">{classInfo.students}</td>
                            <td className="p-2">{classInfo.averageGrade}</td>
                            <td className="p-2">
                              <Button variant="ghost" size="sm">
                                View Details
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <FileText className="mr-2 h-4 w-4" />
                    Generate Class Report
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Additional Cards */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Scheduled events and meetings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Department Meeting</p>
                  <p className="text-sm text-muted-foreground">Oct 25, 2023 - 10:00 AM</p>
                </div>
                <Badge>Upcoming</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Parent-Teacher Conference</p>
                  <p className="text-sm text-muted-foreground">Oct 30, 2023 - 2:00 PM</p>
                </div>
                <Badge>Upcoming</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Mathematics Competition</p>
                  <p className="text-sm text-muted-foreground">Nov 5, 2023 - 9:00 AM</p>
                </div>
                <Badge>Upcoming</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Teaching Resources</CardTitle>
            <CardDescription>Available teaching materials and resources</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <BookOpen className="h-8 w-8 text-muted-foreground" />
                <div>
                  <p className="font-medium">Mathematics Textbook</p>
                  <p className="text-sm text-muted-foreground">Advanced Calculus - 10th Edition</p>
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
                <Clock className="h-8 w-8 text-muted-foreground" />
                <div>
                  <p className="font-medium">Office Hours</p>
                  <p className="text-sm text-muted-foreground">Tuesday & Friday, 1:00 - 3:00 PM</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
