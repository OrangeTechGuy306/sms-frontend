import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Download, Filter, Eye, Mail } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function TeacherStudentsPage() {
  // Mock data for students
  const students = [
    {
      id: 1,
      name: "John Smith",
      class: "Class 9A",
      subject: "Mathematics",
      attendance: "95%",
      grade: "A",
      email: "john.smith@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      class: "Class 9A",
      subject: "Mathematics",
      attendance: "92%",
      grade: "A",
      email: "sarah.johnson@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Michael Brown",
      class: "Class 9A",
      subject: "Mathematics",
      attendance: "85%",
      grade: "B",
      email: "michael.brown@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "Emily Davis",
      class: "Class 9A",
      subject: "Mathematics",
      attendance: "90%",
      grade: "A",
      email: "emily.davis@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      name: "David Wilson",
      class: "Class 9A",
      subject: "Mathematics",
      attendance: "88%",
      grade: "B",
      email: "david.wilson@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 6,
      name: "Jessica Taylor",
      class: "Class 10B",
      subject: "Mathematics",
      attendance: "94%",
      grade: "A",
      email: "jessica.taylor@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 7,
      name: "Daniel Martinez",
      class: "Class 10B",
      subject: "Mathematics",
      attendance: "82%",
      grade: "C",
      email: "daniel.martinez@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 8,
      name: "Sophia Anderson",
      class: "Class 10B",
      subject: "Mathematics",
      attendance: "96%",
      grade: "A",
      email: "sophia.anderson@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 9,
      name: "James Thomas",
      class: "Class 11C",
      subject: "Physics",
      attendance: "89%",
      grade: "B",
      email: "james.thomas@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 10,
      name: "Olivia Jackson",
      class: "Class 11C",
      subject: "Physics",
      attendance: "93%",
      grade: "A",
      email: "olivia.jackson@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  // Mock data for classes
  const classes = [
    { id: 1, name: "Class 9A", subject: "Mathematics", students: 25 },
    { id: 2, name: "Class 10B", subject: "Mathematics", students: 28 },
    { id: 3, name: "Class 11C", subject: "Physics", students: 22 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Students</h2>
          <p className="text-muted-foreground">Manage and view students in your classes</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Mail className="mr-2 h-4 w-4" />
            Message All
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <TabsList>
            <TabsTrigger value="all">All Students</TabsTrigger>
            <TabsTrigger value="9a">Class 9A</TabsTrigger>
            <TabsTrigger value="10b">Class 10B</TabsTrigger>
            <TabsTrigger value="11c">Class 11C</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search students..."
                className="w-full min-w-[200px] pl-8 md:w-[200px] lg:w-[300px]"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Select defaultValue="all">
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Grades</SelectItem>
                <SelectItem value="a">Grade A</SelectItem>
                <SelectItem value="b">Grade B</SelectItem>
                <SelectItem value="c">Grade C</SelectItem>
                <SelectItem value="d">Grade D</SelectItem>
                <SelectItem value="f">Grade F</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="all" className="mt-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>All Students</CardTitle>
              <CardDescription>Students across all your classes</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                          <AvatarFallback>
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-sm text-muted-foreground">{student.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{student.class}</TableCell>
                      <TableCell>{student.subject}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            Number.parseInt(student.attendance) >= 90
                              ? "default"
                              : Number.parseInt(student.attendance) >= 85
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {student.attendance}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={student.grade === "A" ? "default" : student.grade === "B" ? "secondary" : "outline"}
                        >
                          {student.grade}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="9a" className="mt-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Class 9A - Mathematics</CardTitle>
              <CardDescription>Students in Class 9A</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students
                    .filter((student) => student.class === "Class 9A")
                    .map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                            <AvatarFallback>
                              {student.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{student.name}</div>
                            <div className="text-sm text-muted-foreground">{student.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              Number.parseInt(student.attendance) >= 90
                                ? "default"
                                : Number.parseInt(student.attendance) >= 85
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {student.attendance}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              student.grade === "A" ? "default" : student.grade === "B" ? "secondary" : "outline"
                            }
                          >
                            {student.grade}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="10b" className="mt-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Class 10B - Mathematics</CardTitle>
              <CardDescription>Students in Class 10B</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students
                    .filter((student) => student.class === "Class 10B")
                    .map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                            <AvatarFallback>
                              {student.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{student.name}</div>
                            <div className="text-sm text-muted-foreground">{student.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              Number.parseInt(student.attendance) >= 90
                                ? "default"
                                : Number.parseInt(student.attendance) >= 85
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {student.attendance}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              student.grade === "A" ? "default" : student.grade === "B" ? "secondary" : "outline"
                            }
                          >
                            {student.grade}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="11c" className="mt-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Class 11C - Physics</CardTitle>
              <CardDescription>Students in Class 11C</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students
                    .filter((student) => student.class === "Class 11C")
                    .map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                            <AvatarFallback>
                              {student.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{student.name}</div>
                            <div className="text-sm text-muted-foreground">{student.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              Number.parseInt(student.attendance) >= 90
                                ? "default"
                                : Number.parseInt(student.attendance) >= 85
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {student.attendance}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              student.grade === "A" ? "default" : student.grade === "B" ? "secondary" : "outline"
                            }
                          >
                            {student.grade}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
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
