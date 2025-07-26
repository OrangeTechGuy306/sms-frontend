"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AnalyticsOverview } from "@/components/analytics/analytics-overview"
import { AttendanceChart } from "@/components/analytics/attendance-chart"
import { GradeDistribution } from "@/components/analytics/grade-distribution"
import { SubjectPerformance } from "@/components/analytics/subject-performance"
import { analyticsApi } from "@/lib/api"
import { toast } from "@/components/ui/use-toast"
import { Download, Loader2, TrendingUp, Users, GraduationCap, DollarSign, Calendar, BarChart3 } from "lucide-react"

interface AnalyticsStats {
  total_students: number
  total_teachers: number
  total_classes: number
  total_subjects: number
  average_attendance: number
  average_grade: number
  teacher_student_ratio: string
  fees_collected: number
  fees_outstanding: number
}

interface AttendanceData {
  by_grade_level: Array<{
    grade_level: string
    attendance_rate: number
    total_records: number
    present_count: number
  }>
  daily_trends: Array<{
    date: string
    attendance_rate: number
    total_records: number
    present_count: number
  }>
}

interface AcademicData {
  grade_distribution: Array<{
    grade: string
    count: number
    percentage: number
  }>
  subject_performance: Array<{
    subject_name: string
    average_score: number
    total_results: number
    pass_count: number
  }>
}

interface FinancialData {
  monthly_collection: Array<{
    month: string
    total_collected: number
    payment_count: number
  }>
  fee_type_breakdown: Array<{
    fee_type: string
    collected: number
    outstanding: number
  }>
}

interface EnrollmentData {
  by_grade_level: Array<{
    grade_level: string
    student_count: number
    class_count: number
    avg_students_per_class: number
  }>
  enrollment_trends: Array<{
    month: string
    new_enrollments: number
  }>
}

