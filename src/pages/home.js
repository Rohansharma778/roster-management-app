import { useState } from "react";
import Filters from "../components/filter.js";
import ProviderCard from "../components/card.js";
import CalendarModal from "../components/calender.js";
import { SlotComponent, ChevronNavigation, DatePickerComponent } from "../components/figmaComponents.js";

const dummyProviders = [
   {
       "name": "Dr. Aarushi Sharma",
       "provider_usertype": "therapist",
       "is_inhouse": true,
       "id": 101,
       "image": "https://randomuser.me/api/portraits/women/1.jpg",
       "clinic_details": {
           "id": 1,
           "name": "Bandra Clinic"
       },
       "availabilities": [
           {
               "online_slots": ["08:00", "08:15", "08:30"],
               "offline_slots": ["09:00", "09:15"],
               "both_slots": ["10:00", "10:15"],
               "online_booked_slots": ["08:30"],
               "offline_booked_slots": ["09:15"],
               "blocked_slots": [{slot: "11:00", "reason": "Unwell" }]
           }
       ]
   },
   {
       "name": "Anjana Thattil",
       "provider_usertype": "psychiatrist",
       "is_inhouse": false,
       "id": 102,
       "image": "https://randomuser.me/api/portraits/women/2.jpg",
       "clinic_details": {
           "id": 2,
           "name": "Andheri Clinic"
       },
       "availabilities": [
           {
               "online_slots": ["10:00", "10:15", "10:30"],
               "offline_slots": ["11:00", "11:15"],
               "both_slots": ["12:00"],
               "online_booked_slots": ["10:30"],
               "offline_booked_slots": ["11:15"],
               "blocked_slots": [{slot: "12:00", "reason": "Other" }]
           }
       ]
   },
   {
       "name": "Dr. Amiya Banerjee",
       "provider_usertype": "psychiatrist",
       "is_inhouse": true,
       "id": 103,
       "image": "https://randomuser.me/api/portraits/men/3.jpg",
       "clinic_details": {
           "id": 3,
           "name": "Juhu Clinic"
       },
       "availabilities": [
           {
               "online_slots": ["14:00", "14:15", "14:30"],
               "offline_slots": ["15:00", "15:15"],
               "both_slots": ["16:00"],
               "online_booked_slots": ["14:30"],
               "offline_booked_slots": ["15:15"],
               "blocked_slots": [{slot: "17:00", "reason": "Other" }]
           }
       ]
   }
]

export default function Home() {
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleSlotClick = (slot) => {
    console.log('Slot clicked:', slot);
  };

  const handleDateNavigation = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + (direction === 'next' ? 7 : -7));
    setSelectedDate(newDate);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Healthcare Providers</h1>
            <p className="text-gray-600 mt-1">Manage and view provider schedules</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              + Add Provider
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <Filters />

        {/* Figma Design Components Demo */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Design Components</h3>
          
          {/* Date Navigation */}
          <div className="flex items-center gap-4 mb-6">
            <ChevronNavigation 
              onPrevious={() => handleDateNavigation('prev')}
              onNext={() => handleDateNavigation('next')}
            />
            <DatePickerComponent 
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
            />
          </div>

          {/* Slot Components Grid */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Time Slots</h4>
            <div className="grid grid-cols-6 gap-3">
              <SlotComponent time="09:00" status="available" onClick={() => handleSlotClick('09:00')} />
              <SlotComponent time="09:15" status="online" onClick={() => handleSlotClick('09:15')} />
              <SlotComponent time="09:30" status="offline" onClick={() => handleSlotClick('09:30')} />
              <SlotComponent time="09:45" status="both" onClick={() => handleSlotClick('09:45')} />
              <SlotComponent time="10:00" status="booked" onClick={() => handleSlotClick('10:00')} />
              <SlotComponent time="10:15" status="blocked" onClick={() => handleSlotClick('10:15')} />
              <SlotComponent time="10:30" status="pending" onClick={() => handleSlotClick('10:30')} />
              <SlotComponent time="10:45" status="waiting" onClick={() => handleSlotClick('10:45')} />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyProviders.map((provider) => (
            <ProviderCard
              key={provider.id}
              provider={provider}
              onViewCalendar={setSelectedProvider}
            />
          ))}
        </div>

        {/* Empty State */}
        {dummyProviders.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No providers found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters or add a new provider.</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              Add First Provider
            </button>
          </div>
        )}
      </div>

      {/* Calendar Modal */}
      {selectedProvider && (
        <CalendarModal
          provider={selectedProvider}
          onClose={() => setSelectedProvider(null)}
        />
      )}
    </div>
  );
}