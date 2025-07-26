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
  Heart,
  Brain,
  Users,
  Calendar as CalendarIcon,
  Clock,
  FileText,
  Target,
  Award,
  AlertTriangle,
  CheckCircle,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  User,
  Stethoscope,
  Clipboard,
  BookOpen,
  Activity,
  TrendingUp,
  TrendingDown,
  Star,
  Shield,
} from "lucide-react"

// Sample special education data
const specialNeedsStudents = [
  {
    id: "STU001",
    name: "Alex Johnson",
    class: "8A",
    avatar: "/placeholder.svg",
    disability: "Autism Spectrum Disorder",
    iepStatus: "Active",
    lastReview: "2024-03-15",
    nextReview: "2024-09-15",
    accommodations: [
      "Extended time on tests",
      "Quiet testing environment",
      "Visual schedules",
      "Sensory breaks"
    ],
    goals: [
      {
        area: "Communication",
        goal: "Improve verbal communication skills",
        progress: 75,
        target: "Use 3-4 word sentences consistently",
        deadline: "2024-06-30"
      },
      {
        area: "Social Skills",
        goal: "Develop peer interaction skills",
        progress: 60,
        target: "Initiate conversation with peers 3 times per day",
        deadline: "2024-06-30"
      }
    ],
    services: [
      { service: "Speech Therapy", frequency: "2x/week", provider: "Ms. Sarah Wilson" },
      { service: "Occupational Therapy", frequency: "1x/week", provider: "Mr. David Chen" },
      { service: "Behavioral Support", frequency: "Daily", provider: "Ms. Emily Rodriguez" }
    ],
    parentGuardian: "Jennifer Johnson",
    emergencyContact: "+1 (555) 123-4567",
  },
  {
    id: "STU002",
    name: "Maya Patel",
    class: "10B",
    avatar: "/placeholder.svg",
    disability: "Learning Disability - Dyslexia",
    iepStatus: "Active",
    lastReview: "2024-02-20",
    nextReview: "2024-08-20",
    accommodations: [
      "Text-to-speech software",
      "Extended time on assignments",
      "Alternative assessment formats",
      "Preferential seating"
    ],
    goals: [
      {
        area: "Reading",
        goal: "Improve reading comprehension",
        progress: 85,
        target: "Read at grade level with 80% comprehension",
        deadline: "2024-06-30"
      },
      {
        area: "Writing",
        goal: "Develop writing skills",
        progress: 70,
        target: "Write coherent paragraphs with minimal assistance",
        deadline: "2024-06-30"
      }
    ],
    services: [
      { service: "Reading Specialist", frequency: "3x/week", provider: "Ms. Lisa Thompson" },
      { service: "Assistive Technology", frequency: "As needed", provider: "Mr. Tech Support" }
    ],
    parentGuardian: "Raj Patel",
    emergencyContact: "+1 (555) 234-5678",
  },
]

const therapySessions = [
  {
    id: "THER001",
    studentName: "Alex Johnson",
    studentId: "STU001",
    therapyType: "Speech Therapy",
    therapist: "Ms. Sarah Wilson",
    date: "2024-04-18",
    time: "10:00 AM",
    duration: "30 minutes",
    status: "completed",
    notes: "Good progress on articulation exercises. Continue with current plan.",
    nextSession: "2024-04-20",
  },
  {
    id: "THER002",
    studentName: "Maya Patel",
    studentId: "STU002",
    therapyType: "Reading Specialist",
    therapist: "Ms. Lisa Thompson",
    date: "2024-04-18",
    time: "2:00 PM",
    duration: "45 minutes",
    status: "scheduled",
    notes: "",
    nextSession: "2024-04-19",
  },
]

