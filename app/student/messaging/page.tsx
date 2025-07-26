import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StudentMessaging } from "@/components/student/student-messaging"
import { StudentContacts } from "@/components/student/student-contacts"

export default function StudentMessagingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
        <p className="text-muted-foreground">Communicate with teachers and classmates</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Messaging Center</CardTitle>
          <CardDescription>View and send messages</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="messages" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4 max-w-[400px]">
              <TabsTrigger value="messages">Messages</TabsTrigger>
              <TabsTrigger value="contacts">Contacts</TabsTrigger>
            </TabsList>
            <TabsContent value="messages" className="mt-0">
              <StudentMessaging />
            </TabsContent>
            <TabsContent value="contacts" className="mt-0">
              <StudentContacts />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
