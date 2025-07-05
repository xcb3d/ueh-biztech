'use client';

import { useMapEvents } from 'react-leaflet';
import { useMapStore } from '@/store/map-store';

const MapEvents = () => {
  const setMapView = useMapStore((state) => state.setMapView);

  useMapEvents({
    moveend: (e) => {
      const map = e.target;
      const center = map.getCenter();
      setMapView([center.lat, center.lng], map.getZoom());
    },
    zoomend: (e) => {
      const map = e.target;
      const center = map.getCenter();
      setMapView([center.lat, center.lng], map.getZoom());
    },
  });

  return null;
};

export default MapEvents; 