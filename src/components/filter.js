import { useState } from 'react';

export default function Filters() {
  const [filters, setFilters] = useState({
    service: '',
    type: '',
    center: '',
    search: ''
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Filter Providers</h2>
        <p className="text-sm text-gray-600">Use filters to find the right healthcare providers</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
          <select 
            value={filters.service}
            onChange={(e) => handleFilterChange('service', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value="">All Services</option>
            <option value="therapy">Therapy</option>
            <option value="counseling">Counseling</option>
            <option value="psychiatry">Psychiatry</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Provider Type</label>
          <select 
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value="">All Types</option>
            <option value="therapist">Therapist</option>
            <option value="psychiatrist">Psychiatrist</option>
            <option value="counselor">Counselor</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Center</label>
          <select 
            value={filters.center}
            onChange={(e) => handleFilterChange('center', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value="">All Centers</option>
            <option value="bandra">Bandra Clinic</option>
            <option value="andheri">Andheri Clinic</option>
            <option value="juhu">Juhu Clinic</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
          <div className="relative">
            <input
              type="text"
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              placeholder="Search by name..."
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400">🔍</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          <span className="font-medium">3 providers</span> found
        </div>
        <button
          onClick={() => setFilters({ service: '', type: '', center: '', search: '' })}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          Clear all filters
        </button>
      </div>
    </div>
  );
}
