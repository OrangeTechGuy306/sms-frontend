"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import {
  BarChart3,
  BookOpen,
  Calendar,
  GraduationCap,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Users,
  Clock,
  FileText,
  DollarSign,
  Award,
  BookText,
  CalendarDays,
  ClipboardCheck,
  Table2,
  Heart,
  Bus,
  UserCheck,
} from "lucide-react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean
  onClose?: () => void
}

export function DashboardSidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname()

  const routes = [
    {
      label: "Main",
      routes: [
        {
          label: "Dashboard",
          icon: LayoutDashboard,
          href: "/dashboard",
          active: pathname === "/dashboard",
        },
      ],
    },
    {
      label: "People",
      routes: [
        {
          label: "Students",
          icon: GraduationCap,
          href: "/dashboard/students",
          active: pathname === "/dashboard/students",
        },
        {
          label: "Teachers",
          icon: Users,
          href: "/dashboard/teachers",
          active: pathname === "/dashboard/teachers",
        },
        {
          label: "Admin",
          icon: Users,
          href: "/dashboard/admin",
          active: pathname === "/dashboard/admin",
        },
      ],
    },
    {
      label: "Academics",
      routes: [
        {
          label: "Classes",
          icon: Users,
          href: "/dashboard/classes",
          active: pathname === "/dashboard/classes",
        },
        {
          label: "Subjects",
          icon: BookOpen,
          href: "/dashboard/subjects",
          active: pathname === "/dashboard/subjects",
        },
        {
          label: "Lesson Notes",
          icon: FileText,
          href: "/dashboard/lesson-notes",
          active: pathname === "/dashboard/lesson-notes",
        },
        {
          label: "Assessments",
          icon: ClipboardCheck,
          href: "/dashboard/assessments",
          active: pathname === "/dashboard/assessments",
        },
        {
          label: "Results",
          icon: Award,
          href: "/dashboard/results",
          active: pathname === "/dashboard/results",
        },
        {
          label: "Grades",
          icon: BookText,
          href: "/dashboard/grades",
          active: pathname === "/dashboard/grades",
        },
      ],
    },
    {
      label: "Administration",
      routes: [
        {
          label: "Fees",
          icon: DollarSign,
          href: "/dashboard/fees",
          active: pathname === "/dashboard/fees",
        },
        {
          label: "Teacher Schedule",
          icon: Clock,
          href: "/dashboard/teacher-schedule",
          active: pathname === "/dashboard/teacher-schedule",
        },
        {
          label: "Timetable",
          icon: Table2,
          href: "/dashboard/timetable",
          active: pathname === "/dashboard/timetable",
        },
        {
          label: "Timetable Management",
          icon: Calendar,
          href: "/dashboard/timetables",
          active: pathname === "/dashboard/timetables",
        },
        {
          label: "Attendance",
          icon: ClipboardCheck,
          href: "/dashboard/attendance",
          active: pathname === "/dashboard/attendance",
        },
      ],
    },
    {
      label: "Communication",
      routes: [
        {
          label: "Events",
          icon: Calendar,
          href: "/dashboard/events",
          active: pathname === "/dashboard/events",
        },
        {
          label: "Calendar",
          icon: CalendarDays,
          href: "/dashboard/calendar",
          active: pathname === "/dashboard/calendar",
        },
        {
          label: "Messaging",
          icon: MessageSquare,
          href: "/dashboard/messaging",
          active: pathname === "/dashboard/messaging",
        },
      ],
    },
    {
      label: "Services",
      routes: [
        {
          label: "Library",
          icon: BookOpen,
          href: "/dashboard/library",
          active: pathname === "/dashboard/library",
        },
        {
          label: "Health Records",
          icon: Heart,
          href: "/dashboard/health-records",
          active: pathname === "/dashboard/health-records",
        },
        {
          label: "Transportation",
          icon: Bus,
          href: "/dashboard/transportation",
          active: pathname === "/dashboard/transportation",
        },
        {
          label: "Parent Portal",
          icon: UserCheck,
          href: "/dashboard/parent-portal",
          active: pathname === "/dashboard/parent-portal",
        },
      ],
    },
    {
      label: "System",
      routes: [
        {
          label: "Analytics",
          icon: BarChart3,
          href: "/dashboard/analytics",
          active: pathname === "/dashboard/analytics",
        },
        {
          label: "Settings",
          icon: Settings,
          href: "/dashboard/settings",
          active: pathname === "/dashboard/settings",
        },
      ],
    },
  ]

  const SidebarContent = (
    <ScrollArea className="h-full py-6">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">School Management</h2>
        <div className="space-y-1">
          {routes.map((group, i) => (
            <div key={i} className="py-2">
              <h3 className="mb-2 px-4 text-sm font-medium text-muted-foreground">{group.label}</h3>
              {group.routes.map((route, j) => (
                <Button
                  key={j}
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
