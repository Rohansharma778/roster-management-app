// Mock API service - Using the exact data structure from the provided API
// This matches the real API format exactly

export const mockApiService = {
  // Mock employees data matching the real API structure
  employees: [
    {
      "name": "Dr. Aarushi Sharma",
      "provider_usertype": "therapist",
      "is_inhouse": true,
      "id": 101,
      "image": "https://randomuser.me/api/portraits/women/1.jpg",
      "clinic_details": {
        "id": 1,
        "name": "Bandra Clinic"
      },
      "availabilities": [
        {
          "online_slots": ["08:00", "08:15", "08:30"],
          "offline_slots": ["09:00", "09:15"],
          "both_slots": ["10:00", "10:15"],
          "online_booked_slots": ["08:30"],
          "offline_booked_slots": ["09:15"],
          "blocked_slots": [{"slot": "11:00", "reason": "Unwell"}]
        }
      ]
    },
    {
      "name": "Anjana Thattil",
      "provider_usertype": "psychiatrist",
      "is_inhouse": false,
      "id": 102,
      "image": "https://randomuser.me/api/portraits/women/2.jpg",
      "clinic_details": {
        "id": 2,
        "name": "Andheri Clinic"
      },
      "availabilities": [
        {
          "online_slots": ["10:00", "10:15", "10:30"],
          "offline_slots": ["11:00", "11:15"],
          "both_slots": ["12:00"],
          "online_booked_slots": ["10:30"],
          "offline_booked_slots": ["11:15"],
          "blocked_slots": [{"slot": "12:00", "reason": "Other"}]
        }
      ]
    },
    {
      "name": "Dr. Amiya Banerjee",
      "provider_usertype": "psychiatrist",
      "is_inhouse": true,
      "id": 103,
      "image": "https://randomuser.me/api/portraits/men/3.jpg",
      "clinic_details": {
        "id": 3,
        "name": "Juhu Clinic"
      },
      "availabilities": [
        {
          "online_slots": ["14:00", "14:15", "14:30"],
          "offline_slots": ["15:00", "15:15"],
          "both_slots": ["16:00"],
          "online_booked_slots": ["14:30"],
          "offline_booked_slots": ["15:15"],
          "blocked_slots": [{"slot": "17:00", "reason": "Other"}]
        }
      ]
    }
  ],

  // Simulate API delay
  delay: (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms)),

  // Mock API methods matching the real API
  async getEmployees(filters = {}) {
    await this.delay(800);
    
    let filteredEmployees = [...this.employees];
    
    // Apply filters based on the new data structure
    if (filters.provider_usertype && filters.provider_usertype.length > 0) {
      filteredEmployees = filteredEmployees.filter(emp => 
        filters.provider_usertype.includes(emp.provider_usertype)
      );
    }
    
    if (filters.is_inhouse !== undefined) {
      filteredEmployees = filteredEmployees.filter(emp => 
        emp.is_inhouse === filters.is_inhouse
      );
    }
    
    if (filters.clinic_id && filters.clinic_id.length > 0) {
      filteredEmployees = filteredEmployees.filter(emp => 
        filters.clinic_id.includes(emp.clinic_details.id)
      );
    }
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredEmployees = filteredEmployees.filter(emp =>
        emp.name.toLowerCase().includes(searchTerm) ||
        emp.provider_usertype.toLowerCase().includes(searchTerm) ||
        emp.clinic_details.name.toLowerCase().includes(searchTerm)
      );
    }
    
    return {
      data: filteredEmployees,
      total: filteredEmployees.length,
      page: filters.page || 1,
      limit: filters.limit || 10
    };
  },

  async getEmployeeById(id) {
    await this.delay(500);
    const employee = this.employees.find(emp => emp.id === parseInt(id));
    if (!employee) {
      throw new Error('Employee not found');
    }
    return { data: employee };
  },

  async updateEmployeeStatus(id, availability) {
    await this.delay(400);
    const employee = this.employees.find(emp => emp.id === parseInt(id));
    if (!employee) {
      throw new Error('Employee not found');
    }
    // Update availability
    employee.availabilities[0] = { ...employee.availabilities[0], ...availability };
    return { data: { id: parseInt(id), availabilities: employee.availabilities } };
  },

  async getFilterOptions() {
    await this.delay(300);
    return { 
      data: {
        provider_usertype: [
          { value: "therapist", label: "Therapist", count: 1 },
          { value: "psychiatrist", label: "Psychiatrist", count: 2 }
        ],
        clinic_details: [
          { value: 1, label: "Bandra Clinic", count: 1 },
          { value: 2, label: "Andheri Clinic", count: 1 },
          { value: 3, label: "Juhu Clinic", count: 1 }
        ],
        is_inhouse: [
          { value: true, label: "In House", count: 2 },
          { value: false, label: "External", count: 1 }
        ]
      }
    };
  }
};

export default mockApiService;
