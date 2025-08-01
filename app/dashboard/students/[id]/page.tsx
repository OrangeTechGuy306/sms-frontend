"use client"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { EditStudentModal } from "@/components/modals/edit-student-modal"
import { DeleteConfirmationModal } from "@/components/modals/delete-confirmation-modal"
import { ArrowLeft, Pencil, Trash2, FileText, Calendar, ClipboardCheck } from "lucide-react"
import { studentsApi } from "@/src/lib/api"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/src/contexts/AuthContext"

interface Student {
  // Student table fields
  id: number | string  // Accept both integer and string IDs
  student_id: string
  user_id: number | string
  class_id?: number | string
  current_class_id?: number | string
  admission_number?: string
  admission_date?: string
  roll_number?: string
  blood_group?: string
  nationality?: string
  religion?: string
  category?: string
  mother_tongue?: string
  previous_school?: string
  medical_conditions?: string
  emergency_contact_name?: string
  emergency_contact_phone?: string
  emergency_contact_relation?: string
  transport_required?: number | boolean
  hostel_required?: number | boolean
  status?: string
  created_at?: string
  updated_at?: string

  // User table fields (joined)
  first_name: string
  last_name: string
  full_name?: string
  email: string
  phone?: string
  date_of_birth?: string
  gender?: string
  address?: string
  profile_picture?: string
  user_status: string
  last_login?: string

  // Class information (joined)
  class_name?: string
  grade_level?: string
  academic_year?: string
}

interface Parent {
  id: number | string
  first_name: string
  last_name: string
  relationship: string
  phone?: string
  work_phone?: string
  occupation?: string
  address?: string
  email: string
  is_primary: boolean
}

interface StudentDetailData {
  student: Student
  parents: Parent[]
}

