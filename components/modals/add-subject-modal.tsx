"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react"

interface NewSubject {
  name: string
  department: string
  gradeLevel: string
  teachers: string
  students: string
  description: string
}

interface AddSubjectModalProps {
  onAdd?: (newSubject: NewSubject) => void
  trigger?: React.ReactNode
}

export function AddSubjectModal({ onAdd, trigger }: AddSubjectModalProps) {
  const [formData, setFormData] = useState<NewSubject>({
    name: "",
    department: "",
    gradeLevel: "",
    teachers: "",
    students: "",
    description: "",
  })

  const handleChange = (field: keyof NewSubject, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onAdd) {
      onAdd(formData)
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        {trigger || (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Subject
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Subject</DialogTitle>
            <DialogDescription>Enter the subject information below. Click save when you're done.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Subject Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="department" className="text-right">
                Department
              </Label>
              <Select value={formData.department} onValueChange={(value) => handleChange("department", value)} required>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Science">Science</SelectItem>
                  <SelectItem value="Humanities">Humanities</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Arts">Arts</SelectItem>
                  <SelectItem value="Languages">Languages</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="gradeLevel" className="text-right">
                Grade Level
              </Label>
              <Select value={formData.gradeLevel} onValueChange={(value) => handleChange("gradeLevel", value)} required>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select grade level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="9-10">Grades 9-10</SelectItem>
                  <SelectItem value="9-12">Grades 9-12</SelectItem>
                  <SelectItem value="10-12">Grades 10-12</SelectItem>
                  <SelectItem value="11-12">Grades 11-12</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="teachers" className="text-right">
                Teachers
              </Label>
              <Input
                id="teachers"
                value={formData.teachers}
                onChange={(e) => handleChange("teachers", e.target.value)}
                className="col-span-3"
                required
                placeholder="Number of teachers"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="students" className="text-right">
                Students
              </Label>
              <Input
                id="students"
                value={formData.students}
                onChange={(e) => handleChange("students", e.target.value)}
                className="col-span-3"
                required
                placeholder="Estimated number of students"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className="col-span-3"
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Subject</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
