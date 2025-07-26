"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from "@/components/ui/calendar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Trophy,
  Users,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Star,
  Award,
  Target,
  Heart,
  Music,
  Palette,
  Camera,
  Gamepad2,
  BookOpen,
  Mic,
  Dumbbell,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  User,
  CheckCircle,
  XCircle,
  AlertTriangle,
  TrendingUp,
  BarChart3,
} from "lucide-react"

// Sample extracurricular data
const clubs = [
  {
    id: "CLUB001",
    name: "Drama Club",
    category: "Arts",
    advisor: "Ms. Sarah Johnson",
    members: 24,
    maxMembers: 30,
    meetingDay: "Tuesday",
    meetingTime: "3:30 PM - 5:00 PM",
    location: "Theater Room",
    description: "Explore acting, directing, and theatrical production",
    status: "active",
    upcomingEvents: [
      { event: "Spring Play Auditions", date: "2024-04-25" },
      { event: "Rehearsal", date: "2024-04-23" }
    ],
    achievements: ["Regional Drama Competition - 2nd Place", "Best Original Script Award"],
    icon: Mic,
  },
  {
    id: "CLUB002",
    name: "Robotics Team",
    category: "STEM",
    advisor: "Mr. David Chen",
    members: 18,
    maxMembers: 20,
    meetingDay: "Thursday",
    meetingTime: "3:30 PM - 5:30 PM",
    location: "Computer Lab",
    description: "Build and program robots for competitions",
    status: "active",
    upcomingEvents: [
      { event: "State Robotics Competition", date: "2024-05-15" },
      { event: "Robot Testing", date: "2024-04-24" }
    ],
    achievements: ["State Championship - 1st Place", "Innovation Award"],
    icon: Gamepad2,
  },
  {
    id: "CLUB003",
    name: "Art Club",
    category: "Arts",
    advisor: "Ms. Emily Rodriguez",
    members: 32,
    maxMembers: 35,
    meetingDay: "Wednesday",
    meetingTime: "3:30 PM - 4:30 PM",
    location: "Art Studio",
    description: "Express creativity through various art mediums",
    status: "active",
    upcomingEvents: [
      { event: "Art Exhibition", date: "2024-05-01" },
      { event: "Pottery Workshop", date: "2024-04-26" }
    ],
    achievements: ["Best Student Art Show", "Community Art Award"],
    icon: Palette,
  },
]

const sportsTeams = [
  {
    id: "SPORT001",
    name: "Varsity Basketball",
    season: "Winter",
    coach: "Coach Mike Thompson",
    assistantCoach: "Coach Lisa Wilson",
    players: 15,
    wins: 12,
    losses: 3,
    nextGame: {
      opponent: "Riverside High",
      date: "2024-04-22",
      time: "7:00 PM",
      location: "Home Gym"
    },
    schedule: [
      { date: "2024-04-22", opponent: "Riverside High", location: "Home", time: "7:00 PM" },
      { date: "2024-04-25", opponent: "Oak Valley", location: "Away", time: "6:30 PM" },
    ],
    achievements: ["District Champions", "Regional Semi-Finalists"],
    icon: Dumbbell,
  },
  {
    id: "SPORT002",
    name: "Soccer Team",
    season: "Spring",
    coach: "Coach Maria Garcia",
    assistantCoach: "Coach John Davis",
    players: 22,
    wins: 8,
    losses: 2,
    nextGame: {
      opponent: "Pine Valley",
      date: "2024-04-24",
      time: "4:00 PM",
      location: "Soccer Field"
    },
    schedule: [
      { date: "2024-04-24", opponent: "Pine Valley", location: "Home", time: "4:00 PM" },
      { date: "2024-04-27", opponent: "Mountain View", location: "Away", time: "3:30 PM" },
    ],
    achievements: ["League Champions", "State Tournament Qualifiers"],
    icon: Dumbbell,
  },
]

const competitions = [
  {
    id: "COMP001",
    name: "Science Fair",
    category: "Academic",
    date: "2024-05-10",
    location: "School Auditorium",
    participants: 45,
    status: "upcoming",
    description: "Annual science fair showcasing student research projects",
    prizes: ["1st Place: $500", "2nd Place: $300", "3rd Place: $200"],
    judges: ["Dr. Smith", "Prof. Johnson", "Ms. Davis"],
  },
  {
    id: "COMP002",
    name: "Math Olympiad",
    category: "Academic",
    date: "2024-04-28",
    location: "Mathematics Building",
    participants: 32,
    status: "upcoming",
    description: "Regional mathematics competition",
    prizes: ["Gold Medal", "Silver Medal", "Bronze Medal"],
    judges: ["Mr. Wilson", "Ms. Thompson"],
  },
]

