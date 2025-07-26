import { z } from 'zod';

// Common validation schemas
export const emailSchema = z.string().email('Please enter a valid email address');
export const passwordSchema = z.string().min(8, 'Password must be at least 8 characters');
export const phoneSchema = z.string().regex(/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number');
export const nameSchema = z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters');

// Authentication schemas
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
});

export const registerSchema = z.object({
  first_name: nameSchema,
  last_name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  confirm_password: z.string(),
  user_type: z.enum(['admin', 'teacher', 'student', 'parent']),
  phone: phoneSchema.optional(),
  date_of_birth: z.string().optional(),
  gender: z.enum(['male', 'female', 'other']).optional(),
  address: z.string().max(500, 'Address must be less than 500 characters').optional(),
}).refine((data) => data.password === data.confirm_password, {
  message: "Passwords don't match",
  path: ["confirm_password"],
});

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = z.object({
  password: passwordSchema,
  confirm_password: z.string(),
}).refine((data) => data.password === data.confirm_password, {
  message: "Passwords don't match",
  path: ["confirm_password"],
});

// Student schemas
export const studentSchema = z.object({
  student_id: z.string().min(1, 'Student ID is required'),
  first_name: nameSchema,
  last_name: nameSchema,
  email: emailSchema.optional(),
  phone: phoneSchema.optional(),
  date_of_birth: z.string().min(1, 'Date of birth is required'),
  gender: z.enum(['male', 'female', 'other']),
  address: z.string().max(500, 'Address must be less than 500 characters').optional(),
  guardian_name: z.string().min(2, 'Guardian name is required'),
  guardian_phone: phoneSchema,
  guardian_email: emailSchema.optional(),
  class_id: z.string().uuid('Please select a valid class'),
  admission_date: z.string().min(1, 'Admission date is required'),
  blood_group: z.string().optional(),
  medical_conditions: z.string().optional(),
  emergency_contact_name: z.string().optional(),
  emergency_contact_phone: phoneSchema.optional(),
  status: z.enum(['active', 'inactive', 'graduated', 'transferred']).default('active'),
});

// Teacher schemas
export const teacherSchema = z.object({
  employee_id: z.string().min(1, 'Employee ID is required'),
  first_name: nameSchema,
  last_name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  date_of_birth: z.string().min(1, 'Date of birth is required'),
  gender: z.enum(['male', 'female', 'other']),
  address: z.string().max(500, 'Address must be less than 500 characters').optional(),
  qualification: z.string().min(1, 'Qualification is required'),
  experience_years: z.number().min(0, 'Experience must be 0 or more years'),
  specialization: z.string().optional(),
  hire_date: z.string().min(1, 'Hire date is required'),
  salary: z.number().min(0, 'Salary must be a positive number').optional(),
  emergency_contact_name: z.string().optional(),
  emergency_contact_phone: phoneSchema.optional(),
  status: z.enum(['active', 'inactive', 'on_leave', 'terminated']).default('active'),
});

// Class schemas
export const classSchema = z.object({
  name: z.string().min(1, 'Class name is required').max(100, 'Class name must be less than 100 characters'),
  grade_level_id: z.string().uuid('Please select a valid grade level'),
  section: z.string().min(1, 'Section is required').max(10, 'Section must be less than 10 characters'),
  academic_year_id: z.string().uuid('Please select a valid academic year'),
  class_teacher_id: z.string().uuid('Please select a class teacher').optional(),
  room_number: z.string().max(20, 'Room number must be less than 20 characters').optional(),
  capacity: z.number().min(1, 'Capacity must be at least 1').max(100, 'Capacity must be less than 100'),
  status: z.enum(['active', 'inactive']).default('active'),
});

// Subject schemas
export const subjectSchema = z.object({
  name: z.string().min(1, 'Subject name is required').max(100, 'Subject name must be less than 100 characters'),
  code: z.string().min(1, 'Subject code is required').max(20, 'Subject code must be less than 20 characters'),
  description: z.string().max(500, 'Description must be less than 500 characters').optional(),
  grade_level_id: z.string().uuid('Please select a valid grade level'),
  credits: z.number().min(0, 'Credits must be 0 or more').max(10, 'Credits must be 10 or less').optional(),
  is_mandatory: z.boolean().default(true),
  status: z.enum(['active', 'inactive']).default('active'),
});

