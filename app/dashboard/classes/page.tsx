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
  grade_level_id?: string
  section?: string
  academic_year_id?: string
  class_teacher_id?: string
  room_number?: string
  capacity: number
  description?: string
  status: string
  created_at: string
  updated_at?: string
  // Backend response fields
  grade_level?: string // This is what backend returns
  level_number?: number
  class_teacher_name?: string
  academic_year?: string
  student_count?: number // This is what backend returns
  subject_count?: number // This is what backend returns
  // Legacy fields for compatibility
  grade_level_name?: string
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

      // Ensure we always set an array for classes
      const classesData = response.data?.classes || response.data || []
      setClasses(Array.isArray(classesData) ? classesData : [])

      if (response.pagination) {
        setPagination(response.pagination)
      }
    } catch (error) {
      console.error('Error fetching classes:', error)
      // Ensure classes is always an array even on error
      setClasses([])
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
      const response = await classesApi.create(newClassData)

      setIsAddModalOpen(false)
      toast({
        title: "Class Added",
        description: `Class ${newClassData.name} has been successfully added.`,
      })

      // Refresh the classes list to get updated data with full class objects
      await fetchClasses()

    } catch (error) {
      console.error('Error adding class:', error)
      toast({
        title: "Error",
        description: "Failed to add class. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Transform backend Class data to EditModal ClassData format
  const transformClassForEdit = (cls: Class) => {
    const transformed = {
      id: cls.id || '',
      name: cls.name || '',
      level: cls.grade_level || 'Not specified',
      section: cls.section || '',
      capacity: cls.capacity || 0,
      enrolled: cls.student_count || 0,
      classTeacher: cls.class_teacher_name || '',
      subjects: [], // Backend doesn't provide subjects array, start with empty
      room: cls.room_number || '',
      schedule: '', // Backend doesn't provide schedule, start with empty
      status: (cls.status as "active" | "inactive") || "active",
      academicYear: cls.academic_year || ''
    }

    // Debug: Log the transformation
    console.log('Transform class for edit:', {
      original: cls,
      transformed: transformed
    })

    return transformed
  }

  const handleEditClass = async (updatedClassData: any) => {
    try {
      // Transform the modal data back to backend format
      const backendData = {
        name: updatedClassData.name,
        grade_level: updatedClassData.level,           // level → grade_level
        section: updatedClassData.section,
        capacity: updatedClassData.capacity,
        room_number: updatedClassData.room,            // room → room_number
        status: updatedClassData.status,
        // Note: class_teacher_id would need to be resolved from classTeacher name
        // Note: academic_year_id would need to be resolved from academicYear name
        // Note: description field is not in the modal currently
      }

      console.log('🔄 Updating class:', { id: updatedClassData.id, data: backendData })

      // Backend only returns success message, not the updated class
      const response = await classesApi.update(updatedClassData.id, backendData)
      console.log('✅ Update response:', response)

      // Update the local state manually since backend doesn't return updated class
      setClasses(prev => prev.map(cls => {
        if (cls.id.toString() === updatedClassData.id.toString()) {
          console.log('🔍 Preserving student_count during update:', {
            classId: cls.id,
            className: cls.name,
            currentStudentCount: cls.student_count,
            capacity: cls.capacity
          })
          // Merge the updated data with existing class data
          return {
            ...cls,
            name: updatedClassData.name,
            grade_level: updatedClassData.level,           // Update grade_level
            section: updatedClassData.section || null,
            capacity: updatedClassData.capacity,
            room_number: updatedClassData.room,
            status: updatedClassData.status,
            academic_year: updatedClassData.academicYear,  // Update academic_year display
            // ✅ IMPORTANT: Preserve student_count to maintain enrollment display
            student_count: cls.student_count,              // Keep existing student count
            // Note: Other fields like class_teacher_name would need proper resolution
          }
        }
        return cls
      }))

      setIsEditModalOpen(false)
      setSelectedClass(null)
      toast({
        title: "Class Updated",
        description: `Class ${updatedClassData.name} has been successfully updated.`,
      })

      // ✅ Refresh classes data to ensure student_count and other fields are current
      console.log('🔄 Refreshing classes data after update...')
      await fetchClasses()

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
        'Section': cls.section || '',
        'Grade Level': cls.grade_level || '',
        'Teacher': cls.class_teacher_name || '',
        'Room': cls.room_number || '',
        'Capacity': cls.capacity,
        'Enrolled': cls.student_count || 0,
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
      accessorKey: "grade_level",
      header: "Grade Level",
      cell: ({ row }) => {
        const gradeLevel = row.getValue("grade_level") as string
        return gradeLevel || 'Not assigned'
      },
    },
    {
      accessorKey: "section",
      header: "Section",
      cell: ({ row }) => {
        const section = row.getValue("section") as string
        return section || 'Not specified'
      },
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
      accessorKey: "student_count",
      header: "Enrolled",
      cell: ({ row }) => {
        const enrolled = row.getValue("student_count") as number || 0
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
          initialData={transformClassForEdit(selectedClass)}
        />
      )}
    </div>
  )
}
