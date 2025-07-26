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
  Calendar as CalendarIcon,
  Clock,
  BookOpen,
  GraduationCap,
  MessageSquare,
  Bell,
  FileText,
  Download,
  Upload,
  Phone,
  Mail,
  MapPin,
  Heart,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Plus,
  Eye,
  Edit,
  MoreHorizontal,
  Star,
  Target,
  Award,
} from "lucide-react"

// Sample parent data
const parentData = {
  name: "David Thompson",
  email: "david.thompson@email.com",
  phone: "+1 (555) 123-4567",
  address: "123 Maple Street, Springfield",
  children: [
    {
      id: "STU001",
      name: "Emma Thompson",
      class: "10A",
      rollNo: "1001",
      avatar: "/placeholder.svg",
      overallGrade: "A",
      attendance: 94,
      currentGPA: 3.8,
      recentGrades: [
        { subject: "Mathematics", grade: "A", score: 92, date: "2024-04-15" },
        { subject: "Science", grade: "A-", score: 88, date: "2024-04-12" },
        { subject: "English", grade: "B+", score: 85, date: "2024-04-10" },
        { subject: "History", grade: "B", score: 82, date: "2024-04-08" },
      ],
      upcomingEvents: [
        { title: "Parent-Teacher Conference", date: "2024-04-25", time: "3:00 PM" },
        { title: "Science Fair", date: "2024-04-30", time: "10:00 AM" },
        { title: "Mathematics Test", date: "2024-05-02", time: "9:00 AM" },
      ],
      assignments: [
        { title: "Math Homework - Chapter 5", subject: "Mathematics", dueDate: "2024-04-22", status: "pending" },
        { title: "Science Project", subject: "Science", dueDate: "2024-04-28", status: "submitted" },
        { title: "English Essay", subject: "English", dueDate: "2024-04-20", status: "overdue" },
      ],
    },
  ],
}

const teacherMessages = [
  {
    id: "MSG001",
    from: "Ms. Rebecca Johnson",
    subject: "Emma's Progress in Mathematics",
    date: "2024-04-18",
    time: "2:30 PM",
    message: "Emma is doing exceptionally well in mathematics. She consistently participates in class and her problem-solving skills have improved significantly.",
    isRead: false,
  },
  {
    id: "MSG002",
    from: "Mr. David Wilson",
    subject: "Science Fair Preparation",
    date: "2024-04-16",
    time: "11:15 AM",
    message: "Just wanted to update you on Emma's science fair project. She has chosen an interesting topic and is making good progress.",
    isRead: true,
  },
]

const announcements = [
  {
    id: "ANN001",
    title: "School Closure - Weather Alert",
    content: "Due to severe weather conditions, school will be closed tomorrow (April 19th). All classes will be conducted online.",
    date: "2024-04-18",
    priority: "high",
  },
  {
    id: "ANN002",
    title: "Parent-Teacher Conference Schedule",
    content: "Parent-teacher conferences are scheduled for April 25-26. Please book your slot through the parent portal.",
    date: "2024-04-15",
    priority: "medium",
  },
]

