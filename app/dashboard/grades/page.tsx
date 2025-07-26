import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Settings } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function GradesPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Grades</h2>
        <Button>
          <Settings className="mr-2 h-4 w-4" />
          Grade Settings
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Grade A Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-muted-foreground">11% of total students</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Grade B Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">36% of total students</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Grade C Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">195</div>
            <p className="text-xs text-muted-foreground">45% of total students</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Below Grade C</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">39</div>
            <p className="text-xs text-muted-foreground">8% of total students</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Grade Management</CardTitle>
          <CardDescription>View and manage grading system and student grades</CardDescription>
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search by student or subject..." className="pl-8" />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  <SelectItem value="10a">Grade 10A</SelectItem>
                  <SelectItem value="10b">Grade 10B</SelectItem>
                  <SelectItem value="11a">Grade 11A</SelectItem>
                  <SelectItem value="11b">Grade 11B</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  <SelectItem value="math">Mathematics</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="science">Science</SelectItem>
                  <SelectItem value="history">History</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Grade</TableHead>
                <TableHead>Score Range</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>GPA Value</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Percentage</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">A+</TableCell>
                <TableCell>95-100%</TableCell>
                <TableCell>Outstanding</TableCell>
                <TableCell>4.0</TableCell>
                <TableCell>18</TableCell>
                <TableCell>4%</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">A</TableCell>
                <TableCell>90-94%</TableCell>
                <TableCell>Excellent</TableCell>
                <TableCell>4.0</TableCell>
                <TableCell>30</TableCell>
                <TableCell>7%</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">B+</TableCell>
                <TableCell>85-89%</TableCell>
                <TableCell>Very Good</TableCell>
                <TableCell>3.5</TableCell>
                <TableCell>56</TableCell>
                <TableCell>13%</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">B</TableCell>
                <TableCell>80-84%</TableCell>
                <TableCell>Good</TableCell>
                <TableCell>3.0</TableCell>
                <TableCell>100</TableCell>
                <TableCell>23%</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">C+</TableCell>
                <TableCell>75-79%</TableCell>
                <TableCell>Above Average</TableCell>
                <TableCell>2.5</TableCell>
                <TableCell>95</TableCell>
                <TableCell>22%</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
