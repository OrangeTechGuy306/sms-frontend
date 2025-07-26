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
import { Eye, ClipboardList, Calendar, Clock, Users, Award, BookOpen, FileText } from "lucide-react"

interface Assessment {
  id: string
  title: string
  description: string
  type: string
  subject: string
  class: string
  totalMarks: string
  passingMarks: string
  duration: string
  date: string
  time: string
  instructions: string
  status: string
  studentsCount?: number
  submissionsCount?: number
  averageScore?: number
}

interface ViewAssessmentModalProps {
  assessment: Assessment
  trigger?: React.ReactNode
}

export function ViewAssessmentModal({ assessment, trigger }: ViewAssessmentModalProps) {
  const [open, setOpen] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'draft':
        return 'bg-gray-100 text-gray-800'
      case 'scheduled':
        return 'bg-blue-100 text-blue-800'
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'completed':
        return 'bg-purple-100 text-purple-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'exam':
        return 'bg-red-100 text-red-800'
      case 'quiz':
        return 'bg-yellow-100 text-yellow-800'
      case 'test':
        return 'bg-blue-100 text-blue-800'
      case 'assignment':
        return 'bg-green-100 text-green-800'
      case 'project':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const passingPercentage = assessment.totalMarks && assessment.passingMarks 
    ? Math.round((parseInt(assessment.passingMarks) / parseInt(assessment.totalMarks)) * 100)
    : 0

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
          <DialogTitle>Assessment Details</DialogTitle>
          <DialogDescription>Complete information about the assessment.</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header with Basic Info */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold">{assessment.title}</h3>
              <p className="text-muted-foreground">{assessment.subject} - {assessment.class}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className={getStatusColor(assessment.status)}>
                {assessment.status}
              </Badge>
              <Badge className={getTypeColor(assessment.type)}>
                {assessment.type}
              </Badge>
              <Badge variant="outline">{assessment.subject}</Badge>
            </div>
          </div>

          <Separator />

          {/* Assessment Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium flex items-center">
              <ClipboardList className="mr-2 h-5 w-5" />
              Assessment Information
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-muted-foreground">Type:</span>
                <p className="flex items-center mt-1">
                  <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                  {assessment.type}
                </p>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Subject:</span>
                <p className="flex items-center mt-1">
                  <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
                  {assessment.subject}
                </p>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Class:</span>
                <p className="flex items-center mt-1">
                  <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                  {assessment.class}
                </p>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Duration:</span>
                <p className="flex items-center mt-1">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  {assessment.duration ? `${assessment.duration} minutes` : 'Not specified'}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Schedule Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Schedule
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-muted-foreground">Date:</span>
                <p className="flex items-center mt-1">
                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                  {assessment.date ? new Date(assessment.date).toLocaleDateString() : 'Not scheduled'}
                </p>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Time:</span>
                <p className="flex items-center mt-1">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  {assessment.time || 'Not specified'}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Marking Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium flex items-center">
              <Award className="mr-2 h-5 w-5" />
              Marking Scheme
            </h4>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center p-3 bg-muted rounded-md">
                <div className="text-2xl font-bold text-blue-600">{assessment.totalMarks}</div>
                <div className="text-muted-foreground">Total Marks</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-md">
                <div className="text-2xl font-bold text-green-600">{assessment.passingMarks}</div>
                <div className="text-muted-foreground">Passing Marks</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-md">
                <div className="text-2xl font-bold text-purple-600">{passingPercentage}%</div>
                <div className="text-muted-foreground">Pass Percentage</div>
              </div>
            </div>
          </div>

          {/* Description */}
          {assessment.description && (
            <>
              <Separator />
              <div className="space-y-4">
                <h4 className="text-lg font-medium">Description</h4>
                <div className="text-sm">
                  <p className="p-3 bg-muted rounded-md">{assessment.description}</p>
                </div>
              </div>
            </>
          )}

          {/* Instructions */}
          {assessment.instructions && (
            <>
              <Separator />
              <div className="space-y-4">
                <h4 className="text-lg font-medium">Instructions</h4>
                <div className="text-sm">
                  <p className="p-3 bg-muted rounded-md whitespace-pre-wrap">{assessment.instructions}</p>
                </div>
              </div>
            </>
          )}

          {/* Statistics */}
          {(assessment.studentsCount || assessment.submissionsCount || assessment.averageScore) && (
            <>
              <Separator />
              <div className="space-y-4">
                <h4 className="text-lg font-medium">Statistics</h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  {assessment.studentsCount && (
                    <div className="text-center p-3 bg-muted rounded-md">
                      <div className="text-2xl font-bold text-blue-600">{assessment.studentsCount}</div>
                      <div className="text-muted-foreground">Total Students</div>
                    </div>
                  )}
                  {assessment.submissionsCount && (
                    <div className="text-center p-3 bg-muted rounded-md">
                      <div className="text-2xl font-bold text-green-600">{assessment.submissionsCount}</div>
                      <div className="text-muted-foreground">Submissions</div>
                    </div>
                  )}
                  {assessment.averageScore && (
                    <div className="text-center p-3 bg-muted rounded-md">
                      <div className="text-2xl font-bold text-purple-600">{assessment.averageScore}%</div>
                      <div className="text-muted-foreground">Average Score</div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
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
