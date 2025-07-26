"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { TeacherNav } from "@/components/teacher/teacher-nav"
import { TeacherSidebar } from "@/components/teacher/teacher-sidebar"
import { ModeToggle } from "@/components/mode-toggle"
import { TeacherProfile } from "@/components/teacher/teacher-profile"
import { Toaster } from "@/components/ui/toaster"
import { cn } from "@/lib/utils"

export default function TeacherDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMobile, setIsMobile] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    // Close sidebar on mobile when route changes
    if (isMobile) {
      setSidebarOpen(false)
    }
  }, [pathname, isMobile])

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="flex h-16 items-center px-4">
          <TeacherNav onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
          <div className="ml-auto flex items-center space-x-4">
            <ModeToggle />
            <TeacherProfile />
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <TeacherSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className={cn("flex-1 overflow-auto p-4 md:p-6", isMobile && sidebarOpen && "hidden md:block")}>
          {children}
        </main>
      </div>
      <Toaster />
    </div>
  )
}
