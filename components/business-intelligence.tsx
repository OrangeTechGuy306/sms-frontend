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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  BarChart3,
  LineChart,
  PieChart,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  Target,
  Award,
  AlertTriangle,
  CheckCircle,
  Download,
  Upload,
  Filter,
  Search,
  RefreshCw,
  Eye,
  Settings,
  Share,
  Plus,
  MoreHorizontal,
  Brain,
  Zap,
  Activity,
} from "lucide-react"

// Sample BI data
const kpiMetrics = [
  {
    title: "Total Revenue",
    value: "$2,847,392",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    description: "Academic year 2023-24",
  },
  {
    title: "Student Enrollment",
    value: "1,248",
    change: "+5.2%",
    trend: "up",
    icon: Users,
    description: "Current academic year",
  },
  {
    title: "Graduation Rate",
    value: "94.8%",
    change: "+2.1%",
    trend: "up",
    icon: GraduationCap,
    description: "Class of 2024",
  },
  {
    title: "Teacher Retention",
    value: "89.3%",
    change: "-1.2%",
    trend: "down",
    icon: BookOpen,
    description: "Year over year",
  },
]

const enrollmentTrends = [
  { year: "2020", students: 1156, revenue: 2340000 },
  { year: "2021", students: 1189, revenue: 2456000 },
  { year: "2022", students: 1205, revenue: 2587000 },
  { year: "2023", students: 1234, revenue: 2698000 },
  { year: "2024", students: 1248, revenue: 2847392 },
]

const performanceMetrics = [
  {
    category: "Academic Performance",
    metrics: [
      { name: "Average GPA", value: "3.42", target: "3.50", status: "below" },
      { name: "Test Scores", value: "84.2%", target: "85%", status: "below" },
      { name: "College Acceptance", value: "92%", target: "90%", status: "above" },
    ],
  },
  {
    category: "Operational Efficiency",
    metrics: [
      { name: "Attendance Rate", value: "94.5%", target: "95%", status: "below" },
      { name: "Teacher-Student Ratio", value: "1:18", target: "1:20", status: "above" },
      { name: "Resource Utilization", value: "87%", target: "85%", status: "above" },
    ],
  },
  {
    category: "Financial Health",
    metrics: [
      { name: "Cost per Student", value: "$12,450", target: "$12,000", status: "above" },
      { name: "Revenue Growth", value: "12.5%", target: "10%", status: "above" },
      { name: "Operating Margin", value: "8.3%", target: "8%", status: "above" },
    ],
  },
]

const predictiveInsights = [
  {
    id: "PRED001",
    title: "Enrollment Forecast",
    prediction: "Expected 3.2% increase in enrollment for next academic year",
    confidence: 87,
    impact: "high",
    recommendation: "Prepare for additional classroom capacity and staff hiring",
  },
  {
    id: "PRED002",
    title: "Budget Optimization",
    prediction: "Technology budget can be reduced by 8% without impacting performance",
    confidence: 92,
    impact: "medium",
    recommendation: "Renegotiate technology contracts and optimize software licenses",
  },
  {
    id: "PRED003",
    title: "Teacher Retention Risk",
    prediction: "15% of teachers at risk of leaving in the next 6 months",
    confidence: 78,
    impact: "high",
    recommendation: "Implement retention programs and conduct satisfaction surveys",
  },
]

const competitorAnalysis = [
  {
    school: "Riverside Academy",
    enrollment: 1156,
    tuition: "$11,500",
    graduationRate: "91.2%",
    avgTestScore: "82.1%",
    ranking: 2,
  },
  {
    school: "Oakwood Prep",
    enrollment: 987,
    tuition: "$13,200",
    graduationRate: "96.1%",
    avgTestScore: "87.3%",
    ranking: 1,
  },
  {
    school: "Pine Valley School",
    enrollment: 1342,
    tuition: "$10,800",
    graduationRate: "88.7%",
    avgTestScore: "79.8%",
    ranking: 4,
  },
  {
    school: "Our School",
    enrollment: 1248,
    tuition: "$12,450",
    graduationRate: "94.8%",
    avgTestScore: "84.2%",
    ranking: 3,
  },
]

