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
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Eye, Users, MapPin, User, GraduationCap, Calendar } from "lucide-react"

interface Class {
  id: string
  name: string
  gradeLevel: string
  section: string
  capacity: string
  classTeacher: string
  room: string
  description?: string
  currentStudents?: number
  subjects?: string[]
  schedule?: string
}

interface ViewClassModalProps {
  classData: Class
  trigger?: React.ReactNode
}

export function ViewClassModal({ classData, trigger }: ViewClassModalProps) {
  const [open, setOpen] = useState(false)

  const getCapacityColor = (current: number, total: number) => {
    const percentage = (current / total) * 100
    if (percentage >= 90) return 'bg-red-100 text-red-800'
    if (percentage >= 75) return 'bg-yellow-100 text-yellow-800'
    return 'bg-green-100 text-green-800'
  }

  const currentStudents = classData.currentStudents || 0
  const totalCapacity = parseInt(classData.capacity) || 0

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Eye className="mr-2 h-4 w-4" />
            View
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Class Details</DialogTitle>
          <DialogDescription>Complete information about the class.</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header with Basic Info */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold">{classData.name}</h3>
              <p className="text-muted-foreground">Class ID: {classData.id}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">{classData.gradeLevel}</Badge>
              <Badge variant="outline">Section {classData.section}</Badge>
              <Badge className={getCapacityColor(currentStudents, totalCapacity)}>
                {currentStudents}/{totalCapacity} Students
              </Badge>
            </div>
          </div>

          <Separator />

          {/* Class Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium flex items-center">
              <GraduationCap className="mr-2 h-5 w-5" />
              Class Information
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-muted-foreground">Grade Level:</span>
                <p>{classData.gradeLevel}</p>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Section:</span>
                <p>{classData.section}</p>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Capacity:</span>
                <p>{classData.capacity} students</p>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Current Enrollment:</span>
                <p>{currentStudents} students</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Teacher and Location */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium flex items-center">
              <User className="mr-2 h-5 w-5" />
              Teacher & Location
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Class Teacher:</span>
                <span>{classData.classTeacher || 'Not assigned'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Room:</span>
                <span>{classData.room || 'Not assigned'}</span>
              </div>
            </div>
          </div>

          {/* Subjects */}
          {classData.subjects && classData.subjects.length > 0 && (
            <>
              <Separator />
              <div className="space-y-4">
                <h4 className="text-lg font-medium">Subjects</h4>
                <div className="flex flex-wrap gap-2">
                  {classData.subjects.map((subject, index) => (
                    <Badge key={index} variant="secondary">
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Schedule */}
          {classData.schedule && (
            <>
              <Separator />
              <div className="space-y-4">
                <h4 className="text-lg font-medium flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule
                </h4>
                <div className="text-sm">
                  <p className="p-3 bg-muted rounded-md">{classData.schedule}</p>
                </div>
              </div>
            </>
          )}

          {/* Description */}
          {classData.description && (
            <>
              <Separator />
              <div className="space-y-4">
                <h4 className="text-lg font-medium">Description</h4>
                <div className="text-sm">
                  <p className="p-3 bg-muted rounded-md">{classData.description}</p>
                </div>
              </div>
            </>
          )}

          {/* Statistics */}
          <Separator />
          <div className="space-y-4">
            <h4 className="text-lg font-medium flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Statistics
            </h4>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center p-3 bg-muted rounded-md">
                <div className="text-2xl font-bold text-blue-600">{currentStudents}</div>
                <div className="text-muted-foreground">Current Students</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-md">
                <div className="text-2xl font-bold text-green-600">{totalCapacity - currentStudents}</div>
                <div className="text-muted-foreground">Available Spots</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-md">
                <div className="text-2xl font-bold text-purple-600">
                  {totalCapacity > 0 ? Math.round((currentStudents / totalCapacity) * 100) : 0}%
                </div>
                <div className="text-muted-foreground">Capacity Used</div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
