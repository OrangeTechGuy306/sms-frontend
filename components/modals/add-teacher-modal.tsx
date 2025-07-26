"use client"

import type React from "react"

import { useState } from "react"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "@/src/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { FileUpload } from "@/src/components/ui/file-upload"
import { teacherSchema, type TeacherFormData } from "@/src/lib/validations"
import { Loader2, Plus } from "lucide-react"

interface AddTeacherModalProps {
  onAdd: (newTeacher: TeacherFormData) => Promise<void>
  trigger?: React.ReactNode
}

export function AddTeacherModal({ onAdd, trigger }: AddTeacherModalProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<TeacherFormData>({
    resolver: zodResolver(teacherSchema),
    defaultValues: {
      status: 'active',
      gender: 'male',
      hire_date: new Date().toISOString().split('T')[0],
    },
  })

  const onSubmit = async (data: TeacherFormData) => {
    try {
      setIsSubmitting(true)
      await onAdd(data)
      reset()
      setOpen(false)
    } catch (error) {
      console.error('Error adding teacher:', error)
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
            Add Teacher
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Teacher</DialogTitle>
          <DialogDescription>Enter the teacher information below.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="employee_id">Employee ID</Label>
              <Input
                id="employee_id"
                {...register('employee_id')}
                className={errors.employee_id ? 'border-red-500' : ''}
              />
              {errors.employee_id && (
                <p className="text-sm text-red-600">{errors.employee_id.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
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
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                {...register('phone')}
                className={errors.phone ? 'border-red-500' : ''}
              />
              {errors.phone && (
                <p className="text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select onValueChange={(value) => setValue('gender', value as any)}>
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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="qualification">Qualification</Label>
              <Input
                id="qualification"
                {...register('qualification')}
                className={errors.qualification ? 'border-red-500' : ''}
              />
              {errors.qualification && (
                <p className="text-sm text-red-600">{errors.qualification.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience_years">Experience (Years)</Label>
              <Input
                id="experience_years"
                type="number"
                {...register('experience_years', { valueAsNumber: true })}
                className={errors.experience_years ? 'border-red-500' : ''}
              />
              {errors.experience_years && (
                <p className="text-sm text-red-600">{errors.experience_years.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="hire_date">Hire Date</Label>
            <Input
              id="hire_date"
              type="date"
              {...register('hire_date')}
              className={errors.hire_date ? 'border-red-500' : ''}
            />
            {errors.hire_date && (
              <p className="text-sm text-red-600">{errors.hire_date.message}</p>
            )}
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
                'Add Teacher'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
