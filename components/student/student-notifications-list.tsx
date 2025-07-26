"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Bell,
  BookOpen,
  Calendar,
  CheckCircle,
  ClipboardList,
  FileText,
  GraduationCap,
  Info,
  MessageSquare,
  Settings,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Mock notifications data
const notifications = [
  {
    id: 1,
    title: "New Assignment Posted",
    message: "Mathematics: Quadratic Equations - Due Friday, May 31",
    time: "10 minutes ago",
    read: false,
    type: "academic",
    icon: ClipboardList,
  },
  {
    id: 2,
    title: "Grade Updated",
    message: "Your English essay has been graded: A-",
    time: "1 hour ago",
    read: false,
    type: "academic",
    icon: GraduationCap,
  },
  {
    id: 3,
    title: "Upcoming Test",
    message: "Science test scheduled for next Monday",
    time: "3 hours ago",
    read: false,
    type: "academic",
    icon: BookOpen,
  },
  {
    id: 4,
    title: "Attendance Warning",
    message: "You've missed 3 classes this month",
    time: "Yesterday",
    read: true,
    type: "administrative",
    icon: Bell,
  },
  {
    id: 5,
    title: "School Event",
    message: "Science Fair registration is now open",
    time: "Yesterday",
    read: true,
    type: "administrative",
    icon: Calendar,
  },
  {
    id: 6,
    title: "New Message",
    message: "You have a new message from Mr. Johnson",
    time: "2 days ago",
    read: true,
    type: "academic",
    icon: MessageSquare,
  },
  {
    id: 7,
    title: "Document Available",
    message: "Your semester report card is now available",
    time: "3 days ago",
    read: true,
    type: "administrative",
    icon: FileText,
  },
  {
    id: 8,
    title: "System Maintenance",
    message: "Portal will be down for maintenance this Saturday",
    time: "4 days ago",
    read: true,
    type: "administrative",
    icon: Settings,
  },
  {
    id: 9,
    title: "Assignment Graded",
    message: "Your History assignment has been graded: B+",
    time: "5 days ago",
    read: true,
    type: "academic",
    icon: CheckCircle,
  },
  {
    id: 10,
    title: "Important Announcement",
    message: "Parent-Teacher conferences scheduled for next week",
    time: "1 week ago",
    read: true,
    type: "administrative",
    icon: Info,
  },
]

interface StudentNotificationsListProps {
  filter: "all" | "academic" | "administrative"
}

export function StudentNotificationsList({ filter }: StudentNotificationsListProps) {
  const [readNotifications, setReadNotifications] = useState<number[]>([])

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "all") return true
    return notification.type === filter
  })

  const markAsRead = (id: number) => {
    if (!readNotifications.includes(id)) {
      setReadNotifications([...readNotifications, id])
    }
  }

  const isRead = (notification: (typeof notifications)[0]) => {
    return notification.read || readNotifications.includes(notification.id)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <span className="text-sm font-medium">
            {filteredNotifications.filter((n) => !isRead(n)).length} unread notifications
          </span>
        </div>
        <Button variant="outline" size="sm">
          Mark all as read
        </Button>
      </div>

      <ScrollArea className="h-[500px] pr-4">
        <div className="space-y-2">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={cn(
                "p-4 rounded-lg border transition-colors",
                !isRead(notification)
                  ? "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                  : "bg-white dark:bg-slate-950 border-slate-100 dark:border-slate-900",
              )}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    "p-2 rounded-full",
                    !isRead(notification)
                      ? "bg-violet-100 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400",
                  )}
                >
                  <notification.icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className={cn("font-medium", !isRead(notification) && "text-violet-600 dark:text-violet-400")}>
                      {notification.title}
                    </h4>
                    <Badge variant={notification.type === "academic" ? "default" : "secondary"} className="capitalize">
                      {notification.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                  <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
