"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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
import { Checkbox } from "@/components/ui/checkbox"
import { FileUpload } from "@/src/components/ui/file-upload"
import { toast } from "@/components/ui/use-toast"
import { classesApi } from "@/src/lib/api"
import { Loader2, Plus, RefreshCw } from "lucide-react"
import * as z from "zod"



// Backend-compatible student schema
const backendStudentSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(100, 'First name must be less than 100 characters'),
  lastName: z.string().min(1, 'Last name is required').max(100, 'Last name must be less than 100 characters'),
  middleName: z.string().max(100, 'Middle name must be less than 100 characters').optional(),
  email: z.string().email('Please enter a valid email').optional(),
  phone: z.string().optional(),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  gender: z.enum(['male', 'female', 'other']),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
  nationality: z.string().max(100, 'Nationality must be less than 100 characters').optional(),
  religion: z.string().max(100, 'Religion must be less than 100 characters').optional(),
  address: z.string().max(500, 'Address must be less than 500 characters').optional(),
  emergencyContactName: z.string().max(200, 'Emergency contact name must be less than 200 characters').optional(),
  emergencyContactPhone: z.string().optional(),
  emergencyContactRelationship: z.string().max(100, 'Emergency contact relationship must be less than 100 characters').optional(),
  admissionDate: z.string().min(1, 'Admission date is required'),
  admissionNumber: z.string().max(50, 'Admission number must be less than 50 characters').optional(),
  currentClassId: z.string().min(1, 'Please select a class'),
  academicYearId: z.string().uuid('Academic year ID must be a valid UUID').optional(),
  medicalConditions: z.string().max(1000, 'Medical conditions must be less than 1000 characters').optional(),
  allergies: z.string().max(1000, 'Allergies must be less than 1000 characters').optional(),
  generatePassword: z.boolean().default(true),
  password: z.string().optional(),
})

// Interface for class data from API (matches backend response)
interface ClassData {
  id: string
  uuid?: string  // UUID field that backend expects
  name: string
  section?: string
  capacity?: number
  room_number?: string
  status: string
  created_at?: string
  grade_level?: string
  level_number?: number
  academic_year?: string
  class_teacher_name?: string
  student_count?: number
  subject_count?: number
}

type BackendStudentFormData = z.infer<typeof backendStudentSchema>



interface AddStudentModalProps {
  onAdd: (newStudent: BackendStudentFormData) => Promise<void>
  trigger?: React.ReactNode
}

