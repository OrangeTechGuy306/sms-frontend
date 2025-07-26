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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye, Mail, Phone, MapPin, Calendar, User, GraduationCap } from "lucide-react"

interface Student {
  id: string
  name: string
  class: string
  gender: string
  parent: string
  contact: string
  status: string
  email?: string
  dateOfBirth?: string
  address?: string
  admissionDate?: string
  bloodGroup?: string
  emergencyContact?: string
  medicalConditions?: string
  religion?: string
  nationality?: string
  passportPhoto?: string | null
}

interface ViewStudentModalProps {
  student: Student
  trigger?: React.ReactNode
}

export function ViewStudentModal({ student, trigger }: ViewStudentModalProps) {
  const [open, setOpen] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'inactive':
        return 'bg-red-100 text-red-800'
      case 'graduated':
        return 'bg-blue-100 text-blue-800'
      case 'transferred':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

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
          <DialogTitle>Student Details</DialogTitle>
          <DialogDescription>Complete information about the student.</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header with Photo and Basic Info */}
          <div className="flex items-start space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={student.passportPhoto || ""} alt={student.name} />
              <AvatarFallback className="text-lg">
                {student.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <div>
                <h3 className="text-xl font-semibold">{student.name}</h3>
                <p className="text-muted-foreground">Student ID: {student.id}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={getStatusColor(student.status)}>
                  {student.status}
                </Badge>
                <Badge variant="outline">{student.class}</Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* Personal Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium flex items-center">
              <User className="mr-2 h-5 w-5" />
              Personal Information
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-muted-foreground">Gender:</span>
                <p>{student.gender}</p>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Date of Birth:</span>
                <p>{student.dateOfBirth ? new Date(student.dateOfBirth).toLocaleDateString() : 'Not provided'}</p>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Blood Group:</span>
                <p>{student.bloodGroup || 'Not provided'}</p>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Religion:</span>
                <p>{student.religion || 'Not provided'}</p>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Nationality:</span>
                <p>{student.nationality || 'Not provided'}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium flex items-center">
              <Phone className="mr-2 h-5 w-5" />
              Contact Information
            </h4>
            <div className="space-y-3 text-sm">
              {student.email && (
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{student.email}</span>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{student.contact}</span>
              </div>
              {student.emergencyContact && (
                <div>
                  <span className="font-medium text-muted-foreground">Emergency Contact:</span>
                  <p>{student.emergencyContact}</p>
                </div>
              )}
              {student.address && (
                <div className="flex items-start space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <span>{student.address}</span>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Family Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium">Family Information</h4>
            <div className="text-sm">
              <span className="font-medium text-muted-foreground">Parent/Guardian:</span>
              <p>{student.parent}</p>
            </div>
          </div>

          <Separator />

          {/* Academic Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium flex items-center">
              <GraduationCap className="mr-2 h-5 w-5" />
              Academic Information
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-muted-foreground">Class:</span>
                <p>{student.class}</p>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Admission Date:</span>
                <p>{student.admissionDate ? new Date(student.admissionDate).toLocaleDateString() : 'Not provided'}</p>
              </div>
            </div>
          </div>

          {/* Medical Information */}
          {student.medicalConditions && (
            <>
              <Separator />
              <div className="space-y-4">
                <h4 className="text-lg font-medium">Medical Information</h4>
                <div className="text-sm">
                  <span className="font-medium text-muted-foreground">Medical Conditions:</span>
                  <p className="mt-1 p-3 bg-muted rounded-md">{student.medicalConditions}</p>
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
