import React from 'react';

const LandingPage = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8">
      <div className="max-w-lg w-full mx-auto bg-white rounded-xl shadow-xl p-6 sm:p-8 text-center border border-gray-100">
        {/* Icon/Emoji */}
        <div className="text-6xl sm:text-8xl mb-4 sm:mb-6">🏥</div>
        
        {/* Welcome Title */}
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
          Welcome to
          <span className="block mt-1 sm:mt-2 text-blue-600">Roster Management</span>
        </h1>
        
        {/* Description */}
        <p className="text-gray-600 mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">
          Streamline your healthcare workforce management with our comprehensive roster system. 
          Manage schedules, track availability, and optimize your team's productivity.
        </p>
        
        {/* Features List */}
        <div className="mb-6 sm:mb-8 space-y-2 sm:space-y-3">
          <div className="flex items-center justify-center gap-3 text-gray-700">
            <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
            <span className="text-sm">Schedule Management</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-gray-700">
            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
            <span className="text-sm">Real-time Availability</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-gray-700">
            <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
            <span className="text-sm">Provider Analytics</span>
          </div>
        </div>
        
        {/* Call to Action Button */}
        <button
          onClick={onStart}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-200 transform hover:translate-y-[-2px] hover:shadow-lg font-semibold text-base sm:text-lg flex items-center justify-center gap-3 group"
          aria-label="Start managing your roster"
        >
          <span>Let's Manage</span>
          <svg 
            className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-200" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
        
        {/* Secondary Information */}
        <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
          <p className="text-xs sm:text-sm text-gray-500">
            Designed for healthcare professionals • Secure & Reliable
          </p>
        </div>
      </div>
      
      {/* Background Decorations */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-indigo-200 rounded-full opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/3 right-10 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
    </div>
  );
};

export default LandingPage;
