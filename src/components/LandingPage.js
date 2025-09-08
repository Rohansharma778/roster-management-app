import React from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';
import { landingPageDarkModeStyles } from '../styles/darkModeStyles';

const LandingPage = ({ onStart }) => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  
  return (
    <div className={`min-h-screen flex items-center justify-center ${landingPageDarkModeStyles.background}`}>
      {/* Dark Mode Toggle Button */}
      <button
        onClick={toggleDarkMode}
        className="fixed top-6 right-6 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 dark:border-gray-700"
        title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      >
        {darkMode ? (
          <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </button>

      <div className={`max-w-lg w-full rounded-xl shadow-xl p-8 text-center transform hover:scale-105 transition-transform duration-300 ${landingPageDarkModeStyles.card}`}>
        {/* Icon/Emoji */}
        <div className="text-8xl mb-6 animate-pulse-slow">🏥</div>
        
        {/* Welcome Title */}
        <h1 className={`text-4xl font-bold mb-4 leading-tight ${landingPageDarkModeStyles.title}`}>
          Welcome to
          <span className={`block mt-2 ${landingPageDarkModeStyles.subtitle}`}>Roster Management</span>
        </h1>
        
        {/* Description */}
        <p className={`mb-8 text-lg leading-relaxed ${landingPageDarkModeStyles.description}`}>
          Streamline your healthcare workforce management with our comprehensive roster system. 
          Manage schedules, track availability, and optimize your team's productivity.
        </p>
        
        {/* Features List */}
        <div className="mb-8 space-y-3">
          <div className={`flex items-center justify-center gap-3 ${landingPageDarkModeStyles.feature}`}>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm">Schedule Management</span>
          </div>
          <div className={`flex items-center justify-center gap-3 ${landingPageDarkModeStyles.feature}`}>
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-sm">Real-time Availability</span>
          </div>
          <div className={`flex items-center justify-center gap-3 ${landingPageDarkModeStyles.feature}`}>
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span className="text-sm">Provider Analytics</span>
          </div>
        </div>
        
        {/* Call to Action Button */}
        <button
          onClick={onStart}
          className={`w-full text-white px-8 py-4 rounded-lg transition-all duration-200 transform hover:translate-y-[-2px] hover:shadow-lg font-semibold text-lg flex items-center justify-center gap-3 group ${landingPageDarkModeStyles.button}`}
        >
          <span>Let's Manage</span>
          <svg 
            className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
        
        {/* Secondary Information */}
        <div className={`mt-6 pt-6 border-t ${landingPageDarkModeStyles.footer}`}>
          <p className="text-xs">
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
