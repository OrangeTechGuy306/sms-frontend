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

interface NewHealthRecord {
  studentId: string
  studentName: string
  recordType: string
  date: string
  height: string
  weight: string
  bloodPressure: string
  temperature: string
  symptoms: string
  diagnosis: string
  treatment: string
  medications: string
  doctorName: string
  followUpDate: string
  notes: string
  status: string
}

interface AddHealthRecordModalProps {
  onAdd?: (newRecord: NewHealthRecord) => void
  trigger?: React.ReactNode
}

export function AddHealthRecordModal({ onAdd, trigger }: AddHealthRecordModalProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<NewHealthRecord>({
    studentId: "",
    studentName: "",
    recordType: "",
    date: new Date().toISOString().split('T')[0],
    height: "",
    weight: "",
    bloodPressure: "",
    temperature: "",
    symptoms: "",
    diagnosis: "",
    treatment: "",
    medications: "",
    doctorName: "",
    followUpDate: "",
    notes: "",
    status: "Active",
  })

  const handleChange = (field: keyof NewHealthRecord, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      onAdd?.(formData)
      setOpen(false)
      // Reset form
      setFormData({
        studentId: "",
        studentName: "",
        recordType: "",
        date: new Date().toISOString().split('T')[0],
        height: "",
        weight: "",
        bloodPressure: "",
        temperature: "",
        symptoms: "",
        diagnosis: "",
        treatment: "",
        medications: "",
        doctorName: "",
        followUpDate: "",
        notes: "",
        status: "Active",
      })
    } catch (error) {
      console.error("Error adding health record:", error)
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
            Add Health Record
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Health Record</DialogTitle>
          <DialogDescription>Create a new health record for a student.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="vitals">Vitals & Symptoms</TabsTrigger>
              <TabsTrigger value="medical">Medical Details</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="studentId">Student ID *</Label>
                  <Input
                    id="studentId"
                    value={formData.studentId}
                    onChange={(e) => handleChange("studentId", e.target.value)}
                    placeholder="e.g., STU001"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="studentName">Student Name *</Label>
                  <Input
                    id="studentName"
                    value={formData.studentName}
                    onChange={(e) => handleChange("studentName", e.target.value)}
                    placeholder="Enter student name"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="recordType">Record Type *</Label>
                  <Select value={formData.recordType} onValueChange={(value) => handleChange("recordType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select record type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Routine Checkup">Routine Checkup</SelectItem>
                      <SelectItem value="Illness">Illness</SelectItem>
                      <SelectItem value="Injury">Injury</SelectItem>
                      <SelectItem value="Vaccination">Vaccination</SelectItem>
                      <SelectItem value="Emergency">Emergency</SelectItem>
                      <SelectItem value="Follow-up">Follow-up</SelectItem>
                      <SelectItem value="Physical Exam">Physical Exam</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleChange("date", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="doctorName">Doctor/Nurse Name</Label>
                <Input
                  id="doctorName"
                  value={formData.doctorName}
                  onChange={(e) => handleChange("doctorName", e.target.value)}
                  placeholder="Healthcare provider name"
                />
              </div>
            </TabsContent>

            <TabsContent value="vitals" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={formData.height}
                    onChange={(e) => handleChange("height", e.target.value)}
                    placeholder="e.g., 150"
                    step="0.1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={formData.weight}
                    onChange={(e) => handleChange("weight", e.target.value)}
                    placeholder="e.g., 45.5"
                    step="0.1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bloodPressure">Blood Pressure</Label>
                  <Input
                    id="bloodPressure"
                    value={formData.bloodPressure}
                    onChange={(e) => handleChange("bloodPressure", e.target.value)}
                    placeholder="e.g., 120/80"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="temperature">Temperature (°C)</Label>
                  <Input
                    id="temperature"
                    type="number"
                    value={formData.temperature}
                    onChange={(e) => handleChange("temperature", e.target.value)}
                    placeholder="e.g., 36.5"
                    step="0.1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="symptoms">Symptoms</Label>
                <Textarea
                  id="symptoms"
                  value={formData.symptoms}
                  onChange={(e) => handleChange("symptoms", e.target.value)}
                  placeholder="Describe any symptoms..."
                  rows={3}
                />
              </div>
            </TabsContent>

            <TabsContent value="medical" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="diagnosis">Diagnosis</Label>
                <Textarea
                  id="diagnosis"
                  value={formData.diagnosis}
                  onChange={(e) => handleChange("diagnosis", e.target.value)}
                  placeholder="Medical diagnosis..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="treatment">Treatment</Label>
                <Textarea
                  id="treatment"
                  value={formData.treatment}
                  onChange={(e) => handleChange("treatment", e.target.value)}
                  placeholder="Treatment provided..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="medications">Medications</Label>
                <Textarea
                  id="medications"
                  value={formData.medications}
                  onChange={(e) => handleChange("medications", e.target.value)}
                  placeholder="Medications prescribed..."
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="followUpDate">Follow-up Date</Label>
                  <Input
                    id="followUpDate"
                    type="date"
                    value={formData.followUpDate}
                    onChange={(e) => handleChange("followUpDate", e.target.value)}
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
                      <SelectItem value="Resolved">Resolved</SelectItem>
                      <SelectItem value="Ongoing">Ongoing</SelectItem>
                      <SelectItem value="Follow-up Required">Follow-up Required</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                  placeholder="Any additional notes..."
                  rows={3}
                />
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Record"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
