import { useState } from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';
import { calendarDarkModeStyles } from '../styles/darkModeStyles';

const Calendar = ({ selectedEmployee, onDateSelect, isManagementView = false, employees = [] }) => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [currentWeek, setCurrentWeek] = useState(0);
  const [selectedDate, setSelectedDate] = useState(21);
  const [selectedMonth, setSelectedMonth] = useState(8);
  const [selectedYear, setSelectedYear] = useState(2024);
  const [timeSlotOffsets, setTimeSlotOffsets] = useState({}); // Per-employee offsets
  const [viewMode, setViewMode] = useState('slots');
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  // Employee data with colors
  const employeeList = [
    { id: 1, name: 'Pratishtha Trivedi Mirza', color: 'blue', bgColor: 'bg-blue-100', textColor: 'text-blue-800', borderColor: 'border-blue-200' },
    { id: 2, name: 'John Smith', color: 'purple', bgColor: 'bg-purple-100', textColor: 'text-purple-800', borderColor: 'border-purple-200' },
    { id: 3, name: 'Emily Johnson', color: 'green', bgColor: 'bg-green-100', textColor: 'text-green-800', borderColor: 'border-green-200' },
    { id: 4, name: 'Michael Brown', color: 'pink', bgColor: 'bg-pink-100', textColor: 'text-pink-800', borderColor: 'border-pink-200' }
  ];

  // Toggle employee selection for calendar view
  const toggleEmployeeSelection = (employee) => {
    setSelectedEmployees(prev => {
      const isSelected = prev.find(emp => emp.id === employee.id);
      if (isSelected) {
        return prev.filter(emp => emp.id !== employee.id);
      } else {
        return [...prev, employee];
      }
    });
  };

  // Generate calendar dates for current week
  const generateCalendarDates = () => {
    const dates = [];
    const baseDate = new Date(2024, 8, 21);
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(baseDate);
      date.setDate(baseDate.getDate() + i);
      dates.push({
        date: date.getDate(),
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        fullDate: date,
        isToday: date.getDate() === 21
      });
    }
    return dates;
  };

  // Generate time slots (1-hour intervals)
  const generateTimeSlots = () => {
    const times = [];
    for (let hour = 8; hour <= 20; hour++) {
      times.push({
        hour: hour,
        display: `${hour.toString().padStart(2, '0')}:00`,
        format12: hour > 12 ? `${hour - 12}:00 PM` : `${hour}:00 AM`
      });
    }
    return times;
  };

  // Get employee calendar data
  const getEmployeeCalendarData = (employeeId, date, hour) => {
    if (date !== 21) return null;

    const scheduleData = {
      1: { 8: 'blocked', 9: 'available', 10: 'booked', 11: 'available', 12: 'unavailable', 13: 'available', 14: 'booked', 15: 'available', 16: 'available', 17: 'unavailable', 18: 'available', 19: 'blocked', 20: 'available' },
      2: { 8: 'available', 9: 'booked', 10: 'available', 11: 'booked', 12: 'available', 13: 'blocked', 14: 'available', 15: 'booked', 16: 'blocked', 17: 'available', 18: 'unavailable', 19: 'available', 20: 'booked' },
      3: { 8: 'booked', 9: 'available', 10: 'blocked', 11: 'available', 12: 'unavailable', 13: 'booked', 14: 'available', 15: 'blocked', 16: 'available', 17: 'booked', 18: 'available', 19: 'available', 20: 'unavailable' },
      4: { 8: 'available', 9: 'blocked', 10: 'available', 11: 'unavailable', 12: 'booked', 13: 'available', 14: 'blocked', 15: 'available', 16: 'booked', 17: 'available', 18: 'blocked', 19: 'booked', 20: 'available' }
    };

    return scheduleData[employeeId]?.[hour] || null;
  };

  // Get cell style for calendar
  const getCalendarCellStyle = (date, hour) => {
    const employeeData = selectedEmployees.map(emp => ({
      ...emp,
      status: getEmployeeCalendarData(emp.id, date, hour)
    })).filter(emp => emp.status);

    if (employeeData.length === 0) {
      return darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50 border border-gray-200';
    }

    const primaryEmployee = employeeData[0];
    const colorMap = {
      blue: { available: 'bg-blue-200', booked: 'bg-blue-500 text-white', blocked: 'bg-blue-800 text-white', unavailable: 'bg-blue-100' },
      purple: { available: 'bg-purple-200', booked: 'bg-purple-500 text-white', blocked: 'bg-purple-800 text-white', unavailable: 'bg-purple-100' },
      green: { available: 'bg-green-200', booked: 'bg-green-500 text-white', blocked: 'bg-green-800 text-white', unavailable: 'bg-green-100' },
      pink: { available: 'bg-pink-200', booked: 'bg-pink-500 text-white', blocked: 'bg-pink-800 text-white', unavailable: 'bg-pink-100' }
    };

    const borderColor = darkMode ? 'border-gray-700' : 'border-gray-200';
    return colorMap[primaryEmployee.color][primaryEmployee.status] + ` border ${borderColor}`;
  };

  // Generate week dates
  const generateWeekDates = (weekOffset = 0) => {
    const baseDate = new Date(2024, 8, 21);
    const dayOfWeek = baseDate.getDay();
    const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    
    const startDate = new Date(baseDate);
    startDate.setDate(baseDate.getDate() + daysToMonday + (weekOffset * 7));

    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      weekDates.push({
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        date: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
        fullDate: date,
        isToday: date.getDate() === 21 && date.getMonth() === 8 && date.getFullYear() === 2024
      });
    }
    return weekDates;
  };

  const weekDates = generateWeekDates(currentWeek);

  // Navigation handlers
  const handlePrevWeek = () => {
    setCurrentWeek(prev => prev - 1);
    const newWeekDates = generateWeekDates(currentWeek - 1);
    if (newWeekDates.length > 0) {
      const firstDate = newWeekDates[0];
      setSelectedDate(firstDate.date);
      setSelectedMonth(firstDate.month);
      setSelectedYear(firstDate.year);
    }
  };

  const handleNextWeek = () => {
    setCurrentWeek(prev => prev + 1);
    const newWeekDates = generateWeekDates(currentWeek + 1);
    if (newWeekDates.length > 0) {
      const firstDate = newWeekDates[0];
      setSelectedDate(firstDate.date);
      setSelectedMonth(firstDate.month);
      setSelectedYear(firstDate.year);
    }
  };

  const handleDateClick = (dateInfo) => {
    setSelectedDate(dateInfo.date);
    setSelectedMonth(dateInfo.month);
    setSelectedYear(dateInfo.year);
    if (onDateSelect) {
      onDateSelect(dateInfo.date, selectedEmployee);
    }
  };

  // Per-employee time slot navigation
  const handlePrevTimeSlots = (employeeId) => {
    setTimeSlotOffsets(prev => ({
      ...prev,
      [employeeId]: Math.max(0, (prev[employeeId] || 0) - 2)
    }));
  };

  const handleNextTimeSlots = (employeeId) => {
    setTimeSlotOffsets(prev => ({
      ...prev,
      [employeeId]: Math.min(14, (prev[employeeId] || 0) + 2)
    }));
  };

  // Get time slot offset for specific employee
  const getEmployeeTimeSlotOffset = (employeeId) => {
    return timeSlotOffsets[employeeId] || 0;
  };

  // Generate time slots for employee (simplified)
  const getEmployeeTimeSlots = (employee, selectedDate, selectedMonth, selectedYear) => {
    const allHours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
    const minutes = ['00', '15', '30', '45'];
    const employeeOffset = getEmployeeTimeSlotOffset(employee.id);
    const visibleHours = allHours.slice(employeeOffset, employeeOffset + 10);
    
    const hasScheduleData = selectedDate === 21 && selectedMonth === 8 && selectedYear === 2024;
    
    const employeeSchedules = {
      1: {
        '08:00': 'blocked', '08:15': 'blocked', '08:30': 'blocked', '08:45': 'blocked',
        '09:00': 'unavailable', '09:15': 'unavailable', '09:30': 'unavailable', '09:45': 'unavailable',
        '10:00': 'online', '10:15': 'online', '10:30': 'online-booked', '10:45': 'online',
        '11:00': 'online-booked', '11:15': 'online-booked', '11:30': 'online', '11:45': 'online',
        '12:00': 'unavailable', '12:15': 'unavailable', '12:30': 'unavailable', '12:45': 'unavailable'
      },
      2: {
        '08:00': 'unavailable', '08:15': 'unavailable', '08:30': 'unavailable', '08:45': 'unavailable',
        '09:00': 'online', '09:15': 'online', '09:30': 'online', '09:45': 'online',
        '10:00': 'online-booked', '10:15': 'online', '10:30': 'online', '10:45': 'online-booked'
      },
      3: {
        '08:00': 'online', '08:15': 'online', '08:30': 'online-booked', '08:45': 'online',
        '09:00': 'online', '09:15': 'online', '09:30': 'online', '09:45': 'online'
      }
    };

    const timeSlotMatrix = [];
    for (let minuteIndex = 0; minuteIndex < 4; minuteIndex++) {
      const row = [];
      for (let hourIndex = 0; hourIndex < visibleHours.length; hourIndex++) {
        const hour = visibleHours[hourIndex];
        const minute = minutes[minuteIndex];
        const timeKey = `${hour.toString().padStart(2, '0')}:${minute}`;
        const status = hasScheduleData ? (employeeSchedules[employee.id]?.[timeKey] || 'unavailable') : 'unavailable';
        
        row.push({
          hour,
          minute,
          time: timeKey,
          status
        });
      }
      timeSlotMatrix.push(row);
    }
    
    return timeSlotMatrix;
  };

  // Get button style for slots
  const getSlotButtonStyle = (slot) => {
    switch (slot.status) {
      case 'online':
        return 'bg-green-500 text-white hover:bg-green-600 cursor-pointer';
      case 'offline':
        return 'bg-orange-500 text-white hover:bg-orange-600 cursor-pointer';
      case 'online-offline':
        return 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer';
      case 'online-booked':
        return 'bg-blue-800 text-white cursor-not-allowed';
      case 'offline-booked':
        return 'bg-orange-800 text-white cursor-not-allowed';
      case 'blocked':
        return 'bg-red-500 text-white cursor-not-allowed';
      case 'unavailable':
      default:
        return 'bg-gray-300 text-gray-600 cursor-not-allowed';
    }
  };

  // Calendar View
  if (viewMode === 'calendar') {
    const calendarDates = generateCalendarDates();
    const timeSlots = generateTimeSlots();

    return (
      <div className={`fixed inset-0 z-50 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="flex h-full">
          {/* Calendar Sidebar - Employee Selection */}
          <div className={`w-80 border-r flex flex-col ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Select Employees</h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search employees..."
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
                <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-2">
                {employeeList.map((employee) => {
                  const isSelected = selectedEmployees.find(emp => emp.id === employee.id);
                  return (
                    <div
                      key={employee.id}
                      onClick={() => toggleEmployeeSelection(employee)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                        isSelected 
                          ? `${employee.bgColor} ${employee.borderColor} border-2` 
                          : darkMode 
                            ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' 
                            : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`font-medium ${
                          isSelected 
                            ? employee.textColor 
                            : darkMode 
                              ? 'text-gray-200' 
                              : 'text-gray-700'
                        }`}>
                          {employee.name}
                        </span>
                        {isSelected && (
                          <svg className={`h-5 w-5 ${employee.textColor}`} fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Calendar Area */}
          <div className="flex-1 flex flex-col">
            {/* Calendar Header */}
            <div className={`border-b p-4 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className="flex items-center justify-between">
                <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Calendar View</h1>
                
                <div className="flex items-center gap-4">
                  {/* View Toggle Buttons */}
                  <div className={`p-1 rounded-full flex shadow-sm ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <button
                      onClick={() => setViewMode('slots')}
                      className={`flex items-center justify-center w-14 h-10 rounded-full transition-all duration-200 ${
                        viewMode === 'slots'
                          ? darkMode ? 'bg-gray-600 shadow-sm text-white' : 'bg-white shadow-sm text-gray-800'
                          : darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-700'
                      }`}
                      title="Slots View"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setViewMode('calendar')}
                      className={`flex items-center justify-center w-14 h-10 rounded-full transition-all duration-200 ${
                        viewMode === 'calendar'
                          ? darkMode ? 'bg-gray-600 shadow-sm text-white' : 'bg-white shadow-sm text-gray-800'
                          : darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-700'
                      }`}
                      title="Calendar View"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>

                  {/* Dark Mode Toggle */}
                  <button
                    onClick={toggleDarkMode}
                    className={`flex items-center justify-center w-12 h-10 rounded-lg transition-all duration-200 border ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-yellow-400 hover:bg-gray-600' 
                        : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                    }`}
                    title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                  >
                    {darkMode ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              
              {selectedEmployees.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Selected:</span>
                  {selectedEmployees.map(emp => (
                    <span key={emp.id} className={`px-2 py-1 rounded text-xs ${emp.bgColor} ${emp.textColor}`}>
                      {emp.name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Calendar Grid */}
            <div className="flex-1 overflow-auto">
              <div className="min-w-full">
                {/* Date Headers */}
                <div className={`sticky top-0 border-b grid grid-cols-8 gap-0 ${
                  darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                  <div className={`p-3 font-semibold border-r ${
                    darkMode ? 'text-gray-200 border-gray-700' : 'text-gray-700 border-gray-200'
                  }`}>Time</div>
                  {calendarDates.map((dateObj, index) => (
                    <div key={index} className={`p-3 text-center border-r last:border-r-0 ${
                      darkMode ? 'border-gray-700' : 'border-gray-200'
                    }`}>
                      <div className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>{dateObj.day}</div>
                      <div className={`text-sm ${
                        dateObj.isToday ? 'text-blue-400 font-bold' : darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {dateObj.date}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Time Slots Grid */}
                {timeSlots.map((timeSlot) => (
                  <div key={timeSlot.hour} className={`grid grid-cols-8 gap-0 border-b ${
                    darkMode ? 'border-gray-700' : 'border-gray-200'
                  }`}>
                    <div className={`p-3 font-medium border-r ${
                      darkMode ? 'text-gray-200 border-gray-700 bg-gray-800' : 'text-gray-700 border-gray-200 bg-gray-50'
                    }`}>
                      {timeSlot.format12}
                    </div>
                    {calendarDates.map((dateObj, dateIndex) => (
                      <div
                        key={`${timeSlot.hour}-${dateIndex}`}
                        className={`h-16 p-1 border-r last:border-r-0 cursor-pointer transition-colors ${
                          darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-100'
                        } ${getCalendarCellStyle(dateObj.date, timeSlot.hour)}`}
                        onClick={() => console.log(`Clicked: ${dateObj.date} at ${timeSlot.format12}`)}
                      >
                        <div className="h-full w-full rounded flex items-center justify-center text-xs">
                          {selectedEmployees.length > 0 && getEmployeeCalendarData(selectedEmployees[0]?.id, dateObj.date, timeSlot.hour) && (
                            <span className="font-medium">
                              {getEmployeeCalendarData(selectedEmployees[0]?.id, dateObj.date, timeSlot.hour)}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Slots View - Management Layout Only
  return (
    <div className={darkMode ? 'bg-gray-900' : 'bg-white'}>
      {/* Header with Toggle Buttons */}
      <div className={`border-b p-4 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className={`text-lg font-medium mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Showing full schedules for {selectedDate} {new Date(selectedYear, selectedMonth).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
            </h2>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Showing slots in the 8 am to 12 am window.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* View Toggle Button */}
            <div className={`p-1 rounded-full flex shadow-sm ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
              <button
                onClick={() => setViewMode('slots')}
                className={`flex items-center justify-center w-14 h-10 rounded-full transition-all duration-200 ${
                  viewMode === 'slots'
                    ? darkMode ? 'bg-gray-600 shadow-sm text-white' : 'bg-white shadow-sm text-gray-800'
                    : darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-700'
                }`}
                title="Slots View"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle cx="6" cy="7" r="1.5" fill="currentColor"/>
                  <rect x="10" y="6" width="8" height="2" rx="1" fill="currentColor"/>
                  <circle cx="6" cy="12" r="1.5" fill="currentColor"/>
                  <rect x="10" y="11" width="8" height="2" rx="1" fill="currentColor"/>
                  <circle cx="6" cy="17" r="1.5" fill="currentColor"/>
                  <rect x="10" y="16" width="8" height="2" rx="1" fill="currentColor"/>
                </svg>
              </button>
              
              <button
                onClick={() => setViewMode('calendar')}
                className={`flex items-center justify-center w-14 h-10 rounded-full transition-all duration-200 ${
                  viewMode === 'calendar'
                    ? darkMode ? 'bg-green-600 shadow-sm text-white' : 'bg-green-500 shadow-sm text-white'
                    : darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-700'
                }`}
                title="Calendar View"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="15" rx="2" strokeWidth="2"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 2v4M8 2v4M3 10h18"/>
                  <circle cx="8" cy="14" r="1" fill="currentColor"/>
                  <circle cx="12" cy="14" r="1" fill="currentColor"/>
                  <circle cx="16" cy="14" r="1" fill="currentColor"/>
                </svg>
              </button>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`flex items-center justify-center w-12 h-10 rounded-lg transition-all duration-200 border ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-yellow-400 hover:bg-gray-600' 
                  : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className={`p-6 ${darkMode ? 'bg-gray-900' : ''}`}>
        {/* Date Navigation Bar */}
        <div className={`mb-6 p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handlePrevWeek}
              className={`p-2 rounded-lg transition-colors ${
                darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
              }`}
            >
              <svg className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex gap-2">
              {weekDates.map((dateInfo) => (
                <button
                  key={`${dateInfo.date}-${dateInfo.month}-${dateInfo.year}`}
                  onClick={() => handleDateClick(dateInfo)}
                  className={`px-4 py-2 rounded-lg text-center transition-all duration-200 min-w-[80px] ${
                    selectedDate === dateInfo.date && selectedMonth === dateInfo.month && selectedYear === dateInfo.year
                      ? 'bg-green-600 text-white shadow-md'
                      : dateInfo.isToday
                      ? darkMode 
                        ? 'bg-green-800 text-green-200 border border-green-600'
                        : 'bg-green-100 text-green-800 border border-green-300'
                      : darkMode
                        ? 'bg-gray-700 text-gray-200 hover:bg-gray-600 border border-gray-600'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <div className="text-xs font-medium opacity-75">{dateInfo.day}</div>
                  <div className="text-lg font-bold mt-1">{dateInfo.date}</div>
                </button>
              ))}
            </div>

            <button
              onClick={handleNextWeek}
              className={`p-2 rounded-lg transition-colors ${
                darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
              }`}
            >
              <svg className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* INFO Section */}
        <div className={`mb-6 p-3 border rounded-lg ${
          darkMode ? 'bg-blue-900 border-blue-700' : 'bg-blue-50 border-blue-200'
        }`}>
          <h3 className={`text-sm font-medium mb-1 ${darkMode ? 'text-blue-200' : 'text-blue-900'}`}>INFO</h3>
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span className={darkMode ? 'text-blue-300' : 'text-gray-600'}>Online</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-orange-500 rounded"></div>
                <span className={darkMode ? 'text-blue-300' : 'text-gray-600'}>Offline</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span className={darkMode ? 'text-blue-300' : 'text-gray-600'}>Online+Offline</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-blue-800 rounded"></div>
                <span className={darkMode ? 'text-blue-300' : 'text-gray-600'}>Online Booked</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-orange-800 rounded"></div>
                <span className={darkMode ? 'text-blue-300' : 'text-gray-600'}>Offline Booked</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span className={darkMode ? 'text-blue-300' : 'text-gray-600'}>Blocked</span>
              </div>
            </div>
          </div>
        </div>

        {/* Employee Slots Layout - Only show first 2 employees */}
        <div className="space-y-4">
          {employees.slice(0, 2).map((employee) => {
            const employeeTimeSlots = getEmployeeTimeSlots(employee, selectedDate, selectedMonth, selectedYear);
            
            return (
              <div key={employee.id} className="flex gap-6">
                {/* Employee Card */}
                <div className="w-64">
                  <div className={`border-2 border-red-300 rounded-lg p-4 h-[200px] flex flex-col justify-center ${
                    darkMode ? 'bg-gray-800' : 'bg-white'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center text-lg">
                        {employee.avatar}
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{employee.name}</h3>
                        <div className="flex items-center gap-3 text-xs text-gray-600 mt-1">
                          <span className="flex items-center gap-1">
                            <span>📍</span>
                            <span>5</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <span>🎥</span>
                            <span>5</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Time Slots */}
                <div className="flex-1">
                  <div className={`border border-gray-300 rounded-lg p-4 h-[200px] overflow-hidden ${
                    darkMode ? 'bg-gray-800' : 'bg-white'
                  }`}>
                    <div className="relative h-full">
                      <button
                        onClick={() => handlePrevTimeSlots(employee.id)}
                        disabled={getEmployeeTimeSlotOffset(employee.id) === 0}
                        className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-6 h-12 shadow-lg transition-all duration-200 flex items-center justify-center rounded ${
                          getEmployeeTimeSlotOffset(employee.id) === 0 
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                            : darkMode
                              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600'
                              : 'bg-white text-gray-600 hover:bg-gray-50 hover:shadow-xl border border-gray-200'
                        }`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>

                      <button
                        onClick={() => handleNextTimeSlots(employee.id)}
                        disabled={getEmployeeTimeSlotOffset(employee.id) >= 14}
                        className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-6 h-12 shadow-lg transition-all duration-200 flex items-center justify-center rounded ${
                          getEmployeeTimeSlotOffset(employee.id) >= 14 
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                            : darkMode
                              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600'
                              : 'bg-white text-gray-600 hover:bg-gray-50 hover:shadow-xl border border-gray-200'
                        }`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    
                      <div className="px-8 h-full flex flex-col justify-center">
                        <div className="grid grid-cols-11 gap-1 mb-2">
                          <div className={`text-xs font-medium text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Time</div>
                          {employeeTimeSlots[0]?.map((slot, colIndex) => (
                            <div key={colIndex} className={`text-xs font-medium text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              {slot.hour}:00
                            </div>
                          ))}
                        </div>
                        
                        <div className="space-y-1">
                          {employeeTimeSlots.map((row, rowIndex) => (
                            <div key={rowIndex} className="grid grid-cols-11 gap-1">
                              <div className={`text-xs font-medium text-center flex items-center justify-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                :{row[0]?.minute || '00'}
                              </div>
                              {row.map((slot, colIndex) => (
                                <button
                                  key={colIndex}
                                  disabled={slot.status === 'unavailable'}
                                  className={`px-2 py-2 text-xs font-medium rounded transition-colors ${getSlotButtonStyle(slot)}`}
                                  title={slot.time}
                                >
                                  {slot.time}
                                </button>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
