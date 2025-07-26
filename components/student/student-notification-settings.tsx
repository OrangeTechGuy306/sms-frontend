"use client"

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"

export function StudentNotificationSettings() {
  const [settings, setSettings] = useState({
    email: {
      assignments: true,
      grades: true,
      attendance: true,
      messages: true,
      events: false,
      announcements: true,
    },
    push: {
      assignments: true,
      grades: true,
      attendance: false,
      messages: true,
      events: true,
      announcements: false,
    },
    frequency: "immediate",
  })

  const handleToggle = (category: string, type: "email" | "push") => {
    setSettings({
      ...settings,
      [type]: {
        ...settings[type],
        [category]: !settings[type][category as keyof typeof settings.email],
      },
    })
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-assignments" className="flex-1">
                  Assignment notifications
                </Label>
                <Switch
                  id="email-assignments"
                  checked={settings.email.assignments}
                  onCheckedChange={() => handleToggle("assignments", "email")}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="email-grades" className="flex-1">
                  Grade updates
                </Label>
                <Switch
                  id="email-grades"
                  checked={settings.email.grades}
                  onCheckedChange={() => handleToggle("grades", "email")}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="email-attendance" className="flex-1">
                  Attendance alerts
                </Label>
                <Switch
                  id="email-attendance"
                  checked={settings.email.attendance}
                  onCheckedChange={() => handleToggle("attendance", "email")}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="email-messages" className="flex-1">
                  New messages
                </Label>
                <Switch
                  id="email-messages"
                  checked={settings.email.messages}
                  onCheckedChange={() => handleToggle("messages", "email")}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="email-events" className="flex-1">
                  School events
                </Label>
                <Switch
                  id="email-events"
                  checked={settings.email.events}
                  onCheckedChange={() => handleToggle("events", "email")}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="email-announcements" className="flex-1">
                  School announcements
                </Label>
                <Switch
                  id="email-\
