"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Calendar,
  ClipboardCheck,
  Award,
  FileText,
  MessageSquare,
  Settings,
  Clock,
  GraduationCap,
} from "lucide-react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean
  onClose?: () => void
}

export function TeacherSidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname()

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/teacher",
      active: pathname === "/teacher",
    },
    {
      label: "My Classes",
      icon: Users,
      href: "/teacher/classes",
      active: pathname === "/teacher/classes" || pathname.startsWith("/teacher/classes/"),
    },
    {
      label: "My Schedule",
      icon: Clock,
      href: "/teacher/schedule",
      active: pathname === "/teacher/schedule",
    },
    {
      label: "Attendance",
      icon: ClipboardCheck,
      href: "/teacher/attendance",
      active: pathname === "/teacher/attendance",
    },
    {
      label: "Grades",
      icon: Award,
      href: "/teacher/grades",
      active: pathname === "/teacher/grades",
    },
    {
      label: "Lesson Notes",
      icon: FileText,
      href: "/teacher/lesson-notes",
      active: pathname === "/teacher/lesson-notes",
    },
    {
      label: "Students",
      icon: GraduationCap,
      href: "/teacher/students",
      active: pathname === "/teacher/students",
    },
    {
      label: "Subjects",
      icon: BookOpen,
      href: "/teacher/subjects",
      active: pathname === "/teacher/subjects",
    },
    {
      label: "Calendar",
      icon: Calendar,
      href: "/teacher/calendar",
      active: pathname === "/teacher/calendar",
    },
    {
      label: "Messaging",
      icon: MessageSquare,
      href: "/teacher/messaging",
      active: pathname === "/teacher/messaging",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/teacher/settings",
      active: pathname === "/teacher/settings",
    },
  ]

  const SidebarContent = (
    <ScrollArea className="h-full py-6">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Teacher Dashboard</h2>
        <div className="space-y-1">
          {routes.map((route, i) => (
            <Button
              key={i}
              asChild
              variant={route.active ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={onClose}
            >
              <Link href={route.href}>
                <route.icon className="mr-2 h-4 w-4" />
                {route.label}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </ScrollArea>
  )

  return (
    <>
      <aside className="hidden w-64 border-r md:block">{SidebarContent}</aside>
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent side="left" className="p-0 sm:max-w-xs">
          {SidebarContent}
        </SheetContent>
      </Sheet>
    </>
  )
}
