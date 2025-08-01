"use client"

import { useState, useEffect } from "react"
import { studentsApi } from "@/src/lib/api"
import { useAuth } from "@/src/contexts/AuthContext"

export default function SimpleStudentTest() {
  const { isAuthenticated, isLoading: authLoading } = useAuth()
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      if (authLoading) return
      
      if (!isAuthenticated) {
        setError('Not authenticated')
        setLoading(false)
        return
      }

      try {
        console.log('Fetching student 3...')
        const response = await studentsApi.getById('3')
        console.log('Response:', response)
        
        if (response.success && response.data) {
          console.log('Setting data...')
          setData(response.data)
          setError(null)
        } else {
          setError('No data received')
        }
      } catch (err: any) {
        console.error('Error:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [isAuthenticated, authLoading])

  console.log('Render state:', { loading, error, hasData: !!data, authLoading, isAuthenticated })

  if (authLoading) return <div>Checking auth...</div>
  if (!isAuthenticated) return <div>Not authenticated</div>
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!data) return <div>No data</div>

  const { student, parents } = data

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Simple Student Test</h1>
      
      {student ? (
        <div className="bg-green-100 p-4 rounded mb-4">
          <h2 className="text-xl font-semibold mb-2">✅ Student Found!</h2>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div><strong>ID:</strong> {student.id}</div>
            <div><strong>Student ID:</strong> {student.student_id}</div>
            <div><strong>Name:</strong> {student.first_name} {student.last_name}</div>
            <div><strong>Full Name:</strong> {student.full_name}</div>
            <div><strong>Email:</strong> {student.email}</div>
            <div><strong>Status:</strong> {student.user_status}</div>
            <div><strong>Class:</strong> {student.class_name}</div>
            <div><strong>Grade:</strong> {student.grade_level}</div>
            <div><strong>Phone:</strong> {student.phone}</div>
            <div><strong>Address:</strong> {student.address}</div>
          </div>
        </div>
      ) : (
        <div className="bg-red-100 p-4 rounded mb-4">
          <h2 className="text-xl font-semibold mb-2">❌ No Student Data</h2>
        </div>
      )}

      {parents && parents.length > 0 ? (
        <div className="bg-blue-100 p-4 rounded mb-4">
          <h2 className="text-xl font-semibold mb-2">Parents ({parents.length})</h2>
          {parents.map((parent: any, index: number) => (
            <div key={index} className="mb-2 p-2 bg-white rounded">
              <div><strong>Name:</strong> {parent.first_name} {parent.last_name}</div>
              <div><strong>Email:</strong> {parent.email}</div>
              <div><strong>Relationship:</strong> {parent.relationship}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-yellow-100 p-4 rounded mb-4">
          <h2 className="text-xl font-semibold mb-2">No Parents Data</h2>
        </div>
      )}

      <div className="bg-gray-100 p-4 rounded">
        <h2 className="text-lg font-semibold mb-2">Raw Data:</h2>
        <pre className="text-xs overflow-auto max-h-96">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </div>
  )
}
