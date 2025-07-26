"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  Bus,
  MapPin,
  Clock,
  Users,
  Route,
  Navigation,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Phone,
  User,
  Calendar,
  Wrench,
  Fuel,
  Shield,
  Bell,
  TrendingUp,
  TrendingDown,
  Activity,
} from "lucide-react"

// Sample transportation data
const busRoutes = [
  {
    id: "ROUTE001",
    name: "Route A - North District",
    busNumber: "BUS-101",
    driver: "John Smith",
    driverPhone: "+1 (555) 123-4567",
    capacity: 45,
    currentOccupancy: 38,
    status: "active",
    estimatedTime: "45 minutes",
    stops: [
      { name: "Maple Street", time: "7:15 AM", students: 8 },
      { name: "Oak Avenue", time: "7:25 AM", students: 12 },
      { name: "Pine Road", time: "7:35 AM", students: 10 },
      { name: "School", time: "7:50 AM", students: 0 },
    ],
    gpsLocation: { lat: 40.7128, lng: -74.0060 },
    lastUpdate: "2024-04-18 7:45 AM",
  },
  {
    id: "ROUTE002",
    name: "Route B - South District",
    busNumber: "BUS-102",
    driver: "Maria Garcia",
    driverPhone: "+1 (555) 234-5678",
    capacity: 45,
    currentOccupancy: 42,
    status: "active",
    estimatedTime: "50 minutes",
    stops: [
      { name: "Elm Street", time: "7:10 AM", students: 15 },
      { name: "Cedar Lane", time: "7:20 AM", students: 14 },
      { name: "Birch Drive", time: "7:30 AM", students: 13 },
      { name: "School", time: "7:55 AM", students: 0 },
    ],
    gpsLocation: { lat: 40.7589, lng: -73.9851 },
    lastUpdate: "2024-04-18 7:42 AM",
  },
  {
    id: "ROUTE003",
    name: "Route C - East District",
    busNumber: "BUS-103",
    driver: "Robert Johnson",
    driverPhone: "+1 (555) 345-6789",
    capacity: 45,
    currentOccupancy: 35,
    status: "delayed",
    estimatedTime: "55 minutes",
    stops: [
      { name: "Willow Street", time: "7:20 AM", students: 10 },
      { name: "Spruce Avenue", time: "7:30 AM", students: 12 },
      { name: "Poplar Road", time: "7:40 AM", students: 13 },
      { name: "School", time: "8:00 AM", students: 0 },
    ],
    gpsLocation: { lat: 40.7505, lng: -73.9934 },
    lastUpdate: "2024-04-18 7:38 AM",
  },
]

const vehicles = [
  {
    id: "BUS-101",
    model: "Blue Bird Vision",
    year: 2020,
    capacity: 45,
    mileage: 45000,
    lastMaintenance: "2024-03-15",
    nextMaintenance: "2024-06-15",
    fuelLevel: 85,
    status: "operational",
    inspectionDue: "2024-08-15",
    issues: [],
  },
  {
    id: "BUS-102",
    model: "Thomas Built Saf-T-Liner",
    year: 2019,
    capacity: 45,
    mileage: 52000,
    lastMaintenance: "2024-02-28",
    nextMaintenance: "2024-05-28",
    fuelLevel: 92,
    status: "operational",
    inspectionDue: "2024-07-20",
    issues: [],
  },
  {
    id: "BUS-103",
    model: "IC Bus CE Series",
    year: 2021,
    capacity: 45,
    mileage: 38000,
    lastMaintenance: "2024-04-01",
    nextMaintenance: "2024-07-01",
    fuelLevel: 68,
    status: "maintenance",
    inspectionDue: "2024-09-10",
    issues: ["Brake inspection needed", "Oil change due"],
  },
]

