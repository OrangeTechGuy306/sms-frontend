import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, CalendarIcon } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function TeacherSchedulePage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Teacher Schedule</h2>
        <div className="flex gap-2">
          <Button variant="outline">
            <CalendarIcon className="mr-2 h-4 w-4" />
            View Calendar
          </Button>
          <Button>Generate Schedule</Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Teacher Schedule Management</CardTitle>
          <CardDescription>View and manage teaching schedules for all teachers</CardDescription>
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search by teacher name..." className="pl-8" />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="science">Science</SelectItem>
                  <SelectItem value="math">Mathematics</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="history">History</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="current">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Term" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">Current Term</SelectItem>
                  <SelectItem value="next">Next Term</SelectItem>
                  <SelectItem value="previous">Previous Term</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Teacher</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Monday</TableHead>
                <TableHead>Tuesday</TableHead>
                <TableHead>Wednesday</TableHead>
                <TableHead>Thursday</TableHead>
                <TableHead>Friday</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">
                    {
                      [
                        "Dr. Robert Wilson",
                        "Prof. Elizabeth Taylor",
                        "Mr. Thomas Anderson",
                        "Mrs. Patricia Clark",
                        "Ms. Jennifer Lee",
                      ][i]
                    }
                  </TableCell>
                  <TableCell>{["Mathematics", "English", "Physics", "History", "Computer Science"][i]}</TableCell>
                  <TableCell>
                    {
                      [
                        "Grade 10A (8-9:30), Grade 11B (11-12:30)",
                        "Grade 9A (9-10:30), Grade 12B (1-2:30)",
                        "Grade 11A (8-9:30), Grade 12A (11-12:30)",
                        "Grade 10B (10-11:30), Grade 9B (1-2:30)",
                        "Grade 10A (10-11:30), Grade 11A (2-3:30)",
                      ][i]
                    }
                  </TableCell>
                  <TableCell>
                    {
                      [
                        "Grade 9B (10-11:30), Office Hours (1-3)",
                        "Grade 10B (8-9:30), Grade 11A (11-12:30)",
                        "Office Hours (9-11), Grade 10B (1-2:30)",
                        "Grade 11B (8-9:30), Grade 12A (11-12:30)",
                        "Grade 12B (8-9:30), Office Hours (1-3)",
                      ][i]
                    }
                  </TableCell>
                  <TableCell>
                    {
                      [
                        "Department Meeting (9-10), Grade 12A (1-2:30)",
                        "Grade 11B (10-11:30), Office Hours (1-3)",
                        "Grade 12B (8-9:30), Grade 9A (11-12:30)",
                        "Department Meeting (9-10), Grade 10A (1-2:30)",
                        "Grade 11B (10-11:30), Grade 9B (1-2:30)",
                      ][i]
                    }
                  </TableCell>
                  <TableCell>
                    {
                      [
                        "Grade 11A (8-9:30), Grade 10B (11-12:30)",
                        "Department Meeting (9-10), Grade 9B (1-2:30)",
                        "Grade 10A (10-11:30), Grade 11B (1-2:30)",
                        "Grade 9A (8-9:30), Office Hours (1-3)",
                        "Department Meeting (9-10), Grade 10B (11-12:30)",
                      ][i]
                    }
                  </TableCell>
                  <TableCell>
                    {
                      [
                        "Office Hours (9-11), Grade 9A (1-2:30)",
                        "Grade 12A (8-9:30), Grade 10A (11-12:30)",
                        "Grade 9B (10-11:30), Department Meeting (1-2)",
                        "Grade 12B (10-11:30), Grade 11A (1-2:30)",
                        "Grade 9A (8-9:30), Grade 12A (11-12:30)",
                      ][i]
                    }
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
