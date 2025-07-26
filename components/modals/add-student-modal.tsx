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
import { FileUpload } from "@/src/components/ui/file-upload"
import { studentSchema, type StudentFormData } from "@/src/lib/validations"
import { classesApi } from "@/src/lib/api"
import { Loader2, Plus } from "lucide-react"

interface AddStudentModalProps {
  onAdd: (newStudent: StudentFormData) => Promise<void>
  trigger?: React.ReactNode
}

export function AddStudentModal({ onAdd, trigger }: AddStudentModalProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [classes, setClasses] = useState<any[]>([])
  const [loadingClasses, setLoadingClasses] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      status: 'active',
      gender: 'male',
      admission_date: new Date().toISOString().split('T')[0],
    },
  })

  // Fetch classes when modal opens
  useEffect(() => {
    if (open) {
      fetchClasses()
    }
  }, [open])

  const fetchClasses = async () => {
    try {
      setLoadingClasses(true)
      const response = await classesApi.getAll()
      setClasses(response.data || [])
    } catch (error) {
      console.error('Error fetching classes:', error)
      setClasses([])
    } finally {
      setLoadingClasses(false)
    }
  }

  const onSubmit = async (data: StudentFormData) => {
    try {
      setIsSubmitting(true)
      await onAdd(data)
      reset()
      setOpen(false)
    } catch (error) {
      console.error('Error adding student:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

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
      <DialogContent className="max-h-[90vh] max-w-[800px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Student</DialogTitle>
          <DialogDescription>Enter the student information below. Click save when you're done.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="student_id">Student ID</Label>
              <Input
                id="student_id"
                {...register('student_id')}
                className={errors.student_id ? 'border-red-500' : ''}
              />
              {errors.student_id && (
                <p className="text-sm text-red-600">{errors.student_id.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="class_id">Class</Label>
              <Select onValueChange={(value) => setValue('class_id', value)}>
                <SelectTrigger className={errors.class_id ? 'border-red-500' : ''}>
                  <SelectValue placeholder={loadingClasses ? "Loading classes..." : "Select class"} />
                </SelectTrigger>
                <SelectContent>
                  {loadingClasses ? (
                    <SelectItem value="loading" disabled>Loading classes...</SelectItem>
                  ) : classes.length > 0 ? (
                    classes.map((cls) => (
                      <SelectItem key={cls.uuid} value={cls.uuid}>
                        {cls.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-classes" disabled>No classes available</SelectItem>
                  )}
                </SelectContent>
              </Select>
              {errors.class_id && (
                <p className="text-sm text-red-600">{errors.class_id.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first_name">First Name</Label>
              <Input
                id="first_name"
                {...register('first_name')}
                className={errors.first_name ? 'border-red-500' : ''}
              />
              {errors.first_name && (
                <p className="text-sm text-red-600">{errors.first_name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="last_name">Last Name</Label>
              <Input
                id="last_name"
                {...register('last_name')}
                className={errors.last_name ? 'border-red-500' : ''}
              />
              {errors.last_name && (
                <p className="text-sm text-red-600">{errors.last_name.message}</p>
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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date_of_birth">Date of Birth</Label>
              <Input
                id="date_of_birth"
                type="date"
                {...register('date_of_birth')}
                className={errors.date_of_birth ? 'border-red-500' : ''}
              />
              {errors.date_of_birth && (
                <p className="text-sm text-red-600">{errors.date_of_birth.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select onValueChange={(value) => setValue('gender', value as any)} defaultValue="male">
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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="guardian_name">Guardian Name</Label>
              <Input
                id="guardian_name"
                {...register('guardian_name')}
                className={errors.guardian_name ? 'border-red-500' : ''}
              />
              {errors.guardian_name && (
                <p className="text-sm text-red-600">{errors.guardian_name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="guardian_phone">Guardian Phone</Label>
              <Input
                id="guardian_phone"
                {...register('guardian_phone')}
                className={errors.guardian_phone ? 'border-red-500' : ''}
              />
              {errors.guardian_phone && (
                <p className="text-sm text-red-600">{errors.guardian_phone.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="guardian_email">Guardian Email (Optional)</Label>
            <Input
              id="guardian_email"
              type="email"
              {...register('guardian_email')}
              className={errors.guardian_email ? 'border-red-500' : ''}
            />
            {errors.guardian_email && (
              <p className="text-sm text-red-600">{errors.guardian_email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="admission_date">Admission Date</Label>
            <Input
              id="admission_date"
              type="date"
              {...register('admission_date')}
              className={errors.admission_date ? 'border-red-500' : ''}
            />
            {errors.admission_date && (
              <p className="text-sm text-red-600">{errors.admission_date.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="profile_picture">Profile Picture</Label>
            <FileUpload
              accept="image/*"
              maxFiles={1}
              maxSize={5 * 1024 * 1024} // 5MB
              autoUpload={false}
              onFileSelect={(files) => {
                // Handle file selection
                console.log('Selected files:', files)
              }}
            />
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
