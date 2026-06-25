"use client";

import { mockStats, chartData, topContributors, mockIssues } from "@/lib/mockData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Award, CheckCircle, Clock, Users, Activity } from "lucide-react";

export default function Dashboard() {
  const resolvedIssues = mockIssues.filter(i => i.status === 'Resolved');

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 pb-24 md:pb-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <Activity className="w-8 h-8 text-blue-600" />
          Community Impact
        </h1>
        <p className="text-gray-500 mt-2">Real-time transparency on community improvements.</p>
      </div>

      {/* Top Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-2 text-gray-500">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-sm font-semibold">Resolved</span>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-gray-900">{mockStats.resolvedIssues}</p>
        </div>
        
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-2 text-gray-500">
            <Clock className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-semibold">Avg Time</span>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-gray-900">{mockStats.avgResolutionTime}</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-2 text-gray-500">
            <TrendingUp className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-semibold">Total Issues</span>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-gray-900">{mockStats.totalIssues}</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-2 text-gray-500">
            <Users className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-semibold">Citizens</span>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-gray-900">{mockStats.activeCitizens}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Charts */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Issues by Category */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-bold mb-6 text-gray-900">Issues by Category</h2>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData.issuesByCategory}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
                  <YAxis hide />
                  <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                  <Bar dataKey="value" fill="#2563EB" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Monthly Resolution Rate */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h2 className="text-lg font-bold mb-6 text-gray-900">Resolution Rate (%)</h2>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData.resolutionRate}>
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
                    <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                    <Line type="monotone" dataKey="rate" stroke="#10B981" strokeWidth={4} dot={{r: 4, fill: '#10B981', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 6}} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Status Distribution */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h2 className="text-lg font-bold mb-6 text-gray-900">Status Distribution</h2>
              <div className="h-48 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData.statusDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {chartData.statusDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                  </PieChart>
                </ResponsiveContainer>
                {/* Center text manually */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-2xl font-bold text-gray-900">1.2k</span>
                  <span className="text-[10px] uppercase font-bold text-gray-400">Total</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Leaderboard & Recent */}
        <div className="space-y-8">
          
          {/* Top Contributors */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Award className="w-5 h-5 text-orange-500" />
              <h2 className="text-lg font-bold text-gray-900">Top Contributors</h2>
            </div>
            
            <div className="space-y-4">
              {topContributors.map((user, index) => (
                <div key={user.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className={`w-6 flex justify-center font-bold ${index < 3 ? 'text-orange-500' : 'text-gray-400'}`}>
                    #{index + 1}
                  </div>
                  <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover border border-gray-100" />
                  <div className="flex-grow">
                    <p className="font-bold text-sm text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-blue-600 text-sm">{user.score}</p>
                    <p className="text-[10px] text-gray-400 uppercase">Pts</p>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-4 py-2 text-sm font-bold text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
              View Full Leaderboard
            </button>
          </div>

          {/* Recent Resolutions */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-bold mb-4 text-gray-900">Recent Resolutions</h2>
            <div className="grid grid-cols-2 gap-2">
              {resolvedIssues.slice(0, 4).map((issue, idx) => (
                <div key={idx} className="relative aspect-square rounded-xl overflow-hidden group">
                  <img src={issue.imageUrl} alt={issue.title} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-xs text-white font-semibold line-clamp-2">{issue.title}</p>
                  </div>
                </div>
              ))}
              {/* Fill placeholders if less than 4 */}
              {Array.from({length: Math.max(0, 4 - resolvedIssues.length)}).map((_, i) => (
                <div key={`placeholder-${i}`} className="aspect-square rounded-xl bg-gray-100 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-gray-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
