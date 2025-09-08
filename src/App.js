import { useState } from "react";
import Sidebar from "./components/sidebar.js";
import Home from "./pages/home.js";
import Dashboard from "./pages/dashboard.js";
import Schedules from "./pages/schedules.js";
import ProviderCalendar from "./pages/providerCalendar.js";
import DesignSystem from "./pages/designSystem.js";

function App() {
  const [currentPage, setCurrentPage] = useState('Providers');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Providers':
        return <Home />;
      case 'Schedules':
        return <Schedules />;
      case 'Calendar':
        return <ProviderCalendar />;
      case 'Design System':
        return <DesignSystem />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
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
      } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out lg:transition-none`}>
        <Sidebar 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage}
          setSidebarOpen={setSidebarOpen}
        />
      </div>

      {/* Main content */}
      <main className="flex-1 w-0">
        {/* Mobile header */}
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold text-gray-900">{currentPage}</h1>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>
        
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
