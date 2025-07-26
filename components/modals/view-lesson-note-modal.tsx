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
import { Badge } from "@/components/ui/badge"

interface LessonNote {
  id: string
  title: string
  subject: string
  teacher: string
  gradeLevel: string
  status: string
  content?: string
}

interface ViewLessonNoteModalProps {
  lessonNote: LessonNote
  trigger?: React.ReactNode
}

export function ViewLessonNoteModal({ lessonNote, trigger }: ViewLessonNoteModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="sm">
            View
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{lessonNote.title}</DialogTitle>
          <DialogDescription>Lesson note details and content</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">{lessonNote.title}</h3>
            <Badge variant={lessonNote.status === "Published" ? "default" : "outline"}>{lessonNote.status}</Badge>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium">Subject</h4>
              <p className="text-sm">{lessonNote.subject}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Teacher</h4>
              <p className="text-sm">{lessonNote.teacher}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Grade Level</h4>
              <p className="text-sm">{lessonNote.gradeLevel}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium">ID</h4>
              <p className="text-sm">{lessonNote.id}</p>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium">Content</h4>
            <div className="mt-2 rounded-md border p-4">
              <p className="text-sm">
                {lessonNote.content ||
                  `This lesson covers the fundamental concepts of ${lessonNote.title}. Students will learn through a combination of lectures, practical exercises, and group discussions. The lesson is designed to engage students and promote critical thinking.
                  
                  Learning objectives:
                  - Understand the core principles
                  - Apply concepts to real-world scenarios
                  - Develop analytical skills
                  
                  Required materials:
                  - Textbook
                  - Notebook
                  - Calculator (if applicable)
                  
                  Assessment will be based on class participation, homework assignments, and a final quiz.`}
              </p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline">
            Print
          </Button>
          <Button type="button">Edit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
