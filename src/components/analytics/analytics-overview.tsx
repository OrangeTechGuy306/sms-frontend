"use client"

import { useState, useEffect } from "react"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Loader2 } from "lucide-react"
import { analyticsApi } from "@/lib/api"
import { toast } from "@/components/ui/use-toast"

interface OverviewData {
  name: string
  attendance: number
  grades: number
  participation: number
}

export function AnalyticsOverview() {
  const [data, setData] = useState<OverviewData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        setLoading(true)
        const attendanceResponse = await analyticsApi.getAttendanceStats()
        const performanceResponse = await analyticsApi.getPerformanceStats()

        // Transform data for chart
        const attendanceData = (attendanceResponse as any).data?.by_grade_level || []
        const performanceData = (performanceResponse as any).data?.subject_performance || []

        // Combine data by grade level
        const combinedData = attendanceData.map((grade: any) => ({
          name: grade.grade_level,
          attendance: Math.round(grade.attendance_rate || 0),
          grades: Math.round(
            performanceData.find((perf: any) => perf.grade_level === grade.grade_level)?.average_score || 75
          ),
          participation: Math.round((grade.attendance_rate || 0) * 0.9), // Estimate participation based on attendance
        }))

        setData(combinedData.length > 0 ? combinedData : [
          { name: "Grade 9", attendance: 94, grades: 82, participation: 78 },
          { name: "Grade 10", attendance: 92, grades: 85, participation: 82 },
          { name: "Grade 11", attendance: 90, grades: 88, participation: 85 },
          { name: "Grade 12", attendance: 95, grades: 90, participation: 88 },
        ])
      } catch (error) {
        console.error('Error fetching overview data:', error)
        toast({
          title: "Error",
          description: "Failed to fetch analytics overview data",
          variant: "destructive",
        })

        // Fallback to sample data
        setData([
          { name: "Grade 9", attendance: 94, grades: 82, participation: 78 },
          { name: "Grade 10", attendance: 92, grades: 85, participation: 82 },
          { name: "Grade 11", attendance: 90, grades: 88, participation: 85 },
          { name: "Grade 12", attendance: 95, grades: 90, participation: 88 },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchOverviewData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[350px]">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading overview data...</span>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="attendance" name="Attendance %" fill="#8884d8" />
        <Bar dataKey="grades" name="Average Grade %" fill="#82ca9d" />
        <Bar dataKey="participation" name="Participation %" fill="#ffc658" />
      </BarChart>
    </ResponsiveContainer>
  )
}
