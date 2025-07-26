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

interface Teacher {
  id: string
  name: string
  subject: string
  contact: string
  joined: string
  status: string
}

interface ViewTeacherModalProps {
  teacher: Teacher
  trigger?: React.ReactNode
}

export function ViewTeacherModal({ teacher, trigger }: ViewTeacherModalProps) {
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
          <DialogTitle>Teacher Details</DialogTitle>
          <DialogDescription>Detailed information about the teacher.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/placeholder.svg" alt={teacher.name} />
              <AvatarFallback>
                {teacher.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-medium">{teacher.name}</h3>
              <p className="text-sm text-muted-foreground">ID: {teacher.id}</p>
              <Badge variant={teacher.status === "Active" ? "default" : "outline"}>{teacher.status}</Badge>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium">Subject</h4>
              <p className="text-sm">{teacher.subject}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Contact</h4>
              <p className="text-sm">{teacher.contact}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Joined</h4>
              <p className="text-sm">{teacher.joined}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Status</h4>
              <p className="text-sm">{teacher.status}</p>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium">Classes</h4>
            <div className="mt-2 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Grade 10A</span>
                <span>Mathematics</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Grade 11B</span>
                <span>Mathematics</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Grade 12A</span>
                <span>Mathematics</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium">Qualifications</h4>
            <p className="text-sm">Ph.D. in Mathematics, University of Cambridge</p>
            <p className="text-sm">M.Sc. in Applied Mathematics, MIT</p>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline">
            Print Details
          </Button>
          <Button type="button">Edit Teacher</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
