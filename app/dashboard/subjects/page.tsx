"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DataTable } from "@/src/components/ui/data-table"
import { DeleteConfirmationModal } from "@/components/modals/delete-confirmation-modal"
import { AddSubjectModal } from "@/components/modals/add-subject-modal"
import { EditSubjectModal } from "@/components/modals/edit-subject-modal"
import { subjectsApi } from "@/src/lib/api"
import { toast } from "@/components/ui/use-toast"
import { Plus, Edit, Trash2, FileDown, Loader2 } from "lucide-react"
import type { ColumnDef } from "@tanstack/react-table"

interface Subject {
  id: string
  name: string
  code: string
  description?: string
  department_id?: string
  grade_level_id?: string
  credits?: number
  is_mandatory: boolean
  status: string
  created_at: string
  updated_at: string
  department_name?: string
  grade_level_name?: string
  teachers_count?: number
  students_count?: number
}

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null)
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  })

  const fetchSubjects = async (page = 1, limit = 10, search = '') => {
    try {
      setLoading(true)
      const response = await subjectsApi.getAll({
        page,
        limit,
        search,
        sort_by: 'name',
        sort_order: 'ASC'
      })

      setSubjects(response.data)
      if (response.pagination) {
        setPagination(response.pagination)
      }
    } catch (error) {
      console.error('Error fetching subjects:', error)
      toast({
        title: "Error",
        description: "Failed to fetch subjects. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSubjects()
  }, [])

  const handleAddSubject = async (newSubjectData: any) => {
    try {
      const newSubject = await subjectsApi.create(newSubjectData)
      setSubjects(prev => [newSubject, ...prev])
      setIsAddModalOpen(false)
      toast({
        title: "Subject Added",
        description: `Subject ${newSubject.name} has been successfully added.`,
      })
    } catch (error) {
      console.error('Error adding subject:', error)
      toast({
        title: "Error",
        description: "Failed to add subject. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleEditSubject = async (updatedSubjectData: Subject) => {
    try {
      const updatedSubject = await subjectsApi.update(updatedSubjectData.id, updatedSubjectData)
      setSubjects(prev => prev.map(subject => subject.id === updatedSubject.id ? updatedSubject : subject))
      setIsEditModalOpen(false)
      setSelectedSubject(null)
      toast({
        title: "Subject Updated",
        description: `Subject ${updatedSubject.name} has been successfully updated.`,
      })
    } catch (error) {
      console.error('Error updating subject:', error)
      toast({
        title: "Error",
        description: "Failed to update subject. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteSubject = async (id: string) => {
    try {
      await subjectsApi.delete(id)
      setSubjects(prev => prev.filter(subject => subject.id !== id))
      toast({
        title: "Subject Deleted",
        description: "Subject has been successfully deleted.",
      })
    } catch (error) {
      console.error('Error deleting subject:', error)
      toast({
        title: "Error",
        description: "Failed to delete subject. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleExportSubjects = async () => {
    try {
      const csvData = subjects.map(subject => ({
        'Code': subject.code,
        'Name': subject.name,
        'Department': subject.department_name || '',
        'Grade Level': subject.grade_level_name || '',
        'Credits': subject.credits || 0,
        'Mandatory': subject.is_mandatory ? 'Yes' : 'No',
        'Teachers': subject.teachers_count || 0,
        'Students': subject.students_count || 0,
        'Status': subject.status,
      }))

      const csvContent = [
        Object.keys(csvData[0]).join(','),
        ...csvData.map(row => Object.values(row).join(','))
      ].join('\n')

      const blob = new Blob([csvContent], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `subjects_${new Date().toISOString().split('T')[0]}.csv`
      a.click()
      window.URL.revokeObjectURL(url)

      toast({
        title: "Export Successful",
        description: "Subjects data has been exported successfully.",
      })
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export subjects data.",
        variant: "destructive",
      })
    }
  }

  const columns: ColumnDef<Subject>[] = [
    {
      accessorKey: "code",
      header: "Code",
    },
    {
      accessorKey: "name",
      header: "Subject Name",
      cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "department_name",
      header: "Department",
      cell: ({ row }) => {
        const department = row.getValue("department_name") as string
        return department || 'Not assigned'
      },
    },
    {
      accessorKey: "grade_level_name",
      header: "Grade Level",
      cell: ({ row }) => {
        const gradeLevel = row.getValue("grade_level_name") as string
        return gradeLevel || 'All levels'
      },
    },
    {
      accessorKey: "credits",
      header: "Credits",
      cell: ({ row }) => {
        const credits = row.getValue("credits") as number
        return credits || 'N/A'
      },
    },
    {
      accessorKey: "is_mandatory",
      header: "Type",
      cell: ({ row }) => {
        const isMandatory = row.getValue("is_mandatory") as boolean
        return <Badge variant={isMandatory ? "default" : "outline"}>
          {isMandatory ? "Mandatory" : "Elective"}
        </Badge>
      },
    },
    {
      accessorKey: "teachers_count",
      header: "Teachers",
      cell: ({ row }) => {
        const count = row.getValue("teachers_count") as number
        return count || 0
      },
    },
    {
      accessorKey: "students_count",
      header: "Students",
      cell: ({ row }) => {
        const count = row.getValue("students_count") as number
        return count || 0
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return <Badge variant={status === "active" ? "default" : "secondary"}>{status}</Badge>
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const subject = row.original
        return (
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedSubject(subject)
                setIsEditModalOpen(true)
              }}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDeleteSubject(subject.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
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
          <div className="text-lg font-medium">Loading subjects...</div>
          <div className="mt-2 text-sm text-muted-foreground">Please wait while we fetch the subject data.</div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Subjects</h1>
          <p className="text-muted-foreground">
            Manage curriculum subjects and their details.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handleExportSubjects}>
            <FileDown className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Subject
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Subject Management</CardTitle>
          <CardDescription>View and manage all subjects in the curriculum</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={subjects}
            searchKey="name"
            searchPlaceholder="Search subjects..."
          />
        </CardContent>
      </Card>

      <AddSubjectModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onAdd={handleAddSubject}
      />

      {selectedSubject && (
        <EditSubjectModal
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
          onEdit={handleEditSubject}
          initialData={selectedSubject}
        />
      )}
    </div>
  )
}
