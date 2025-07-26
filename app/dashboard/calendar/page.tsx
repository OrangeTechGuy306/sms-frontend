import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/calendar/calendar"

export default function CalendarPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">School Calendar</h2>
        <div className="flex gap-2">
          <Select defaultValue="month">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Day</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="year">Year</SelectItem>
            </SelectContent>
          </Select>
          <Button>Add Event</Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
            <CardDescription>Filter events by category</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300" defaultChecked />
                <span>Academic</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300" defaultChecked />
                <span>Sports</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300" defaultChecked />
                <span>Cultural</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300" defaultChecked />
                <span>Holidays</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300" defaultChecked />
                <span>Exams</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300" defaultChecked />
                <span>Meetings</span>
              </label>
            </div>
            <div className="pt-4">
              <h3 className="mb-2 text-sm font-medium">Upcoming Events</h3>
              <div className="space-y-3">
                <div className="rounded-md bg-muted p-3">
                  <h4 className="font-medium">Annual Sports Day</h4>
                  <p className="text-xs text-muted-foreground">Oct 15, 9:00 AM - 4:00 PM</p>
                </div>
                <div className="rounded-md bg-muted p-3">
                  <h4 className="font-medium">Science Fair</h4>
                  <p className="text-xs text-muted-foreground">Nov 5, 10:00 AM - 3:00 PM</p>
                </div>
                <div className="rounded-md bg-muted p-3">
                  <h4 className="font-medium">Parent-Teacher Conference</h4>
                  <p className="text-xs text-muted-foreground">Nov 20, 2:00 PM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="md:col-span-3">
          <CardContent className="p-0">
            <Calendar />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
