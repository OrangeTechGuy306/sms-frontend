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
import { parentPortalApi } from '@/src/lib/api';
import { parentMeetingRequestSchema, type ParentMeetingRequestFormData } from '@/src/lib/validations';
import { toast } from '@/src/components/ui/use-toast';
import { Plus, Calendar, MessageSquare, FileText, BarChart3, Users, Clock, Loader2 } from 'lucide-react';
import type { ColumnDef } from '@tanstack/react-table';

interface MeetingRequest {
  id: string;
  teacher_id: string;
  student_id: string;
  requested_date: string;
  requested_time: string;
  meeting_type: string;
  purpose: string;
  duration_minutes: number;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  created_at: string;
  updated_at: string;
  teacher_name?: string;
  student_name?: string;
  approved_date?: string;
  approved_time?: string;
}

interface StudentProgress {
  student_id: string;
  student_name: string;
  attendance_percentage: number;
  average_grade: number;
  recent_assignments: number;
  upcoming_exams: number;
}

export default function ParentPortalPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'meetings' | 'messages' | 'reports'>('overview');
  const [meetingRequests, setMeetingRequests] = useState<MeetingRequest[]>([]);
  const [studentProgress, setStudentProgress] = useState<StudentProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [requestMeetingModalOpen, setRequestMeetingModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ParentMeetingRequestFormData>({
    resolver: zodResolver(parentMeetingRequestSchema),
    defaultValues: {
      meeting_type: 'in_person',
      duration_minutes: 30,
    },
  });

  const fetchMeetingRequests = async () => {
    try {
      setLoading(true);
      const response = await parentPortalApi.getMeetingRequests({
        page: 1,
        limit: 50,
        sort_by: 'created_at',
        sort_order: 'desc'
      });
      setMeetingRequests(response.data);
    } catch (error) {
      console.error('Error fetching meeting requests:', error);
      toast({
        title: "Error",
        description: "Failed to fetch meeting requests. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchStudentProgress = async () => {
    try {
      setLoading(true);
      const response = await parentPortalApi.getStudentProgress();
      setStudentProgress(response.data);
    } catch (error) {
      console.error('Error fetching student progress:', error);
      toast({
        title: "Error",
        description: "Failed to fetch student progress. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'overview') {
      fetchStudentProgress();
    } else if (activeTab === 'meetings') {
      fetchMeetingRequests();
    }
  }, [activeTab]);

  const handleRequestMeeting = async (data: ParentMeetingRequestFormData) => {
    try {
      const newRequest = await parentPortalApi.requestMeeting(data);
      setMeetingRequests(prev => [newRequest, ...prev]);
      setRequestMeetingModalOpen(false);
      reset();
      toast({
        title: "Meeting Requested",
        description: "Your meeting request has been submitted successfully.",
      });
    } catch (error) {
      console.error('Error requesting meeting:', error);
      toast({
        title: "Error",
        description: "Failed to request meeting. Please try again.",
        variant: "destructive",
      });
    }
  };

  const meetingColumns: ColumnDef<MeetingRequest>[] = [
    {
      accessorKey: "teacher_name",
      header: "Teacher",
    },
    {
      accessorKey: "student_name",
      header: "Student",
    },
    {
      accessorKey: "requested_date",
      header: "Requested Date",
      cell: ({ row }) => {
        const date = new Date(row.getValue("requested_date"));
        return date.toLocaleDateString();
      },
    },
    {
      accessorKey: "requested_time",
      header: "Requested Time",
    },
    {
      accessorKey: "meeting_type",
      header: "Type",
      cell: ({ row }) => {
        const type = row.getValue("meeting_type") as string;
        return <Badge variant="outline">{type.replace('_', ' ')}</Badge>;
      },
    },
    {
      accessorKey: "duration_minutes",
      header: "Duration",
      cell: ({ row }) => {
        const duration = row.getValue("duration_minutes") as number;
        return `${duration} min`;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        const variant = status === 'approved' ? 'default' : 
                      status === 'completed' ? 'secondary' :
                      status === 'rejected' ? 'destructive' : 'outline';
        return <Badge variant={variant}>{status}</Badge>;
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const request = row.original;
        return (
          <div className="flex items-center space-x-2">
            {request.status === 'pending' && (
              <Button variant="ghost" size="sm">
                Cancel
              </Button>
            )}
            {request.status === 'approved' && (
              <Button variant="ghost" size="sm">
                Join Meeting
              </Button>
            )}
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
          <div className="text-lg font-medium">Loading parent portal...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Parent Portal</h1>
          <p className="text-muted-foreground">
            Stay connected with your child's education and school activities.
          </p>
        </div>
        
        {activeTab === 'meetings' && (
          <Dialog open={requestMeetingModalOpen} onOpenChange={setRequestMeetingModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Request Meeting
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Request Teacher Meeting</DialogTitle>
                <DialogDescription>
                  Request a meeting with your child's teacher.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit(handleRequestMeeting)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="teacher_id">Teacher</Label>
                    <Select onValueChange={(value) => setValue('teacher_id', value)}>
                      <SelectTrigger className={errors.teacher_id ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select teacher" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="teacher-1">Ms. Johnson (Math)</SelectItem>
                        <SelectItem value="teacher-2">Mr. Smith (English)</SelectItem>
                        <SelectItem value="teacher-3">Mrs. Davis (Science)</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.teacher_id && (
                      <p className="text-sm text-red-600">{errors.teacher_id.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="student_id">Student</Label>
                    <Select onValueChange={(value) => setValue('student_id', value)}>
                      <SelectTrigger className={errors.student_id ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select student" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student-1">John Doe</SelectItem>
                        <SelectItem value="student-2">Jane Doe</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.student_id && (
                      <p className="text-sm text-red-600">{errors.student_id.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="requested_date">Preferred Date</Label>
                    <Input
                      id="requested_date"
                      type="date"
                      {...register('requested_date')}
                      className={errors.requested_date ? 'border-red-500' : ''}
                    />
                    {errors.requested_date && (
                      <p className="text-sm text-red-600">{errors.requested_date.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="requested_time">Preferred Time</Label>
                    <Input
                      id="requested_time"
                      type="time"
                      {...register('requested_time')}
                      className={errors.requested_time ? 'border-red-500' : ''}
                    />
                    {errors.requested_time && (
                      <p className="text-sm text-red-600">{errors.requested_time.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="meeting_type">Meeting Type</Label>
                  <Select onValueChange={(value) => setValue('meeting_type', value as any)}>
                    <SelectTrigger className={errors.meeting_type ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select meeting type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="in_person">In Person</SelectItem>
                      <SelectItem value="video_call">Video Call</SelectItem>
                      <SelectItem value="phone_call">Phone Call</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.meeting_type && (
                    <p className="text-sm text-red-600">{errors.meeting_type.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="purpose">Purpose of Meeting</Label>
                  <textarea
                    id="purpose"
                    {...register('purpose')}
                    className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors.purpose ? 'border-red-500' : ''}`}
                    placeholder="Please describe the purpose of this meeting..."
                  />
                  {errors.purpose && (
                    <p className="text-sm text-red-600">{errors.purpose.message}</p>
                  )}
                </div>

                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setRequestMeetingModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    Request Meeting
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
        <Button
          variant={activeTab === 'overview' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('overview')}
        >
          <BarChart3 className="mr-2 h-4 w-4" />
          Overview
        </Button>
        <Button
          variant={activeTab === 'meetings' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('meetings')}
        >
          <Calendar className="mr-2 h-4 w-4" />
          Meetings
        </Button>
        <Button
          variant={activeTab === 'messages' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('messages')}
        >
          <MessageSquare className="mr-2 h-4 w-4" />
          Messages
        </Button>
        <Button
          variant={activeTab === 'reports' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('reports')}
        >
          <FileText className="mr-2 h-4 w-4" />
          Reports
        </Button>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Children Enrolled</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{studentProgress.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Attendance</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {studentProgress.length > 0 
                    ? Math.round(studentProgress.reduce((acc, s) => acc + s.attendance_percentage, 0) / studentProgress.length)
                    : 0}%
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Meetings</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {meetingRequests.filter(m => m.status === 'pending').length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
              </CardContent>
            </Card>
          </div>

          {/* Student Progress Cards */}
          <div className="grid gap-4 md:grid-cols-2">
            {studentProgress.map((student) => (
              <Card key={student.student_id}>
                <CardHeader>
                  <CardTitle>{student.student_name}</CardTitle>
                  <CardDescription>Academic Progress Overview</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Attendance:</span>
                    <Badge variant={student.attendance_percentage >= 90 ? "default" : "destructive"}>
                      {student.attendance_percentage}%
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Average Grade:</span>
                    <Badge variant={student.average_grade >= 80 ? "default" : "outline"}>
                      {student.average_grade}%
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Recent Assignments:</span>
                    <span>{student.recent_assignments}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Upcoming Exams:</span>
                    <span>{student.upcoming_exams}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'meetings' && (
        <Card>
          <CardHeader>
            <CardTitle>Meeting Requests</CardTitle>
            <CardDescription>
              View and manage your meeting requests with teachers.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={meetingColumns}
              data={meetingRequests}
              searchKey="teacher_name"
              searchPlaceholder="Search meetings..."
            />
          </CardContent>
        </Card>
      )}

      {activeTab === 'messages' && (
        <Card>
          <CardHeader>
            <CardTitle>Messages</CardTitle>
            <CardDescription>
              Communication with teachers and school administration.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Messages feature will be implemented here.</p>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'reports' && (
        <Card>
          <CardHeader>
            <CardTitle>Academic Reports</CardTitle>
            <CardDescription>
              Download and view your child's academic reports.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Reports feature will be implemented here.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
