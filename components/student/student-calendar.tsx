"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, CalendarIcon, GraduationCap, FileText, Award, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock calendar events data
const events = {
  "2025-05-01": [{ id: 1, title: "Math Quiz", type: "quiz", time: "9:30 AM" }],
  "2025-05-05": [{ id: 2, title: "English Essay Due", type: "assignment", time: "11:59 PM" }],
  "2025-05-08": [{ id: 3, title: "Science Project Presentation", type: "presentation", time: "1:30 PM" }],
  "2025-05-10": [{ id: 4, title: "School Sports Day", type: "event", time: "All Day" }],
  "2025-05-15": [
    { id: 5, title: "History Exam", type: "exam", time: "10:00 AM" },
    { id: 6, title: "Computer Science Club", type: "club", time: "3:30 PM" },
  ],
  "2025-05-20": [{ id: 7, title: "Parent-Teacher Meeting", type: "meeting", time: "4:00 PM - 6:00 PM" }],
  "2025-05-25": [{ id: 8, title: "Final Project Due", type: "assignment", time: "11:59 PM" }],
  "2025-05-30": [{ id: 9, title: "End of Term Ceremony", type: "event", time: "2:00 PM" }],
}

export function StudentCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedDay, setSelectedDay] = useState<string | null>(null)

  const handleSelect = (day: Date | undefined) => {
    setDate(day)
    if (day) {
      const dateString = day.toISOString().split("T")[0]
      setSelectedDay(dateString)
    }
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case "quiz":
      case "exam":
        return <GraduationCap className="h-4 w-4" />
      case "assignment":
        return <FileText className="h-4 w-4" />
      case "presentation":
        return <BookOpen className="h-4 w-4" />
      case "event":
        return <Award className="h-4 w-4" />
      case "club":
      case "meeting":
        return <CalendarIcon className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getEventColor = (type: string) => {
    switch (type) {
      case "quiz":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
      case "exam":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
      case "assignment":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
      case "presentation":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
      case "event":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      case "club":
        return "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300"
      case "meeting":
        return "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300"
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300"
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-7 md:divide-x">
      <div className="md:col-span-5">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          className="rounded-md border"
          modifiers={{
            event: (date) => {
              const dateString = date.toISOString().split("T")[0]
              return !!events[dateString as keyof typeof events]
            },
          }}
          modifiersClassNames={{
            event:
              "font-bold text-violet-600 dark:text-violet-400 relative after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:h-1 after:w-1 after:rounded-full after:bg-violet-600 dark:after:bg-violet-400",
          }}
        />
      </div>
      <div className="md:col-span-2 p-4">
        {selectedDay && events[selectedDay as keyof typeof events] ? (
          <div className="space-y-4">
            <h3 className="font-medium text-lg">
              {new Date(selectedDay).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </h3>
            <div className="space-y-3">
              {events[selectedDay as keyof typeof events].map((event) => (
                <Card key={event.id} className="overflow-hidden">
                  <CardContent className="p-3">
                    <div className="flex items-start gap-3">
                      <div className={cn("p-2 rounded-md", getEventColor(event.type))}>{getEventIcon(event.type)}</div>
                      <div className="space-y-1">
                        <h4 className="font-medium">{event.title}</h4>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          {event.time}
                        </div>
                        <Badge variant="outline" className="capitalize text-xs">
                          {event.type}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground text-sm">
              {selectedDay ? "No events scheduled for this day" : "Select a date to view events"}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
