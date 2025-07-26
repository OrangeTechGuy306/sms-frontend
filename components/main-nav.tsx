"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

export function MainNav({
  onMenuClick,
}: {
  onMenuClick: () => void
}) {
  const pathname = usePathname()

  return (
    <div className="flex items-center gap-6 md:gap-10">
      <Button
        variant="ghost"
        className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        onClick={onMenuClick}
      >
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <Link href="/" className="flex items-center space-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M5 12.55a11 11 0 0 1 14.08 0" />
          <path d="M1.42 9a16 16 0 0 1 21.16 0" />
          <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
          <line x1="12" y1="20" x2="12" y2="20" />
        </svg>
        <span className="hidden font-bold sm:inline-block">School Management System</span>
      </Link>
      <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
        <Link
          href="/"
          className={cn(
            "transition-colors hover:text-primary",
            pathname === "/" ? "text-primary" : "text-muted-foreground",
          )}
        >
          Dashboard
        </Link>
        <Link
          href="/students"
          className={cn(
            "transition-colors hover:text-primary",
            pathname === "/students" ? "text-primary" : "text-muted-foreground",
          )}
        >
          Students
        </Link>
        <Link
          href="/teachers"
          className={cn(
            "transition-colors hover:text-primary",
            pathname === "/teachers" ? "text-primary" : "text-muted-foreground",
          )}
        >
          Teachers
        </Link>
        <Link
          href="/subjects"
          className={cn(
            "transition-colors hover:text-primary",
            pathname === "/subjects" ? "text-primary" : "text-muted-foreground",
          )}
        >
          Subjects
        </Link>
      </nav>
    </div>
  )
}
