"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    alert("Thank you for your message! We'll get back to you soon.")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" name="firstName" type="text" required className="mt-1" />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" name="lastName" type="text" required className="mt-1" />
        </div>
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required className="mt-1" />
      </div>

      <div>
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" name="phone" type="tel" className="mt-1" />
      </div>

      <div>
        <Label htmlFor="subject">Subject</Label>
        <Select name="subject" required>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select a subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admissions">Admissions Inquiry</SelectItem>
            <SelectItem value="academics">Academic Programs</SelectItem>
            <SelectItem value="visit">Schedule a Visit</SelectItem>
            <SelectItem value="general">General Information</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          rows={4}
          required
          className="mt-1"
          placeholder="Please tell us how we can help you..."
        />
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full bg-violet-600 hover:bg-violet-700">
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  )
}
