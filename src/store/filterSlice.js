import { createSlice } from '@reduxjs/toolkit';

// Initial state matching the new API structure
const initialState = {
  provider_usertype: [],
  is_inhouse: [],
  clinic_details: [],
  search: ''
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setProviderUsertypeFilter: (state, action) => {
      state.provider_usertype = action.payload;
    },
    setInhouseFilter: (state, action) => {
      state.is_inhouse = action.payload;
    },
    setClinicDetailsFilter: (state, action) => {
      state.clinic_details = action.payload;
    },
    setSearchFilter: (state, action) => {
      state.search = action.payload;
    },
    updateFilter: (state, action) => {
      const { category, value } = action.payload;
      if (Array.isArray(state[category])) {
        const index = state[category].indexOf(value);
        if (index > -1) {
          state[category].splice(index, 1);
        } else {
          state[category].push(value);
        }
      } else {
        state[category] = value;
      }
    },
    clearAllFilters: (state) => {
      state.provider_usertype = [];
      state.is_inhouse = [];
      state.clinic_details = [];
      state.search = '';
    },
    clearFilterCategory: (state, action) => {
      const category = action.payload;
      if (Array.isArray(state[category])) {
        state[category] = [];
      }
    }
  }
});

export const {
  setProviderUsertypeFilter,
  setInhouseFilter,
  setClinicDetailsFilter,
  setSearchFilter,
  updateFilter,
  clearAllFilters,
  clearFilterCategory
} = filterSlice.actions;

export default filterSlice.reducer;