export function AddStudentModal({ onAdd, trigger }: AddStudentModalProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [classes, setClasses] = useState<ClassData[]>([])
  const [loadingClasses, setLoadingClasses] = useState(false)
  const [generatedStudentId, setGeneratedStudentId] = useState<string>('')

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<BackendStudentFormData>({
    resolver: zodResolver(backendStudentSchema),
    defaultValues: {
      gender: 'male',
      admissionDate: new Date().toISOString().split('T')[0],
      generatePassword: true,
    },
  })

  // Fetch classes and generate student ID preview when modal opens
  useEffect(() => {
    if (open) {
      fetchClasses()
      generateStudentIdPreview()
    }
  }, [open])

  const fetchClasses = async () => {
    try {
      setLoadingClasses(true)

      const response = await classesApi.getAll({
        status: 'active',
        limit: 100,
        sort_by: 'name',
        sort_order: 'ASC'
      })

      if (response.success && response.data) {
        // Handle different possible response structures
        let classesArray = []
        const data = response.data as any
        if (data.classes && Array.isArray(data.classes)) {
          classesArray = data.classes
        } else if (Array.isArray(response.data)) {
          classesArray = response.data
        }

        console.log('First class structure:', classesArray[0])
        console.log('Available fields:', Object.keys(classesArray[0] || {}))
        console.log('ID field:', classesArray[0]?.id, 'UUID field:', classesArray[0]?.uuid)
        setClasses(classesArray)

        if (classesArray.length === 0) {
          toast({
            title: "No Classes Found",
            description: "No active classes are available. Please contact an administrator.",
            variant: "destructive",
          })
        }
      } else {
        setClasses([])
        toast({
          title: "Warning",
          description: "Failed to load classes. Please refresh and try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Error fetching classes:', error)
      setClasses([])
      toast({
        title: "Error",
        description: "Failed to load classes. Please check your connection.",
        variant: "destructive",
      })
    } finally {
      setLoadingClasses(false)
    }
  }

  const generateStudentIdPreview = () => {
    const currentYear = new Date().getFullYear()
    // This is just a preview - the actual ID will be generated by the backend
    setGeneratedStudentId(`STU-${currentYear}####`)
  }

  const onSubmit = async (data: BackendStudentFormData) => {
    try {
      setIsSubmitting(true)
      console.log('Form data being submitted:', data)
      console.log('Selected class ID:', data.currentClassId, 'Type:', typeof data.currentClassId)

      // Validate required fields
      if (!data.currentClassId) {
        toast({
          title: "Validation Error",
          description: "Please select a class for the student.",
          variant: "destructive",
        })
        return
      }

      // Find selected class for better success message
      const selectedClass = classes.find(cls => cls.id === data.currentClassId)

      console.log('Form data being sent to backend:', data)
      await onAdd(data)

      // Reset form and close modal
      reset()
      setOpen(false)

      toast({
        title: "Student Added Successfully! 🎉",
        description: `${data.firstName} ${data.lastName} has been enrolled in ${selectedClass?.name || 'the selected class'}.`,
      })
    } catch (error: any) {
      console.error('Error adding student:', error)

      // Handle validation errors from backend
      if (error?.response?.data?.errors && Array.isArray(error.response.data.errors)) {
        const validationErrors = error.response.data.errors
        const classError = validationErrors.find((err: any) => err.field === 'currentClassId')

        if (classError) {
          toast({
            title: "Class Selection Error",
            description: "The selected class is invalid. Please select a different class and try again.",
            variant: "destructive",
          })
        } else {
          // Show first validation error
          const firstError = validationErrors[0]
          toast({
            title: "Validation Error",
            description: `${firstError.message || 'Please check your input and try again.'}`,
            variant: "destructive",
          })
        }
      } else if (error?.response?.data?.message) {
        // Handle general error messages
        toast({
          title: "Error",
          description: error.response.data.message,
          variant: "destructive",
        })
      } else {
        // Handle unknown errors
        toast({
          title: "Error",
          description: "Failed to add student. Please try again.",
          variant: "destructive",
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  // Reset form when modal is closed
  const handleModalClose = (isOpen: boolean) => {
    setOpen(isOpen)
    if (!isOpen) {
      reset()
      setGeneratedStudentId('')
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleModalClose}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-[800px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Student</DialogTitle>
          <DialogDescription>Enter the student information below. Click save when you're done.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">

          {/* Student ID Preview */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm font-medium text-blue-800">Student ID Preview</span>
            </div>
            <p className="text-sm text-blue-600 mt-1">
              Student ID will be automatically generated: <span className="font-mono font-semibold">{generatedStudentId}</span>
            </p>
            <p className="text-xs text-blue-500 mt-1">
              The actual ID will be assigned when the student is created
            </p>
          </div>





          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="admissionNumber">Admission Number (Optional)</Label>
              <Input
                id="admissionNumber"
                {...register('admissionNumber')}
                className={errors.admissionNumber ? 'border-red-500' : ''}
                placeholder="Leave empty to auto-generate"
              />
              {errors.admissionNumber && (
                <p className="text-sm text-red-600">{errors.admissionNumber.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="currentClassId">Class *</Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={fetchClasses}
                  disabled={loadingClasses}
                  className="h-6 px-2 text-xs"
                >
                  <RefreshCw className={`h-3 w-3 mr-1 ${loadingClasses ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
              </div>
              <select
                {...register('currentClassId')}
                className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors.currentClassId ? 'border-red-500' : ''}`}
                disabled={loadingClasses}
              >
                <option value="">
                  {loadingClasses ? "Loading classes..." : "Select class"}
                </option>
                {classes.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.grade_level ? `${cls.name} (${cls.grade_level})` : cls.name}
                  </option>
                ))}
              </select>

              {errors.currentClassId && (
                <p className="text-sm text-red-600">{errors.currentClassId.message}</p>
              )}
              {classes.length === 0 && !loadingClasses && (
                <p className="text-xs text-amber-600">
                  No classes found. Please contact an administrator to create classes first.
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                {...register('firstName')}
                className={errors.firstName ? 'border-red-500' : ''}
              />
              {errors.firstName && (
                <p className="text-sm text-red-600">{errors.firstName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="middleName">Middle Name</Label>
              <Input
                id="middleName"
                {...register('middleName')}
                className={errors.middleName ? 'border-red-500' : ''}
              />
              {errors.middleName && (
                <p className="text-sm text-red-600">{errors.middleName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                {...register('lastName')}
                className={errors.lastName ? 'border-red-500' : ''}
              />
              {errors.lastName && (
                <p className="text-sm text-red-600">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email (Optional)</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone (Optional)</Label>
              <Input
                id="phone"
                {...register('phone')}
                className={errors.phone ? 'border-red-500' : ''}
              />
              {errors.phone && (
                <p className="text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth *</Label>
              <Input
                id="dateOfBirth"
                type="date"
                {...register('dateOfBirth')}
                className={errors.dateOfBirth ? 'border-red-500' : ''}
              />
              {errors.dateOfBirth && (
                <p className="text-sm text-red-600">{errors.dateOfBirth.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender *</Label>
              <Select
                value={watch('gender') || 'male'}
                onValueChange={(value) => setValue('gender', value as any)}
              >
                <SelectTrigger className={errors.gender ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && (
                <p className="text-sm text-red-600">{errors.gender.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="admissionDate">Admission Date *</Label>
              <Input
                id="admissionDate"
                type="date"
                {...register('admissionDate')}
                className={errors.admissionDate ? 'border-red-500' : ''}
              />
              {errors.admissionDate && (
                <p className="text-sm text-red-600">{errors.admissionDate.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bloodGroup">Blood Group</Label>
              <Select
                value={watch('bloodGroup') || ''}
                onValueChange={(value) => setValue('bloodGroup', value as any)}
              >
                <SelectTrigger className={errors.bloodGroup ? 'border-red-500' : ''}>
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
              {errors.bloodGroup && (
                <p className="text-sm text-red-600">{errors.bloodGroup.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="nationality">Nationality</Label>
              <Input
                id="nationality"
                {...register('nationality')}
                className={errors.nationality ? 'border-red-500' : ''}
                placeholder="e.g., Indian"
              />
              {errors.nationality && (
                <p className="text-sm text-red-600">{errors.nationality.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="religion">Religion</Label>
              <Input
                id="religion"
                {...register('religion')}
                className={errors.religion ? 'border-red-500' : ''}
              />
              {errors.religion && (
                <p className="text-sm text-red-600">{errors.religion.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address (Optional)</Label>
            <Input
              id="address"
              {...register('address')}
              className={errors.address ? 'border-red-500' : ''}
            />
            {errors.address && (
              <p className="text-sm text-red-600">{errors.address.message}</p>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="emergencyContactName">Emergency Contact Name</Label>
              <Input
                id="emergencyContactName"
                {...register('emergencyContactName')}
                className={errors.emergencyContactName ? 'border-red-500' : ''}
              />
              {errors.emergencyContactName && (
                <p className="text-sm text-red-600">{errors.emergencyContactName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="emergencyContactPhone">Emergency Contact Phone</Label>
              <Input
                id="emergencyContactPhone"
                {...register('emergencyContactPhone')}
                className={errors.emergencyContactPhone ? 'border-red-500' : ''}
              />
              {errors.emergencyContactPhone && (
                <p className="text-sm text-red-600">{errors.emergencyContactPhone.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="emergencyContactRelationship">Relationship</Label>
              <Input
                id="emergencyContactRelationship"
                {...register('emergencyContactRelationship')}
                className={errors.emergencyContactRelationship ? 'border-red-500' : ''}
                placeholder="e.g., Father, Mother, Guardian"
              />
              {errors.emergencyContactRelationship && (
                <p className="text-sm text-red-600">{errors.emergencyContactRelationship.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="medicalConditions">Medical Conditions</Label>
              <Input
                id="medicalConditions"
                {...register('medicalConditions')}
                className={errors.medicalConditions ? 'border-red-500' : ''}
                placeholder="Any medical conditions"
              />
              {errors.medicalConditions && (
                <p className="text-sm text-red-600">{errors.medicalConditions.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="allergies">Allergies</Label>
              <Input
                id="allergies"
                {...register('allergies')}
                className={errors.allergies ? 'border-red-500' : ''}
                placeholder="Any known allergies"
              />
              {errors.allergies && (
                <p className="text-sm text-red-600">{errors.allergies.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-4 border-t pt-4">
            <h4 className="text-sm font-medium">Password Settings</h4>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="generatePassword"
                checked={watch('generatePassword')}
                onCheckedChange={(checked) => setValue('generatePassword', !!checked)}
              />
              <Label htmlFor="generatePassword" className="text-sm">
                Generate password automatically (recommended)
              </Label>
            </div>

            {!watch('generatePassword') && (
              <div className="space-y-2">
                <Label htmlFor="password">Custom Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...register('password')}
                  className={errors.password ? 'border-red-500' : ''}
                  placeholder="Enter custom password (min 8 characters)"
                />
                {errors.password && (
                  <p className="text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="profile_picture">Profile Picture (Optional)</Label>
            <FileUpload
              accept="image/*"
              maxFiles={1}
              maxSize={5 * 1024 * 1024} // 5MB
              autoUpload={false}
              onFileSelect={(files) => {
                // Handle file selection for future implementation
                console.log('Selected files:', files)
              }}
            />
            <p className="text-xs text-muted-foreground">
              Upload a profile picture for the student (max 5MB)
            </p>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                'Add Student'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
