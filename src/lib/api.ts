import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { toast } from '@/components/ui/use-toast';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError<any>) => {
    const message = (error.response?.data as any)?.message || error.message || 'An error occurred';

    // Handle specific error codes
    if (error.response?.status === 401) {
      const isLoginPage = typeof window !== 'undefined' && window.location.pathname === '/login';
      const isProfileRequest = error.config?.url?.includes('/auth/profile');
      const isDashboardRequest = error.config?.url?.includes('/analytics/dashboard');

      console.error('401 Unauthorized error:', {
        url: error.config?.url,
        isLoginPage,
        isProfileRequest,
        isDashboardRequest,
        hasToken: !!localStorage.getItem('auth_token')
      });

      // Don't redirect immediately for dashboard requests - let the component handle it
      if (!isLoginPage && !isProfileRequest && !isDashboardRequest) {
        console.log('Redirecting to login due to 401 error');
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user_data');
          window.location.href = '/login';
        }
      } else if (isDashboardRequest) {
        console.warn('Dashboard request failed with 401 - token might be invalid');
        // For dashboard requests, just reject the promise without redirecting
        // Let the dashboard component handle the error
      }
      return Promise.reject(error);
    }

    if (error.response?.status === 403) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to perform this action.",
        variant: "destructive",
      });
    } else if (error.response && error.response.status >= 500) {
      toast({
        title: "Server Error",
        description: "Something went wrong on our end. Please try again later.",
        variant: "destructive",
      });
    } else if (error.response && error.response.status >= 400) {
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    }

    return Promise.reject(error);
  }
);

// Generic API response type
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

// Generic API error type
export interface ApiError {
  success: false;
  message: string;
  error?: string;
}

