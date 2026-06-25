"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Map as MapIcon, PlusCircle, MessageSquare, User, Search } from "lucide-react";

export function TopNav() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Map", path: "/map" },
    { name: "Feed", path: "/feed" },
    { name: "Profile", path: "/profile" },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40 w-full border-b border-gray-200">
      <div className="hidden md:flex justify-between items-center px-6 w-full max-w-7xl mx-auto h-16">
        <div className="flex items-center gap-2">
          <div className="text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path></svg>
          </div>
          <span className="text-xl font-bold text-blue-600">Community Hero</span>
        </div>
        
        <nav className="flex gap-6 h-full items-center">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`h-full flex items-center px-2 text-sm font-medium transition-colors border-b-2 ${
                  isActive 
                    ? "border-blue-600 text-blue-600" 
                    : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
        
        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-500 rounded-full hover:bg-gray-100">
            <Search className="w-5 h-5" />
          </button>
          <Link href="/report" className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors">
            Report Now
          </Link>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="flex md:hidden justify-between items-center px-4 h-14">
        <div className="text-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path></svg>
        </div>
        <span className="text-lg font-bold text-blue-600">Community Hero</span>
        <button className="text-gray-500 p-1">
          <Search className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed md:hidden bottom-0 w-full z-50 flex justify-around items-center px-4 py-2 pb-safe bg-white border-t border-gray-200 shadow-lg rounded-t-xl">
      <Link href="/" className={`flex flex-col items-center justify-center rounded-full px-4 py-1 transition-colors ${pathname === '/' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:bg-gray-100'}`}>
        <Home className="w-6 h-6" />
        <span className="text-xs mt-1">Home</span>
      </Link>
      
      <Link href="/map" className={`flex flex-col items-center justify-center rounded-xl p-2 transition-colors ${pathname === '/map' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:bg-gray-100'}`}>
        <MapIcon className="w-6 h-6" />
        <span className="text-xs mt-1">Map</span>
      </Link>

      <div className="relative -top-6">
        <Link href="/report" className="bg-blue-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-colors">
          <PlusCircle className="w-8 h-8" />
        </Link>
      </div>

      <Link href="/feed" className={`flex flex-col items-center justify-center rounded-xl p-2 transition-colors ${pathname === '/feed' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:bg-gray-100'}`}>
        <MessageSquare className="w-6 h-6" />
        <span className="text-xs mt-1">Feed</span>
      </Link>

      <Link href="/profile" className={`flex flex-col items-center justify-center rounded-xl p-2 transition-colors ${pathname === '/profile' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:bg-gray-100'}`}>
        <User className="w-6 h-6" />
        <span className="text-xs mt-1">Profile</span>
      </Link>
    </nav>
  );
}
