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
import { Plus } from "lucide-react"

interface NewVehicle {
  vehicleNumber: string
  vehicleType: string
  model: string
  capacity: string
  driverName: string
  driverPhone: string
  driverLicense: string
  route: string
  status: string
  registrationDate: string
  insuranceExpiry: string
  lastMaintenance: string
  nextMaintenance: string
  fuelType: string
  notes: string
}

interface AddVehicleModalProps {
  onAdd?: (newVehicle: NewVehicle) => void
  trigger?: React.ReactNode
}

export function AddVehicleModal({ onAdd, trigger }: AddVehicleModalProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<NewVehicle>({
    vehicleNumber: "",
    vehicleType: "",
    model: "",
    capacity: "",
    driverName: "",
    driverPhone: "",
    driverLicense: "",
    route: "",
    status: "Active",
    registrationDate: "",
    insuranceExpiry: "",
    lastMaintenance: "",
    nextMaintenance: "",
    fuelType: "",
    notes: "",
  })

  const handleChange = (field: keyof NewVehicle, value: string) => {
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
        vehicleNumber: "",
        vehicleType: "",
        model: "",
        capacity: "",
        driverName: "",
        driverPhone: "",
        driverLicense: "",
        route: "",
        status: "Active",
        registrationDate: "",
        insuranceExpiry: "",
        lastMaintenance: "",
        nextMaintenance: "",
        fuelType: "",
        notes: "",
      })
    } catch (error) {
      console.error("Error adding vehicle:", error)
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
            Add Vehicle
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Vehicle</DialogTitle>
          <DialogDescription>Register a new vehicle for school transportation.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="vehicleNumber">Vehicle Number *</Label>
              <Input
                id="vehicleNumber"
                value={formData.vehicleNumber}
                onChange={(e) => handleChange("vehicleNumber", e.target.value)}
                placeholder="e.g., ABC-123"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vehicleType">Vehicle Type *</Label>
              <Select value={formData.vehicleType} onValueChange={(value) => handleChange("vehicleType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="School Bus">School Bus</SelectItem>
                  <SelectItem value="Mini Bus">Mini Bus</SelectItem>
                  <SelectItem value="Van">Van</SelectItem>
                  <SelectItem value="Car">Car</SelectItem>
                  <SelectItem value="Truck">Truck</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="model">Model</Label>
              <Input
                id="model"
                value={formData.model}
                onChange={(e) => handleChange("model", e.target.value)}
                placeholder="Vehicle model"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="capacity">Capacity *</Label>
              <Input
                id="capacity"
                type="number"
                value={formData.capacity}
                onChange={(e) => handleChange("capacity", e.target.value)}
                placeholder="Number of passengers"
                min="1"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="driverName">Driver Name *</Label>
              <Input
                id="driverName"
                value={formData.driverName}
                onChange={(e) => handleChange("driverName", e.target.value)}
                placeholder="Driver's full name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="driverPhone">Driver Phone *</Label>
              <Input
                id="driverPhone"
                value={formData.driverPhone}
                onChange={(e) => handleChange("driverPhone", e.target.value)}
                placeholder="Driver's phone number"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="driverLicense">Driver License</Label>
              <Input
                id="driverLicense"
                value={formData.driverLicense}
                onChange={(e) => handleChange("driverLicense", e.target.value)}
                placeholder="License number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fuelType">Fuel Type</Label>
              <Select value={formData.fuelType} onValueChange={(value) => handleChange("fuelType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select fuel type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Petrol">Petrol</SelectItem>
                  <SelectItem value="Diesel">Diesel</SelectItem>
                  <SelectItem value="CNG">CNG</SelectItem>
                  <SelectItem value="Electric">Electric</SelectItem>
                  <SelectItem value="Hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="route">Route</Label>
            <Input
              id="route"
              value={formData.route}
              onChange={(e) => handleChange("route", e.target.value)}
              placeholder="e.g., Route A - Downtown to School"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="registrationDate">Registration Date</Label>
              <Input
                id="registrationDate"
                type="date"
                value={formData.registrationDate}
                onChange={(e) => handleChange("registrationDate", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="insuranceExpiry">Insurance Expiry</Label>
              <Input
                id="insuranceExpiry"
                type="date"
                value={formData.insuranceExpiry}
                onChange={(e) => handleChange("insuranceExpiry", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="lastMaintenance">Last Maintenance</Label>
              <Input
                id="lastMaintenance"
                type="date"
                value={formData.lastMaintenance}
                onChange={(e) => handleChange("lastMaintenance", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nextMaintenance">Next Maintenance</Label>
              <Input
                id="nextMaintenance"
                type="date"
                value={formData.nextMaintenance}
                onChange={(e) => handleChange("nextMaintenance", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Under Maintenance">Under Maintenance</SelectItem>
                <SelectItem value="Out of Service">Out of Service</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              placeholder="Additional notes about the vehicle..."
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Vehicle"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
