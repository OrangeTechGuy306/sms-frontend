"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { DataTable } from "@/src/components/ui/data-table"
import { Badge } from "@/src/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/src/components/ui/dialog"
import { adminApi } from "@/src/lib/api"
import { toast } from "@/src/components/ui/use-toast"
import { Search, Plus, Eye, Edit, Trash2, Loader2, Users, Shield, Settings } from "lucide-react"
import { z } from "zod"
import type { ColumnDef } from "@tanstack/react-table"

// Validation schema
const adminSchema = z.object({
  email: z.string().email("Invalid email address"),
  firstName: z.string().min(1, "First name is required").max(100, "First name must be less than 100 characters"),
  lastName: z.string().min(1, "Last name is required").max(100, "Last name must be less than 100 characters"),
  role: z.enum(["super_admin", "admin", "manager", "coordinator"]),
  permissions: z.array(z.string()).optional(),
  phone: z.string().optional(),
  department: z.string().optional(),
  status: z.enum(["active", "inactive", "suspended"]).optional(),
})

type AdminFormData = z.infer<typeof adminSchema>

interface Admin {
  id: string
  employee_id?: string
  email: string
  first_name: string
  last_name: string
  role: string
  permissions?: string[]
  phone?: string
  department?: string
  status: string
  last_login?: string
  created_at: string
  updated_at: string
}

interface AdminStats {
  total_admins: number
  active_admins: number
  inactive_admins: number
  recent_logins: number
}

