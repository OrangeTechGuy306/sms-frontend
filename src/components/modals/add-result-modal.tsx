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

interface NewResult {
  studentId: string
  studentName: string
  subject: string
  examType: string
  totalMarks: string
  obtainedMarks: string
  grade: string
  remarks: string
  examDate: string
}

interface AddResultModalProps {
  onAdd?: (newResult: NewResult) => void
  trigger?: React.ReactNode
}

export function AddResultModal({ onAdd, trigger }: AddResultModalProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<NewResult>({
    studentId: "",
    studentName: "",
    subject: "",
    examType: "",
    totalMarks: "",
    obtainedMarks: "",
    grade: "",
    remarks: "",
    examDate: new Date().toISOString().split('T')[0],
  })

  const handleChange = (field: keyof NewResult, value: string) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value }
      
      // Auto-calculate grade based on percentage
      if (field === 'obtainedMarks' || field === 'totalMarks') {
        const obtained = parseFloat(field === 'obtainedMarks' ? value : updated.obtainedMarks)
        const total = parseFloat(field === 'totalMarks' ? value : updated.totalMarks)
        
        if (!isNaN(obtained) && !isNaN(total) && total > 0) {
          const percentage = (obtained / total) * 100
          let grade = 'F'
          if (percentage >= 90) grade = 'A+'
          else if (percentage >= 80) grade = 'A'
          else if (percentage >= 70) grade = 'B+'
          else if (percentage >= 60) grade = 'B'
          else if (percentage >= 50) grade = 'C+'
          else if (percentage >= 40) grade = 'C'
          else if (percentage >= 33) grade = 'D'
          
          updated.grade = grade
        }
      }
      
      return updated
    })
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
        studentId: "",
        studentName: "",
        subject: "",
        examType: "",
        totalMarks: "",
        obtainedMarks: "",
        grade: "",
        remarks: "",
        examDate: new Date().toISOString().split('T')[0],
      })
    } catch (error) {
      console.error("Error adding result:", error)
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
            Add Result
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Result</DialogTitle>
          <DialogDescription>Enter the exam result details below.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="studentId">Student ID *</Label>
              <Input
                id="studentId"
                value={formData.studentId}
                onChange={(e) => handleChange("studentId", e.target.value)}
                placeholder="e.g., STU001"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="studentName">Student Name *</Label>
              <Input
                id="studentName"
                value={formData.studentName}
                onChange={(e) => handleChange("studentName", e.target.value)}
                placeholder="Enter student name"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
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
                  <SelectItem value="Art">Art</SelectItem>
                  <SelectItem value="Physical Education">Physical Education</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="examType">Exam Type *</Label>
              <Select value={formData.examType} onValueChange={(value) => handleChange("examType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select exam type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mid Term">Mid Term</SelectItem>
                  <SelectItem value="Final Term">Final Term</SelectItem>
                  <SelectItem value="Unit Test">Unit Test</SelectItem>
                  <SelectItem value="Quiz">Quiz</SelectItem>
                  <SelectItem value="Assignment">Assignment</SelectItem>
                  <SelectItem value="Project">Project</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="totalMarks">Total Marks *</Label>
              <Input
                id="totalMarks"
                type="number"
                value={formData.totalMarks}
                onChange={(e) => handleChange("totalMarks", e.target.value)}
                placeholder="e.g., 100"
                min="1"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="obtainedMarks">Obtained Marks *</Label>
              <Input
                id="obtainedMarks"
                type="number"
                value={formData.obtainedMarks}
                onChange={(e) => handleChange("obtainedMarks", e.target.value)}
                placeholder="e.g., 85"
                min="0"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="grade">Grade</Label>
              <Input
                id="grade"
                value={formData.grade}
                onChange={(e) => handleChange("grade", e.target.value)}
                placeholder="Auto-calculated"
                readOnly
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="examDate">Exam Date</Label>
            <Input
              id="examDate"
              type="date"
              value={formData.examDate}
              onChange={(e) => handleChange("examDate", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="remarks">Remarks</Label>
            <Textarea
              id="remarks"
              value={formData.remarks}
              onChange={(e) => handleChange("remarks", e.target.value)}
              placeholder="Additional comments about the result..."
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Result"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
