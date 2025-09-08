import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { employeeAPI, scheduleAPI } from '../services/api';

// Async thunk for fetching employees with filters
export const fetchEmployees = createAsyncThunk(
  'employees/fetchEmployees',
  async (filters = {}, { rejectWithValue }) => {
    try {
      // Use the real API endpoint
      const data = await employeeAPI.getEmployees(filters);
      return data;
    } catch (error) {
      // Fallback to mock data if API fails
      console.warn('API failed, using fallback data:', error.message);
      return getMockEmployees();
    }
  }
);

// Async thunk for updating employee status
export const updateEmployeeStatus = createAsyncThunk(
  'employees/updateStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const data = await employeeAPI.updateEmployeeStatus(id, status);
      return { id, status: data.status };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update status');
    }
  }
);

// Async thunk for fetching employee availability
export const fetchEmployeeAvailability = createAsyncThunk(
  'employees/fetchAvailability',
  async ({ id, date }, { rejectWithValue }) => {
    try {
      const data = await employeeAPI.getEmployeeAvailability(id, date);
      return { id, date, availability: data };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch availability');
    }
  }
);

// Async thunk for fetching schedules
export const fetchSchedules = createAsyncThunk(
  'employees/fetchSchedules',
  async ({ startDate, endDate, employeeId }, { rejectWithValue }) => {
    try {
      const data = await scheduleAPI.getSchedules(startDate, endDate, employeeId);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch schedules');
    }
  }
);

// Mock data fallback function
const getMockEmployees = () => [
  {
    id: 1,
    name: "Dr. Pratistha Trivedi Mirza",
    avatar: "👩‍⚕️",
    service: "therapist",
    specialization: "Clinical Psychology",
    type: "hybrid",
    centre: "juhu",
    status: "Available",
    email: "pratistha.mirza@clinic.com",
    phone: "+91-9876543210",
    experience: "8 years",
    rating: 4.8,
    totalSessions: 1240,
    currentLoad: 75,
    languages: ["English", "Hindi", "Gujarati"],
    availability: {
      monday: ["09:00", "17:00"],
      tuesday: ["09:00", "17:00"],
      wednesday: ["09:00", "17:00"],
      thursday: ["09:00", "17:00"],
      friday: ["09:00", "15:00"]
    }
  },
  {
    id: 2,
    name: "Dr. Arjun Sharma",
    avatar: "👨‍⚕️",
    service: "psychiatrist",
    specialization: "Adult Psychiatry",
    type: "online",
    centre: "andheri",
    status: "Available",
    email: "arjun.sharma@clinic.com",
    phone: "+91-9876543211",
    experience: "12 years",
    rating: 4.9,
    totalSessions: 2100,
    currentLoad: 85,
    languages: ["English", "Hindi", "Marathi"],
    availability: {
      monday: ["10:00", "18:00"],
      tuesday: ["10:00", "18:00"],
      wednesday: ["10:00", "18:00"],
      thursday: ["10:00", "18:00"],
      friday: ["10:00", "16:00"]
    }
  },
  {
    id: 3,
    name: "Dr. Meera Patel",
    avatar: "👩‍⚕️",
    service: "therapist",
    specialization: "Family Therapy",
    type: "offline",
    centre: "bangalore",
    status: "Available",
    email: "meera.patel@clinic.com",
    phone: "+91-9876543212",
    experience: "6 years",
    rating: 4.7,
    totalSessions: 950,
    currentLoad: 65,
    languages: ["English", "Hindi", "Kannada"],
    availability: {
      monday: ["09:30", "17:30"],
      tuesday: ["09:30", "17:30"],
      wednesday: ["09:30", "17:30"],
      thursday: ["09:30", "17:30"],
      friday: ["09:30", "15:30"]
    }
  }
];

const employeeSlice = createSlice({
  name: 'employees',
  initialState: {
    list: [],
    filteredList: [],
    loading: false,
    error: null,
    searchTerm: '',
    schedules: [],
    availabilities: {}
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    filterEmployees: (state, action) => {
      const { service, types, centre } = action.payload;
      const searchTerm = state.searchTerm.toLowerCase();
      
      state.filteredList = state.list.filter(employee => {
        const serviceMatch = service.length === 0 || service.includes(employee.service);
        const typeMatch = types.length === 0 || types.includes(employee.type);
        const centreMatch = centre.length === 0 || centre.includes(employee.centre);
        const searchMatch = searchTerm === '' || 
          employee.name.toLowerCase().includes(searchTerm) ||
          employee.specialization.toLowerCase().includes(searchTerm) ||
          employee.email.toLowerCase().includes(searchTerm);
        
        return serviceMatch && typeMatch && centreMatch && searchMatch;
      });
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch employees
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        state.filteredList = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update employee status
      .addCase(updateEmployeeStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateEmployeeStatus.fulfilled, (state, action) => {
        state.loading = false;
        const { id, status } = action.payload;
        const employee = state.list.find(emp => emp.id === id);
        if (employee) {
          employee.status = status;
        }
        const filteredEmployee = state.filteredList.find(emp => emp.id === id);
        if (filteredEmployee) {
          filteredEmployee.status = status;
        }
      })
      .addCase(updateEmployeeStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch employee availability
      .addCase(fetchEmployeeAvailability.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployeeAvailability.fulfilled, (state, action) => {
        state.loading = false;
        const { id, date, availability } = action.payload;
        state.availabilities[`${id}-${date}`] = availability;
      })
      .addCase(fetchEmployeeAvailability.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch schedules
      .addCase(fetchSchedules.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSchedules.fulfilled, (state, action) => {
        state.loading = false;
        state.schedules = action.payload;
      })
      .addCase(fetchSchedules.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSearchTerm, clearError, filterEmployees } = employeeSlice.actions;
export default employeeSlice.reducer;