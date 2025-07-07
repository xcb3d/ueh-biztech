'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap, ZoomControl, Tooltip, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import { useMapContext } from './MapContext';
import { events } from '@/data/eventData';
import MapTypeControl from './MapTypeControl';
import { MapPoint } from '@/types/map-types';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import { FeatureCollection } from 'geojson';
import { mapPoints } from '@/data/map-points';
import { useMapStore } from '@/store/map-store';
import MapEvents from './MapEvents';

// Hack for fixing Next.js + Leaflet icon issue
if (typeof window !== 'undefined') {
  // Ensure Leaflet's CSS and images are properly loaded
  // This is required because Leaflet expects its assets to be available in certain directories
}

// Giới hạn phạm vi bản đồ Việt Nam
const vietnamBounds = L.latLngBounds(
  L.latLng(8.18, 102.14),  // Góc tây nam
  L.latLng(23.39, 109.46)  // Góc đông bắc
);

const getRegionColor = (region: string): string => {
  switch (region) {
    case 'Bắc':
      return '#ef4444'; // Tailwind red-500
    case 'Trung':
      return '#3b82f6'; // Tailwind blue-500
    case 'Nam':
      return '#f97316'; // Tailwind orange-500
    default:
      return '#6b7280'; // Tailwind gray-500
  }
};

const createLocationIcon = (location: MapPoint, isSelected: boolean, hasEvents: boolean) => {
  const color = location.type === 'location' ? getRegionColor(location.region) : '#8b5cf6'; // Màu tím cho làng nghề
  const size = isSelected ? 56 : 44;
  const zIndex = isSelected ? 1000 : 'auto';
  
  // Thêm hiệu ứng pulse animation cho marker được chọn
  const pulseAnimation = isSelected ? `
    @keyframes pulse {
      0% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.1); opacity: 0.8; }
      100% { transform: scale(1); opacity: 1; }
    }
    @keyframes ripple {
      0% { transform: scale(0.8); opacity: 1; }
      100% { transform: scale(1.5); opacity: 0; }
    }
  ` : '';
  
  // Thêm hiệu ứng glow cho marker
  const glowEffect = `filter: drop-shadow(0px 0px 8px ${isSelected ? 'rgba(59, 130, 246, 0.7)' : 'rgba(0, 0, 0, 0.4)'});`;
  
  const iconHtml = `
    <style>
      ${pulseAnimation}
      .marker-container {
        position: relative;
        z-index: ${zIndex};
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }
      .marker-container:hover {
        transform: translateY(-5px);
      }
      .marker-svg {
        ${glowEffect}
        transition: all 0.3s ease;
      }
      ${isSelected ? `
        .pulse-circle {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: ${size * 1.3}px;
          height: ${size * 1.3}px;
          border-radius: 50%;
          background-color: ${color}40;
          animation: ripple 1.5s infinite ease-out;
          z-index: -1;
        }
        .marker-main {
          animation: pulse 2s infinite ease-in-out;
        }
      ` : ''}
    </style>
    <div class="marker-container">
      ${isSelected ? '<div class="pulse-circle"></div>' : ''}
      <div class="marker-main">
        <svg
          width="${size}"
          height="${size}"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="marker-svg"
        >
          <path
            d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
            fill="${color}"
          />
          ${location.type === 'craft-village' && !isSelected ? '<path d="M12 15a3 3 0 110-6 3 3 0 010 6zm0-2a1 1 0 100-2 1 1 0 000 2z" fill="white"/>' : ''}
          ${isSelected ? `<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="white" stroke-width="2" stroke-linejoin="round"/>` : ''}
        </svg>
        ${hasEvents ? `
          <div style="position: absolute; top: -5px; right: -5px; background: linear-gradient(45deg, #f59e0b, #facc15); width: 20px; height: 20px; border-radius: 9999px; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#422006" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </div>
        ` : ''}
      </div>
    </div>
  `;

  return new L.DivIcon({
    html: iconHtml,
    className: '',
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor:  [0, -size + 5]
  });
};

// Component to fly to a location when it's selected and handle map state
const MapController: React.FC = () => {
  const { state, dispatch } = useMapContext();
  const map = useMap();
  
  // Effect to fly to selected location
  useEffect(() => {
    if (state.selectedLocation) {
      map.flyTo([state.selectedLocation.coordinates.lat, state.selectedLocation.coordinates.lng], 15, {
        animate: true,
        duration: 1.5,
        easeLinearity: 0.25
      });
      
      // Đánh dấu kết thúc chuyển tiếp sau khi hoàn thành animation
      const transitionTimer = setTimeout(() => {
        dispatch({ type: 'SET_LOCATION_TRANSITION_COMPLETE' });
      }, 1600); // Thời gian hơi dài hơn duration để đảm bảo animation đã hoàn thành
      
      return () => clearTimeout(transitionTimer);
    }
  }, [map, state.selectedLocation, dispatch]);

  // Effect to invalidate map size when sidebar toggles
  useEffect(() => {
    // A short delay to allow the sidebar transition to complete
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 500); // Corresponds to the sidebar's transition duration

    return () => {
      clearTimeout(timer);
    };
  }, [map, state.isSidebarOpen]);

  return null;
};

