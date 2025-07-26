"use client"

import React, { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
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
import { DataTable } from "@/components/ui/data-table"
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
import { healthApi, studentsApi } from "@/src/lib/api"
import { toast } from "@/src/components/ui/use-toast"
import { z } from "zod"
import {
  Heart,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Calendar as CalendarIcon,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Pill,
  Thermometer,
  Activity,
  Shield,
  Phone,
  User,
  FileText,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Stethoscope,
  Syringe,
  Clipboard,
  TrendingUp,
  TrendingDown,
  Loader2,
} from "lucide-react"

// Validation schemas
const healthRecordSchema = z.object({
  studentId: z.string().min(1, "Student is required"),
  type: z.enum(["illness", "injury", "allergy", "medication", "checkup", "other"]),
  title: z.string().min(1, "Title is required").max(255, "Title must be less than 255 characters"),
  description: z.string().max(2000, "Description must be less than 2000 characters").optional(),
  dateRecorded: z.string().min(1, "Date is required"),
  severity: z.enum(["low", "medium", "high", "critical"]).optional(),
  treatment: z.string().max(1000, "Treatment must be less than 1000 characters").optional(),
  followUpRequired: z.boolean().optional(),
  followUpDate: z.string().optional(),
})

const vaccinationSchema = z.object({
  studentId: z.string().min(1, "Student is required"),
  vaccineName: z.string().min(1, "Vaccine name is required"),
  dateAdministered: z.string().min(1, "Date is required"),
  doseNumber: z.number().min(1, "Dose number is required"),
  administeredBy: z.string().min(1, "Administrator is required"),
  batchNumber: z.string().optional(),
  nextDueDate: z.string().optional(),
  sideEffects: z.string().optional(),
  notes: z.string().optional(),
})

const nurseVisitSchema = z.object({
  studentId: z.string().min(1, "Student is required"),
  visitDate: z.string().min(1, "Date is required"),
  reason: z.string().min(1, "Reason is required"),
  symptoms: z.string().optional(),
  treatment: z.string().optional(),
  medication: z.string().optional(),
  temperature: z.string().optional(),
  bloodPressure: z.string().optional(),
  pulse: z.string().optional(),
  weight: z.string().optional(),
  height: z.string().optional(),
  notes: z.string().optional(),
  parentNotified: z.boolean().optional(),
  sentHome: z.boolean().optional(),
})

type HealthRecordFormData = z.infer<typeof healthRecordSchema>
type VaccinationFormData = z.infer<typeof vaccinationSchema>
type NurseVisitFormData = z.infer<typeof nurseVisitSchema>

// Interfaces
interface Student {
  id: string
  student_id: string
  first_name: string
  last_name: string
  email?: string
  class_name?: string
  profile_picture?: string
}

interface HealthRecord {
  id: string
  student_id: string
  type: string
  title: string
  description?: string
  date_recorded: string
  severity?: string
  treatment?: string
  follow_up_required?: boolean
  follow_up_date?: string
  created_at: string
  updated_at: string
  student_name?: string
  student_class?: string
}

interface Vaccination {
  id: string
  student_id: string
  vaccine_name: string
  date_administered: string
  dose_number: number
  administered_by: string
  batch_number?: string
  next_due_date?: string
  side_effects?: string
  notes?: string
  created_at: string
  student_name?: string
}

interface NurseVisit {
  id: string
  student_id: string
  visit_date: string
  reason: string
  symptoms?: string
  treatment?: string
  medication?: string
  temperature?: string
  blood_pressure?: string
  pulse?: string
  weight?: string
  height?: string
  notes?: string
  parent_notified?: boolean
  sent_home?: boolean
  created_at: string
  student_name?: string
}

// Sample health records data (fallback)
const sampleHealthRecords = [
  {
    id: "STU001",
    name: "Emma Thompson",
    class: "10A",
    avatar: "/placeholder.svg",
    bloodType: "A+",
    height: "5'4\"",
    weight: "120 lbs",
    bmi: 20.6,
    allergies: ["Peanuts", "Shellfish"],
    medications: ["Inhaler (Albuterol)"],
    medicalConditions: ["Mild Asthma"],
    emergencyContacts: [
      { name: "David Thompson", relation: "Father", phone: "+1 (555) 123-4567" },
      { name: "Sarah Thompson", relation: "Mother", phone: "+1 (555) 123-4568" },
    ],
    vaccinations: [
      { vaccine: "COVID-19", date: "2024-01-15", nextDue: "2024-07-15", status: "current" },
      { vaccine: "Flu Shot", date: "2023-10-01", nextDue: "2024-10-01", status: "due" },
      { vaccine: "Tetanus", date: "2022-03-15", nextDue: "2032-03-15", status: "current" },
    ],
    nurseVisits: [
      { date: "2024-04-15", time: "10:30 AM", reason: "Headache", treatment: "Rest and water", nurse: "Nurse Johnson" },
      { date: "2024-04-10", time: "2:15 PM", reason: "Minor cut", treatment: "Cleaned and bandaged", nurse: "Nurse Smith" },
    ],
    healthScreenings: [
      { type: "Vision", date: "2024-03-01", result: "20/20", status: "normal" },
      { type: "Hearing", date: "2024-03-01", result: "Normal", status: "normal" },
      { type: "Dental", date: "2024-02-15", result: "Good oral health", status: "normal" },
    ],
  },
  {
    id: "STU002",
    name: "James Wilson",
    class: "9B",
    avatar: "/placeholder.svg",
    bloodType: "O-",
    height: "5'2\"",
    weight: "110 lbs",
    bmi: 20.1,
    allergies: ["None known"],
    medications: ["None"],
    medicalConditions: ["None"],
    emergencyContacts: [
      { name: "Robert Wilson", relation: "Father", phone: "+1 (555) 234-5678" },
      { name: "Lisa Wilson", relation: "Mother", phone: "+1 (555) 234-5679" },
    ],
    vaccinations: [
      { vaccine: "COVID-19", date: "2024-02-01", nextDue: "2024-08-01", status: "current" },
      { vaccine: "Flu Shot", date: "2023-09-15", nextDue: "2024-09-15", status: "due" },
      { vaccine: "Tetanus", date: "2021-05-20", nextDue: "2031-05-20", status: "current" },
    ],
    nurseVisits: [
      { date: "2024-04-12", time: "11:45 AM", reason: "Stomach ache", treatment: "Rest and observation", nurse: "Nurse Johnson" },
    ],
    healthScreenings: [
      { type: "Vision", date: "2024-03-01", result: "20/25", status: "monitor" },
      { type: "Hearing", date: "2024-03-01", result: "Normal", status: "normal" },
      { type: "BMI", date: "2024-03-15", result: "20.1", status: "normal" },
    ],
  },
]

const vaccinationReminders = [
  { student: "Emma Thompson", vaccine: "Flu Shot", dueDate: "2024-10-01", priority: "medium" },
  { student: "James Wilson", vaccine: "Flu Shot", dueDate: "2024-09-15", priority: "high" },
  { student: "Sophia Martinez", vaccine: "COVID-19 Booster", dueDate: "2024-05-15", priority: "high" },
]

export function HealthRecords() {
  const [activeTab, setActiveTab] = useState("records")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedClass, setSelectedClass] = useState("all")
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [isStudentDetailOpen, setIsStudentDetailOpen] = useState(false)
  const [isAddRecordOpen, setIsAddRecordOpen] = useState(false)
  const [isNurseVisitOpen, setIsNurseVisitOpen] = useState(false)
  const [isVaccinationOpen, setIsVaccinationOpen] = useState(false)

  // Data state
  const [students, setStudents] = useState<Student[]>([])
  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>([])
  const [vaccinations, setVaccinations] = useState<Vaccination[]>([])
  const [nurseVisits, setNurseVisits] = useState<NurseVisit[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  // Pagination
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  })

  // Forms
  const healthRecordForm = useForm<HealthRecordFormData>({
    resolver: zodResolver(healthRecordSchema),
  })

  const vaccinationForm = useForm<VaccinationFormData>({
    resolver: zodResolver(vaccinationSchema),
  })

  const nurseVisitForm = useForm<NurseVisitFormData>({
    resolver: zodResolver(nurseVisitSchema),
  })

  // Fetch data
  useEffect(() => {
    fetchStudents()
    fetchHealthRecords()
  }, [])

  const fetchStudents = async () => {
    try {
      const response = await studentsApi.getAll({ limit: 1000 })
      setStudents(response.data || [])
    } catch (error) {
      console.error('Error fetching students:', error)
      toast({
        title: "Error",
        description: "Failed to fetch students",
        variant: "destructive",
      })
    }
  }

  const fetchHealthRecords = async (page = 1, limit = 10) => {
    try {
      setLoading(true)
      const response = await healthApi.getAll({
        page,
        limit,
        search: searchTerm,
      })
      setHealthRecords(response.data || [])
      setPagination({
        currentPage: response.pagination?.currentPage || 1,
        totalPages: response.pagination?.totalPages || 1,
        totalItems: response.pagination?.totalItems || 0,
        itemsPerPage: response.pagination?.itemsPerPage || 10,
      })
    } catch (error) {
      console.error('Error fetching health records:', error)
      toast({
        title: "Error",
        description: "Failed to fetch health records",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchVaccinations = async () => {
    try {
      // This would need to be implemented as a general endpoint
      // For now, we'll fetch for each student individually
      const allVaccinations: Vaccination[] = []
      for (const student of students) {
        try {
          const vaccinations = await healthApi.getVaccinations(student.id)
          allVaccinations.push(...vaccinations)
        } catch (error) {
          // Continue with other students if one fails
        }
      }
      setVaccinations(allVaccinations)
    } catch (error) {
      console.error('Error fetching vaccinations:', error)
    }
  }

  const fetchNurseVisits = async () => {
    try {
      // This would need to be implemented as a general endpoint
      // For now, we'll fetch for each student individually
      const allNurseVisits: NurseVisit[] = []
      for (const student of students) {
        try {
          const visits = await healthApi.getNurseVisits(student.id)
          allNurseVisits.push(...visits.data || [])
        } catch (error) {
          // Continue with other students if one fails
        }
      }
      setNurseVisits(allNurseVisits)
    } catch (error) {
      console.error('Error fetching nurse visits:', error)
    }
  }

  // Handle form submissions
  const handleCreateHealthRecord = async (data: HealthRecordFormData) => {
    try {
      setSubmitting(true)
      await healthApi.createRecord(data)
      toast({
        title: "Success",
        description: "Health record created successfully",
      })
      setIsAddRecordOpen(false)
      healthRecordForm.reset()
      fetchHealthRecords()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create health record",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleCreateVaccination = async (data: VaccinationFormData) => {
    try {
      setSubmitting(true)
      await healthApi.recordVaccination(data)
      toast({
        title: "Success",
        description: "Vaccination recorded successfully",
      })
      setIsVaccinationOpen(false)
      vaccinationForm.reset()
      fetchVaccinations()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to record vaccination",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleCreateNurseVisit = async (data: NurseVisitFormData) => {
    try {
      setSubmitting(true)
      await healthApi.recordNurseVisit(data)
      toast({
        title: "Success",
        description: "Nurse visit recorded successfully",
      })
      setIsNurseVisitOpen(false)
      nurseVisitForm.reset()
      fetchNurseVisits()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to record nurse visit",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  // Filter health records
  const filteredRecords = healthRecords.filter((record) => {
    const matchesSearch = record.student_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.title.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const handleViewStudent = (student: Student) => {
    setSelectedStudent(student)
    setIsStudentDetailOpen(true)
  }

  // Search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchHealthRecords(1, pagination.itemsPerPage)
    }, 300)
    return () => clearTimeout(timeoutId)
  }, [searchTerm])

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "current": return "outline"
      case "due": return "destructive"
      case "overdue": return "destructive"
      case "normal": return "outline"
      case "monitor": return "secondary"
      default: return "outline"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-600"
      case "medium": return "text-yellow-600"
      case "low": return "text-green-600"
      default: return "text-gray-600"
    }
  }

  const getSeverityColor = (severity?: string) => {
    switch (severity) {
      case "critical": return "text-red-600"
      case "high": return "text-orange-600"
      case "medium": return "text-yellow-600"
      case "low": return "text-green-600"
      default: return "text-gray-600"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Health & Medical Records</h2>
          <p className="text-muted-foreground">Manage student health information and medical records</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Records
          </Button>
          <Dialog open={isVaccinationOpen} onOpenChange={setIsVaccinationOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Syringe className="mr-2 h-4 w-4" />
                Record Vaccination
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Record Vaccination</DialogTitle>
                <DialogDescription>Record a new vaccination for a student</DialogDescription>
              </DialogHeader>
              <form onSubmit={vaccinationForm.handleSubmit(handleCreateVaccination)}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="vaccination-student">Student</Label>
                      <Select onValueChange={(value) => vaccinationForm.setValue('studentId', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select student" />
                        </SelectTrigger>
                        <SelectContent>
                          {students.map((student) => (
                            <SelectItem key={student.id} value={student.id}>
                              {student.first_name} {student.last_name} - {student.class_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vaccine-name">Vaccine Name</Label>
                      <Input
                        id="vaccine-name"
                        {...vaccinationForm.register('vaccineName')}
                        placeholder="e.g., COVID-19, Flu Shot"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date-administered">Date Administered</Label>
                      <Input
                        id="date-administered"
                        type="date"
                        {...vaccinationForm.register('dateAdministered')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dose-number">Dose Number</Label>
                      <Input
                        id="dose-number"
                        type="number"
                        min="1"
                        {...vaccinationForm.register('doseNumber', { valueAsNumber: true })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="administered-by">Administered By</Label>
                      <Input
                        id="administered-by"
                        {...vaccinationForm.register('administeredBy')}
                        placeholder="Healthcare provider"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="batch-number">Batch Number (Optional)</Label>
                      <Input
                        id="batch-number"
                        {...vaccinationForm.register('batchNumber')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="next-due-date">Next Due Date (Optional)</Label>
                      <Input
                        id="next-due-date"
                        type="date"
                        {...vaccinationForm.register('nextDueDate')}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vaccination-notes">Notes (Optional)</Label>
                    <Textarea
                      id="vaccination-notes"
                      {...vaccinationForm.register('notes')}
                      placeholder="Any additional notes..."
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsVaccinationOpen(false)}
                    disabled={submitting}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={submitting}>
                    {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Record Vaccination
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          <Dialog open={isAddRecordOpen} onOpenChange={setIsAddRecordOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Health Record
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add Health Record</DialogTitle>
                <DialogDescription>Add new health information for a student</DialogDescription>
              </DialogHeader>
              <form onSubmit={healthRecordForm.handleSubmit(handleCreateHealthRecord)}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="health-student">Student</Label>
                      <Select onValueChange={(value) => healthRecordForm.setValue('studentId', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select student" />
                        </SelectTrigger>
                        <SelectContent>
                          {students.map((student) => (
                            <SelectItem key={student.id} value={student.id}>
                              {student.first_name} {student.last_name} - {student.class_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="record-type">Record Type</Label>
                      <Select onValueChange={(value) => healthRecordForm.setValue('type', value as any)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="illness">Illness</SelectItem>
                          <SelectItem value="injury">Injury</SelectItem>
                          <SelectItem value="allergy">Allergy</SelectItem>
                          <SelectItem value="medication">Medication</SelectItem>
                          <SelectItem value="checkup">Checkup</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="health-title">Title</Label>
                    <Input
                      id="health-title"
                      {...healthRecordForm.register('title')}
                      placeholder="Brief description of the health record"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="health-description">Description</Label>
                    <Textarea
                      id="health-description"
                      {...healthRecordForm.register('description')}
                      placeholder="Detailed description..."
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="health-date">Date Recorded</Label>
                      <Input
                        id="health-date"
                        type="date"
                        {...healthRecordForm.register('dateRecorded')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="health-severity">Severity</Label>
                      <Select onValueChange={(value) => healthRecordForm.setValue('severity', value as any)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select severity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="critical">Critical</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="follow-up-date">Follow-up Date</Label>
                      <Input
                        id="follow-up-date"
                        type="date"
                        {...healthRecordForm.register('followUpDate')}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="health-treatment">Treatment</Label>
                    <Textarea
                      id="health-treatment"
                      {...healthRecordForm.register('treatment')}
                      placeholder="Treatment provided..."
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsAddRecordOpen(false)}
                    disabled={submitting}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={submitting}>
                    {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Add Record
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="records">Health Records</TabsTrigger>
          <TabsTrigger value="vaccinations">Vaccinations</TabsTrigger>
          <TabsTrigger value="nurse-visits">Nurse Visits</TabsTrigger>
          <TabsTrigger value="screenings">Health Screenings</TabsTrigger>
          <TabsTrigger value="emergency">Emergency Info</TabsTrigger>
        </TabsList>

        {/* Health Records Tab */}
        <TabsContent value="records" className="space-y-4">
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
          </div>

          {loading ? (
            <Card>
              <CardContent className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="ml-2">Loading health records...</span>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Treatment</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRecords.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                          No health records found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredRecords.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell>
                            <div className="font-medium">{record.student_name}</div>
                            <div className="text-sm text-muted-foreground">{record.student_class}</div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="capitalize">
                              {record.type}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">{record.title}</div>
                            {record.description && (
                              <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                                {record.description}
                              </div>
                            )}
                          </TableCell>
                          <TableCell>{formatDate(record.date_recorded)}</TableCell>
                          <TableCell>
                            {record.severity && (
                              <Badge
                                variant={record.severity === 'critical' || record.severity === 'high' ? 'destructive' : 'secondary'}
                                className="capitalize"
                              >
                                {record.severity}
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            {record.treatment && (
                              <div className="text-sm truncate max-w-[150px]">
                                {record.treatment}
                              </div>
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
                                  Edit Record
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setIsNurseVisitOpen(true)}>
                                  <Stethoscope className="mr-2 h-4 w-4" />
                                  Add Nurse Visit
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Download className="mr-2 h-4 w-4" />
                                  Export Record
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Vaccinations Tab */}
        <TabsContent value="vaccinations" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Syringe className="h-5 w-5" />
                  Vaccination Reminders
                </CardTitle>
                <CardDescription>Students with upcoming or overdue vaccinations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {vaccinationReminders.map((reminder, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{reminder.student}</div>
                        <div className="text-sm text-muted-foreground">{reminder.vaccine}</div>
                        <div className="text-xs text-muted-foreground">Due: {reminder.dueDate}</div>
                      </div>
                      <Badge variant={reminder.priority === "high" ? "destructive" : "secondary"}>
                        {reminder.priority}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Vaccination Statistics</CardTitle>
                <CardDescription>School-wide vaccination compliance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>COVID-19 Vaccination</span>
                    <span className="font-medium">95%</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Flu Shot (Current Season)</span>
                    <span className="font-medium">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Tetanus/Diphtheria</span>
                    <span className="font-medium">98%</span>
                  </div>
                  <Progress value={98} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
