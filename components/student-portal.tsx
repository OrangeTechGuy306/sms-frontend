"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from "@/components/ui/calendar"
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
  User,
  BookOpen,
  Calendar as CalendarIcon,
  Clock,
  FileText,
  Upload,
  Download,
  Star,
  Target,
  Award,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Plus,
  Eye,
  Edit,
  Share,
  Heart,
  MessageSquare,
  Bell,
  Settings,
  MoreHorizontal,
  GraduationCap,
  Trophy,
  Users,
  Lightbulb,
} from "lucide-react"

// Sample student data
const studentData = {
  id: "STU001",
  name: "Emma Thompson",
  class: "10A",
  rollNo: "1001",
  avatar: "/placeholder.svg",
  email: "emma.thompson@school.edu",
  phone: "+1 (555) 123-4567",
  address: "123 Maple Street, Springfield",
  overallGPA: 3.8,
  currentGrade: "A",
  attendance: 94,
  rank: 5,
  totalStudents: 32,
}

const currentGrades = [
  { subject: "Mathematics", grade: "A", score: 92, credits: 4, teacher: "Ms. Johnson" },
  { subject: "Science", grade: "A-", score: 88, credits: 4, teacher: "Mr. Wilson" },
  { subject: "English", grade: "B+", score: 85, credits: 3, teacher: "Ms. Davis" },
  { subject: "History", grade: "B", score: 82, credits: 3, teacher: "Mr. Brown" },
  { subject: "Physical Education", grade: "A", score: 95, credits: 2, teacher: "Coach Smith" },
]

const assignments = [
  {
    id: "ASSIGN001",
    title: "Algebra Problem Set 5",
    subject: "Mathematics",
    dueDate: "2024-04-25",
    status: "pending",
    description: "Complete problems 1-20 from Chapter 5",
    points: 50,
    submissionType: "online",
  },
  {
    id: "ASSIGN002",
    title: "Science Lab Report",
    subject: "Science",
    dueDate: "2024-04-28",
    status: "submitted",
    description: "Write a lab report on the chemical reactions experiment",
    points: 100,
    submissionType: "upload",
    submittedDate: "2024-04-20",
    grade: 88,
  },
  {
    id: "ASSIGN003",
    title: "English Essay - Character Analysis",
    subject: "English",
    dueDate: "2024-04-22",
    status: "overdue",
    description: "Analyze the main character in 'To Kill a Mockingbird'",
    points: 75,
    submissionType: "upload",
  },
]

const upcomingEvents = [
  { title: "Mathematics Test", date: "2024-04-26", time: "9:00 AM", location: "Room 101" },
  { title: "Science Fair", date: "2024-05-01", time: "10:00 AM", location: "Auditorium" },
  { title: "Parent-Teacher Conference", date: "2024-05-03", time: "3:00 PM", location: "Classroom" },
]

const learningGoals = [
  {
    id: "GOAL001",
    title: "Improve Mathematics Performance",
    description: "Achieve an A grade in Algebra by end of semester",
    progress: 75,
    targetDate: "2024-06-30",
    status: "on-track",
    milestones: [
      { task: "Complete Chapter 5 exercises", completed: true },
      { task: "Score 90+ on next test", completed: false },
      { task: "Attend tutoring sessions", completed: true },
    ],
  },
  {
    id: "GOAL002",
    title: "Enhance Writing Skills",
    description: "Improve essay writing and grammar",
    progress: 60,
    targetDate: "2024-06-30",
    status: "needs-attention",
    milestones: [
      { task: "Complete grammar exercises", completed: true },
      { task: "Write 3 practice essays", completed: false },
      { task: "Meet with writing tutor", completed: false },
    ],
  },
]

const achievements = [
  { title: "Honor Roll", description: "Achieved honor roll status for Q2", date: "2024-03-15", icon: Award },
  { title: "Science Fair Winner", description: "1st place in school science fair", date: "2024-02-20", icon: Trophy },
  { title: "Perfect Attendance", description: "Perfect attendance for January", date: "2024-01-31", icon: CheckCircle },
]