export function ParentPortal() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [selectedChild, setSelectedChild] = useState(parentData.children[0])
  const [isMessageOpen, setIsMessageOpen] = useState(false)
  const [selectedMessage, setSelectedMessage] = useState<typeof teacherMessages[0] | null>(null)
  const [isConferenceBookingOpen, setIsConferenceBookingOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  const handleViewMessage = (message: typeof teacherMessages[0]) => {
    setSelectedMessage(message)
    setIsMessageOpen(true)
  }

  const getGradeColor = (grade: string) => {
    if (grade.startsWith("A")) return "text-green-600"
    if (grade.startsWith("B")) return "text-blue-600"
    if (grade.startsWith("C")) return "text-yellow-600"
    return "text-red-600"
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "submitted": return "outline"
      case "pending": return "secondary"
      case "overdue": return "destructive"
      default: return "outline"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "border-red-200 bg-red-50"
      case "medium": return "border-yellow-200 bg-yellow-50"
      case "low": return "border-green-200 bg-green-50"
      default: return "border-gray-200 bg-gray-50"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Parent Portal</h2>
          <p className="text-muted-foreground">Welcome back, {parentData.name}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </Button>
          <Button variant="outline" size="sm">
            <MessageSquare className="mr-2 h-4 w-4" />
            Messages
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="grades">Grades & Progress</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
          <TabsTrigger value="events">Events & Calendar</TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-4">
          {/* Child Selector */}
          <Card>
            <CardHeader>
              <CardTitle>My Children</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={selectedChild.avatar} alt={selectedChild.name} />
                  <AvatarFallback>
                    {selectedChild.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{selectedChild.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Class {selectedChild.class} • Roll No: {selectedChild.rollNo}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overall Grade</CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${getGradeColor(selectedChild.overallGrade)}`}>
                  {selectedChild.overallGrade}
                </div>
                <p className="text-xs text-muted-foreground">Current GPA: {selectedChild.currentGPA}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Attendance</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{selectedChild.attendance}%</div>
                <Progress value={selectedChild.attendance} className="mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Assignments</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {selectedChild.assignments.filter(a => a.status === "pending").length}
                </div>
                <p className="text-xs text-muted-foreground">
                  {selectedChild.assignments.filter(a => a.status === "overdue").length} overdue
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{selectedChild.upcomingEvents.length}</div>
                <p className="text-xs text-muted-foreground">This week</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Grades</CardTitle>
                <CardDescription>Latest assessment results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedChild.recentGrades.slice(0, 4).map((grade, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{grade.subject}</div>
                        <div className="text-sm text-muted-foreground">{grade.date}</div>
                      </div>
                      <div className="text-right">
                        <div className={`font-medium ${getGradeColor(grade.grade)}`}>{grade.grade}</div>
                        <div className="text-sm text-muted-foreground">{grade.score}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Announcements</CardTitle>
                <CardDescription>Important school updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {announcements.map((announcement) => (
                    <div key={announcement.id} className={`p-3 rounded-lg border ${getPriorityColor(announcement.priority)}`}>
                      <h4 className="font-medium">{announcement.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{announcement.content}</p>
                      <p className="text-xs text-muted-foreground mt-2">{announcement.date}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Grades & Progress Tab */}
        <TabsContent value="grades" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Academic Progress</CardTitle>
              <CardDescription>Detailed grade breakdown for {selectedChild.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedChild.recentGrades.map((grade, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{grade.subject}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getGradeColor(grade.grade)}>
                          {grade.grade}
                        </Badge>
                      </TableCell>
                      <TableCell>{grade.score}%</TableCell>
                      <TableCell>{grade.date}</TableCell>
                      <TableCell>
                        {grade.score >= 90 ? (
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        ) : grade.score >= 80 ? (
                          <TrendingUp className="h-4 w-4 text-blue-500" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-500" />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Communication Tab */}
        <TabsContent value="communication" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Messages from Teachers</h3>
              <p className="text-sm text-muted-foreground">Communication with your child's teachers</p>
            </div>
            <Dialog open={isConferenceBookingOpen} onOpenChange={setIsConferenceBookingOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Book Conference
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Book Parent-Teacher Conference</DialogTitle>
                  <DialogDescription>
                    Schedule a meeting with your child's teachers
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label>Select Date</Label>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="teacher">Teacher</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select teacher" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rebecca">Ms. Rebecca Johnson (Mathematics)</SelectItem>
                        <SelectItem value="david">Mr. David Wilson (Science)</SelectItem>
                        <SelectItem value="sarah">Ms. Sarah Thompson (English)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message (Optional)</Label>
                    <Textarea
                      id="message"
                      placeholder="Any specific topics you'd like to discuss..."
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsConferenceBookingOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsConferenceBookingOpen(false)}>
                    Book Conference
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-4">
            {teacherMessages.map((message) => (
              <Card key={message.id} className={`cursor-pointer transition-colors hover:bg-muted/50 ${!message.isRead ? 'border-blue-200 bg-blue-50/50' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium">{message.subject}</h4>
                        {!message.isRead && <Badge variant="default" className="text-xs">New</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">From: {message.from}</p>
                      <p className="text-sm line-clamp-2">{message.message}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {message.date} at {message.time}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewMessage(message)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Events & Calendar Tab */}
        <TabsContent value="events" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Important dates and events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedChild.upcomingEvents.map((event, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 border rounded-lg">
                      <CalendarIcon className="h-5 w-5 text-blue-500" />
                      <div className="flex-1">
                        <h4 className="font-medium">{event.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {event.date} at {event.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
                <CardDescription>View important dates</CardDescription>
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
          </div>
        </TabsContent>
      </Tabs>

      {/* Message Detail Dialog */}
      <Dialog open={isMessageOpen} onOpenChange={setIsMessageOpen}>
        <DialogContent className="max-w-2xl">
          {selectedMessage && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedMessage.subject}</DialogTitle>
                <DialogDescription>
                  From: {selectedMessage.from} • {selectedMessage.date} at {selectedMessage.time}
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <p className="whitespace-pre-line">{selectedMessage.message}</p>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsMessageOpen(false)}>
                  Close
                </Button>
                <Button>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Reply
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
