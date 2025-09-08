import { useState, useEffect } from "react";
import Sidebar from "./components/sidebar.js";
import Calendar from "./components/Calendar.js";
import LoadingSpinner from "./components/LoadingSpinner.js";
import LandingPage from "./components/LandingPage.js";
import { DarkModeProvider } from './contexts/DarkModeContext.js';
import useEmployees from './hooks/useEmployees';

function AppContent() {
  const {
    filteredEmployees: employees,
    loading,
    error,
    loadEmployees
  } = useEmployees();
  
  const [showLanding, setShowLanding] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);

  // Load employees on component mount only if not showing landing
  useEffect(() => {
    if (!showLanding) {
      loadEmployees();
    }
  }, [loadEmployees, showLanding]);

  const handleStartManagement = () => {
    setShowLanding(false);
    // Load employees when entering the app
    loadEmployees();
  };

  const handleBackToDirectory = () => {
    setShowCalendar(false);
    setSelectedEmployee(null);
  };

  const handleDateSelect = (date, employee) => {
    console.log(`Selected date ${date} for employee:`, employee?.name);
    // Handle date selection logic here
  };

  return (
    <>
      {showLanding ? (
        <LandingPage onStart={handleStartManagement} />
      ) : (
        <div className="h-screen bg-gray-100 flex overflow-hidden">
          {/* Mobile sidebar overlay */}
          {sidebarOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
          
          {/* Sidebar */}
          <div className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 h-full transition-transform duration-300 ease-in-out lg:transition-none`}>
            <Sidebar 
              setSidebarOpen={setSidebarOpen}
            />
          </div>

      {/* Main content */}
      <main className="flex-1 w-0 h-full flex flex-col">
        {/* Mobile header */}
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold text-gray-900">
            {showCalendar ? `${selectedEmployee?.name} Schedule` : 'Roster Management System'}
          </h1>
          <div className="w-10" />
        </div>
        
        {/* Content Area */}
        <div className="p-6 flex-1 overflow-auto">
          {showCalendar ? (
            <div>
              {/* Back Button */}
              <div className="mb-6">
                <button
                  onClick={handleBackToDirectory}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Employee List
                </button>
              </div>
              
              {/* Calendar Component */}
              <Calendar 
                selectedEmployee={selectedEmployee}
                onDateSelect={handleDateSelect}
              />
            </div>
          ) : (
            <div>
              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex">
                    <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">Error loading employees</h3>
                      <p className="text-sm text-red-700 mt-1">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Loading Spinner */}
              {loading && (
                <div className="flex justify-center py-12">
                  <LoadingSpinner />
                </div>
              )}

              {/* Management Layout - Date Header + Employee Rows */}
              {!loading && employees.length > 0 && (
                <Calendar 
                  selectedEmployee={selectedEmployee}
                  onDateSelect={handleDateSelect}
                  isManagementView={true}
                  employees={employees}
                />
              )}

              {/* No Results */}
              {!loading && employees.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No employees found</h3>
                  <p className="text-gray-500">Try adjusting your filters to see more results.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
        </div>
      )}
    </>
  );
}

function App() {
  return (
    <DarkModeProvider>
      <AppContent />
    </DarkModeProvider>
  );
}

export default App;
