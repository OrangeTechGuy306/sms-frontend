"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  BarChart3,
  BookOpen,
  Calendar,
  Clock,
  FileText,
  Home,
  MessageSquare,
  Settings,
  User,
  Users,
  DollarSign,
  ShieldCheck,
  Brain,
  ClipboardCheck,
  UserCheck,
  Heart,
  Bus,
  TrendingUp,
  Library,
  GraduationCap,
  Trophy,
} from "lucide-react"
import { useThemeContext } from "@/contexts/theme-context"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useMobile } from "@/hooks/use-mobile"

export function AppSidebar() {
  const pathname = usePathname()
  const { layout, fontSize } = useThemeContext()
  const isMobile = useMobile()

  const menuItems = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Students", href: "/students", icon: Users },
    { name: "Attendance", href: "/attendance", icon: Clock },
    { name: "Grades", href: "/grades", icon: FileText },
    { name: "Results", href: "/results", icon: BarChart3 },
    { name: "Timetable", href: "/timetable", icon: Calendar },
    { name: "Messages", href: "/messages", icon: MessageSquare },
    { name: "Subjects", href: "/subjects", icon: BookOpen },
    { name: "Fees", href: "/fees", icon: DollarSign },
    { name: "Events", href: "/events", icon: Calendar },
    { name: "Learning Analytics", href: "/learning-analytics", icon: Brain },
    { name: "Assessment Tools", href: "/assessment-tools", icon: ClipboardCheck },
    { name: "Parent Portal", href: "/parent-portal", icon: UserCheck },
    { name: "Student Portal", href: "/student-portal", icon: User },
    { name: "Health Records", href: "/health-records", icon: Heart },
    { name: "Transportation", href: "/transportation", icon: Bus },
    { name: "Business Intelligence", href: "/business-intelligence", icon: TrendingUp },
    { name: "Digital Library", href: "/digital-library", icon: Library },
    { name: "Special Education", href: "/special-education", icon: GraduationCap },
    { name: "Extracurricular", href: "/extracurricular", icon: Trophy },
    { name: "Admin", href: "/admin", icon: ShieldCheck },
    { name: "Settings", href: "/settings", icon: Settings },
  ]

  // Determine font size class based on fontSize setting
  const getFontSizeClass = () => {
    switch (fontSize) {
      case "small":
        return "text-xs"
      case "medium":
        return "text-sm"
      case "large":
        return "text-base"
      case "extra-large":
        return "text-lg"
      default:
        return "text-sm"
    }
  }

  return (
    <Sidebar
      variant={layout === "comfortable" ? "floating" : "sidebar"}
      collapsible={isMobile ? false : "icon"}
      defaultCollapsed={isMobile}
      className={getFontSizeClass()}
    >
      <SidebarHeader className="flex h-14 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <BookOpen className="h-6 w-6" />
          <span>School Management</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.name}>
                <Link href={item.href}>
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-2">
          <User className="h-6 w-6" />
          <div className="flex flex-col">
            <span className="text-sm font-medium">Admin User</span>
            <span className="text-xs text-muted-foreground">admin@school.edu</span>
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
