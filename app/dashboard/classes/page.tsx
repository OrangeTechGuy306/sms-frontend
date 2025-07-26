"use client"

import { useState, useEffect } from "react"
import { PlusCircle, FileDown, FileUp, MoreHorizontal, Trash2, Edit, Eye, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/src/components/ui/data-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AddClassModal } from "@/components/modals/add-class-modal"
import { EditClassModal } from "@/components/modals/edit-class-modal"
import { DeleteConfirmationModal } from "@/components/modals/delete-confirmation-modal"
import { classesApi } from "@/src/lib/api"
import { toast } from "@/components/ui/use-toast"
import type { ColumnDef } from "@tanstack/react-table"

interface Class {
  id: string
  name: string
  grade_level_id: string
  section: string
  academic_year_id: string
  class_teacher_id?: string
  room_number?: string
  capacity: number
  description?: string
  status: string
  created_at: string
  updated_at: string
  grade_level_name?: string
  class_teacher_name?: string
  academic_year?: string
  enrolled_students?: number
  subjects_count?: number
}

export default function ClassesPage() {
  const [classes, setClasses] = useState<Class[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedClass, setSelectedClass] = useState<Class | null>(null)
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  })

  const fetchClasses = async (page = 1, limit = 10, search = '') => {
    try {
      setLoading(true)
      const response = await classesApi.getAll({
        page,
        limit,
        search,
        sort_by: 'name',
        sort_order: 'ASC'
      })

      setClasses(response.data)
      if (response.pagination) {
        setPagination(response.pagination)
      }
    } catch (error) {
      console.error('Error fetching classes:', error)
      toast({
        title: "Error",
        description: "Failed to fetch classes. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchClasses()
  }, [])

  const handleAddClass = async (newClassData: any) => {
    try {
      const newClass = await classesApi.create(newClassData)
      setClasses(prev => [newClass, ...prev])
      setIsAddModalOpen(false)
      toast({
        title: "Class Added",
        description: `Class ${newClass.name} has been successfully added.`,
      })
    } catch (error) {
      console.error('Error adding class:', error)
      toast({
        title: "Error",
        description: "Failed to add class. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleEditClass = async (updatedClassData: Class) => {
    try {
      const updatedClass = await classesApi.update(updatedClassData.id, updatedClassData)
      setClasses(prev => prev.map(cls => cls.id === updatedClass.id ? updatedClass : cls))
      setIsEditModalOpen(false)
      setSelectedClass(null)
      toast({
        title: "Class Updated",
        description: `Class ${updatedClass.name} has been successfully updated.`,
      })
    } catch (error) {
      console.error('Error updating class:', error)
      toast({
        title: "Error",
        description: "Failed to update class. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteClass = async (id: string) => {
    try {
      await classesApi.delete(id)
      setClasses(prev => prev.filter(cls => cls.id !== id))
      toast({
        title: "Class Deleted",
        description: "Class has been successfully deleted.",
      })
    } catch (error) {
      console.error('Error deleting class:', error)
      toast({
        title: "Error",
        description: "Failed to delete class. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleExportClasses = async () => {
    try {
      const csvData = classes.map(cls => ({
        'Name': cls.name,
        'Section': cls.section,
        'Grade Level': cls.grade_level_name || '',
        'Teacher': cls.class_teacher_name || '',
        'Room': cls.room_number || '',
        'Capacity': cls.capacity,
        'Enrolled': cls.enrolled_students || 0,
        'Status': cls.status,
      }))

      const csvContent = [
        Object.keys(csvData[0]).join(','),
        ...csvData.map(row => Object.values(row).join(','))
      ].join('\n')

      const blob = new Blob([csvContent], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `classes_${new Date().toISOString().split('T')[0]}.csv`
      a.click()
      window.URL.revokeObjectURL(url)

      toast({
        title: "Export Successful",
        description: "Classes data has been exported successfully.",
      })
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export classes data.",
        variant: "destructive",
      })
    }
  }

  const columns: ColumnDef<Class>[] = [
    {
      accessorKey: "name",
      header: "Class Name",
      cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "grade_level_name",
      header: "Grade Level",
    },
    {
      accessorKey: "section",
      header: "Section",
    },
    {
      accessorKey: "class_teacher_name",
      header: "Class Teacher",
      cell: ({ row }) => {
        const teacher = row.getValue("class_teacher_name") as string
        return teacher || 'Not assigned'
      },
    },
    {
      accessorKey: "room_number",
      header: "Room",
      cell: ({ row }) => {
        const room = row.getValue("room_number") as string
        return room || 'Not assigned'
      },
    },
    {
      accessorKey: "enrolled_students",
      header: "Enrolled",
      cell: ({ row }) => {
        const enrolled = row.getValue("enrolled_students") as number || 0
        const capacity = row.original.capacity
        return `${enrolled} / ${capacity}`
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
        const cls = row.original
        return (
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedClass(cls)
                setIsEditModalOpen(true)
              }}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDeleteClass(cls.id)}
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
          <div className="text-lg font-medium">Loading classes...</div>
          <div className="mt-2 text-sm text-muted-foreground">Please wait while we fetch the class data.</div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Classes</h1>
          <p className="text-muted-foreground">
            Manage school classes and their details.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handleExportClasses}>
            <FileDown className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Class
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Class Management</CardTitle>
          <CardDescription>View and manage all classes in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={classes}
            searchKey="name"
            searchPlaceholder="Search classes..."
          />
        </CardContent>
      </Card>

      <AddClassModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onAdd={handleAddClass}
      />

      {selectedClass && (
        <EditClassModal
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
          onEdit={handleEditClass}
          initialData={selectedClass}
        />
      )}
    </div>
  )
}
