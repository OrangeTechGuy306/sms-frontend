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

interface NewLessonNote {
  title: string
  subject: string
  teacher: string
  gradeLevel: string
  status: string
  content?: string
}

interface AddLessonNoteModalProps {
  onAdd?: (newLessonNote: NewLessonNote) => void
  trigger?: React.ReactNode
}

export function AddLessonNoteModal({ onAdd, trigger }: AddLessonNoteModalProps) {
  const [formData, setFormData] = useState<NewLessonNote>({
    title: "",
    subject: "",
    teacher: "",
    gradeLevel: "",
    status: "Draft",
    content: "",
  })

  const handleChange = (field: keyof NewLessonNote, value: string) => {
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
            Create Lesson Note
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Lesson Note</DialogTitle>
            <DialogDescription>Enter the lesson note details below. Click save when you're done.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subject" className="text-right">
                Subject
              </Label>
              <Select value={formData.subject} onValueChange={(value) => handleChange("subject", value)} required>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="English Literature">English Literature</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                  <SelectItem value="Biology">Biology</SelectItem>
                  <SelectItem value="History">History</SelectItem>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="teacher" className="text-right">
                Teacher
              </Label>
              <Select value={formData.teacher} onValueChange={(value) => handleChange("teacher", value)} required>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select teacher" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Dr. Robert Wilson">Dr. Robert Wilson</SelectItem>
                  <SelectItem value="Prof. Elizabeth Taylor">Prof. Elizabeth Taylor</SelectItem>
                  <SelectItem value="Mr. Thomas Anderson">Mr. Thomas Anderson</SelectItem>
                  <SelectItem value="Mrs. Patricia Clark">Mrs. Patricia Clark</SelectItem>
                  <SelectItem value="Ms. Jennifer Lee">Ms. Jennifer Lee</SelectItem>
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
                  <SelectItem value="Grade 9">Grade 9</SelectItem>
                  <SelectItem value="Grade 10">Grade 10</SelectItem>
                  <SelectItem value="Grade 11">Grade 11</SelectItem>
                  <SelectItem value="Grade 12">Grade 12</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Published">Published</SelectItem>
                  <SelectItem value="Draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="content" className="text-right pt-2">
                Content
              </Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => handleChange("content", e.target.value)}
                className="col-span-3"
                rows={10}
                placeholder="Enter the lesson note content here..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create Lesson Note</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
