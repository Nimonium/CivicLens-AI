"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Filter, MapPin, ThumbsUp, MessageSquare, Share2, RefreshCw } from "lucide-react";
import { mockIssues, mockCategories } from "@/lib/mockData";

export default function Feed() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const tabs = ["All", "Near Me", "My Reports"];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const filteredIssues = mockIssues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          issue.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || issue.category === selectedCategory;
    const matchesTab = activeTab === "All" || 
                      (activeTab === "My Reports" && issue.reporter === "Sarah J.") || // Simulating My Reports
                      (activeTab === "Near Me" && issue.location.includes("Downtown")); // Simulating Near Me
    
    return matchesSearch && matchesCategory && matchesTab;
  });

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-6 pb-24 md:pb-8">
      {/* Header and Search */}
      <div className="sticky top-16 md:top-0 bg-background/95 backdrop-blur-sm z-30 pt-2 pb-4 -mx-4 px-4 md:mx-0 md:px-0">
        <div className="flex gap-2 mb-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search issues..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-shadow"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="relative">
            <select
              className="h-full pl-4 pr-8 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 appearance-none text-sm font-medium text-gray-700"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              {mockCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-gray-100 p-1 rounded-xl">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-colors ${
                activeTab === tab ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Pull to refresh visual hint */}
      <div className="flex justify-center my-4">
        <button 
          onClick={handleRefresh}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-blue-600' : ''}`} />
          {isRefreshing ? 'Refreshing...' : 'Refresh Feed'}
        </button>
      </div>

      {/* Feed List */}
      <div className="space-y-6">
        {filteredIssues.length > 0 ? (
          filteredIssues.map((issue) => (
            <div key={issue.id} className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              {/* Image & Badges */}
              <div className="relative h-48 w-full bg-gray-100">
                <img src={issue.imageUrl} alt={issue.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3">
                  <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs px-2.5 py-1 rounded-full font-bold shadow-sm">
                    {issue.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-bold shadow-sm ${
                    issue.status === 'Resolved' ? 'bg-green-500 text-white' : 
                    issue.status === 'In Progress' ? 'bg-blue-500 text-white' : 
                    'bg-orange-500 text-white'
                  }`}>
                    {issue.status}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <Link href={`/issue/${issue.id}`}>
                    <h3 className="font-bold text-xl hover:text-blue-600 transition-colors">{issue.title}</h3>
                  </Link>
                  <span className="text-xs text-gray-500 whitespace-nowrap">{issue.timestamp}</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600 mb-3 text-sm">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  <span>{issue.location}</span>
                </div>
                
                <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                  {issue.description}
                </p>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-1">
                    <img src={issue.reporterAvatar} alt={issue.reporter} className="w-6 h-6 rounded-full object-cover border border-gray-200" />
                    <span className="text-xs text-gray-500">{issue.reporter}</span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1.5 text-gray-500 hover:text-blue-600 transition-colors group">
                      <div className="p-1.5 rounded-full group-hover:bg-blue-50 transition-colors">
                        <ThumbsUp className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium">{issue.upvotes}</span>
                    </button>
                    <Link href={`/issue/${issue.id}`} className="flex items-center gap-1.5 text-gray-500 hover:text-blue-600 transition-colors group">
                      <div className="p-1.5 rounded-full group-hover:bg-blue-50 transition-colors">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium">{issue.comments}</span>
                    </Link>
                    <button className="p-1.5 text-gray-500 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">No issues found</h3>
            <p className="text-gray-500">Try adjusting your filters or search query.</p>
          </div>
        )}
      </div>
    </div>
  );
}
