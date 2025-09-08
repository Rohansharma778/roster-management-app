import React from 'react';

// Slot Component - matches the first Figma design
export function SlotComponent({ time, status, type, onClick }) {
  const getSlotStyle = (status, type) => {
    const baseStyles = "px-3 py-2 rounded text-white text-sm font-medium cursor-pointer transition-all hover:shadow-md";
    
    const statusStyles = {
      // Green slots (available/online)
      'available': 'bg-green-500 hover:bg-green-600',
      'online': 'bg-green-500 hover:bg-green-600',
      
      // Orange slots (offline)
      'offline': 'bg-orange-500 hover:bg-orange-600',
      
      // Blue slots (both/online+offline)
      'both': 'bg-blue-500 hover:bg-blue-600',
      
      // Red slots (booked/unavailable)
      'booked': 'bg-red-500 hover:bg-red-600',
      'unavailable': 'bg-red-500 hover:bg-red-600',
      
      // Gray slots (pending/waiting)
      'pending': 'bg-gray-500 hover:bg-gray-600',
      'waiting': 'bg-gray-400 hover:bg-gray-500',
      
      // Brown slots (blocked)
      'blocked': 'bg-yellow-800 hover:bg-yellow-900'
    };

    return `${baseStyles} ${statusStyles[status] || statusStyles['pending']}`;
  };

  return (
    <div 
      className={getSlotStyle(status, type)}
      onClick={onClick}
    >
      {time}
    </div>
  );
}

// Chevron Navigation Component
export function ChevronNavigation({ onPrevious, onNext, disabled = { prev: false, next: false } }) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onPrevious}
        disabled={disabled.prev}
        className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={onNext}
        disabled={disabled.next}
        className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

// Date Picker Component
export function DatePickerComponent({ selectedDate, onDateChange }) {
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      day: '2-digit',
      month: 'short'
    });
  };

  const getDayOfWeek = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  // Generate a week of dates around the selected date
  const getWeekDates = (centerDate) => {
    const dates = [];
    const start = new Date(centerDate);
    start.setDate(centerDate.getDate() - 3);
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const weekDates = getWeekDates(selectedDate);

  return (
    <div className="flex items-center gap-1 bg-white border border-gray-300 rounded-lg p-1">
      {weekDates.map((date, index) => {
        const isSelected = date.toDateString() === selectedDate.toDateString();
        const isToday = date.toDateString() === new Date().toDateString();
        
        return (
          <button
            key={index}
            onClick={() => onDateChange(date)}
            className={`flex flex-col items-center px-3 py-2 rounded text-sm transition-colors ${
              isSelected 
                ? 'bg-green-600 text-white' 
                : isToday
                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span className="text-xs font-medium">{getDayOfWeek(date)}</span>
            <span className="font-semibold">{date.getDate()}</span>
          </button>
        );
      })}
    </div>
  );
}

// Calendar Date Component
export function CalendarDateComponent({ date, isSelected, isToday, onClick }) {
  return (
    <button
      onClick={() => onClick(date)}
      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
        isSelected
          ? 'bg-green-600 text-white'
          : isToday
          ? 'bg-green-100 text-green-700 hover:bg-green-200'
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      {date.getDate()}
    </button>
  );
}

// Timeline Unit Component
export function TimelineUnit({ time, events = [] }) {
  return (
    <div className="border-b border-gray-100 min-h-[60px] relative">
      <div className="absolute left-0 top-0 w-16 h-full flex items-center justify-center text-xs text-gray-500 border-r border-gray-100">
        {time}
      </div>
      <div className="ml-16 p-2">
        {events.map((event, index) => (
          <div
            key={index}
            className={`${event.color} text-white rounded px-2 py-1 text-xs mb-1`}
          >
            {event.title}
          </div>
        ))}
      </div>
    </div>
  );
}

// Event Component
export function EventComponent({ event, onClick }) {
  const getEventStyle = (type) => {
    const styles = {
      session: 'bg-blue-500 hover:bg-blue-600',
      meeting: 'bg-purple-500 hover:bg-purple-600', 
      appointment: 'bg-green-500 hover:bg-green-600',
      break: 'bg-orange-500 hover:bg-orange-600',
      blocked: 'bg-red-500 hover:bg-red-600'
    };
    return styles[type] || 'bg-gray-500 hover:bg-gray-600';
  };

  return (
    <div
      onClick={onClick}
      className={`${getEventStyle(event.type)} text-white rounded-lg p-3 cursor-pointer transition-all hover:shadow-md`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium uppercase tracking-wide">{event.type}</span>
        <span className="text-xs opacity-75">{event.time}</span>
      </div>
      <div className="font-medium">{event.title}</div>
      {event.description && (
        <div className="text-xs opacity-90 mt-1">{event.description}</div>
      )}
    </div>
  );
}

export default {
  SlotComponent,
  ChevronNavigation,
  DatePickerComponent,
  CalendarDateComponent,
  TimelineUnit,
  EventComponent
};
