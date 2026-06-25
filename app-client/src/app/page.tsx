import Link from "next/link";
import { PlusCircle, Map as MapIcon, CheckCircle2, Megaphone, ShieldCheck, CheckCircle } from "lucide-react";
import { mockIssues, mockStats } from "@/lib/mockData";
import Image from "next/image";

export default function Home() {
  return (
    <div className="px-4 md:px-6 py-8 pb-24 md:pb-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
        <div className="space-y-6 order-2 md:order-1">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
            Fix Your Community, <br />
            <span className="text-blue-600">One Issue at a Time</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-lg">
            Join thousands of active citizens making their neighborhoods safer, cleaner, and better. Report potholes, graffiti, or broken streetlights in seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/report" className="bg-blue-600 text-white px-8 py-3 rounded-xl shadow-md hover:scale-95 transition-transform flex items-center justify-center gap-2 font-semibold text-lg">
              <PlusCircle className="w-6 h-6" />
              Report an Issue
            </Link>
            <Link href="/map" className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-xl hover:scale-95 transition-transform flex items-center justify-center gap-2 font-semibold text-lg">
              <MapIcon className="w-6 h-6" />
              View Map
            </Link>
          </div>
        </div>
        <div className="order-1 md:order-2 relative h-64 md:h-96 w-full">
          <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-xl border border-gray-200">
            {/* Standard img tag because we don't have next.config.js configured for unsplash domains yet */}
            <img 
              className="w-full h-full object-cover" 
              alt="Community Map" 
              src="https://images.unsplash.com/photo-1517409543781-a67b2d5f81e3?auto=format&fit=crop&q=80&w=800" 
            />
            {/* Overlay floating status card */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-xl border border-gray-200 shadow-lg flex items-center gap-4">
              <div className="bg-green-600 text-white p-2 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Pothole Resolved</p>
                <p className="text-xs text-gray-600">Central Ave • 2 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex flex-col items-center justify-center text-center">
          <p className="text-4xl font-bold text-blue-600">{mockStats.totalIssues}</p>
          <p className="text-xs font-semibold text-blue-600/80 uppercase tracking-wider mt-2">Total Issues</p>
        </div>
        <div className="bg-green-50 p-6 rounded-2xl border border-green-100 flex flex-col items-center justify-center text-center">
          <p className="text-4xl font-bold text-green-600">{mockStats.resolvedIssues}</p>
          <p className="text-xs font-semibold text-green-600/80 uppercase tracking-wider mt-2">Resolved</p>
        </div>
        <div className="col-span-2 md:col-span-1 bg-gray-50 p-6 rounded-2xl border border-gray-200 flex flex-col items-center justify-center text-center">
          <p className="text-4xl font-bold text-gray-900">{mockStats.activeCitizens}</p>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-2">Active Citizens</p>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">How it Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="group p-6 bg-white border border-gray-200 rounded-2xl hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Megaphone className="text-blue-600 w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">1. Report</h3>
            <p className="text-sm text-gray-600">Snap a photo and describe the issue. Our AI and geo-tagging handles the categorization and location automatically.</p>
          </div>
          <div className="group p-6 bg-white border border-gray-200 rounded-2xl hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <ShieldCheck className="text-orange-500 w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">2. Verify</h3>
            <p className="text-sm text-gray-600">City officials or community leads verify the report and assign a maintenance team.</p>
          </div>
          <div className="group p-6 bg-white border border-gray-200 rounded-2xl hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <CheckCircle className="text-green-600 w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">3. Resolve</h3>
            <p className="text-sm text-gray-600">Once fixed, you&apos;ll receive a notification and the community sees the update on the map.</p>
          </div>
        </div>
      </section>

      {/* Recent Reports */}
      <section className="py-8">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl font-bold">Recent Reports</h2>
          <Link href="/feed" className="text-blue-600 font-semibold text-sm hover:underline">See all</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockIssues.slice(0, 2).map((issue) => (
            <div key={issue.id} className="bg-white rounded-xl p-4 border border-gray-200 flex gap-4 items-center">
              <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                <img src={issue.imageUrl} alt={issue.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-grow min-w-0">
                <div className="flex justify-between items-start gap-2">
                  <h4 className="font-semibold text-base truncate">{issue.title}</h4>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase whitespace-nowrap ${
                    issue.status === 'Resolved' ? 'bg-green-600 text-white' : 
                    issue.status === 'In Progress' ? 'bg-blue-600 text-white' : 
                    'bg-orange-500 text-white'
                  }`}>
                    {issue.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1 truncate">Reported by {issue.reporter} • {issue.timestamp}</p>
                <div className="flex items-center gap-1 mt-2">
                  <MapIcon className="w-3 h-3 text-gray-500" />
                  <span className="text-xs text-gray-600 truncate">{issue.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
