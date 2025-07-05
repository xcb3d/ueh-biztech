'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { MapContextState, MapContextAction } from '@/types/map-types';

// Initial state for the map context
const initialState: MapContextState = {
  selectedLocation: null,
  selectedTheme: null,
  isSidebarOpen: true,
  showOnlyLocationsWithEvents: false,
};

const MapContext = createContext<{
  state: MapContextState;
  dispatch: React.Dispatch<MapContextAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

// Reducer function to handle state updates
const mapReducer = (state: MapContextState, action: MapContextAction): MapContextState => {
  switch (action.type) {
    case 'SELECT_LOCATION':
      const newSelectedLocation = state.selectedLocation?.id === action.payload?.id ? null : action.payload;
      return {
        ...state,
        selectedLocation: newSelectedLocation,
        isSidebarOpen: !!newSelectedLocation || state.isSidebarOpen, // Open sidebar when a location is selected
      };
    case 'SET_THEME':
      return {
        ...state,
        selectedTheme: action.payload,
      };
    case 'TOGGLE_SIDEBAR':
      return {
        ...state,
        isSidebarOpen: !state.isSidebarOpen,
      };
    case 'TOGGLE_EVENTS_FILTER':
      return {
        ...state,
        showOnlyLocationsWithEvents: !state.showOnlyLocationsWithEvents,
      };
    default:
      return state;
  }
};

// The provider component that wraps the part of the app that needs access to the context
export const MapProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(mapReducer, initialState);

  return (
    <MapContext.Provider value={{ state, dispatch }}>
      {children}
    </MapContext.Provider>
  );
};

// Custom hook for easy context access
export const useMapContext = () => useContext(MapContext); 