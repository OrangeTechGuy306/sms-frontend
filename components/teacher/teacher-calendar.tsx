"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"

export function TeacherCalendar() {
  const [currentMonth] = useState("May")
  const [currentYear] = useState(2023)

  // Mock data for calendar events
  const events = [
    { date: 1, title: "Class 9A", type: "class" },
    { date: 1, title: "Staff Meeting", type: "meeting" },
    { date: 3, title: "Class 10B", type: "class" },
    { date: 5, title: "Class 11C", type: "class" },
    { date: 8, title: "Class 9A", type: "class" },
    { date: 10, title: "Class 10B", type: "class" },
    { date: 10, title: "Parent Meeting", type: "event" },
    { date: 12, title: "Class 11C", type: "class" },
    { date: 15, title: "Class 9A", type: "class" },
    { date: 15, title: "Department Meeting", type: "meeting" },
    { date: 17, title: "Class 10B", type: "class" },
    { date: 19, title: "Class 11C", type: "class" },
    { date: 22, title: "Class 9A", type: "class" },
    { date: 24, title: "Class 10B", type: "class" },
    { date: 26, title: "Class 11C", type: "class" },
    { date: 29, title: "Class 9A", type: "class" },
    { date: 29, title: "School Event", type: "event" },
    { date: 31, title: "Class 10B", type: "class" },
  ]

  // Generate calendar days
  const daysInMonth = 31 // May has 31 days
  const firstDayOfMonth = 1 // Monday (0 is Sunday, 1 is Monday, etc.)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  // Add empty cells for days before the first day of the month
  const emptyCells = Array.from({ length: firstDayOfMonth }, (_, i) => null)
  const allCells = [...emptyCells, ...days]

  // Day names
  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  return (
    <div className="w-full">
      <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium">
        {dayNames.map((day) => (
          <div key={day} className="py-2">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 text-sm">
        {allCells.map((day, index) => {
          const dayEvents = events.filter((event) => event.date === day)
          const isToday = day === 3 // Assuming today is the 3rd

          return (
            <div
              key={index}
              className={`min-h-[100px] rounded-md border p-1 ${
                day === null ? "bg-muted/50" : isToday ? "border-primary bg-primary/10" : ""
              }`}
            >
              {day !== null && (
                <>
                  <div className={`text-right ${isToday ? "font-bold" : ""}`}>{day}</div>
                  <div className="mt-1 space-y-1">
                    {dayEvents.map((event, eventIndex) => (
                      <div
                        key={eventIndex}
                        className={`rounded-sm px-1 py-0.5 text-xs ${
                          event.type === "class"
                            ? "bg-primary/20 text-primary"
                            : event.type === "meeting"
                              ? "bg-secondary/20 text-secondary-foreground"
                              : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {event.title}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>
      <div className="mt-4 flex items-center gap-4">
        <div className="text-sm">Legend:</div>
        <div className="flex items-center gap-2">
          <Badge variant="default" className="bg-primary/20 text-primary hover:bg-primary/30">
            Class
          </Badge>
          <Badge variant="secondary" className="bg-secondary/20 hover:bg-secondary/30">
            Meeting
          </Badge>
          <Badge variant="outline">Event</Badge>
        </div>
      </div>
    </div>
  )
}
