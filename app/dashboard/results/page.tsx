"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { DataTable } from "@/src/components/ui/data-table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { AddResultModal } from "@/components/modals/add-result-modal"
import { DeleteConfirmationModal } from "@/components/modals/delete-confirmation-modal"
import { resultsApi } from "@/src/lib/api"
import { toast } from "@/src/components/ui/use-toast"
import { PlusCircle, FileDown, Edit, Trash2, BarChart3, TrendingUp, Award, Loader2 } from "lucide-react"
import type { ColumnDef } from "@tanstack/react-table"

interface SubjectResult {
  id: string
  subject_id: string
  subject_name: string
  assessment_score?: number
  exam_score?: number
  total_score: number
  grade: string
  status: 'pass' | 'fail' | 'pending'
  comments?: string
}

interface Result {
  id: string
  student_id: string
  class_id: string
  academic_year_id: string
  term_id?: string
  assessment_id?: string
  total_score: number
  percentage: number
  grade: string
  position?: number
  status: 'published' | 'draft' | 'pending'
  created_at: string
  updated_at: string
  student_name?: string
  student_roll_number?: string
  class_name?: string
  academic_year?: string
  term_name?: string
  subject_results?: SubjectResult[]
}

interface ResultStats {
  total_results: number
  average_score: number
  highest_score: number
  lowest_score: number
  pass_rate: number
}
export default function ResultsPage() {
  const [results, setResults] = useState<Result[]>([])
  const [stats, setStats] = useState<ResultStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedTerm, setSelectedTerm] = useState<string>('all')
  const [selectedClass, setSelectedClass] = useState<string>('all')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [selectedResult, setSelectedResult] = useState<Result | null>(null)
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  })

  const fetchResults = async (page = 1, limit = 10, search = '') => {
    try {
      setLoading(true)
      const response = await resultsApi.getAll({
        page,
        limit,
        search,
        term_id: selectedTerm !== 'all' ? selectedTerm : undefined,
        class_id: selectedClass !== 'all' ? selectedClass : undefined,
        sort_by: 'created_at',
        sort_order: 'desc'
      })

      setResults(response.data as Result[])
      if ((response as any).pagination) {
        setPagination((response as any).pagination)
      }
    } catch (error) {
      console.error('Error fetching results:', error)
      toast({
        title: "Error",
        description: "Failed to fetch results. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await resultsApi.getStatistics({
        term_id: selectedTerm !== 'all' ? selectedTerm : undefined,
        class_id: selectedClass !== 'all' ? selectedClass : undefined,
      })
      setStats((response as any).data)
    } catch (error) {
      console.error('Error fetching result stats:', error)
    }
  }

  useEffect(() => {
    fetchResults()
    fetchStats()
  }, [selectedTerm, selectedClass])

  const handleAddResult = async (newResultData: any) => {
    try {
      const newResult = await resultsApi.create(newResultData)
      setResults(prev => [newResult as Result, ...prev])
      setIsAddModalOpen(false)
      toast({
        title: "Result Added",
        description: "Result has been successfully added.",
      })
    } catch (error) {
      console.error('Error adding result:', error)
      toast({
        title: "Error",
        description: "Failed to add result. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteResult = async (id: string) => {
    try {
      await resultsApi.delete(id)
      setResults(prev => prev.filter(result => result.id !== id))
      toast({
        title: "Result Deleted",
        description: "Result has been successfully deleted.",
      })
    } catch (error) {
      console.error('Error deleting result:', error)
      toast({
        title: "Error",
        description: "Failed to delete result. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handlePublishResult = async (id: string) => {
    try {
      await resultsApi.publish(id)
      setResults(prev => prev.map(result =>
        result.id === id ? { ...result, status: 'published' } : result
      ))
      toast({
        title: "Result Published",
        description: "Result has been published successfully.",
      })
    } catch (error) {
      console.error('Error publishing result:', error)
      toast({
        title: "Error",
        description: "Failed to publish result. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleExportResults = async () => {
    try {
      const csvData = results.map(result => ({
        'Student': result.student_name || '',
        'Roll Number': result.student_roll_number || '',
        'Class': result.class_name || '',
        'Term': result.term_name || '',
        'Total Score': result.total_score,
        'Percentage': result.percentage,
        'Grade': result.grade,
        'Position': result.position || '',
        'Status': result.status,
      }))

      const csvContent = [
        Object.keys(csvData[0]).join(','),
        ...csvData.map(row => Object.values(row).join(','))
      ].join('\n')

      const blob = new Blob([csvContent], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `results_${new Date().toISOString().split('T')[0]}.csv`
      a.click()
      window.URL.revokeObjectURL(url)

      toast({
        title: "Export Successful",
        description: "Results data has been exported successfully.",
      })
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export results data.",
        variant: "destructive",
      })
    }
  }
  const columns: ColumnDef<Result>[] = [
    {
      accessorKey: "student_roll_number",
      header: "Roll No.",
    },
    {
      accessorKey: "student_name",
      header: "Student Name",
      cell: ({ row }) => <div className="font-medium">{row.getValue("student_name")}</div>,
    },
    {
      accessorKey: "class_name",
      header: "Class",
    },
    {
      accessorKey: "term_name",
      header: "Term",
      cell: ({ row }) => {
        const term = row.getValue("term_name") as string
        return term || 'N/A'
      },
    },
    {
      accessorKey: "total_score",
      header: "Total Score",
      cell: ({ row }) => {
        const score = row.getValue("total_score") as number
        return <div className="text-right font-medium">{score}</div>
      },
    },
    {
      accessorKey: "percentage",
      header: "Percentage",
      cell: ({ row }) => {
        const percentage = row.getValue("percentage") as number
        return <div className="text-right font-medium">{percentage.toFixed(1)}%</div>
      },
    },
    {
      accessorKey: "grade",
      header: "Grade",
      cell: ({ row }) => {
        const grade = row.getValue("grade") as string
        const variant = grade === 'A' || grade === 'A+' ? 'default' :
                      grade === 'B' || grade === 'B+' ? 'secondary' : 'outline'
        return <Badge variant={variant}>{grade}</Badge>
      },
    },
    {
      accessorKey: "position",
      header: "Position",
      cell: ({ row }) => {
        const position = row.getValue("position") as number
        return position ? `${position}` : 'N/A'
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        const variant = status === 'published' ? 'default' : 'outline'
        return <Badge variant={variant}>{status}</Badge>
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const result = row.original
        return (
          <div className="flex items-center space-x-2">
            {result.status === 'draft' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handlePublishResult(result.id)}
              >
                <Award className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDeleteResult(result.id)}
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
          <div className="text-lg font-medium">Loading results...</div>
          <div className="mt-2 text-sm text-muted-foreground">Please wait while we fetch the results data.</div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Results Management</h1>
          <p className="text-muted-foreground">
            Manage and track student academic results and performance.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handleExportResults}>
            <FileDown className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Result
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <Select value={selectedTerm} onValueChange={setSelectedTerm}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select term" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Terms</SelectItem>
            <SelectItem value="term-1">First Term</SelectItem>
            <SelectItem value="term-2">Second Term</SelectItem>
            <SelectItem value="term-3">Third Term</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedClass} onValueChange={setSelectedClass}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select class" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Classes</SelectItem>
            <SelectItem value="class-1">Grade 10A</SelectItem>
            <SelectItem value="class-2">Grade 10B</SelectItem>
            <SelectItem value="class-3">Grade 11A</SelectItem>
            <SelectItem value="class-4">Grade 11B</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Results</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.total_results || 0}</div>
            <p className="text-xs text-muted-foreground">Published results</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.average_score?.toFixed(1) || 0}%</div>
            <p className="text-xs text-muted-foreground">Class average</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Highest Score</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.highest_score || 0}%</div>
            <p className="text-xs text-muted-foreground">Best performance</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pass Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.pass_rate?.toFixed(1) || 0}%</div>
            <p className="text-xs text-muted-foreground">Students passing</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Academic Results</CardTitle>
          <CardDescription>View and manage all student academic results</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={results}
            searchKey="student_name"
            searchPlaceholder="Search by student name..."
          />
        </CardContent>
      </Card>

      <AddResultModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onAdd={handleAddResult}
      />
    </div>
  )
}
