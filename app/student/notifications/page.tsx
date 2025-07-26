import StudentNotificationsList from "@/components/student/student-notifications-list"
import StudentNotificationSettings from "@/components/student/student-notification-settings"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function StudentNotificationsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Notifications</h2>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Notifications</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <StudentNotificationsList />
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <StudentNotificationSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}
