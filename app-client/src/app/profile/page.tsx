"use client";

import { currentUser, mockIssues } from "@/lib/mockData";
import { Settings, LogOut, MapPin, Calendar, Star, Wrench, ShieldCheck, CheckCircle, Zap, Trophy, ChevronRight } from "lucide-react";
import Link from "next/link";

const iconMap = {
  Star, Wrench, ShieldCheck, CheckCircle, Zap, Trophy
};

export default function Profile() {
  // Simulate user's own reports by filtering where reporter is "Sarah J."
  const myReports = mockIssues.filter(issue => issue.reporter === "Sarah J.");

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-8 pb-24 md:pb-8">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <div className="flex gap-2">
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
            <Settings className="w-5 h-5" />
          </button>
          <button className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* User Info */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-200 mb-8 flex flex-col items-center text-center relative overflow-hidden">
        {/* Background decorative blob */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-50 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-green-50 rounded-full blur-3xl opacity-50" />

        <div className="relative z-10">
          <img 
            src={currentUser.avatar} 
            alt={currentUser.name} 
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-900">{currentUser.name}</h2>
          <p className="text-sm font-semibold text-blue-600 mb-3">{currentUser.role}</p>
          
          <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{currentUser.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{currentUser.joinDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm text-center">
          <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Reported</p>
          <p className="text-2xl font-bold text-gray-900">{currentUser.stats.reported}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm text-center">
          <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Verified</p>
          <p className="text-2xl font-bold text-gray-900">{currentUser.stats.verified}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm text-center">
          <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Impact Score</p>
          <p className="text-2xl font-bold text-blue-600">{currentUser.stats.impactScore}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm text-center">
          <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Rank</p>
          <p className="text-2xl font-bold text-orange-500">#{currentUser.stats.rank}</p>
        </div>
      </div>

      {/* Achievement Badges */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-gray-900">Achievement Badges</h3>
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
            {currentUser.badges.length} Unlocked
          </span>
        </div>
        
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {currentUser.badges.map(badge => {
            const Icon = iconMap[badge.icon as keyof typeof iconMap] || Star;
            return (
              <div key={badge.id} className="flex flex-col items-center gap-2 group cursor-help">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center border border-blue-200 shadow-inner group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-blue-600 drop-shadow-sm" />
                </div>
                <span className="text-[10px] font-bold text-gray-600 text-center leading-tight">
                  {badge.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* My Recent Reports */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex justify-between items-end mb-6">
          <h3 className="text-lg font-bold text-gray-900">My Recent Reports</h3>
          <Link href="/feed" className="text-sm font-semibold text-blue-600 hover:underline">
            View All
          </Link>
        </div>

        <div className="space-y-4">
          {myReports.length > 0 ? myReports.map(report => (
            <Link href={`/issue/${report.id}`} key={report.id} className="flex gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 group">
              <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                <img src={report.imageUrl} alt={report.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-grow min-w-0 flex flex-col justify-center">
                <h4 className="font-bold text-gray-900 truncate mb-1">{report.title}</h4>
                <div className="flex items-center gap-2 text-xs">
                  <span className={`px-2 py-0.5 rounded-full font-bold uppercase ${
                    report.status === 'Resolved' ? 'bg-green-100 text-green-700' : 
                    report.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 
                    'bg-red-100 text-red-700'
                  }`}>
                    {report.status}
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-500 truncate">{report.timestamp}</span>
                </div>
              </div>
              <div className="flex items-center">
                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-600 transition-colors" />
              </div>
            </Link>
          )) : (
            <div className="text-center py-6 text-gray-500 text-sm">
              You haven't reported any issues yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
