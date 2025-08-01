"use client"

import type React from "react"

import { useState, useEffect } from "react"
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
import { studentsApi } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

interface PrintStudentModalProps {
  studentId: string | number
  studentName: string
  trigger?: React.ReactNode
}

export function PrintStudentModal({ studentId, studentName, trigger }: PrintStudentModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [studentData, setStudentData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [printOptions, setPrintOptions] = useState({
    personalInfo: true,
    contactInfo: true,
    academicInfo: true,
    attendanceInfo: false,
    medicalInfo: false,
    financialInfo: false,
    includePhoto: true,
  })
  const { toast } = useToast()

  // Fetch student data when modal opens
  useEffect(() => {
    if (isOpen && !studentData) {
      fetchStudentData()
    }
  }, [isOpen, studentId])

  const fetchStudentData = async () => {
    setIsLoading(true)
    try {
      const response = await studentsApi.getById(String(studentId))
      setStudentData(response.student)
    } catch (error) {
      console.error("Error fetching student data:", error)
      toast({
        title: "Error",
        description: "Failed to load student data",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleOptionChange = (option: keyof typeof printOptions) => {
    setPrintOptions({
      ...printOptions,
      [option]: !printOptions[option],
    })
  }

  const handlePrint = () => {
    if (!studentData) {
      toast({
        title: "Error",
        description: "Student data not loaded",
        variant: "destructive",
      })
      return
    }

    // Create a new window for printing
    const printWindow = window.open('', '_blank')
    if (!printWindow) return

    const printContent = generatePrintContent()

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Student Information - ${studentName}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
              line-height: 1.6;
            }
            .header {
              text-align: center;
              border-bottom: 2px solid #333;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .section {
              margin-bottom: 25px;
              page-break-inside: avoid;
            }
            .section-title {
              font-size: 18px;
              font-weight: bold;
              color: #333;
              border-bottom: 1px solid #ccc;
              padding-bottom: 5px;
              margin-bottom: 15px;
            }
            .info-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 15px;
            }
            .info-item {
              margin-bottom: 8px;
            }
            .info-label {
              font-weight: bold;
              color: #555;
            }
            .photo {
              float: right;
              margin: 0 0 20px 20px;
              border: 1px solid #ccc;
              padding: 5px;
            }
            @media print {
              body { margin: 0; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          ${printContent}
        </body>
      </html>
    `)

    printWindow.document.close()
    printWindow.focus()

    // Wait for content to load then print
    setTimeout(() => {
      printWindow.print()
      printWindow.close()
    }, 250)

    setIsOpen(false)
  }

  const generatePrintContent = () => {
    if (!studentData) return ''

    let content = `
      <div class="header">
        <h1>Student Information Report</h1>
        <h2>${studentData.full_name || `${studentData.first_name} ${studentData.last_name}`}</h2>
        <p>Student ID: ${studentData.student_id}</p>
        <p>Generated on: ${new Date().toLocaleDateString()}</p>
      </div>
    `

    if (printOptions.includePhoto && studentData.profile_picture) {
      content += `
        <div class="photo">
          <img src="${studentData.profile_picture}" alt="Student Photo" style="width: 120px; height: 150px; object-fit: cover;">
        </div>
      `
    }

    if (printOptions.personalInfo) {
      content += `
        <div class="section">
          <div class="section-title">Personal Information</div>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">Full Name:</span> ${studentData.full_name || `${studentData.first_name} ${studentData.last_name}`}
            </div>
            <div class="info-item">
              <span class="info-label">Date of Birth:</span> ${studentData.date_of_birth ? new Date(studentData.date_of_birth).toLocaleDateString() : 'Not specified'}
            </div>
            <div class="info-item">
              <span class="info-label">Gender:</span> ${studentData.gender || 'Not specified'}
            </div>
            <div class="info-item">
              <span class="info-label">Blood Group:</span> ${studentData.blood_group || 'Not specified'}
            </div>
            <div class="info-item">
              <span class="info-label">Nationality:</span> ${studentData.nationality || 'Not specified'}
            </div>
            <div class="info-item">
              <span class="info-label">Religion:</span> ${studentData.religion || 'Not specified'}
            </div>
          </div>
        </div>
      `
    }

    if (printOptions.contactInfo) {
      content += `
        <div class="section">
          <div class="section-title">Contact Information</div>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">Email:</span> ${studentData.email || 'Not specified'}
            </div>
            <div class="info-item">
              <span class="info-label">Phone:</span> ${studentData.phone || 'Not specified'}
            </div>
            <div class="info-item">
              <span class="info-label">Address:</span> ${studentData.address || 'Not specified'}
            </div>
            <div class="info-item">
              <span class="info-label">Emergency Contact:</span> ${studentData.emergency_contact_name || 'Not specified'}
            </div>
            <div class="info-item">
              <span class="info-label">Emergency Phone:</span> ${studentData.emergency_contact_phone || 'Not specified'}
            </div>
            <div class="info-item">
              <span class="info-label">Emergency Relation:</span> ${studentData.emergency_contact_relation || 'Not specified'}
            </div>
          </div>
        </div>
      `
    }

    if (printOptions.academicInfo) {
      content += `
        <div class="section">
          <div class="section-title">Academic Information</div>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">Student ID:</span> ${studentData.student_id}
            </div>
            <div class="info-item">
              <span class="info-label">Current Class:</span> ${studentData.class_name || 'Not assigned'}
            </div>
            <div class="info-item">
              <span class="info-label">Grade Level:</span> ${studentData.grade_level || 'Not specified'}
            </div>
            <div class="info-item">
              <span class="info-label">Academic Year:</span> ${studentData.academic_year || 'Not specified'}
            </div>
            <div class="info-item">
              <span class="info-label">Admission Number:</span> ${studentData.admission_number || 'Not assigned'}
            </div>
            <div class="info-item">
              <span class="info-label">Admission Date:</span> ${studentData.admission_date ? new Date(studentData.admission_date).toLocaleDateString() : 'Not specified'}
            </div>
            <div class="info-item">
              <span class="info-label">Roll Number:</span> ${studentData.roll_number || 'Not assigned'}
            </div>
            <div class="info-item">
              <span class="info-label">Status:</span> ${studentData.user_status || 'Not specified'}
            </div>
          </div>
        </div>
      `
    }

    if (printOptions.medicalInfo) {
      content += `
        <div class="section">
          <div class="section-title">Medical Information</div>
          <div class="info-item">
            <span class="info-label">Medical Conditions:</span> ${studentData.medical_conditions || 'None specified'}
          </div>
        </div>
      `
    }

    return content
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
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">
              Loading student data...
            </div>
          ) : (
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
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handlePrint} disabled={isLoading || !studentData}>
            <Printer className="mr-2 h-4 w-4" />
            {isLoading ? "Loading..." : "Print"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
