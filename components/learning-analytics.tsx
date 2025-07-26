"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Brain,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Target,
  BookOpen,
  Users,
  Clock,
  Award,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Eye,
  RefreshCw,
  Lightbulb,
  BarChart3,
  PieChart,
  LineChart,
} from "lucide-react"

// Sample learning analytics data
const studentAnalytics = [
  {
    id: "STU001",
    name: "Emma Thompson",
    class: "10A",
    avatar: "/placeholder.svg",
    overallScore: 87,
    trend: "up",
    riskLevel: "low",
    strengths: ["Mathematics", "Science"],
    weaknesses: ["History", "Literature"],
    learningStyle: "Visual",
    engagementScore: 92,
    predictions: {
      nextExamScore: 89,
      graduationProbability: 95,
      collegeReadiness: 88,
    },
    recommendations: [
      "Focus on reading comprehension exercises",
      "Increase history study time by 30 minutes daily",
      "Consider advanced mathematics courses",
    ],
  },
  {
    id: "STU002",
    name: "James Wilson",
    class: "9B",
    avatar: "/placeholder.svg",
    overallScore: 72,
    trend: "down",
    riskLevel: "medium",
    strengths: ["Physical Education", "Art"],
    weaknesses: ["Mathematics", "Science"],
    learningStyle: "Kinesthetic",
    engagementScore: 68,
    predictions: {
      nextExamScore: 70,
      graduationProbability: 78,
      collegeReadiness: 65,
    },
    recommendations: [
      "Implement hands-on learning activities",
      "Schedule additional math tutoring sessions",
      "Use visual aids for science concepts",
    ],
  },
  {
    id: "STU003",
    name: "Sophia Martinez",
    class: "11C",
    avatar: "/placeholder.svg",
    overallScore: 94,
    trend: "up",
    riskLevel: "low",
    strengths: ["Literature", "History", "Languages"],
    weaknesses: ["Physics", "Chemistry"],
    learningStyle: "Auditory",
    engagementScore: 96,
    predictions: {
      nextExamScore: 96,
      graduationProbability: 98,
      collegeReadiness: 95,
    },
    recommendations: [
      "Consider advanced placement courses",
      "Explore STEM enrichment programs",
      "Maintain current study habits",
    ],
  },
]

const classAnalytics = [
  {
    class: "10A",
    totalStudents: 32,
    averageScore: 84,
    trend: "up",
    atRiskStudents: 2,
    topPerformers: 8,
    engagementRate: 89,
    attendanceRate: 94,
  },
  {
    class: "9B",
    totalStudents: 28,
    averageScore: 76,
    trend: "stable",
    atRiskStudents: 5,
    topPerformers: 4,
    engagementRate: 82,
    attendanceRate: 91,
  },
  {
    class: "11C",
    totalStudents: 30,
    averageScore: 88,
    trend: "up",
    atRiskStudents: 1,
    topPerformers: 12,
    engagementRate: 93,
    attendanceRate: 96,
  },
]

const learningPatterns = [
  {
    pattern: "Morning Peak Performance",
    description: "Students show 23% better performance in morning classes",
    impact: "High",
    recommendation: "Schedule challenging subjects in morning slots",
  },
  {
    pattern: "Visual Learning Preference",
    description: "68% of students respond better to visual learning materials",
    impact: "Medium",
    recommendation: "Increase use of diagrams, charts, and visual aids",
  },
  {
    pattern: "Collaborative Learning Boost",
    description: "Group activities increase engagement by 34%",
    impact: "High",
    recommendation: "Implement more collaborative learning sessions",
  },
]

