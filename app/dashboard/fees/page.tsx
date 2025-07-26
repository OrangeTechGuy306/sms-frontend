"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DataTable } from "@/components/ui/data-table"
import { feesApi } from "@/src/lib/api"
import { toast } from "@/components/ui/use-toast"
import { DollarSign, FileText, Users, Clock, Loader2, Edit, Trash2 } from "lucide-react"
import type { ColumnDef } from "@tanstack/react-table"

interface FeeRecord {
  id: string
  student_id: string
  fee_type_id: string
  amount: number
  due_date: string
  payment_date?: string
  status: 'pending' | 'paid' | 'overdue' | 'partial'
  created_at: string
  updated_at: string
  student_name?: string
  student_roll_number?: string
  fee_type_name?: string
  invoice_number?: string
}

interface FeeStats {
  total_collected: number
  total_outstanding: number
  paid_students: number
  pending_students: number
  overdue_amount: number
  collection_rate: number
}

export default function FeesPage() {
  const [fees, setFees] = useState<FeeRecord[]>([])
  const [stats, setStats] = useState<FeeStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  })

  const fetchFees = async (page = 1, limit = 10, search = '') => {
    try {
      setLoading(true)
      const response = await feesApi.getAll({
        page,
        limit,
        search,
        sort_by: 'created_at',
        sort_order: 'DESC'
      })

      setFees(response.data as FeeRecord[])
      if ((response as any).pagination) {
        setPagination((response as any).pagination)
      }
    } catch (error) {
      console.error('Error fetching fees:', error)
      toast({
        title: "Error",
        description: "Failed to fetch fee records. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await feesApi.getStatistics()
      setStats((response as any).data)
    } catch (error) {
      console.error('Error fetching fee stats:', error)
    }
  }

  useEffect(() => {
    fetchFees()
    fetchStats()
  }, [])

  const handleMarkAsPaid = async (id: string) => {
    try {
      await feesApi.markAsPaid(id)
      setFees(prev => prev.map(fee =>
        fee.id === id ? { ...fee, status: 'paid', payment_date: new Date().toISOString() } : fee
      ))
      toast({
        title: "Payment Recorded",
        description: "Fee has been marked as paid successfully.",
      })
    } catch (error) {
      console.error('Error marking fee as paid:', error)
      toast({
        title: "Error",
        description: "Failed to record payment. Please try again.",
        variant: "destructive",
      })
    }
  }

  const columns: ColumnDef<FeeRecord>[] = [
    {
      accessorKey: "invoice_number",
      header: "Invoice ID",
      cell: ({ row }) => {
        const invoice = row.getValue("invoice_number") as string
        return invoice || `INV-${row.original.id.slice(-6)}`
      },
    },
    {
      accessorKey: "student_name",
      header: "Student",
      cell: ({ row }) => {
        const name = row.getValue("student_name") as string
        const rollNumber = row.original.student_roll_number
        return (
          <div>
            <div className="font-medium">{name}</div>
            {rollNumber && <div className="text-sm text-muted-foreground">{rollNumber}</div>}
          </div>
        )
      },
    },
    {
      accessorKey: "fee_type_name",
      header: "Fee Type",
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => {
        const amount = row.getValue("amount") as number
        return `$${amount.toFixed(2)}`
      },
    },
    {
      accessorKey: "due_date",
      header: "Due Date",
      cell: ({ row }) => {
        const date = new Date(row.getValue("due_date"))
        return date.toLocaleDateString()
      },
    },
    {
      accessorKey: "payment_date",
      header: "Payment Date",
      cell: ({ row }) => {
        const date = row.getValue("payment_date") as string
        return date ? new Date(date).toLocaleDateString() : 'Not paid'
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        const variant = status === 'paid' ? 'default' :
                      status === 'overdue' ? 'destructive' :
                      status === 'partial' ? 'secondary' : 'outline'
        return <Badge variant={variant}>{status}</Badge>
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const fee = row.original
        return (
          <div className="flex items-center space-x-2">
            {fee.status !== 'paid' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleMarkAsPaid(fee.id)}
              >
                Mark Paid
              </Button>
            )}
            <Button variant="ghost" size="sm">
              <Edit className="h-4 w-4" />
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
          <div className="text-lg font-medium">Loading fee records...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fees Management</h1>
          <p className="text-muted-foreground">
            Manage student fee payments and invoices.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Generate Invoice
          </Button>
          <Button>
            <DollarSign className="mr-2 h-4 w-4" />
            Record Payment
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Collected</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats?.total_collected?.toFixed(2) || '0.00'}</div>
            <p className="text-xs text-muted-foreground">
              {stats?.collection_rate?.toFixed(1) || 0}% collection rate
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outstanding</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats?.total_outstanding?.toFixed(2) || '0.00'}</div>
            <p className="text-xs text-muted-foreground">
              ${stats?.overdue_amount?.toFixed(2) || '0.00'} overdue
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.paid_students || 0}</div>
            <p className="text-xs text-muted-foreground">Students with paid fees</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Students</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.pending_students || 0}</div>
            <p className="text-xs text-muted-foreground">Students with pending fees</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Fee Records</CardTitle>
          <CardDescription>View and manage student fee payments</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={fees}
            searchKey="student_name"
            searchPlaceholder="Search by student name..."
          />
        </CardContent>
      </Card>
    </div>
  )
}
