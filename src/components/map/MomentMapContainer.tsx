'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { MapProvider, useMapContext } from './MapContext';
import MapSidebar from './MapSidebar';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';
// import MemoryDetail from './MemoryDetail';

// Import the map component dynamically to avoid SSR issues with Leaflet
const MomentMapWithNoSSR = dynamic(
  () => import('./MomentMap'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-[calc(100vh-64px)] w-full bg-gray-100">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-700 font-medium">Đang tải bản đồ...</p>
        </div>
      </div>
    )
  }
);

const MapLayout = () => {
  const { state, dispatch } = useMapContext();

  return (
    <div className="flex h-[calc(100vh-64px)] relative">
      <MapSidebar />
      <motion.button
        onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
        className={`
            absolute top-1/2 -translate-y-1/2 z-30 
            backdrop-blur-md bg-white/70 shadow-lg
            transition-all duration-300 ease-in-out focus:outline-none
            ${
              state.isSidebarOpen
                ? 'left-[24rem] -translate-x-1/2 rounded-full p-2'
                : 'left-0 rounded-r-full py-4 px-1'
            }
        `}
        aria-label={state.isSidebarOpen ? "Đóng thanh bên" : "Mở thanh bên"}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <AnimatePresence mode="wait">
          {state.isSidebarOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronLeftIcon className="h-6 w-6 text-gray-800" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRightIcon className="h-5 w-5 text-gray-800" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
      <motion.div 
        className="flex-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <MomentMapWithNoSSR />
      </motion.div>
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