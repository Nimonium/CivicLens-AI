"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { mockIssues, mockCategories } from "@/lib/mockData";
import { Navigation, Filter, Layers } from "lucide-react";

const MapComponent = dynamic(() => import("@/components/MapComponent"), { ssr: false, loading: () => <div className="w-full h-[calc(100vh-64px)] bg-gray-100 flex items-center justify-center">Loading map...</div> });

export default function MapPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  // Filter issues to ensure they have coordinates
  const validIssues = mockIssues.filter(issue => issue.coordinates && issue.coordinates.length === 2);
  
  const displayIssues = validIssues.filter(
    issue => activeCategory === "All" || issue.category === activeCategory
  );

  // Map center roughly on San Francisco based on dummy data
  const center: [number, number] = [37.7749, -122.4194];

  return (
    <div className="relative w-full h-[calc(100vh-56px)] md:h-[calc(100vh-64px)]">
      {/* Map */}
      <div className="absolute inset-0 z-0">
        <MapComponent 
          center={center} 
          zoom={13} 
          markers={displayIssues.map(i => ({...i, coordinates: i.coordinates as [number, number]}))} 
          interactive={true} 
        />
      </div>

      {/* Floating UI Elements */}
      <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-start pointer-events-none">
        
        {/* Left Side: Filter Dropdown */}
        <div className="pointer-events-auto">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-3 font-semibold text-gray-700 hover:bg-gray-50 transition-colors w-full md:w-48 justify-between"
            >
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-blue-600" />
                <span>{activeCategory === 'All' ? 'All Categories' : activeCategory}</span>
              </div>
              <Filter className="w-4 h-4 text-gray-400" />
            </button>
            
            {showFilters && (
              <div className="border-t border-gray-100 py-1 max-h-60 overflow-y-auto">
                <button 
                  onClick={() => { setActiveCategory("All"); setShowFilters(false); }}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors ${activeCategory === "All" ? "bg-blue-50 text-blue-700 font-semibold" : "text-gray-700 hover:bg-gray-50"}`}
                >
                  All Categories
                </button>
                {mockCategories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => { setActiveCategory(cat); setShowFilters(false); }}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${activeCategory === cat ? "bg-blue-50 text-blue-700 font-semibold" : "text-gray-700 hover:bg-gray-50"}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Map Controls */}
        <div className="flex flex-col gap-2 pointer-events-auto">
          <button className="bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg border border-gray-100 text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors">
            <Navigation className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-6 left-4 md:bottom-8 md:left-8 z-10 pointer-events-none">
        <div className="bg-white/90 backdrop-blur-md rounded-xl p-3 shadow-lg border border-gray-100 flex gap-3 pointer-events-auto text-xs font-semibold">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500 shadow-sm" />
            <span className="text-gray-700">Pending</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-sm" />
            <span className="text-gray-700">In Progress</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-green-500 shadow-sm" />
            <span className="text-gray-700">Resolved</span>
          </div>
        </div>
      </div>
    </div>
  );
}
