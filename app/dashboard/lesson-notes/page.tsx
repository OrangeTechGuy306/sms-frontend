"use client";

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/src/components/ui/data-table';
import { lessonNotesApi } from '@/src/lib/api';
import { lessonNoteSchema, type LessonNoteFormData } from '@/src/lib/validations';
import { toast } from '@/components/ui/use-toast';
import { Plus, Edit, Trash2, Eye, Archive, FileText, Loader2 } from 'lucide-react';
import type { ColumnDef } from '@tanstack/react-table';

interface LessonNote {
  id: string;
  title: string;
  content: string;
  subject_id: string;
  class_id?: string;
  grade_level_id?: string;
  academic_year_id: string;
  lesson_date: string;
  objectives?: string;
  materials?: string;
  homework?: string;
  status: 'draft' | 'published' | 'archived';
  is_public: boolean;
  teacher_id: string;
  created_at: string;
  updated_at: string;
  subject_name?: string;
  class_name?: string;
  teacher_name?: string;
}

export default function LessonNotesPage() {
  const [lessonNotes, setLessonNotes] = useState<LessonNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<LessonNote | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<LessonNoteFormData>({
    resolver: zodResolver(lessonNoteSchema),
    defaultValues: {
      status: 'draft',
      is_public: false,
    },
  });

  const fetchLessonNotes = async () => {
    try {
      setLoading(true);
      const response = await lessonNotesApi.getAll({
        page: 1,
        limit: 50,
        sort_by: 'created_at',
        sort_order: 'desc'
      });
      setLessonNotes(response.data);
    } catch (error) {
      console.error('Error fetching lesson notes:', error);
      toast({
        title: "Error",
        description: "Failed to fetch lesson notes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchLessonNotes();
  }, []);

  const handleAddNote = async (data: LessonNoteFormData) => {
    try {
      const newNote = await lessonNotesApi.create(data);
      setLessonNotes(prev => [newNote, ...prev]);
      setAddModalOpen(false);
      reset();
      toast({
        title: "Lesson Note Created",
        description: "The lesson note has been created successfully.",
      });
    } catch (error) {
      console.error('Error creating lesson note:', error);
      toast({
        title: "Error",
        description: "Failed to create lesson note. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEditNote = async (data: LessonNoteFormData) => {
    if (!selectedNote) return;

    try {
      const updatedNote = await lessonNotesApi.update(selectedNote.id, data);
      setLessonNotes(prev => prev.map(note =>
        note.id === selectedNote.id ? updatedNote : note
      ));
      setEditModalOpen(false);
      setSelectedNote(null);
      reset();
      toast({
        title: "Lesson Note Updated",
        description: "The lesson note has been updated successfully.",
      });
    } catch (error) {
      console.error('Error updating lesson note:', error);
      toast({
        title: "Error",
        description: "Failed to update lesson note. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      await lessonNotesApi.delete(id);
      setLessonNotes(prev => prev.filter(note => note.id !== id));
      toast({
        title: "Lesson Note Deleted",
        description: "The lesson note has been deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting lesson note:', error);
      toast({
        title: "Error",
        description: "Failed to delete lesson note. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handlePublishNote = async (id: string) => {
    try {
      await lessonNotesApi.publish(id);
      setLessonNotes(prev => prev.map(note =>
        note.id === id ? { ...note, status: 'published' } : note
      ));
      toast({
        title: "Lesson Note Published",
        description: "The lesson note has been published successfully.",
      });
    } catch (error) {
      console.error('Error publishing lesson note:', error);
      toast({
        title: "Error",
        description: "Failed to publish lesson note. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleArchiveNote = async (id: string) => {
    try {
      await lessonNotesApi.archive(id);
      setLessonNotes(prev => prev.map(note =>
        note.id === id ? { ...note, status: 'archived' } : note
      ));
      toast({
        title: "Lesson Note Archived",
        description: "The lesson note has been archived successfully.",
      });
    } catch (error) {
      console.error('Error archiving lesson note:', error);
      toast({
        title: "Error",
        description: "Failed to archive lesson note. Please try again.",
        variant: "destructive",
      });
    }
  };

  const openEditModal = (note: LessonNote) => {
    setSelectedNote(note);
    setValue('title', note.title);
    setValue('content', note.content);
    setValue('subject_id', note.subject_id);
    setValue('lesson_date', note.lesson_date);
    setValue('objectives', note.objectives || '');
    setValue('materials', note.materials || '');
    setValue('homework', note.homework || '');
    setValue('status', note.status);
    setValue('is_public', note.is_public);
    setEditModalOpen(true);
  };

  const columns: ColumnDef<LessonNote>[] = [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "subject_name",
      header: "Subject",
    },
    {
      accessorKey: "class_name",
      header: "Class",
    },
    {
      accessorKey: "lesson_date",
      header: "Date",
      cell: ({ row }) => {
        const date = new Date(row.getValue("lesson_date"));
        return date.toLocaleDateString();
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        const variant = status === 'published' ? 'default' :
                      status === 'archived' ? 'secondary' : 'outline';
        return <Badge variant={variant}>{status}</Badge>;
      },
    },
    {
      accessorKey: "is_public",
      header: "Visibility",
      cell: ({ row }) => {
        const isPublic = row.getValue("is_public") as boolean;
        return <Badge variant={isPublic ? "default" : "outline"}>
          {isPublic ? "Public" : "Private"}
        </Badge>;
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const note = row.original;
        return (
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => openEditModal(note)}
            >
              <Edit className="h-4 w-4" />
            </Button>

            {note.status === 'draft' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handlePublishNote(note.id)}
              >
                <FileText className="h-4 w-4" />
              </Button>
            )}

            {note.status === 'published' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleArchiveNote(note.id)}
              >
                <Archive className="h-4 w-4" />
              </Button>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDeleteNote(note.id)}
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
          <div className="text-lg font-medium">Loading lesson notes...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Lesson Notes</h1>
          <p className="text-muted-foreground">
            Manage and organize your lesson plans and notes.
          </p>
        </div>

        <Dialog open={addModalOpen} onOpenChange={setAddModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Lesson Note
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Lesson Note</DialogTitle>
              <DialogDescription>
                Create a new lesson note with objectives, materials, and homework.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(handleAddNote)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  {...register('title')}
                  className={errors.title ? 'border-red-500' : ''}
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
                  <Label htmlFor="lesson_date">Lesson Date</Label>
                  <Input
                    id="lesson_date"
                    type="date"
                    {...register('lesson_date')}
                    className={errors.lesson_date ? 'border-red-500' : ''}
                  />
                  {errors.lesson_date && (
                    <p className="text-sm text-red-600">{errors.lesson_date.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <textarea
                  id="content"
                  {...register('content')}
                  className={`flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors.content ? 'border-red-500' : ''}`}
                  placeholder="Enter lesson content..."
                />
                {errors.content && (
                  <p className="text-sm text-red-600">{errors.content.message}</p>
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
                  Create Lesson Note
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Lesson Notes</CardTitle>
          <CardDescription>
            View and manage all lesson notes in the system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={lessonNotes}
            searchKey="title"
            searchPlaceholder="Search lesson notes..."
          />
        </CardContent>
      </Card>

      {/* Edit Modal */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Lesson Note</DialogTitle>
            <DialogDescription>
              Update the lesson note information.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(handleEditNote)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Title</Label>
              <Input
                id="edit-title"
                {...register('title')}
                className={errors.title ? 'border-red-500' : ''}
              />
              {errors.title && (
                <p className="text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-content">Content</Label>
              <textarea
                id="edit-content"
                {...register('content')}
                className={`flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors.content ? 'border-red-500' : ''}`}
                placeholder="Enter lesson content..."
              />
              {errors.content && (
                <p className="text-sm text-red-600">{errors.content.message}</p>
              )}
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                Update Lesson Note
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
