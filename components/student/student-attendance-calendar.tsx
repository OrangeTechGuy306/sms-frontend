"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Mock attendance data
const attendanceData = {
  "2025-05-01": "present",
  "2025-05-02": "present",
  "2025-05-03": "weekend",
  "2025-05-04": "weekend",
  "2025-05-05": "present",
  "2025-05-06": "present",
  "2025-05-07": "absent",
  "2025-05-08": "present",
  "2025-05-09": "late",
  "2025-05-10": "weekend",
  "2025-05-11": "weekend",
  "2025-05-12": "present",
  "2025-05-13": "present",
  "2025-05-14": "present",
  "2025-05-15": "excused",
  "2025-05-16": "present",
  "2025-05-17": "weekend",
  "2025-05-18": "weekend",
  "2025-05-19": "present",
  "2025-05-20": "late",
  "2025-05-21": "present",
  "2025-05-22": "present",
  "2025-05-23": "present",
  "2025-05-24": "weekend",
  "2025-05-25": "weekend",
  "2025-05-26": "holiday",
  "2025-05-27": "present",
  "2025-05-28": "present",
  "2025-05-29": "present",
  "2025-05-30": "present",
  "2025-05-31": "weekend",
}

export function StudentAttendanceCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedDay, setSelectedDay] = useState<string | null>(null)

  const handleSelect = (day: Date | undefined) => {
    setDate(day)
    if (day) {
      const dateString = day.toISOString().split("T")[0]
      setSelectedDay(dateString)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-xs">Present</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-xs">Absent</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
          <span className="text-xs">Late</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="text-xs">Excused</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-purple-500"></div>
          <span className="text-xs">Holiday</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 md:divide-x">
        <div className="md:col-span-5">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            className="rounded-md border"
            modifiers={{
              present: (date) => {
                const dateString = date.toISOString().split("T")[0]
                return attendanceData[dateString as keyof typeof attendanceData] === "present"
              },
              absent: (date) => {
                const dateString = date.toISOString().split("T")[0]
                return attendanceData[dateString as keyof typeof attendanceData] === "absent"
              },
              late: (date) => {
                const dateString = date.toISOString().split("T")[0]
                return attendanceData[dateString as keyof typeof attendanceData] === "late"
              },
              excused: (date) => {
                const dateString = date.toISOString().split("T")[0]
                return attendanceData[dateString as keyof typeof attendanceData] === "excused"
              },
              holiday: (date) => {
                const dateString = date.toISOString().split("T")[0]
                return attendanceData[dateString as keyof typeof attendanceData] === "holiday"
              },
            }}
            modifiersClassNames={{
              present: "bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-100",
              absent: "bg-red-100 text-red-900 dark:bg-red-900 dark:text-red-100",
              late: "bg-amber-100 text-amber-900 dark:bg-amber-900 dark:text-amber-100",
              excused: "bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100",
              holiday: "bg-purple-100 text-purple-900 dark:bg-purple-900 dark:text-purple-100",
            }}
          />
        </div>
        <div className="md:col-span-2 p-4">
          {selectedDay && attendanceData[selectedDay as keyof typeof attendanceData] ? (
            <div className="space-y-4">
              <h3 className="font-medium text-lg">
                {new Date(selectedDay).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h3>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Status:</span>
                  <Badge
                    className={cn(
                      "capitalize",
                      attendanceData[selectedDay as keyof typeof attendanceData] === "present" && "bg-green-500",
                      attendanceData[selectedDay as keyof typeof attendanceData] === "absent" && "bg-red-500",
                      attendanceData[selectedDay as keyof typeof attendanceData] === "late" && "bg-amber-500",
                      attendanceData[selectedDay as keyof typeof attendanceData] === "excused" && "bg-blue-500",
                      attendanceData[selectedDay as keyof typeof attendanceData] === "holiday" && "bg-purple-500",
                      attendanceData[selectedDay as keyof typeof attendanceData] === "weekend" && "bg-gray-500",
                    )}
                  >
                    {attendanceData[selectedDay as keyof typeof attendanceData]}
                  </Badge>
                </div>

                {attendanceData[selectedDay as keyof typeof attendanceData] === "late" && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Arrival Time:</span>
                    <span className="text-sm font-medium">8:15 AM (15 min late)</span>
                  </div>
                )}

                {attendanceData[selectedDay as keyof typeof attendanceData] === "excused" && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Reason:</span>
                    <span className="text-sm font-medium">Medical appointment</span>
                  </div>
                )}

                {attendanceData[selectedDay as keyof typeof attendanceData] !== "weekend" &&
                  attendanceData[selectedDay as keyof typeof attendanceData] !== "holiday" && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Classes Attended:</span>
                      <span className="text-sm font-medium">
                        {attendanceData[selectedDay as keyof typeof attendanceData] === "absent"
                          ? "0/5"
                          : attendanceData[selectedDay as keyof typeof attendanceData] === "excused"
                            ? "0/5 (Excused)"
                            : "5/5"}
                      </span>
                    </div>
                  )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground text-sm">Select a date to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
