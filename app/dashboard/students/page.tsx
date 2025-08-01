"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DataTable } from "@/components/ui/data-table"
import type { ColumnDef } from "@tanstack/react-table"
// import { EditStudentModal } from "@/components/modals/edit-student-modal" // Using unified AddStudentModal instead
import { DeleteConfirmationModal } from "@/components/modals/delete-confirmation-modal"
import { BulkDeleteConfirmationModal } from "@/components/modals/bulk-delete-confirmation-modal"
import { AddStudentModal } from "@/components/modals/add-student-modal"
import { StudentDocumentModal } from "@/components/modals/student-document-modal"
import { PrintStudentModal } from "@/components/modals/print-student-modal"
import { useToast } from "@/hooks/use-toast"
import { studentsApi } from "@/lib/api"
import { Download, Eye, FileText, Pencil, Plus, Printer, Trash2, Upload, Loader2 } from "lucide-react"

interface Student {
  // Primary identifiers
  id: string | number
  user_id?: number | string
  student_id: string

  // Personal information
  first_name: string
  last_name: string
  full_name?: string
  email: string
  phone?: string | null
  date_of_birth?: string | null
  gender?: string | null
  address?: string | null
  profile_picture?: string | null

  // Academic information
  class_id?: number | string | null
  current_class_id?: number | string | null
  class_name?: string | null
  grade_level?: string | null
  academic_year?: string | null
  admission_number?: string | null
  admission_date?: string | null
  roll_number?: string | null

  // Additional details
  blood_group?: string | null
  nationality?: string | null
  religion?: string | null
  category?: string | null
  mother_tongue?: string | null
  previous_school?: string | null
  medical_conditions?: string | null

  // Emergency contacts
  emergency_contact_name?: string | null
  emergency_contact_phone?: string | null
  emergency_contact_relation?: string | null

  // Requirements and status
  transport_required?: number | boolean | null
  hostel_required?: number | boolean | null
  status?: string | null
  user_status?: string

  // Timestamps
  created_at?: string | null
  updated_at?: string | null
  last_login?: string | null
}

