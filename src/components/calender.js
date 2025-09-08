import React, { useState } from "react";
import { EventComponent, TimelineUnit, ChevronNavigation } from "./figmaComponents.js";

export default function CalendarModal({ provider, onClose }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('week');

  if (!provider) return null;

  // Generate week dates
  const getWeekDates = (date) => {
    const week = [];
    const startDate = new Date(date);
    const day = startDate.getDay();
    const diff = startDate.getDate() - day;
    startDate.setDate(diff);

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      week.push(currentDate);
    }
    return week;
  };

  // Generate time slots
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour <= 18; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(time);
      }
    }
    return slots;
  };

  const weekDates = getWeekDates(selectedDate);
  const timeSlots = generateTimeSlots();

  const getSlotInfo = (time, dayIndex) => {
    const availability = provider.availabilities?.[0] || {};
    
    // Check if slot is online
    if (availability.online_slots?.includes(time)) {
      const isBooked = availability.online_booked_slots?.includes(time);
      return {
        type: 'online',
        status: isBooked ? 'booked' : 'available',
        color: isBooked ? 'bg-gray-300' : 'bg-green-500',
        text: isBooked ? 'Booked' : 'Online'
      };
    }
    
    // Check if slot is offline
    if (availability.offline_slots?.includes(time)) {
      const isBooked = availability.offline_booked_slots?.includes(time);
      return {
        type: 'offline',
        status: isBooked ? 'booked' : 'available',
        color: isBooked ? 'bg-gray-300' : 'bg-orange-500',
        text: isBooked ? 'Booked' : 'Offline'
      };
    }
    
    // Check if slot is both
    if (availability.both_slots?.includes(time)) {
      return {
        type: 'both',
        status: 'available',
        color: 'bg-blue-500',
        text: 'Online+Offline'
      };
    }
    
    // Check if slot is blocked
    const blockedSlot = availability.blocked_slots?.find(slot => slot.slot === time);
    if (blockedSlot) {
      return {
        type: 'blocked',
        status: 'blocked',
        color: 'bg-yellow-800',
        text: blockedSlot.reason || 'Blocked'
      };
    }
    
    return null;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-7xl max-h-[95vh] overflow-hidden flex">
        
        {/* Left Sidebar - Provider Info & Filters */}
        <div className="w-80 bg-gray-50 border-r border-gray-200 flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Provider Calendar</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              >
                <span className="text-xl">✕</span>
              </button>
            </div>
            
            {/* Date Navigation */}
            <div className="flex items-center gap-3 mb-4">
              <button 
                onClick={() => {
                  const newDate = new Date(selectedDate);
                  newDate.setDate(newDate.getDate() - 7);
                  setSelectedDate(newDate);
                }}
                className="p-2 hover:bg-gray-200 rounded"
              >
                ←
              </button>
              <span className="font-medium">
                {selectedDate.toLocaleDateString('en-US', { 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </span>
              <button 
                onClick={() => {
                  const newDate = new Date(selectedDate);
                  newDate.setDate(newDate.getDate() + 7);
                  setSelectedDate(newDate);
                }}
                className="p-2 hover:bg-gray-200 rounded"
              >
                →
              </button>
            </div>
          </div>

          {/* Provider List */}
          <div className="p-6 flex-1">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Showing full schedules for:</h3>
            
            <div className="bg-white rounded-lg border p-4 mb-4">
              <div className="flex items-center gap-3">
                <img
                  src={provider.image}
                  alt={provider.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-medium text-gray-900">{provider.name}</h4>
                  <p className="text-sm text-gray-600 capitalize">{provider.provider_usertype}</p>
                  <p className="text-xs text-gray-500">{provider.clinic_details?.name}</p>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Enter Text</label>
                <select className="w-full p-2 border border-gray-300 rounded-md text-sm">
                  <option>Enter Text</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Enter Text</label>
                <select className="w-full p-2 border border-gray-300 rounded-md text-sm">
                  <option>Enter Text</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Enter Text</label>
                <select className="w-full p-2 border border-gray-300 rounded-md text-sm">
                  <option>Enter Text</option>
                </select>
              </div>
              <button className="w-full bg-orange-500 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-orange-600 transition-colors">
                Apply
              </button>
            </div>

            {/* Search */}
            <div className="mt-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter Text"
                  className="w-full p-2 pl-8 border border-gray-300 rounded-md text-sm"
                />
                <span className="absolute left-2 top-2.5 text-gray-400">🔍</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                You can search up to 5 provider to view their availability specifically.
              </p>
            </div>

            {/* Legend */}
            <div className="mt-6">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span>Online</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded"></div>
                  <span>Offline</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  <span>Online+Offline</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-800 rounded"></div>
                  <span>Blocked</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-300 rounded"></div>
                  <span>Booked</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Calendar Grid */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Calendar Header */}
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                Showing full schedules for Thu, 21 Sep 2024
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Calendar Event</span>
                <span className="text-sm text-gray-600">Select Event</span>
                <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                  <option>Enter Text</option>
                </select>
              </div>
            </div>

            {/* Week Days Header */}
            <div className="grid grid-cols-8 gap-1">
              <div className="p-3 text-center text-sm font-medium text-gray-600">Time</div>
              {weekDates.map((date, index) => (
                <div key={index} className="p-3 text-center">
                  <div className={`text-sm font-medium ${
                    date.getDate() === 21 ? 'bg-green-600 text-white rounded-lg py-2' : 'text-gray-900'
                  }`}>
                    {date.getDate()}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="flex-1 overflow-auto">
            <div className="grid grid-cols-8 gap-1 p-4">
              {/* Time column */}
              <div className="space-y-1">
                {timeSlots.map((time, index) => (
                  <div key={index} className="h-12 flex items-center justify-center text-xs text-gray-500 border-r border-gray-100">
                    {index % 4 === 0 ? formatTime(time) : ''}
                  </div>
                ))}
              </div>

              {/* Day columns */}
              {weekDates.map((date, dayIndex) => (
                <div key={dayIndex} className="space-y-1">
                  {timeSlots.map((time, timeIndex) => {
                    const slotInfo = dayIndex === 3 ? getSlotInfo(time, dayIndex) : null; // Only show on Thursday (index 3)
                    
                    return (
                      <div
                        key={timeIndex}
                        className={`h-12 border border-gray-100 relative ${
                          slotInfo ? slotInfo.color : 'bg-white hover:bg-gray-50'
                        }`}
                      >
                        {slotInfo && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xs text-white font-medium px-1 text-center">
                              {time}
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
