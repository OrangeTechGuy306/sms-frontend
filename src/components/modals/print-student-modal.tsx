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
  const [isOpen, setIsOpen] = useState(false)
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
    // Simulate printing
    window.print()
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Print Student Information</DialogTitle>
          <DialogDescription>
            Select the information to include in the printed document for {studentName}.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-3">
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
              <Label htmlFor="attendanceInfo">Attendance Records</Label>
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
              <Label htmlFor="includePhoto">Include Photo</Label>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
