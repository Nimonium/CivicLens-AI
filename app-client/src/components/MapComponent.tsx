"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapPin } from "lucide-react";
import { renderToStaticMarkup } from "react-dom/server";

// Fix standard marker icon issue in Leaflet + Next.js
const createCustomIcon = (color: string) => {
  const iconMarkup = renderToStaticMarkup(
    <div style={{ color }}>
      <MapPin size={32} strokeWidth={2} fill="white" />
    </div>
  );
  
  return L.divIcon({
    html: iconMarkup,
    className: 'custom-leaflet-icon',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

const colors = {
  Pending: "#EF4444",      // Red
  "In Progress": "#F59E0B", // Yellow
  Resolved: "#10B981"       // Green
};

interface MapProps {
  center: [number, number];
  zoom: number;
  markers?: Array<{
    id: string;
    coordinates: [number, number];
    title: string;
    category: string;
    status: string;
  }>;
  interactive?: boolean;
}

function ChangeView({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

export default function MapComponent({ center, zoom, markers = [], interactive = true }: MapProps) {
  return (
    <div className="w-full h-full z-0 relative rounded-xl overflow-hidden shadow-inner border border-gray-200">
      <MapContainer 
        center={center} 
        zoom={zoom} 
        scrollWheelZoom={interactive}
        dragging={interactive}
        touchZoom={interactive}
        doubleClickZoom={interactive}
        zoomControl={interactive}
        className="w-full h-full z-0"
        style={{ background: '#f8f9fa' }}
      >
        <ChangeView center={center} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        
        {markers.map(marker => (
          <Marker 
            key={marker.id} 
            position={marker.coordinates}
            icon={createCustomIcon(colors[marker.status as keyof typeof colors] || colors.Pending)}
          >
            {interactive && (
              <Popup className="rounded-xl overflow-hidden">
                <div className="p-1">
                  <span className={`text-[10px] font-bold uppercase tracking-wider text-white px-2 py-0.5 rounded-full mb-1 inline-block ${
                    marker.status === 'Resolved' ? 'bg-green-500' : 
                    marker.status === 'In Progress' ? 'bg-blue-500' : 
                    'bg-red-500'
                  }`}>
                    {marker.status}
                  </span>
                  <h3 className="font-bold text-sm mb-1">{marker.title}</h3>
                  <p className="text-xs text-gray-500 mb-2">{marker.category}</p>
                  <a href={`/issue/${marker.id}`} className="text-xs font-semibold text-blue-600 hover:underline">
                    View Details →
                  </a>
                </div>
              </Popup>
            )}
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
