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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

interface Student {
  // Primary identifiers
  id: string | number
  user_id?: number | string
  student_id: string

  // Personal information
  first_name: string
  last_name: string
  full_name?: string
  email: string
  phone?: string | null
  date_of_birth?: string | null
  gender?: string | null
  address?: string | null
  profile_picture?: string | null

  // Academic information
  class_id?: number | string | null
  current_class_id?: number | string | null
  class_name?: string | null
  grade_level?: string | null
  academic_year?: string | null
  admission_number?: string | null
  admission_date?: string | null
  roll_number?: string | null

  // Additional details
  blood_group?: string | null
  nationality?: string | null
  religion?: string | null
  category?: string | null
  mother_tongue?: string | null
  previous_school?: string | null
  medical_conditions?: string | null

  // Emergency contacts
  emergency_contact_name?: string | null
  emergency_contact_phone?: string | null
  emergency_contact_relation?: string | null

  // Requirements and status
  transport_required?: number | boolean | null
  hostel_required?: number | boolean | null
  status?: string | null
  user_status?: string

  // Timestamps
  created_at?: string | null
  updated_at?: string | null
  last_login?: string | null
}

interface EditStudentModalProps {
  student: Student
  trigger?: React.ReactNode
  onSave?: (updatedStudent: Student) => void
}

export function EditStudentModal({ student, trigger, onSave }: EditStudentModalProps) {
  const [formData, setFormData] = useState<Student>(student)
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    setFormData(student)
  }, [student])

  const handleInputChange = (field: keyof Student, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = async () => {
    // Basic validation
    if (!formData.first_name?.trim() || !formData.last_name?.trim() || !formData.email?.trim()) {
      toast({
        title: "Validation Error",
        description: "First name, last name, and email are required.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      // Call the parent's onSave function with the updated data
      onSave?.(formData)
      setIsOpen(false)
    } catch (error) {
      console.error("Error updating student:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || <Button variant="outline">Edit Student</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Student Information</DialogTitle>
          <DialogDescription>Update the student's details below.</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="contact">Contact & Family</TabsTrigger>
            <TabsTrigger value="academic">Academic Info</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first_name">First Name</Label>
                <Input
                  id="first_name"
                  value={formData.first_name}
                  onChange={(e) => handleInputChange("first_name", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name">Last Name</Label>
                <Input
                  id="last_name"
                  value={formData.last_name}
                  onChange={(e) => handleInputChange("last_name", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email || ""}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone || ""}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date_of_birth">Date of Birth</Label>
                <Input
                  id="date_of_birth"
                  type="date"
                  value={formData.date_of_birth ? formData.date_of_birth.split('T')[0] : ""}
                  onChange={(e) => handleInputChange("date_of_birth", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={formData.gender || ""} onValueChange={(value) => handleInputChange("gender", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="blood_group">Blood Group</Label>
                <Select value={formData.blood_group || ""} onValueChange={(value) => handleInputChange("blood_group", value)}>
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
                  value={formData.religion || ""}
                  onChange={(e) => handleInputChange("religion", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nationality">Nationality</Label>
                <Input
                  id="nationality"
                  value={formData.nationality || ""}
                  onChange={(e) => handleInputChange("nationality", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mother_tongue">Mother Tongue</Label>
                <Input
                  id="mother_tongue"
                  value={formData.mother_tongue || ""}
                  onChange={(e) => handleInputChange("mother_tongue", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={formData.address || ""}
                onChange={(e) => handleInputChange("address", e.target.value)}
                rows={3}
              />
            </div>
          </TabsContent>

          <TabsContent value="contact" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="emergency_contact_name">Emergency Contact Name</Label>
                <Input
                  id="emergency_contact_name"
                  value={formData.emergency_contact_name || ""}
                  onChange={(e) => handleInputChange("emergency_contact_name", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergency_contact_phone">Emergency Contact Phone</Label>
                <Input
                  id="emergency_contact_phone"
                  value={formData.emergency_contact_phone || ""}
                  onChange={(e) => handleInputChange("emergency_contact_phone", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="emergency_contact_relation">Emergency Contact Relation</Label>
              <Input
                id="emergency_contact_relation"
                value={formData.emergency_contact_relation || ""}
                onChange={(e) => handleInputChange("emergency_contact_relation", e.target.value)}
                placeholder="e.g., Father, Mother, Guardian"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="medical_conditions">Medical Conditions</Label>
              <Textarea
                id="medical_conditions"
                value={formData.medical_conditions || ""}
                onChange={(e) => handleInputChange("medical_conditions", e.target.value)}
                rows={3}
                placeholder="Any medical conditions or allergies..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="previous_school">Previous School</Label>
                <Input
                  id="previous_school"
                  value={formData.previous_school || ""}
                  onChange={(e) => handleInputChange("previous_school", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={formData.category || ""}
                  onChange={(e) => handleInputChange("category", e.target.value)}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="academic" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="admission_number">Admission Number</Label>
                <Input
                  id="admission_number"
                  value={formData.admission_number || ""}
                  onChange={(e) => handleInputChange("admission_number", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="admission_date">Admission Date</Label>
                <Input
                  id="admission_date"
                  type="date"
                  value={formData.admission_date ? formData.admission_date.split('T')[0] : ""}
                  onChange={(e) => handleInputChange("admission_date", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="roll_number">Roll Number</Label>
                <Input
                  id="roll_number"
                  value={formData.roll_number || ""}
                  onChange={(e) => handleInputChange("roll_number", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="user_status">Status</Label>
                <Select value={formData.user_status || ""} onValueChange={(value) => handleInputChange("user_status", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="graduated">Graduated</SelectItem>
                    <SelectItem value="transferred">Transferred</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="transport_required"
                  checked={Boolean(formData.transport_required)}
                  onChange={(e) => handleInputChange("transport_required", e.target.checked ? "1" : "0")}
                />
                <Label htmlFor="transport_required">Transport Required</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="hostel_required"
                  checked={Boolean(formData.hostel_required)}
                  onChange={(e) => handleInputChange("hostel_required", e.target.checked ? "1" : "0")}
                />
                <Label htmlFor="hostel_required">Hostel Required</Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Current Assignment</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 border rounded-lg bg-muted">
                  <div className="text-sm font-medium">Class</div>
                  <div className="text-sm text-muted-foreground">{formData.class_name || "Not Assigned"}</div>
                </div>
                <div className="p-3 border rounded-lg bg-muted">
                  <div className="text-sm font-medium">Grade Level</div>
                  <div className="text-sm text-muted-foreground">{formData.grade_level || "Not Assigned"}</div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
