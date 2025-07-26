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
import { assessmentsApi } from '@/src/lib/api';
import { assessmentSchema, type AssessmentFormData } from '@/src/lib/validations';
import { toast } from '@/src/components/ui/use-toast';
import { Plus, Edit, Trash2, FileText, Play, Pause, BarChart3, Users, Loader2 } from 'lucide-react';
import type { ColumnDef } from '@tanstack/react-table';

interface Assessment {
  id: string;
  title: string;
  description?: string;
  subject_id: string;
  class_id?: string;
  grade_level_id?: string;
  academic_year_id: string;
  term_id?: string;
  assessment_type: string;
  total_marks: number;
  passing_marks: number;
  duration_minutes?: number;
  scheduled_date?: string;
  start_time?: string;
  end_time?: string;
  status: 'draft' | 'published' | 'active' | 'completed' | 'cancelled';
  is_online: boolean;
  created_at: string;
  updated_at: string;
  subject_name?: string;
  class_name?: string;
  questions_count?: number;
  submissions_count?: number;
}

export default function AssessmentsPage() {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<AssessmentFormData>({
    resolver: zodResolver(assessmentSchema),
    defaultValues: {
      status: 'draft',
      is_online: false,
      assessment_type: 'quiz',
    },
  });

  const fetchAssessments = async () => {
    try {
      setLoading(true);
      const response = await assessmentsApi.getAll({
        page: 1,
        limit: 50,
        sort_by: 'created_at',
        sort_order: 'DESC'
      });
      setAssessments(response.data);
    } catch (error) {
      console.error('Error fetching assessments:', error);
      toast({
        title: "Error",
        description: "Failed to fetch assessments. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssessments();
  }, []);

  const handleAddAssessment = async (data: AssessmentFormData) => {
    try {
      const newAssessment = await assessmentsApi.create(data);
      setAssessments(prev => [newAssessment, ...prev]);
      setAddModalOpen(false);
      reset();
      toast({
        title: "Assessment Created",
        description: "The assessment has been created successfully.",
      });
    } catch (error) {
      console.error('Error creating assessment:', error);
      toast({
        title: "Error",
        description: "Failed to create assessment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEditAssessment = async (data: AssessmentFormData) => {
    if (!selectedAssessment) return;
    
    try {
      const updatedAssessment = await assessmentsApi.update(selectedAssessment.id, data);
      setAssessments(prev => prev.map(assessment => 
        assessment.id === selectedAssessment.id ? updatedAssessment : assessment
      ));
      setEditModalOpen(false);
      setSelectedAssessment(null);
      reset();
      toast({
        title: "Assessment Updated",
        description: "The assessment has been updated successfully.",
      });
    } catch (error) {
      console.error('Error updating assessment:', error);
      toast({
        title: "Error",
        description: "Failed to update assessment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteAssessment = async (id: string) => {
    try {
      await assessmentsApi.delete(id);
      setAssessments(prev => prev.filter(assessment => assessment.id !== id));
      toast({
        title: "Assessment Deleted",
        description: "The assessment has been deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting assessment:', error);
      toast({
        title: "Error",
        description: "Failed to delete assessment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handlePublishAssessment = async (id: string) => {
    try {
      await assessmentsApi.publish(id);
      setAssessments(prev => prev.map(assessment => 
        assessment.id === id ? { ...assessment, status: 'published' } : assessment
      ));
      toast({
        title: "Assessment Published",
        description: "The assessment has been published successfully.",
      });
    } catch (error) {
      console.error('Error publishing assessment:', error);
      toast({
        title: "Error",
        description: "Failed to publish assessment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleStartAssessment = async (id: string) => {
    try {
      await assessmentsApi.start(id);
      setAssessments(prev => prev.map(assessment => 
        assessment.id === id ? { ...assessment, status: 'active' } : assessment
      ));
      toast({
        title: "Assessment Started",
        description: "The assessment has been started successfully.",
      });
    } catch (error) {
      console.error('Error starting assessment:', error);
      toast({
        title: "Error",
        description: "Failed to start assessment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const openEditModal = (assessment: Assessment) => {
    setSelectedAssessment(assessment);
    setValue('title', assessment.title);
    setValue('description', assessment.description || '');
    setValue('subject_id', assessment.subject_id);
    setValue('assessment_type', assessment.assessment_type as any);
    setValue('total_marks', assessment.total_marks);
    setValue('passing_marks', assessment.passing_marks);
    setValue('duration_minutes', assessment.duration_minutes);
    setValue('scheduled_date', assessment.scheduled_date || '');
    setValue('status', assessment.status);
    setValue('is_online', assessment.is_online);
    setEditModalOpen(true);
  };

  const columns: ColumnDef<Assessment>[] = [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "subject_name",
      header: "Subject",
    },
    {
      accessorKey: "assessment_type",
      header: "Type",
      cell: ({ row }) => {
        const type = row.getValue("assessment_type") as string;
        return <Badge variant="outline">{type}</Badge>;
      },
    },
    {
      accessorKey: "total_marks",
      header: "Total Marks",
    },
    {
      accessorKey: "duration_minutes",
      header: "Duration",
      cell: ({ row }) => {
        const duration = row.getValue("duration_minutes") as number;
        return duration ? `${duration} min` : 'N/A';
      },
    },
    {
      accessorKey: "scheduled_date",
      header: "Scheduled Date",
      cell: ({ row }) => {
        const date = row.getValue("scheduled_date") as string;
        return date ? new Date(date).toLocaleDateString() : 'Not scheduled';
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        const variant = status === 'published' ? 'default' : 
                      status === 'active' ? 'default' :
                      status === 'completed' ? 'secondary' : 'outline';
        return <Badge variant={variant}>{status}</Badge>;
      },
    },
    {
      accessorKey: "is_online",
      header: "Mode",
      cell: ({ row }) => {
        const isOnline = row.getValue("is_online") as boolean;
        return <Badge variant={isOnline ? "default" : "outline"}>
          {isOnline ? "Online" : "Offline"}
        </Badge>;
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const assessment = row.original;
        return (
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => openEditModal(assessment)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            
            {assessment.status === 'draft' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handlePublishAssessment(assessment.id)}
              >
                <FileText className="h-4 w-4" />
              </Button>
            )}
            
            {assessment.status === 'published' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleStartAssessment(assessment.id)}
              >
                <Play className="h-4 w-4" />
              </Button>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDeleteAssessment(assessment.id)}
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
          <div className="text-lg font-medium">Loading assessments...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assessments</h1>
          <p className="text-muted-foreground">
            Create and manage quizzes, tests, and examinations.
          </p>
        </div>
        
        <Dialog open={addModalOpen} onOpenChange={setAddModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Assessment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Assessment</DialogTitle>
              <DialogDescription>
                Create a new assessment for students.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(handleAddAssessment)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Assessment Title</Label>
                <Input
                  id="title"
                  {...register('title')}
                  className={errors.title ? 'border-red-500' : ''}
                  placeholder="e.g., Mathematics Quiz - Chapter 5"
                />
                {errors.title && (
                  <p className="text-sm text-red-600">{errors.title.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="subject_id">Subject</Label>
                  <Select onValueChange={(value) => setValue('subject_id', value)}>
                    <SelectTrigger className={errors.subject_id ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="math">Mathematics</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="science">Science</SelectItem>
                      <SelectItem value="history">History</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.subject_id && (
                    <p className="text-sm text-red-600">{errors.subject_id.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="assessment_type">Assessment Type</Label>
                  <Select onValueChange={(value) => setValue('assessment_type', value as any)}>
                    <SelectTrigger className={errors.assessment_type ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="quiz">Quiz</SelectItem>
                      <SelectItem value="test">Test</SelectItem>
                      <SelectItem value="exam">Exam</SelectItem>
                      <SelectItem value="assignment">Assignment</SelectItem>
                      <SelectItem value="project">Project</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.assessment_type && (
                    <p className="text-sm text-red-600">{errors.assessment_type.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="total_marks">Total Marks</Label>
                  <Input
                    id="total_marks"
                    type="number"
                    {...register('total_marks', { valueAsNumber: true })}
                    className={errors.total_marks ? 'border-red-500' : ''}
                  />
                  {errors.total_marks && (
                    <p className="text-sm text-red-600">{errors.total_marks.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="passing_marks">Passing Marks</Label>
                  <Input
                    id="passing_marks"
                    type="number"
                    {...register('passing_marks', { valueAsNumber: true })}
                    className={errors.passing_marks ? 'border-red-500' : ''}
                  />
                  {errors.passing_marks && (
                    <p className="text-sm text-red-600">{errors.passing_marks.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration_minutes">Duration (Minutes)</Label>
                <Input
                  id="duration_minutes"
                  type="number"
                  {...register('duration_minutes', { valueAsNumber: true })}
                  className={errors.duration_minutes ? 'border-red-500' : ''}
                />
                {errors.duration_minutes && (
                  <p className="text-sm text-red-600">{errors.duration_minutes.message}</p>
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
                  Create Assessment
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Assessments</CardTitle>
          <CardDescription>
            View and manage all assessments in the system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={assessments}
            searchKey="title"
            searchPlaceholder="Search assessments..."
          />
        </CardContent>
      </Card>
    </div>
  );
}
