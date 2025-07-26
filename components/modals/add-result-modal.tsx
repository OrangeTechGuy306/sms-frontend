"use client"

import type React from "react"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trash2, Plus, CheckCircle2, XCircle } from "lucide-react"
import { Separator } from "@/components/ui/separator"

interface AddResultModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface SubjectResult {
  id: string
  subject: string
  ca1Score: string // 1st Continuous Assessment
  ca2Score: string // 2nd Continuous Assessment
  examScore: string // Exam Score
  totalScore: string // Calculated total
  grade: string // Calculated grade
  status: "Pass" | "Fail" | "" // Calculated status
  comments: string
}

const subjects = [
  "Mathematics",
  "English Literature",
  "Physics",
  "Chemistry",
  "Biology",
  "History",
  "Geography",
  "Computer Science",
  "Art",
  "Physical Education",
  "French",
  "Spanish",
  "Music",
  "Economics",
  "Business Studies",
]

const dummyStudents = [
  { id: "STU-1001", name: "John Doe", class: "Grade 10A" },
  { id: "STU-1002", name: "Jane Smith", class: "Grade 9B" },
  { id: "STU-1003", name: "Alex Johnson", class: "Grade 11C" },
  { id: "STU-1004", name: "Sarah Williams", class: "Grade 10A" },
  { id: "STU-1005", name: "Michael Brown", class: "Grade 12B" },
]

