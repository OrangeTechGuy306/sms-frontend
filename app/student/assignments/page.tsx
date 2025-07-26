import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, Calendar, CheckCircle, Clock, FileText, Filter, Search, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AssignmentsPage() {
  // Mock data - in a real app, this would come from an API
  const assignments = [
    {
      id: "1",
      title: "Mathematics Problem Set",
      course: "Mathematics",
      courseCode: "MATH101",
      dueDate: "2025-05-06T23:59:00",
      status: "pending",
      priority: "high",
      description: "Complete problems 1-20 in Chapter 5",
      submissionType: "PDF Upload",
      color: "violet",
    },
    {
      id: "2",
      title: "English Literature Essay",
      course: "English",
      courseCode: "ENG201",
      dueDate: "2025-05-08T23:59:00",
      status: "pending",
      priority: "medium",
      description: "Write a 1500-word essay analyzing the themes in Shakespeare's Hamlet",
      submissionType: "Document Upload",
      color: "blue",
    },
    {
      id: "3",
      title: "Physics Lab Report",
      course: "Physics",
      courseCode: "PHYS101",
      dueDate: "2025-05-10T23:59:00",
      status: "pending",
      priority: "medium",
      description: "Write a lab report on the pendulum experiment conducted in class",
      submissionType: "PDF Upload",
      color: "green",
    },
    {
      id: "4",
      title: "History Research Paper",
      course: "History",
      courseCode: "HIST101",
      dueDate: "2025-05-15T23:59:00",
      status: "pending",
      priority: "low",
      description: "Research and write a 2000-word paper on a significant historical event",
      submissionType: "Document Upload",
      color: "amber",
    },
    {
      id: "5",
      title: "Computer Science Project",
      course: "Computer Science",
      courseCode: "CS101",
      dueDate: "2025-05-20T23:59:00",
      status: "pending",
      priority: "high",
      description: "Develop a simple web application using HTML, CSS, and JavaScript",
      submissionType: "Code Submission",
      color: "emerald",
    },
    {
      id: "6",
      title: "Biology Quiz",
      course: "Biology",
      courseCode: "BIO101",
      dueDate: "2025-05-05T12:00:00",
      status: "completed",
      priority: "medium",
      description: "Online quiz covering Chapters 1-3",
      submissionType: "Online Quiz",
      grade: "85%",
      feedback: "Good understanding of concepts. Review section 3.2.",
      color: "violet",
    },
    {
      id: "7",
      title: "Mathematics Midterm",
      course: "Mathematics",
      courseCode: "MATH101",
      dueDate: "2025-04-28T10:00:00",
      status: "completed",
      priority: "high",
      description: "In-class midterm examination",
      submissionType: "In-person Exam",
      grade: "92%",
      feedback: "Excellent work! Very thorough solutions.",
      color: "blue",
    },
  ]

  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  // Function to calculate days remaining
  const getDaysRemaining = (dateString: string) => {
    const dueDate = new Date(dateString)
    const today = new Date()
    const diffTime = dueDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const pendingAssignments = assignments.filter((a) => a.status === "pending")
  const completedAssignments = assignments.filter((a) => a.status === "completed")

  const getStatusBadge = (daysRemaining: number) => {
    if (daysRemaining < 0) return "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 border-0"
    if (daysRemaining === 0) return "bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-400 border-0"
    if (daysRemaining <= 2) return "bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400 border-0"
    if (daysRemaining <= 5) return "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 border-0"
    return "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 border-0"
  }

  const getStatusText = (daysRemaining: number) => {
    if (daysRemaining < 0) return "Overdue"
    if (daysRemaining === 0) return "Due today"
    return `${daysRemaining} days left`
  }

  const getCourseColor = (color: string) => {
    switch (color) {
      case "violet":
        return "border-l-4 border-violet-500 dark:border-violet-400"
      case "blue":
        return "border-l-4 border-blue-500 dark:border-blue-400"
      case "green":
        return "border-l-4 border-green-500 dark:border-green-400"
      case "amber":
        return "border-l-4 border-amber-500 dark:border-amber-400"
      case "emerald":
        return "border-l-4 border-emerald-500 dark:border-emerald-400"
      default:
        return "border-l-4 border-slate-500 dark:border-slate-400"
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Assignments</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">View and manage all your assignments.</p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 dark:text-slate-400" />
          <Input type="search" placeholder="Search assignments..." className="pl-9 bg-white dark:bg-slate-900" />
        </div>
        <div className="flex flex-wrap gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-[180px] bg-white dark:bg-slate-900">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              <SelectItem value="math">Mathematics</SelectItem>
              <SelectItem value="eng">English</SelectItem>
              <SelectItem value="phys">Physics</SelectItem>
              <SelectItem value="cs">Computer Science</SelectItem>
              <SelectItem value="hist">History</SelectItem>
              <SelectItem value="bio">Biology</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-violet-600 hover:bg-violet-700 text-white">
            <Plus className="mr-2 h-4 w-4" />
            Track Assignment
          </Button>
        </div>
      </div>

      <Tabs defaultValue="pending" className="space-y-6">
        <div className="overflow-x-auto">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="pending">Pending ({pendingAssignments.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedAssignments.length})</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="pending" className="space-y-4">
          {pendingAssignments.map((assignment) => {
            const daysRemaining = getDaysRemaining(assignment.dueDate)
            return (
              <Card key={assignment.id} className={`border-0 shadow-sm ${getCourseColor(assignment.color)}`}>
                <CardHeader className="pb-2">
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                    <CardTitle className="text-lg">{assignment.title}</CardTitle>
                    <Badge className={getStatusBadge(daysRemaining)}>{getStatusText(daysRemaining)}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">{assignment.description}</p>
                      <div className="flex items-center gap-2 text-sm">
                        <FileText className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                        <span>Submission: {assignment.submissionType}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                          <span>
                            Course: {assignment.course} ({assignment.courseCode})
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                          <span>Due: {formatDate(assignment.dueDate)}</span>
                        </div>
                        <Button size="sm" className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white">
                          Submit Assignment
                          <ArrowUpRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>
        <TabsContent value="completed" className="space-y-4">
          {completedAssignments.map((assignment) => (
            <Card key={assignment.id} className={`border-0 shadow-sm ${getCourseColor(assignment.color)}`}>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle className="text-lg">{assignment.title}</CardTitle>
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-400 dark:border-green-800"
                  >
                    <CheckCircle className="mr-1 h-3 w-3" /> Completed
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">{assignment.description}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <FileText className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                      <span>Submission: {assignment.submissionType}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                        <span>
                          Course: {assignment.course} ({assignment.courseCode})
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                        <span>Submitted: {formatDate(assignment.dueDate)}</span>
                      </div>
                      <div className="text-sm font-medium text-green-600 dark:text-green-400">
                        Grade: {assignment.grade}
                      </div>
                    </div>
                    {assignment.feedback && (
                      <div className="text-sm mt-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-md">
                        <strong>Feedback:</strong> {assignment.feedback}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
