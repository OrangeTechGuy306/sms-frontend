"use client"

import type React from "react"

import { useState, useEffect, useMemo } from "react"
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
import { Trash2, Plus } from "lucide-react"

interface EditClassModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onEdit: (updatedClass: ClassData) => void
  initialData: ClassData
}

interface ClassData {
  id: string
  name: string
  level: string
  section: string
  capacity: number
  enrolled: number
  classTeacher: string
  subjects: string[]
  room: string
  schedule: string
  status: "active" | "inactive"
  academicYear: string
}

const dummyTeachers = ["Mr. John Doe", "Ms. Jane Smith", "Dr. Alex Johnson", "Mrs. Sarah Williams", "Mr. Michael Brown"]
const dummySubjects = [
  "Mathematics",
  "English",
  "Physics",
  "Chemistry",
  "Biology",
  "History",
  "Geography",
  "Computer Science",
  "Art",
  "Music",
  "Advanced Math",
  "Literature",
  "Economics",
]
const dummyRooms = ["Room 101", "Room 102", "Room 201", "Room 205", "Room 301", "Lab 1", "Auditorium"]
const dummyAcademicYears = ["2023-2024", "2024-2025", "2025-2026"]

export function EditClassModal({ open, onOpenChange, onEdit, initialData }: EditClassModalProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState<ClassData>(initialData)
  const [newSubject, setNewSubject] = useState("")

  useEffect(() => {
    if (open) {
      setFormData(initialData)
    }
  }, [open, initialData])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (id: keyof ClassData, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleNumberChange = (id: keyof ClassData, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: Number.parseInt(value) || 0 }))
  }

  const addSubject = () => {
    if (newSubject && !formData.subjects.includes(newSubject)) {
      setFormData((prev) => ({
        ...prev,
        subjects: [...prev.subjects, newSubject],
      }))
      setNewSubject("")
    } else if (formData.subjects.includes(newSubject)) {
      toast({
        title: "Duplicate Subject",
        description: "This subject has already been added.",
        variant: "destructive",
      })
    }
  }

  const removeSubject = (subjectToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      subjects: prev.subjects.filter((subject) => subject !== subjectToRemove),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (
      !formData.name ||
      !formData.level ||
      !formData.section ||
      formData.capacity <= 0 ||
      !formData.classTeacher ||
      !formData.room ||
      !formData.schedule ||
      !formData.academicYear
    ) {
      toast({
        title: "Error",
        description: "Please fill in all required fields and ensure capacity is greater than 0.",
        variant: "destructive",
      })
      return
    }

    if (formData.subjects.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one subject for the class.",
        variant: "destructive",
      })
      return
    }

    onEdit(formData)
    onOpenChange(false)
    toast({
      title: "Class Updated",
      description: `Class ${formData.name} has been successfully updated.`,
    })
  }

  const availableSubjectsForSelection = useMemo(() => {
    return dummySubjects.filter((subject) => !formData.subjects.includes(subject))
  }, [formData.subjects])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Class</DialogTitle>
          <DialogDescription>Make changes to the class details.</DialogDescription>
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
                <Label htmlFor="level">Level *</Label>
                <Input id="level" value={formData.level} onChange={handleInputChange} placeholder="e.g., Grade 10" />
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
                <Label htmlFor="enrolled">Enrolled Students</Label>
                <Input
                  id="enrolled"
                  type="number"
                  value={formData.enrolled}
                  onChange={(e) => handleNumberChange("enrolled", e.target.value)}
                  min={0}
                  max={formData.capacity}
                  placeholder="e.g., 28"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="academicYear">Academic Year *</Label>
                <Select
                  value={formData.academicYear}
                  onValueChange={(value) => handleSelectChange("academicYear", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select academic year" />
                  </SelectTrigger>
                  <SelectContent>
                    {dummyAcademicYears.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
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
                <Label htmlFor="classTeacher">Class Teacher *</Label>
                <Select
                  value={formData.classTeacher}
                  onValueChange={(value) => handleSelectChange("classTeacher", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select teacher" />
                  </SelectTrigger>
                  <SelectContent>
                    {dummyTeachers.map((teacher) => (
                      <SelectItem key={teacher} value={teacher}>
                        {teacher}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="room">Room *</Label>
                <Select value={formData.room} onValueChange={(value) => handleSelectChange("room", value)}>
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
              <div className="space-y-2 col-span-full">
                <Label htmlFor="schedule">Schedule *</Label>
                <Input
                  id="schedule"
                  value={formData.schedule}
                  onChange={handleInputChange}
                  placeholder="e.g., Mon-Fri, 8:00 AM - 3:00 PM"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Subjects</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {formData.subjects.map((subject) => (
                  <Badge key={subject} variant="secondary" className="flex items-center gap-1">
                    {subject}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 p-0 text-muted-foreground hover:text-foreground"
                      onClick={() => removeSubject(subject)}
                    >
                      <Trash2 className="h-3 w-3" />
                      <span className="sr-only">Remove subject</span>
                    </Button>
                  </Badge>
                ))}
              </div>
              <div className="flex space-x-2">
                <Select value={newSubject} onValueChange={setNewSubject}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Add subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSubjectsForSelection.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button type="button" onClick={addSubject} disabled={!newSubject}>
                  <Plus className="mr-2 h-4 w-4" /> Add
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Additional Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.schedule} // This should be a separate description field, not schedule
                  onChange={handleInputChange}
                  placeholder="Any additional notes or description for the class."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
