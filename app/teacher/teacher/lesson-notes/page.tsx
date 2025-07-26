import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Plus, Search, Filter, FileText, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function TeacherLessonNotesPage() {
  // Mock data for lesson notes
  const lessonNotes = [
    {
      id: 1,
      title: "Introduction to Algebra",
      subject: "Mathematics",
      class: "Class 9A",
      date: "2023-09-15",
      status: "completed",
      objectives: "Understand basic algebraic expressions and equations",
      resources: "Textbook Chapter 1, Worksheet 1A",
    },
    {
      id: 2,
      title: "Linear Equations",
      subject: "Mathematics",
      class: "Class 9A",
      date: "2023-09-22",
      status: "completed",
      objectives: "Solve linear equations with one variable",
      resources: "Textbook Chapter 2, Online Calculator",
    },
    {
      id: 3,
      title: "Quadratic Equations",
      subject: "Mathematics",
      class: "Class 10B",
      date: "2023-09-25",
      status: "completed",
      objectives: "Understand and solve quadratic equations",
      resources: "Textbook Chapter 5, Quadratic Formula Sheet",
    },
    {
      id: 4,
      title: "Geometry Basics",
      subject: "Mathematics",
      class: "Class 9A",
      date: "2023-10-05",
      status: "upcoming",
      objectives: "Understand basic geometric shapes and properties",
      resources: "Geometry Kit, Textbook Chapter 3",
    },
    {
      id: 5,
      title: "Newton's Laws of Motion",
      subject: "Physics",
      class: "Class 11C",
      date: "2023-10-10",
      status: "upcoming",
      objectives: "Understand and apply Newton's three laws of motion",
      resources: "Physics Lab Equipment, Motion Simulation Software",
    },
    {
      id: 6,
      title: "Trigonometric Functions",
      subject: "Mathematics",
      class: "Class 10B",
      date: "2023-10-15",
      status: "draft",
      objectives: "Understand sine, cosine, and tangent functions",
      resources: "Trigonometry Reference Sheet, Scientific Calculator",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Lesson Notes</h2>
          <p className="text-muted-foreground">Create and manage your lesson plans and notes</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Lesson Note
        </Button>
      </div>

      <Tabs defaultValue="all">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <TabsList>
            <TabsTrigger value="all">All Notes</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="draft">Drafts</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search lesson notes..."
                className="w-full min-w-[200px] pl-8 md:w-[200px] lg:w-[300px]"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Select defaultValue="all">
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                <SelectItem value="9a">Class 9A</SelectItem>
                <SelectItem value="10b">Class 10B</SelectItem>
                <SelectItem value="11c">Class 11C</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="all" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {lessonNotes.map((note) => (
              <Card key={note.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{note.title}</CardTitle>
                    <Badge
                      variant={
                        note.status === "completed" ? "default" : note.status === "upcoming" ? "secondary" : "outline"
                      }
                    >
                      {note.status}
                    </Badge>
                  </div>
                  <CardDescription>
                    {note.subject} - {note.class}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{note.date}</span>
                    </div>
                    <div>
                      <div className="font-medium">Objectives:</div>
                      <p className="text-muted-foreground">{note.objectives}</p>
                    </div>
                    <div>
                      <div className="font-medium">Resources:</div>
                      <p className="text-muted-foreground">{note.resources}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="ghost" size="sm">
                    <FileText className="mr-2 h-4 w-4" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upcoming" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {lessonNotes
              .filter((note) => note.status === "upcoming")
              .map((note) => (
                <Card key={note.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{note.title}</CardTitle>
                      <Badge variant="secondary">upcoming</Badge>
                    </div>
                    <CardDescription>
                      {note.subject} - {note.class}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{note.date}</span>
                      </div>
                      <div>
                        <div className="font-medium">Objectives:</div>
                        <p className="text-muted-foreground">{note.objectives}</p>
                      </div>
                      <div>
                        <div className="font-medium">Resources:</div>
                        <p className="text-muted-foreground">{note.resources}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="ghost" size="sm">
                      <FileText className="mr-2 h-4 w-4" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {lessonNotes
              .filter((note) => note.status === "completed")
              .map((note) => (
                <Card key={note.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{note.title}</CardTitle>
                      <Badge>completed</Badge>
                    </div>
                    <CardDescription>
                      {note.subject} - {note.class}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{note.date}</span>
                      </div>
                      <div>
                        <div className="font-medium">Objectives:</div>
                        <p className="text-muted-foreground">{note.objectives}</p>
                      </div>
                      <div>
                        <div className="font-medium">Resources:</div>
                        <p className="text-muted-foreground">{note.resources}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="ghost" size="sm">
                      <FileText className="mr-2 h-4 w-4" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="draft" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {lessonNotes
              .filter((note) => note.status === "draft")
              .map((note) => (
                <Card key={note.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{note.title}</CardTitle>
                      <Badge variant="outline">draft</Badge>
                    </div>
                    <CardDescription>
                      {note.subject} - {note.class}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{note.date}</span>
                      </div>
                      <div>
                        <div className="font-medium">Objectives:</div>
                        <p className="text-muted-foreground">{note.objectives}</p>
                      </div>
                      <div>
                        <div className="font-medium">Resources:</div>
                        <p className="text-muted-foreground">{note.resources}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="ghost" size="sm">
                      <FileText className="mr-2 h-4 w-4" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