export default function AnalyticsPage() {
  const [stats, setStats] = useState<AnalyticsStats | null>(null)
  const [attendanceData, setAttendanceData] = useState<AttendanceData | null>(null)
  const [academicData, setAcademicData] = useState<AcademicData | null>(null)
  const [financialData, setFinancialData] = useState<FinancialData | null>(null)
  const [enrollmentData, setEnrollmentData] = useState<EnrollmentData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedTerm, setSelectedTerm] = useState('current')

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        setLoading(true)

        // Fetch all analytics data in parallel
        const [
          dashboardResponse,
          attendanceResponse,
          academicResponse,
          financialResponse,
          enrollmentResponse
        ] = await Promise.all([
          analyticsApi.getDashboard(),
          analyticsApi.getAttendanceStats(),
          analyticsApi.getAcademicStats(),
          analyticsApi.getFinancialStats(),
          analyticsApi.getEnrollmentStats()
        ])

        const dashboardStats = (dashboardResponse as any).data.stats
        const academicStats = (academicResponse as any).data

        // Set main stats
        setStats({
          total_students: dashboardStats.total_students,
          total_teachers: dashboardStats.total_teachers,
          total_classes: dashboardStats.total_classes,
          total_subjects: dashboardStats.total_subjects,
          average_attendance: dashboardStats.attendance_today.attendance_rate,
          average_grade: academicStats?.subject_performance?.length > 0
            ? Math.round(academicStats.subject_performance.reduce((acc: number, subj: any) => acc + subj.average_score, 0) / academicStats.subject_performance.length)
            : 85,
          teacher_student_ratio: dashboardStats.total_teachers > 0
            ? `1:${Math.round(dashboardStats.total_students / dashboardStats.total_teachers)}`
            : '1:0',
          fees_collected: dashboardStats.fees?.total_collected || 0,
          fees_outstanding: dashboardStats.fees?.total_outstanding || 0
        })

        // Set detailed analytics data
        setAttendanceData((attendanceResponse as any).data)
        setAcademicData((academicResponse as any).data)
        setFinancialData((financialResponse as any).data)
        setEnrollmentData((enrollmentResponse as any).data)

      } catch (error) {
        console.error('Error fetching analytics data:', error)
        toast({
          title: "Error",
          description: "Failed to fetch analytics data",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchAnalyticsData()
  }, [selectedTerm])

  const handleExport = async () => {
    try {
      toast({
        title: "Export Started",
        description: "Analytics report is being generated...",
      })
      // In a real implementation, this would call an export API
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export analytics data",
        variant: "destructive",
      })
    }
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        <div className="flex gap-2">
          <Select defaultValue="current">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Term" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Current Term</SelectItem>
              <SelectItem value="previous">Previous Term</SelectItem>
              <SelectItem value="year">Full Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      {/* Main Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : stats?.total_students || 0}
            </div>
            <p className="text-xs text-muted-foreground">Active enrollments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : stats?.total_teachers || 0}
            </div>
            <p className="text-xs text-muted-foreground">Active faculty</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : `${stats?.average_attendance || 0}%`}
            </div>
            <p className="text-xs text-muted-foreground">Today's attendance</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : `${stats?.average_grade || 0}%`}
            </div>
            <p className="text-xs text-muted-foreground">Overall performance</p>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : stats?.total_classes || 0}
            </div>
            <p className="text-xs text-muted-foreground">Active classes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Teacher:Student Ratio</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : stats?.teacher_student_ratio || '1:0'}
            </div>
            <p className="text-xs text-muted-foreground">Faculty ratio</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fees Collected</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : `$${(stats?.fees_collected || 0).toLocaleString()}`}
            </div>
            <p className="text-xs text-muted-foreground">This academic year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outstanding Fees</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : `$${(stats?.fees_outstanding || 0).toLocaleString()}`}
            </div>
            <p className="text-xs text-muted-foreground">Pending collection</p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="academic">Academic Performance</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="enrollment">Enrollment</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <AnalyticsOverview />
            <AttendanceChart />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <GradeDistribution />
            <SubjectPerformance />
          </div>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-4">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Analytics</CardTitle>
                <CardDescription>Detailed attendance statistics and trends</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin" />
                  </div>
                ) : (
                  <AttendanceChart />
                )}
              </CardContent>
            </Card>
            {attendanceData && (
              <Card>
                <CardHeader>
                  <CardTitle>Attendance by Grade Level</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {attendanceData.by_grade_level.map((grade) => (
                      <div key={grade.grade_level} className="flex items-center justify-between">
                        <span className="font-medium">{grade.grade_level}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            {grade.present_count}/{grade.total_records}
                          </span>
                          <span className="font-bold">{grade.attendance_rate}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="academic" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <GradeDistribution />
            <SubjectPerformance />
          </div>
          {academicData && (
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Grade Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {academicData.grade_distribution.map((grade) => (
                      <div key={grade.grade} className="flex items-center justify-between">
                        <span className="font-medium">Grade {grade.grade}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">{grade.count} students</span>
                          <span className="font-bold">{grade.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Subject Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {academicData.subject_performance.map((subject) => (
                      <div key={subject.subject_name} className="flex items-center justify-between">
                        <span className="font-medium">{subject.subject_name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            {subject.pass_count}/{subject.total_results} pass
                          </span>
                          <span className="font-bold">{Math.round(subject.average_score)}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          {financialData && (
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Fee Collection</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {financialData.monthly_collection.slice(0, 6).map((month) => (
                      <div key={month.month} className="flex items-center justify-between">
                        <span className="font-medium">{month.month}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">{month.payment_count} payments</span>
                          <span className="font-bold">${month.total_collected.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Fee Type Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {financialData.fee_type_breakdown.map((feeType) => (
                      <div key={feeType.fee_type} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{feeType.fee_type}</span>
                          <span className="font-bold">${feeType.collected.toLocaleString()}</span>
                        </div>
                        {feeType.outstanding > 0 && (
                          <div className="text-sm text-muted-foreground">
                            Outstanding: ${feeType.outstanding.toLocaleString()}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="enrollment" className="space-y-4">
          {enrollmentData && (
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Enrollment by Grade Level</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {enrollmentData.by_grade_level.map((grade) => (
                      <div key={grade.grade_level} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{grade.grade_level}</span>
                          <span className="font-bold">{grade.student_count} students</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {grade.class_count} classes • Avg {grade.avg_students_per_class} students/class
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Enrollment Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {enrollmentData.enrollment_trends.map((trend) => (
                      <div key={trend.month} className="flex items-center justify-between">
                        <span className="font-medium">{trend.month}</span>
                        <span className="font-bold">{trend.new_enrollments} new students</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
