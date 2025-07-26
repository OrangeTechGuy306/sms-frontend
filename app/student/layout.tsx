import type React from "react"
import { Toaster } from "@/components/ui/toaster"
import { StudentSidebar } from "@/components/student/student-sidebar"
import { StudentNav } from "@/components/student/student-nav"

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <StudentNav />
      <div className="flex flex-col md:flex-row">
        <StudentSidebar />
        <main className="flex-1 p-4 md:p-6 pt-20 md:pt-24 md:ml-64 overflow-y-auto max-w-full">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
      <Toaster />
    </div>
  )
}
