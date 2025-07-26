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
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Printer } from "lucide-react"

interface PrintStudentModalProps {
  studentId: string
  studentName: string
  trigger?: React.ReactNode
}

export function PrintStudentModal({ studentId, studentName, trigger }: PrintStudentModalProps) {
  const [printOptions, setPrintOptions] = useState({
    personalInfo: true,
    contactInfo: true,
    academicInfo: true,
    attendanceInfo: true,
    medicalInfo: false,
    financialInfo: false,
    includePhoto: true,
  })

  const handleOptionChange = (option: keyof typeof printOptions) => {
    setPrintOptions({
      ...printOptions,
      [option]: !printOptions[option],
    })
  }

  const handlePrint = () => {
    // In a real application, this would generate a PDF or print document
    console.log("Printing student information with options:", printOptions)
    // Close the modal after printing
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Print Student Information</DialogTitle>
          <DialogDescription>
            Select what information to include in the printed document for {studentName} (ID: {studentId})
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="personalInfo"
              checked={printOptions.personalInfo}
              onCheckedChange={() => handleOptionChange("personalInfo")}
            />
            <Label htmlFor="personalInfo">Personal Information</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="contactInfo"
              checked={printOptions.contactInfo}
              onCheckedChange={() => handleOptionChange("contactInfo")}
            />
            <Label htmlFor="contactInfo">Contact Information</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="academicInfo"
              checked={printOptions.academicInfo}
              onCheckedChange={() => handleOptionChange("academicInfo")}
            />
            <Label htmlFor="academicInfo">Academic Information</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="attendanceInfo"
              checked={printOptions.attendanceInfo}
              onCheckedChange={() => handleOptionChange("attendanceInfo")}
            />
            <Label htmlFor="attendanceInfo">Attendance Information</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="medicalInfo"
              checked={printOptions.medicalInfo}
              onCheckedChange={() => handleOptionChange("medicalInfo")}
            />
            <Label htmlFor="medicalInfo">Medical Information</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="financialInfo"
              checked={printOptions.financialInfo}
              onCheckedChange={() => handleOptionChange("financialInfo")}
            />
            <Label htmlFor="financialInfo">Financial Information</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="includePhoto"
              checked={printOptions.includePhoto}
              onCheckedChange={() => handleOptionChange("includePhoto")}
            />
            <Label htmlFor="includePhoto">Include Student Photo</Label>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Print Document
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
