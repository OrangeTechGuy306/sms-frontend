"use client"

import type React from "react"

import { useState, useEffect } from "react"
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

interface Subject {
  code: string
  name: string
  department: string
  gradeLevel: string
  teachers: string
  students: string
  description?: string
}

interface EditSubjectModalProps {
  subject: Subject
  trigger?: React.ReactNode
  onSave?: (updatedSubject: Subject) => void
}

export function EditSubjectModal({ subject, trigger, onSave }: EditSubjectModalProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<Subject>({
    ...subject,
    description: subject.description || "",
  })

  useEffect(() => {
    setFormData({
      ...subject,
      description: subject.description || "",
    })
  }, [subject])

  const handleChange = (field: keyof Subject, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      onSave?.(formData)
      setOpen(false)
    } catch (error) {
      console.error("Error updating subject:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button variant="outline">Edit Subject</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Subject</DialogTitle>
          <DialogDescription>Update the subject information below.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="code">Subject Code</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => handleChange("code", e.target.value)}
                placeholder="e.g., MATH101"
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Subject Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="e.g., Mathematics"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="department">Department *</Label>
              <Select value={formData.department} onValueChange={(value) => handleChange("department", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Science">Science</SelectItem>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Languages">Languages</SelectItem>
                  <SelectItem value="Social Studies">Social Studies</SelectItem>
                  <SelectItem value="Arts">Arts</SelectItem>
                  <SelectItem value="Physical Education">Physical Education</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="gradeLevel">Grade Level *</Label>
              <Select value={formData.gradeLevel} onValueChange={(value) => handleChange("gradeLevel", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select grade level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Grade 1">Grade 1</SelectItem>
                  <SelectItem value="Grade 2">Grade 2</SelectItem>
                  <SelectItem value="Grade 3">Grade 3</SelectItem>
                  <SelectItem value="Grade 4">Grade 4</SelectItem>
                  <SelectItem value="Grade 5">Grade 5</SelectItem>
                  <SelectItem value="Grade 6">Grade 6</SelectItem>
                  <SelectItem value="Grade 7">Grade 7</SelectItem>
                  <SelectItem value="Grade 8">Grade 8</SelectItem>
                  <SelectItem value="Grade 9">Grade 9</SelectItem>
                  <SelectItem value="Grade 10">Grade 10</SelectItem>
                  <SelectItem value="Grade 11">Grade 11</SelectItem>
                  <SelectItem value="Grade 12">Grade 12</SelectItem>
                  <SelectItem value="All Grades">All Grades</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="teachers">Number of Teachers</Label>
              <Input
                id="teachers"
                type="number"
                value={formData.teachers}
                onChange={(e) => handleChange("teachers", e.target.value)}
                placeholder="e.g., 3"
                min="1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="students">Number of Students</Label>
              <Input
                id="students"
                type="number"
                value={formData.students}
                onChange={(e) => handleChange("students", e.target.value)}
                placeholder="e.g., 120"
                min="1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description || ""}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Brief description of the subject curriculum and objectives..."
              rows={4}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
