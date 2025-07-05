'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { MapProvider, useMapContext } from './MapContext';
import MapSidebar from './MapSidebar';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
// import MemoryDetail from './MemoryDetail';

// Import the map component dynamically to avoid SSR issues with Leaflet
const MomentMapWithNoSSR = dynamic(
  () => import('./MomentMap'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-[calc(100vh-64px)] w-full bg-gray-100">
        <p className="text-gray-500">Đang tải bản đồ...</p>
      </div>
    )
  }
);

const MapLayout = () => {
  const { state, dispatch } = useMapContext();

  return (
    <div className="flex h-[calc(100vh-64px)] relative">
      <MapSidebar />
      <button
        onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
        className={`
            absolute top-1/2 -translate-y-1/2 z-30 
            bg-white shadow-lg hover:bg-gray-100 
            transition-all duration-300 ease-in-out focus:outline-none
            ${
              state.isSidebarOpen
                ? 'left-[24rem] -translate-x-1/2 rounded-full p-2'
                : 'left-0 rounded-r-full py-4 px-1'
            }
        `}
        aria-label={state.isSidebarOpen ? "Đóng thanh bên" : "Mở thanh bên"}
      >
        {state.isSidebarOpen ? (
          <ChevronLeftIcon className="h-6 w-6 text-gray-800" />
        ) : (
          <ChevronRightIcon className="h-5 w-5 text-gray-800" />
        )}
      </button>
      <div className="flex-1">
        <MomentMapWithNoSSR />
      </div>
    </div>
  );
}

const MomentMapContainer: React.FC = () => {
  return (
    <MapProvider>
      <MapLayout />
    </MapProvider>
  );
};

export default MomentMapContainer; 