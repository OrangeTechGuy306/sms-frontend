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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Student {
  // Primary identifiers
  id?: string | number
  user_id?: number | string
  student_id?: string

  // Personal information
  first_name: string
  last_name: string
  middle_name?: string
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
  academic_year_id?: string | null
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
  allergies?: string | null

  // Guardian information
  guardian_name?: string | null
  guardian_phone?: string | null
  guardian_email?: string | null

  // Emergency contacts
  emergency_contact_name?: string | null
  emergency_contact_phone?: string | null
  emergency_contact_relation?: string | null

  // Requirements and status
  transport_required?: number | boolean | null
  hostel_required?: number | boolean | null
  status?: string | null
  user_status?: string

  // Password fields (for creation)
  generatePassword?: boolean
  password?: string

  // Timestamps
  created_at?: string | null
  updated_at?: string | null
  last_login?: string | null
}

interface AddStudentModalProps {
  onAdd?: (newStudent: Student) => Promise<void>
  onUpdate?: (updatedStudent: Student) => Promise<void>
  student?: Student // For edit mode
  mode?: 'add' | 'edit'
  trigger?: React.ReactNode
}

export function AddStudentModal({ onAdd, onUpdate, student, mode = 'add', trigger }: AddStudentModalProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const isEditMode = mode === 'edit' || !!student

  // Debug: Log when component receives props
  console.log('AddStudentModal props:', {
    student,
    mode,
    isEditMode,
    hasStudent: !!student,
    modeCheck: mode === 'edit',
    studentKeys: student ? Object.keys(student) : [],
    studentSample: student ? {
      id: student.id,
      first_name: student.first_name,
      last_name: student.last_name,
      email: student.email
    } : null
  })

  console.log('Modal UI state:', {
    dialogTitle: isEditMode ? 'Edit Student' : 'Add New Student',
    buttonText: isEditMode ? 'Update Student' : 'Add Student',
    isEditMode
  })
  // Initialize form data based on mode
  const [formData, setFormData] = useState<Student>(() => {
    console.log('Initializing form data:', { isEditMode, hasStudent: !!student })
    if (isEditMode && student) {
      console.log('Creating form data from student:', student)
      return {
        id: student.id,
        user_id: student.user_id,
        student_id: student.student_id,
        email: student.email || "",
        first_name: student.first_name || "",
        last_name: student.last_name || "",
        middle_name: student.middle_name || "",
        date_of_birth: student.date_of_birth ? student.date_of_birth.split('T')[0] : "",
        gender: student.gender || "male",
        blood_group: student.blood_group || "",
        nationality: student.nationality || "",
        religion: student.religion || "",
        address: student.address || "",
        phone: student.phone || "",
        guardian_name: "", // Not in API response
        guardian_phone: "", // Not in API response
        guardian_email: "", // Not in API response
        emergency_contact_name: student.emergency_contact_name || "",
        emergency_contact_phone: student.emergency_contact_phone || "",
        emergency_contact_relation: student.emergency_contact_relation || "",
        admission_date: student.admission_date ? student.admission_date.split('T')[0] : "",
        admission_number: student.admission_number || "",
        current_class_id: student.current_class_id || "",
        academic_year_id: student.academic_year_id || "",
        medical_conditions: student.medical_conditions || "",
        allergies: "", // Not in API response
        category: student.category || "",
        mother_tongue: student.mother_tongue || "",
        previous_school: student.previous_school || "",
        transport_required: Boolean(student.transport_required),
        hostel_required: Boolean(student.hostel_required),
        generatePassword: false,
        password: "",
      }
    }

    // Default form data for add mode
    return {
      email: "",
      first_name: "",
      last_name: "",
      middle_name: "",
      date_of_birth: "",
      gender: "male",
      blood_group: "",
      nationality: "",
      religion: "",
      address: "",
      phone: "",
      guardian_name: "",
      guardian_phone: "",
      guardian_email: "",
      emergency_contact_name: "",
      emergency_contact_phone: "",
      emergency_contact_relation: "",
      admission_date: new Date().toISOString().split('T')[0],
      admission_number: "",
      current_class_id: "",
      academic_year_id: "",
      medical_conditions: "",
      allergies: "",
      category: "",
      mother_tongue: "",
      previous_school: "",
      transport_required: false,
      hostel_required: false,
      generatePassword: true,
      password: "",
    }
  })

  // Update form data when student prop changes (for edit mode)
  useEffect(() => {
    console.log('useEffect triggered:', { isEditMode, student: !!student })
    if (isEditMode && student) {
      console.log('Populating form with student data:', student)
      setFormData({
        id: student.id,
        user_id: student.user_id,
        student_id: student.student_id,
        email: student.email || "",
        first_name: student.first_name || "",
        last_name: student.last_name || "",
        middle_name: student.middle_name || "",
        date_of_birth: student.date_of_birth ? student.date_of_birth.split('T')[0] : "",
        gender: student.gender || "male",
        blood_group: student.blood_group || "",
        nationality: student.nationality || "",
        religion: student.religion || "",
        address: student.address || "",
        phone: student.phone || "",
        guardian_name: "", // Not in API response
        guardian_phone: "", // Not in API response
        guardian_email: "", // Not in API response
        emergency_contact_name: student.emergency_contact_name || "",
        emergency_contact_phone: student.emergency_contact_phone || "",
        emergency_contact_relation: student.emergency_contact_relation || "",
        admission_date: student.admission_date ? student.admission_date.split('T')[0] : "",
        admission_number: student.admission_number || "",
        current_class_id: student.current_class_id || "",
        academic_year_id: student.academic_year_id || "",
        medical_conditions: student.medical_conditions || "",
        allergies: "", // Not in API response
        category: student.category || "",
        mother_tongue: student.mother_tongue || "",
        previous_school: student.previous_school || "",
        transport_required: Boolean(student.transport_required),
        hostel_required: Boolean(student.hostel_required),
        generatePassword: false,
        password: "",
      })
    }
  }, [student, isEditMode])

  // Debug: Track prop changes
  useEffect(() => {
    console.log('Props changed:', { mode, hasStudent: !!student, isEditMode })
  }, [mode, student, isEditMode])



  const handleInputChange = (field: keyof Student, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!formData.first_name?.trim() || !formData.last_name?.trim() || !formData.email?.trim()) {
      toast({
        title: "Validation Error",
        description: "First name, last name, and email are required.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      if (isEditMode) {
        await onUpdate?.(formData)
        toast({
          title: "Student Updated",
          description: `${formData.first_name} ${formData.last_name}'s information has been updated successfully.`,
        })
      } else {
        await onAdd?.(formData)
        toast({
          title: "Student Added",
          description: `${formData.first_name} ${formData.last_name} has been added successfully.`,
        })
      }

      setOpen(false)

      // Reset form only in add mode
      if (!isEditMode) {
        setFormData(getInitialFormData())
      }
    } catch (error) {
      console.error(`Error ${isEditMode ? 'updating' : 'adding'} student:`, error)
      toast({
        title: "Error",
        description: `Failed to ${isEditMode ? 'update' : 'add'} student. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Debug: Log current form data
  console.log('Current form data:', {
    first_name: formData.first_name,
    last_name: formData.last_name,
    email: formData.email,
    isEditMode,
    hasStudent: !!student
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Edit Student' : 'Add New Student'}</DialogTitle>
          <DialogDescription>
            {isEditMode ? 'Update the student\'s information below.' : 'Enter the student\'s information below.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="contact">Contact & Family</TabsTrigger>
              <TabsTrigger value="academic">Academic Info</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first_name">First Name *</Label>
                  <Input
                    id="first_name"
                    value={formData.first_name || ""}
                    onChange={(e) => handleInputChange("first_name", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name">Last Name *</Label>
                  <Input
                    id="last_name"
                    value={formData.last_name || ""}
                    onChange={(e) => handleInputChange("last_name", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="middle_name">Middle Name</Label>
                  <Input
                    id="middle_name"
                    value={formData.middle_name || ""}
                    onChange={(e) => handleInputChange("middle_name", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email || ""}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date_of_birth">Date of Birth *</Label>
                  <Input
                    id="date_of_birth"
                    type="date"
                    value={formData.date_of_birth || ""}
                    onChange={(e) => handleInputChange("date_of_birth", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender *</Label>
                  <Select value={formData.gender || "male"} onValueChange={(value) => handleInputChange("gender", value)}>
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
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone || ""}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nationality">Nationality</Label>
                  <Input
                    id="nationality"
                    value={formData.nationality || ""}
                    onChange={(e) => handleInputChange("nationality", e.target.value)}
                  />
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
                  <Label htmlFor="guardian_name">Guardian Name</Label>
                  <Input
                    id="guardian_name"
                    value={formData.guardian_name || ""}
                    onChange={(e) => handleInputChange("guardian_name", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guardian_phone">Guardian Phone</Label>
                  <Input
                    id="guardian_phone"
                    value={formData.guardian_phone || ""}
                    onChange={(e) => handleInputChange("guardian_phone", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="guardian_email">Guardian Email</Label>
                  <Input
                    id="guardian_email"
                    type="email"
                    value={formData.guardian_email || ""}
                    onChange={(e) => handleInputChange("guardian_email", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergency_contact_name">Emergency Contact Name</Label>
                  <Input
                    id="emergency_contact_name"
                    value={formData.emergency_contact_name || ""}
                    onChange={(e) => handleInputChange("emergency_contact_name", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emergency_contact_phone">Emergency Contact Phone</Label>
                  <Input
                    id="emergency_contact_phone"
                    value={formData.emergency_contact_phone || ""}
                    onChange={(e) => handleInputChange("emergency_contact_phone", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergency_contact_relation">Emergency Contact Relationship</Label>
                  <Input
                    id="emergency_contact_relation"
                    value={formData.emergency_contact_relation || ""}
                    onChange={(e) => handleInputChange("emergency_contact_relation", e.target.value)}
                    placeholder="e.g., Father, Mother, Uncle"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="medical_conditions">Medical Conditions</Label>
                  <Textarea
                    id="medical_conditions"
                    value={formData.medical_conditions || ""}
                    onChange={(e) => handleInputChange("medical_conditions", e.target.value)}
                    rows={3}
                    placeholder="Any medical conditions..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="allergies">Allergies</Label>
                  <Textarea
                    id="allergies"
                    value={formData.allergies || ""}
                    onChange={(e) => handleInputChange("allergies", e.target.value)}
                    rows={3}
                    placeholder="Any allergies..."
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
                    placeholder="Leave empty to auto-generate"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admission_date">Admission Date</Label>
                  <Input
                    id="admission_date"
                    type="date"
                    value={formData.admission_date || ""}
                    onChange={(e) => handleInputChange("admission_date", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="current_class_id">Current Class ID</Label>
                  <Input
                    id="current_class_id"
                    value={formData.current_class_id || ""}
                    onChange={(e) => handleInputChange("current_class_id", e.target.value)}
                    placeholder="Optional - Class UUID"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="academic_year_id">Academic Year ID</Label>
                  <Input
                    id="academic_year_id"
                    value={formData.academic_year_id || ""}
                    onChange={(e) => handleInputChange("academic_year_id", e.target.value)}
                    placeholder="Optional - Academic Year UUID"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={formData.category || ""}
                    onChange={(e) => handleInputChange("category", e.target.value)}
                    placeholder="e.g., General, OBC, SC, ST"
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
              </div>

              {!isEditMode && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="generatePassword"
                      checked={formData.generatePassword}
                      onChange={(e) => handleInputChange("generatePassword", e.target.checked ? "true" : "false")}
                    />
                    <Label htmlFor="generatePassword">Generate password automatically</Label>
                  </div>

                  {!formData.generatePassword && (
                    <div className="space-y-2">
                      <Label htmlFor="password">Password *</Label>
                      <Input
                        id="password"
                        type="password"
                        value={formData.password || ""}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        placeholder="Minimum 8 characters"
                        required={!formData.generatePassword}
                      />
                    </div>
                  )}
                </div>
              )}
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? (isEditMode ? "Updating..." : "Adding...")
                : (isEditMode ? "Update Student" : "Add Student")
              }
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
