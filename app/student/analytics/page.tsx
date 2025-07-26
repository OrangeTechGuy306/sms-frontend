import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import StudentPerformanceChart from "@/components/student/student-performance-chart"
import StudentSubjectComparison from "@/components/student/student-subject-comparison"
import StudentAttendancePerformance from "@/components/student/student-attendance-performance"
import StudentSkillsRadar from "@/components/student/student-skills-radar"
import { TrendingUp, TrendingDown, Target, Award } from "lucide-react"

export default function StudentAnalyticsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall GPA</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.85</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+0.12</span> from last semester
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Class Rank</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15/120</div>
            <p className="text-xs text-muted-foreground">Top 12.5% of class</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">96.5%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2.1%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Hours</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.5</div>
            <p className="text-xs text-muted-foreground">Hours this week</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="subjects">Subject Analysis</TabsTrigger>
          <TabsTrigger value="attendance">Attendance Impact</TabsTrigger>
          <TabsTrigger value="skills">Skills Assessment</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Academic Performance Trend</CardTitle>
                <CardDescription>Your grade progression over the past 12 months</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <StudentPerformanceChart />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Performance Insights</CardTitle>
                <CardDescription>Key observations about your academic journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Consistent improvement in Mathematics</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Strong performance in Science subjects</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm">Room for improvement in History</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm">Excellent participation in group projects</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Subject Performance Comparison</CardTitle>
              <CardDescription>Compare your performance across different subjects</CardDescription>
            </CardHeader>
            <CardContent>
              <StudentSubjectComparison />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Attendance vs Performance Correlation</CardTitle>
              <CardDescription>How your attendance affects your academic performance</CardDescription>
            </CardHeader>
            <CardContent>
              <StudentAttendancePerformance />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Skills Assessment</CardTitle>
                <CardDescription>Your strengths across different skill areas</CardDescription>
              </CardHeader>
              <CardContent>
                <StudentSkillsRadar />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Skill Development Recommendations</CardTitle>
                <CardDescription>Areas to focus on for continued growth</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-blue-700">Critical Thinking</h4>
                    <p className="text-sm text-gray-600">
                      Continue developing analytical skills through advanced problem-solving exercises
                    </p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold text-green-700">Communication</h4>
                    <p className="text-sm text-gray-600">
                      Join debate club or public speaking activities to enhance verbal communication
                    </p>
                  </div>
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <h4 className="font-semibold text-yellow-700">Time Management</h4>
                    <p className="text-sm text-gray-600">
                      Use digital tools and planners to better organize study schedules
                    </p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-semibold text-purple-700">Leadership</h4>
                    <p className="text-sm text-gray-600">
                      Consider taking on leadership roles in student organizations
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