const digitalPortfolio = [
  {
    id: "PORT001",
    title: "Science Fair Project",
    type: "Project",
    subject: "Science",
    date: "2024-02-15",
    description: "Solar panel efficiency study",
    files: ["project-report.pdf", "presentation.pptx"],
    grade: "A",
  },
  {
    id: "PORT002",
    title: "Creative Writing Collection",
    type: "Portfolio",
    subject: "English",
    date: "2024-03-01",
    description: "Collection of short stories and poems",
    files: ["stories.pdf", "poems.pdf"],
    grade: "B+",
  },
]

export function StudentPortal() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [selectedGoal, setSelectedGoal] = useState<typeof learningGoals[0] | null>(null)
  const [isGoalDetailOpen, setIsGoalDetailOpen] = useState(false)
  const [isSubmissionOpen, setIsSubmissionOpen] = useState(false)
  const [selectedAssignment, setSelectedAssignment] = useState<typeof assignments[0] | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  const handleViewGoal = (goal: typeof learningGoals[0]) => {
    setSelectedGoal(goal)
    setIsGoalDetailOpen(true)
  }

  const handleSubmitAssignment = (assignment: typeof assignments[0]) => {
    setSelectedAssignment(assignment)
    setIsSubmissionOpen(true)
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "pending": return "secondary"
      case "submitted": return "outline"
      case "overdue": return "destructive"
      case "graded": return "default"
      case "on-track": return "outline"
      case "needs-attention": return "destructive"
      default: return "outline"
    }
  }

  const getGradeColor = (grade: string) => {
    if (grade.startsWith("A")) return "text-green-600"
    if (grade.startsWith("B")) return "text-blue-600"
    if (grade.startsWith("C")) return "text-yellow-600"
    return "text-red-600"
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "text-green-600"
    if (progress >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={studentData.avatar} alt={studentData.name} />
            <AvatarFallback>
              {studentData.name.split(" ").map((n) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">{studentData.name}</h2>
            <p className="text-muted-foreground">
              Class {studentData.class} • Roll No: {studentData.rollNo} • GPA: {studentData.overallGPA}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="grades">Grades</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="goals">Learning Goals</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-4">
          {/* Quick Stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current GPA</CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{studentData.overallGPA}</div>
                <p className="text-xs text-muted-foreground">Grade: {studentData.currentGrade}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Attendance</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{studentData.attendance}%</div>
                <Progress value={studentData.attendance} className="mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Class Rank</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">#{studentData.rank}</div>
                <p className="text-xs text-muted-foreground">of {studentData.totalStudents} students</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {assignments.filter(a => a.status === "pending").length}
                </div>
                <p className="text-xs text-muted-foreground">
                  {assignments.filter(a => a.status === "overdue").length} overdue
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Achievements</CardTitle>
                <CardDescription>Your latest accomplishments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements.slice(0, 3).map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <achievement.icon className="h-5 w-5 text-yellow-500" />
                      <div className="flex-1">
                        <div className="font-medium">{achievement.title}</div>
                        <div className="text-sm text-muted-foreground">{achievement.description}</div>
                        <div className="text-xs text-muted-foreground">{achievement.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Important dates and deadlines</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                      <CalendarIcon className="h-5 w-5 text-blue-500" />
                      <div className="flex-1">
                        <div className="font-medium">{event.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {event.date} at {event.time}
                        </div>
                        <div className="text-xs text-muted-foreground">{event.location}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Grades Tab */}
        <TabsContent value="grades" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Current Grades</CardTitle>
              <CardDescription>Your academic performance this semester</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Teacher</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Credits</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentGrades.map((grade, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{grade.subject}</TableCell>
                      <TableCell>{grade.teacher}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getGradeColor(grade.grade)}>
                          {grade.grade}
                        </Badge>
                      </TableCell>
                      <TableCell>{grade.score}%</TableCell>
                      <TableCell>{grade.credits}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Assignments Tab */}
        <TabsContent value="assignments" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Assignment</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Points</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assignments.map((assignment) => (
                    <TableRow key={assignment.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{assignment.title}</div>
                          <div className="text-sm text-muted-foreground line-clamp-1">
                            {assignment.description}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{assignment.subject}</TableCell>
                      <TableCell>
                        <div className="text-sm">{assignment.dueDate}</div>
                      </TableCell>
                      <TableCell>{assignment.points} pts</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(assignment.status)}>
                          {assignment.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            {assignment.status === "pending" && (
                              <DropdownMenuItem onClick={() => handleSubmitAssignment(assignment)}>
                                <Upload className="mr-2 h-4 w-4" />
                                Submit
                              </DropdownMenuItem>
                            )}
                            {assignment.status === "submitted" && assignment.grade && (
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                Download Feedback
                              </DropdownMenuItem>
                            )}
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

        {/* Learning Goals Tab */}
        <TabsContent value="goals" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Learning Goals</h3>
              <p className="text-sm text-muted-foreground">Track your academic objectives and progress</p>
            </div>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Goal
            </Button>
          </div>

          <div className="space-y-4">
            {learningGoals.map((goal) => (
              <Card key={goal.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium">{goal.title}</h4>
                        <Badge variant={getStatusBadgeVariant(goal.status)}>
                          {goal.status.replace('-', ' ')}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{goal.description}</p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progress</span>
                          <span className={`font-medium ${getProgressColor(goal.progress)}`}>
                            {goal.progress}%
                          </span>
                        </div>
                        <Progress value={goal.progress} className="h-2" />
                        <div className="text-xs text-muted-foreground">
                          Target Date: {goal.targetDate}
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => handleViewGoal(goal)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Portfolio Tab */}
        <TabsContent value="portfolio" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Digital Portfolio</h3>
              <p className="text-sm text-muted-foreground">Showcase your best work and achievements</p>
            </div>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {digitalPortfolio.map((item) => (
              <Card key={item.id}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between text-base">
                    <span>{item.title}</span>
                    <Badge variant="outline" className={getGradeColor(item.grade)}>
                      {item.grade}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{item.subject} • {item.type}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm">{item.description}</p>
                  <div className="text-xs text-muted-foreground">Date: {item.date}</div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Files:</div>
                    {item.files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span>{file}</span>
                        <Button variant="ghost" size="sm">
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share className="h-3 w-3 mr-1" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Calendar Tab */}
        <TabsContent value="calendar" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
                <CardDescription>View important dates and events</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Today's Schedule</CardTitle>
                <CardDescription>Your classes and activities for today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <Clock className="h-5 w-5 text-blue-500" />
                    <div>
                      <div className="font-medium">Mathematics</div>
                      <div className="text-sm text-muted-foreground">9:00 AM - 9:50 AM • Room 101</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <Clock className="h-5 w-5 text-green-500" />
                    <div>
                      <div className="font-medium">Science</div>
                      <div className="text-sm text-muted-foreground">10:00 AM - 10:50 AM • Lab 2</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <Clock className="h-5 w-5 text-purple-500" />
                    <div>
                      <div className="font-medium">English</div>
                      <div className="text-sm text-muted-foreground">11:00 AM - 11:50 AM • Room 205</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Assignment Submission Dialog */}
      <Dialog open={isSubmissionOpen} onOpenChange={setIsSubmissionOpen}>
        <DialogContent>
          {selectedAssignment && (
            <>
              <DialogHeader>
                <DialogTitle>Submit Assignment</DialogTitle>
                <DialogDescription>
                  Submit your work for "{selectedAssignment.title}"
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="submission-file">Upload File</Label>
                  <Input id="submission-file" type="file" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="submission-notes">Notes (Optional)</Label>
                  <Textarea
                    id="submission-notes"
                    placeholder="Add any notes about your submission..."
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsSubmissionOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsSubmissionOpen(false)}>
                  Submit Assignment
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
