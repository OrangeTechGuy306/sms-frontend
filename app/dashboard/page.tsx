"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  TrendingUp,
  DollarSign,
  Clock,
  AlertCircle,
  CheckCircle,
  Loader2
} from 'lucide-react';
import { useAuth } from '@/src/contexts/AuthContext';
import { analyticsApi } from '@/src/lib/api';

interface DashboardStats {
  total_students: number;
  total_teachers: number;
  total_classes: number;
  total_subjects: number;
  attendance_today: {
    total: number;
    present: number;
    absent: number;
    late: number;
    attendance_rate: number;
  };
  fees: {
    total_collected: number;
    total_outstanding: number;
    paid_students: number;
    pending_students: number;
  };
}

export default function DashboardPage() {
  const { user, isLoading: authLoading } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Ensure we have a valid token before making the request
        const token = localStorage.getItem('auth_token');
        if (!token) {
          console.warn('No auth token found, skipping dashboard data fetch');
          return;
        }

        // Add a delay to ensure authentication is fully initialized
        await new Promise(resolve => setTimeout(resolve, 200));

        console.log('Fetching dashboard data with token:', token.substring(0, 20) + '...');
        const response = await analyticsApi.getDashboard();

        // Handle both wrapped and direct response formats
        const data = (response as any).data || response;
        setStats(data as DashboardStats);
        console.log('Dashboard data fetched successfully:', data);
      } catch (error: any) {
        console.error('Error fetching dashboard data:', error);

        // Check if it's an authentication error
        if (error.response?.status === 401) {
          console.error('Authentication failed for dashboard data - this might cause logout');
          // Don't set fallback data for auth errors, let the auth system handle it
          return;
        }

        console.warn('Dashboard data unavailable, using fallback data');
        // Fallback data for non-auth errors
        setStats({
          total_students: 0,
          total_teachers: 0,
          total_classes: 0,
          total_subjects: 0,
          attendance_today: {
            total: 0,
            present: 0,
            absent: 0,
            late: 0,
            attendance_rate: 0
          },
          fees: {
            total_collected: 0,
            total_outstanding: 0,
            paid_students: 0,
            pending_students: 0
          }
        });
      } finally {
        setLoading(false);
      }
    };

    // Only fetch dashboard data if user is authenticated and not loading
    if (user && !authLoading) {
      fetchDashboardData();
    }
  }, [user, authLoading]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading dashboard...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, {user?.first_name || 'User'}!
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening at your school today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-sm">
            {user?.user_type ? user.user_type.charAt(0).toUpperCase() + user.user_type.slice(1) : 'User'}
          </Badge>
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            View Calendar
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.total_students || 0}</div>
            <p className="text-xs text-muted-foreground">Enrolled students</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.total_teachers || 0}</div>
            <p className="text-xs text-muted-foreground">Active teachers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Classes</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.total_classes || 0}</div>
            <p className="text-xs text-muted-foreground">Active classes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subjects</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.total_subjects || 0}</div>
            <p className="text-xs text-muted-foreground">Available subjects</p>
          </CardContent>
        </Card>
      </div>

      {/* Today's Attendance */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Today's Attendance
            </CardTitle>
            <CardDescription>
              Current attendance status for today
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Attendance Rate</span>
              <Badge variant={(stats?.attendance_today?.attendance_rate || 0) >= 90 ? "default" : "destructive"}>
                {stats?.attendance_today?.attendance_rate?.toFixed(1) || '0.0'}%
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Present
                </span>
                <span className="font-medium">{stats?.attendance_today?.present || 0}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  Absent
                </span>
                <span className="font-medium">{stats?.attendance_today?.absent || 0}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-yellow-500" />
                  Late
                </span>
                <span className="font-medium">{stats?.attendance_today?.late || 0}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Fee Collection
            </CardTitle>
            <CardDescription>
              Current fee collection status
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Total Collected</span>
                <span className="font-medium text-green-600">
                  ${stats?.fees?.total_collected?.toLocaleString() || 0}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Outstanding</span>
                <span className="font-medium text-red-600">
                  ${stats?.fees?.total_outstanding?.toLocaleString() || 0}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Paid Students</span>
                <span className="font-medium">{stats?.fees?.paid_students || 0}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Pending Students</span>
                <span className="font-medium">{stats?.fees?.pending_students || 0}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks and shortcuts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <GraduationCap className="h-6 w-6" />
              <span>Manage Students</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Users className="h-6 w-6" />
              <span>Manage Teachers</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <BookOpen className="h-6 w-6" />
              <span>View Classes</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <TrendingUp className="h-6 w-6" />
              <span>Analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