const communityService = [
  {
    id: "SERVICE001",
    student: "Emma Thompson",
    studentId: "STU001",
    activity: "Food Bank Volunteer",
    organization: "City Food Bank",
    hours: 25,
    date: "2024-03-15",
    supervisor: "Ms. Johnson",
    description: "Helped sort and distribute food to families in need",
    status: "verified",
  },
  {
    id: "SERVICE002",
    student: "James Wilson",
    studentId: "STU002",
    activity: "Library Reading Program",
    organization: "Public Library",
    hours: 15,
    date: "2024-03-20",
    supervisor: "Mr. Davis",
    description: "Read stories to children during summer reading program",
    status: "pending",
  },
]

const leadershipPrograms = [
  {
    id: "LEAD001",
    name: "Student Government",
    positions: [
      { title: "President", student: "Alex Johnson", responsibilities: "Lead student body initiatives" },
      { title: "Vice President", student: "Maya Patel", responsibilities: "Support president and lead committees" },
      { title: "Secretary", student: "Sam Wilson", responsibilities: "Record meetings and manage communications" },
      { title: "Treasurer", student: "Emma Davis", responsibilities: "Manage student government budget" },
    ],
    meetings: "Every Friday at 3:30 PM",
    advisor: "Mr. Principal",
  },
  {
    id: "LEAD002",
    name: "Peer Mentoring Program",
    mentors: 24,
    mentees: 48,
    coordinator: "Ms. Counselor",
    description: "Upper-class students mentor underclassmen",
    trainingRequired: true,
  },
]

