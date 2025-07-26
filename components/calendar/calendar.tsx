"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Sample events data
const events = [
  { id: 1, name: "Annual Sports Day", date: "2023-10-15", type: "sports" },
  { id: 2, name: "Science Fair", date: "2023-11-05", type: "academic" },
  { id: 3, name: "Parent-Teacher Conference", date: "2023-11-20", type: "meeting" },
  { id: 4, name: "Cultural Festival", date: "2023-12-10", type: "cultural" },
  { id: 5, name: "Mid-Term Exams Begin", date: "2023-10-25", type: "exam" },
  { id: 6, name: "Mid-Term Exams End", date: "2023-11-02", type: "exam" },
  { id: 7, name: "Teacher Development Day", date: "2023-11-15", type: "holiday" },
  { id: 8, name: "Winter Break Begins", date: "2023-12-20", type: "holiday" },
]

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())

  const getMonthData = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()

    // First day of the month
    const firstDay = new Date(year, month, 1)
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0)

    // Day of the week for the first day (0 = Sunday, 6 = Saturday)
    const firstDayOfWeek = firstDay.getDay()

    // Total days in the month
    const daysInMonth = lastDay.getDate()

    // Create array for all days to display
    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }

    return days
  }

  const days = getMonthData(currentDate)

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const getEventsForDate = (date: Date) => {
    if (!date) return []

    const dateString = date.toISOString().split("T")[0]
    return events.filter((event) => event.date === dateString)
  }

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "sports":
        return "bg-green-500"
      case "academic":
        return "bg-blue-500"
      case "meeting":
        return "bg-yellow-500"
      case "cultural":
        return "bg-purple-500"
      case "exam":
        return "bg-red-500"
      case "holiday":
        return "bg-gray-500"
      default:
        return "bg-gray-300"
    }
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">
          {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, i) => (
          <div key={i} className="text-center font-medium py-2">
            {day}
          </div>
        ))}

        {days.map((day, i) => {
          const dayEvents = day ? getEventsForDate(day) : []

          return (
            <div
              key={i}
              className={cn(
                "min-h-[100px] p-2 border rounded-md",
                day ? "bg-card" : "bg-muted/20",
                day &&
                  day.getDate() === new Date().getDate() &&
                  day.getMonth() === new Date().getMonth() &&
                  day.getFullYear() === new Date().getFullYear() &&
                  "border-primary",
              )}
            >
              {day && (
                <>
                  <div className="text-right font-medium">{day.getDate()}</div>
                  <div className="mt-1 space-y-1">
                    {dayEvents.map((event) => (
                      <div key={event.id} className="text-xs">
                        <div className="flex items-center gap-1">
                          <div className={cn("w-2 h-2 rounded-full", getEventTypeColor(event.type))}></div>
                          <span className="truncate">{event.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
