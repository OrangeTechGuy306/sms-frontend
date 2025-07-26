import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Printer } from "lucide-react"

export default function TimetablePage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Timetable</h2>
        <div className="flex gap-2">
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>Generate Timetable</Button>
        </div>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Select defaultValue="10a">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Class" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10a">Grade 10A</SelectItem>
            <SelectItem value="10b">Grade 10B</SelectItem>
            <SelectItem value="11a">Grade 11A</SelectItem>
            <SelectItem value="11b">Grade 11B</SelectItem>
            <SelectItem value="12a">Grade 12A</SelectItem>
            <SelectItem value="12b">Grade 12B</SelectItem>
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
      <Card>
        <CardHeader>
          <CardTitle>Class Timetable - Grade 10A</CardTitle>
          <CardDescription>Weekly schedule for Grade 10A, Fall Term 2023</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Time</TableHead>
                <TableHead>Monday</TableHead>
                <TableHead>Tuesday</TableHead>
                <TableHead>Wednesday</TableHead>
                <TableHead>Thursday</TableHead>
                <TableHead>Friday</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">8:00 - 9:30</TableCell>
                <TableCell>
                  <div className="font-medium">Mathematics</div>
                  <div className="text-xs text-muted-foreground">Dr. Wilson</div>
                  <div className="text-xs text-muted-foreground">Room 101</div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">Physics</div>
                  <div className="text-xs text-muted-foreground">Mr. Anderson</div>
                  <div className="text-xs text-muted-foreground">Lab 3</div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">English</div>
                  <div className="text-xs text-muted-foreground">Prof. Taylor</div>
                  <div className="text-xs text-muted-foreground">Room 205</div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">History</div>
                  <div className="text-xs text-muted-foreground">Mrs. Clark</div>
                  <div className="text-xs text-muted-foreground">Room 302</div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">Computer Science</div>
                  <div className="text-xs text-muted-foreground">Ms. Lee</div>
                  <div className="text-xs text-muted-foreground">Lab 5</div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">9:30 - 10:00</TableCell>
                <TableCell colSpan={5} className="text-center">
                  Break
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">10:00 - 11:30</TableCell>
                <TableCell>
                  <div className="font-medium">Biology</div>
                  <div className="text-xs text-muted-foreground">Dr. Martinez</div>
                  <div className="text-xs text-muted-foreground">Lab 2</div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">Mathematics</div>
                  <div className="text-xs text-muted-foreground">Dr. Wilson</div>
                  <div className="text-xs text-muted-foreground">Room 101</div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">Chemistry</div>
                  <div className="text-xs text-muted-foreground">Mrs. Johnson</div>
                  <div className="text-xs text-muted-foreground">Lab 1</div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">English</div>
                  <div className="text-xs text-muted-foreground">Prof. Taylor</div>
                  <div className="text-xs text-muted-foreground">Room 205</div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">Physical Education</div>
                  <div className="text-xs text-muted-foreground">Coach Davis</div>
                  <div className="text-xs text-muted-foreground">Gym</div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">11:30 - 12:30</TableCell>
                <TableCell colSpan={5} className="text-center">
                  Lunch
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">12:30 - 2:00</TableCell>
                <TableCell>
                  <div className="font-medium">History</div>
                  <div className="text-xs text-muted-foreground">Mrs. Clark</div>
                  <div className="text-xs text-muted-foreground">Room 302</div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">Art</div>
                  <div className="text-xs text-muted-foreground">Ms. Garcia</div>
                  <div className="text-xs text-muted-foreground">Art Studio</div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">Physics</div>
                  <div className="text-xs text-muted-foreground">Mr. Anderson</div>
                  <div className="text-xs text-muted-foreground">Lab 3</div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">Mathematics</div>
                  <div className="text-xs text-muted-foreground">Dr. Wilson</div>
                  <div className="text-xs text-muted-foreground">Room 101</div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">English</div>
                  <div className="text-xs text-muted-foreground">Prof. Taylor</div>
                  <div className="text-xs text-muted-foreground">Room 205</div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">2:00 - 3:30</TableCell>
                <TableCell>
                  <div className="font-medium">Computer Science</div>
                  <div className="text-xs text-muted-foreground">Ms. Lee</div>
                  <div className="text-xs text-muted-foreground">Lab 5</div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">Physical Education</div>
                  <div className="text-xs text-muted-foreground">Coach Davis</div>
                  <div className="text-xs text-muted-foreground">Gym</div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">Music</div>
                  <div className="text-xs text-muted-foreground">Mr. Thompson</div>
                  <div className="text-xs text-muted-foreground">Music Room</div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">Biology</div>
                  <div className="text-xs text-muted-foreground">Dr. Martinez</div>
                  <div className="text-xs text-muted-foreground">Lab 2</div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">Chemistry</div>
                  <div className="text-xs text-muted-foreground">Mrs. Johnson</div>
                  <div className="text-xs text-muted-foreground">Lab 1</div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
