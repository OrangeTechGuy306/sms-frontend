"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Mock attendance history data
const attendanceHistory = [
  {
    id: 1,
    date: "May 30, 2025",
    day: "Friday",
    status: "present",
    checkInTime: "7:55 AM",
    checkOutTime: "3:30 PM",
    classes: "5/5",
    notes: "",
  },
  {
    id: 2,
    date: "May 29, 2025",
    day: "Thursday",
    status: "present",
    checkInTime: "7:50 AM",
    checkOutTime: "3:30 PM",
    classes: "5/5",
    notes: "",
  },
  {
    id: 3,
    date: "May 28, 2025",
    day: "Wednesday",
    status: "present",
    checkInTime: "7:52 AM",
    checkOutTime: "3:30 PM",
    classes: "5/5",
    notes: "",
  },
  {
    id: 4,
    date: "May 27, 2025",
    day: "Tuesday",
    status: "present",
    checkInTime: "7:48 AM",
    checkOutTime: "3:30 PM",
    classes: "5/5",
    notes: "",
  },
  {
    id: 5,
    date: "May 26, 2025",
    day: "Monday",
    status: "holiday",
    checkInTime: "-",
    checkOutTime: "-",
    classes: "-",
    notes: "Memorial Day",
  },
  {
    id: 6,
    date: "May 23, 2025",
    day: "Friday",
    status: "present",
    checkInTime: "7:53 AM",
    checkOutTime: "3:30 PM",
    classes: "5/5",
    notes: "",
  },
  {
    id: 7,
    date: "May 22, 2025",
    day: "Thursday",
    status: "present",
    checkInTime: "7:55 AM",
    checkOutTime: "3:30 PM",
    classes: "5/5",
    notes: "",
  },
  {
    id: 8,
    date: "May 21, 2025",
    day: "Wednesday",
    status: "present",
    checkInTime: "7:50 AM",
    checkOutTime: "3:30 PM",
    classes: "5/5",
    notes: "",
  },
  {
    id: 9,
    date: "May 20, 2025",
    day: "Tuesday",
    status: "late",
    checkInTime: "8:15 AM",
    checkOutTime: "3:30 PM",
    classes: "5/5",
    notes: "Traffic delay",
  },
  {
    id: 10,
    date: "May 19, 2025",
    day: "Monday",
    status: "present",
    checkInTime: "7:52 AM",
    checkOutTime: "3:30 PM",
    classes: "5/5",
    notes: "",
  },
]

export function StudentAttendanceHistory() {
  const [month, setMonth] = useState("may")

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-sm">Filter by month:</span>
          <Select value={month} onValueChange={setMonth}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="january">January</SelectItem>
              <SelectItem value="february">February</SelectItem>
              <SelectItem value="march">March</SelectItem>
              <SelectItem value="april">April</SelectItem>
              <SelectItem value="may">May</SelectItem>
              <SelectItem value="june">June</SelectItem>
              <SelectItem value="july">July</SelectItem>
              <SelectItem value="august">August</SelectItem>
              <SelectItem value="september">September</SelectItem>
              <SelectItem value="october">October</SelectItem>
              <SelectItem value="november">November</SelectItem>
              <SelectItem value="december">December</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Day</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Check In</TableHead>
              <TableHead>Check Out</TableHead>
              <TableHead>Classes Attended</TableHead>
              <TableHead>Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendanceHistory.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.date}</TableCell>
                <TableCell>{record.day}</TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      "capitalize",
                      record.status === "present" && "bg-green-500",
                      record.status === "absent" && "bg-red-500",
                      record.status === "late" && "bg-amber-500",
                      record.status === "excused" && "bg-blue-500",
                      record.status === "holiday" && "bg-purple-500",
                    )}
                  >
                    {record.status}
                  </Badge>
                </TableCell>
                <TableCell>{record.checkInTime}</TableCell>
                <TableCell>{record.checkOutTime}</TableCell>
                <TableCell>{record.classes}</TableCell>
                <TableCell>{record.notes || "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
