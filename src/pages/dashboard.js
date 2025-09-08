import React from 'react';

export default function Dashboard() {
  const stats = [
    { title: 'Total Providers', value: '24', change: '+2', icon: '👥', color: 'bg-blue-500' },
    { title: 'Active Sessions', value: '18', change: '+5', icon: '🔄', color: 'bg-green-500' },
    { title: 'Scheduled Today', value: '42', change: '+8', icon: '📅', color: 'bg-purple-500' },
    { title: 'Available Slots', value: '156', change: '-3', icon: '⏰', color: 'bg-orange-500' }
  ];

  const recentActivities = [
    { action: 'New provider added', provider: 'Dr. Sarah Johnson', time: '2 hours ago', type: 'add' },
    { action: 'Schedule updated', provider: 'Dr. Mike Chen', time: '4 hours ago', type: 'update' },
    { action: 'Session completed', provider: 'Dr. Emily Davis', time: '6 hours ago', type: 'complete' },
    { action: 'Slot blocked', provider: 'Dr. John Smith', time: '8 hours ago', type: 'block' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Overview of your roster management system</p>
          </div>
          <div className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleString()}
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className={`text-sm mt-1 ${
                    stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change} from last week
                  </p>
                </div>
                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                    activity.type === 'add' ? 'bg-green-100 text-green-600' :
                    activity.type === 'update' ? 'bg-blue-100 text-blue-600' :
                    activity.type === 'complete' ? 'bg-purple-100 text-purple-600' :
                    'bg-orange-100 text-orange-600'
                  }`}>
                    {activity.type === 'add' ? '+' :
                     activity.type === 'update' ? '↻' :
                     activity.type === 'complete' ? '✓' : '⚠'}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.provider}</p>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-center">
                <div className="text-2xl mb-2">👤</div>
                <p className="text-sm font-medium text-gray-700">Add Provider</p>
              </button>
              <button className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors text-center">
                <div className="text-2xl mb-2">📅</div>
                <p className="text-sm font-medium text-gray-700">Schedule Session</p>
              </button>
              <button className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors text-center">
                <div className="text-2xl mb-2">📊</div>
                <p className="text-sm font-medium text-gray-700">View Reports</p>
              </button>
              <button className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors text-center">
                <div className="text-2xl mb-2">⚙️</div>
                <p className="text-sm font-medium text-gray-700">Settings</p>
              </button>
            </div>
          </div>
        </div>

        {/* Today's Schedule Preview */}
        <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="font-medium">09:00 - 09:30</span>
                <span className="text-gray-600">Dr. Aarushi Sharma</span>
              </div>
              <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">Online</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="font-medium">10:00 - 10:30</span>
                <span className="text-gray-600">Anjana Thattil</span>
              </div>
              <span className="text-sm text-orange-600 bg-orange-100 px-2 py-1 rounded">Offline</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="font-medium">14:00 - 14:30</span>
                <span className="text-gray-600">Dr. Amiya Banerjee</span>
              </div>
              <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded">Both</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