export default function StudentsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [students, setStudents] = useState<Student[]>([])
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  })



  const fetchStudents = async (page = 1, limit = 10, search = '') => {
    try {
      setLoading(true)
      const response = await studentsApi.getAll({
        page,
        limit,
        search,
        sort_by: 'first_name',
        sort_order: 'ASC'
      })



      setStudents(response.data?.students || [])
      if (response.data?.pagination) {
        setPagination(response.data.pagination)
      }
    } catch (error) {
      console.error('Error fetching students:', error)
      toast({
        title: "Error",
        description: "Failed to fetch students. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  const handleSaveStudent = async (updatedStudent: Student) => {
    try {
      // Prepare data for API - only send fields that can be updated
      const updateData = {
        first_name: updatedStudent.first_name,
        last_name: updatedStudent.last_name,
        email: updatedStudent.email,
        phone: updatedStudent.phone,
        date_of_birth: updatedStudent.date_of_birth,
        gender: updatedStudent.gender,
        address: updatedStudent.address,
        blood_group: updatedStudent.blood_group,
        nationality: updatedStudent.nationality,
        religion: updatedStudent.religion,
        category: updatedStudent.category,
        mother_tongue: updatedStudent.mother_tongue,
        previous_school: updatedStudent.previous_school,
        medical_conditions: updatedStudent.medical_conditions,
        emergency_contact_name: updatedStudent.emergency_contact_name,
        emergency_contact_phone: updatedStudent.emergency_contact_phone,
        emergency_contact_relation: updatedStudent.emergency_contact_relation,
        admission_number: updatedStudent.admission_number,
        admission_date: updatedStudent.admission_date,
        roll_number: updatedStudent.roll_number,
        transport_required: updatedStudent.transport_required,
        hostel_required: updatedStudent.hostel_required,
        status: updatedStudent.status,
        current_class_id: updatedStudent.current_class_id,
      }

      await studentsApi.update(String(updatedStudent.id), updateData)

      // Refresh the students list to get the latest data
      await fetchStudents()

      toast({
        title: "Student Updated",
        description: `${updatedStudent.first_name} ${updatedStudent.last_name}'s information has been updated successfully.`,
      })
    } catch (error) {
      console.error('Error updating student:', error)
      toast({
        title: "Error",
        description: "Failed to update student. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteStudent = async (id: string | number) => {
    try {
      const stringId = String(id)
      await studentsApi.delete(stringId)
      setStudents((prev) => prev.filter((student) => String(student.id) !== stringId))
      toast({
        title: "Student Deleted",
        description: "Student has been deleted successfully.",
      })
    } catch (error) {
      console.error('Error deleting student:', error)
      toast({
        title: "Error",
        description: "Failed to delete student. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleAddStudent = async (newStudent: any) => {
    try {
      const response = await studentsApi.create(newStudent)

      // Refresh the students list to get the latest data
      await fetchStudents()

      toast({
        title: "Student Added",
        description: `${newStudent.firstName} ${newStudent.lastName} has been added successfully.`,
      })
    } catch (error) {
      console.error('Error adding student:', error)
      toast({
        title: "Error",
        description: "Failed to add student. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleBulkDelete = async () => {
    try {
      // Delete students one by one (could be optimized with bulk delete API)
      await Promise.all(selectedRows.map(id => studentsApi.delete(String(id))))
      setStudents((prev) => prev.filter((student) => !selectedRows.includes(String(student.id))))
      toast({
        title: "Students Deleted",
        description: `${selectedRows.length} students have been deleted successfully.`,
      })
      setSelectedRows([])
    } catch (error) {
      console.error('Error deleting students:', error)
      toast({
        title: "Error",
        description: "Failed to delete students. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleExportStudents = async () => {
    try {
      if (students.length === 0) {
        toast({
          title: "No Data",
          description: "No students to export.",
          variant: "destructive",
        })
        return
      }

      // Generate CSV export
      const csvData = students.map(student => ({
        'Student ID': student.student_id || '',
        'Name': `${student.first_name} ${student.last_name}`,
        'Email': student.email || '',
        'Phone': student.phone || '',
        'Gender': student.gender || '',
        'Date of Birth': student.date_of_birth ? new Date(student.date_of_birth).toLocaleDateString() : '',
        'Blood Group': student.blood_group || '',
        'Nationality': student.nationality || '',
        'Religion': student.religion || '',
        'Address': student.address || '',
        'Emergency Contact': student.emergency_contact_name || '',
        'Emergency Phone': student.emergency_contact_phone || '',
        'Class': student.class_name || '',
        'Grade Level': student.grade_level || '',
        'Academic Year': student.academic_year || '',
        'Status': student.user_status || '',
        'Admission Date': student.admission_date ? new Date(student.admission_date).toLocaleDateString() : '',
        'Admission Number': student.admission_number || '',
        'Roll Number': student.roll_number || '',
        'Medical Conditions': student.medical_conditions || '',
        'Transport Required': student.transport_required ? 'Yes' : 'No',
        'Hostel Required': student.hostel_required ? 'Yes' : 'No',
      }))

      // Helper function to escape CSV values
      const escapeCSV = (value: any) => {
        if (value === null || value === undefined) return ''
        const str = String(value)
        if (str.includes(',') || str.includes('"') || str.includes('\n')) {
          return `"${str.replace(/"/g, '""')}"`
        }
        return str
      }

      const csvContent = [
        Object.keys(csvData[0]).join(','),
        ...csvData.map(row => Object.values(row).map(escapeCSV).join(','))
      ].join('\n')

      const blob = new Blob([csvContent], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `students_${new Date().toISOString().split('T')[0]}.csv`
      a.click()
      window.URL.revokeObjectURL(url)

      toast({
        title: "Export Successful",
        description: "Student data has been exported successfully.",
      })
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export student data.",
        variant: "destructive",
      })
    }
  }

  const handleImportStudents = () => {
    // Create a file input element
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.csv'
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return

      try {
        const text = await file.text()
        const lines = text.split('\n').filter(line => line.trim())

        if (lines.length < 2) {
          toast({
            title: "Invalid File",
            description: "CSV file must have at least a header and one data row.",
            variant: "destructive",
          })
          return
        }

        // Parse CSV (basic implementation)
        const headers = lines[0].split(',').map(h => h.trim())
        const requiredHeaders = ['firstName', 'lastName', 'email', 'dateOfBirth', 'gender']

        const missingHeaders = requiredHeaders.filter(h => !headers.includes(h))
        if (missingHeaders.length > 0) {
          toast({
            title: "Invalid CSV Format",
            description: `Missing required columns: ${missingHeaders.join(', ')}`,
            variant: "destructive",
          })
          return
        }

        const students = lines.slice(1).map(line => {
          const values = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''))
          const student: any = {}
          headers.forEach((header, index) => {
            student[header] = values[index] || ''
          })
          return student
        })

        // Validate and import students
        const validStudents = students.filter(student =>
          student.firstName && student.lastName && student.email && student.dateOfBirth && student.gender
        )

        if (validStudents.length === 0) {
          toast({
            title: "No Valid Students",
            description: "No valid student records found in the CSV file.",
            variant: "destructive",
          })
          return
        }

        // Use bulk create API
        await studentsApi.bulkCreate(validStudents)

        toast({
          title: "Import Successful",
          description: `Successfully imported ${validStudents.length} students.`,
        })

        // Refresh the students list
        await fetchStudents()

      } catch (error) {
        console.error('Import error:', error)
        toast({
          title: "Import Failed",
          description: "Failed to import students. Please check the file format.",
          variant: "destructive",
        })
      }
    }
    input.click()
  }

  const handlePrintAll = () => {
    if (students.length === 0) {
      toast({
        title: "No Data",
        description: "No students to print.",
        variant: "destructive",
      })
      return
    }

    // Create a new window for printing
    const printWindow = window.open('', '_blank')
    if (!printWindow) return

    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Students List</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
              line-height: 1.4;
            }
            .header {
              text-align: center;
              border-bottom: 2px solid #333;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
              font-size: 12px;
            }
            th {
              background-color: #f5f5f5;
              font-weight: bold;
            }
            .footer {
              margin-top: 30px;
              text-align: center;
              font-size: 10px;
              color: #666;
            }
            @media print {
              body { margin: 0; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Students List</h1>
            <p>Total Students: ${students.length}</p>
            <p>Generated on: ${new Date().toLocaleDateString()}</p>
          </div>

          <table>
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Class</th>
                <th>Status</th>
                <th>Admission Date</th>
              </tr>
            </thead>
            <tbody>
              ${students.map(student => `
                <tr>
                  <td>${student.student_id || ''}</td>
                  <td>${student.first_name} ${student.last_name}</td>
                  <td>${student.email || ''}</td>
                  <td>${student.phone || ''}</td>
                  <td>${student.class_name || ''}</td>
                  <td>${student.user_status || ''}</td>
                  <td>${student.admission_date ? new Date(student.admission_date).toLocaleDateString() : ''}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="footer">
            <p>School Management System - Students Report</p>
          </div>
        </body>
      </html>
    `

    printWindow.document.write(printContent)
    printWindow.document.close()
    printWindow.focus()

    // Wait for content to load then print
    setTimeout(() => {
      printWindow.print()
      printWindow.close()
    }, 250)

    toast({
      title: "Print Started",
      description: "Preparing student list for printing.",
    })
  }

  const columns: ColumnDef<Student>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "student_id",
      header: "Student ID",
    },
    {
      accessorKey: "photo",
      header: "Photo",
      cell: ({ row }) => {
        const student = row.original
        return (
          <Avatar className="h-10 w-10">
            {student.profile_picture ? (
              <AvatarImage src={student.profile_picture || "/placeholder.svg"} alt={`${student.first_name} ${student.last_name}`} />
            ) : (
              <AvatarFallback>{student.first_name.charAt(0)}{student.last_name.charAt(0)}</AvatarFallback>
            )}
          </Avatar>
        )
      },
    },
    {
      accessorKey: "first_name",
      header: "Name",
      cell: ({ row }) => {
        const student = row.original
        return `${student.first_name} ${student.last_name}`
      },
    },
    {
      accessorKey: "class_name",
      header: "Class",
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => {
        const email = row.getValue("email") as string
        return email || "N/A"
      },
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => {
        const phone = row.getValue("phone") as string
        return phone || "N/A"
      },
    },
    {
      accessorKey: "gender",
      header: "Gender",
      cell: ({ row }) => {
        const gender = row.getValue("gender") as string
        return gender ? gender.charAt(0).toUpperCase() + gender.slice(1) : "N/A"
      },
    },
    {
      accessorKey: "date_of_birth",
      header: "Date of Birth",
      cell: ({ row }) => {
        const dob = row.getValue("date_of_birth") as string
        return dob ? new Date(dob).toLocaleDateString() : "N/A"
      },
    },
    {
      accessorKey: "admission_date",
      header: "Admission Date",
      cell: ({ row }) => {
        const admissionDate = row.getValue("admission_date") as string
        return admissionDate ? new Date(admissionDate).toLocaleDateString() : "N/A"
      },
    },
    {
      accessorKey: "emergency_contact_name",
      header: "Emergency Contact",
      cell: ({ row }) => {
        const contact = row.getValue("emergency_contact_name") as string
        return contact || "N/A"
      },
    },
    {
      accessorKey: "emergency_contact_phone",
      header: "Emergency Phone",
      cell: ({ row }) => {
        const contactPhone = row.getValue("emergency_contact_phone") as string
        return contactPhone || "N/A"
      },
    },
    {
      accessorKey: "user_status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("user_status") as string
        return <Badge variant={status === "active" ? "default" : "outline"}>{status || "N/A"}</Badge>
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const student = row.original
        return (
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => router.push(`/dashboard/students/${student.id}`)}>
              <Eye className="mr-2 h-4 w-4" />
              Details
            </Button>
            <StudentDocumentModal
              studentId={student.id}
              studentName={`${student.first_name} ${student.last_name}`}
              trigger={
                <Button variant="ghost" size="sm">
                  <FileText className="mr-2 h-4 w-4" />
                  Docs
                </Button>
              }
            />
            <PrintStudentModal
              studentId={student.id}
              studentName={`${student.first_name} ${student.last_name}`}
              trigger={
                <Button variant="ghost" size="sm">
                  <Printer className="h-4 w-4" />
                </Button>
              }
            />
            <AddStudentModal
              key={`edit-${student.id}`}
              student={student}
              mode="edit"
              onUpdate={handleSaveStudent}
              trigger={
                <Button variant="ghost" size="sm">
                  <Pencil className="h-4 w-4" />
                </Button>
              }
            />
            <DeleteConfirmationModal
              title="Delete Student"
              description={`Are you sure you want to delete ${student.first_name} ${student.last_name}? This action cannot be undone.`}
              onConfirm={() => handleDeleteStudent(student.id)}
              trigger={
                <Button variant="ghost" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              }
            />
          </div>
        )
      },
    },
  ]

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <div className="text-lg font-medium">Loading students...</div>
          <div className="mt-2 text-sm text-muted-foreground">Please wait while we fetch the student data.</div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Students</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleImportStudents}>
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button variant="outline" onClick={handleExportStudents}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" onClick={handlePrintAll}>
            <Printer className="mr-2 h-4 w-4" />
            Print All
          </Button>
          <AddStudentModal
            onAdd={handleAddStudent}
            trigger={
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Student
              </Button>
            }
          />
        </div>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Student Management</CardTitle>
              <CardDescription>View and manage all students in the system</CardDescription>
            </div>
            <BulkDeleteConfirmationModal
              title="Delete Selected Students"
              description={`Are you sure you want to delete ${selectedRows.length} selected students? This action cannot be undone.`}
              count={selectedRows.length}
              onConfirm={handleBulkDelete}
            />
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                <p className="mt-2 text-sm text-gray-600">Loading students...</p>
              </div>
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={students}
              searchKey="first_name"
              searchPlaceholder="Search students..."
              onPrint={handlePrintAll}
              onExport={handleExportStudents}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