const accommodationTypes = [
  { category: "Testing", items: ["Extended time", "Quiet environment", "Alternative format", "Oral testing"] },
  { category: "Classroom", items: ["Preferential seating", "Visual schedules", "Sensory breaks", "Modified assignments"] },
  { category: "Technology", items: ["Text-to-speech", "Speech-to-text", "Calculator", "Computer access"] },
  { category: "Behavioral", items: ["Behavior plan", "Positive reinforcement", "Break cards", "Check-in system"] },
]

const progressReports = [
  {
    student: "Alex Johnson",
    period: "Q3 2024",
    overallProgress: 68,
    goals: [
      { area: "Communication", progress: 75, status: "on-track" },
      { area: "Social Skills", progress: 60, status: "needs-attention" },
      { area: "Academic", progress: 70, status: "on-track" }
    ],
    recommendations: [
      "Continue current speech therapy schedule",
      "Increase social skills practice opportunities",
      "Consider peer buddy system"
    ]
  },
  {
    student: "Maya Patel",
    period: "Q3 2024",
    overallProgress: 78,
    goals: [
      { area: "Reading", progress: 85, status: "exceeding" },
      { area: "Writing", progress: 70, status: "on-track" },
      { area: "Math", progress: 80, status: "on-track" }
    ],
    recommendations: [
      "Maintain current reading interventions",
      "Focus on writing organization skills",
      "Consider advanced reading materials"
    ]
  },
]

