"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export default function ApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsSubmitting(false)
    alert("Application submitted successfully! We'll contact you within 2-3 business days.")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Student Information */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">Student Information</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <Label htmlFor="studentFirstName">Student First Name</Label>
            <Input id="studentFirstName" name="studentFirstName" type="text" required className="mt-1" />
          </div>
          <div>
            <Label htmlFor="studentLastName">Student Last Name</Label>
            <Input id="studentLastName" name="studentLastName" type="text" required className="mt-1" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input id="dateOfBirth" name="dateOfBirth" type="date" required className="mt-1" />
          </div>
          <div>
            <Label htmlFor="grade">Grade Applying For</Label>
            <Select name="grade" required>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="k">Kindergarten</SelectItem>
                <SelectItem value="1">1st Grade</SelectItem>
                <SelectItem value="2">2nd Grade</SelectItem>
                <SelectItem value="3">3rd Grade</SelectItem>
                <SelectItem value="4">4th Grade</SelectItem>
                <SelectItem value="5">5th Grade</SelectItem>
                <SelectItem value="6">6th Grade</SelectItem>
                <SelectItem value="7">7th Grade</SelectItem>
                <SelectItem value="8">8th Grade</SelectItem>
                <SelectItem value="9">9th Grade</SelectItem>
                <SelectItem value="10">10th Grade</SelectItem>
                <SelectItem value="11">11th Grade</SelectItem>
                <SelectItem value="12">12th Grade</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Parent/Guardian Information */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">Parent/Guardian Information</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <Label htmlFor="parentFirstName">Parent/Guardian First Name</Label>
            <Input id="parentFirstName" name="parentFirstName" type="text" required className="mt-1" />
          </div>
          <div>
            <Label htmlFor="parentLastName">Parent/Guardian Last Name</Label>
            <Input id="parentLastName" name="parentLastName" type="text" required className="mt-1" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" name="email" type="email" required className="mt-1" />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" name="phone" type="tel" required className="mt-1" />
          </div>
        </div>

        <div>
          <Label htmlFor="address">Home Address</Label>
          <Textarea id="address" name="address" rows={3} required className="mt-1" />
        </div>
      </div>

      {/* Academic Information */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">Academic Information</h3>
        <div>
          <Label htmlFor="currentSchool">Current School (if applicable)</Label>
          <Input id="currentSchool" name="currentSchool" type="text" className="mt-1" />
        </div>

        <div>
          <Label htmlFor="academicInterests">Academic Interests & Goals</Label>
          <Textarea
            id="academicInterests"
            name="academicInterests"
            rows={4}
            className="mt-1"
            placeholder="Tell us about your child's academic interests, goals, and any special talents..."
          />
        </div>
      </div>

      {/* Additional Information */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">Additional Information</h3>
        <div>
          <Label htmlFor="whyApplying">Why are you interested in Brightfuture Academy?</Label>
          <Textarea
            id="whyApplying"
            name="whyApplying"
            rows={4}
            required
            className="mt-1"
            placeholder="Please share what attracts you to our school and how we can support your child's educational journey..."
          />
        </div>

        <div>
          <Label htmlFor="specialNeeds">Special Needs or Accommodations</Label>
          <Textarea
            id="specialNeeds"
            name="specialNeeds"
            rows={3}
            className="mt-1"
            placeholder="Please describe any special needs, learning differences, or accommodations your child may require..."
          />
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" required />
          <Label htmlFor="terms" className="text-sm">
            I agree to the terms and conditions and privacy policy
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="newsletter" />
          <Label htmlFor="newsletter" className="text-sm">
            I would like to receive updates and newsletters from Brightfuture Academy
          </Label>
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full bg-violet-600 hover:bg-violet-700">
        {isSubmitting ? "Submitting Application..." : "Submit Application"}
      </Button>
    </form>
  )
}
