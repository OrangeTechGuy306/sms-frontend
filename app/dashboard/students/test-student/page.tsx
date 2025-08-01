"use client"

import { useState, useEffect } from "react"
import { studentsApi } from "@/src/lib/api"
import { useAuth } from "@/src/contexts/AuthContext"

export default function TestStudentPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth()
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setLoading(true)
        setError(null)

        console.log('=== TEST STUDENT FETCH ===');
        console.log('Auth status:', { isAuthenticated, authLoading, user });
        console.log('Token in localStorage:', localStorage.getItem('auth_token'));
        
        if (!isAuthenticated) {
          setError('Not authenticated');
          return;
        }

        const response = await studentsApi.getById('1')
        console.log('Raw API response:', response);
        
        if (response.success && response.data) {
          console.log('Setting data:', response.data);
          setData(response.data);
        } else {
          console.log('API call failed or no data');
          setError('Failed to fetch student data');
        }
      } catch (err: any) {
        console.error('Error fetching student:', err);
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false)
      }
    }

    if (!authLoading) {
      fetchStudent()
    }
  }, [isAuthenticated, authLoading, user])

  if (authLoading) {
    return <div>Checking authentication...</div>
  }

  if (!isAuthenticated) {
    return <div>Not authenticated. Please login.</div>
  }

  if (loading) {
    return <div>Loading student data...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!data) {
    return <div>No data received</div>
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Test Student Data</h1>
      
      <div className="bg-gray-100 p-4 rounded mb-4">
        <h2 className="text-lg font-semibold mb-2">Raw Data Structure:</h2>
        <pre className="text-sm overflow-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>

      {data.student && (
        <div className="bg-blue-100 p-4 rounded mb-4">
          <h2 className="text-lg font-semibold mb-2">Student Object:</h2>
          <pre className="text-sm overflow-auto">
            {JSON.stringify(data.student, null, 2)}
          </pre>
        </div>
      )}

      {data.parents && (
        <div className="bg-green-100 p-4 rounded mb-4">
          <h2 className="text-lg font-semibold mb-2">Parents Array:</h2>
          <pre className="text-sm overflow-auto">
            {JSON.stringify(data.parents, null, 2)}
          </pre>
        </div>
      )}

      {data.student && (
        <div className="bg-yellow-100 p-4 rounded">
          <h2 className="text-lg font-semibold mb-2">Rendered Student Info:</h2>
          <p><strong>ID:</strong> {data.student.id}</p>
          <p><strong>Student ID:</strong> {data.student.student_id}</p>
          <p><strong>First Name:</strong> {data.student.first_name}</p>
          <p><strong>Last Name:</strong> {data.student.last_name}</p>
          <p><strong>Full Name:</strong> {data.student.full_name}</p>
          <p><strong>Email:</strong> {data.student.email}</p>
          <p><strong>Status:</strong> {data.student.user_status}</p>
          <p><strong>Class:</strong> {data.student.class_name}</p>
          <p><strong>Grade Level:</strong> {data.student.grade_level}</p>
        </div>
      )}
    </div>
  )
}
