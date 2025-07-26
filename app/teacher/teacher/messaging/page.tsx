import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, Send } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function TeacherMessagingPage() {
  // Mock data for conversations
  const conversations = [
    {
      id: 1,
      name: "John Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "I'll submit the assignment tomorrow",
      time: "10:30 AM",
      unread: 2,
      type: "student",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Thank you for the feedback",
      time: "Yesterday",
      unread: 0,
      type: "student",
    },
    {
      id: 3,
      name: "Michael Brown",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Can I reschedule the meeting?",
      time: "Yesterday",
      unread: 0,
      type: "student",
    },
    {
      id: 4,
      name: "Emily Davis",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "I have a question about the homework",
      time: "Monday",
      unread: 0,
      type: "student",
    },
    {
      id: 5,
      name: "Robert Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "The department meeting is rescheduled",
      time: "Monday",
      unread: 0,
      type: "teacher",
    },
    {
      id: 6,
      name: "Jennifer Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Please review the curriculum changes",
      time: "Last week",
      unread: 0,
      type: "teacher",
    },
    {
      id: 7,
      name: "David Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "I'd like to discuss my son's progress",
      time: "Last week",
      unread: 0,
      type: "parent",
    },
    {
      id: 8,
      name: "Lisa Anderson",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Can we schedule a parent-teacher meeting?",
      time: "Last week",
      unread: 0,
      type: "parent",
    },
  ]

  // Mock data for messages in the current conversation
  const messages = [
    {
      id: 1,
      sender: "John Smith",
      content: "Hello Ms. Johnson, I have a question about today's homework assignment.",
      time: "10:15 AM",
      isMe: false,
    },
    {
      id: 2,
      sender: "Me",
      content: "Hi John, what's your question?",
      time: "10:20 AM",
      isMe: true,
    },
    {
      id: 3,
      sender: "John Smith",
      content: "I'm having trouble with question 5. Could you provide some hints on how to approach it?",
      time: "10:25 AM",
      isMe: false,
    },
    {
      id: 4,
      sender: "John Smith",
      content: "Also, will we need to submit this assignment tomorrow or next week?",
      time: "10:26 AM",
      isMe: false,
    },
    {
      id: 5,
      sender: "Me",
      content:
        "For question 5, try using the formula we discussed in class yesterday. Remember to break down the problem into smaller steps.",
      time: "10:28 AM",
      isMe: true,
    },
    {
      id: 6,
      sender: "John Smith",
      content: "Thank you! I'll try that approach. And about the submission deadline?",
      time: "10:29 AM",
      isMe: false,
    },
    {
      id: 7,
      sender: "John Smith",
      content: "I'll submit the assignment tomorrow",
      time: "10:30 AM",
      isMe: false,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Messaging</h2>
          <p className="text-muted-foreground">Communicate with students, parents, and colleagues</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Message
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="col-span-3 md:col-span-1">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>Conversations</CardTitle>
              <Badge>{conversations.filter((c) => c.unread > 0).length}</Badge>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search messages..." className="pl-8" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="all" className="px-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">Unread</TabsTrigger>
                <TabsTrigger value="flagged">Flagged</TabsTrigger>
              </TabsList>
            </Tabs>
            <ScrollArea className="h-[calc(100vh-300px)]">
              <div className="divide-y">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`flex cursor-pointer items-center gap-3 p-4 hover:bg-muted/50 ${
                      conversation.id === 1 ? "bg-muted" : ""
                    }`}
                  >
                    <Avatar>
                      <AvatarImage src={conversation.avatar || "/placeholder.svg"} alt={conversation.name} />
                      <AvatarFallback>
                        {conversation.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{conversation.name}</div>
                        <div className="text-xs text-muted-foreground">{conversation.time}</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="truncate text-sm text-muted-foreground">{conversation.lastMessage}</div>
                        {conversation.unread > 0 && (
                          <Badge variant="secondary" className="ml-2">
                            {conversation.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="col-span-3 md:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="John Smith" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>John Smith</CardTitle>
                  <CardDescription>Class 9A • Mathematics</CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  View Profile
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-400px)] px-4 py-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.isMe ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.isMe ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <div className="text-sm">{message.content}</div>
                      <div
                        className={`mt-1 text-right text-xs ${
                          message.isMe ? "text-primary-foreground/80" : "text-muted-foreground"
                        }`}
                      >
                        {message.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="border-t p-4">
              <div className="flex items-end gap-2">
                <Textarea placeholder="Type your message..." className="min-h-[80px]" />
                <Button size="icon" className="h-10 w-10 shrink-0">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
