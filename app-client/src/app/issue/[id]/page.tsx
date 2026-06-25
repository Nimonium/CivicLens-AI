"use client";

import { useState, use } from "react";
import dynamic from "next/dynamic";
import { mockIssues } from "@/lib/mockData";
import { MapPin, CheckCircle, Clock, CheckCircle2, AlertCircle, Share2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Dynamically import map to avoid SSR issues with Leaflet
const MapComponent = dynamic(() => import("@/components/MapComponent"), { ssr: false, loading: () => <div className="w-full h-full bg-gray-100 animate-pulse rounded-xl" /> });

export default function IssueDetails({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const issue = mockIssues.find(i => i.id === resolvedParams.id);
  
  const [verificationCount, setVerificationCount] = useState(issue?.verificationCount || 0);
  const [hasVerified, setHasVerified] = useState(false);

  if (!issue) {
    return notFound();
  }

  const handleVerify = () => {
    if (!hasVerified) {
      setVerificationCount(prev => prev + 1);
      setHasVerified(true);
    }
  };

  return (
    <div className="max-w-3xl mx-auto pb-24 md:pb-8 bg-white min-h-screen md:min-h-0 md:rounded-2xl md:shadow-sm md:my-6 md:border md:border-gray-200 overflow-hidden">
      {/* Mobile Top Bar (Overlay on image) */}
      <div className="relative h-64 md:h-96 w-full bg-gray-900 group">
        <Link href="/feed" className="absolute top-4 left-4 z-10 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur-sm transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <button className="absolute top-4 right-4 z-10 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur-sm transition-colors">
          <Share2 className="w-5 h-5" />
        </button>
        <img src={issue.imageUrl} alt={issue.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
        
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <div className="flex gap-2 mb-2">
            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              {issue.category}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm ${
              issue.status === 'Resolved' ? 'bg-green-500' : 
              issue.status === 'In Progress' ? 'bg-blue-500' : 
              'bg-red-500'
            }`}>
              {issue.status}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold leading-tight">{issue.title}</h1>
        </div>
      </div>

      <div className="p-4 md:p-8">
        {/* Reporter Info */}
        <div className="flex justify-between items-center pb-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <img src={issue.reporterAvatar} alt={issue.reporter} className="w-10 h-10 rounded-full border-2 border-gray-100 object-cover" />
            <div>
              <p className="font-semibold text-gray-900">{issue.reporter}</p>
              <p className="text-xs text-gray-500">{issue.timestamp}</p>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Verifications</p>
            <p className="text-xl font-bold text-blue-600">{verificationCount}</p>
          </div>
        </div>

        {/* Description */}
        <div className="py-6">
          <h2 className="text-lg font-bold mb-3 text-gray-900">Description</h2>
          <p className="text-gray-600 leading-relaxed">{issue.description}</p>
        </div>

        {/* Action Button */}
        <div className="pb-6">
          <button 
            onClick={handleVerify}
            disabled={hasVerified || issue.status === 'Resolved'}
            className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold text-lg transition-all shadow-sm ${
              hasVerified 
                ? 'bg-green-50 text-green-700 border border-green-200' 
                : issue.status === 'Resolved'
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-md hover:-translate-y-0.5'
            }`}
          >
            {hasVerified ? (
              <>
                <CheckCircle className="w-6 h-6" />
                You Verified This
              </>
            ) : issue.status === 'Resolved' ? (
              "Issue Resolved"
            ) : (
              <>
                <CheckCircle2 className="w-6 h-6" />
                Verify this issue
              </>
            )}
          </button>
          {!hasVerified && issue.status !== 'Resolved' && (
            <p className="text-center text-xs text-gray-500 mt-2">
              {verificationCount} neighbors have verified this issue.
            </p>
          )}
        </div>

        {/* Location Map */}
        <div className="py-6 border-t border-gray-100">
          <h2 className="text-lg font-bold mb-1 flex items-center gap-2 text-gray-900">
            <MapPin className="w-5 h-5 text-gray-500" />
            Location
          </h2>
          <p className="text-sm text-gray-500 mb-4 ml-7">{issue.location}</p>
          <div className="h-48 w-full rounded-2xl overflow-hidden shadow-sm border border-gray-200">
            <MapComponent 
              center={issue.coordinates as [number, number]} 
              zoom={15} 
              markers={[{ ...issue, coordinates: issue.coordinates as [number, number] }]} 
              interactive={false} 
            />
          </div>
          <button className="w-full mt-3 py-2 text-blue-600 text-sm font-semibold border border-blue-100 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors">
            Get Directions
          </button>
        </div>

        {/* Activity Timeline */}
        <div className="py-6 border-t border-gray-100">
          <h2 className="text-lg font-bold mb-6 text-gray-900">Activity Timeline</h2>
          <div className="relative pl-6 space-y-6">
            {/* Vertical Line */}
            <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-gray-200" />
            
            {issue.timeline.map((event, idx) => (
              <div key={event.id} className="relative">
                {/* Timeline dot */}
                <div className={`absolute -left-6 top-1 w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm ${
                  event.status === 'Resolved' ? 'bg-green-500' : 
                  event.status === 'In Progress' ? 'bg-blue-500' : 
                  event.status === 'Verified' ? 'bg-indigo-500' :
                  'bg-gray-400'
                }`} />
                
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-sm text-gray-900">{event.status}</h3>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {event.date}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{event.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