export function BusinessIntelligence() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedTimeframe, setSelectedTimeframe] = useState("year")
  const [selectedMetric, setSelectedMetric] = useState("all")
  const [isReportBuilderOpen, setIsReportBuilderOpen] = useState(false)

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? (
      <TrendingUp className="h-4 w-4 text-green-500" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-500" />
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "above": return "text-green-600"
      case "below": return "text-red-600"
      case "on-target": return "text-blue-600"
      default: return "text-gray-600"
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-600"
    if (confidence >= 75) return "text-yellow-600"
    return "text-red-600"
  }

  const getImpactBadgeVariant = (impact: string) => {
    switch (impact) {
      case "high": return "destructive"
      case "medium": return "secondary"
      case "low": return "outline"
      default: return "outline"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Business Intelligence</h2>
          <p className="text-muted-foreground">Advanced analytics and predictive insights for data-driven decisions</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Dialog open={isReportBuilderOpen} onOpenChange={setIsReportBuilderOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Create Report
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Custom Report Builder</DialogTitle>
                <DialogDescription>Create a custom analytics report</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="report-name">Report Name</Label>
                  <Input id="report-name" placeholder="Enter report name" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="data-source">Data Source</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select data source" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="enrollment">Enrollment Data</SelectItem>
                        <SelectItem value="financial">Financial Data</SelectItem>
                        <SelectItem value="academic">Academic Performance</SelectItem>
                        <SelectItem value="operational">Operational Metrics</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="chart-type">Chart Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select chart type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="line">Line Chart</SelectItem>
                        <SelectItem value="bar">Bar Chart</SelectItem>
                        <SelectItem value="pie">Pie Chart</SelectItem>
                        <SelectItem value="table">Data Table</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsReportBuilderOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsReportBuilderOpen(false)}>
                  Create Report
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="benchmarks">Benchmarks</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          {/* KPI Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {kpiMetrics.map((metric, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                  <metric.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    {getTrendIcon(metric.trend)}
                    <span className={metric.trend === "up" ? "text-green-500" : "text-red-500"}>
                      {metric.change}
                    </span>
                    <span>from last period</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Enrollment Trends</CardTitle>
                <CardDescription>Student enrollment over the past 5 years</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <LineChart className="h-16 w-16 text-muted-foreground" />
                  <p className="ml-4 text-muted-foreground">Enrollment trend chart will appear here</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Analysis</CardTitle>
                <CardDescription>Revenue breakdown by source</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <PieChart className="h-16 w-16 text-muted-foreground" />
                  <p className="ml-4 text-muted-foreground">Revenue breakdown chart will appear here</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                AI-Powered Insights
              </CardTitle>
              <CardDescription>Automated insights generated from your data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-4 border rounded-lg">
                  <TrendingUp className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Enrollment Growth Opportunity</h4>
                    <p className="text-sm text-muted-foreground">
                      Analysis shows potential for 15% enrollment increase in STEM programs based on local demand trends.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 border rounded-lg">
                  <DollarSign className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Cost Optimization</h4>
                    <p className="text-sm text-muted-foreground">
                      Utility costs are 12% above district average. Energy efficiency improvements could save $45,000 annually.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 border rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Retention Risk Alert</h4>
                    <p className="text-sm text-muted-foreground">
                      3 high-performing teachers show indicators of potential departure. Proactive retention measures recommended.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-4">
          <div className="space-y-6">
            {performanceMetrics.map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{category.category}</CardTitle>
                  <CardDescription>Key performance indicators and targets</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.metrics.map((metric, metricIndex) => (
                      <div key={metricIndex} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium">{metric.name}</div>
                          <div className="text-sm text-muted-foreground">Target: {metric.target}</div>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${getStatusColor(metric.status)}`}>
                            {metric.value}
                          </div>
                          <Badge variant={metric.status === "above" ? "outline" : "secondary"}>
                            {metric.status === "above" ? "Above Target" :
                             metric.status === "below" ? "Below Target" : "On Target"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Predictions Tab */}
        <TabsContent value="predictions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Predictive Analytics
              </CardTitle>
              <CardDescription>AI-powered predictions and recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {predictiveInsights.map((insight) => (
                  <div key={insight.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-start justify-between">
                      <h4 className="font-medium">{insight.title}</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant={getImpactBadgeVariant(insight.impact)}>
                          {insight.impact} impact
                        </Badge>
                        <span className={`text-sm font-medium ${getConfidenceColor(insight.confidence)}`}>
                          {insight.confidence}% confidence
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{insight.prediction}</p>
                    <div className="flex items-start space-x-2">
                      <Target className="h-4 w-4 text-blue-500 mt-0.5" />
                      <p className="text-sm font-medium">Recommendation: {insight.recommendation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Benchmarks Tab */}
        <TabsContent value="benchmarks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Competitive Analysis</CardTitle>
              <CardDescription>Compare performance with peer institutions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>School</TableHead>
                    <TableHead>Enrollment</TableHead>
                    <TableHead>Tuition</TableHead>
                    <TableHead>Graduation Rate</TableHead>
                    <TableHead>Avg Test Score</TableHead>
                    <TableHead>Ranking</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {competitorAnalysis.map((school, index) => (
                    <TableRow key={index} className={school.school === "Our School" ? "bg-blue-50" : ""}>
                      <TableCell className="font-medium">
                        {school.school}
                        {school.school === "Our School" && (
                          <Badge variant="outline" className="ml-2">You</Badge>
                        )}
                      </TableCell>
                      <TableCell>{school.enrollment.toLocaleString()}</TableCell>
                      <TableCell>{school.tuition}</TableCell>
                      <TableCell>{school.graduationRate}</TableCell>
                      <TableCell>{school.avgTestScore}</TableCell>
                      <TableCell>
                        <Badge variant={school.ranking <= 2 ? "outline" : "secondary"}>
                          #{school.ranking}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
