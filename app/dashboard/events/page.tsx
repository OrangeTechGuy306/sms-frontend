"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DataTable } from "@/components/ui/data-table"
import { eventsApi } from "@/src/lib/api"
import { toast } from "@/components/ui/use-toast"
import { Plus, CalendarIcon, Loader2, Edit, Trash2 } from "lucide-react"
import type { ColumnDef } from "@tanstack/react-table"

interface Event {
  id: string
  title: string
  description?: string
  type: string
  start_date: string
  end_date?: string
  start_time?: string
  end_time?: string
  location?: string
  organizer?: string
  max_participants?: number
  current_participants?: number
  status: string
  created_at: string
  updated_at: string
}

interface EventStats {
  total_events: number
  upcoming_events: number
  total_participants: number
  event_types: number
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [stats, setStats] = useState<EventStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  })

  const fetchEvents = async (page = 1, limit = 10, search = '') => {
    try {
      setLoading(true)
      const response = await eventsApi.getAll({
        page,
        limit,
        search,
        sort_by: 'start_date',
        sort_order: 'asc'
      })

      setEvents(response.data as Event[])
      if ((response as any).pagination) {
        setPagination((response as any).pagination)
      }
    } catch (error) {
      console.error('Error fetching events:', error)
      toast({
        title: "Error",
        description: "Failed to fetch events. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await eventsApi.getStatistics()
      setStats((response as any).data)
    } catch (error) {
      console.error('Error fetching event stats:', error)
    }
  }

  useEffect(() => {
    fetchEvents()
    fetchStats()
  }, [])

  const handleDeleteEvent = async (id: string) => {
    try {
      await eventsApi.delete(id)
      setEvents(prev => prev.filter(event => event.id !== id))
      toast({
        title: "Event Deleted",
        description: "Event has been deleted successfully.",
      })
    } catch (error) {
      console.error('Error deleting event:', error)
      toast({
        title: "Error",
        description: "Failed to delete event. Please try again.",
        variant: "destructive",
      })
    }
  }

  const columns: ColumnDef<Event>[] = [
    {
      accessorKey: "title",
      header: "Event Name",
      cell: ({ row }) => <div className="font-medium">{row.getValue("title")}</div>,
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => {
        const type = row.getValue("type") as string
        return <Badge variant="outline">{type}</Badge>
      },
    },
    {
      accessorKey: "start_date",
      header: "Date",
      cell: ({ row }) => {
        const date = new Date(row.getValue("start_date"))
        return date.toLocaleDateString()
      },
    },
    {
      accessorKey: "start_time",
      header: "Time",
      cell: ({ row }) => {
        const time = row.getValue("start_time") as string
        return time || 'All day'
      },
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: ({ row }) => {
        const location = row.getValue("location") as string
        return location || 'TBD'
      },
    },
    {
      accessorKey: "organizer",
      header: "Organizer",
      cell: ({ row }) => {
        const organizer = row.getValue("organizer") as string
        return organizer || 'School'
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        const variant = status === 'active' ? 'default' :
                      status === 'completed' ? 'secondary' : 'outline'
        return <Badge variant={variant}>{status}</Badge>
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const event = row.original
        return (
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDeleteEvent(event.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )
      },
    },
  ]
  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <div className="text-lg font-medium">Loading events...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Events</h1>
          <p className="text-muted-foreground">
            Manage school events and activities.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <CalendarIcon className="mr-2 h-4 w-4" />
            View Calendar
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.upcoming_events || 0}</div>
            <p className="text-xs text-muted-foreground">Next 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.total_events || 0}</div>
            <p className="text-xs text-muted-foreground">This academic year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Participants</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.total_participants || 0}</div>
            <p className="text-xs text-muted-foreground">Across all events</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Event Types</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.event_types || 0}</div>
            <p className="text-xs text-muted-foreground">Categories of events</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Event Management</CardTitle>
          <CardDescription>View and manage school events and activities</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={events}
            searchKey="title"
            searchPlaceholder="Search events..."
          />
        </CardContent>
      </Card>
    </div>
  )
}
