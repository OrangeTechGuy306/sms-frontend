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
  class: string
  topic: string
  objectives: string
  content: string
  activities: string
  resources: string
  homework: string
  assessment: string
  duration: string
  date: string
  teacherId: string
  teacherName: string
  status: string
}

interface AddLessonNoteModalProps {
  onAdd?: (newNote: NewLessonNote) => void
  trigger?: React.ReactNode
}

export function AddLessonNoteModal({ onAdd, trigger }: AddLessonNoteModalProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<NewLessonNote>({
    title: "",
    subject: "",
    class: "",
    topic: "",
    objectives: "",
    content: "",
    activities: "",
    resources: "",
    homework: "",
    assessment: "",
    duration: "",
    date: new Date().toISOString().split('T')[0],
    teacherId: "",
    teacherName: "",
    status: "Draft",
  })

  const handleChange = (field: keyof NewLessonNote, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      onAdd?.(formData)
      setOpen(false)
      // Reset form
      setFormData({
        title: "",
        subject: "",
        class: "",
        topic: "",
        objectives: "",
        content: "",
        activities: "",
        resources: "",
        homework: "",
        assessment: "",
        duration: "",
        date: new Date().toISOString().split('T')[0],
        teacherId: "",
        teacherName: "",
        status: "Draft",
      })
    } catch (error) {
      console.error("Error adding lesson note:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Lesson Note
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Lesson Note</DialogTitle>
          <DialogDescription>Create a detailed lesson plan and notes.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Lesson Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="e.g., Introduction to Algebra"
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject *</Label>
              <Select value={formData.subject} onValueChange={(value) => handleChange("subject", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Science">Science</SelectItem>
                  <SelectItem value="History">History</SelectItem>
                  <SelectItem value="Geography">Geography</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                  <SelectItem value="Biology">Biology</SelectItem>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="class">Class *</Label>
              <Select value={formData.class} onValueChange={(value) => handleChange("class", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
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
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                value={formData.duration}
                onChange={(e) => handleChange("duration", e.target.value)}
                placeholder="e.g., 45"
                min="1"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Lesson Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleChange("date", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="teacherName">Teacher Name</Label>
              <Input
                id="teacherName"
                value={formData.teacherName}
                onChange={(e) => handleChange("teacherName", e.target.value)}
                placeholder="Teacher's name"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="topic">Topic/Chapter</Label>
            <Input
              id="topic"
              value={formData.topic}
              onChange={(e) => handleChange("topic", e.target.value)}
              placeholder="Main topic or chapter being covered"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="objectives">Learning Objectives</Label>
            <Textarea
              id="objectives"
              value={formData.objectives}
              onChange={(e) => handleChange("objectives", e.target.value)}
              placeholder="What students should learn from this lesson..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Lesson Content</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => handleChange("content", e.target.value)}
              placeholder="Detailed lesson content and key points..."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="activities">Activities</Label>
            <Textarea
              id="activities"
              value={formData.activities}
              onChange={(e) => handleChange("activities", e.target.value)}
              placeholder="Classroom activities and exercises..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="resources">Resources/Materials</Label>
            <Textarea
              id="resources"
              value={formData.resources}
              onChange={(e) => handleChange("resources", e.target.value)}
              placeholder="Books, materials, equipment needed..."
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="homework">Homework/Assignment</Label>
            <Textarea
              id="homework"
              value={formData.homework}
              onChange={(e) => handleChange("homework", e.target.value)}
              placeholder="Homework or assignments given..."
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="assessment">Assessment Method</Label>
            <Textarea
              id="assessment"
              value={formData.assessment}
              onChange={(e) => handleChange("assessment", e.target.value)}
              placeholder="How student understanding will be assessed..."
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Planned">Planned</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Reviewed">Reviewed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Lesson Note"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
