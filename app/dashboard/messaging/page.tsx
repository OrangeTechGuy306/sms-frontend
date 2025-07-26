"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Search, Send, PaperclipIcon, Plus, Loader2, MessageSquare, Users, Broadcast } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"

// Types
interface MessageFormData {
  recipientId: string
  subject: string
  message: string
  priority: "low" | "normal" | "high" | "urgent"
}

interface BroadcastFormData {
  recipientIds: string[]
  subject: string
  message: string
  priority: "low" | "normal" | "high" | "urgent"
}

interface Message {
  id: string
  sender_id: string
  recipient_id: string
  subject: string
  message: string
  priority: string
  is_read: boolean
  created_at: string
  updated_at: string
  sender_name?: string
  recipient_name?: string
  sender_type?: string
  recipient_type?: string
}

interface User {
  id: string
  first_name: string
  last_name: string
  email: string
  type: 'student' | 'teacher' | 'admin'
}

interface MessageStats {
  total_messages: number
  unread_messages: number
  sent_messages: number
  received_messages: number
}

export default function MessagingPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [stats, setStats] = useState<MessageStats | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [isNewMessageOpen, setIsNewMessageOpen] = useState(false)
  const [isBroadcastOpen, setIsBroadcastOpen] = useState(false)
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([])

  // Pagination
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 20,
  })

  // Form states
  const [messageForm, setMessageForm] = useState<MessageFormData>({
    recipientId: "",
    subject: "",
    message: "",
    priority: "normal",
  })

  const [broadcastForm, setBroadcastForm] = useState<BroadcastFormData>({
    recipientIds: [],
    subject: "",
    message: "",
    priority: "normal",
  })

  // Fetch data
  useEffect(() => {
    fetchMessages()
    fetchUsers()
  }, [])

  const fetchMessages = async (page = 1, limit = 20) => {
    try {
      setLoading(true)

      // Mock data
      const mockMessages: Message[] = [
        {
          id: "1",
          sender_id: "teacher1",
          recipient_id: "student1",
          subject: "Assignment Reminder",
          message: "Please remember to submit your math assignment by Friday.",
          is_read: false,
          priority: "normal",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          sender_name: "John Teacher",
          recipient_name: "Jane Student"
        },
        {
          id: "2",
          sender_id: "admin1",
          recipient_id: "teacher1",
          subject: "Staff Meeting",
          message: "There will be a staff meeting tomorrow at 3 PM.",
          is_read: true,
          priority: "high",
          created_at: new Date(Date.now() - 86400000).toISOString(),
          updated_at: new Date(Date.now() - 86400000).toISOString(),
          sender_name: "Admin User",
          recipient_name: "John Teacher"
        }
      ]

      setMessages(mockMessages)
      setPagination({
        currentPage: 1,
        totalPages: 1,
        totalItems: mockMessages.length,
        itemsPerPage: 20,
      })

      setStats({
        total_messages: mockMessages.length,
        unread_messages: mockMessages.filter(msg => !msg.is_read).length,
        sent_messages: 1,
        received_messages: mockMessages.length,
      })
    } catch (error) {
      console.error('Error fetching messages:', error)
      toast({
        title: "Error",
        description: "Failed to fetch messages",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchUsers = async () => {
    try {
      // Mock users data
      const mockUsers: User[] = [
        {
          id: "student1",
          first_name: "Jane",
          last_name: "Student",
          email: "jane.student@school.com",
          type: "student"
        },
        {
          id: "teacher1",
          first_name: "John",
          last_name: "Teacher",
          email: "john.teacher@school.com",
          type: "teacher"
        },
        {
          id: "admin1",
          first_name: "Admin",
          last_name: "User",
          email: "admin@school.com",
          type: "admin"
        }
      ]

      setUsers(mockUsers)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setSubmitting(true)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast({
        title: "Success",
        description: "Message sent successfully",
      })
      setIsNewMessageOpen(false)
      setMessageForm({
        recipientId: "",
        subject: "",
        message: "",
        priority: "normal",
      })
      fetchMessages()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleBroadcast = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setSubmitting(true)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast({
        title: "Success",
        description: "Broadcast message sent successfully",
      })
      setIsBroadcastOpen(false)
      setBroadcastForm({
        recipientIds: [],
        subject: "",
        message: "",
        priority: "normal",
      })
      setSelectedRecipients([])
      fetchMessages()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send broadcast message",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleMarkAsRead = async (messageId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      setMessages(prev => prev.map(msg =>
        msg.id === messageId ? { ...msg, is_read: true } : msg
      ))
    } catch (error) {
      console.error('Error marking message as read:', error)
    }
  }

  // Search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchMessages(1, pagination.itemsPerPage)
    }, 300)
    return () => clearTimeout(timeoutId)
  }, [searchTerm, activeTab])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } else if (diffInHours < 48) {
      return 'Yesterday'
    } else {
      return date.toLocaleDateString()
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'destructive'
      case 'high': return 'destructive'
      case 'normal': return 'secondary'
      case 'low': return 'outline'
      default: return 'secondary'
    }
  }

  const filteredMessages = messages.filter(message => {
    if (activeTab === 'unread') return !message.is_read
    if (activeTab === 'sent') return message.sender_id === 'current_user_id' // Would need current user context
    return true
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Messaging System</h2>
          <p className="text-muted-foreground">Send and receive messages with students, teachers, and staff</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setIsBroadcastOpen(true)}>
            <Broadcast className="mr-2 h-4 w-4" />
            Broadcast
          </Button>
          <Button onClick={() => setIsNewMessageOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Message
          </Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-12">
        <Card className="md:col-span-4 lg:col-span-3">
          <CardHeader>
            <CardTitle>Conversations</CardTitle>
            <CardDescription>Manage your messages and conversations</CardDescription>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search messages..." className="pl-8" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="all">
              <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
                <TabsTrigger
                  value="all"
                  className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="unread"
                  className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  Unread
                </TabsTrigger>
                <TabsTrigger
                  value="important"
                  className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  Important
                </TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="m-0">
                <ScrollArea className="h-[calc(100vh-300px)]">
                  <div className="flex flex-col">
                    {[
                      {
                        name: "Dr. Robert Wilson",
                        avatar: "/placeholder-user.jpg",
                        initials: "RW",
                        message: "I've updated the lesson plan for next week",
                        time: "10:30 AM",
                        unread: true,
                      },
                      {
                        name: "Parent Group - Grade 10A",
                        avatar: "/placeholder-user.jpg",
                        initials: "PG",
                        message: "When is the next parent-teacher meeting?",
                        time: "Yesterday",
                        unread: true,
                      },
                      {
                        name: "Mrs. Patricia Clark",
                        avatar: "/placeholder-user.jpg",
                        initials: "PC",
                        message: "Can we discuss the history curriculum?",
                        time: "Yesterday",
                        unread: false,
                      },
                      {
                        name: "Admin Team",
                        avatar: "/placeholder-user.jpg",
                        initials: "AT",
                        message: "Staff meeting scheduled for Friday",
                        time: "2 days ago",
                        unread: false,
                      },
                      {
                        name: "John Doe (Student)",
                        avatar: "/placeholder-user.jpg",
                        initials: "JD",
                        message: "Question about the math assignment",
                        time: "3 days ago",
                        unread: false,
                      },
                      {
                        name: "Science Department",
                        avatar: "/placeholder-user.jpg",
                        initials: "SD",
                        message: "Lab equipment order has arrived",
                        time: "1 week ago",
                        unread: false,
                      },
                    ].map((conversation, i) => (
                      <div
                        key={i}
                        className={`flex items-center gap-3 border-b p-3 hover:bg-muted/50 ${
                          i === 0 ? "bg-muted/50" : ""
                        }`}
                      >
                        <Avatar>
                          <AvatarImage src={conversation.avatar || "/placeholder.svg"} alt={conversation.name} />
                          <AvatarFallback>{conversation.initials}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium leading-none">{conversation.name}</p>
                            <p className="text-xs text-muted-foreground">{conversation.time}</p>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-1">{conversation.message}</p>
                        </div>
                        {conversation.unread && <Badge className="ml-auto h-2 w-2 rounded-full p-0" />}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="unread" className="m-0">
                <ScrollArea className="h-[calc(100vh-300px)]">
                  <div className="flex flex-col">
                    {[
                      {
                        name: "Dr. Robert Wilson",
                        avatar: "/placeholder-user.jpg",
                        initials: "RW",
                        message: "I've updated the lesson plan for next week",
                        time: "10:30 AM",
                      },
                      {
                        name: "Parent Group - Grade 10A",
                        avatar: "/placeholder-user.jpg",
                        initials: "PG",
                        message: "When is the next parent-teacher meeting?",
                        time: "Yesterday",
                      },
                    ].map((conversation, i) => (
                      <div
                        key={i}
                        className={`flex items-center gap-3 border-b p-3 hover:bg-muted/50 ${
                          i === 0 ? "bg-muted/50" : ""
                        }`}
                      >
                        <Avatar>
                          <AvatarImage src={conversation.avatar || "/placeholder.svg"} alt={conversation.name} />
                          <AvatarFallback>{conversation.initials}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium leading-none">{conversation.name}</p>
                            <p className="text-xs text-muted-foreground">{conversation.time}</p>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-1">{conversation.message}</p>
                        </div>
                        <Badge className="ml-auto h-2 w-2 rounded-full p-0" />
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="important" className="m-0">
                <div className="p-6 text-center text-sm text-muted-foreground">No important messages</div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        <Card className="md:col-span-8 lg:col-span-9">
          <CardHeader className="border-b p-4">
            <div className="flex items-center">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder-user.jpg" alt="Dr. Robert Wilson" />
                <AvatarFallback>RW</AvatarFallback>
              </Avatar>
              <div className="ml-4">
                <CardTitle>Dr. Robert Wilson</CardTitle>
                <CardDescription>Mathematics Department</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-350px)]">
              <div className="flex flex-col gap-4 p-4">
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg" alt="Dr. Robert Wilson" />
                    <AvatarFallback>RW</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">Dr. Robert Wilson</p>
                      <span className="text-xs text-muted-foreground">10:15 AM</span>
                    </div>
                    <div className="rounded-lg bg-muted p-3 text-sm">
                      Hello! I wanted to discuss the upcoming mathematics curriculum changes. I've been working on some
                      updates to the lesson plan for next week.
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 self-end">
                  <div className="flex-1">
                    <div className="flex items-center justify-end gap-2">
                      <span className="text-xs text-muted-foreground">10:20 AM</span>
                      <p className="text-sm font-medium">You</p>
                    </div>
                    <div className="rounded-lg bg-primary p-3 text-sm text-primary-foreground">
                      Hi Dr. Wilson, that sounds great. What specific changes are you proposing?
                    </div>
                  </div>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg" alt="You" />
                    <AvatarFallback>You</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg" alt="Dr. Robert Wilson" />
                    <AvatarFallback>RW</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">Dr. Robert Wilson</p>
                      <span className="text-xs text-muted-foreground">10:30 AM</span>
                    </div>
                    <div className="rounded-lg bg-muted p-3 text-sm">
                      I've updated the lesson plan for next week to include more practical applications of calculus.
                      I've also added some group activities that should help students better understand the concepts.
                      Would you like me to share the document with you?
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
            <div className="border-t p-4">
              <div className="flex items-end gap-2">
                <Textarea placeholder="Type your message..." className="min-h-[80px] flex-1 resize-none" />
                <div className="flex flex-col gap-2">
                  <Button size="icon" variant="ghost">
                    <PaperclipIcon className="h-4 w-4" />
                    <span className="sr-only">Attach file</span>
                  </Button>
                  <Button size="icon">
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send message</span>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