// Attendance schemas
export const attendanceSchema = z.object({
  student_id: z.string().uuid('Please select a valid student'),
  attendance_date: z.string().min(1, 'Attendance date is required'),
  status: z.enum(['present', 'absent', 'late', 'excused']),
  subject_id: z.string().uuid('Please select a valid subject').optional(),
  check_in_time: z.string().optional(),
  check_out_time: z.string().optional(),
  late_minutes: z.number().min(0, 'Late minutes must be 0 or more').optional(),
  notes: z.string().max(500, 'Notes must be less than 500 characters').optional(),
});

// Results schemas
export const resultSchema = z.object({
  student_id: z.string().uuid('Please select a valid student'),
  subject_id: z.string().uuid('Please select a valid subject'),
  academic_year_id: z.string().uuid('Please select a valid academic year'),
  term_id: z.string().uuid('Please select a valid term'),
  assessment_type: z.enum(['quiz', 'test', 'exam', 'assignment', 'project']),
  marks_obtained: z.number().min(0, 'Marks must be 0 or more'),
  total_marks: z.number().min(1, 'Total marks must be at least 1'),
  exam_date: z.string().min(1, 'Exam date is required'),
  remarks: z.string().max(500, 'Remarks must be less than 500 characters').optional(),
}).refine((data) => data.marks_obtained <= data.total_marks, {
  message: "Marks obtained cannot be greater than total marks",
  path: ["marks_obtained"],
});

// Fee schemas
export const feeSchema = z.object({
  student_id: z.string().uuid('Please select a valid student'),
  fee_type_id: z.string().uuid('Please select a valid fee type'),
  academic_year_id: z.string().uuid('Please select a valid academic year'),
  term_id: z.string().uuid('Please select a valid term').optional(),
  amount: z.number().min(0, 'Amount must be 0 or more'),
  due_date: z.string().min(1, 'Due date is required'),
  description: z.string().max(500, 'Description must be less than 500 characters').optional(),
  status: z.enum(['pending', 'paid', 'overdue', 'waived']).default('pending'),
});

// Message schemas
export const messageSchema = z.object({
  subject: z.string().min(1, 'Subject is required').max(200, 'Subject must be less than 200 characters'),
  content: z.string().min(1, 'Message content is required').max(5000, 'Content must be less than 5000 characters'),
  recipient_type: z.enum(['individual', 'class', 'grade', 'all_students', 'all_teachers', 'all_parents', 'broadcast']),
  recipient_id: z.string().uuid().optional(),
  priority: z.enum(['low', 'normal', 'high', 'urgent']).default('normal'),
  message_type: z.enum(['announcement', 'alert', 'reminder', 'newsletter', 'personal']).default('personal'),
  scheduled_at: z.string().optional(),
});

// Event schemas
export const eventSchema = z.object({
  title: z.string().min(1, 'Event title is required').max(200, 'Title must be less than 200 characters'),
  description: z.string().max(2000, 'Description must be less than 2000 characters').optional(),
  event_type: z.enum(['academic', 'sports', 'cultural', 'meeting', 'holiday', 'exam', 'other']),
  start_date: z.string().min(1, 'Start date is required'),
  end_date: z.string().min(1, 'End date is required'),
  start_time: z.string().optional(),
  end_time: z.string().optional(),
  location: z.string().max(200, 'Location must be less than 200 characters').optional(),
  organizer: z.string().max(100, 'Organizer must be less than 100 characters').optional(),
  target_audience: z.enum(['all', 'students', 'teachers', 'parents', 'staff', 'specific_class', 'specific_grade']),
  class_id: z.string().uuid().optional(),
  grade_level_id: z.string().uuid().optional(),
  is_mandatory: z.boolean().default(false),
  max_participants: z.number().min(1, 'Max participants must be at least 1').optional(),
  registration_required: z.boolean().default(false),
  registration_deadline: z.string().optional(),
  status: z.enum(['draft', 'published', 'ongoing', 'completed', 'cancelled']).default('draft'),
});