export function LearningAnalytics() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedStudent, setSelectedStudent] = useState<typeof studentAnalytics[0] | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedClass, setSelectedClass] = useState("all")
  const [selectedRiskLevel, setSelectedRiskLevel] = useState("all")
  const [isStudentDetailOpen, setIsStudentDetailOpen] = useState(false)

  // Filter students based on search and filters
  const filteredStudents = studentAnalytics.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesClass = selectedClass === "all" || student.class === selectedClass
    const matchesRisk = selectedRiskLevel === "all" || student.riskLevel === selectedRiskLevel
    return matchesSearch && matchesClass && matchesRisk
  })

  const handleViewStudentDetail = (student: typeof studentAnalytics[0]) => {
    setSelectedStudent(student)
    setIsStudentDetailOpen(true)
  }

  const getRiskBadgeVariant = (riskLevel: string) => {
    switch (riskLevel) {
      case "high": return "destructive"
      case "medium": return "secondary"
      case "low": return "outline"
      default: return "outline"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="h-4 w-4 text-green-500" />
      case "down": return <TrendingDown className="h-4 w-4 text-red-500" />
      default: return <BarChart3 className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Learning Analytics</h2>
          <p className="text-muted-foreground">AI-powered insights into student learning patterns and performance</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh Data
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="students">Student Analytics</TabsTrigger>
          <TabsTrigger value="classes">Class Performance</TabsTrigger>
          <TabsTrigger value="patterns">Learning Patterns</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Students Analyzed</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,248</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">+5.2%</span> from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Performance</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">82.4%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">+2.1%</span> improvement
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">At-Risk Students</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-red-500">+3</span> from last week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
                <Brain className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">89.7%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">+1.8%</span> this week
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
                <CardDescription>Student performance over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <LineChart className="h-16 w-16 text-muted-foreground" />
                  <p className="ml-4 text-muted-foreground">Performance trend chart will appear here</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Learning Style Distribution</CardTitle>
                <CardDescription>How students prefer to learn</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Visual Learners</span>
                    <span className="text-sm font-medium">45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Auditory Learners</span>
                    <span className="text-sm font-medium">30%</span>
                  </div>
                  <Progress value={30} className="h-2" />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Kinesthetic Learners</span>
                    <span className="text-sm font-medium">25%</span>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>AI Insights & Recommendations</CardTitle>
              <CardDescription>Automated insights generated from learning data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-4 border rounded-lg">
                  <Lightbulb className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Optimal Study Time Identified</h4>
                    <p className="text-sm text-muted-foreground">
                      Students show 23% better retention when studying between 9-11 AM. Consider scheduling important lessons during this time.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 border rounded-lg">
                  <Brain className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Learning Pattern Detected</h4>
                    <p className="text-sm text-muted-foreground">
                      Mathematics performance improves by 18% when preceded by physical activity. Recommend PE before math classes.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 border rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Early Intervention Alert</h4>
                    <p className="text-sm text-muted-foreground">
                      5 students in Grade 9 showing declining engagement patterns. Immediate intervention recommended.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Student Analytics Tab */}
        <TabsContent value="students" className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                <SelectItem value="9A">Class 9A</SelectItem>
                <SelectItem value="9B">Class 9B</SelectItem>
                <SelectItem value="10A">Class 10A</SelectItem>
                <SelectItem value="11C">Class 11C</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedRiskLevel} onValueChange={setSelectedRiskLevel}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Risk level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk Levels</SelectItem>
                <SelectItem value="low">Low Risk</SelectItem>
                <SelectItem value="medium">Medium Risk</SelectItem>
                <SelectItem value="high">High Risk</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Overall Score</TableHead>
                    <TableHead>Trend</TableHead>
                    <TableHead>Risk Level</TableHead>
                    <TableHead>Engagement</TableHead>
                    <TableHead>Learning Style</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={student.avatar} alt={student.name} />
                            <AvatarFallback>
                              {student.name.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{student.name}</div>
                            <div className="text-sm text-muted-foreground">{student.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{student.class}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{student.overallScore}%</span>
                          <Progress value={student.overallScore} className="w-16 h-2" />
                        </div>
                      </TableCell>
                      <TableCell>{getTrendIcon(student.trend)}</TableCell>
                      <TableCell>
                        <Badge variant={getRiskBadgeVariant(student.riskLevel)}>
                          {student.riskLevel}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{student.engagementScore}%</span>
                          <Progress value={student.engagementScore} className="w-12 h-1" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{student.learningStyle}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleViewStudentDetail(student)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Target className="mr-2 h-4 w-4" />
                              Set Learning Goals
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Lightbulb className="mr-2 h-4 w-4" />
                              Generate Recommendations
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Class Performance Tab */}
        <TabsContent value="classes" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {classAnalytics.map((classData) => (
              <Card key={classData.class}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {classData.class}
                    {getTrendIcon(classData.trend)}
                  </CardTitle>
                  <CardDescription>{classData.totalStudents} students</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Average Score</span>
                      <span className="font-medium">{classData.averageScore}%</span>
                    </div>
                    <Progress value={classData.averageScore} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Engagement Rate</span>
                      <span className="font-medium">{classData.engagementRate}%</span>
                    </div>
                    <Progress value={classData.engagementRate} className="h-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-red-500">{classData.atRiskStudents}</div>
                      <div className="text-xs text-muted-foreground">At Risk</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-500">{classData.topPerformers}</div>
                      <div className="text-xs text-muted-foreground">Top Performers</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Learning Patterns Tab */}
        <TabsContent value="patterns" className="space-y-4">
          <div className="space-y-4">
            {learningPatterns.map((pattern, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {pattern.pattern}
                    <Badge variant={pattern.impact === "High" ? "destructive" : "secondary"}>
                      {pattern.impact} Impact
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{pattern.description}</p>
                  <div className="flex items-start space-x-2">
                    <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5" />
                    <p className="text-sm font-medium">Recommendation: {pattern.recommendation}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Predictions Tab */}
        <TabsContent value="predictions" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Graduation Predictions</CardTitle>
                <CardDescription>AI-powered graduation probability analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <PieChart className="h-16 w-16 text-muted-foreground" />
                  <p className="ml-4 text-muted-foreground">Graduation prediction chart will appear here</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Performance Forecasting</CardTitle>
                <CardDescription>Predicted performance trends for next semester</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <LineChart className="h-16 w-16 text-muted-foreground" />
                  <p className="ml-4 text-muted-foreground">Performance forecast chart will appear here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Student Detail Dialog */}
      <Dialog open={isStudentDetailOpen} onOpenChange={setIsStudentDetailOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedStudent && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={selectedStudent.avatar} alt={selectedStudent.name} />
                    <AvatarFallback>
                      {selectedStudent.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  {selectedStudent.name} - Learning Analytics
                </DialogTitle>
                <DialogDescription>
                  Detailed learning analytics and AI-powered insights for {selectedStudent.name}
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-6 py-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Overall Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{selectedStudent.overallScore}%</div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        {getTrendIcon(selectedStudent.trend)}
                        <span>Trending {selectedStudent.trend}</span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Engagement Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{selectedStudent.engagementScore}%</div>
                      <Progress value={selectedStudent.engagementScore} className="mt-2" />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Risk Level</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Badge variant={getRiskBadgeVariant(selectedStudent.riskLevel)} className="text-sm">
                        {selectedStudent.riskLevel.toUpperCase()}
                      </Badge>
                      <div className="text-sm text-muted-foreground mt-2">
                        Learning Style: {selectedStudent.learningStyle}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Strengths & Weaknesses</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium text-green-600 mb-2">Strengths</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedStudent.strengths.map((strength, index) => (
                            <Badge key={index} variant="outline" className="text-green-600 border-green-200">
                              {strength}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-red-600 mb-2">Areas for Improvement</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedStudent.weaknesses.map((weakness, index) => (
                            <Badge key={index} variant="outline" className="text-red-600 border-red-200">
                              {weakness}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>AI Predictions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Next Exam Score</span>
                        <span className="font-medium">{selectedStudent.predictions.nextExamScore}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Graduation Probability</span>
                        <span className="font-medium">{selectedStudent.predictions.graduationProbability}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">College Readiness</span>
                        <span className="font-medium">{selectedStudent.predictions.collegeReadiness}%</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>AI-Generated Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedStudent.recommendations.map((recommendation, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                          <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5" />
                          <p className="text-sm">{recommendation}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsStudentDetailOpen(false)}>
                  Close
                </Button>
                <Button>
                  <Target className="mr-2 h-4 w-4" />
                  Create Learning Plan
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
