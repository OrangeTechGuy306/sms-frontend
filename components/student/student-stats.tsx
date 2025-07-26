import { BookOpen, Calendar, CheckCircle, GraduationCap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function StudentStats() {
  // Mock data - in a real app, this would come from an API
  const stats = [
    {
      title: "Current GPA",
      value: "3.8",
      icon: GraduationCap,
      description: "Out of 4.0",
      change: "+0.2 from last semester",
      trend: "up",
      color: "violet",
    },
    {
      title: "Attendance Rate",
      value: "95%",
      icon: CheckCircle,
      description: "Last 30 days",
      change: "+2% from previous month",
      trend: "up",
      color: "green",
    },
    {
      title: "Active Courses",
      value: "6",
      icon: BookOpen,
      description: "Current semester",
      change: "All courses in progress",
      trend: "neutral",
      color: "blue",
    },
    {
      title: "Upcoming Tests",
      value: "3",
      icon: Calendar,
      description: "Next 7 days",
      change: "2 assignments due soon",
      trend: "neutral",
      color: "amber",
    },
  ]

  const getColorClasses = (color: string) => {
    switch (color) {
      case "violet":
        return "bg-violet-100 dark:bg-violet-900 text-violet-600 dark:text-violet-400"
      case "green":
        return "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400"
      case "blue":
        return "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
      case "amber":
        return "bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-400"
      default:
        return "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-0 shadow-md overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${getColorClasses(stat.color)}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                <p
                  className={`text-xs mt-1 ${
                    stat.trend === "up"
                      ? "text-green-600 dark:text-green-400"
                      : stat.trend === "down"
                        ? "text-red-600 dark:text-red-400"
                        : "text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {stat.change}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
