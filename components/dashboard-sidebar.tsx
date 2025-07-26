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
          href: "/",
          active: pathname === "/",
        },
      ],
    },
    {
      label: "People",
      routes: [
        {
          label: "Students",
          icon: GraduationCap,
          href: "/students",
          active: pathname === "/students",
        },
        {
          label: "Teachers",
          icon: Users,
          href: "/teachers",
          active: pathname === "/teachers",
        },
        {
          label: "Admin",
          icon: Users,
          href: "/admin",
          active: pathname === "/admin",
        },
      ],
    },
    {
      label: "Academics",
      routes: [
        {
          label: "Subjects",
          icon: BookOpen,
          href: "/subjects",
          active: pathname === "/subjects",
        },
        {
          label: "Lesson Notes",
          icon: FileText,
          href: "/lesson-notes",
          active: pathname === "/lesson-notes",
        },
        {
          label: "Results",
          icon: Award,
          href: "/results",
          active: pathname === "/results",
        },
        {
          label: "Grades",
          icon: BookText,
          href: "/grades",
          active: pathname === "/grades",
        },
      ],
    },
    {
      label: "Administration",
      routes: [
        {
          label: "Fees",
          icon: DollarSign,
          href: "/fees",
          active: pathname === "/fees",
        },
        {
          label: "Teacher Schedule",
          icon: Clock,
          href: "/teacher-schedule",
          active: pathname === "/teacher-schedule",
        },
        {
          label: "Timetable",
          icon: Table2,
          href: "/timetable",
          active: pathname === "/timetable",
        },
        {
          label: "Attendance",
          icon: ClipboardCheck,
          href: "/attendance",
          active: pathname === "/attendance",
        },
      ],
    },
    {
      label: "Communication",
      routes: [
        {
          label: "Events",
          icon: Calendar,
          href: "/events",
          active: pathname === "/events",
        },
        {
          label: "Calendar",
          icon: CalendarDays,
          href: "/calendar",
          active: pathname === "/calendar",
        },
        {
          label: "Messaging",
          icon: MessageSquare,
          href: "/messaging",
          active: pathname === "/messaging",
        },
      ],
    },
    {
      label: "System",
      routes: [
        {
          label: "Analytics",
          icon: BarChart3,
          href: "/analytics",
          active: pathname === "/analytics",
        },
        {
          label: "Settings",
          icon: Settings,
          href: "/settings",
          active: pathname === "/settings",
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
