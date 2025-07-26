import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Upload, Plus, FileSpreadsheet } from "lucide-react"
import { TeacherGradeDistribution } from "@/components/teacher/teacher-grade-distribution"

export default function TeacherGradesPage() {
  // Mock data for grades
  const classes = [
    { id: 1, name: "Class 9A", subject: "Mathematics" },
    { id: 2, name: "Class 10B", subject: "Mathematics" },
    { id: 3, name: "Class 11C", subject: "Physics" },
  ]

  const students = [
    { id: 1, name: "John Smith", classId: 1, assignments: 85, midterm: 78, final: 92, total: 85 },
    { id: 2, name: "Sarah Johnson", classId: 1, assignments: 92, midterm: 88, final: 95, total: 92 },
    { id: 3, name: "Michael Brown", classId: 1, assignments: 78, midterm: 72, final: 80, total: 77 },
    { id: 4, name: "Emily Davis", classId: 1, assignments: 90, midterm: 85, final: 88, total: 88 },
    { id: 5, name: "David Wilson", classId: 1, assignments: 82, midterm: 79, final: 85, total: 82 },
    { id: 6, name: "Jessica Taylor", classId: 2, assignments: 88, midterm: 92, final: 90, total: 90 },
    { id: 7, name: "Daniel Martinez", classId: 2, assignments: 75, midterm: 70, final: 78, total: 74 },
    { id: 8, name: "Sophia Anderson", classId: 2, assignments: 95, midterm: 90, final: 96, total: 94 },
    { id: 9, name: "James Thomas", classId: 3, assignments: 80, midterm: 75, final: 82, total: 79 },
    { id: 10, name: "Olivia Jackson", classId: 3, assignments: 87, midterm: 84, final: 89, total: 87 },
  ]

  const assessments = [
    { id: 1, name: "Quiz 1", classId: 1, date: "2023-09-15", maxScore: 20 },
    { id: 2, name: "Assignment 1", classId: 1, date: "2023-09-22", maxScore: 50 },
    { id: 3, name: "Midterm Exam", classId: 1, date: "2023-10-15", maxScore: 100 },
    { id: 4, name: "Quiz 2", classId: 1, date: "2023-11-05", maxScore: 20 },
    { id: 5, name: "Final Project", classId: 1, date: "2023-11-25", maxScore: 100 },
    { id: 6, name: "Final Exam", classId: 1, date: "2023-12-10", maxScore: 100 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Grades Management</h2>
          <p className="text-muted-foreground">Manage and track student grades for your classes</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New Assessment
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="col-span-4 md:col-span-1">
          <CardHeader>
            <CardTitle>Select Class</CardTitle>
            <CardDescription>Choose a class to view and manage grades</CardDescription>
          </CardHeader>
          <CardContent>
            <Select defaultValue="1">
              <SelectTrigger>
                <SelectValue placeholder="Select a class" />
              </SelectTrigger>
              <SelectContent>
                {classes.map((cls) => (
                  <SelectItem key={cls.id} value={cls.id.toString()}>
                    {cls.name} - {cls.subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="mt-6 space-y-4">
              <h4 className="text-sm font-medium">Assessments</h4>
              <div className="space-y-2">
                {assessments.map((assessment) => (
                  <div key={assessment.id} className="flex items-center justify-between rounded-md border p-2 text-sm">
                    <div>
                      <div className="font-medium">{assessment.name}</div>
                      <div className="text-xs text-muted-foreground">{assessment.date}</div>
                    </div>
                    <div className="text-xs">{assessment.maxScore} pts</div>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add Assessment
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="col-span-4 md:col-span-3 space-y-6">
          <Tabs defaultValue="students">
            <TabsList>
              <TabsTrigger value="students">Student Grades</TabsTrigger>
              <TabsTrigger value="assessments">Assessment Grades</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            <TabsContent value="students" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Class 9A - Mathematics</CardTitle>
                  <CardDescription>Manage individual student grades</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead className="text-right">Assignments (30%)</TableHead>
                        <TableHead className="text-right">Midterm (30%)</TableHead>
                        <TableHead className="text-right">Final (40%)</TableHead>
                        <TableHead className="text-right">Total Grade</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {students
                        .filter((student) => student.classId === 1)
                        .map((student) => (
                          <TableRow key={student.id}>
                            <TableCell>{student.name}</TableCell>
                            <TableCell className="text-right">{student.assignments}</TableCell>
                            <TableCell className="text-right">{student.midterm}</TableCell>
                            <TableCell className="text-right">{student.final}</TableCell>
                            <TableCell className="font-medium text-right">{student.total}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              <div className="flex justify-end gap-2">
                <Button variant="outline">
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  Export Class Grades
                </Button>
                <Button>Save Changes</Button>
              </div>
            </TabsContent>
            <TabsContent value="assessments">
              <Card>
                <CardHeader>
                  <CardTitle>Assessment Grades</CardTitle>
                  <CardDescription>View and edit grades by assessment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <Select defaultValue="3">
                      <SelectTrigger>
                        <SelectValue placeholder="Select an assessment" />
                      </SelectTrigger>
                      <SelectContent>
                        {assessments.map((assessment) => (
                          <SelectItem key={assessment.id} value={assessment.id.toString()}>
                            {assessment.name} ({assessment.date})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead className="text-right">Score</TableHead>
                        <TableHead className="text-right">Out of</TableHead>
                        <TableHead className="text-right">Percentage</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {students
                        .filter((student) => student.classId === 1)
                        .map((student) => (
                          <TableRow key={student.id}>
                            <TableCell>{student.name}</TableCell>
                            <TableCell className="text-right">78</TableCell>
                            <TableCell className="text-right">100</TableCell>
                            <TableCell className="text-right">78%</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle>Grade Analytics</CardTitle>
                  <CardDescription>Performance analytics for Class 9A - Mathematics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <TeacherGradeDistribution />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
