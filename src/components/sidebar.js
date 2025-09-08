import { useState } from 'react';
import useFilters from '../hooks/useFilters';
import { sidebarDarkModeStyles } from '../styles/darkModeStyles';

export default function Sidebar({ setSidebarOpen }) {
  const {
    filters,
    updateFilter,
    clearFilters,
    activeFilterCount,
    setSearch
  } = useFilters();
  
  const [searchTerm, setSearchTerm] = useState(filters.search || '');
  
  const [expandedSections, setExpandedSections] = useState({
    provider_usertype: true,
    is_inhouse: true,
    clinic_details: true
  });

  const handleFilterChange = (category, value) => {
    updateFilter(category, value);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setSearch(value);
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const filterOptions = {
    provider_usertype: [
      { value: 'therapist', label: 'Therapist' },
      { value: 'psychiatrist', label: 'Psychiatrist' }
    ],
    is_inhouse: [
      { value: true, label: 'In-House' },
      { value: false, label: 'External' }
    ],
    clinic_details: [
      { value: 1, label: 'Bandra Clinic' },
      { value: 2, label: 'Andheri Clinic' },
      { value: 3, label: 'Juhu Clinic' }
    ]
  };

  // Get filter statistics  
  const getFilterStats = (category, value) => {
    // This would be better fetched from Redux or API
    // For now, return static counts
    return 0;
  };

  return (
    <aside className={`w-64 sm:w-72 lg:w-64 shadow-lg min-h-screen h-full p-4 sm:p-6 flex flex-col overflow-y-auto ${sidebarDarkModeStyles.container}`}>
      {/* Mobile Close Button */}
      <div className="lg:hidden flex justify-end mb-4">
        <button
          onClick={() => setSidebarOpen(false)}
          className={`p-2 rounded-lg transition-colors ${sidebarDarkModeStyles.sectionHeader}`}
          aria-label="Close sidebar"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Header */}
      <div className="mb-4 sm:mb-6 flex-shrink-0">
        <h1 className={`text-lg sm:text-xl font-bold flex items-center gap-2 ${sidebarDarkModeStyles.header}`}>
        Provider calender
        </h1>
        <p className={`text-xs sm:text-sm mt-1 ${sidebarDarkModeStyles.subtext}`}>Refine your search</p>
      </div>

      {/* Search Input */}
      <div className="mb-4 sm:mb-6 flex-shrink-0">
        <div className="relative">
          <input
            type="text"
            placeholder="Search providers by name..."
            value={searchTerm}
            onChange={handleSearchChange}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg text-sm transition-colors touch-manipulation ${
              'border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-400'
            }`}
            aria-label="Search providers by name"
          />
          <svg 
            className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Clear All Button */}
      <div className="mb-4 sm:mb-6 flex-shrink-0">
        <button
          onClick={clearFilters}
          disabled={activeFilterCount === 0}
          className={`w-full px-4 py-3 text-sm border rounded-lg transition-colors touch-manipulation ${
            activeFilterCount > 0 
              ? 'text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-900/20' 
              : 'text-gray-400 border-gray-200 cursor-not-allowed dark:text-gray-600 dark:border-gray-700'
          }`}
          aria-label={`Clear all ${activeFilterCount} filters`}
        >
          Clear All Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
        </button>
      </div>

      {/* Filter Sections */}
      <div className="flex-1 space-y-3 sm:space-y-4">
        {Object.entries(filterOptions).map(([category, options]) => (
          <div key={category} className="border border-gray-200 rounded-lg">
            {/* Section Header */}
            <button
              onClick={() => toggleSection(category)}
              className={`w-full px-4 py-4 flex items-center justify-between transition-colors rounded-t-lg touch-manipulation ${sidebarDarkModeStyles.sectionHeader}`}
              aria-expanded={expandedSections[category]}
              aria-label={`Toggle ${category} filters`}
            >
              <div className="flex items-center gap-2">
                <span className={`font-medium capitalize text-sm sm:text-base ${sidebarDarkModeStyles.sectionTitle}`}>{category}</span>
                {filters[category]?.length > 0 && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full text-xs font-medium">
                    {filters[category].length}
                  </span>
                )}
              </div>
              <span className={`transform transition-transform ${expandedSections[category] ? 'rotate-180' : ''} ${sidebarDarkModeStyles.sectionTitle}`}>
                ▼
              </span>
            </button>

            {/* Section Content */}
            {expandedSections[category] && (
              <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
                {options.map((option) => {
                  const count = getFilterStats(category, option.value);
                  return (
                    <label
                      key={option.value}
                      className={`flex items-center justify-between cursor-pointer p-3 rounded-lg transition-colors touch-manipulation ${sidebarDarkModeStyles.filterItem}`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={filters[category]?.includes(option.value) || false}
                          onChange={() => handleFilterChange(category, option.value)}
                          className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:focus:ring-blue-400 touch-manipulation"
                          aria-label={`Filter by ${option.label}`}
                        />
                        <span className={`text-sm font-medium ${sidebarDarkModeStyles.filterLabel}`}>{option.label}</span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${sidebarDarkModeStyles.filterCount}`}>
                        {count}
                      </span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Active Filters Summary */}
      <div className={`mt-4 sm:mt-6 pt-4 border-t ${sidebarDarkModeStyles.activeFilters}`}>
        <div className="flex items-center justify-between text-sm mb-3">
          <span className={sidebarDarkModeStyles.subtext}>Active Filters:</span>
          <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full font-medium">
            {activeFilterCount}
          </span>
        </div>
        
        {/* Quick Filter Summary */}
        {activeFilterCount > 0 && (
          <div className="space-y-2">
            {Object.entries(filters).map(([category, values]) => 
              Array.isArray(values) && values.length > 0 && (
                <div key={category} className="text-xs">
                  <span className={`font-medium capitalize ${sidebarDarkModeStyles.filterLabel}`}>{category}:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {values.map(value => (
                      <span key={value} className="px-2 py-1 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 rounded text-xs">
                        {value}
                      </span>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