const emergencyProcedures = [
  {
    id: "PROC001",
    title: "Medical Emergency on Bus",
    description: "Procedures for handling medical emergencies during transportation",
    steps: [
      "Stop the bus safely",
      "Call 911 immediately",
      "Contact school administration",
      "Provide first aid if trained",
      "Notify parents/guardians",
    ],
  },
  {
    id: "PROC002",
    title: "Vehicle Breakdown",
    description: "Steps to follow when a bus breaks down",
    steps: [
      "Move to safe location",
      "Turn on hazard lights",
      "Contact transportation office",
      "Keep students on bus unless unsafe",
      "Wait for replacement vehicle",
    ],
  },
  {
    id: "PROC003",
    title: "Severe Weather",
    description: "Protocol for severe weather conditions",
    steps: [
      "Monitor weather alerts",
      "Adjust routes if necessary",
      "Communicate delays to parents",
      "Consider canceling transportation",
      "Follow district weather policy",
    ],
  },
]

export function TransportationManagement() {
  const [activeTab, setActiveTab] = useState("routes")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedRoute, setSelectedRoute] = useState<typeof busRoutes[0] | null>(null)
  const [isRouteDetailOpen, setIsRouteDetailOpen] = useState(false)
  const [isAddRouteOpen, setIsAddRouteOpen] = useState(false)
  const [isMaintenanceOpen, setIsMaintenanceOpen] = useState(false)

  // Filter routes
  const filteredRoutes = busRoutes.filter((route) => {
    const matchesSearch = route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         route.busNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         route.driver.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || route.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const handleViewRoute = (route: typeof busRoutes[0]) => {
    setSelectedRoute(route)
    setIsRouteDetailOpen(true)
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active": return "outline"
      case "delayed": return "secondary"
      case "cancelled": return "destructive"
      case "operational": return "outline"
      case "maintenance": return "secondary"
      default: return "outline"
    }
  }

  const getOccupancyColor = (occupancy: number, capacity: number) => {
    const percentage = (occupancy / capacity) * 100
    if (percentage >= 90) return "text-red-600"
    if (percentage >= 75) return "text-yellow-600"
    return "text-green-600"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Transportation Management</h2>
          <p className="text-muted-foreground">Manage school bus routes, vehicles, and transportation safety</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Routes
          </Button>
          <Dialog open={isAddRouteOpen} onOpenChange={setIsAddRouteOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Route
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Bus Route</DialogTitle>
                <DialogDescription>Create a new transportation route</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="route-name">Route Name</Label>
                    <Input id="route-name" placeholder="Route A - North District" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bus-number">Bus Number</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select bus" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bus-101">BUS-101</SelectItem>
                        <SelectItem value="bus-102">BUS-102</SelectItem>
                        <SelectItem value="bus-103">BUS-103</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="driver">Driver</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select driver" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="john">John Smith</SelectItem>
                        <SelectItem value="maria">Maria Garcia</SelectItem>
                        <SelectItem value="robert">Robert Johnson</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="estimated-time">Estimated Time</Label>
                    <Input id="estimated-time" placeholder="45 minutes" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddRouteOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddRouteOpen(false)}>Create Route</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="routes">Bus Routes</TabsTrigger>
          <TabsTrigger value="tracking">Live Tracking</TabsTrigger>
          <TabsTrigger value="vehicles">Vehicle Management</TabsTrigger>
          <TabsTrigger value="drivers">Driver Management</TabsTrigger>
          <TabsTrigger value="emergency">Emergency Procedures</TabsTrigger>
        </TabsList>

        {/* Bus Routes Tab */}
        <TabsContent value="routes" className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search routes, buses, or drivers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="delayed">Delayed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Route</TableHead>
                    <TableHead>Bus/Driver</TableHead>
                    <TableHead>Occupancy</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Estimated Time</TableHead>
                    <TableHead>Last Update</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRoutes.map((route) => (
                    <TableRow key={route.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{route.name}</div>
                          <div className="text-sm text-muted-foreground">{route.id}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{route.busNumber}</div>
                          <div className="text-sm text-muted-foreground">{route.driver}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className={`font-medium ${getOccupancyColor(route.currentOccupancy, route.capacity)}`}>
                            {route.currentOccupancy}/{route.capacity}
                          </span>
                          <Progress
                            value={(route.currentOccupancy / route.capacity) * 100}
                            className="w-16 h-2"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(route.status)}>
                          {route.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{route.estimatedTime}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-muted-foreground">{route.lastUpdate}</div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleViewRoute(route)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Navigation className="mr-2 h-4 w-4" />
                              Track Live
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Route
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Bell className="mr-2 h-4 w-4" />
                              Send Alert
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

        {/* Live Tracking Tab */}
        <TabsContent value="tracking" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {busRoutes.map((route) => (
              <Card key={route.id} className="relative">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between text-base">
                    <span>{route.busNumber}</span>
                    <Badge variant={getStatusBadgeVariant(route.status)}>
                      {route.status}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{route.name}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Driver:</span>
                    <span className="font-medium">{route.driver}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Occupancy:</span>
                    <span className={`font-medium ${getOccupancyColor(route.currentOccupancy, route.capacity)}`}>
                      {route.currentOccupancy}/{route.capacity}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>ETA to School:</span>
                    <span className="font-medium">{route.estimatedTime}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Last Update:</span>
                    <span className="text-muted-foreground">{route.lastUpdate}</span>
                  </div>
                  <div className="pt-2">
                    <Button variant="outline" size="sm" className="w-full">
                      <Navigation className="mr-2 h-4 w-4" />
                      View on Map
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Vehicle Management Tab */}
        <TabsContent value="vehicles" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Vehicle Fleet</h3>
              <p className="text-sm text-muted-foreground">Manage bus maintenance and inspections</p>
            </div>
            <Dialog open={isMaintenanceOpen} onOpenChange={setIsMaintenanceOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Wrench className="mr-2 h-4 w-4" />
                  Schedule Maintenance
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Schedule Vehicle Maintenance</DialogTitle>
                  <DialogDescription>Schedule maintenance for a vehicle</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="vehicle">Vehicle</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select vehicle" />
                      </SelectTrigger>
                      <SelectContent>
                        {vehicles.map((vehicle) => (
                          <SelectItem key={vehicle.id} value={vehicle.id}>
                            {vehicle.id} - {vehicle.model}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maintenance-type">Maintenance Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="routine">Routine Maintenance</SelectItem>
                        <SelectItem value="inspection">Safety Inspection</SelectItem>
                        <SelectItem value="repair">Repair</SelectItem>
                        <SelectItem value="emergency">Emergency Repair</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="scheduled-date">Scheduled Date</Label>
                    <Input id="scheduled-date" type="date" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsMaintenanceOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsMaintenanceOpen(false)}>
                    Schedule
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {vehicles.map((vehicle) => (
              <Card key={vehicle.id}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between text-base">
                    <span>{vehicle.id}</span>
                    <Badge variant={getStatusBadgeVariant(vehicle.status)}>
                      {vehicle.status}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{vehicle.model} ({vehicle.year})</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Mileage:</span>
                    <span className="font-medium">{vehicle.mileage.toLocaleString()} miles</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Fuel Level:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{vehicle.fuelLevel}%</span>
                      <Progress value={vehicle.fuelLevel} className="w-16 h-2" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Next Maintenance:</span>
                    <span className="text-muted-foreground">{vehicle.nextMaintenance}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Inspection Due:</span>
                    <span className="text-muted-foreground">{vehicle.inspectionDue}</span>
                  </div>
                  {vehicle.issues.length > 0 && (
                    <div className="pt-2">
                      <div className="text-sm font-medium text-red-600 mb-1">Issues:</div>
                      {vehicle.issues.map((issue, index) => (
                        <div key={index} className="text-xs text-red-600 bg-red-50 p-2 rounded">
                          {issue}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
