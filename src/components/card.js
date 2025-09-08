export default function ProviderCard({ provider, onViewCalendar }) {
  const getStatusBadge = (isInhouse) => {
    return isInhouse ? (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        In-house
      </span>
    ) : (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
        External
      </span>
    );
  };

  const getTypeColor = (type) => {
    const colors = {
      therapist: 'bg-purple-100 text-purple-800',
      psychiatrist: 'bg-indigo-100 text-indigo-800',
      counselor: 'bg-teal-100 text-teal-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const getAvailableSlots = (availabilities) => {
    if (!availabilities || availabilities.length === 0) return 0;
    const availability = availabilities[0];
    return (
      (availability.online_slots?.length || 0) +
      (availability.offline_slots?.length || 0) +
      (availability.both_slots?.length || 0)
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <img
            src={provider.image}
            alt={provider.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{provider.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${getTypeColor(provider.provider_usertype)}`}>
                {provider.provider_usertype}
              </span>
              {getStatusBadge(provider.is_inhouse)}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="text-blue-500">🏥</span>
          <span>{provider.clinic_details?.name || 'No clinic assigned'}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="text-green-500">⏰</span>
          <span>{getAvailableSlots(provider.availabilities)} available slots</span>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100">
        <button
          onClick={() => onViewCalendar(provider)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <span>📅</span>
          View Calendar
        </button>
      </div>
    </div>
  );
}
