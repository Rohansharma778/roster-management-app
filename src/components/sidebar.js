export default function Sidebar({ currentPage, setCurrentPage, setSidebarOpen }) {
  const menuItems = [
    { name: 'Dashboard', icon: '📊' },
    { name: 'Providers', icon: '👥' },
    { name: 'Calendar', icon: '📅' },
    { name: 'Schedules', icon: '⏱️' },
    { name: 'Design System', icon: '🎨' }
  ];

  const handlePageChange = (pageName) => {
    setCurrentPage(pageName);
    if (setSidebarOpen) {
      setSidebarOpen(false);
    }
  };

  return (
    <aside className="w-64 bg-white shadow-lg h-screen p-6 flex flex-col border-r border-gray-200">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-blue-600">Roster</h1>
        <p className="text-sm text-gray-500 mt-1">Management System</p>
      </div>

      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => handlePageChange(item.name)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
              currentPage === item.name
                ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                : 'text-gray-700 hover:bg-gray-50 hover:text-blue-500'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="font-medium">{item.name}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto">
        <div className="border-t pt-4">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
              A
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">admin@roster.com</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}