// Health record schemas
export const healthRecordSchema = z.object({
  student_id: z.string().uuid('Please select a valid student'),
  record_type: z.enum(['checkup', 'vaccination', 'illness', 'injury', 'medication', 'allergy', 'other']),
  date: z.string().min(1, 'Date is required'),
  description: z.string().min(1, 'Description is required').max(1000, 'Description must be less than 1000 characters'),
  symptoms: z.string().max(500, 'Symptoms must be less than 500 characters').optional(),
  treatment: z.string().max(500, 'Treatment must be less than 500 characters').optional(),
  medication: z.string().max(500, 'Medication must be less than 500 characters').optional(),
  doctor_name: z.string().max(100, 'Doctor name must be less than 100 characters').optional(),
  follow_up_required: z.boolean().default(false),
  follow_up_date: z.string().optional(),
  notes: z.string().max(1000, 'Notes must be less than 1000 characters').optional(),
  status: z.enum(['active', 'resolved', 'ongoing']).default('active'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type StudentFormData = z.infer<typeof studentSchema>;
export type TeacherFormData = z.infer<typeof teacherSchema>;
export type ClassFormData = z.infer<typeof classSchema>;
export type SubjectFormData = z.infer<typeof subjectSchema>;
export type AttendanceFormData = z.infer<typeof attendanceSchema>;
export type ResultFormData = z.infer<typeof resultSchema>;
export type FeeFormData = z.infer<typeof feeSchema>;
export type MessageFormData = z.infer<typeof messageSchema>;
export type EventFormData = z.infer<typeof eventSchema>;
// Lesson Notes schemas
export const lessonNoteSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  content: z.string().min(1, 'Content is required').max(10000, 'Content must be less than 10000 characters'),
  subject_id: z.string().uuid('Please select a valid subject'),
  class_id: z.string().uuid('Please select a valid class').optional(),
  grade_level_id: z.string().uuid('Please select a valid grade level').optional(),
  academic_year_id: z.string().uuid('Please select a valid academic year'),
  lesson_date: z.string().min(1, 'Lesson date is required'),
  objectives: z.string().max(1000, 'Objectives must be less than 1000 characters').optional(),
  materials: z.string().max(1000, 'Materials must be less than 1000 characters').optional(),
  homework: z.string().max(1000, 'Homework must be less than 1000 characters').optional(),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  is_public: z.boolean().default(false),
});

// Timetable schemas
export const timetableSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200, 'Name must be less than 200 characters'),
  class_id: z.string().uuid('Please select a valid class'),
  academic_year_id: z.string().uuid('Please select a valid academic year'),
  term_id: z.string().uuid().optional(),
  effective_from: z.string().min(1, 'Effective from date is required'),
  effective_to: z.string().optional(),
  status: z.enum(['draft', 'active', 'inactive']).default('draft'),
});

export const timetablePeriodSchema = z.object({
  day_of_week: z.enum(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']),
  period_number: z.number().min(1, 'Period number must be at least 1').max(20, 'Period number must be 20 or less'),
  start_time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Start time must be in HH:MM format'),
  end_time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'End time must be in HH:MM format'),
  subject_id: z.string().uuid().optional(),
  teacher_id: z.string().uuid().optional(),
  room_number: z.string().max(50, 'Room number must be less than 50 characters').optional(),
  period_type: z.enum(['regular', 'break', 'lunch', 'assembly', 'free']).default('regular'),
  notes: z.string().max(500, 'Notes must be less than 500 characters').optional(),
});

// Transportation schemas
export const transportationRouteSchema = z.object({
  route_name: z.string().min(1, 'Route name is required').max(200, 'Route name must be less than 200 characters'),
  route_code: z.string().min(1, 'Route code is required').max(50, 'Route code must be less than 50 characters')
    .regex(/^[A-Z0-9-]+$/, 'Route code can only contain uppercase letters, numbers, and hyphens'),
  description: z.string().max(1000, 'Description must be less than 1000 characters').optional(),
  start_location: z.string().min(1, 'Start location is required').max(200, 'Start location must be less than 200 characters'),
  end_location: z.string().min(1, 'End location is required').max(200, 'End location must be less than 200 characters'),
  estimated_duration: z.number().min(1, 'Duration must be at least 1 minute').max(480, 'Duration must be 480 minutes or less'),
  distance_km: z.number().min(0, 'Distance must be 0 or more').optional(),
  status: z.enum(['active', 'inactive', 'maintenance']).default('active'),
});

