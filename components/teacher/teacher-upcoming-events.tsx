import { Badge } from "@/components/ui/badge"
import { Calendar, FileText, Users, Clock } from "lucide-react"

export function TeacherUpcomingEvents() {
  // Mock upcoming events data
  const events = [
    {
      id: 1,
      title: "Submit Midterm Grades",
      date: "Oct 25, 2023",
      time: "11:59 PM",
      type: "deadline",
      icon: FileText,
    },
    {
      id: 2,
      title: "Department Meeting",
      date: "Oct 26, 2023",
      time: "10:00 AM",
      type: "meeting",
      icon: Users,
    },
    {
      id: 3,
      title: "Parent-Teacher Conference",
      date: "Oct 30, 2023",
      time: "2:00 PM - 5:00 PM",
      type: "event",
      icon: Calendar,
    },
    {
      id: 4,
      title: "Mathematics Competition",
      date: "Nov 5, 2023",
      time: "9:00 AM - 12:00 PM",
      type: "event",
      icon: Clock,
    },
    {
      id: 5,
      title: "Submit Lesson Plans",
      date: "Nov 10, 2023",
      time: "11:59 PM",
      type: "deadline",
      icon: FileText,
    },
  ]

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div key={event.id} className="flex items-start space-x-4 rounded-md border p-3">
          <event.icon className="mt-0.5 h-5 w-5 text-muted-foreground" />
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="font-medium">{event.title}</p>
              <Badge
                variant={event.type === "deadline" ? "destructive" : event.type === "meeting" ? "outline" : "default"}
              >
                {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {event.date} • {event.time}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
