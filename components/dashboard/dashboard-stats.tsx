"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, GraduationCap, BookOpen, Calendar, Loader2, DollarSign } from "lucide-react"
import { analyticsApi } from "@/src/lib/api"
import { toast } from "@/components/ui/use-toast"

interface DashboardStats {
  total_students: number
  total_teachers: number
  total_classes: number
  total_subjects: number
  attendance_today: {
    total: number
    present: number
    absent: number
    late: number
    attendance_rate: number
  }
  fees: {
    total_collected: number
    total_outstanding: number
    paid_students: number
    pending_students: number
  }
}

export function DashboardStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setLoading(true)
        const response = await analyticsApi.getDashboard()
        setStats(response.data.stats)
      } catch (error) {
        console.error('Error fetching dashboard stats:', error)
        toast({
          title: "Error",
          description: "Failed to fetch dashboard statistics",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardStats()
  }, [])

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Loading...</CardTitle>
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">--</div>
              <p className="text-xs text-muted-foreground">Loading data...</p>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Students</CardTitle>
          <GraduationCap className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats?.total_students || 0}</div>
          <p className="text-xs text-muted-foreground">Active students</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats?.total_teachers || 0}</div>
          <p className="text-xs text-muted-foreground">Active teachers</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
          <BookOpen className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats?.total_classes || 0}</div>
          <p className="text-xs text-muted-foreground">Active classes</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Fee Collection</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${stats?.fees?.total_collected || 0}</div>
          <p className="text-xs text-muted-foreground">
            ${stats?.fees?.total_outstanding || 0} outstanding
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
