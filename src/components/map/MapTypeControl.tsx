'use client';

import React, { useState } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

interface MapType {
  name: string;
  url: string;
  attribution: string;
  preview: string;
}

interface MapTypeControlProps {
  position: 'topleft' | 'topright' | 'bottomleft' | 'bottomright';
  mapTypes: Record<string, MapType>;
  onMapTypeChange?: (type: string) => void;
  isSidebarOpen?: boolean;
}

const MapTypeControl: React.FC<MapTypeControlProps> = ({ position, mapTypes, onMapTypeChange, isSidebarOpen }) => {
  const map = useMap();
  const [isOpen, setIsOpen] = useState(false);
  const [activeType, setActiveType] = useState<string>('osm');
  
  const toggleOpen = () => setIsOpen(!isOpen);
  
  const changeMapType = (type: string) => {
    if (activeType === type) return;
    
    // Xóa layer hiện tại
    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });
    
    // Thêm layer mới
    const mapType = mapTypes[type];
    L.tileLayer(mapType.url, {
      attribution: mapType.attribution
    }).addTo(map);
    
    setActiveType(type);
    setIsOpen(false);
    
    // Gọi callback nếu được cung cấp
    if (onMapTypeChange) {
      onMapTypeChange(type);
    }
  };
  
  const controlStyle: React.CSSProperties = {
    transition: 'transform 0.5s ease-in-out',
    transform: isSidebarOpen ? 'translateX(24rem)' : 'translateX(0)',
  };

  return (
    <div className={`leaflet-control leaflet-bar custom-map-type-control ${position}`} style={controlStyle}>
      <div className="map-type-control">
        <button 
          className="map-type-button"
          onClick={toggleOpen}
          title="Chọn loại bản đồ"
          aria-label="Chọn loại bản đồ"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
            <line x1="8" y1="2" x2="8" y2="18"></line>
            <line x1="16" y1="6" x2="16" y2="22"></line>
          </svg>
        </button>
        
        {isOpen && (
          <div className="map-type-dropdown">
            {Object.entries(mapTypes).map(([key, mapType]) => (
              <div 
                key={key}
                className={`map-type-option ${activeType === key ? 'active' : ''}`}
                onClick={() => changeMapType(key)}
              >
                <div className="map-type-info">
                  <div className="map-type-name">{mapType.name}</div>
                  {mapType.preview && (
                    <div className="map-type-preview">
                      <div 
                        className="preview-image" 
                        style={{ backgroundImage: `url(${mapType.preview})` }}
                      ></div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MapTypeControl; 