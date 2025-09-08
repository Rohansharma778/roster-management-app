// Custom hook for filter operations
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { 
  updateFilter, 
  clearAllFilters,
  setProviderUsertypeFilter,
  setInhouseFilter,
  setClinicDetailsFilter,
  setSearchFilter
} from '../store/filterSlice';

export const useFilters = () => {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.filters);

  // Update a specific filter
  const updateSingleFilter = useCallback((category, value) => {
    dispatch(updateFilter({ category, value }));
  }, [dispatch]);

  // Clear all filters
  const clearFilters = useCallback(() => {
    dispatch(clearAllFilters());
  }, [dispatch]);

  // Specific filter setters for better type safety
  const setProviderUsertype = useCallback((provider_usertype) => {
    dispatch(setProviderUsertypeFilter(provider_usertype));
  }, [dispatch]);

  const setInhouse = useCallback((is_inhouse) => {
    dispatch(setInhouseFilter(is_inhouse));
  }, [dispatch]);

  const setClinicDetails = useCallback((clinic_details) => {
    dispatch(setClinicDetailsFilter(clinic_details));
  }, [dispatch]);

  const setSearch = useCallback((search) => {
    dispatch(setSearchFilter(search));
  }, [dispatch]);

  // Calculate active filter count
  const getActiveFilterCount = useCallback(() => {
    return Object.values(filters).reduce((count, filterValue) => {
      if (Array.isArray(filterValue) && filterValue.length > 0) {
        return count + filterValue.length;
      }
      return count;
    }, 0);
  }, [filters]);

  // Check if any filters are active
  const hasActiveFilters = useCallback(() => {
    return getActiveFilterCount() > 0;
  }, [getActiveFilterCount]);

  return {
    // Current filters
    filters,
    
    // Filter actions
    updateFilter: updateSingleFilter,
    clearFilters,
    setProviderUsertype,
    setInhouse,
    setClinicDetails,
    setSearch,
    
    // Utility functions
    activeFilterCount: getActiveFilterCount(),
    hasActiveFilters: hasActiveFilters()
  };
};

export default useFilters;
