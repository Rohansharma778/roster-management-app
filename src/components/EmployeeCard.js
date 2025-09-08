import React from 'react';

const EmployeeCard = ({ employee, onEmployeeClick }) => {
  const handleClick = () => {
    if (onEmployeeClick) {
      onEmployeeClick(employee);
    }
  };

  // Helper functions for the new data structure
  const getStatusBadge = (employee) => {
    if (!employee.availabilities || employee.availabilities.length === 0) {
      return { text: 'No Data', color: 'bg-gray-100 text-gray-600' };
    }

    const availability = employee.availabilities[0];
    const totalSlots = [
      ...availability.online_slots,
      ...availability.offline_slots,
      ...availability.both_slots
    ].length;
    
    const bookedSlots = [
      ...availability.online_booked_slots,
      ...availability.offline_booked_slots
    ].length;

    if (bookedSlots >= totalSlots) {
      return { text: 'Fully Booked', color: 'bg-red-100 text-red-600' };
    } else if (bookedSlots > 0) {
      return { text: 'Partially Available', color: 'bg-yellow-100 text-yellow-600' };
    } else {
      return { text: 'Available', color: 'bg-green-100 text-green-600' };
    }
  };

  const getTypeBadge = (employee) => {
    if (employee.is_inhouse) {
      return { text: 'In-House', color: 'bg-blue-100 text-blue-600' };
    } else {
      return { text: 'External', color: 'bg-purple-100 text-purple-600' };
    }
  };

  const status = getStatusBadge(employee);
  const type = getTypeBadge(employee);

  return (
    <div 
      onClick={handleClick}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-lg transition-all duration-200 cursor-pointer hover:border-blue-300 group touch-manipulation"
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && handleClick()}
      aria-label={`View schedule for ${employee.name}`}
    >
      {/* Employee Photo and Name */}
      <div className="flex flex-col items-center text-center">
        {/* Profile Image */}
        <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-full overflow-hidden mb-3 group-hover:scale-105 transition-transform duration-200">
          <img 
            src={employee.image} 
            alt={employee.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(employee.name)}&background=3B82F6&color=fff`;
            }}
          />
        </div>
        
        <h3 className="font-bold text-gray-900 text-base sm:text-lg leading-tight mb-1">
          {employee.name}
        </h3>
        
        <p className="text-xs sm:text-sm text-gray-600 capitalize font-medium mb-2 sm:mb-3">
          {employee.provider_usertype}
        </p>
        
        {/* Clinic Info */}
        <p className="text-xs text-gray-500 mb-2 sm:mb-3">
          {employee.clinic_details.name}
        </p>
        
        {/* Badges */}
        <div className="flex flex-wrap gap-1 sm:gap-2 justify-center">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
            {status.text}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${type.color}`}>
            {type.text}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;