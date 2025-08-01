"use client"

import type React from "react"

import { useState, useMemo, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trash2, Plus, Loader2 } from "lucide-react"
import axios from "axios"

interface AddClassModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (newClass: any) => void
}

interface GradeLevel {
  id: string
  name: string
  level_number: number
}

interface AcademicYear {
  id: string | number
  name: string
  is_current: boolean
}

interface Teacher {
  id: string
  user_id: string
  first_name: string
  last_name: string
  email: string
}

interface ClassFormData {
  name: string
  gradeLevelId: string
  academicYearId: string | number
  section: string
  capacity: number
  classTeacherId: string // Can be "none" or teacher ID
  roomNumber: string
  status: "active" | "inactive"
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

const dummyRooms = ["Room 101", "Room 102", "Room 201", "Room 205", "Room 301", "Lab 1", "Auditorium"]

export function AddClassModal({ open, onOpenChange, onAdd }: AddClassModalProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState<ClassFormData>({
    name: "",
    gradeLevelId: "",
    academicYearId: "",
    section: "",
    capacity: 30,
    classTeacherId: "none",
    roomNumber: "",
    status: "active",
  })

  // Data from backend
  const [gradeLevels, setGradeLevels] = useState<GradeLevel[]>([])
  const [academicYears, setAcademicYears] = useState<AcademicYear[]>([])
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [loading, setLoading] = useState(false)
  const [dataLoading, setDataLoading] = useState(true)

  // Fetch data when modal opens
  useEffect(() => {
    if (open) {
      fetchData()
    }
  }, [open])

  const fetchData = async () => {
    try {
      setDataLoading(true)
      const token = localStorage.getItem('auth_token')

      if (!token) {
        toast({
          title: "Authentication Error",
          description: "Please log in to continue.",
          variant: "destructive",
        })
        return
      }

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }

      // Fetch grade levels, academic years, and teachers in parallel
      const [gradeLevelsRes, academicYearsRes, teachersRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/grade-levels`, { headers }).catch(() => ({ data: { data: [] } })),
        axios.get(`${API_BASE_URL}/academic-years`, { headers }).catch(() => ({ data: { data: [] } })),
        axios.get(`${API_BASE_URL}/teachers`, { headers }).catch(() => ({ data: { data: [] } }))
      ])

      setGradeLevels(gradeLevelsRes.data.data || [])
      setAcademicYears(academicYearsRes.data.data || [])
      setTeachers(teachersRes.data.data || [])

    } catch (error) {
      console.error('Error fetching data:', error)
      toast({
        title: "Error",
        description: "Failed to load form data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setDataLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (id: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleNumberChange = (id: keyof ClassFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: Number.parseInt(value) || 0 }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (
      !formData.name ||
      !formData.gradeLevelId ||
      !formData.academicYearId ||
      !formData.section ||
      formData.capacity <= 0 ||
      !formData.roomNumber
    ) {
      toast({
        title: "Error",
        description: "Please fill in all required fields and ensure capacity is greater than 0.",
        variant: "destructive",
      })
      return
    }

    try {
      setLoading(true)

      // Prepare data in the format expected by backend
      const classData = {
        name: formData.name,
        gradeLevelId: formData.gradeLevelId,
        academicYearId: formData.academicYearId,
        section: formData.section,
        capacity: formData.capacity,
        roomNumber: formData.roomNumber,
        classTeacherId: formData.classTeacherId === "none" ? null : formData.classTeacherId || null,
        status: formData.status
      }

      console.log('Sending class data:', classData) // Debug log

      await onAdd(classData)

      // Reset form
      setFormData({
        name: "",
        gradeLevelId: "",
        academicYearId: "",
        section: "",
        capacity: 30,
        classTeacherId: "none",
        roomNumber: "",
        status: "active",
      })

      onOpenChange(false)

    } catch (error) {
      console.error('Error submitting form:', error)
      // Error handling is done in the parent component
    } finally {
      setLoading(false)
    }
  }

  if (dataLoading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Class</DialogTitle>
            <DialogDescription>Loading form data...</DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Class</DialogTitle>
          <DialogDescription>Fill in the details to add a new class to the system.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Class Name *</Label>
                <Input id="name" value={formData.name} onChange={handleInputChange} placeholder="e.g., Grade 10A" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gradeLevelId">Grade Level *</Label>
                <Select
                  value={formData.gradeLevelId}
                  onValueChange={(value) => handleSelectChange("gradeLevelId", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select grade level" />
                  </SelectTrigger>
                  <SelectContent>
                    {gradeLevels.map((level) => (
                      <SelectItem key={level.id} value={level.id}>
                        {level.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="section">Section *</Label>
                <Input id="section" value={formData.section} onChange={handleInputChange} placeholder="e.g., A" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity">Capacity *</Label>
                <Input
                  id="capacity"
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => handleNumberChange("capacity", e.target.value)}
                  min={1}
                  placeholder="e.g., 30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="academicYearId">Academic Year *</Label>
                <Select
                  value={formData.academicYearId.toString()}
                  onValueChange={(value) => handleSelectChange("academicYearId", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select academic year" />
                  </SelectTrigger>
                  <SelectContent>
                    {academicYears.map((year) => (
                      <SelectItem key={year.id} value={year.id.toString()}>
                        {year.name} {year.is_current && "(Current)"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Assignment Details</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="classTeacherId">Class Teacher</Label>
                <Select
                  value={formData.classTeacherId}
                  onValueChange={(value) => handleSelectChange("classTeacherId", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select teacher (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No teacher assigned</SelectItem>
                    {teachers.map((teacher) => (
                      <SelectItem key={teacher.id} value={teacher.id}>
                        {teacher.first_name} {teacher.last_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="roomNumber">Room *</Label>
                <Select value={formData.roomNumber} onValueChange={(value) => handleSelectChange("roomNumber", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select room" />
                  </SelectTrigger>
                  <SelectContent>
                    {dummyRooms.map((room) => (
                      <SelectItem key={room} value={room}>
                        {room}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding Class...
                </>
              ) : (
                "Add Class"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
