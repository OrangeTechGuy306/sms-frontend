"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BookOpen,
  Calendar,
  ClipboardList,
  GraduationCap,
  LayoutDashboard,
  MessageSquare,
  Settings,
  UserCheck,
  Bell,
  BarChart3,
} from "lucide-react"
import { cn } from "@/lib/utils"

export function StudentSidebar() {
  const pathname = usePathname()

  const routes = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/student",
      active: pathname === "/student",
    },
    {
      title: "Courses",
      icon: BookOpen,
      href: "/student/courses",
      active: pathname === "/student/courses" || pathname.startsWith("/student/courses/"),
    },
    {
      title: "Assignments",
      icon: ClipboardList,
      href: "/student/assignments",
      active: pathname === "/student/assignments" || pathname.startsWith("/student/assignments/"),
    },
    {
      title: "Grades",
      icon: GraduationCap,
      href: "/student/grades",
      active: pathname === "/student/grades",
    },
    {
      title: "Attendance",
      icon: UserCheck,
      href: "/student/attendance",
      active: pathname === "/student/attendance",
    },
    {
      title: "Timetable",
      icon: Calendar,
      href: "/student/timetable",
      active: pathname === "/student/timetable",
    },
    {
      title: "Calendar",
      icon: Calendar,
      href: "/student/calendar",
      active: pathname === "/student/calendar",
    },
    {
      title: "Messages",
      icon: MessageSquare,
      href: "/student/messaging",
      active: pathname === "/student/messaging",
    },
    {
      title: "Analytics",
      icon: BarChart3,
      href: "/student/analytics",
      active: pathname === "/student/analytics",
    },
    {
      title: "Notifications",
      icon: Bell,
      href: "/student/notifications",
      active: pathname === "/student/notifications",
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/student/settings",
      active: pathname === "/student/settings",
    },
  ]

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 hidden md:block overflow-y-auto z-20 shadow-sm">
      <div className="p-4">
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-slate-100 dark:hover:bg-slate-800",
                route.active
                  ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-50 font-medium"
                  : "text-slate-600 dark:text-slate-400",
              )}
            >
              <route.icon className={cn("h-5 w-5", route.active ? "text-violet-600 dark:text-violet-400" : "")} />
              {route.title}
              {route.title === "Messages" && (
                <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-violet-600 text-xs text-white">
                  3
                </span>
              )}
              {route.title === "Notifications" && (
                <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-violet-600 text-xs text-white">
                  5
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  )
}
