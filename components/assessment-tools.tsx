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
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
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
  FileText,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Play,
  Pause,
  Clock,
  Users,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Brain,
  Shield,
  Camera,
  Mic,
  Monitor,
  Award,
  Target,
  BarChart3,
} from "lucide-react"

// Sample assessment data
const assessments = [
  {
    id: "EXAM001",
    title: "Mathematics Mid-Term Exam",
    subject: "Mathematics",
    class: "10A",
    type: "Online Exam",
    duration: 120,
    totalQuestions: 50,
    status: "Active",
    startDate: "2024-04-20",
    endDate: "2024-04-20",
    participants: 32,
    completed: 28,
    averageScore: 84,
    antiCheatEnabled: true,
    autoGrading: true,
  },
  {
    id: "EXAM002",
    title: "Science Quiz - Chapter 5",
    subject: "Science",
    class: "9B",
    type: "Quiz",
    duration: 30,
    totalQuestions: 20,
    status: "Scheduled",
    startDate: "2024-04-22",
    endDate: "2024-04-22",
    participants: 28,
    completed: 0,
    averageScore: 0,
    antiCheatEnabled: true,
    autoGrading: true,
  },
  {
    id: "EXAM003",
    title: "English Essay Assessment",
    subject: "English",
    class: "11C",
    type: "Essay",
    duration: 90,
    totalQuestions: 3,
    status: "Completed",
    startDate: "2024-04-15",
    endDate: "2024-04-15",
    participants: 30,
    completed: 30,
    averageScore: 78,
    antiCheatEnabled: false,
    autoGrading: true,
  },
]

const questionTypes = [
  { value: "multiple-choice", label: "Multiple Choice", icon: CheckCircle },
  { value: "true-false", label: "True/False", icon: CheckCircle },
  { value: "short-answer", label: "Short Answer", icon: FileText },
  { value: "essay", label: "Essay", icon: FileText },
  { value: "fill-blank", label: "Fill in the Blank", icon: Edit },
  { value: "matching", label: "Matching", icon: Target },
]

const antiCheatFeatures = [
  { id: "webcam", label: "Webcam Monitoring", icon: Camera, description: "Monitor students via webcam during exam" },
  { id: "screen", label: "Screen Recording", icon: Monitor, description: "Record student screens during assessment" },
  { id: "browser", label: "Browser Lockdown", icon: Shield, description: "Prevent switching to other applications" },
  { id: "plagiarism", label: "Plagiarism Detection", icon: Brain, description: "AI-powered plagiarism checking" },
  { id: "time-limit", label: "Strict Time Limits", icon: Clock, description: "Enforce time limits per question" },
  { id: "randomize", label: "Question Randomization", icon: Target, description: "Randomize question order for each student" },
]

export function AssessmentTools() {
  const [activeTab, setActiveTab] = useState("assessments")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [isCreateAssessmentOpen, setIsCreateAssessmentOpen] = useState(false)
  const [isQuestionBankOpen, setIsQuestionBankOpen] = useState(false)
  const [selectedAssessment, setSelectedAssessment] = useState<typeof assessments[0] | null>(null)

  // Filter assessments
  const filteredAssessments = assessments.filter((assessment) => {
    const matchesSearch = assessment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assessment.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || assessment.status.toLowerCase() === selectedStatus
    const matchesType = selectedType === "all" || assessment.type.toLowerCase() === selectedType.toLowerCase()
    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "active": return "default"
      case "completed": return "outline"
      case "scheduled": return "secondary"
      default: return "outline"
    }
  }

  const handleCreateAssessment = () => {
    setIsCreateAssessmentOpen(false)
    // Handle assessment creation logic
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Assessment Tools</h2>
          <p className="text-muted-foreground">Create and manage online assessments with AI-powered features</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Results
          </Button>
          <Dialog open={isCreateAssessmentOpen} onOpenChange={setIsCreateAssessmentOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Create Assessment
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Assessment</DialogTitle>
                <DialogDescription>Set up a new online assessment with advanced features</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Assessment Title</Label>
                    <Input id="title" placeholder="Enter assessment title" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mathematics">Mathematics</SelectItem>
                        <SelectItem value="science">Science</SelectItem>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="history">History</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="class">Class</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="9a">Class 9A</SelectItem>
                        <SelectItem value="9b">Class 9B</SelectItem>
                        <SelectItem value="10a">Class 10A</SelectItem>
                        <SelectItem value="11c">Class 11C</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Input id="duration" type="number" placeholder="60" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="total-marks">Total Marks</Label>
                    <Input id="total-marks" type="number" placeholder="100" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Assessment Type</Label>
                  <RadioGroup defaultValue="exam">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="exam" id="exam" />
                      <Label htmlFor="exam">Formal Exam</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="quiz" id="quiz" />
                      <Label htmlFor="quiz">Quiz</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="assignment" id="assignment" />
                      <Label htmlFor="assignment">Assignment</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-3">
                  <Label>Anti-Cheating Features</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {antiCheatFeatures.map((feature) => (
                      <div key={feature.id} className="flex items-center space-x-2">
                        <Checkbox id={feature.id} />
                        <Label htmlFor={feature.id} className="text-sm">{feature.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="auto-grade" />
                  <Label htmlFor="auto-grade">Enable Auto-Grading</Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateAssessmentOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateAssessment}>Create Assessment</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
          <TabsTrigger value="question-bank">Question Bank</TabsTrigger>
          <TabsTrigger value="auto-grading">Auto-Grading</TabsTrigger>
          <TabsTrigger value="anti-cheat">Anti-Cheat</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Assessments Tab */}
        <TabsContent value="assessments" className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search assessments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="online exam">Online Exam</SelectItem>
                <SelectItem value="quiz">Quiz</SelectItem>
                <SelectItem value="essay">Essay</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Assessment</TableHead>
                    <TableHead>Subject/Class</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Participants</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Average Score</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAssessments.map((assessment) => (
                    <TableRow key={assessment.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{assessment.title}</div>
                          <div className="text-sm text-muted-foreground">{assessment.id}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{assessment.subject}</div>
                          <div className="text-sm text-muted-foreground">{assessment.class}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{assessment.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{assessment.duration}m</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{assessment.completed}/{assessment.participants}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(assessment.status)}>
                          {assessment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {assessment.averageScore > 0 ? (
                          <div className="flex items-center gap-2">
                            <span>{assessment.averageScore}%</span>
                            <Progress value={assessment.averageScore} className="w-16 h-2" />
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
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
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Assessment
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <BarChart3 className="mr-2 h-4 w-4" />
                              View Results
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
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

        {/* Question Bank Tab */}
        <TabsContent value="question-bank" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Question Bank</h3>
              <p className="text-sm text-muted-foreground">Manage and organize assessment questions</p>
            </div>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Question
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {questionTypes.map((type) => (
              <Card key={type.value} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <type.icon className="h-5 w-5" />
                    {type.label}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Create {type.label.toLowerCase()} questions for your assessments
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Create Question
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Auto-Grading Tab */}
        <TabsContent value="auto-grading" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                AI-Powered Auto-Grading
              </CardTitle>
              <CardDescription>
                Configure automatic grading settings for different question types
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-medium">Multiple Choice & True/False</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Auto-grade immediately</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Show correct answers after submission</span>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Essay & Short Answer</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">AI essay grading</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Plagiarism detection</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Grammar & spelling check</span>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
