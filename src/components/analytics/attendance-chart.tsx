"use client"

import { useState, useEffect } from "react"
import { Line, LineChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Loader2 } from "lucide-react"
import { analyticsApi } from "@/lib/api"
import { toast } from "@/components/ui/use-toast"

interface AttendanceData {
  name: string
  [key: string]: string | number
}

export function AttendanceChart() {
  const [data, setData] = useState<AttendanceData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        setLoading(true)
        const response = await analyticsApi.getAttendanceStats()
        const attendanceData = (response as any).data

        if (attendanceData?.daily_trends) {
          // Transform daily trends data for chart
          const chartData = attendanceData.daily_trends
            .slice(0, 30) // Last 30 days
            .reverse() // Show chronologically
            .map((day: any) => ({
              name: new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
              'Attendance Rate': Math.round(day.attendance_rate || 0),
            }))

          setData(chartData)
        } else {
          // Fallback to sample data
          setData([
            { name: "Sep", "Grade 9": 96, "Grade 10": 94, "Grade 11": 92, "Grade 12": 97 },
            { name: "Oct", "Grade 9": 94, "Grade 10": 92, "Grade 11": 90, "Grade 12": 95 },
            { name: "Nov", "Grade 9": 92, "Grade 10": 90, "Grade 11": 88, "Grade 12": 93 },
            { name: "Dec", "Grade 9": 90, "Grade 10": 88, "Grade 11": 86, "Grade 12": 91 },
            { name: "Jan", "Grade 9": 93, "Grade 10": 91, "Grade 11": 89, "Grade 12": 94 },
            { name: "Feb", "Grade 9": 95, "Grade 10": 93, "Grade 11": 91, "Grade 12": 96 },
          ])
        }
      } catch (error) {
        console.error('Error fetching attendance data:', error)
        toast({
          title: "Error",
          description: "Failed to fetch attendance chart data",
          variant: "destructive",
        })

        // Fallback to sample data
        setData([
          { name: "Sep", "Grade 9": 96, "Grade 10": 94, "Grade 11": 92, "Grade 12": 97 },
          { name: "Oct", "Grade 9": 94, "Grade 10": 92, "Grade 11": 90, "Grade 12": 95 },
          { name: "Nov", "Grade 9": 92, "Grade 10": 90, "Grade 11": 88, "Grade 12": 93 },
          { name: "Dec", "Grade 9": 90, "Grade 10": 88, "Grade 11": 86, "Grade 12": 91 },
          { name: "Jan", "Grade 9": 93, "Grade 10": 91, "Grade 11": 89, "Grade 12": 94 },
          { name: "Feb", "Grade 9": 95, "Grade 10": 93, "Grade 11": 91, "Grade 12": 96 },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchAttendanceData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[350px]">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading attendance data...</span>
      </div>
    )
  }

  // Get all keys except 'name' for dynamic line rendering
  const dataKeys = data.length > 0 ? Object.keys(data[0]).filter(key => key !== 'name') : []
  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1', '#d084d0']

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[80, 100]} />
        <Tooltip />
        <Legend />
        {dataKeys.map((key, index) => (
          <Line
            key={key}
            type="monotone"
            dataKey={key}
            stroke={colors[index % colors.length]}
            activeDot={{ r: 8 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}
