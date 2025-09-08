import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './employeeSlice';
import filterReducer from './filterSlice';

export const store = configureStore({
  reducer: {
    employees: employeeReducer,
    filters: filterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

// Export for use in components
export default store;