export function AddResultModal({ open, onOpenChange }: AddResultModalProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    studentId: "",
    studentName: "",
    class: "",
    term: "",
  })

  const [subjectResults, setSubjectResults] = useState<SubjectResult[]>([
    {
      id: "1",
      subject: "",
      ca1Score: "",
      ca2Score: "",
      examScore: "",
      totalScore: "",
      grade: "",
      status: "",
      comments: "",
    },
  ])

  useEffect(() => {
    if (!open) {
      // Reset form when modal closes
      setFormData({
        studentId: "",
        studentName: "",
        class: "",
        term: "",
      })
      setSubjectResults([
        {
          id: "1",
          subject: "",
          ca1Score: "",
          ca2Score: "",
          examScore: "",
          totalScore: "",
          grade: "",
          status: "",
          comments: "",
        },
      ])
    }
  }, [open])

  const calculateTotalAndGrade = (ca1: string, ca2: string, exam: string) => {
    const numCa1 = Number.parseFloat(ca1) || 0
    const numCa2 = Number.parseFloat(ca2) || 0
    const numExam = Number.parseFloat(exam) || 0

    // Assuming CA1: 20%, CA2: 20%, Exam: 60%
    const total = numCa1 * 0.2 + numCa2 * 0.2 + numExam * 0.6
    const roundedTotal = Math.round(total * 100) / 100 // Round to 2 decimal places

    let grade = ""
    let status: "Pass" | "Fail" | "" = ""

    if (ca1 === "" || ca2 === "" || exam === "") {
      grade = ""
      status = ""
    } else {
      if (roundedTotal >= 90) {
        grade = "A+"
        status = "Pass"
      } else if (roundedTotal >= 85) {
        grade = "A"
        status = "Pass"
      } else if (roundedTotal >= 80) {
        grade = "B+"
        status = "Pass"
      } else if (roundedTotal >= 75) {
        grade = "B"
        status = "Pass"
      } else if (roundedTotal >= 70) {
        grade = "C+"
        status = "Pass"
      } else if (roundedTotal >= 65) {
        grade = "C"
        status = "Pass"
      } else if (roundedTotal >= 60) {
        grade = "D+"
        status = "Pass"
      } else if (roundedTotal >= 55) {
        grade = "D"
        status = "Pass"
      } else {
        grade = "F"
        status = "Fail"
      }
    }

    return { total: roundedTotal.toFixed(2), grade, status }
  }

  const handleScoreChange = (id: string, field: "ca1Score" | "ca2Score" | "examScore", value: string) => {
    setSubjectResults((prev) =>
      prev.map((result) => {
        if (result.id === id) {
          const updatedResult = { ...result, [field]: value }
          const { total, grade, status } = calculateTotalAndGrade(
            updatedResult.ca1Score,
            updatedResult.ca2Score,
            updatedResult.examScore,
          )
          return { ...updatedResult, totalScore: total, grade, status }
        }
        return result
      }),
    )
  }

  const handleSubjectChange = (id: string, field: keyof SubjectResult, value: string) => {
    setSubjectResults((prev) => prev.map((result) => (result.id === id ? { ...result, [field]: value } : result)))
  }

  const addSubjectResult = () => {
    const newId = (Number.parseInt(subjectResults[subjectResults.length - 1]?.id || "0") + 1).toString()
    setSubjectResults((prev) => [
      ...prev,
      {
        id: newId,
        subject: "",
        ca1Score: "",
        ca2Score: "",
        examScore: "",
        totalScore: "",
        grade: "",
        status: "",
        comments: "",
      },
    ])
  }

  const removeSubjectResult = (id: string) => {
    if (subjectResults.length > 1) {
      setSubjectResults((prev) => prev.filter((result) => result.id !== id))
    }
  }

  const getAvailableSubjects = (currentId: string) => {
    const selectedSubjects = subjectResults
      .filter((result) => result.id !== currentId && result.subject)
      .map((result) => result.subject)

    return subjects.filter((subject) => !selectedSubjects.includes(subject))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate basic form data
    if (!formData.studentId || !formData.term) {
      toast({
        title: "Error",
        description: "Please fill in student and term information.",
        variant: "destructive",
      })
      return
    }

    // Validate subject results
    const validResults = subjectResults.filter((result) => result.subject && result.totalScore)

    if (validResults.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one subject result.",
        variant: "destructive",
      })
      return
    }

    // Validate scores and ensure all parts of total score are filled
    for (const result of validResults) {
      const numCa1 = Number.parseFloat(result.ca1Score)
      const numCa2 = Number.parseFloat(result.ca2Score)
      const numExam = Number.parseFloat(result.examScore)

      if (isNaN(numCa1) || numCa1 < 0 || numCa1 > 100) {
        toast({
          title: "Error",
          description: `Please enter a valid 1st C.A. score (0-100) for ${result.subject}.`,
          variant: "destructive",
        })
        return
      }
      if (isNaN(numCa2) || numCa2 < 0 || numCa2 > 100) {
        toast({
          title: "Error",
          description: `Please enter a valid 2nd C.A. score (0-100) for ${result.subject}.`,
          variant: "destructive",
        })
        return
      }
      if (isNaN(numExam) || numExam < 0 || numExam > 100) {
        toast({
          title: "Error",
          description: `Please enter a valid Exam score (0-100) for ${result.subject}.`,
          variant: "destructive",
        })
        return
      }
    }

    // Check for duplicate subjects
    const subjectNames = validResults.map((r) => r.subject)
    const duplicates = subjectNames.filter((subject, index) => subjectNames.indexOf(subject) !== index)
    if (duplicates.length > 0) {
      toast({
        title: "Error",
        description: `Duplicate subjects found: ${duplicates.join(", ")}`,
        variant: "destructive",
      })
      return
    }

    console.log("Adding results:", {
      student: formData,
      results: validResults,
    })

    toast({
      title: "Success",
      description: `${validResults.length} result(s) have been added successfully.`,
    })

    onOpenChange(false)
  }

  const handleStudentChange = (value: string) => {
    setFormData((prev) => ({ ...prev, studentId: value }))
    const student = dummyStudents.find((s) => s.id === value)
    if (student) {
      setFormData((prev) => ({
        ...prev,
        studentName: student.name,
        class: student.class,
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        studentName: "",
        class: "",
      }))
    }
  }

  const getTotalValidSubjects = useMemo(
    () => subjectResults.filter((r) => r.subject && r.totalScore !== "").length,
    [subjectResults],
  )
  const overallAverageScore = useMemo(() => {
    const validTotalScores = subjectResults
      .filter((r) => r.totalScore !== "")
      .map((r) => Number.parseFloat(r.totalScore))
    if (validTotalScores.length === 0) return 0
    const total = validTotalScores.reduce((sum, score) => sum + score, 0)
    return Math.round((total / validTotalScores.length) * 10) / 10
  }, [subjectResults])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Multiple Results</DialogTitle>
          <DialogDescription>Enter examination results for multiple subjects for a single student.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Student Information */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Student Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="student">Student *</Label>
                  <Select value={formData.studentId} onValueChange={handleStudentChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select student" />
                    </SelectTrigger>
                    <SelectContent>
                      {dummyStudents.map((student) => (
                        <SelectItem key={student.id} value={student.id}>
                          {student.id} - {student.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="class">Class</Label>
                  <Input id="class" value={formData.class} readOnly className="bg-muted" placeholder="Auto-filled" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="term">Term *</Label>
                <Select
                  value={formData.term}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, term: value }))}
                >
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Select term" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="First Term">First Term</SelectItem>
                    <SelectItem value="Second Term">Second Term</SelectItem>
                    <SelectItem value="Third Term">Third Term</SelectItem>
                    <SelectItem value="Final Exam">Final Exam</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Results Summary */}
          {getTotalValidSubjects > 0 && (
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary">
                      {getTotalValidSubjects} Subject{getTotalValidSubjects !== 1 ? "s" : ""}
                    </Badge>
                    <span className="text-muted-foreground">Overall Average: {overallAverageScore}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Subject Results */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Subject Results</CardTitle>
                <Button type="button" variant="outline" size="sm" onClick={addSubjectResult}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Subject
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {subjectResults.map((result, index) => (
                <div key={result.id}>
                  {index > 0 && <Separator className="my-4" />}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Subject {index + 1}</h4>
                      {subjectResults.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSubjectResult(result.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label>Subject *</Label>
                        <Select
                          value={result.subject}
                          onValueChange={(value) => handleSubjectChange(result.id, "subject", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select subject" />
                          </SelectTrigger>
                          <SelectContent>
                            {getAvailableSubjects(result.id).map((subject) => (
                              <SelectItem key={subject} value={subject}>
                                {subject}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>1st C.A. (%) *</Label>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          step="0.1"
                          placeholder="0-100"
                          value={result.ca1Score}
                          onChange={(e) => handleScoreChange(result.id, "ca1Score", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>2nd C.A. (%) *</Label>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          step="0.1"
                          placeholder="0-100"
                          value={result.ca2Score}
                          onChange={(e) => handleScoreChange(result.id, "ca2Score", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Exam Score (%) *</Label>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          step="0.1"
                          placeholder="0-100"
                          value={result.examScore}
                          onChange={(e) => handleScoreChange(result.id, "examScore", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div className="space-y-2">
                        <Label>Total Score (%)</Label>
                        <Input value={result.totalScore} readOnly className="bg-muted" placeholder="Auto-calc" />
                      </div>
                      <div className="space-y-2">
                        <Label>Grade</Label>
                        <Input value={result.grade} readOnly className="bg-muted" placeholder="Auto-calc" />
                      </div>
                      <div className="space-y-2">
                        <Label>Status</Label>
                        <div className="flex items-center h-10">
                          {result.status === "Pass" && (
                            <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                              <CheckCircle2 className="mr-1 h-3 w-3" /> Pass
                            </Badge>
                          )}
                          {result.status === "Fail" && (
                            <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200">
                              <XCircle className="mr-1 h-3 w-3" /> Fail
                            </Badge>
                          )}
                          {result.status === "" && <Badge variant="secondary">N/A</Badge>}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 mt-4">
                      <Label>Comments</Label>
                      <Textarea
                        placeholder="Enter comments for this subject..."
                        value={result.comments}
                        onChange={(e) => handleSubjectChange(result.id, "comments", e.target.value)}
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Add {getTotalValidSubjects} Result{getTotalValidSubjects !== 1 ? "s" : ""}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