// Helper function to handle API calls
export const apiCall = async <T>(
  request: () => Promise<AxiosResponse<ApiResponse<T>>>
): Promise<T> => {
  try {
    const response = await request();
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

// Helper function for paginated API calls
export const paginatedApiCall = async <T>(
  request: () => Promise<AxiosResponse<ApiResponse<T>>>
): Promise<ApiResponse<T>> => {
  try {
    const response = await request();
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Authentication API
export const authApi = {
  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post<ApiResponse<{ token: string; user: any }>>('/auth/login', credentials);
    return response.data;
  },

  register: async (userData: any) => {
    const response = await api.post<ApiResponse<{ token: string; user: any }>>('/auth/register', userData);
    return response.data;
  },

  logout: async () => {
    const response = await api.post<ApiResponse<null>>('/auth/logout');
    return response.data;
  },

  forgotPassword: async (email: string) => {
    const response = await api.post<ApiResponse<null>>('/auth/forgot-password', { email });
    return response.data;
  },

  resetPassword: async (token: string, password: string) => {
    const response = await api.post<ApiResponse<null>>('/auth/reset-password', { token, password });
    return response.data;
  },

  getProfile: async () => {
    return apiCall(() => api.get('/auth/profile'));
  },

  updateProfile: async (data: any) => {
    return apiCall(() => api.put('/auth/profile', data));
  },
};

// Students API
export const studentsApi = {
  getAll: async (params?: any) => {
    return paginatedApiCall(() => api.get('/students', { params }));
  },

  getById: async (id: string) => {
    return apiCall(() => api.get(`/students/${id}`));
  },

  getAcademicData: async (id: string) => {
    return apiCall(() => api.get(`/students/${id}/academic`));
  },

  create: async (data: any) => {
    return apiCall(() => api.post('/students', data));
  },

  update: async (id: string, data: any) => {
    return apiCall(() => api.put(`/students/${id}`, data));
  },

  delete: async (id: string) => {
    return apiCall(() => api.delete(`/students/${id}`));
  },

  bulkCreate: async (data: any[]) => {
    return apiCall(() => api.post('/students/bulk', { students: data }));
  },

  getByClass: async (classId: string, params?: any) => {
    return paginatedApiCall(() => api.get(`/students/class/${classId}`, { params }));
  },
};

// Teachers API
export const teachersApi = {
  getAll: async (params?: any) => {
    return paginatedApiCall(() => api.get('/teachers', { params }));
  },

  getById: async (id: string) => {
    return apiCall(() => api.get(`/teachers/${id}`));
  },

  create: async (data: any) => {
    return apiCall(() => api.post('/teachers', data));
  },

  update: async (id: string, data: any) => {
    return apiCall(() => api.put(`/teachers/${id}`, data));
  },

  delete: async (id: string) => {
    return apiCall(() => api.delete(`/teachers/${id}`));
  },

  getAssignments: async (teacherId: string) => {
    return apiCall(() => api.get(`/teachers/${teacherId}/assignments`));
  },
};

// Classes API
export const classesApi = {
  getAll: async (params?: any) => {
    return paginatedApiCall(() => api.get('/classes', { params }));
  },

  getById: async (id: string) => {
    return apiCall(() => api.get(`/classes/${id}`));
  },

  create: async (data: any) => {
    return apiCall(() => api.post('/classes', data));
  },

  update: async (id: string, data: any) => {
    return apiCall(() => api.put(`/classes/${id}`, data));
  },

  delete: async (id: string) => {
    return apiCall(() => api.delete(`/classes/${id}`));
  },
};

// Subjects API
export const subjectsApi = {
  getAll: async (params?: any) => {
    return paginatedApiCall(() => api.get('/subjects', { params }));
  },

  getById: async (id: string) => {
    return apiCall(() => api.get(`/subjects/${id}`));
  },

  create: async (data: any) => {
    return apiCall(() => api.post('/subjects', data));
  },

  update: async (id: string, data: any) => {
    return apiCall(() => api.put(`/subjects/${id}`, data));
  },

  delete: async (id: string) => {
    return apiCall(() => api.delete(`/subjects/${id}`));
  },
};

// Attendance API
export const attendanceApi = {
  getAll: async (params?: any) => {
    return paginatedApiCall(() => api.get('/attendance', { params }));
  },

  markAttendance: async (data: any) => {
    return apiCall(() => api.post('/attendance', data));
  },

  bulkMarkAttendance: async (data: any) => {
    return apiCall(() => api.post('/attendance/bulk', data));
  },

  getByStudent: async (studentId: string, params?: any) => {
    return paginatedApiCall(() => api.get(`/attendance/student/${studentId}`, { params }));
  },

  getByClass: async (classId: string, params?: any) => {
    return paginatedApiCall(() => api.get(`/attendance/class/${classId}`, { params }));
  },

  getStatistics: async (params?: any) => {
    return apiCall(() => api.get('/attendance/statistics', { params }));
  },
};

// Results API
export const resultsApi = {
  getAll: async (params?: any) => {
    return paginatedApiCall(() => api.get('/results', { params }));
  },

  create: async (data: any) => {
    return apiCall(() => api.post('/results', data));
  },

  update: async (id: string, data: any) => {
    return apiCall(() => api.put(`/results/${id}`, data));
  },

  delete: async (id: string) => {
    return apiCall(() => api.delete(`/results/${id}`));
  },

  getByStudent: async (studentId: string, params?: any) => {
    return paginatedApiCall(() => api.get(`/results/student/${studentId}`, { params }));
  },

  bulkCreate: async (data: any[]) => {
    return apiCall(() => api.post('/results/bulk', { results: data }));
  },
};

// Fees API
export const feesApi = {
  getAll: async (params?: any) => {
    return paginatedApiCall(() => api.get('/fees', { params }));
  },

  create: async (data: any) => {
    return apiCall(() => api.post('/fees', data));
  },

  update: async (id: string, data: any) => {
    return apiCall(() => api.put(`/fees/${id}`, data));
  },

  delete: async (id: string) => {
    return apiCall(() => api.delete(`/fees/${id}`));
  },

  getByStudent: async (studentId: string, params?: any) => {
    return paginatedApiCall(() => api.get(`/fees/student/${studentId}`, { params }));
  },

  processPayment: async (data: any) => {
    return apiCall(() => api.post('/fees/payment', data));
  },

  getStatistics: async () => {
    return apiCall(() => api.get('/fees/statistics'));
  },

  markAsPaid: async (id: string) => {
    return apiCall(() => api.post(`/fees/${id}/mark-paid`));
  },
};

// Messages API
export const messagesApi = {
  getAll: async (params?: any) => {
    return paginatedApiCall(() => api.get('/messages', { params }));
  },

  create: async (data: any) => {
    return apiCall(() => api.post('/messages', data));
  },

  getById: async (id: string) => {
    return apiCall(() => api.get(`/messages/${id}`));
  },

  markAsRead: async (id: string) => {
    return apiCall(() => api.put(`/messages/${id}/read`));
  },

  delete: async (id: string) => {
    return apiCall(() => api.delete(`/messages/${id}`));
  },
};

// Events API
export const eventsApi = {
  getAll: async (params?: any) => {
    return paginatedApiCall(() => api.get('/events', { params }));
  },

  create: async (data: any) => {
    return apiCall(() => api.post('/events', data));
  },

  getById: async (id: string) => {
    return apiCall(() => api.get(`/events/${id}`));
  },

  update: async (id: string, data: any) => {
    return apiCall(() => api.put(`/events/${id}`, data));
  },

  delete: async (id: string) => {
    return apiCall(() => api.delete(`/events/${id}`));
  },

  rsvp: async (eventId: string, response: string) => {
    return apiCall(() => api.post(`/events/${eventId}/rsvp`, { response }));
  },

  getStatistics: async () => {
    return apiCall(() => api.get('/events/statistics'));
  },
};

// Health Records API
export const healthApi = {
  // Get student health records
  getByStudent: async (studentId: string, params?: any) => {
    return paginatedApiCall(() => api.get(`/health/student/${studentId}`, { params }));
  },

  // Create health record
  createRecord: async (data: any) => {
    return apiCall(() => api.post('/health/records', data));
  },

  // Update health record
  updateRecord: async (id: string, data: any) => {
    return apiCall(() => api.put(`/health/records/${id}`, data));
  },

  // Record vaccination
  recordVaccination: async (data: any) => {
    return apiCall(() => api.post('/health/vaccination', data));
  },

  // Get student vaccinations
  getVaccinations: async (studentId: string) => {
    return apiCall(() => api.get(`/health/vaccinations/${studentId}`));
  },

  // Record nurse visit
  recordNurseVisit: async (data: any) => {
    return apiCall(() => api.post('/health/nurse-visit', data));
  },

  // Get student nurse visits
  getNurseVisits: async (studentId: string, params?: any) => {
    return paginatedApiCall(() => api.get(`/health/nurse-visits/${studentId}`, { params }));
  },

  // Get all health records (for admin/teacher view)
  getAll: async (params?: any) => {
    return paginatedApiCall(() => api.get('/health/records', { params }));
  },
};

// Files API
export const filesApi = {
  upload: async (file: File, metadata?: any) => {
    const formData = new FormData();
    formData.append('file', file);
    if (metadata) {
      Object.keys(metadata).forEach(key => {
        formData.append(key, metadata[key]);
      });
    }

    const response = await api.post<ApiResponse<any>>('/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  bulkUpload: async (files: File[], metadata?: any) => {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });
    if (metadata) {
      Object.keys(metadata).forEach(key => {
        formData.append(key, metadata[key]);
      });
    }

    const response = await api.post<ApiResponse<any>>('/files/bulk-upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getList: async (params?: any) => {
    return paginatedApiCall(() => api.get('/files/list', { params }));
  },

  getById: async (id: string) => {
    return apiCall(() => api.get(`/files/${id}`));
  },

  getByStudent: async (studentId: string, params?: any) => {
    return apiCall(() => api.get(`/files/student/${studentId}`, { params }));
  },

  delete: async (id: string) => {
    return apiCall(() => api.delete(`/files/${id}`));
  },

  download: async (id: string) => {
    const response = await api.get(`/files/${id}`, {
      responseType: 'blob',
    });
    return response.data;
  },
};

// Analytics API
export const analyticsApi = {
  getDashboard: async () => {
    return apiCall(() => api.get('/analytics/dashboard'));
  },

  getAttendanceStats: async (params?: any) => {
    return apiCall(() => api.get('/analytics/attendance', { params }));
  },

  getAcademicStats: async (params?: any) => {
    return apiCall(() => api.get('/analytics/academic', { params }));
  },

  // Alias for backward compatibility
  getPerformanceStats: async (params?: any) => {
    return apiCall(() => api.get('/analytics/academic', { params }));
  },

  getFinancialStats: async (params?: any) => {
    return apiCall(() => api.get('/analytics/financial', { params }));
  },

  getEnrollmentStats: async (params?: any) => {
    return apiCall(() => api.get('/analytics/enrollment', { params }));
  },
};

// Lesson Notes API
export const lessonNotesApi = {
  getAll: async (params?: any) => {
    return paginatedApiCall(() => api.get('/lesson-notes', { params }));
  },

  create: async (data: any) => {
    return apiCall(() => api.post('/lesson-notes', data));
  },

  getById: async (id: string) => {
    return apiCall(() => api.get(`/lesson-notes/${id}`));
  },

  update: async (id: string, data: any) => {
    return apiCall(() => api.put(`/lesson-notes/${id}`, data));
  },

  delete: async (id: string) => {
    return apiCall(() => api.delete(`/lesson-notes/${id}`));
  },

  getByTeacher: async (teacherId: string, params?: any) => {
    return paginatedApiCall(() => api.get(`/lesson-notes/teacher/${teacherId}`, { params }));
  },

  getBySubject: async (subjectId: string, params?: any) => {
    return paginatedApiCall(() => api.get(`/lesson-notes/subject/${subjectId}`, { params }));
  },

  getByClass: async (classId: string, params?: any) => {
    return paginatedApiCall(() => api.get(`/lesson-notes/class/${classId}`, { params }));
  },

  publish: async (id: string) => {
    return apiCall(() => api.post(`/lesson-notes/${id}/publish`));
  },

  archive: async (id: string) => {
    return apiCall(() => api.post(`/lesson-notes/${id}/archive`));
  },
};

// Timetables API
export const timetablesApi = {
  getAll: async (params?: any) => {
    return paginatedApiCall(() => api.get('/timetables', { params }));
  },

  create: async (data: any) => {
    return apiCall(() => api.post('/timetables', data));
  },

  getById: async (id: string) => {
    return apiCall(() => api.get(`/timetables/${id}`));
  },

  update: async (id: string, data: any) => {
    return apiCall(() => api.put(`/timetables/${id}`, data));
  },

  delete: async (id: string) => {
    return apiCall(() => api.delete(`/timetables/${id}`));
  },

  addPeriod: async (id: string, data: any) => {
    return apiCall(() => api.post(`/timetables/${id}/periods`, data));
  },

  getByClass: async (classId: string, params?: any) => {
    return paginatedApiCall(() => api.get(`/timetables/class/${classId}`, { params }));
  },

  getByTeacher: async (teacherId: string, params?: any) => {
    return paginatedApiCall(() => api.get(`/timetables/teacher/${teacherId}`, { params }));
  },

  activate: async (id: string) => {
    return apiCall(() => api.post(`/timetables/${id}/activate`));
  },

  deactivate: async (id: string) => {
    return apiCall(() => api.post(`/timetables/${id}/deactivate`));
  },

  export: async (id: string, format: string = 'pdf') => {
    return apiCall(() => api.get(`/timetables/${id}/export`, { params: { format } }));
  },
};

// Transportation API
export const transportationApi = {
  // Routes
  getRoutes: async (params?: any) => {
    return paginatedApiCall(() => api.get('/transportation/routes', { params }));
  },

  createRoute: async (data: any) => {
    return apiCall(() => api.post('/transportation/routes', data));
  },

  getRouteById: async (id: string) => {
    return apiCall(() => api.get(`/transportation/routes/${id}`));
  },

  // Buses
  getBuses: async (params?: any) => {
    return paginatedApiCall(() => api.get('/transportation/buses', { params }));
  },

  createBus: async (data: any) => {
    return apiCall(() => api.post('/transportation/buses', data));
  },

  // Drivers
  getDrivers: async (params?: any) => {
    return paginatedApiCall(() => api.get('/transportation/drivers', { params }));
  },

  createDriver: async (data: any) => {
    return apiCall(() => api.post('/transportation/drivers', data));
  },

  // Assignments
  getAssignments: async (params?: any) => {
    return paginatedApiCall(() => api.get('/transportation/assignments', { params }));
  },

  // Tracking
  getTracking: async () => {
    return apiCall(() => api.get('/transportation/tracking'));
  },

  // Student Transportation
  getStudentTransportation: async (studentId: string) => {
    return apiCall(() => api.get(`/transportation/students/${studentId}`));
  },

  // Reports
  getUtilizationReports: async () => {
    return apiCall(() => api.get('/transportation/reports/utilization'));
  },
};

// Assessments API
export const assessmentsApi = {
  getAll: async (params?: any) => {
    return paginatedApiCall(() => api.get('/assessments', { params }));
  },

  create: async (data: any) => {
    return apiCall(() => api.post('/assessments', data));
  },

  getById: async (id: string) => {
    return apiCall(() => api.get(`/assessments/${id}`));
  },

  addQuestion: async (id: string, data: any) => {
    return apiCall(() => api.post(`/assessments/${id}/questions`, data));
  },

  submit: async (id: string, answers: any) => {
    return apiCall(() => api.post(`/assessments/${id}/submit`, { answers }));
  },

  getBySubject: async (subjectId: string, params?: any) => {
    return paginatedApiCall(() => api.get(`/assessments/subject/${subjectId}`, { params }));
  },

  getByTeacher: async (teacherId: string, params?: any) => {
    return paginatedApiCall(() => api.get(`/assessments/teacher/${teacherId}`, { params }));
  },

  getByClass: async (classId: string, params?: any) => {
    return paginatedApiCall(() => api.get(`/assessments/class/${classId}`, { params }));
  },

  publish: async (id: string) => {
    return apiCall(() => api.post(`/assessments/${id}/publish`));
  },

  getResults: async (id: string) => {
    return apiCall(() => api.get(`/assessments/${id}/results`));
  },

  export: async (id: string, format: string = 'pdf') => {
    return apiCall(() => api.get(`/assessments/${id}/export`, { params: { format } }));
  },
};

// Library API
export const libraryApi = {
  // Books
  getBooks: async (params?: any) => {
    return paginatedApiCall(() => api.get('/library/books', { params }));
  },

  createBook: async (data: any) => {
    return apiCall(() => api.post('/library/books', data));
  },

  getBookById: async (id: string) => {
    return apiCall(() => api.get(`/library/books/${id}`));
  },

  issueBook: async (id: string, data: any) => {
    return apiCall(() => api.post(`/library/books/${id}/issue`, data));
  },

  reserveBook: async (id: string, data?: any) => {
    return apiCall(() => api.post(`/library/books/${id}/reserve`, data));
  },

  // Loans
  getLoans: async (params?: any) => {
    return paginatedApiCall(() => api.get('/library/loans', { params }));
  },

  returnBook: async (loanId: string, data: any) => {
    return apiCall(() => api.put(`/library/loans/${loanId}/return`, data));
  },

  getOverdueLoans: async (params?: any) => {
    return paginatedApiCall(() => api.get('/library/loans/overdue', { params }));
  },

  getUserLoans: async (userId: string, params?: any) => {
    return paginatedApiCall(() => api.get(`/library/loans/user/${userId}`, { params }));
  },

  // Reservations
  getReservations: async (params?: any) => {
    return paginatedApiCall(() => api.get('/library/reservations', { params }));
  },

  // Reports
  getStatistics: async () => {
    return apiCall(() => api.get('/library/reports/statistics'));
  },

  // Search
  searchBooks: async (params?: any) => {
    return paginatedApiCall(() => api.get('/library/search', { params }));
  },
};

// Parent Portal API
export const parentApi = {
  getChildren: async (parentId: string) => {
    return apiCall(() => api.get(`/parents/${parentId}/children`));
  },

  getChildAttendance: async (parentId: string, studentId: string, params?: any) => {
    return paginatedApiCall(() => api.get(`/parents/${parentId}/children/${studentId}/attendance`, { params }));
  },

  getChildGrades: async (parentId: string, studentId: string, params?: any) => {
    return apiCall(() => api.get(`/parents/${parentId}/children/${studentId}/grades`, { params }));
  },

  getMeetings: async (parentId: string, params?: any) => {
    return paginatedApiCall(() => api.get(`/parents/${parentId}/meetings`, { params }));
  },

  requestMeeting: async (parentId: string, data: any) => {
    return apiCall(() => api.post(`/parents/${parentId}/meetings`, data));
  },

  getCommunications: async (parentId: string, params?: any) => {
    return paginatedApiCall(() => api.get(`/parents/${parentId}/communications`, { params }));
  },

  getDashboard: async (parentId: string) => {
    return apiCall(() => api.get(`/parents/${parentId}/dashboard`));
  },

  getChildTimetable: async (parentId: string, studentId: string) => {
    return apiCall(() => api.get(`/parents/${parentId}/children/${studentId}/timetable`));
  },

  getChildFees: async (parentId: string, studentId: string) => {
    return apiCall(() => api.get(`/parents/${parentId}/children/${studentId}/fees`));
  },

  getChildTransportation: async (parentId: string, studentId: string) => {
    return apiCall(() => api.get(`/parents/${parentId}/children/${studentId}/transportation`));
  },

  markMessageRead: async (parentId: string, messageId: string) => {
    return apiCall(() => api.post(`/parents/${parentId}/communications/${messageId}/read`));
  },
};

// Admin API
export const adminApi = {
  getAll: async (params?: any) => {
    return paginatedApiCall(() => api.get('/admin', { params }));
  },

  getById: async (id: string) => {
    return apiCall(() => api.get(`/admin/${id}`));
  },

  create: async (data: any) => {
    return apiCall(() => api.post('/admin', data));
  },

  update: async (id: string, data: any) => {
    return apiCall(() => api.put(`/admin/${id}`, data));
  },

  delete: async (id: string) => {
    return apiCall(() => api.delete(`/admin/${id}`));
  },
};



export default api;