export const transportationBusSchema = z.object({
  bus_number: z.string().min(1, 'Bus number is required').max(50, 'Bus number must be less than 50 characters'),
  license_plate: z.string().min(1, 'License plate is required').max(50, 'License plate must be less than 50 characters'),
  capacity: z.number().min(1, 'Capacity must be at least 1').max(100, 'Capacity must be 100 or less'),
  model: z.string().max(100, 'Model must be less than 100 characters').optional(),
  year_manufactured: z.number().min(1990, 'Year must be 1990 or later').max(new Date().getFullYear() + 1, 'Year cannot be in the future').optional(),
  fuel_type: z.enum(['diesel', 'petrol', 'electric', 'hybrid']).default('diesel'),
  insurance_expiry: z.string().optional(),
  gps_device_id: z.string().max(100, 'GPS device ID must be less than 100 characters').optional(),
  status: z.enum(['active', 'maintenance', 'retired']).default('active'),
});

export const transportationDriverSchema = z.object({
  employee_id: z.string().min(1, 'Employee ID is required').max(50, 'Employee ID must be less than 50 characters'),
  first_name: nameSchema,
  last_name: nameSchema,
  phone: phoneSchema,
  email: emailSchema.optional(),
  license_number: z.string().min(1, 'License number is required').max(50, 'License number must be less than 50 characters'),
  license_expiry: z.string().min(1, 'License expiry is required').refine((date) => {
    const expiryDate = new Date(date);
    const today = new Date();
    return expiryDate > today;
  }, 'License expiry date must be in the future'),
  date_of_birth: z.string().min(1, 'Date of birth is required').refine((date) => {
    const birthDate = new Date(date);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    return age >= 18 && age <= 70;
  }, 'Driver age must be between 18 and 70 years'),
  address: z.string().max(500, 'Address must be less than 500 characters').optional(),
  emergency_contact_name: z.string().max(100, 'Emergency contact name must be less than 100 characters').optional(),
  emergency_contact_phone: phoneSchema.optional(),
  hire_date: z.string().min(1, 'Hire date is required'),
  status: z.enum(['active', 'on_leave', 'terminated']).default('active'),
});

// Assessment schemas
export const assessmentSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  description: z.string().max(2000, 'Description must be less than 2000 characters').optional(),
  subject_id: z.string().uuid('Please select a valid subject'),
  class_id: z.string().uuid().optional(),
  grade_level_id: z.string().uuid().optional(),
  academic_year_id: z.string().uuid('Please select a valid academic year'),
  term_id: z.string().uuid().optional(),
  assessment_type: z.enum(['quiz', 'test', 'exam', 'assignment', 'project', 'presentation']),
  total_marks: z.number().min(1, 'Total marks must be at least 1').max(1000, 'Total marks must be 1000 or less'),
  passing_marks: z.number().min(0, 'Passing marks must be 0 or more'),
  duration_minutes: z.number().min(1, 'Duration must be at least 1 minute').max(600, 'Duration must be 600 minutes or less').optional(),
  scheduled_date: z.string().optional(),
  start_time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Start time must be in HH:MM format').optional(),
  end_time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'End time must be in HH:MM format').optional(),
  instructions: z.string().max(5000, 'Instructions must be less than 5000 characters').optional(),
  status: z.enum(['draft', 'published', 'active', 'completed', 'cancelled']).default('draft'),
  is_online: z.boolean().default(false),
}).refine((data) => data.passing_marks <= data.total_marks, {
  message: "Passing marks cannot be greater than total marks",
  path: ["passing_marks"],
});

export const assessmentQuestionSchema = z.object({
  question_number: z.number().min(1, 'Question number must be at least 1').max(100, 'Question number must be 100 or less'),
  question_text: z.string().min(1, 'Question text is required').max(5000, 'Question text must be less than 5000 characters'),
  question_type: z.enum(['multiple_choice', 'true_false', 'short_answer', 'essay', 'fill_blank']),
  marks: z.number().min(0.1, 'Marks must be at least 0.1').max(100, 'Marks must be 100 or less'),
  options: z.array(z.string()).optional(),
  correct_answer: z.string().max(1000, 'Correct answer must be less than 1000 characters').optional(),
  explanation: z.string().max(2000, 'Explanation must be less than 2000 characters').optional(),
});