export default function AdminPage() {
  const [admins, setAdmins] = useState<Admin[]>([])
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null)

  // Pagination
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  })

  // Form
  const form = useForm<AdminFormData>({
    resolver: zodResolver(adminSchema),
  })

  // Fetch data
  useEffect(() => {
    fetchAdmins()
  }, [])

  const fetchAdmins = async (page = 1, limit = 10) => {
    try {
      setLoading(true)
      const params: any = { page, limit }
      if (searchTerm) params.search = searchTerm
      if (selectedRole !== 'all') params.role = selectedRole
      if (selectedStatus !== 'all') params.status = selectedStatus

      const response = await adminApi.getAll(params)
      setAdmins(response.data || [])
      setPagination({
        currentPage: response.pagination?.currentPage || 1,
        totalPages: response.pagination?.totalPages || 1,
        totalItems: response.pagination?.totalItems || 0,
        itemsPerPage: response.pagination?.itemsPerPage || 10,
      })

      // Calculate stats
      const totalAdmins = response.pagination?.totalItems || 0
      const activeAdmins = (response.data || []).filter((admin: Admin) => admin.status === 'active').length
      const inactiveAdmins = totalAdmins - activeAdmins
      const recentLogins = (response.data || []).filter((admin: Admin) => {
        if (!admin.last_login) return false
        const lastLogin = new Date(admin.last_login)
        const weekAgo = new Date()
        weekAgo.setDate(weekAgo.getDate() - 7)
        return lastLogin >= weekAgo
      }).length

      setStats({
        total_admins: totalAdmins,
        active_admins: activeAdmins,
        inactive_admins: inactiveAdmins,
        recent_logins: recentLogins,
      })
    } catch (error) {
      console.error('Error fetching admins:', error)
      toast({
        title: "Error",
        description: "Failed to fetch admin users",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCreateAdmin = async (data: AdminFormData) => {
    try {
      setSubmitting(true)
      await adminApi.create(data)
      toast({
        title: "Success",
        description: "Admin user created successfully",
      })
      setIsAddModalOpen(false)
      form.reset()
      fetchAdmins()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create admin user",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleUpdateAdmin = async (data: AdminFormData) => {
    if (!selectedAdmin) return
    try {
      setSubmitting(true)
      await adminApi.update(selectedAdmin.id, data)
      toast({
        title: "Success",
        description: "Admin user updated successfully",
      })
      setIsEditModalOpen(false)
      setSelectedAdmin(null)
      form.reset()
      fetchAdmins()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update admin user",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteAdmin = async (id: string) => {
    try {
      await adminApi.delete(id)
      toast({
        title: "Success",
        description: "Admin user deleted successfully",
      })
      fetchAdmins()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete admin user",
        variant: "destructive",
      })
    }
  }

  // Search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchAdmins(1, pagination.itemsPerPage)
    }, 300)
    return () => clearTimeout(timeoutId)
  }, [searchTerm, selectedRole, selectedStatus])

  const handlePageChange = (page: number) => {
    fetchAdmins(page, pagination.itemsPerPage)
  }

  const handleEdit = (admin: Admin) => {
    setSelectedAdmin(admin)
    form.reset({
      email: admin.email,
      firstName: admin.first_name,
      lastName: admin.last_name,
      role: admin.role as any,
      phone: admin.phone || '',
      department: admin.department || '',
      status: admin.status as any,
    })
    setIsEditModalOpen(true)
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Never'
    return new Date(dateString).toLocaleDateString()
  }

  const columns: ColumnDef<Admin>[] = [
    {
      accessorKey: "employee_id",
      header: "ID",
      cell: ({ row }) => row.original.employee_id || row.original.id.slice(0, 8),
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.original.first_name} {row.original.last_name}</div>
          <div className="text-sm text-muted-foreground">{row.original.email}</div>
        </div>
      ),
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <Badge variant="outline" className="capitalize">
          {row.original.role.replace('_', ' ')}
        </Badge>
      ),
    },
    {
      accessorKey: "department",
      header: "Department",
      cell: ({ row }) => row.original.department || 'N/A',
    },
    {
      accessorKey: "phone",
      header: "Contact",
      cell: ({ row }) => row.original.phone || 'N/A',
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant={row.original.status === "active" ? "default" : "secondary"} className="capitalize">
          {row.original.status}
        </Badge>
      ),
    },
    {
      accessorKey: "last_login",
      header: "Last Login",
      cell: ({ row }) => formatDate(row.original.last_login),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => handleEdit(row.original)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleDeleteAdmin(row.original.id)}
          >
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
          <h2 className="text-3xl font-bold tracking-tight">Admin Management</h2>
          <p className="text-muted-foreground">Manage administrative users and their permissions</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Admin
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Admins</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.total_admins || 0}</div>
            <p className="text-xs text-muted-foreground">All admin users</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Admins</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.active_admins || 0}</div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inactive Admins</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.inactive_admins || 0}</div>
            <p className="text-xs text-muted-foreground">Inactive users</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Logins</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.recent_logins || 0}</div>
            <p className="text-xs text-muted-foreground">Last 7 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search admin users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={selectedRole} onValueChange={setSelectedRole}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="super_admin">Super Admin</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="manager">Manager</SelectItem>
            <SelectItem value="coordinator">Coordinator</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Data Table */}
      <Card>
        <CardContent className="p-0">
          <DataTable
            columns={columns}
            data={admins}
            loading={loading}
            pagination={pagination}
            onPageChange={handlePageChange}
          />
        </CardContent>
      </Card>

      {/* Add Admin Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add Admin User</DialogTitle>
            <DialogDescription>Create a new administrative user account</DialogDescription>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(handleCreateAdmin)}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" {...form.register('firstName')} />
                  {form.formState.errors.firstName && (
                    <p className="text-sm text-red-500">{form.formState.errors.firstName.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" {...form.register('lastName')} />
                  {form.formState.errors.lastName && (
                    <p className="text-sm text-red-500">{form.formState.errors.lastName.message}</p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...form.register('email')} />
                {form.formState.errors.email && (
                  <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select onValueChange={(value) => form.setValue('role', value as any)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="super_admin">Super Admin</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="coordinator">Coordinator</SelectItem>
                    </SelectContent>
                  </Select>
                  {form.formState.errors.role && (
                    <p className="text-sm text-red-500">{form.formState.errors.role.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (Optional)</Label>
                  <Input id="phone" {...form.register('phone')} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department (Optional)</Label>
                <Input id="department" {...form.register('department')} />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddModalOpen(false)}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Admin
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Admin Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Admin User</DialogTitle>
            <DialogDescription>Update administrative user information</DialogDescription>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(handleUpdateAdmin)}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-firstName">First Name</Label>
                  <Input id="edit-firstName" {...form.register('firstName')} />
                  {form.formState.errors.firstName && (
                    <p className="text-sm text-red-500">{form.formState.errors.firstName.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-lastName">Last Name</Label>
                  <Input id="edit-lastName" {...form.register('lastName')} />
                  {form.formState.errors.lastName && (
                    <p className="text-sm text-red-500">{form.formState.errors.lastName.message}</p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input id="edit-email" type="email" {...form.register('email')} />
                {form.formState.errors.email && (
                  <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
                )}
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-role">Role</Label>
                  <Select onValueChange={(value) => form.setValue('role', value as any)} defaultValue={selectedAdmin?.role}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="super_admin">Super Admin</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="coordinator">Coordinator</SelectItem>
                    </SelectContent>
                  </Select>
                  {form.formState.errors.role && (
                    <p className="text-sm text-red-500">{form.formState.errors.role.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select onValueChange={(value) => form.setValue('status', value as any)} defaultValue={selectedAdmin?.status}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-phone">Phone</Label>
                  <Input id="edit-phone" {...form.register('phone')} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-department">Department</Label>
                <Input id="edit-department" {...form.register('department')} />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditModalOpen(false)}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Update Admin
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
