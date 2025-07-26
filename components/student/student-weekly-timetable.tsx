"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

// Mock timetable data
const timetableData = {
  monday: [
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
  tuesday: [
    {
      id: 6,
      subject: "Chemistry",
      time: "8:00 AM - 9:30 AM",
      room: "Lab 2",
      teacher: "Mrs. Wilson",
      color: "bg-red-100 border-red-300 dark:bg-red-900/30 dark:border-red-700",
    },
    {
      id: 7,
      subject: "Physical Education",
      time: "9:45 AM - 11:15 AM",
      room: "Gymnasium",
      teacher: "Coach Thompson",
      color: "bg-orange-100 border-orange-300 dark:bg-orange-900/30 dark:border-orange-700",
    },
    {
      id: 8,
      subject: "Lunch Break",
      time: "11:15 AM - 12:00 PM",
      room: "Cafeteria",
      teacher: "",
      color: "bg-slate-100 border-slate-300 dark:bg-slate-800 dark:border-slate-700",
    },
    {
      id: 9,
      subject: "Computer Science",
      time: "12:00 PM - 1:30 PM",
      room: "Computer Lab",
      teacher: "Mr. Anderson",
      color: "bg-cyan-100 border-cyan-300 dark:bg-cyan-900/30 dark:border-cyan-700",
    },
    {
      id: 10,
      subject: "Art",
      time: "1:45 PM - 3:15 PM",
      room: "Art Studio",
      teacher: "Ms. Garcia",
      color: "bg-pink-100 border-pink-300 dark:bg-pink-900/30 dark:border-pink-700",
    },
  ],
  wednesday: [
    {
      id: 11,
      subject: "Mathematics",
      time: "8:00 AM - 9:30 AM",
      room: "Room 101",
      teacher: "Mr. Johnson",
      color: "bg-blue-100 border-blue-300 dark:bg-blue-900/30 dark:border-blue-700",
    },
    {
      id: 12,
      subject: "Biology",
      time: "9:45 AM - 11:15 AM",
      room: "Lab 1",
      teacher: "Dr. Martinez",
      color: "bg-emerald-100 border-emerald-300 dark:bg-emerald-900/30 dark:border-emerald-700",
    },
    {
      id: 13,
      subject: "Lunch Break",
      time: "11:15 AM - 12:00 PM",
      room: "Cafeteria",
      teacher: "",
      color: "bg-slate-100 border-slate-300 dark:bg-slate-800 dark:border-slate-700",
    },
    {
      id: 14,
      subject: "English Literature",
      time: "12:00 PM - 1:30 PM",
      room: "Room 203",
      teacher: "Mrs. Smith",
      color: "bg-green-100 border-green-300 dark:bg-green-900/30 dark:border-green-700",
    },
    {
      id: 15,
      subject: "Geography",
      time: "1:45 PM - 3:15 PM",
      room: "Room 107",
      teacher: "Ms. Brown",
      color: "bg-indigo-100 border-indigo-300 dark:bg-indigo-900/30 dark:border-indigo-700",
    },
  ],
  thursday: [
    {
      id: 16,
      subject: "Physics",
      time: "8:00 AM - 9:30 AM",
      room: "Lab 3",
      teacher: "Dr. Richards",
      color: "bg-purple-100 border-purple-300 dark:bg-purple-900/30 dark:border-purple-700",
    },
    {
      id: 17,
      subject: "History",
      time: "9:45 AM - 11:15 AM",
      room: "Room 105",
      teacher: "Mr. Davis",
      color: "bg-amber-100 border-amber-300 dark:bg-amber-900/30 dark:border-amber-700",
    },
    {
      id: 18,
      subject: "Lunch Break",
      time: "11:15 AM - 12:00 PM",
      room: "Cafeteria",
      teacher: "",
      color: "bg-slate-100 border-slate-300 dark:bg-slate-800 dark:border-slate-700",
    },
    {
      id: 19,
      subject: "Music",
      time: "12:00 PM - 1:30 PM",
      room: "Music Room",
      teacher: "Mr. Taylor",
      color: "bg-violet-100 border-violet-300 dark:bg-violet-900/30 dark:border-violet-700",
    },
    {
      id: 20,
      subject: "Chemistry",
      time: "1:45 PM - 3:15 PM",
      room: "Lab 2",
      teacher: "Mrs. Wilson",
      color: "bg-red-100 border-red-300 dark:bg-red-900/30 dark:border-red-700",
    },
  ],
  friday: [
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
}

export function StudentWeeklyTimetable() {
  const [week, setWeek] = useState("current")
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-sm">Week:</span>
          <Select value={week} onValueChange={setWeek}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select week" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="previous">Previous Week</SelectItem>
              <SelectItem value="current">Current Week</SelectItem>
              <SelectItem value="next">Next Week</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {days.map((day, index) => (
          <div key={day} className="space-y-2">
            <h3 className="text-sm font-medium text-center bg-slate-100 dark:bg-slate-800 py-2 rounded-md">{day}</h3>
            <div className="space-y-2">
              {timetableData[day.toLowerCase() as keyof typeof timetableData].map((item) => (
                <div key={item.id} className={cn("p-3 rounded-md border text-sm", item.color)}>
                  <div className="font-medium">{item.subject}</div>
                  <div className="text-xs mt-1">{item.time}</div>
                  {item.teacher && <div className="text-xs mt-1">{item.teacher}</div>}
                  <div className="text-xs mt-1">{item.room}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
