// app/services/api.ts
import axios from 'axios';
import { Enrollment } from '@/app/types/student.type';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token if needed
api.interceptors.request.use(
  (config) => {
    console.log('📡 API Request:', config.method?.toUpperCase(), config.url);
    
    // Get token from localStorage if exists
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response.config.url, response.status);
    return response;
  },
  (error) => {
    console.error('❌ Response Error:', error.response?.status, error.response?.data);
    
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Student Dashboard API calls
export const studentAPI = {
  // Get student enrollments
  getEnrollments: async (studentId: number): Promise<Enrollment[]> => {
    try {
      console.log('🎯 Fetching enrollments for student ID:', studentId);
      console.log('🌐 API URL:', `${api.defaults.baseURL}/enrollment/student/${studentId}`);
      
      const response = await api.get(`/enrollment/student/${studentId}`);
      
      console.log('📦 Raw response data:', response.data);
      
      // Handle different response formats
      if (Array.isArray(response.data)) {
        console.log('✅ Response is array with', response.data.length, 'items');
        return response.data;
      } else if (response.data && typeof response.data === 'object') {
        console.log('✅ Response is single object, converting to array');
        return [response.data];
      }
      
      console.log('⚠️ No data found, returning empty array');
      return [];
    } catch (error: any) {
      console.error('❌ Error in getEnrollments:', error);
      console.error('❌ Error response:', error.response?.data);
      console.error('❌ Error status:', error.response?.status);
      console.error('❌ Error message:', error.message);
      throw error;
    }
  },

  // Get single enrollment details
  getEnrollmentDetails: async (enrollmentId: number) => {
    const response = await api.get(`/enrollment/${enrollmentId}`);
    return response.data;
  },

  // Future: Get course details
  getCourseDetails: async (courseId: number) => {
    const response = await api.get(`/course/${courseId}`);
    return response.data;
  },
};

export default api;