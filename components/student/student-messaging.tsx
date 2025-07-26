"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { PaperclipIcon, SendIcon, SmileIcon } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock messages data
const conversations = [
  {
    id: 1,
    name: "Mr. Johnson",
    role: "Mathematics Teacher",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Don't forget to submit your homework by Friday.",
    time: "10:30 AM",
    unread: true,
  },
  {
    id: 2,
    name: "Mrs. Smith",
    role: "English Teacher",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Great job on your essay! I've provided feedback.",
    time: "Yesterday",
    unread: false,
  },
  {
    id: 3,
    name: "Dr. Williams",
    role: "Science Teacher",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Please prepare for the lab session tomorrow.",
    time: "Yesterday",
    unread: false,
  },
  {
    id: 4,
    name: "Ms. Davis",
    role: "History Teacher",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "The project deadline has been extended to next week.",
    time: "May 28",
    unread: false,
  },
  {
    id: 5,
    name: "Mr. Wilson",
    role: "Art Teacher",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Don't forget to bring your art supplies tomorrow.",
    time: "May 27",
    unread: false,
  },
]

const messageHistory = [
  {
    id: 1,
    sender: "Mr. Johnson",
    content: "Hello Sarah, I wanted to check if you have any questions about the upcoming test?",
    time: "10:15 AM",
    isMe: false,
  },
  {
    id: 2,
    sender: "Me",
    content: "Hi Mr. Johnson, yes I do! I'm having trouble with the quadratic equations section.",
    time: "10:18 AM",
    isMe: true,
  },
  {
    id: 3,
    sender: "Mr. Johnson",
    content: "I understand. That can be challenging. Let me recommend some practice problems that might help you.",
    time: "10:20 AM",
    isMe: false,
  },
  {
    id: 4,
    sender: "Mr. Johnson",
    content: "Also, don't forget to review the examples we covered in class last week.",
    time: "10:21 AM",
    isMe: false,
  },
  {
    id: 5,
    sender: "Me",
    content: "Thank you! That would be very helpful. I'll go through my notes again as well.",
    time: "10:25 AM",
    isMe: true,
  },
  {
    id: 6,
    sender: "Mr. Johnson",
    content: "Don't forget to submit your homework by Friday. Let me know if you need any further assistance!",
    time: "10:30 AM",
    isMe: false,
  },
]

export function StudentMessaging() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [message, setMessage] = useState("")

  return (
    <div className="flex h-[600px] border rounded-md overflow-hidden">
      {/* Conversation List */}
      <div className="w-full md:w-1/3 border-r">
        <div className="p-3 border-b">
          <Input placeholder="Search messages..." className="w-full" />
        </div>
        <ScrollArea className="h-[calc(600px-57px)]">
          <div className="space-y-1 p-2">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={cn(
                  "flex items-center gap-3 p-3 cursor-pointer rounded-md hover:bg-slate-100 dark:hover:bg-slate-800",
                  selectedConversation.id === conversation.id && "bg-slate-100 dark:bg-slate-800",
                )}
                onClick={() => setSelectedConversation(conversation)}
              >
                <Avatar>
                  <AvatarImage src={conversation.avatar || "/placeholder.svg"} alt={conversation.name} />
                  <AvatarFallback>{conversation.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm truncate">{conversation.name}</h4>
                    <span className="text-xs text-muted-foreground">{conversation.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground truncate">{conversation.lastMessage}</p>
                    {conversation.unread && <div className="h-2 w-2 rounded-full bg-violet-600"></div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Message Area */}
      <div className="hidden md:flex flex-col w-2/3">
        <div className="p-3 border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={selectedConversation.avatar || "/placeholder.svg"} alt={selectedConversation.name} />
              <AvatarFallback>{selectedConversation.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-medium">{selectedConversation.name}</h4>
              <p className="text-xs text-muted-foreground">{selectedConversation.role}</p>
            </div>
          </div>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messageHistory.map((msg) => (
              <div key={msg.id} className={cn("flex", msg.isMe ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg p-3",
                    msg.isMe ? "bg-violet-600 text-white" : "bg-slate-100 dark:bg-slate-800",
                  )}
                >
                  <p className="text-sm">{msg.content}</p>
                  <p className="text-xs text-right mt-1 opacity-70">{msg.time}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-3 border-t">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="rounded-full">
              <PaperclipIcon className="h-4 w-4" />
            </Button>
            <Textarea
              placeholder="Type a message..."
              className="min-h-10 flex-1 resize-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button variant="outline" size="icon" className="rounded-full">
              <SmileIcon className="h-4 w-4" />
            </Button>
            <Button size="icon" className="rounded-full">
              <SendIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