export default function StudentDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap params using React.use()
  const resolvedParams = use(params)
  const router = useRouter()
  const { toast } = useToast()
  const { user, isAuthenticated, isLoading: authLoading } = useAuth()
  const [studentData, setStudentData] = useState<StudentDetailData | null>(null)
  const [academicData, setAcademicData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setLoading(true)
        setError(null)

        console.log('Auth status:', { isAuthenticated, authLoading, user });
        console.log('Token in localStorage:', localStorage.getItem('auth_token'));
        console.log('Fetching student with ID:', resolvedParams.id)
        const response = await studentsApi.getById(resolvedParams.id)
        console.log('Student API response:', response)

        // Debug logging
        console.log('=== DEBUGGING STUDENT DATA ===');
        console.log('Response:', response);

        // The apiCall helper already extracts response.data.data, so response is the actual data
        if (response && response.student) {
          console.log('Student object:', response.student);
          console.log('Parents array:', response.parents);

          console.log('Student ID:', response.student.id, typeof response.student.id);
          console.log('Student first_name:', response.student.first_name);
          console.log('Student last_name:', response.student.last_name);
          console.log('Student full_name:', response.student.full_name);
          console.log('Student email:', response.student.email);
          console.log('Student user_status:', response.student.user_status);

          // Clear any existing error first
          setError(null);

          // Set the student data - response is already the data we need
          setStudentData(response);

          console.log('Student data set successfully');

        } else {
          console.log('Failed to load student data - no student in response');
          console.log('Response:', response);
          setError('Failed to load student data')
        }
      } catch (error) {
        console.error('Error fetching student:', error)
        setError('Failed to load student data')
        toast({
          title: "Error",
          description: "Failed to load student information",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    if (resolvedParams.id && !authLoading) {
      if (!isAuthenticated) {
        console.log('User not authenticated, redirecting to login');
        router.push('/login');
        return;
      }
      fetchStudent()
    }
  }, [resolvedParams.id, toast, isAuthenticated, authLoading, router])



  const handleEditStudent = async (updatedStudent: Student) => {
    try {
      await studentsApi.update(updatedStudent.id, updatedStudent)

      // Update local state
      if (studentData) {
        setStudentData({
          ...studentData,
          student: updatedStudent
        })
      }

      toast({
        title: "Success",
        description: "Student information updated successfully",
      })
    } catch (error) {
      console.error('Error updating student:', error)
      toast({
        title: "Error",
        description: "Failed to update student information",
        variant: "destructive",
      })
    }
  }

  const handleDeleteStudent = async () => {
    try {
      if (!studentData?.student) return

      await studentsApi.delete(studentData.student.id)

      toast({
        title: "Success",
        description: "Student deleted successfully",
      })

      // Navigate back to students list
      router.push("/dashboard/students")
    } catch (error) {
      console.error('Error deleting student:', error)
      toast({
        title: "Error",
        description: "Failed to delete student",
        variant: "destructive",
      })
    }
  }

  if (authLoading || loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">
            {authLoading ? 'Checking authentication...' : 'Loading student details...'}
          </p>
        </div>
      </div>
    )
  }



  if (error || !studentData?.student) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-900">Student Not Found</p>
          <p className="mt-2 text-sm text-gray-600">{error || 'The requested student could not be found.'}</p>

          <Button
            onClick={() => router.push('/dashboard/students')}
            className="mt-4"
          >
            Back to Students
          </Button>
        </div>
      </div>
    )
  }

  const { student, parents } = studentData;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.push("/dashboard/students")}>
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
            description={`Are you sure you want to delete ${student.full_name || `${student.first_name} ${student.last_name}`}? This action cannot be undone.`}
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
              {student.profile_picture ? (
                <AvatarImage src={student.profile_picture || "/placeholder.svg"} alt={student.full_name} />
              ) : (
                <AvatarFallback className="text-4xl">
                  {student.first_name?.charAt(0)}{student.last_name?.charAt(0)}
                </AvatarFallback>
              )}
            </Avatar>
            <h3 className="mt-4 text-xl font-bold">{student.full_name || `${student.first_name} ${student.last_name}`}</h3>
            <p className="text-sm text-muted-foreground">Student ID: {student.student_id}</p>
            <div className="mt-2 flex gap-2">
              <Badge variant={student.user_status === "active" ? "default" : "outline"}>
                {student.user_status?.charAt(0).toUpperCase() + student.user_status?.slice(1) || "Unknown"}
              </Badge>
              {student.status && student.status !== student.user_status && (
                <Badge variant="secondary">
                  {student.status?.charAt(0).toUpperCase() + student.status?.slice(1)}
                </Badge>
              )}
            </div>
            <div className="mt-6 w-full space-y-2 text-left">
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Class:</span>
                <span>{student.class_name || "Not Assigned"}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Grade Level:</span>
                <span>{student.grade_level || "N/A"}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Gender:</span>
                <span>{student.gender?.charAt(0).toUpperCase() + student.gender?.slice(1) || "N/A"}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Date of Birth:</span>
                <span>{student.date_of_birth ? new Date(student.date_of_birth).toLocaleDateString() : "N/A"}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Blood Group:</span>
                <span>{student.blood_group || "N/A"}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Admission Date:</span>
                <span>{student.admission_date ? new Date(student.admission_date).toLocaleDateString() : "N/A"}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Religion:</span>
                <span>{student.religion || "N/A"}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Nationality:</span>
                <span>{student.nationality || "N/A"}</span>
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
                          <span>{student.email || "N/A"}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span>Phone:</span>
                          <span>{student.phone || "N/A"}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span>Address:</span>
                          <span>{student.address || "N/A"}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="mb-2 font-medium">Parent/Guardian Contact</h4>
                      <div className="space-y-2">
                        {parents && parents.length > 0 ? (
                          parents.map((parent, index) => (
                            <div key={parent.id} className="mb-4">
                              <div className="flex items-center gap-2 mb-2">
                                <h5 className="font-medium">{parent.first_name} {parent.last_name}</h5>
                                {parent.is_primary && <Badge variant="secondary" className="text-xs">Primary</Badge>}
                              </div>
                              <div className="space-y-1 text-sm">
                                <div className="flex justify-between border-b pb-1">
                                  <span>Relationship:</span>
                                  <span>{parent.relationship}</span>
                                </div>
                                <div className="flex justify-between border-b pb-1">
                                  <span>Email:</span>
                                  <span>{parent.email}</span>
                                </div>
                                <div className="flex justify-between border-b pb-1">
                                  <span>Phone:</span>
                                  <span>{parent.phone || "N/A"}</span>
                                </div>
                                {parent.work_phone && (
                                  <div className="flex justify-between border-b pb-1">
                                    <span>Work Phone:</span>
                                    <span>{parent.work_phone}</span>
                                  </div>
                                )}
                                {parent.occupation && (
                                  <div className="flex justify-between border-b pb-1">
                                    <span>Occupation:</span>
                                    <span>{parent.occupation}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-muted-foreground">No parent information available</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-2 font-medium">Emergency Contact</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between border-b pb-2">
                        <span>Name:</span>
                        <span>{student.emergency_contact_name || "N/A"}</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span>Phone:</span>
                        <span>{student.emergency_contact_phone || "N/A"}</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span>Relationship:</span>
                        <span>{student.emergency_contact_relation || "N/A"}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-2 font-medium">Medical Information</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between border-b pb-2">
                        <span>Medical Conditions:</span>
                        <span>{student.medical_conditions || "None"}</span>
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
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      <div className="rounded-md border p-4">
                        <h4 className="mb-2 font-medium">Academic Year</h4>
                        <div className="text-lg font-bold">{student.academic_year || "N/A"}</div>
                        <p className="text-sm text-muted-foreground">Current academic year</p>
                      </div>
                      <div className="rounded-md border p-4">
                        <h4 className="mb-2 font-medium">Admission Number</h4>
                        <div className="text-lg font-bold">{student.admission_number || "Not Set"}</div>
                        <p className="text-sm text-muted-foreground">Student admission number</p>
                      </div>
                      <div className="rounded-md border p-4">
                        <h4 className="mb-2 font-medium">Student ID</h4>
                        <div className="text-lg font-bold">{student.student_id}</div>
                        <p className="text-sm text-muted-foreground">Unique student identifier</p>
                      </div>
                      <div className="rounded-md border p-4">
                        <h4 className="mb-2 font-medium">Current Class</h4>
                        <div className="text-lg font-bold">{student.class_name || "Not Assigned"}</div>
                        <p className="text-sm text-muted-foreground">Assigned class</p>
                      </div>
                      <div className="rounded-md border p-4">
                        <h4 className="mb-2 font-medium">Grade Level</h4>
                        <div className="text-lg font-bold">{student.grade_level || "N/A"}</div>
                        <p className="text-sm text-muted-foreground">Current grade level</p>
                      </div>
                      <div className="rounded-md border p-4">
                        <h4 className="mb-2 font-medium">Previous School</h4>
                        <div className="text-lg font-bold">{student.previous_school || "Not Specified"}</div>
                        <p className="text-sm text-muted-foreground">Previous institution</p>
                      </div>
                    </div>
                    <div className="mt-6">
                      <h4 className="mb-4 font-medium text-lg">Additional Information</h4>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <div className="flex justify-between border-b pb-2">
                            <span className="font-medium">Mother Tongue:</span>
                            <span>{student.mother_tongue || "Not Specified"}</span>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                            <span className="font-medium">Category:</span>
                            <span>{student.category || "Not Specified"}</span>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                            <span className="font-medium">Transport Required:</span>
                            <span>{student.transport_required ? "Yes" : "No"}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between border-b pb-2">
                            <span className="font-medium">Hostel Required:</span>
                            <span>{student.hostel_required ? "Yes" : "No"}</span>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                            <span className="font-medium">Enrollment Date:</span>
                            <span>{student.created_at ? new Date(student.created_at).toLocaleDateString() : "N/A"}</span>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                            <span className="font-medium">Last Updated:</span>
                            <span>{student.updated_at ? new Date(student.updated_at).toLocaleDateString() : "N/A"}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" disabled>
                    <FileText className="mr-2 h-4 w-4" />
                    Generate Academic Report (Coming Soon)
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
                    <div className="text-center py-8">
                      <Calendar className="mx-auto h-12 w-12 text-muted-foreground" />
                      <h3 className="mt-4 text-lg font-semibold">Attendance Data Not Available</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Attendance records will be available once the attendance system is integrated.
                      </p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-md border p-4">
                        <h4 className="mb-2 font-medium">Roll Number</h4>
                        <div className="text-lg font-bold">{student.roll_number || "N/A"}</div>
                        <p className="text-sm text-muted-foreground">Student roll number</p>
                      </div>
                      <div className="rounded-md border p-4">
                        <h4 className="mb-2 font-medium">Last Login</h4>
                        <div className="text-lg font-bold">
                          {student.last_login ? new Date(student.last_login).toLocaleDateString() : "Never"}
                        </div>
                        <p className="text-sm text-muted-foreground">Last system access</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" disabled>
                    <Calendar className="mr-2 h-4 w-4" />
                    View Full Attendance Calendar (Coming Soon)
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
