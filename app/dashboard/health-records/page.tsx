"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DataTable } from "@/src/components/ui/data-table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { healthApi, studentsApi } from "@/src/lib/api"
import { toast } from "@/components/ui/use-toast"
import { Download, Plus, Search, Stethoscope, Syringe, FileText, Loader2, Eye, Edit, Trash2 } from "lucide-react"
import type { ColumnDef } from "@tanstack/react-table"

interface HealthRecord {
  id: string
  student_id: string
  type: string
  title: string
  description?: string
  date_recorded: string
  severity?: string
  treatment?: string
  follow_up_required?: boolean
  follow_up_date?: string
  created_at: string
  updated_at: string
  student_name?: string
  student_class?: string
}

interface HealthStats {
  total_records: number
  recent_visits: number
  pending_followups: number
  critical_cases: number
}

export default function HealthRecordsPage() {
  const router = useRouter()
  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>([])
  const [stats, setStats] = useState<HealthStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedSeverity, setSelectedSeverity] = useState<string>("all")
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  })

  const fetchHealthRecords = async (page = 1, limit = 10, search = '', type = 'all', severity = 'all') => {
    try {
      setLoading(true)
      const params: any = { page, limit }
      if (search) params.search = search
      if (type !== 'all') params.type = type
      if (severity !== 'all') params.severity = severity

      const response = await healthApi.getAll(params)
      setHealthRecords(response.data || [])
      setPagination({
        currentPage: response.pagination?.currentPage || 1,
        totalPages: response.pagination?.totalPages || 1,
        totalItems: response.pagination?.totalItems || 0,
        itemsPerPage: response.pagination?.itemsPerPage || 10,
      })
    } catch (error) {
      console.error('Error fetching health records:', error)
      toast({
        title: "Error",
        description: "Failed to fetch health records",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      // Calculate stats from the records
      const totalRecords = healthRecords.length
      const recentVisits = healthRecords.filter(record => {
        const recordDate = new Date(record.date_recorded)
        const weekAgo = new Date()
        weekAgo.setDate(weekAgo.getDate() - 7)
        return recordDate >= weekAgo
      }).length
      const pendingFollowups = healthRecords.filter(record => 
        record.follow_up_required && record.follow_up_date
      ).length
      const criticalCases = healthRecords.filter(record => 
        record.severity === 'critical' || record.severity === 'high'
      ).length

      setStats({
        total_records: totalRecords,
        recent_visits: recentVisits,
        pending_followups: pendingFollowups,
        critical_cases: criticalCases,
      })
    } catch (error) {
      console.error('Error calculating stats:', error)
    }
  }

  useEffect(() => {
    fetchHealthRecords()
  }, [])

  useEffect(() => {
    fetchStats()
  }, [healthRecords])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchHealthRecords(1, pagination.itemsPerPage, searchTerm, selectedType, selectedSeverity)
    }, 300)
    return () => clearTimeout(timeoutId)
  }, [searchTerm, selectedType, selectedSeverity])

  const handlePageChange = (page: number) => {
    fetchHealthRecords(page, pagination.itemsPerPage, searchTerm, selectedType, selectedSeverity)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const getSeverityColor = (severity?: string) => {
    switch (severity) {
      case "critical": return "destructive"
      case "high": return "destructive"
      case "medium": return "secondary"
      case "low": return "outline"
      default: return "outline"
    }
  }

  const columns: ColumnDef<HealthRecord>[] = [
    {
      accessorKey: "student_name",
      header: "Student",
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.original.student_name}</div>
          <div className="text-sm text-muted-foreground">{row.original.student_class}</div>
        </div>
      ),
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => (
        <Badge variant="outline" className="capitalize">
          {row.original.type}
        </Badge>
      ),
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.original.title}</div>
          {row.original.description && (
            <div className="text-sm text-muted-foreground truncate max-w-[200px]">
              {row.original.description}
            </div>
          )}
        </div>
      ),
    },
    {
      accessorKey: "date_recorded",
      header: "Date",
      cell: ({ row }) => formatDate(row.original.date_recorded),
    },
    {
      accessorKey: "severity",
      header: "Severity",
      cell: ({ row }) => (
        row.original.severity ? (
          <Badge variant={getSeverityColor(row.original.severity)} className="capitalize">
            {row.original.severity}
          </Badge>
        ) : null
      ),
    },
    {
      accessorKey: "treatment",
      header: "Treatment",
      cell: ({ row }) => (
        row.original.treatment ? (
          <div className="text-sm truncate max-w-[150px]">
            {row.original.treatment}
          </div>
        ) : null
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Health Records</h2>
          <p className="text-muted-foreground">Manage student health information and medical records</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Syringe className="mr-2 h-4 w-4" />
            Record Vaccination
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Record
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Records</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.total_records || 0}</div>
            <p className="text-xs text-muted-foreground">All health records</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Visits</CardTitle>
            <Stethoscope className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.recent_visits || 0}</div>
            <p className="text-xs text-muted-foreground">Last 7 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Follow-ups</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.pending_followups || 0}</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Cases</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.critical_cases || 0}</div>
            <p className="text-xs text-muted-foreground">High priority</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search health records..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Record Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="illness">Illness</SelectItem>
            <SelectItem value="injury">Injury</SelectItem>
            <SelectItem value="allergy">Allergy</SelectItem>
            <SelectItem value="medication">Medication</SelectItem>
            <SelectItem value="checkup">Checkup</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Severities</SelectItem>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Data Table */}
      <Card>
        <CardContent className="p-0">
          <DataTable
            columns={columns}
            data={healthRecords}
            loading={loading}
            pagination={pagination}
            onPageChange={handlePageChange}
          />
        </CardContent>
      </Card>
    </div>
  )
}
