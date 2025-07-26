"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/src/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Checkbox } from "@/src/components/ui/checkbox"
import { Badge } from "@/src/components/ui/badge"
import { DataTable } from "@/src/components/ui/data-table"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import type { ColumnDef } from "@tanstack/react-table"
import { DeleteConfirmationModal } from "@/components/modals/delete-confirmation-modal"
import { BulkDeleteConfirmationModal } from "@/components/modals/bulk-delete-confirmation-modal"
import { AddTeacherModal } from "@/components/modals/add-teacher-modal"
import { EditTeacherModal } from "@/components/modals/edit-teacher-modal"
import { teachersApi } from "@/src/lib/api"
import { toast } from "@/src/components/ui/use-toast"
import { Download, Eye, Pencil, Plus, Printer, Trash2, Upload, Loader2 } from "lucide-react"

interface Teacher {
  id: string
  employee_id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  date_of_birth: string
  gender: string
  address?: string
  qualification: string
  experience_years: number
  specialization?: string
  hire_date: string
  salary?: number
  emergency_contact_name?: string
  emergency_contact_phone?: string
  status: string
  created_at: string
  updated_at: string
  profile_picture?: string
}

export default function TeachersPage() {
  const router = useRouter()
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  })

  const fetchTeachers = async (page = 1, limit = 10, search = '') => {
    try {
      setLoading(true)
      const response = await teachersApi.getAll({
        page,
        limit,
        search,
        sort_by: 'first_name',
        sort_order: 'asc'
      })

      setTeachers(response.data)
      if (response.pagination) {
        setPagination(response.pagination)
      }
    } catch (error) {
      console.error('Error fetching teachers:', error)
      toast({
        title: "Error",
        description: "Failed to fetch teachers. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTeachers()
  }, [])

  const handleSaveTeacher = async (updatedTeacher: Teacher) => {
    try {
      await teachersApi.update(updatedTeacher.id, updatedTeacher)
      setTeachers((prev) => prev.map((teacher) => (teacher.id === updatedTeacher.id ? updatedTeacher : teacher)))
      toast({
        title: "Teacher Updated",
        description: `${updatedTeacher.first_name} ${updatedTeacher.last_name}'s information has been updated successfully.`,
      })
    } catch (error) {
      console.error('Error updating teacher:', error)
      toast({
        title: "Error",
        description: "Failed to update teacher. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteTeacher = async (id: string) => {
    try {
      await teachersApi.delete(id)
      setTeachers((prev) => prev.filter((teacher) => teacher.id !== id))
      toast({
        title: "Teacher Deleted",
        description: "Teacher has been deleted successfully.",
      })
    } catch (error) {
      console.error('Error deleting teacher:', error)
      toast({
        title: "Error",
        description: "Failed to delete teacher. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleAddTeacher = async (newTeacher: any) => {
    try {
      const createdTeacher = await teachersApi.create(newTeacher)
      setTeachers((prev) => [...prev, createdTeacher])
      toast({
        title: "Teacher Added",
        description: `${newTeacher.first_name} ${newTeacher.last_name} has been added successfully.`,
      })
    } catch (error) {
      console.error('Error adding teacher:', error)
      toast({
        title: "Error",
        description: "Failed to add teacher. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleBulkDelete = async () => {
    try {
      await Promise.all(selectedRows.map(id => teachersApi.delete(id)))
      setTeachers((prev) => prev.filter((teacher) => !selectedRows.includes(teacher.id)))
      toast({
        title: "Teachers Deleted",
        description: `${selectedRows.length} teachers have been deleted successfully.`,
      })
      setSelectedRows([])
    } catch (error) {
      console.error('Error deleting teachers:', error)
      toast({
        title: "Error",
        description: "Failed to delete teachers. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleExportTeachers = async () => {
    try {
      const csvData = teachers.map(teacher => ({
        'Employee ID': teacher.employee_id,
        'Name': `${teacher.first_name} ${teacher.last_name}`,
        'Email': teacher.email,
        'Phone': teacher.phone,
        'Gender': teacher.gender,
        'Qualification': teacher.qualification,
        'Experience': `${teacher.experience_years} years`,
        'Specialization': teacher.specialization || '',
        'Hire Date': teacher.hire_date,
        'Status': teacher.status,
      }))

      const csvContent = [
        Object.keys(csvData[0]).join(','),
        ...csvData.map(row => Object.values(row).join(','))
      ].join('\n')

      const blob = new Blob([csvContent], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `teachers_${new Date().toISOString().split('T')[0]}.csv`
      a.click()
      window.URL.revokeObjectURL(url)

      toast({
        title: "Export Successful",
        description: "Teacher data has been exported successfully.",
      })
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export teacher data.",
        variant: "destructive",
      })
    }
  }

  const handleImportTeachers = () => {
    toast({
      title: "Import Feature",
      description: "Teacher import functionality will be implemented with file upload.",
    })
  }

  const handlePrintAll = () => {
    window.print()
    toast({
      title: "Print Started",
      description: "Preparing teacher list for printing.",
    })
  }

  const columns: ColumnDef<Teacher>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
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
      accessorKey: "employee_id",
      header: "Employee ID",
    },
    {
      accessorKey: "photo",
      header: "Photo",
      cell: ({ row }) => {
        const teacher = row.original
        return (
          <Avatar className="h-10 w-10">
            {teacher.profile_picture ? (
              <AvatarImage src={teacher.profile_picture || "/placeholder.svg"} alt={`${teacher.first_name} ${teacher.last_name}`} />
            ) : (
              <AvatarFallback>{teacher.first_name.charAt(0)}{teacher.last_name.charAt(0)}</AvatarFallback>
            )}
          </Avatar>
        )
      },
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        const teacher = row.original
        return `${teacher.first_name} ${teacher.last_name}`
      },
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      accessorKey: "qualification",
      header: "Qualification",
    },
    {
      accessorKey: "experience_years",
      header: "Experience",
      cell: ({ row }) => {
        const years = row.getValue("experience_years") as number
        return `${years} years`
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <Badge variant={status === "active" ? "default" : "outline"}>{status}</Badge>
        )
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const teacher = row.original
        return (
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push(`/teachers/${teacher.id}`)}
            >
              <Eye className="h-4 w-4" />
            </Button>
            <EditTeacherModal
              teacher={teacher}
              onSave={handleSaveTeacher}
              trigger={
                <Button variant="ghost" size="sm">
                  <Pencil className="h-4 w-4" />
                </Button>
              }
            />
            <DeleteConfirmationModal
              title="Delete Teacher"
              description={`Are you sure you want to delete ${teacher.first_name} ${teacher.last_name}? This action cannot be undone.`}
              onConfirm={() => handleDeleteTeacher(teacher.id)}
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
          <div className="text-lg font-medium">Loading teachers...</div>
          <div className="mt-2 text-sm text-muted-foreground">Please wait while we fetch the teacher data.</div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Teachers</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleImportTeachers}>
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button variant="outline" onClick={handleExportTeachers}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" onClick={handlePrintAll}>
            <Printer className="mr-2 h-4 w-4" />
            Print All
          </Button>
          <AddTeacherModal
            onAdd={handleAddTeacher}
            trigger={
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Teacher
              </Button>
            }
          />
        </div>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Teacher Management</CardTitle>
              <CardDescription>View and manage all teachers in the system</CardDescription>
            </div>
            {selectedRows.length > 0 && (
              <BulkDeleteConfirmationModal
                count={selectedRows.length}
                onConfirm={handleBulkDelete}
                trigger={
                  <Button variant="destructive" size="sm">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Selected ({selectedRows.length})
                  </Button>
                }
              />
            )}
          </div>
        </CardHeader>
        <div className="p-6">
          <DataTable
            columns={columns}
            data={teachers}
            searchKey="name"
            searchPlaceholder="Search teachers..."
          />
        </div>
      </Card>
    </div>
  )
}
