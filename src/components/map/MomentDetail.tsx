'use client';

import React, { useEffect } from 'react';
import { useMapContext } from './MapContext';

const MemoryDetail: React.FC = () => {
  const { state, dispatch } = useMapContext();
  const { selectedLocation, isSidebarOpen } = state;

  // Close the detail panel with Escape key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isSidebarOpen) {
        dispatch({ type: 'TOGGLE_SIDEBAR' });
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [isSidebarOpen, dispatch]);

  if (!selectedLocation || !isSidebarOpen) {
    return null;
  }

  const handleClose = () => {
    dispatch({ type: 'TOGGLE_SIDEBAR' });
  };

  return (
    <div className="fixed top-0 right-0 h-full w-full md:w-96 bg-white/95 backdrop-blur-md shadow-lg overflow-y-auto z-[1000] border-l border-gray-100 animate-slideInRight">
      <div className="relative flex flex-col h-full">
        <div className="p-4">
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all z-20 group"
            aria-label="Đóng"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <h2 className="text-2xl font-bold mb-4">{selectedLocation.name}</h2>
          
          <p className="text-gray-700 mb-4">Location ID: {selectedLocation.id}</p>
        </div>
      </div>
    </div>
  );
};

export default MemoryDetail; 