// Library schemas
export const libraryBookSchema = z.object({
  isbn: z.string().min(10, 'ISBN must be at least 10 characters').max(20, 'ISBN must be less than 20 characters')
    .regex(/^[0-9-X]+$/, 'ISBN can only contain numbers, hyphens, and X').optional(),
  title: z.string().min(1, 'Title is required').max(500, 'Title must be less than 500 characters'),
  author: z.string().min(1, 'Author is required').max(200, 'Author must be less than 200 characters'),
  publisher: z.string().max(200, 'Publisher must be less than 200 characters').optional(),
  publication_year: z.number().min(1000, 'Year must be 1000 or later').max(new Date().getFullYear() + 1, 'Year cannot be in the future').optional(),
  edition: z.string().max(50, 'Edition must be less than 50 characters').optional(),
  category: z.string().min(1, 'Category is required').max(100, 'Category must be less than 100 characters'),
  subcategory: z.string().max(100, 'Subcategory must be less than 100 characters').optional(),
  language: z.string().max(50, 'Language must be less than 50 characters').default('English'),
  pages: z.number().min(1, 'Pages must be at least 1').max(10000, 'Pages must be 10000 or less').optional(),
  description: z.string().max(2000, 'Description must be less than 2000 characters').optional(),
  location_shelf: z.string().max(50, 'Location shelf must be less than 50 characters').optional(),
  total_copies: z.number().min(1, 'Total copies must be at least 1').max(100, 'Total copies must be 100 or less'),
  price: z.number().min(0, 'Price must be 0 or more').optional(),
  acquisition_date: z.string().optional(),
  condition_status: z.enum(['excellent', 'good', 'fair', 'poor', 'damaged']).default('good'),
  status: z.enum(['active', 'inactive', 'lost', 'damaged']).default('active'),
  cover_image_url: z.string().url('Please enter a valid URL').optional(),
});

export const bookIssueSchema = z.object({
  borrower_id: z.string().uuid('Please select a valid borrower'),
  borrower_type: z.enum(['student', 'teacher', 'staff']),
  loan_period_days: z.number().min(1, 'Loan period must be at least 1 day').max(365, 'Loan period must be 365 days or less').default(14),
  notes: z.string().max(500, 'Notes must be less than 500 characters').optional(),
});

export const bookReturnSchema = z.object({
  condition_on_return: z.enum(['excellent', 'good', 'fair', 'poor', 'damaged']).default('good'),
  fine_amount: z.number().min(0, 'Fine amount must be 0 or more').max(1000, 'Fine amount must be 1000 or less').default(0),
  notes: z.string().max(500, 'Notes must be less than 500 characters').optional(),
});

// Parent Portal schemas
export const parentMeetingRequestSchema = z.object({
  teacher_id: z.string().uuid('Please select a valid teacher'),
  student_id: z.string().uuid('Please select a valid student'),
  requested_date: z.string().min(1, 'Requested date is required').refine((date) => {
    const requestedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return requestedDate >= today;
  }, 'Requested date cannot be in the past'),
  requested_time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Requested time must be in HH:MM format'),
  meeting_type: z.enum(['in_person', 'video_call', 'phone_call']).default('in_person'),
  purpose: z.string().min(10, 'Purpose must be at least 10 characters').max(1000, 'Purpose must be less than 1000 characters'),
  duration_minutes: z.number().min(15, 'Duration must be at least 15 minutes').max(120, 'Duration must be 120 minutes or less').default(30),
});

export type HealthRecordFormData = z.infer<typeof healthRecordSchema>;
export type LessonNoteFormData = z.infer<typeof lessonNoteSchema>;
export type TimetableFormData = z.infer<typeof timetableSchema>;
export type TimetablePeriodFormData = z.infer<typeof timetablePeriodSchema>;
export type TransportationRouteFormData = z.infer<typeof transportationRouteSchema>;
export type TransportationBusFormData = z.infer<typeof transportationBusSchema>;
export type TransportationDriverFormData = z.infer<typeof transportationDriverSchema>;
export type AssessmentFormData = z.infer<typeof assessmentSchema>;
export type AssessmentQuestionFormData = z.infer<typeof assessmentQuestionSchema>;
export type LibraryBookFormData = z.infer<typeof libraryBookSchema>;
export type BookIssueFormData = z.infer<typeof bookIssueSchema>;
export type BookReturnFormData = z.infer<typeof bookReturnSchema>;
export type ParentMeetingRequestFormData = z.infer<typeof parentMeetingRequestSchema>;
