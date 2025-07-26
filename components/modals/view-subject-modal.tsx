"use client"

import type React from "react"

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

interface Subject {
  code: string
  name: string
  department: string
  gradeLevel: string
  teachers: string
  students: string
}

interface ViewSubjectModalProps {
  subject: Subject
  trigger?: React.ReactNode
}

export function ViewSubjectModal({ subject, trigger }: ViewSubjectModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="sm">
            View
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Subject Details</DialogTitle>
          <DialogDescription>Detailed information about the subject.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <h3 className="text-lg font-medium">{subject.name}</h3>
            <p className="text-sm text-muted-foreground">Code: {subject.code}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium">Department</h4>
              <p className="text-sm">{subject.department}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Grade Level</h4>
              <p className="text-sm">{subject.gradeLevel}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Teachers</h4>
              <p className="text-sm">{subject.teachers}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Students</h4>
              <p className="text-sm">{subject.students}</p>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium">Description</h4>
            <p className="text-sm">
              This course covers the fundamental principles and concepts of {subject.name.toLowerCase()}. Students will
              learn through a combination of lectures, practical exercises, and projects.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium">Teaching Staff</h4>
            <ul className="mt-2 space-y-1 text-sm">
              <li>Dr. Robert Wilson (Head of Department)</li>
              <li>Prof. Elizabeth Taylor</li>
              <li>Mr. Thomas Anderson</li>
            </ul>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline">
            View Curriculum
          </Button>
          <Button type="button">Edit Subject</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
