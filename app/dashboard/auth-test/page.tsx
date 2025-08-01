"use client"

import { useAuth } from "@/src/contexts/AuthContext"
import { useEffect, useState } from "react"

export default function AuthTestPage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const [tokenInfo, setTokenInfo] = useState<any>(null)

  useEffect(() => {
    // Check localStorage for token
    const token = localStorage.getItem('auth_token')
    const userData = localStorage.getItem('user_data')
    
    setTokenInfo({
      hasToken: !!token,
      tokenLength: token?.length || 0,
      tokenPreview: token ? token.substring(0, 20) + '...' : null,
      hasUserData: !!userData,
      userData: userData ? JSON.parse(userData) : null
    })
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Authentication Test</h1>
      
      <div className="space-y-4">
        <div className="bg-blue-100 p-4 rounded">
          <h2 className="font-semibold mb-2">Auth Context Status:</h2>
          <p><strong>Is Loading:</strong> {isLoading ? 'Yes' : 'No'}</p>
          <p><strong>Is Authenticated:</strong> {isAuthenticated ? 'Yes' : 'No'}</p>
          <p><strong>User Object:</strong></p>
          <pre className="text-sm bg-white p-2 rounded mt-2">
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>

        <div className="bg-green-100 p-4 rounded">
          <h2 className="font-semibold mb-2">LocalStorage Info:</h2>
          <p><strong>Has Token:</strong> {tokenInfo?.hasToken ? 'Yes' : 'No'}</p>
          <p><strong>Token Length:</strong> {tokenInfo?.tokenLength}</p>
          <p><strong>Token Preview:</strong> {tokenInfo?.tokenPreview}</p>
          <p><strong>Has User Data:</strong> {tokenInfo?.hasUserData ? 'Yes' : 'No'}</p>
          {tokenInfo?.userData && (
            <>
              <p><strong>Stored User Data:</strong></p>
              <pre className="text-sm bg-white p-2 rounded mt-2">
                {JSON.stringify(tokenInfo.userData, null, 2)}
              </pre>
            </>
          )}
        </div>

        <div className="bg-yellow-100 p-4 rounded">
          <h2 className="font-semibold mb-2">API Headers Test:</h2>
          <p>Check browser console for API header information</p>
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
            onClick={() => {
              const token = localStorage.getItem('auth_token')
              console.log('=== API HEADERS TEST ===')
              console.log('Token from localStorage:', token)
              console.log('Authorization header would be:', token ? `Bearer ${token}` : 'No token')
              
              // Test API call headers
              fetch('/api/test', {
                headers: {
                  'Authorization': token ? `Bearer ${token}` : '',
                  'Content-Type': 'application/json'
                }
              }).then(response => {
                console.log('Test API call response status:', response.status)
              }).catch(error => {
                console.log('Test API call error:', error)
              })
            }}
          >
            Test API Headers
          </button>
        </div>
      </div>
    </div>
  )
}
