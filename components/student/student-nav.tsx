"use client"

import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { StudentProfile } from "@/components/student/student-profile"
import { Menu, Bell, Search } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

export function StudentNav() {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showSearch, setShowSearch] = useState(false)

  const routes = [
    {
      title: "Dashboard",
      href: "/student",
    },
    {
      title: "Courses",
      href: "/student/courses",
    },
    {
      title: "Assignments",
      href: "/student/assignments",
    },
    {
      title: "Grades",
      href: "/student/grades",
    },
    {
      title: "Attendance",
      href: "/student/attendance",
    },
    {
      title: "Timetable",
      href: "/student/timetable",
    },
    {
      title: "Messages",
      href: "/student/messaging",
    },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex h-16 items-center px-4 md:px-6">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden mr-2"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <Link href="/student" className="flex items-center gap-2">
            <div className="bg-violet-600 text-white p-1 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M5 17.5H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v12.5a1 1 0 0 1-1 1h-1" />
                <path d="M12 15V3" />
                <path d="M5 15v4a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-4" />
                <path d="M5 11h14" />
                <path d="M5 7h14" />
              </svg>
            </div>
            <span className="font-bold text-xl hidden md:inline-block">
              Campus<span className="text-violet-600">Connect</span>
            </span>
          </Link>
        </div>

        {showSearch ? (
          <div className="ml-4 flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-8 pr-4 py-1 h-9 w-full bg-slate-100 dark:bg-slate-800 border-0 focus-visible:ring-violet-500"
                onBlur={() => setShowSearch(false)}
                autoFocus
              />
            </div>
          </div>
        ) : (
          <Button variant="ghost" size="icon" className="ml-4 hidden sm:flex" onClick={() => setShowSearch(true)}>
            <Search className="h-5 w-5" />
          </Button>
        )}

        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-violet-600 text-[10px] text-white">
              5
            </span>
          </Button>
          <ModeToggle />
          <StudentProfile />
        </div>
      </div>
      <div
        className={cn(
          "absolute top-16 left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 md:hidden z-20 shadow-md transition-all duration-200 ease-in-out",
          showMobileMenu ? "max-h-[calc(100vh-4rem)] overflow-y-auto" : "max-h-0 overflow-hidden",
        )}
      >
        <nav className="flex flex-col p-4 gap-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className="px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
              onClick={() => setShowMobileMenu(false)}
            >
              {route.title}
              {route.title === "Messages" && (
                <Badge variant="secondary" className="ml-2 bg-violet-600 text-white hover:bg-violet-700">
                  3
                </Badge>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
