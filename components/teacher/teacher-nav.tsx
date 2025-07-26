"use client"

import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TeacherNavProps {
  onMenuClick: () => void
}

export function TeacherNav({ onMenuClick }: TeacherNavProps) {
  return (
    <div className="flex items-center">
      <Button variant="ghost" size="icon" className="mr-2 md:hidden" onClick={onMenuClick}>
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <Link href="/teacher" className="flex items-center">
        <span className="text-xl font-bold">Teacher Portal</span>
      </Link>
    </div>
  )
}
