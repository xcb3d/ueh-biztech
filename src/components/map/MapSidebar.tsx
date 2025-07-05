'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { useMapContext } from './MapContext';
import { Location, Moment, Event } from '@/types/map-types';
import { locations as allLocations } from '@/data/locationData';
import { memories as allMoments } from '@/data/memoryData';
import { events as allEvents } from '@/data/eventData';
import SelectedPointDetail from './sidebar/SelectedPointDetail';
import MapOverview from './sidebar/MapOverview';

const MapSidebar: React.FC = () => {
  const { state, dispatch } = useMapContext();
  const { selectedLocation, isSidebarOpen } = state;

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Location[]>([]);

  const latestMoments = useMemo(() => {
    return allMoments
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 3);
  }, []);

  const upcomingEvents = useMemo(() => {
    const now = new Date();
    // Filter events that haven't ended yet
    return allEvents
      .filter(event => new Date(event.endTime) >= now)
      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
      .slice(0, 3); // Show top 3 upcoming events
  }, []);

  const isEventToday = (event: Event) => {
    const today = new Date();
    const startDate = new Date(event.startTime);
    return startDate.getDate() === today.getDate() && 
           startDate.getMonth() === today.getMonth() && 
           startDate.getFullYear() === today.getFullYear();
  };

  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    
    // If the event is today
    if (date.getDate() === today.getDate() && 
        date.getMonth() === today.getMonth() && 
        date.getFullYear() === today.getFullYear()) {
      return 'Hôm nay';
    }
    
    // If the event is tomorrow
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (date.getDate() === tomorrow.getDate() && 
        date.getMonth() === tomorrow.getMonth() && 
        date.getFullYear() === tomorrow.getFullYear()) {
      return 'Ngày mai';
    }
    
    // If the event is within the next 7 days
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    if (date < nextWeek) {
      const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
      return `${days[date.getDay()]}, ${date.getDate()}/${date.getMonth() + 1}`;
    }
    
    // Otherwise, return the full date
    return date.toLocaleDateString('vi-VN');
  };

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      return;
    }
    const filtered = allLocations.filter(location =>
      location.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(searchTerm.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
    );
    setSearchResults(filtered);
  }, [searchTerm]);

  const handleSearchResultClick = (location: Location) => {
    dispatch({ type: 'SELECT_LOCATION', payload: location });
    setSearchTerm('');
  };

  const handleThemeClick = (themeId: string) => {
    dispatch({ type: 'SET_THEME', payload: state.selectedTheme === themeId ? null : themeId });
  };

  const handleMomentClick = (moment: Moment) => {
    const location = allLocations.find(loc => loc.id === moment.locationId);
    if (location) {
      dispatch({ type: 'SELECT_LOCATION', payload: location });
    }
  }

  const goBackToMapOverview = () => {
    dispatch({ type: 'SELECT_LOCATION', payload: null });
  };

  return (
    <aside
      className={`absolute top-0 left-0 h-full bg-white shadow-lg z-[1000] transform transition-transform duration-500 ease-in-out flex flex-col
        ${isSidebarOpen ? 'translate-x-0 w-full md:w-96' : '-translate-x-full w-full md:w-96'}`}
    >
      {selectedLocation ? (
        <SelectedPointDetail 
          point={selectedLocation}
          onBack={goBackToMapOverview}
        />
      ) : (
        <MapOverview 
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          searchResults={searchResults}
          onSearchResultClick={handleSearchResultClick}
          showOnlyLocationsWithEvents={state.showOnlyLocationsWithEvents}
          onToggleEventsFilter={() => dispatch({ type: 'TOGGLE_EVENTS_FILTER' })}
          latestMoments={latestMoments}
          onMomentClick={handleMomentClick}
          upcomingEvents={upcomingEvents}
          isEventToday={isEventToday}
          formatEventDate={formatEventDate}
          allLocations={allLocations}
          selectedTheme={state.selectedTheme}
          onThemeClick={handleThemeClick}
        />
      )}
    </aside>
  );
};

export default MapSidebar; 