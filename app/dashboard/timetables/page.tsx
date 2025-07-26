"use client";

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/src/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/src/components/ui/dialog';
import { Badge } from '@/src/components/ui/badge';
import { DataTable } from '@/src/components/ui/data-table';
import { timetablesApi } from '@/src/lib/api';
import { timetableSchema, type TimetableFormData } from '@/src/lib/validations';
import { toast } from '@/src/components/ui/use-toast';
import { Plus, Edit, Trash2, Calendar, Clock, Users, Download, Loader2 } from 'lucide-react';
import type { ColumnDef } from '@tanstack/react-table';

interface Timetable {
  id: string;
  name: string;
  class_id: string;
  academic_year_id: string;
  term_id?: string;
  effective_from: string;
  effective_to?: string;
  status: 'draft' | 'active' | 'inactive';
  created_at: string;
  updated_at: string;
  class_name?: string;
  academic_year?: string;
  periods_count?: number;
}

export default function TimetablesPage() {
  const [timetables, setTimetables] = useState<Timetable[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedTimetable, setSelectedTimetable] = useState<Timetable | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<TimetableFormData>({
    resolver: zodResolver(timetableSchema),
    defaultValues: {
      status: 'draft',
      effective_from: new Date().toISOString().split('T')[0],
    },
  });

  const fetchTimetables = async () => {
    try {
      setLoading(true);
      const response = await timetablesApi.getAll({
        page: 1,
        limit: 50,
        sort_by: 'created_at',
        sort_order: 'DESC'
      });
      setTimetables(response.data);
    } catch (error) {
      console.error('Error fetching timetables:', error);
      toast({
        title: "Error",
        description: "Failed to fetch timetables. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimetables();
  }, []);

  const handleAddTimetable = async (data: TimetableFormData) => {
    try {
      const newTimetable = await timetablesApi.create(data);
      setTimetables(prev => [newTimetable, ...prev]);
      setAddModalOpen(false);
      reset();
      toast({
        title: "Timetable Created",
        description: "The timetable has been created successfully.",
      });
    } catch (error) {
      console.error('Error creating timetable:', error);
      toast({
        title: "Error",
        description: "Failed to create timetable. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEditTimetable = async (data: TimetableFormData) => {
    if (!selectedTimetable) return;
    
    try {
      const updatedTimetable = await timetablesApi.update(selectedTimetable.id, data);
      setTimetables(prev => prev.map(timetable => 
        timetable.id === selectedTimetable.id ? updatedTimetable : timetable
      ));
      setEditModalOpen(false);
      setSelectedTimetable(null);
      reset();
      toast({
        title: "Timetable Updated",
        description: "The timetable has been updated successfully.",
      });
    } catch (error) {
      console.error('Error updating timetable:', error);
      toast({
        title: "Error",
        description: "Failed to update timetable. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteTimetable = async (id: string) => {
    try {
      await timetablesApi.delete(id);
      setTimetables(prev => prev.filter(timetable => timetable.id !== id));
      toast({
        title: "Timetable Deleted",
        description: "The timetable has been deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting timetable:', error);
      toast({
        title: "Error",
        description: "Failed to delete timetable. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleActivateTimetable = async (id: string) => {
    try {
      await timetablesApi.activate(id);
      setTimetables(prev => prev.map(timetable => 
        timetable.id === id ? { ...timetable, status: 'active' } : timetable
      ));
      toast({
        title: "Timetable Activated",
        description: "The timetable has been activated successfully.",
      });
    } catch (error) {
      console.error('Error activating timetable:', error);
      toast({
        title: "Error",
        description: "Failed to activate timetable. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeactivateTimetable = async (id: string) => {
    try {
      await timetablesApi.deactivate(id);
      setTimetables(prev => prev.map(timetable => 
        timetable.id === id ? { ...timetable, status: 'inactive' } : timetable
      ));
      toast({
        title: "Timetable Deactivated",
        description: "The timetable has been deactivated successfully.",
      });
    } catch (error) {
      console.error('Error deactivating timetable:', error);
      toast({
        title: "Error",
        description: "Failed to deactivate timetable. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleExportTimetable = async (id: string) => {
    try {
      await timetablesApi.export(id, 'pdf');
      toast({
        title: "Export Started",
        description: "Timetable export has been initiated.",
      });
    } catch (error) {
      console.error('Error exporting timetable:', error);
      toast({
        title: "Error",
        description: "Failed to export timetable. Please try again.",
        variant: "destructive",
      });
    }
  };

  const openEditModal = (timetable: Timetable) => {
    setSelectedTimetable(timetable);
    setValue('name', timetable.name);
    setValue('class_id', timetable.class_id);
    setValue('academic_year_id', timetable.academic_year_id);
    setValue('effective_from', timetable.effective_from);
    setValue('effective_to', timetable.effective_to || '');
    setValue('status', timetable.status);
    setEditModalOpen(true);
  };

  const columns: ColumnDef<Timetable>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "class_name",
      header: "Class",
    },
    {
      accessorKey: "academic_year",
      header: "Academic Year",
    },
    {
      accessorKey: "effective_from",
      header: "Effective From",
      cell: ({ row }) => {
        const date = new Date(row.getValue("effective_from"));
        return date.toLocaleDateString();
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        const variant = status === 'active' ? 'default' : 
                      status === 'inactive' ? 'secondary' : 'outline';
        return <Badge variant={variant}>{status}</Badge>;
      },
    },
    {
      accessorKey: "periods_count",
      header: "Periods",
      cell: ({ row }) => {
        const count = row.getValue("periods_count") as number;
        return count ? `${count} periods` : 'No periods';
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const timetable = row.original;
        return (
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => openEditModal(timetable)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            
            {timetable.status === 'draft' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleActivateTimetable(timetable.id)}
              >
                <Calendar className="h-4 w-4" />
              </Button>
            )}
            
            {timetable.status === 'active' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDeactivateTimetable(timetable.id)}
              >
                <Clock className="h-4 w-4" />
              </Button>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleExportTimetable(timetable.id)}
            >
              <Download className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDeleteTimetable(timetable.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <div className="text-lg font-medium">Loading timetables...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Timetables</h1>
          <p className="text-muted-foreground">
            Manage class schedules and timetables.
          </p>
        </div>
        
        <Dialog open={addModalOpen} onOpenChange={setAddModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Timetable
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Timetable</DialogTitle>
              <DialogDescription>
                Create a new timetable for a class.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(handleAddTimetable)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Timetable Name</Label>
                <Input
                  id="name"
                  {...register('name')}
                  className={errors.name ? 'border-red-500' : ''}
                  placeholder="e.g., Grade 10A - Fall 2024"
                />
                {errors.name && (
                  <p className="text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="class_id">Class</Label>
                  <Select onValueChange={(value) => setValue('class_id', value)}>
                    <SelectTrigger className={errors.class_id ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="class-1">Grade 10A</SelectItem>
                      <SelectItem value="class-2">Grade 10B</SelectItem>
                      <SelectItem value="class-3">Grade 11A</SelectItem>
                      <SelectItem value="class-4">Grade 11B</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.class_id && (
                    <p className="text-sm text-red-600">{errors.class_id.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="academic_year_id">Academic Year</Label>
                  <Select onValueChange={(value) => setValue('academic_year_id', value)}>
                    <SelectTrigger className={errors.academic_year_id ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select academic year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="year-1">2024-2025</SelectItem>
                      <SelectItem value="year-2">2023-2024</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.academic_year_id && (
                    <p className="text-sm text-red-600">{errors.academic_year_id.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="effective_from">Effective From</Label>
                <Input
                  id="effective_from"
                  type="date"
                  {...register('effective_from')}
                  className={errors.effective_from ? 'border-red-500' : ''}
                />
                {errors.effective_from && (
                  <p className="text-sm text-red-600">{errors.effective_from.message}</p>
                )}
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setAddModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Create Timetable
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Timetables</CardTitle>
          <CardDescription>
            View and manage all class timetables in the system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={timetables}
            searchKey="name"
            searchPlaceholder="Search timetables..."
          />
        </CardContent>
      </Card>
    </div>
  );
}
