"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, LogOut, Settings, User, HelpCircle, BookOpen } from "lucide-react"
import Link from "next/link"

export function StudentProfile() {
  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full overflow-hidden">
            <Avatar className="h-8 w-8 border-2 border-violet-200 dark:border-violet-800">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Student" />
              <AvatarFallback className="bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200">
                AS
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <div className="flex items-center justify-start gap-2 p-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-900">
              <Avatar className="h-9 w-9">
                <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Student" />
                <AvatarFallback className="bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200">
                  AS
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-col space-y-0.5">
              <p className="text-sm font-medium">Alex Smith</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Grade 11 • Science</p>
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-xs text-slate-500 dark:text-slate-400">alex.smith@example.com</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Student ID: 2025001</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href="/student/profile" className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>My Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/student/courses" className="cursor-pointer">
                <BookOpen className="mr-2 h-4 w-4" />
                <span>My Courses</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/student/notifications" className="cursor-pointer">
                <Bell className="mr-2 h-4 w-4" />
                <span>Notifications</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/student/settings" className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/help" className="cursor-pointer">
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help Center</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
