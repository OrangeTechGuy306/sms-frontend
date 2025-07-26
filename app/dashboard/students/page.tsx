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
import { EditStudentModal } from "@/components/modals/edit-student-modal"
import { DeleteConfirmationModal } from "@/components/modals/delete-confirmation-modal"
import { BulkDeleteConfirmationModal } from "@/components/modals/bulk-delete-confirmation-modal"
import { AddStudentModal } from "@/components/modals/add-student-modal"
import { StudentDocumentModal } from "@/components/modals/student-document-modal"
import { PrintStudentModal } from "@/components/modals/print-student-modal"
import { toast } from "@/components/ui/use-toast"
import { studentsApi } from "@/lib/api"
import { Download, Eye, FileText, Pencil, Plus, Printer, Trash2, Upload, Loader2 } from "lucide-react"

interface Student {
  id: string
  student_id: string
  first_name: string
  last_name: string
  email?: string
  phone?: string
  date_of_birth: string
  gender: string
  address?: string
  guardian_name: string
  guardian_phone: string
  guardian_email?: string
  current_class_id: string
  admission_date: string
  blood_group?: string
  medical_conditions?: string
  emergency_contact_name?: string
  emergency_contact_phone?: string
  status: string
  created_at: string
  updated_at: string
  class_name?: string
  profile_picture?: string
}

export default function StudentsPage() {
  const router = useRouter()
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
        sort_order: 'asc'
      })

      setStudents(response.data)
      if (response.pagination) {
        setPagination(response.pagination)
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
      await studentsApi.update(updatedStudent.id, updatedStudent)
      setStudents((prev) => prev.map((student) => (student.id === updatedStudent.id ? updatedStudent : student)))
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

  const handleDeleteStudent = async (id: string) => {
    try {
      await studentsApi.delete(id)
      setStudents((prev) => prev.filter((student) => student.id !== id))
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
      const createdStudent = await studentsApi.create(newStudent)
      setStudents((prev) => [...prev, createdStudent])
      toast({
        title: "Student Added",
        description: `${newStudent.first_name} ${newStudent.last_name} has been added successfully.`,
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
      await Promise.all(selectedRows.map(id => studentsApi.delete(id)))
      setStudents((prev) => prev.filter((student) => !selectedRows.includes(student.id)))
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
      // Generate CSV export
      const csvData = students.map(student => ({
        'Student ID': student.student_id,
        'Name': `${student.first_name} ${student.last_name}`,
        'Email': student.email || '',
        'Phone': student.phone || '',
        'Gender': student.gender,
        'Date of Birth': student.date_of_birth,
        'Guardian': student.guardian_name,
        'Guardian Phone': student.guardian_phone,
        'Class': student.class_name || '',
        'Status': student.status,
        'Admission Date': student.admission_date,
      }))

      const csvContent = [
        Object.keys(csvData[0]).join(','),
        ...csvData.map(row => Object.values(row).join(','))
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
    toast({
      title: "Import Feature",
      description: "Student import functionality will be implemented with file upload.",
    })
  }

  const handlePrintAll = () => {
    window.print()
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
      accessorKey: "name",
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
      accessorKey: "gender",
      header: "Gender",
    },
    {
      accessorKey: "guardian_name",
      header: "Parent/Guardian",
    },
    {
      accessorKey: "guardian_phone",
      header: "Contact",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return <Badge variant={status === "active" ? "default" : "outline"}>{status}</Badge>
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const student = row.original
        return (
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => router.push(`/students/${student.id}`)}>
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
            <EditStudentModal
              student={student}
              onSave={handleSaveStudent}
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
          <DataTable
            columns={columns}
            data={students}
            searchKey="name"
            searchPlaceholder="Search students..."
            onPrint={handlePrintAll}
            onExport={handleExportStudents}
          />
        </CardContent>
      </Card>
    </div>
  )
}