export function SpecialEducation() {
  const [activeTab, setActiveTab] = useState("students")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedStudent, setSelectedStudent] = useState<typeof specialNeedsStudents[0] | null>(null)
  const [isStudentDetailOpen, setIsStudentDetailOpen] = useState(false)
  const [isIEPOpen, setIsIEPOpen] = useState(false)
  const [isTherapyOpen, setIsTherapyOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  // Filter students
  const filteredStudents = specialNeedsStudents.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.disability.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || student.iepStatus.toLowerCase() === selectedStatus
    return matchesSearch && matchesStatus
  })

  const handleViewStudent = (student: typeof specialNeedsStudents[0]) => {
    setSelectedStudent(student)
    setIsStudentDetailOpen(true)
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "active": return "outline"
      case "inactive": return "secondary"
      case "pending": return "default"
      case "completed": return "outline"
      case "scheduled": return "secondary"
      case "on-track": return "outline"
      case "exceeding": return "default"
      case "needs-attention": return "destructive"
      default: return "outline"
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "text-green-600"
    if (progress >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Special Education Management</h2>
          <p className="text-muted-foreground">Manage IEPs, accommodations, and special needs support services</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export IEPs
          </Button>
          <Dialog open={isIEPOpen} onOpenChange={setIsIEPOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Create IEP
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New IEP</DialogTitle>
                <DialogDescription>Create an Individualized Education Program for a student</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="student">Student</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select student" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="stu001">Alex Johnson</SelectItem>
                        <SelectItem value="stu002">Maya Patel</SelectItem>
                        <SelectItem value="stu003">Sam Wilson</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="disability">Primary Disability</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select disability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="autism">Autism Spectrum Disorder</SelectItem>
                        <SelectItem value="learning">Learning Disability</SelectItem>
                        <SelectItem value="intellectual">Intellectual Disability</SelectItem>
                        <SelectItem value="emotional">Emotional Disturbance</SelectItem>
                        <SelectItem value="physical">Physical Disability</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="goals">Educational Goals</Label>
                  <Textarea id="goals" placeholder="Enter educational goals and objectives..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accommodations">Accommodations</Label>
                  <Textarea id="accommodations" placeholder="List required accommodations..." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-date">IEP Start Date</Label>
                    <Input id="start-date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="review-date">Next Review Date</Label>
                    <Input id="review-date" type="date" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsIEPOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsIEPOpen(false)}>Create IEP</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="ieps">IEP Management</TabsTrigger>
          <TabsTrigger value="therapy">Therapy Sessions</TabsTrigger>
          <TabsTrigger value="accommodations">Accommodations</TabsTrigger>
          <TabsTrigger value="progress">Progress Tracking</TabsTrigger>
        </TabsList>

        {/* Students Tab */}
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
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="IEP Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
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
                    <TableHead>Disability</TableHead>
                    <TableHead>IEP Status</TableHead>
                    <TableHead>Next Review</TableHead>
                    <TableHead>Services</TableHead>
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
                        <Badge variant="outline">{student.disability}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(student.iepStatus)}>
                          {student.iepStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{student.nextReview}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {student.services.length} service{student.services.length !== 1 ? 's' : ''}
                        </div>
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
                            <DropdownMenuItem onClick={() => handleViewStudent(student)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit IEP
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              Schedule Review
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Export IEP
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

        {/* Therapy Sessions Tab */}
        <TabsContent value="therapy" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Therapy Sessions</h3>
              <p className="text-sm text-muted-foreground">Schedule and track therapy sessions</p>
            </div>
            <Dialog open={isTherapyOpen} onOpenChange={setIsTherapyOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Schedule Session
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Schedule Therapy Session</DialogTitle>
                  <DialogDescription>Schedule a new therapy session for a student</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="therapy-student">Student</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select student" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="stu001">Alex Johnson</SelectItem>
                          <SelectItem value="stu002">Maya Patel</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="therapy-type">Therapy Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="speech">Speech Therapy</SelectItem>
                          <SelectItem value="occupational">Occupational Therapy</SelectItem>
                          <SelectItem value="physical">Physical Therapy</SelectItem>
                          <SelectItem value="behavioral">Behavioral Support</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="session-date">Date</Label>
                      <Input id="session-date" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="session-time">Time</Label>
                      <Input id="session-time" type="time" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="therapist">Therapist</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select therapist" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sarah">Ms. Sarah Wilson (Speech)</SelectItem>
                        <SelectItem value="david">Mr. David Chen (OT)</SelectItem>
                        <SelectItem value="emily">Ms. Emily Rodriguez (Behavioral)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsTherapyOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsTherapyOpen(false)}>
                    Schedule Session
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-4">
            {therapySessions.map((session) => (
              <Card key={session.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{session.therapyType}</h4>
                        <Badge variant={getStatusBadgeVariant(session.status)}>
                          {session.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Student: {session.studentName} ({session.studentId})
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Therapist: {session.therapist}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{session.date} at {session.time}</span>
                        <span>Duration: {session.duration}</span>
                      </div>
                      {session.notes && (
                        <div className="text-sm">
                          <span className="font-medium">Notes: </span>
                          {session.notes}
                        </div>
                      )}
                      {session.nextSession && (
                        <div className="text-sm text-muted-foreground">
                          Next session: {session.nextSession}
                        </div>
                      )}
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Session
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileText className="mr-2 h-4 w-4" />
                          Add Notes
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Cancel Session
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Progress Tracking Tab */}
        <TabsContent value="progress" className="space-y-4">
          <div className="space-y-6">
            {progressReports.map((report, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{report.student} - {report.period}</span>
                    <div className="flex items-center gap-2">
                      <span className={`text-lg font-bold ${getProgressColor(report.overallProgress)}`}>
                        {report.overallProgress}%
                      </span>
                      <Badge variant="outline">Overall Progress</Badge>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    {report.goals.map((goal, goalIndex) => (
                      <div key={goalIndex} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{goal.area}</span>
                          <Badge variant={getStatusBadgeVariant(goal.status)}>
                            {goal.status.replace('-', ' ')}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Progress</span>
                            <span className={`font-medium ${getProgressColor(goal.progress)}`}>
                              {goal.progress}%
                            </span>
                          </div>
                          <Progress value={goal.progress} className="h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Recommendations</h4>
                    <div className="space-y-2">
                      {report.recommendations.map((rec, recIndex) => (
                        <div key={recIndex} className="flex items-start space-x-2">
                          <Target className="h-4 w-4 text-blue-500 mt-0.5" />
                          <span className="text-sm">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
