"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2 } from "lucide-react"
import { analyticsApi } from "@/src/lib/api"
import { toast } from "@/components/ui/use-toast"

interface Activity {
  type: string
  description: string
  timestamp: string
}

export function RecentActivities() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecentActivities = async () => {
      try {
        setLoading(true)
        const response = await analyticsApi.getDashboard()
        setActivities(response.data.recent_activities || [])
      } catch (error) {
        console.error('Error fetching recent activities:', error)
        toast({
          title: "Error",
          description: "Failed to fetch recent activities",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchRecentActivities()
  }, [])

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date()
    const activityTime = new Date(timestamp)
    const diffInHours = Math.floor((now.getTime() - activityTime.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return 'Just now'
    if (diffInHours === 1) return '1 hour ago'
    if (diffInHours < 24) return `${diffInHours} hours ago`

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays === 1) return '1 day ago'
    return `${diffInDays} days ago`
  }

  const getActivityIcon = (type: string) => {
    const name = type.replace('_', ' ')
    return name.split(' ').map(word => word.charAt(0).toUpperCase()).join('')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="ml-2">Loading activities...</span>
      </div>
    )
  }

  if (activities.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No recent activities found
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {activities.map((activity, index) => (
        <div className="flex items-center" key={index}>
          <Avatar className="h-9 w-9">
            <AvatarFallback>{getActivityIcon(activity.type)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{activity.description}</p>
            <p className="text-sm text-muted-foreground">{activity.type.replace('_', ' ')}</p>
          </div>
          <div className="ml-auto text-xs text-muted-foreground">
            {formatTimeAgo(activity.timestamp)}
          </div>
        </div>
      ))}
    </div>
  )
}