export function ExtracurricularActivities() {
  const [activeTab, setActiveTab] = useState("clubs")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedClub, setSelectedClub] = useState<typeof clubs[0] | null>(null)
  const [isClubDetailOpen, setIsClubDetailOpen] = useState(false)
  const [isAddClubOpen, setIsAddClubOpen] = useState(false)
  const [isServiceOpen, setIsServiceOpen] = useState(false)

  // Filter clubs
  const filteredClubs = clubs.filter((club) => {
    const matchesSearch = club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         club.advisor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || club.category.toLowerCase() === selectedCategory
    const matchesStatus = selectedStatus === "all" || club.status === selectedStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleViewClub = (club: typeof clubs[0]) => {
    setSelectedClub(club)
    setIsClubDetailOpen(true)
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active": return "outline"
      case "inactive": return "secondary"
      case "upcoming": return "default"
      case "completed": return "outline"
      case "verified": return "outline"
      case "pending": return "secondary"
      default: return "outline"
    }
  }

  const getMembershipColor = (current: number, max: number) => {
    const percentage = (current / max) * 100
    if (percentage >= 90) return "text-red-600"
    if (percentage >= 75) return "text-yellow-600"
    return "text-green-600"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Extracurricular Activities</h2>
          <p className="text-muted-foreground">Manage clubs, sports teams, competitions, and student leadership</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Activities
          </Button>
          <Dialog open={isAddClubOpen} onOpenChange={setIsAddClubOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Activity
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Activity</DialogTitle>
                <DialogDescription>Create a new club or extracurricular activity</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="activity-name">Activity Name</Label>
                    <Input id="activity-name" placeholder="Drama Club" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="arts">Arts</SelectItem>
                        <SelectItem value="stem">STEM</SelectItem>
                        <SelectItem value="sports">Sports</SelectItem>
                        <SelectItem value="academic">Academic</SelectItem>
                        <SelectItem value="service">Community Service</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="advisor">Advisor</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select advisor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sarah">Ms. Sarah Johnson</SelectItem>
                        <SelectItem value="david">Mr. David Chen</SelectItem>
                        <SelectItem value="emily">Ms. Emily Rodriguez</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max-members">Max Members</Label>
                    <Input id="max-members" type="number" placeholder="30" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Activity description..." />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddClubOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddClubOpen(false)}>Create Activity</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="clubs">Clubs & Organizations</TabsTrigger>
          <TabsTrigger value="sports">Sports Teams</TabsTrigger>
          <TabsTrigger value="competitions">Competitions</TabsTrigger>
          <TabsTrigger value="service">Community Service</TabsTrigger>
          <TabsTrigger value="leadership">Leadership</TabsTrigger>
        </TabsList>

        {/* Clubs & Organizations Tab */}
        <TabsContent value="clubs" className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search clubs and organizations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="arts">Arts</SelectItem>
                <SelectItem value="stem">STEM</SelectItem>
                <SelectItem value="academic">Academic</SelectItem>
                <SelectItem value="service">Service</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredClubs.map((club) => (
              <Card key={club.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <club.icon className="h-5 w-5" />
                    {club.name}
                  </CardTitle>
                  <CardDescription>{club.advisor}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{club.category}</Badge>
                    <Badge variant={getStatusBadgeVariant(club.status)}>
                      {club.status}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Members:</span>
                      <span className={`font-medium ${getMembershipColor(club.members, club.maxMembers)}`}>
                        {club.members}/{club.maxMembers}
                      </span>
                    </div>
                    <Progress value={(club.members / club.maxMembers) * 100} className="h-2" />
                  </div>
                  <div className="text-sm space-y-1">
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="h-3 w-3 text-muted-foreground" />
                      <span>{club.meetingDay}s</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span>{club.meetingTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span>{club.location}</span>
                    </div>
                  </div>
                  <div className="pt-2">
                    <Button variant="outline" size="sm" className="w-full" onClick={() => handleViewClub(club)}>
                      <Eye className="h-3 w-3 mr-1" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Sports Teams Tab */}
        <TabsContent value="sports" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {sportsTeams.map((team) => (
              <Card key={team.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{team.name}</span>
                    <Badge variant="outline">{team.season}</Badge>
                  </CardTitle>
                  <CardDescription>
                    Coach: {team.coach} | Assistant: {team.assistantCoach}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-600">{team.wins}</div>
                      <div className="text-xs text-muted-foreground">Wins</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-red-600">{team.losses}</div>
                      <div className="text-xs text-muted-foreground">Losses</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{team.players}</div>
                      <div className="text-xs text-muted-foreground">Players</div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Next Game</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Opponent:</span>
                        <span className="font-medium">{team.nextGame.opponent}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Date:</span>
                        <span>{team.nextGame.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Time:</span>
                        <span>{team.nextGame.time}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Location:</span>
                        <span>{team.nextGame.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Achievements</h4>
                    <div className="space-y-1">
                      {team.achievements.map((achievement, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <Trophy className="h-3 w-3 text-yellow-500" />
                          <span>{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Community Service Tab */}
        <TabsContent value="service" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Community Service Hours</h3>
              <p className="text-sm text-muted-foreground">Track student volunteer activities and service hours</p>
            </div>
            <Dialog open={isServiceOpen} onOpenChange={setIsServiceOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Log Service Hours
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Log Community Service Hours</DialogTitle>
                  <DialogDescription>Record volunteer activity for a student</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="service-student">Student</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select student" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="stu001">Emma Thompson</SelectItem>
                          <SelectItem value="stu002">James Wilson</SelectItem>
                          <SelectItem value="stu003">Sophia Martinez</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hours">Hours</Label>
                      <Input id="hours" type="number" placeholder="5" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="activity">Activity</Label>
                    <Input id="activity" placeholder="Food Bank Volunteer" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="organization">Organization</Label>
                    <Input id="organization" placeholder="City Food Bank" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service-date">Date</Label>
                    <Input id="service-date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="supervisor">Supervisor</Label>
                    <Input id="supervisor" placeholder="Supervisor name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service-description">Description</Label>
                    <Textarea id="service-description" placeholder="Describe the volunteer activity..." />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsServiceOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsServiceOpen(false)}>
                    Log Hours
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Activity</TableHead>
                    <TableHead>Organization</TableHead>
                    <TableHead>Hours</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {communityService.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{service.student}</div>
                          <div className="text-sm text-muted-foreground">{service.studentId}</div>
                        </div>
                      </TableCell>
                      <TableCell>{service.activity}</TableCell>
                      <TableCell>{service.organization}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="font-medium">{service.hours}h</span>
                        </div>
                      </TableCell>
                      <TableCell>{service.date}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(service.status)}>
                          {service.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Verify Hours
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Entry
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
