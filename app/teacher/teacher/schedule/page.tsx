"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, FileText } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function TeacherSchedulePage() {
  const [selectedWeek, setSelectedWeek] = useState("current")

  // Mock schedule data
  const weeklySchedule = {
    Monday: [
      { time: "08:00 - 09:30", class: "Grade 10A", subject: "Mathematics", room: "Room 101" },
      { time: "11:00 - 12:30", class: "Grade 11B", subject: "Mathematics", room: "Room 203" },
    ],
    Tuesday: [
      { time: "09:30 - 11:00", class: "Grade 9B", subject: "Mathematics", room: "Room 105" },
      { time: "13:00 - 14:30", class: "Office Hours", subject: "Student Consultation", room: "Staff Room" },
    ],
    Wednesday: [
      { time: "08:00 - 09:30", class: "Grade 12A", subject: "Mathematics", room: "Room 301" },
      { time: "13:00 - 14:30", class: "Department Meeting", subject: "Curriculum Planning", room: "Conference Room" },
    ],
    Thursday: [
      { time: "08:00 - 09:30", class: "Grade 11A", subject: "Mathematics", room: "Room 202" },
      { time: "11:00 - 12:30", class: "Grade 10B", subject: "Mathematics", room: "Room 102" },
    ],
    Friday: [
      { time: "09:30 - 11:00", class: "Office Hours", subject: "Student Consultation", room: "Staff Room" },
      { time: "13:00 - 14:30", class: "Grade 9A", subject: "Mathematics", room: "Room 104" },
    ],
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">My Schedule</h2>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            View Calendar
          </Button>
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Print Schedule
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Teaching Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">Hours per week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Classes</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Sessions per week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Office Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Hours per week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meetings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Hours per week</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Weekly Schedule</CardTitle>
              <CardDescription>Your teaching and office hours schedule</CardDescription>
            </div>
            <Select value={selectedWeek} onValueChange={setSelectedWeek}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Week" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="previous">Previous Week</SelectItem>
                <SelectItem value="current">Current Week</SelectItem>
                <SelectItem value="next">Next Week</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.entries(weeklySchedule).map(([day, schedule]) => (
              <div key={day}>
                <h3 className="mb-2 font-medium">{day}</h3>
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="p-2 text-left">Time</th>
                        <th className="p-2 text-left">Class</th>
                        <th className="p-2 text-left">Subject</th>
                        <th className="p-2 text-left">Room</th>
                      </tr>
                    </thead>
                    <tbody>
                      {schedule.map((item, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-2">{item.time}</td>
                          <td className="p-2">
                            {item.class === "Office Hours" || item.class === "Department Meeting" ? (
                              <Badge variant="outline">{item.class}</Badge>
                            ) : (
                              item.class
                            )}
                          </td>
                          <td className="p-2">{item.subject}</td>
                          <td className="p-2">{item.room}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
