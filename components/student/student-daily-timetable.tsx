"use client"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Mock timetable data - same as weekly but organized differently for display
const dailyTimetableData = {
  "2025-05-01": [
    {
      id: 21,
      subject: "Computer Science",
      time: "8:00 AM - 9:30 AM",
      room: "Computer Lab",
      teacher: "Mr. Anderson",
      color: "bg-cyan-100 border-cyan-300 dark:bg-cyan-900/30 dark:border-cyan-700",
    },
    {
      id: 22,
      subject: "Mathematics",
      time: "9:45 AM - 11:15 AM",
      room: "Room 101",
      teacher: "Mr. Johnson",
      color: "bg-blue-100 border-blue-300 dark:bg-blue-900/30 dark:border-blue-700",
    },
    {
      id: 23,
      subject: "Lunch Break",
      time: "11:15 AM - 12:00 PM",
      room: "Cafeteria",
      teacher: "",
      color: "bg-slate-100 border-slate-300 dark:bg-slate-800 dark:border-slate-700",
    },
    {
      id: 24,
      subject: "Biology",
      time: "12:00 PM - 1:30 PM",
      room: "Lab 1",
      teacher: "Dr. Martinez",
      color: "bg-emerald-100 border-emerald-300 dark:bg-emerald-900/30 dark:border-emerald-700",
    },
    {
      id: 25,
      subject: "Physical Education",
      time: "1:45 PM - 3:15 PM",
      room: "Gymnasium",
      teacher: "Coach Thompson",
      color: "bg-orange-100 border-orange-300 dark:bg-orange-900/30 dark:border-orange-700",
    },
  ],
  "2025-05-02": [
    {
      id: 1,
      subject: "Mathematics",
      time: "8:00 AM - 9:30 AM",
      room: "Room 101",
      teacher: "Mr. Johnson",
      color: "bg-blue-100 border-blue-300 dark:bg-blue-900/30 dark:border-blue-700",
    },
    {
      id: 2,
      subject: "English Literature",
      time: "9:45 AM - 11:15 AM",
      room: "Room 203",
      teacher: "Mrs. Smith",
      color: "bg-green-100 border-green-300 dark:bg-green-900/30 dark:border-green-700",
    },
    {
      id: 3,
      subject: "Lunch Break",
      time: "11:15 AM - 12:00 PM",
      room: "Cafeteria",
      teacher: "",
      color: "bg-slate-100 border-slate-300 dark:bg-slate-800 dark:border-slate-700",
    },
    {
      id: 4,
      subject: "Physics",
      time: "12:00 PM - 1:30 PM",
      room: "Lab 3",
      teacher: "Dr. Richards",
      color: "bg-purple-100 border-purple-300 dark:bg-purple-900/30 dark:border-purple-700",
    },
    {
      id: 5,
      subject: "History",
      time: "1:45 PM - 3:15 PM",
      room: "Room 105",
      teacher: "Mr. Davis",
      color: "bg-amber-100 border-amber-300 dark:bg-amber-900/30 dark:border-amber-700",
    },
  ],
  "2025-05-05": [
    {
      id: 1,
      subject: "Mathematics",
      time: "8:00 AM - 9:30 AM",
      room: "Room 101",
      teacher: "Mr. Johnson",
      color: "bg-blue-100 border-blue-300 dark:bg-blue-900/30 dark:border-blue-700",
    },
    {
      id: 2,
      subject: "English Literature",
      time: "9:45 AM - 11:15 AM",
      room: "Room 203",
      teacher: "Mrs. Smith",
      color: "bg-green-100 border-green-300 dark:bg-green-900/30 dark:border-green-700",
    },
    {
      id: 3,
      subject: "Lunch Break",
      time: "11:15 AM - 12:00 PM",
      room: "Cafeteria",
      teacher: "",
      color: "bg-slate-100 border-slate-300 dark:bg-slate-800 dark:border-slate-700",
    },
    {
      id: 4,
      subject: "Physics",
      time: "12:00 PM - 1:30 PM",
      room: "Lab 3",
      teacher: "Dr. Richards",
      color: "bg-purple-100 border-purple-300 dark:bg-purple-900/30 dark:border-purple-700",
    },
    {
      id: 5,
      subject: "History",
      time: "1:45 PM - 3:15 PM",
      room: "Room 105",
      teacher: "Mr. Davis",
      color: "bg-amber-100 border-amber-300 dark:bg-amber-900/30 dark:border-amber-700",
    },
  ],
}

export function StudentDailyTimetable() {
  const [date, setDate] = useState<Date>(new Date())
  const formattedDate = format(date, "yyyy-MM-dd")
  const dayOfWeek = format(date, "EEEE")
  const isWeekend = dayOfWeek === "Saturday" || dayOfWeek === "Sunday"

  const scheduleForDay = dailyTimetableData[formattedDate as keyof typeof dailyTimetableData] || []

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant={"outline"} className={cn("w-[240px] justify-start text-left font-normal")}>
              <CalendarIcon className="mr-2 h-4 w-4" />
              {format(date, "PPP")}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="single" selected={date} onSelect={(newDate) => newDate && setDate(newDate)} initialFocus />
          </PopoverContent>
        </Popover>
      </div>

      {isWeekend ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h3 className="text-xl font-medium mb-2">No Classes Today</h3>
          <p className="text-muted-foreground">Enjoy your {dayOfWeek}!</p>
        </div>
      ) : scheduleForDay.length > 0 ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 max-w-3xl mx-auto">
            {scheduleForDay.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "p-4 rounded-md border flex flex-col md:flex-row md:items-center md:justify-between",
                  item.color,
                )}
              >
                <div className="space-y-1">
                  <div className="font-medium">{item.subject}</div>
                  {item.teacher && <div className="text-sm">{item.teacher}</div>}
                  <div className="text-sm">{item.room}</div>
                </div>
                <div className="mt-2 md:mt-0 text-sm font-medium">{item.time}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="text-6xl mb-4">📅</div>
          <h3 className="text-xl font-medium mb-2">No Schedule Available</h3>
          <p className="text-muted-foreground">No classes are scheduled for this date</p>
        </div>
      )}
    </div>
  )
}
