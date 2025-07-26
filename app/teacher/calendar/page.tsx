import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, ChevronRight, Plus, CalendarIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { TeacherCalendar } from "@/components/teacher/teacher-calendar"

export default function TeacherCalendarPage() {
  // Mock data for upcoming events
  const upcomingEvents = [
    {
      id: 1,
      title: "Class 9A Mathematics",
      date: "Today",
      time: "10:30 AM - 11:30 AM",
      location: "Room 101",
      type: "class",
    },
    {
      id: 2,
      title: "Department Meeting",
      date: "Today",
      time: "2:00 PM - 3:00 PM",
      location: "Staff Room",
      type: "meeting",
    },
    {
      id: 3,
      title: "Class 10B Mathematics",
      date: "Tomorrow",
      time: "9:15 AM - 10:15 AM",
      location: "Room 203",
      type: "class",
    },
    {
      id: 4,
      title: "Parent-Teacher Conference",
      date: "Tomorrow",
      time: "4:00 PM - 6:00 PM",
      location: "Main Hall",
      type: "event",
    },
    {
      id: 5,
      title: "Class 11C Physics",
      date: "Wed, May 5",
      time: "11:45 AM - 12:45 PM",
      location: "Lab 3",
      type: "class",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Calendar</h2>
          <p className="text-muted-foreground">Manage your schedule and events</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline">Today</Button>
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Select defaultValue="month">
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Day</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <Card className="col-span-7 md:col-span-5">
          <CardHeader className="pb-2">
            <CardTitle>May 2023</CardTitle>
            <CardDescription>Your teaching schedule and events</CardDescription>
          </CardHeader>
          <CardContent>
            <TeacherCalendar />
          </CardContent>
        </Card>

        <div className="col-span-7 md:col-span-2 space-y-6">
          <Tabs defaultValue="upcoming">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="all">All Events</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming" className="mt-4 space-y-4">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{event.title}</CardTitle>
                      <Badge
                        variant={
                          event.type === "class" ? "default" : event.type === "meeting" ? "secondary" : "outline"
                        }
                      >
                        {event.type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>
                          {event.date}, {event.time}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2 h-4 w-4 text-muted-foreground"
                        >
                          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            <TabsContent value="all" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>All Events</CardTitle>
                  <CardDescription>View all your scheduled events</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Use the calendar view to see all your events for the month.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
