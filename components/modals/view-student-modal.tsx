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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface Student {
  id: string
  name: string
  class: string
  gender: string
  parent: string
  contact: string
  status: string
}

interface ViewStudentModalProps {
  student: Student
  trigger?: React.ReactNode
}

export function ViewStudentModal({ student, trigger }: ViewStudentModalProps) {
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
          <DialogTitle>Student Details</DialogTitle>
          <DialogDescription>Detailed information about the student.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/placeholder.svg" alt={student.name} />
              <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-medium">{student.name}</h3>
              <p className="text-sm text-muted-foreground">ID: {student.id}</p>
              <Badge variant={student.status === "Active" ? "default" : "outline"}>{student.status}</Badge>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium">Class</h4>
              <p className="text-sm">{student.class}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Gender</h4>
              <p className="text-sm">{student.gender}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Parent/Guardian</h4>
              <p className="text-sm">{student.parent}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Contact</h4>
              <p className="text-sm">{student.contact}</p>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium">Academic Performance</h4>
            <div className="mt-2 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Mathematics</span>
                <span>A (92%)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>English</span>
                <span>B+ (88%)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Science</span>
                <span>A- (90%)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>History</span>
                <span>B (85%)</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium">Attendance</h4>
            <p className="text-sm">98% (2 absences this term)</p>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline">
            Print Details
          </Button>
          <Button type="button">Edit Student</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
