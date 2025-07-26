"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Phone, Mail } from "lucide-react"

// Mock contacts data
const teacherContacts = [
  {
    id: 1,
    name: "Mr. Johnson",
    role: "Mathematics Teacher",
    avatar: "/placeholder.svg?height=40&width=40",
    email: "johnson@school.edu",
    phone: "(555) 123-4567",
  },
  {
    id: 2,
    name: "Mrs. Smith",
    role: "English Teacher",
    avatar: "/placeholder.svg?height=40&width=40",
    email: "smith@school.edu",
    phone: "(555) 234-5678",
  },
  {
    id: 3,
    name: "Dr. Williams",
    role: "Science Teacher",
    avatar: "/placeholder.svg?height=40&width=40",
    email: "williams@school.edu",
    phone: "(555) 345-6789",
  },
  {
    id: 4,
    name: "Ms. Davis",
    role: "History Teacher",
    avatar: "/placeholder.svg?height=40&width=40",
    email: "davis@school.edu",
    phone: "(555) 456-7890",
  },
  {
    id: 5,
    name: "Mr. Wilson",
    role: "Art Teacher",
    avatar: "/placeholder.svg?height=40&width=40",
    email: "wilson@school.edu",
    phone: "(555) 567-8901",
  },
]

const studentContacts = [
  {
    id: 1,
    name: "Emma Thompson",
    role: "Class Representative",
    avatar: "/placeholder.svg?height=40&width=40",
    email: "emma@school.edu",
    phone: "(555) 987-6543",
  },
  {
    id: 2,
    name: "James Wilson",
    role: "Student",
    avatar: "/placeholder.svg?height=40&width=40",
    email: "james@school.edu",
    phone: "(555) 876-5432",
  },
  {
    id: 3,
    name: "Sophia Garcia",
    role: "Student",
    avatar: "/placeholder.svg?height=40&width=40",
    email: "sophia@school.edu",
    phone: "(555) 765-4321",
  },
  {
    id: 4,
    name: "Liam Johnson",
    role: "Student",
    avatar: "/placeholder.svg?height=40&width=40",
    email: "liam@school.edu",
    phone: "(555) 654-3210",
  },
]

export function StudentContacts() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredTeachers = teacherContacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredStudents = studentContacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <Input placeholder="Search contacts..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>

      <Tabs defaultValue="teachers">
        <TabsList className="grid w-full grid-cols-2 mb-4 max-w-[300px]">
          <TabsTrigger value="teachers">Teachers</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
        </TabsList>

        <TabsContent value="teachers" className="mt-0">
          <ScrollArea className="h-[400px]">
            <div className="space-y-2">
              {filteredTeachers.map((contact) => (
                <div key={contact.id} className="flex items-center justify-between p-3 rounded-md border">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                      <AvatarFallback>{contact.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{contact.name}</h4>
                      <p className="text-xs text-muted-foreground">{contact.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="students" className="mt-0">
          <ScrollArea className="h-[400px]">
            <div className="space-y-2">
              {filteredStudents.map((contact) => (
                <div key={contact.id} className="flex items-center justify-between p-3 rounded-md border">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                      <AvatarFallback>{contact.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{contact.name}</h4>
                      <p className="text-xs text-muted-foreground">{contact.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}
