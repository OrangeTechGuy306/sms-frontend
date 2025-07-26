"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Download, Save } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

interface Student {
  id: string
  name: string
  attendance: number
  status: "present" | "absent" | "late" | "excused" | ""
}

interface Class {
  id: number
  name: string
}

export default function TeacherAttendancePage() {
  const searchParams = useSearchParams()
  const classId = searchParams.get("class")
  const { toast } = useToast()

  // Mock classes data
  const [classes] = useState<Class[]>([
    { id: 1, name: "Grade 10A" },
    { id: 2, name: "Grade 11B" },
    { id: 3, name: "Grade 9B" },
    { id: 4, name: "Grade 12A" },
    { id: 5, name: "Grade 11A" },
  ])

  const [selectedClass, setSelectedClass] = useState<string>(classId || "1")
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split("T")[0])

  // Mock students data
  const [students, setStudents] = useState<Student[]>(
    Array.from({ length: 28 }, (_, i) => ({
      id: `STU-${1000 + i}`,
      name: [
        "John Smith",
        "Emma Johnson",
        "Michael Brown",
        "Sophia Davis",
        "William Wilson",
        "Olivia Martinez",
        "James Taylor",
        "Isabella Anderson",
        "Benjamin Thomas",
        "Mia Jackson",
        "Jacob White",
        "Charlotte Harris",
        "Ethan Martin",
        "Amelia Thompson",
        "Alexander Garcia",
        "Harper Lewis",
        "Daniel Lee",
        "Evelyn Walker",
        "Matthew Hall",
        "Abigail Allen",
        "David Young",
        "Emily King",
        "Joseph Wright",
        "Elizabeth Scott",
        "Samuel Green",
        "Sofia Baker",
        "Andrew Nelson",
        "Avery Carter",
      ][i],
      attendance: Math.floor(Math.random() * 21) + 80, // 80-100%
      status: "",
    })),
  )

  const handleStatusChange = (id: string, status: "present" | "absent" | "late" | "excused") => {
    setStudents(students.map((student) => (student.id === id ? { ...student, status } : student)))
  }

  const handleMarkAllPresent = () => {
    setStudents(students.map((student) => ({ ...student, status: "present" })))
  }

  const handleSaveAttendance = () => {
    // In a real application, this would save the attendance data to a database
    toast({
      title: "Attendance Saved",
      description: `Attendance for ${classes.find((c) => c.id.toString() === selectedClass)?.name} on ${selectedDate} has been saved.`,
      variant: "success",
    })
  }

  const handleExportAttendance = () => {
    // In a real application, this would generate a CSV or Excel file
    toast({
      title: "Export Started",
      description: "Attendance data is being exported. The download will start shortly.",
      variant: "success",
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Attendance Tracking</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportAttendance}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button onClick={handleSaveAttendance}>
            <Save className="mr-2 h-4 w-4" />
            Save Attendance
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Present Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.filter((s) => s.status === "present").length}</div>
            <p className="text-xs text-muted-foreground">
              {students.filter((s) => s.status === "present").length > 0
                ? `${Math.round((students.filter((s) => s.status === "present").length / students.length) * 100)}% of class`
                : "No attendance taken yet"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Absent Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.filter((s) => s.status === "absent").length}</div>
            <p className="text-xs text-muted-foreground">
              {students.filter((s) => s.status === "absent").length > 0
                ? `${Math.round((students.filter((s) => s.status === "absent").length / students.length) * 100)}% of class`
                : "No attendance taken yet"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Late Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.filter((s) => s.status === "late").length}</div>
            <p className="text-xs text-muted-foreground">
              {students.filter((s) => s.status === "late").length > 0
                ? `${Math.round((students.filter((s) => s.status === "late").length / students.length) * 100)}% of class`
                : "No attendance taken yet"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Excused Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.filter((s) => s.status === "excused").length}</div>
            <p className="text-xs text-muted-foreground">
              {students.filter((s) => s.status === "excused").length > 0
                ? `${Math.round((students.filter((s) => s.status === "excused").length / students.length) * 100)}% of class`
                : "No attendance taken yet"}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Take Attendance</CardTitle>
          <CardDescription>Record student attendance for your class</CardDescription>
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search students..." className="pl-8" />
            </div>
            <div className="flex gap-2">
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((cls) => (
                    <SelectItem key={cls.id} value={cls.id.toString()}>
                      {cls.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="date"
                className="w-[180px]"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox id="mark-all" onCheckedChange={() => handleMarkAllPresent()} />
              <label htmlFor="mark-all" className="text-sm font-medium">
                Mark all as present
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-500">Present</Badge>
              <Badge className="bg-red-500">Absent</Badge>
              <Badge className="bg-yellow-500">Late</Badge>
              <Badge className="bg-blue-500">Excused</Badge>
            </div>
          </div>
          <div className="rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-2 text-left">ID</th>
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Overall Attendance</th>
                  <th className="p-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="border-b">
                    <td className="p-2">{student.id}</td>
                    <td className="p-2 font-medium">{student.name}</td>
                    <td className="p-2">{student.attendance}%</td>
                    <td className="p-2">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant={student.status === "present" ? "default" : "outline"}
                          className={student.status === "present" ? "bg-green-500" : ""}
                          onClick={() => handleStatusChange(student.id, "present")}
                        >
                          Present
                        </Button>
                        <Button
                          size="sm"
                          variant={student.status === "absent" ? "default" : "outline"}
                          className={student.status === "absent" ? "bg-red-500" : ""}
                          onClick={() => handleStatusChange(student.id, "absent")}
                        >
                          Absent
                        </Button>
                        <Button
                          size="sm"
                          variant={student.status === "late" ? "default" : "outline"}
                          className={student.status === "late" ? "bg-yellow-500" : ""}
                          onClick={() => handleStatusChange(student.id, "late")}
                        >
                          Late
                        </Button>
                        <Button
                          size="sm"
                          variant={student.status === "excused" ? "default" : "outline"}
                          className={student.status === "excused" ? "bg-blue-500" : ""}
                          onClick={() => handleStatusChange(student.id, "excused")}
                        >
                          Excused
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
