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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { FileInput } from "@/components/ui/file-input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Student {
  id: string
  name: string
  class: string
  gender: string
  parent: string
  contact: string
  status: string
  // Additional fields
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

interface EditStudentModalProps {
  student: Student
  trigger?: React.ReactNode
  onSave?: (updatedStudent: Student) => void
}

export function EditStudentModal({ student, trigger, onSave }: EditStudentModalProps) {
  const [formData, setFormData] = useState<Student>({
    ...student,
    email: student.email || "",
    dateOfBirth: student.dateOfBirth || "",
    address: student.address || "",
    admissionDate: student.admissionDate || "",
    bloodGroup: student.bloodGroup || "",
    emergencyContact: student.emergencyContact || "",
    medicalConditions: student.medicalConditions || "",
    religion: student.religion || "",
    nationality: student.nationality || "",
    passportPhoto: student.passportPhoto || null,
  })

  useEffect(() => {
    setFormData({
      ...student,
      email: student.email || "",
      dateOfBirth: student.dateOfBirth || "",
      address: student.address || "",
      admissionDate: student.admissionDate || "",
      bloodGroup: student.bloodGroup || "",
      emergencyContact: student.emergencyContact || "",
      medicalConditions: student.medicalConditions || "",
      religion: student.religion || "",
      nationality: student.nationality || "",
      passportPhoto: student.passportPhoto || null,
    })
  }, [student])

  const handleChange = (field: keyof Student, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileChange = (file: File | null) => {
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, passportPhoto: reader.result as string }))
      }
      reader.readAsDataURL(file)
    } else {
      setFormData((prev) => ({ ...prev, passportPhoto: null }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSave) {
      onSave(formData)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="sm">
            Edit
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-[800px] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Student</DialogTitle>
            <DialogDescription>
              Make changes to the student information here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="basic" className="mt-5">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Information</TabsTrigger>
              <TabsTrigger value="contact">Contact Details</TabsTrigger>
              <TabsTrigger value="additional">Additional Info</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4 py-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="class">Class</Label>
                  <Select value={formData.class} onValueChange={(value) => handleChange("class", value)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Grade 9A">Grade 9A</SelectItem>
                      <SelectItem value="Grade 9B">Grade 9B</SelectItem>
                      <SelectItem value="Grade 10A">Grade 10A</SelectItem>
                      <SelectItem value="Grade 10B">Grade 10B</SelectItem>
                      <SelectItem value="Grade 11A">Grade 11A</SelectItem>
                      <SelectItem value="Grade 11B">Grade 11B</SelectItem>
                      <SelectItem value="Grade 12A">Grade 12A</SelectItem>
                      <SelectItem value="Grade 12B">Grade 12B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={formData.gender} onValueChange={(value) => handleChange("gender", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="admissionDate">Admission Date</Label>
                  <Input
                    id="admissionDate"
                    type="date"
                    value={formData.admissionDate}
                    onChange={(e) => handleChange("admissionDate", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="On Leave">On Leave</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="passportPhoto">Passport Photo</Label>
                  <FileInput
                    id="passportPhoto"
                    accept="image/*"
                    onFileChange={handleFileChange}
                    previewUrl={formData.passportPhoto || undefined}
                    buttonText="Upload Passport Photo"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="contact" className="space-y-4 py-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Number</Label>
                  <Input
                    id="contact"
                    value={formData.contact}
                    onChange={(e) => handleChange("contact", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="parent">Parent/Guardian Name</Label>
                  <Input
                    id="parent"
                    value={formData.parent}
                    onChange={(e) => handleChange("parent", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Emergency Contact</Label>
                  <Input
                    id="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={(e) => handleChange("emergencyContact", e.target.value)}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="additional" className="space-y-4 py-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="bloodGroup">Blood Group</Label>
                  <Select value={formData.bloodGroup} onValueChange={(value) => handleChange("bloodGroup", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select blood group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="religion">Religion</Label>
                  <Input
                    id="religion"
                    value={formData.religion}
                    onChange={(e) => handleChange("religion", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nationality">Nationality</Label>
                  <Input
                    id="nationality"
                    value={formData.nationality}
                    onChange={(e) => handleChange("nationality", e.target.value)}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="medicalConditions">Medical Conditions</Label>
                  <Textarea
                    id="medicalConditions"
                    value={formData.medicalConditions}
                    onChange={(e) => handleChange("medicalConditions", e.target.value)}
                    placeholder="List any medical conditions or allergies"
                    rows={3}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-6">
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
