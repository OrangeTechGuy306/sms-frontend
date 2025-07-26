"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, FileText, ClipboardCheck, Award } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Class {
  id: number
  name: string
  subject: string
  students: number
  averageGrade: string
  attendance: number
  nextClass: string
  room: string
}

export default function TeacherClassesPage() {
  const router = useRouter()

  // Mock classes data
  const [classes] = useState<Class[]>([
    {
      id: 1,
      name: "Grade 10A",
      subject: "Mathematics",
      students: 28,
      averageGrade: "B+",
      attendance: 94,
      nextClass: "Monday, 8:00 AM",
      room: "Room 101",
    },
    {
      id: 2,
      name: "Grade 11B",
      subject: "Mathematics",
      students: 25,
      averageGrade: "A-",
      attendance: 96,
      nextClass: "Monday, 11:00 AM",
      room: "Room 203",
    },
    {
      id: 3,
      name: "Grade 9B",
      subject: "Mathematics",
      students: 30,
      averageGrade: "B",
      attendance: 92,
      nextClass: "Tuesday, 9:30 AM",
      room: "Room 105",
    },
    {
      id: 4,
      name: "Grade 12A",
      subject: "Mathematics",
      students: 22,
      averageGrade: "A",
      attendance: 98,
      nextClass: "Wednesday, 8:00 AM",
      room: "Room 301",
    },
    {
      id: 5,
      name: "Grade 11A",
      subject: "Mathematics",
      students: 26,
      averageGrade: "B+",
      attendance: 95,
      nextClass: "Thursday, 8:00 AM",
      room: "Room 202",
    },
  ])

  const handleViewClass = (classId: number) => {
    router.push(`/teacher/classes/${classId}`)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">My Classes</h2>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Lesson Plan
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{classes.length}</div>
            <p className="text-xs text-muted-foreground">Across 3 grade levels</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{classes.reduce((sum, cls) => sum + cls.students, 0)}</div>
            <p className="text-xs text-muted-foreground">Across all your classes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(classes.reduce((sum, cls) => sum + cls.attendance, 0) / classes.length)}%
            </div>
            <p className="text-xs text-muted-foreground">Overall attendance rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">In the next 24 hours</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Class Management</CardTitle>
          <CardDescription>View and manage your assigned classes</CardDescription>
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search classes..." className="pl-8" />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Grades</SelectItem>
                  <SelectItem value="9">Grade 9</SelectItem>
                  <SelectItem value="10">Grade 10</SelectItem>
                  <SelectItem value="11">Grade 11</SelectItem>
                  <SelectItem value="12">Grade 12</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {classes.map((cls) => (
              <div key={cls.id} className="rounded-md border p-4">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-medium">{cls.name}</h3>
                      <Badge>{cls.subject}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {cls.students} students • Room {cls.room} • Next class: {cls.nextClass}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/teacher/attendance?class=${cls.id}`)}
                    >
                      <ClipboardCheck className="mr-2 h-4 w-4" />
                      Attendance
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => router.push(`/teacher/grades?class=${cls.id}`)}>
                      <Award className="mr-2 h-4 w-4" />
                      Grades
                    </Button>
                    <Button size="sm" onClick={() => handleViewClass(cls.id)}>
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
