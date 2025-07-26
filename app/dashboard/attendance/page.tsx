"use client"

import { useState, useEffect } from "react"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { DataTable } from "@/src/components/ui/data-table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { attendanceApi } from "@/src/lib/api"
import { toast } from "@/src/components/ui/use-toast"
import { Download, UserCheck, UserX, Calendar, Loader2, Plus } from "lucide-react"
import type { ColumnDef } from "@tanstack/react-table"

interface AttendanceRecord {
  id: string
  student_id: string
  class_id: string
  date: string
  status: 'present' | 'absent' | 'late' | 'excused'
  check_in_time?: string
  check_out_time?: string
  notes?: string
  created_at: string
  updated_at: string
  student_name?: string
  class_name?: string
  student_roll_number?: string
}

interface AttendanceStats {
  total_students: number
  present_today: number
  absent_today: number
  late_today: number
  average_attendance: number
}

export default function AttendancePage() {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([])
  const [stats, setStats] = useState<AttendanceStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [selectedClass, setSelectedClass] = useState<string>('all')
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  })

  const fetchAttendanceRecords = async (page = 1, limit = 10, search = '') => {
    try {
      setLoading(true)
      const response = await attendanceApi.getAll({
        page,
        limit,
        search,
        date: selectedDate,
        class_id: selectedClass !== 'all' ? selectedClass : undefined,
        sort_by: 'student_name',
        sort_order: 'asc'
      })

      setAttendanceRecords(response.data as AttendanceRecord[])
      if ((response as any).pagination) {
        setPagination((response as any).pagination)
      }
    } catch (error) {
      console.error('Error fetching attendance records:', error)
      toast({
        title: "Error",
        description: "Failed to fetch attendance records. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await attendanceApi.getStatistics({
        date: selectedDate,
        class_id: selectedClass !== 'all' ? selectedClass : undefined,
      })
      setStats((response as any).data)
    } catch (error) {
      console.error('Error fetching attendance stats:', error)
    }
  }

  useEffect(() => {
    fetchAttendanceRecords()
    fetchStats()
  }, [selectedDate, selectedClass])

  const handleMarkAttendance = async (studentId: string, status: AttendanceRecord['status']) => {
    try {
      const record = await attendanceApi.markAttendance({
        student_id: studentId,
        date: selectedDate,
        status,
      })

      setAttendanceRecords(prev => {
        const existing = prev.find(r => r.student_id === studentId && r.date === selectedDate)
        if (existing) {
          return prev.map(r => r.id === existing.id ? { ...r, status } : r)
        } else {
          return [record as AttendanceRecord, ...prev]
        }
      })

      fetchStats() // Refresh stats

      toast({
        title: "Attendance Marked",
        description: `Student marked as ${status}.`,
      })
    } catch (error) {
      console.error('Error marking attendance:', error)
      toast({
        title: "Error",
        description: "Failed to mark attendance. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleExportAttendance = async () => {
    try {
      const csvData = attendanceRecords.map(record => ({
        'Date': record.date,
        'Student': record.student_name || '',
        'Roll Number': record.student_roll_number || '',
        'Class': record.class_name || '',
        'Status': record.status,
        'Check In': record.check_in_time || '',
        'Check Out': record.check_out_time || '',
        'Notes': record.notes || '',
      }))

      const csvContent = [
        Object.keys(csvData[0]).join(','),
        ...csvData.map(row => Object.values(row).join(','))
      ].join('\n')

      const blob = new Blob([csvContent], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `attendance_${selectedDate}.csv`
      a.click()
      window.URL.revokeObjectURL(url)

      toast({
        title: "Export Successful",
        description: "Attendance data has been exported successfully.",
      })
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export attendance data.",
        variant: "destructive",
      })
    }
  }

  const columns: ColumnDef<AttendanceRecord>[] = [
    {
      accessorKey: "student_roll_number",
      header: "Roll No.",
    },
    {
      accessorKey: "student_name",
      header: "Student Name",
      cell: ({ row }) => <div className="font-medium">{row.getValue("student_name")}</div>,
    },
    {
      accessorKey: "class_name",
      header: "Class",
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => {
        const date = new Date(row.getValue("date"))
        return date.toLocaleDateString()
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        const variant = status === 'present' ? 'default' :
                      status === 'late' ? 'secondary' :
                      status === 'excused' ? 'outline' : 'destructive'
        return <Badge variant={variant}>{status}</Badge>
      },
    },
    {
      accessorKey: "check_in_time",
      header: "Check In",
      cell: ({ row }) => {
        const time = row.getValue("check_in_time") as string
        return time || 'N/A'
      },
    },
    {
      accessorKey: "check_out_time",
      header: "Check Out",
      cell: ({ row }) => {
        const time = row.getValue("check_out_time") as string
        return time || 'N/A'
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const record = row.original
        return (
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleMarkAttendance(record.student_id, 'present')}
              disabled={record.status === 'present'}
            >
              <UserCheck className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleMarkAttendance(record.student_id, 'absent')}
              disabled={record.status === 'absent'}
            >
              <UserX className="h-4 w-4" />
            </Button>
          </div>
        )
      },
    },
  ]

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <div className="text-lg font-medium">Loading attendance data...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Attendance Tracking</h1>
          <p className="text-muted-foreground">
            Track and manage student attendance records.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handleExportAttendance}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Take Attendance
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border rounded-md"
          />
        </div>
        <Select value={selectedClass} onValueChange={setSelectedClass}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select class" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Classes</SelectItem>
            <SelectItem value="class-1">Grade 10A</SelectItem>
            <SelectItem value="class-2">Grade 10B</SelectItem>
            <SelectItem value="class-3">Grade 11A</SelectItem>
            <SelectItem value="class-4">Grade 11B</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.average_attendance?.toFixed(1) || 0}%</div>
            <p className="text-xs text-muted-foreground">Overall performance</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Present Today</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.present_today || 0}</div>
            <p className="text-xs text-muted-foreground">
              {stats?.total_students ? Math.round((stats.present_today / stats.total_students) * 100) : 0}% of total students
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Absent Today</CardTitle>
            <UserX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.absent_today || 0}</div>
            <p className="text-xs text-muted-foreground">
              {stats?.total_students ? Math.round((stats.absent_today / stats.total_students) * 100) : 0}% of total students
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Late Today</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.late_today || 0}</div>
            <p className="text-xs text-muted-foreground">Students who arrived late</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Attendance Records</CardTitle>
          <CardDescription>View and manage student attendance records</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={attendanceRecords}
            searchKey="student_name"
            searchPlaceholder="Search by student name..."
          />
        </CardContent>
      </Card>
    </div>
  )
}
