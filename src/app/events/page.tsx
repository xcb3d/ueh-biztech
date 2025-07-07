'use client';

import React, { useState, useMemo } from 'react';
import { events } from '@/data/eventData';
import { locations } from '@/data/locationData';
import Image from 'next/image';
import Link from 'next/link';

export default function EventsPage() {
  const [regionFilter, setRegionFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'upcoming' | 'latest'>('upcoming');
  
  // Get current date for filtering
  const now = new Date();
  
  // Prepare events with location data
  const eventsWithLocation = useMemo(() => {
    return events.map(event => {
      const location = locations.find(loc => loc.id === event.locationId);
      return { ...event, location };
    });
  }, []);
  
  // Filter and sort events
  const filteredEvents = useMemo(() => {
    // First filter by region if a filter is selected
    let filtered = eventsWithLocation;
    if (regionFilter) {
      filtered = filtered.filter(event => event.location?.region === regionFilter);
    }
    
    // Only show events that haven't ended yet
    filtered = filtered.filter(event => new Date(event.endTime) >= now);
    
    // Sort based on user selection
    if (sortBy === 'upcoming') {
      return filtered.sort((a, b) => 
        new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
      );
    } else {
      return filtered.sort((a, b) => 
        new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
      );
    }
  }, [eventsWithLocation, regionFilter, sortBy, now]);
  
  // Format date in a friendly way
  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { 
      day: 'numeric', 
      month: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Check if an event is happening today
  const isEventToday = (startTime: string, endTime: string) => {
    const today = new Date();
    const start = new Date(startTime);
    const end = new Date(endTime);
    
    return (
      start.getDate() <= today.getDate() && 
      end.getDate() >= today.getDate() &&
      start.getMonth() <= today.getMonth() && 
      end.getMonth() >= today.getMonth() &&
      start.getFullYear() <= today.getFullYear() && 
      end.getFullYear() >= today.getFullYear()
    );
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Sự kiện Du lịch Việt Nam</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Khám phá các sự kiện văn hóa, lễ hội và hoạt động đặc sắc đang diễn ra tại các địa điểm du lịch trên khắp Việt Nam.
          </p>
        </header>
        
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => setRegionFilter(null)} 
                className={`px-4 py-2 rounded-full text-sm font-medium ${!regionFilter ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
              >
                Tất cả
              </button>
              <button 
                onClick={() => setRegionFilter('Bắc')} 
                className={`px-4 py-2 rounded-full text-sm font-medium ${regionFilter === 'Bắc' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
              >
                Miền Bắc
              </button>
              <button 
                onClick={() => setRegionFilter('Trung')} 
                className={`px-4 py-2 rounded-full text-sm font-medium ${regionFilter === 'Trung' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
              >
                Miền Trung
              </button>
              <button 
                onClick={() => setRegionFilter('Nam')} 
                className={`px-4 py-2 rounded-full text-sm font-medium ${regionFilter === 'Nam' ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
              >
                Miền Nam
              </button>
            </div>
            
            <div className="flex items-center">
              <label className="text-sm font-medium text-gray-700 mr-2">Sắp xếp:</label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value as 'upcoming' | 'latest')}
                className="bg-gray-100 border border-gray-300 text-gray-700 py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="upcoming">Sắp diễn ra</option>
                <option value="latest">Mới nhất</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map(event => (
              <Link href={`/event/${event.id}`} key={event.id}>
                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                  <div className="relative h-48">
                    <Image 
                      src={event.heroImage} 
                      alt={event.name}
                      layout="fill"
                      objectFit="cover"
                    />
                    {isEventToday(event.startTime, event.endTime) && (
                      <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        Đang diễn ra
                      </div>
                    )}
                    {event.location && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full mr-2 ${
                            event.location.region === 'Bắc' ? 'bg-red-500' : 
                            event.location.region === 'Trung' ? 'bg-blue-500' : 'bg-orange-500'
                          }`}></div>
                          <p className="text-white text-sm font-medium">{event.location.region}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-5 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{event.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.summary}</p>
                    
                    <div className="mt-auto space-y-2">
                      <div className="flex items-center text-sm text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{formatEventDate(event.startTime)}</span>
                      </div>
                      
                      {event.location && (
                        <div className="flex items-center text-sm text-gray-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>{event.location.name}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="mt-4 text-xl font-semibold text-gray-800">Không tìm thấy sự kiện nào</h3>
            <p className="mt-2 text-gray-600">Không có sự kiện nào phù hợp với bộ lọc đã chọn.</p>
            <button 
              onClick={() => setRegionFilter(null)} 
              className="mt-4 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Xem tất cả sự kiện
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 