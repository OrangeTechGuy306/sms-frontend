"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface Admin {
  id: string
  name: string
  role: string
  department: string
  contact: string
  status: string
}

interface ViewAdminModalProps {
  admin: Admin
  trigger?: React.ReactNode
}

export function ViewAdminModal({ admin, trigger }: ViewAdminModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="sm">
            View
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Admin Details</DialogTitle>
          <DialogDescription>Detailed information about the admin staff member.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/placeholder.svg" alt={admin.name} />
              <AvatarFallback>
                {admin.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-medium">{admin.name}</h3>
              <p className="text-sm text-muted-foreground">ID: {admin.id}</p>
              <Badge variant={admin.status === "Active" ? "default" : "outline"}>{admin.status}</Badge>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium">Role</h4>
              <p className="text-sm">{admin.role}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Department</h4>
              <p className="text-sm">{admin.department}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Contact</h4>
              <p className="text-sm">{admin.contact}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Status</h4>
              <p className="text-sm">{admin.status}</p>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium">Responsibilities</h4>
            <ul className="mt-2 space-y-1 text-sm">
              <li>Overall school administration</li>
              <li>Staff management</li>
              <li>Policy implementation</li>
              <li>Budget oversight</li>
            </ul>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline">
            Print Details
          </Button>
          <Button type="button">Edit Admin</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
