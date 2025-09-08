import axios from 'axios';
import mockApiService from './mockApi';

// Configuration - SET YOUR REAL API URL HERE
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://your-api-endpoint.com/api';
const USE_MOCK_API = process.env.REACT_APP_USE_MOCK_API === 'true' || false; // Changed to FALSE for real API

console.log('🔗 API Configuration:');
console.log('📡 API URL:', API_BASE_URL);
console.log('🧪 Using Mock API:', USE_MOCK_API);

// Configure axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Helper function to handle API calls with mock fallback
const apiCall = async (realApiCall, mockApiCall, ...args) => {
  if (USE_MOCK_API) {
    console.log('Using mock API');
    return await mockApiCall(...args);
  }
  
  try {
    const response = await realApiCall(...args);
    return response.data;
  } catch (error) {
    console.warn('Real API failed, falling back to mock API:', error.message);
    return await mockApiCall(...args);
  }
};

// Employee API endpoints
export const employeeAPI = {
  // Get all employees with optional filters - REAL API CALL
  getEmployees: async (filters = {}) => {
    const realApiCall = async () => {
      const params = new URLSearchParams();
      
      // Add filter parameters based on the real API structure
      Object.entries(filters).forEach(([key, value]) => {
        if (Array.isArray(value) && value.length > 0) {
          params.append(key, value.join(','));
        } else if (value && typeof value === 'string') {
          params.append(key, value);
        } else if (typeof value === 'boolean') {
          params.append(key, value);
        }
      });
      
      const url = `/providers${params.toString() ? `?${params}` : ''}`;
      console.log('🌐 Making REAL API call to:', API_BASE_URL + url);
      
      return await api.get(url);
    };
    
    return apiCall(realApiCall, mockApiService.getEmployees, filters);
  },

  // Get employee by ID - REAL API CALL
  getEmployeeById: async (id) => {
    const realApiCall = async () => {
      console.log('🌐 Making REAL API call to get employee:', id);
      return await api.get(`/providers/${id}`);
    };
    return apiCall(realApiCall, mockApiService.getEmployeeById, id);
  },

  // Update employee availability - REAL API CALL
  updateEmployeeStatus: async (id, availability) => {
    const realApiCall = async () => {
      console.log('🌐 Making REAL API call to update employee:', id);
      return await api.patch(`/providers/${id}/availability`, availability);
    };
    return apiCall(realApiCall, mockApiService.updateEmployeeStatus, id, availability);
  },

  // Get filter options - REAL API CALL
  getFilterOptions: async () => {
    const realApiCall = async () => {
      console.log('🌐 Making REAL API call to get filters');
      return await api.get('/providers/filters');
    };
    return apiCall(realApiCall, mockApiService.getFilterOptions);
  }
};

// Schedule API endpoints
export const scheduleAPI = {
  // Get schedules for a specific date range
  getSchedules: async (startDate, endDate, employeeId = null) => {
    const realApiCall = async () => {
      let url = `/schedules?start_date=${startDate}&end_date=${endDate}`;
      if (employeeId) {
        url += `&employee_id=${employeeId}`;
      }
      return await api.get(url);
    };
    
    const mockCall = async () => {
      // Mock implementation - filter schedules by date range and employee
      let filteredSchedules = mockApiService.schedules.filter(schedule => {
        const scheduleDate = new Date(schedule.date);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return scheduleDate >= start && scheduleDate <= end;
      });
      
      if (employeeId) {
        filteredSchedules = filteredSchedules.filter(schedule => 
          schedule.employeeId === parseInt(employeeId)
        );
      }
      
      return { data: filteredSchedules };
    };
    
    return apiCall(realApiCall, mockCall);
  },

  // Create new schedule
  createSchedule: async (scheduleData) => {
    const realApiCall = async () => await api.post('/schedules', scheduleData);
    return apiCall(realApiCall, mockApiService.createSchedule, scheduleData);
  },

  // Update schedule
  updateSchedule: async (id, scheduleData) => {
    const realApiCall = async () => await api.put(`/schedules/${id}`, scheduleData);
    return apiCall(realApiCall, mockApiService.updateSchedule, id, scheduleData);
  },

  // Delete schedule
  deleteSchedule: async (id) => {
    const realApiCall = async () => await api.delete(`/schedules/${id}`);
    const mockCall = async () => {
      // Mock delete - remove from mock data
      const index = mockApiService.schedules.findIndex(sch => sch.id === parseInt(id));
      if (index !== -1) {
        mockApiService.schedules.splice(index, 1);
      }
      return { data: { id: parseInt(id), deleted: true } };
    };
    return apiCall(realApiCall, mockCall, id);
  }
};

// Filter API endpoints
export const filterAPI = {
  // Get filter options (services, centres, etc.)
  getFilterOptions: async () => {
    const realApiCall = async () => await api.get('/filters/options');
    return apiCall(realApiCall, mockApiService.getFilterOptions);
  },

  // Get employee statistics for filters
  getEmployeeStats: async () => {
    const realApiCall = async () => await api.get('/employees/stats');
    const mockCall = async () => {
      // Mock stats calculation
      const employees = mockApiService.employees;
      const stats = {
        total: employees.length,
        available: employees.filter(emp => emp.status === 'available').length,
        busy: employees.filter(emp => emp.status === 'busy').length,
        offline: employees.filter(emp => emp.status === 'offline').length,
        byService: {},
        byCentre: {},
        byType: {}
      };
      
      employees.forEach(emp => {
        // Count by service
        stats.byService[emp.service] = (stats.byService[emp.service] || 0) + 1;
        // Count by centre
        stats.byCentre[emp.centre] = (stats.byCentre[emp.centre] || 0) + 1;
        // Count by type
        stats.byType[emp.type] = (stats.byType[emp.type] || 0) + 1;
      });
      
      return { data: stats };
    };
    
    return apiCall(realApiCall, mockCall);
  }
};

// Export default api instance for custom calls
export default api;
