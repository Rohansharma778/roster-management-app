import React, { useState } from 'react';

export default function ProviderCalendarView() {
  const [selectedProviders, setSelectedProviders] = useState([
    'Pratishtha Trivedi Mirza',
    'Pratishtha Trivedi Mirza',
    'Pratishtha Trivedi Mirza',
    'Pratishtha Trivedi Mirza',
    'Pratishtha Trivedi Mirza'
  ]);
  const [selectedDate, setSelectedDate] = useState(new Date(2024, 5, 18)); // June 18, 2024
  const [viewMode, setViewMode] = useState('week');

  const providers = [
    {
      id: 1,
      name: 'Pratishtha Trivedi Mirza',
      image: 'https://randomuser.me/api/portraits/women/1.jpg',
      specialty: 'Therapist',
      clinic: 'Bandra Clinic'
    }
  ];

  // Generate week dates starting from Monday
  const getWeekDates = (date) => {
    const week = [];
    const startDate = new Date(date);
    const day = startDate.getDay();
    const diff = startDate.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Monday start
    startDate.setDate(diff);

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      week.push(currentDate);
    }
    return week;
  };

  // Generate hourly time slots
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour <= 17; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
    }
    return slots;
  };

  // Sample events for the calendar
  const getEvents = (dayIndex, hour) => {
    const events = {
      // Tuesday (index 1)
      '1-9': { type: 'meeting', title: 'MRT Meeting', color: 'bg-purple-400', hours: 2 },
      '1-14': { type: 'appointment', title: '#24397', color: 'bg-orange-500', hours: 1 },
      
      // Wednesday (index 2)  
      '2-8': { type: 'appointment', title: '#24397', color: 'bg-blue-500', hours: 1 },
      '2-10': { type: 'break', title: 'Break', color: 'bg-green-600', hours: 3 },
      '2-15': { type: 'appointment', title: '#24397', color: 'bg-purple-500', hours: 1 },
      
      // Thursday (index 3)
      '3-9': { type: 'appointment', title: '#24397', color: 'bg-blue-500', hours: 1 },
      '3-16': { type: 'appointment', title: '#24397', color: 'bg-green-600', hours: 1 }
    };
    
    return events[`${dayIndex}-${hour}`];
  };

  const weekDates = getWeekDates(selectedDate);
  const timeSlots = generateTimeSlots();

  const formatDate = (date) => {
    return date.getDate();
  };

  const formatDayName = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const removeProvider = (index) => {
    const newProviders = [...selectedProviders];
    newProviders.splice(index, 1);
    setSelectedProviders(newProviders);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded">
              ←
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Provider Calendar</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 text-sm border rounded">📋</button>
              <button className="px-3 py-1 text-sm border rounded">📅</button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-screen">
        {/* Left Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          {/* Date Navigation */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <button className="p-2 hover:bg-gray-100 rounded">←</button>
              <span className="font-semibold">18-22 Jun 2024</span>
              <button className="p-2 hover:bg-gray-100 rounded">→</button>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>🔒 Session Event</span>
              <span>📅 Calendar Event</span>
              <select className="border border-gray-300 rounded px-2 py-1 text-sm ml-auto">
                <option>Enter Text</option>
              </select>
            </div>
          </div>

          {/* Selected Providers List */}
          <div className="p-6 flex-1">
            <div className="space-y-3">
              {selectedProviders.map((providerName, index) => {
                const provider = providers.find(p => p.name === providerName);
                return (
                  <div key={index} className="flex items-center gap-3">
                    <button
                      onClick={() => removeProvider(index)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      ✕
                    </button>
                    <span className="text-sm text-gray-700">{providerName}</span>
                  </div>
                );
              })}
            </div>

            {selectedProviders.length === 0 && (
              <p className="text-gray-500 text-sm">No providers selected</p>
            )}

            <button className="text-orange-500 text-sm mt-4 hover:underline">
              Clear All
            </button>
          </div>
        </div>

        {/* Main Calendar Content */}
        <div className="flex-1 overflow-auto bg-white">
          {/* Calendar Grid */}
          <div className="p-4">
            {/* Week Header */}
            <div className="grid grid-cols-8 gap-0 border border-gray-200 rounded-lg overflow-hidden">
              {/* Time column header */}
              <div className="bg-gray-50 p-4 border-r border-gray-200 text-center text-sm font-medium text-gray-600">
                Time
              </div>
              
              {/* Day headers */}
              {weekDates.map((date, index) => (
                <div key={index} className="bg-gray-50 p-4 border-r border-gray-200 text-center">
                  <div className={`text-sm font-medium ${
                    date.getDate() === 19 ? 'bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto' : 'text-gray-900'
                  }`}>
                    {formatDate(date)}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {formatDayName(date)}
                  </div>
                </div>
              ))}
            </div>

            {/* Calendar Body */}
            <div className="grid grid-cols-8 gap-0 border-l border-r border-b border-gray-200">
              {timeSlots.map((time, timeIndex) => (
                <React.Fragment key={timeIndex}>
                  {/* Time column */}
                  <div className="p-2 border-r border-b border-gray-100 text-xs text-gray-500 text-center bg-gray-50">
                    {time}
                  </div>
                  
                  {/* Day columns */}
                  {weekDates.map((date, dayIndex) => {
                    const hour = parseInt(time.split(':')[0]);
                    const event = getEvents(dayIndex, hour);
                    const hasEvent = !!event;
                    
                    return (
                      <div
                        key={`${timeIndex}-${dayIndex}`}
                        className={`border-r border-b border-gray-100 min-h-[60px] relative ${
                          hasEvent ? '' : 'hover:bg-gray-50'
                        }`}
                      >
                        {hasEvent && (
                          <div
                            className={`absolute inset-1 ${event.color} text-white rounded p-1 text-xs`}
                            style={{
                              height: event.hours ? `${event.hours * 60 - 8}px` : '52px',
                              zIndex: 10
                            }}
                          >
                            <div className="font-medium">{event.title}</div>
                            {event.type === 'meeting' && (
                              <div className="text-xs opacity-90 mt-1">Meeting</div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
