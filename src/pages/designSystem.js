import React, { useState } from 'react';
import { 
  SlotComponent, 
  ChevronNavigation, 
  DatePickerComponent, 
  CalendarDateComponent, 
  TimelineUnit, 
  EventComponent 
} from '../components/figmaComponents.js';

export default function DesignSystem() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const sampleEvents = [
    {
      id: 1,
      type: 'session',
      title: '#24397',
      description: 'Google Calendar Event',
      time: '09:00',
      color: 'bg-blue-500'
    },
    {
      id: 2,
      type: 'meeting',
      title: '#24397',
      description: 'Google Calendar Event',
      time: '10:30',
      color: 'bg-purple-500'
    },
    {
      id: 3,
      type: 'appointment',
      title: '#24397',
      description: 'Google Calendar Event',
      time: '14:00',
      color: 'bg-green-500'
    },
    {
      id: 4,
      type: 'break',
      title: '#24397',
      description: 'Google Calendar Event',
      time: '12:00',
      color: 'bg-orange-500'
    },
    {
      id: 5,
      type: 'blocked',
      title: '#24397',
      description: 'Google Calendar Event',
      time: '16:00',
      color: 'bg-red-500'
    }
  ];

  const timeSlots = [
    { time: '08:00', events: [] },
    { time: '09:00', events: [sampleEvents[0]] },
    { time: '10:00', events: [] },
    { time: '10:30', events: [sampleEvents[1]] },
    { time: '11:00', events: [] },
    { time: '12:00', events: [sampleEvents[3]] },
    { time: '13:00', events: [] },
    { time: '14:00', events: [sampleEvents[2]] },
    { time: '15:00', events: [] },
    { time: '16:00', events: [sampleEvents[4]] },
    { time: '17:00', events: [] }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Design System Components</h1>
        
        {/* Slot Components */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Slot Components</h2>
          <p className="text-gray-600 mb-6">Time slot components with different statuses and colors</p>
          
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Available Slots</h3>
              <div className="space-y-2">
                <SlotComponent time="09:00" status="available" />
                <SlotComponent time="09:15" status="online" />
                <SlotComponent time="09:30" status="offline" />
                <SlotComponent time="09:45" status="both" />
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Booked Slots</h3>
              <div className="space-y-2">
                <SlotComponent time="10:00" status="booked" />
                <SlotComponent time="10:15" status="unavailable" />
                <SlotComponent time="10:30" status="blocked" />
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Pending Slots</h3>
              <div className="space-y-2">
                <SlotComponent time="11:00" status="pending" />
                <SlotComponent time="11:15" status="waiting" />
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">All Times Grid</h3>
              <div className="grid grid-cols-3 gap-1 text-xs">
                {['09:00', '09:15', '09:30', '09:45', '10:00', '10:15', '10:30', '10:45', '11:00'].map((time, index) => {
                  const statuses = ['available', 'online', 'offline', 'both', 'booked', 'blocked', 'pending', 'waiting', 'unavailable'];
                  return (
                    <SlotComponent 
                      key={time}
                      time={time} 
                      status={statuses[index % statuses.length]} 
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Components */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Navigation Components</h2>
          
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Chevron Navigation</h3>
              <div className="flex items-center gap-4">
                <ChevronNavigation 
                  onPrevious={() => console.log('Previous')}
                  onNext={() => console.log('Next')}
                />
                <ChevronNavigation 
                  onPrevious={() => console.log('Previous')}
                  onNext={() => console.log('Next')}
                  disabled={{ prev: true, next: false }}
                />
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Date Picker</h3>
              <DatePickerComponent 
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
              />
            </div>
          </div>
        </section>

        {/* Calendar Components */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Calendar Components</h2>
          
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Calendar Dates</h3>
              <div className="flex gap-2">
                {[26, 27, 28, 29, 30].map((day, index) => {
                  const date = new Date(2024, 5, day);
                  return (
                    <CalendarDateComponent
                      key={day}
                      date={date}
                      isSelected={index === 2}
                      isToday={index === 1}
                      onClick={(date) => console.log('Date clicked:', date)}
                    />
                  );
                })}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Timeline</h3>
              <div className="border border-gray-200 rounded">
                {timeSlots.slice(0, 4).map((slot, index) => (
                  <TimelineUnit
                    key={index}
                    time={slot.time}
                    events={slot.events}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Event Components */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Event Components</h2>
          <p className="text-gray-600 mb-6">Different types of events with proper styling</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sampleEvents.map((event) => (
              <EventComponent
                key={event.id}
                event={event}
                onClick={() => console.log('Event clicked:', event)}
              />
            ))}
          </div>
          
          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Event Colors Reference</h3>
            <div className="grid grid-cols-5 gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span>Session</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-purple-500 rounded"></div>
                <span>Meeting</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span>Appointment</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-500 rounded"></div>
                <span>Break</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span>Blocked</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
