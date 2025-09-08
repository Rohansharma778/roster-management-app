// Custom hook for employee-related operations
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { 
  fetchEmployees, 
  updateEmployeeStatus, 
  fetchEmployeeAvailability,
  setSearchTerm,
  filterEmployees 
} from '../store/employeeSlice';

export const useEmployees = () => {
  const dispatch = useDispatch();
  
  const {
    list: employees,
    filteredList,
    loading,
    error,
    searchTerm,
    schedules,
    availabilities
  } = useSelector(state => state.employees);
  
  const filters = useSelector(state => state.filters);

  // Fetch employees with optional filters
  const loadEmployees = useCallback((filters = {}) => {
    dispatch(fetchEmployees(filters));
  }, [dispatch]);

  // Update employee status
  const updateStatus = useCallback((id, status) => {
    dispatch(updateEmployeeStatus({ id, status }));
  }, [dispatch]);

  // Fetch employee availability for a specific date
  const loadAvailability = useCallback((id, date) => {
    dispatch(fetchEmployeeAvailability({ id, date }));
  }, [dispatch]);

  // Update search term
  const updateSearchTerm = useCallback((term) => {
    dispatch(setSearchTerm(term));
  }, [dispatch]);

  // Apply filters
  const applyFilters = useCallback(() => {
    dispatch(filterEmployees(filters));
  }, [dispatch, filters]);

  // Auto-apply filters when they change
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  return {
    // Data
    employees,
    filteredEmployees: filteredList,
    schedules,
    availabilities,
    
    // State
    loading,
    error,
    searchTerm,
    
    // Actions
    loadEmployees,
    updateStatus,
    loadAvailability,
    updateSearchTerm,
    applyFilters
  };
};

export default useEmployees;
