import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Calendar, GraduationCap, FileText, Award, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock upcoming events data
const upcomingEvents = [
  {
    id: 1,
    title: "Math Quiz",
    type: "quiz",
    date: "May 1, 2025",
    time: "9:30 AM",
    daysLeft: 0,
    location: "Room 101",
  },
  {
    id: 2,
    title: "English Essay Due",
    type: "assignment",
    date: "May 5, 2025",
    time: "11:59 PM",
    daysLeft: 4,
    location: "Online Submission",
  },
  {
    id: 3,
    title: "Science Project Presentation",
    type: "presentation",
    date: "May 8, 2025",
    time: "1:30 PM",
    daysLeft: 7,
    location: "Lab 3",
  },
  {
    id: 4,
    title: "School Sports Day",
    type: "event",
    date: "May 10, 2025",
    time: "All Day",
    daysLeft: 9,
    location: "School Grounds",
  },
  {
    id: 5,
    title: "History Exam",
    type: "exam",
    date: "May 15, 2025",
    time: "10:00 AM",
    daysLeft: 14,
    location: "Exam Hall",
  },
]

export function StudentUpcomingEvents() {
  const getEventIcon = (type: string) => {
    switch (type) {
      case "quiz":
      case "exam":
        return <GraduationCap className="h-4 w-4" />
      case "assignment":
        return <FileText className="h-4 w-4" />
      case "presentation":
        return <BookOpen className="h-4 w-4" />
      case "event":
        return <Award className="h-4 w-4" />
      case "club":
      case "meeting":
        return <Calendar className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getEventColor = (type: string) => {
    switch (type) {
      case "quiz":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
      case "exam":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
      case "assignment":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
      case "presentation":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
      case "event":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300"
    }
  }

  const getDaysLeftText = (daysLeft: number) => {
    if (daysLeft === 0) return "Today"
    if (daysLeft === 1) return "Tomorrow"
    return `In ${daysLeft} days`
  }

  return (
    <div className="space-y-4">
      {upcomingEvents.map((event) => (
        <Card key={event.id} className="overflow-hidden">
          <CardContent className="p-3">
            <div className="flex items-start gap-3">
              <div className={cn("p-2 rounded-md", getEventColor(event.type))}>{getEventIcon(event.type)}</div>
              <div className="space-y-1 flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">{event.title}</h4>
                  <Badge
                    variant={event.daysLeft <= 1 ? "destructive" : event.daysLeft <= 3 ? "default" : "outline"}
                    className="text-xs"
                  >
                    {getDaysLeftText(event.daysLeft)}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground">
                  {event.date} • {event.time}
                </div>
                <div className="text-xs text-muted-foreground">{event.location}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
