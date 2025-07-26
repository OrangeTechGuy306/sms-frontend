"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, BookOpen, MapPin, User, GraduationCap, Clock } from "lucide-react"

interface ViewClassModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  classData: ClassData
}

interface ClassData {
  id: string
  name: string
  level: string
  section: string
  capacity: number
  enrolled: number
  classTeacher: string
  subjects: string[]
  room: string
  schedule: string
  status: "active" | "inactive"
  academicYear: string
}

export function ViewClassModal({ open, onOpenChange, classData }: ViewClassModalProps) {
  const occupancyPercentage = classData.capacity > 0 ? (classData.enrolled / classData.capacity) * 100 : 0

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Class Details: {classData.name}</DialogTitle>
          <DialogDescription>Detailed information about this class.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <p className="text-muted-foreground">Class ID</p>
                <p className="font-medium">{classData.id}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">Class Name</p>
                <p className="font-medium">{classData.name}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">Level</p>
                <p className="font-medium">{classData.level}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">Section</p>
                <p className="font-medium">{classData.section}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">Academic Year</p>
                <p className="font-medium">{classData.academicYear}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">Status</p>
                <Badge variant={classData.status === "active" ? "default" : "secondary"}>{classData.status}</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Enrollment & Capacity</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-1 flex items-center gap-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Enrolled Students</p>
                  <p className="font-medium">{classData.enrolled}</p>
                </div>
              </div>
              <div className="space-y-1 flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Capacity</p>
                  <p className="font-medium">{classData.capacity}</p>
                </div>
              </div>
              <div className="space-y-1 col-span-full">
                <p className="text-muted-foreground">Occupancy Rate</p>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${occupancyPercentage}%`,
                        backgroundColor:
                          occupancyPercentage > 90
                            ? "hsl(var(--destructive))"
                            : occupancyPercentage > 70
                              ? "hsl(var(--warning))"
                              : "hsl(var(--primary))",
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium">{occupancyPercentage.toFixed(1)}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Assignment Details</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-1 flex items-center gap-2">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Class Teacher</p>
                  <p className="font-medium">{classData.classTeacher}</p>
                </div>
              </div>
              <div className="space-y-1 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Room</p>
                  <p className="font-medium">{classData.room}</p>
                </div>
              </div>
              <div className="space-y-1 col-span-full flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Schedule</p>
                  <p className="font-medium">{classData.schedule}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Subjects Offered</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {classData.subjects.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {classData.subjects.map((subject) => (
                    <Badge key={subject} variant="outline" className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3" /> {subject}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">No subjects assigned to this class yet.</p>
              )}
            </CardContent>
          </Card>

          {/* Assuming there might be a description field in the future */}
          {/* <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {classData.description || "No additional description provided."}
              </p>
            </CardContent>
          </Card> */}
        </div>
      </DialogContent>
    </Dialog>
  )
}