// Map type definitions
const mapTypes = {
  osm: {
    name: "Tiêu chuẩn",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    preview: "https://a.tile.openstreetmap.org/7/105/55.png"
  },
  satellite: {
    name: "Vệ tinh",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP',
    preview: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/7/55/105"
  },
  terrain: {
    name: "Địa hình",
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://opentopomap.org">OpenTopoMap</a> contributors',
    preview: "https://a.tile.opentopomap.org/7/105/55.png"
  },
  dark: {
    name: "Tối",
    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    preview: "https://a.basemaps.cartocdn.com/dark_all/7/105/55.png"
  },
  light: {
    name: "Sáng",
    url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    preview: "https://a.basemaps.cartocdn.com/light_all/7/105/55.png"
  }
};

const MomentMap: React.FC = () => {
  const { state, dispatch } = useMapContext();
  const { center, zoom, mapType, setMapType } = useMapStore();
  const [provincesData, setProvincesData] = useState<FeatureCollection | null>(null);

  const locationHasEvents = useMemo(() => {
    return new Set(events.map(e => e.locationId));
  }, []);

  useEffect(() => {
    fetch('/data/vietnam_provinces.geojson')
      .then(response => {
        if (!response.ok) {
          // If the file is not found, we just log it and don't show the layer.
          console.log('Boundary data (vietnam_provinces.geojson) not found. Skipping layer.');
          return null;
        }
        return response.json();
      })
      .then(data => {
        if (data) {
          setProvincesData(data);
        }
      })
      .catch(error => {
        console.error('Error loading GeoJSON data:', error);
      });
  }, []);
  
  // Filter locations based on events filter
  const visiblePoints = useMemo(() => {
    // Lọc theo sự kiện
    let filteredPoints = state.showOnlyLocationsWithEvents 
      ? mapPoints.filter(point => {
          // Chỉ hiển thị các điểm có sự kiện, bao gồm cả làng nghề
          return locationHasEvents.has(point.id);
        })
      : mapPoints;
    
    // Lọc theo chủ đề/danh mục được chọn
    const { selectedTheme } = state;
    if (selectedTheme) {
      filteredPoints = filteredPoints.filter(point => {
        // Hiển thị làng nghề khi chọn 'lang-nghe'
        if (selectedTheme === 'lang-nghe' && point.type === 'craft-village') {
          return true;
        }
        // Hiển thị địa điểm khi category khớp với selectedTheme
        if (point.type === 'location' && point.category === selectedTheme) {
          return true;
        }
        return false;
      });
    }
    
    return filteredPoints;
  }, [state.showOnlyLocationsWithEvents, locationHasEvents, state.selectedTheme]);

  return (
    <div className="h-full w-full">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
        maxBounds={vietnamBounds}
        maxBoundsViscosity={1.0}
        minZoom={5}
        maxZoom={18}
      >
        <MapEvents />
        <TileLayer
          attribution={mapTypes[mapType as keyof typeof mapTypes].attribution}
          url={mapTypes[mapType as keyof typeof mapTypes].url}
        />
        
        {provincesData && <GeoJSON data={provincesData} style={{
          color: '#4a5568', // gray-700
          weight: 1,
          opacity: 0.6,
          fillOpacity: 0.1
        }} />}
        
        <ZoomControl position="bottomright" />
        <MapController />
        
        <MapTypeControl 
          position="topleft" 
          mapTypes={mapTypes} 
          onMapTypeChange={setMapType} 
          isSidebarOpen={state.isSidebarOpen}
        />
        
        <div className="marker-group">
          {visiblePoints.map((point) => {
            const isSelected = state.selectedLocation?.id === point.id;
            // Tạm thời coi như làng nghề không có event
            const hasEvents = point.type === 'location' ? locationHasEvents.has(point.id) : false;

            return (
              <Marker
                key={point.id}
                position={[point.coordinates.lat, point.coordinates.lng]}
                icon={createLocationIcon(point, isSelected, hasEvents)}
                eventHandlers={{
                  click: () => {
                    dispatch({ type: 'SELECT_LOCATION', payload: point });
                  },
                }}
              >
                <Tooltip>
                  <span className="font-bold">{point.name}</span>
                </Tooltip>
              </Marker>
            );
          })}
        </div>
      </MapContainer>
    </div>
  );
};

export default MomentMap; 