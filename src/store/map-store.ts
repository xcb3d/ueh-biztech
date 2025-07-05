import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { LatLngExpression } from 'leaflet';

interface MapState {
  center: LatLngExpression;
  zoom: number;
  mapType: string;
  setMapView: (center: LatLngExpression, zoom: number) => void;
  setMapType: (mapType: string) => void;
}

export const useMapStore = create<MapState>()(
  persist(
    (set) => ({
      // Initial state matching MomentMap.tsx
      center: [16.0544, 107.1839],
      zoom: 6,
      mapType: 'osm',

      setMapView: (center, zoom) => set({ center, zoom }),
      setMapType: (mapType) => set({ mapType }),
    }),
    {
      name: 'map-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
); 