import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on app start
    const token = localStorage.getItem('token')
    if (token) {
      checkAuthStatus()
    } else {
      setLoading(false)
    }
  }, [])

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('token')
      console.log('Checking auth status, token:', token ? 'exists' : 'none')
      
      if (!token) {
        setLoading(false)
        return
      }

      // Set default headers for all requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      
      // Check if token is valid by making a request
      const response = await axios.get('/api/user/profile')
      console.log('Auth check successful, user:', response.data.user)
      setUser(response.data.user)
    } catch (error) {
      console.error('Auth check failed:', error)
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
    } finally {
      setLoading(false)
    }
  }

  const login = async (username, password) => {
    try {
      console.log('Attempting login for username:', username)
      const response = await axios.post('/api/login', { username, password })
      const { token, user } = response.data
      
      console.log('Login successful, token:', token ? 'received' : 'none', 'user:', user)
      
      localStorage.setItem('token', token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setUser(user)
      

      
      return { success: true }
    } catch (error) {
      console.error('Login failed:', error)
      return { 
        success: false, 
        error: error.response?.data?.error || 'Login failed' 
      }
    }
  }

  const register = async (username, email, password) => {
    try {
      const response = await axios.post('/api/register', { 
        username, 
        email, 
        password 
      })
      
      return { success: true, message: 'Registration successful' }
    } catch (error) {
      console.error('Registration failed:', error)
      return { 
        success: false, 
        error: error.response?.data?.message || 'Registration failed' 
      }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization']
    setUser(null)
  }

  const scanUrl = async (url) => {
    try {
      const token = localStorage.getItem('token')
      console.log('Scanning URL:', url, 'Token exists:', !!token)
      
      // Always allow scanning, with or without token
      const headers = {}
      if (token) {
        headers.Authorization = `Bearer ${token}`
      }
      
      // Make the scan request
      const response = await axios.post('/api/scan', { url }, { headers })
      console.log('Scan API response:', response.data)
      return { success: true, data: response.data }
    } catch (error) {
      console.error('Scan failed:', error)
      return { 
        success: false, 
        error: error.response?.data?.error || 'Scan failed' 
      }
    }
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    scanUrl,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
