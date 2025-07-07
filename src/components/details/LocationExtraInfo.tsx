'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaClock, FaUmbrella, FaInfoCircle } from 'react-icons/fa';
import { Coordinate } from '@/types/map-types';

interface LocationExtraInfoProps {
  coordinates: Coordinate;
  region: string;
  openingHours?: string;
  bestTimeToVisit?: string;
  visitorTips?: string;
}

const LocationExtraInfo: React.FC<LocationExtraInfoProps> = ({ 
  coordinates, 
  region,
  openingHours,
  bestTimeToVisit,
  visitorTips 
}) => {
  // Giả lập dữ liệu thời tiết dựa trên vùng
  const weatherInfo = React.useMemo(() => {
    const weathers = {
      'Bắc': { temp: '24°C', condition: 'Nắng nhẹ', icon: '☀️' },
      'Trung': { temp: '32°C', condition: 'Nắng nóng', icon: '🔥' },
      'Nam': { temp: '28°C', condition: 'Mưa rào', icon: '🌧️' },
    };
    return weathers[region as keyof typeof weathers] || weathers['Trung'];
  }, [region]);

  return (
    <motion.div 
      className="bg-white rounded-xl overflow-hidden shadow-sm border border-neutral-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <div className="p-4 bg-gradient-to-r from-neutral-50 to-neutral-100 border-b border-neutral-100">
        <h3 className="text-lg font-semibold text-neutral-800">Thông tin hữu ích</h3>
      </div>
      
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Thời tiết */}
        <div className="flex items-center p-3 bg-neutral-50 rounded-lg">
          <div className="mr-3 text-2xl">{weatherInfo.icon}</div>
          <div>
            <p className="text-sm text-neutral-500">Thời tiết hiện tại</p>
            <p className="font-medium">{weatherInfo.temp} - {weatherInfo.condition}</p>
          </div>
        </div>
        
        {/* Giờ mở cửa */}
        <div className="flex items-center p-3 bg-neutral-50 rounded-lg">
          <FaClock className="mr-3 text-amber-500" size={20} />
          <div>
            <p className="text-sm text-neutral-500">Giờ mở cửa</p>
            <p className="font-medium">{openingHours || 'Đang cập nhật'}</p>
          </div>
        </div>
        
        {/* Thời điểm tham quan tốt nhất */}
        <div className="flex items-center p-3 bg-neutral-50 rounded-lg">
          <FaUmbrella className="mr-3 text-blue-500" size={20} />
          <div>
            <p className="text-sm text-neutral-500">Thời điểm tham quan tốt nhất</p>
            <p className="font-medium">{bestTimeToVisit || 'Quanh năm'}</p>
          </div>
        </div>
        
        {/* Tọa độ */}
        <div className="flex items-center p-3 bg-neutral-50 rounded-lg">
          <FaMapMarkerAlt className="mr-3 text-red-500" size={20} />
          <div>
            <p className="text-sm text-neutral-500">Tọa độ</p>
            <p className="font-bold text-lg text-neutral-800 tracking-wider">{coordinates.lat.toFixed(5)}, {coordinates.lng.toFixed(5)}</p>
          </div>
        </div>
      </div>
      
      {/* Bản đồ nhỏ */}
      <div className="px-4 pb-4">
        <div className="h-72 bg-neutral-100 rounded-lg overflow-hidden relative">
          <iframe
            src={`https://maps.google.com/maps?q=${coordinates.lat},${coordinates.lng}&z=15&output=embed`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Location Map"
          ></iframe>
          <div className="absolute bottom-2 right-2 bg-white px-2 py-1 rounded text-xs">
            <a href={`https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.lng}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              Mở Google Maps
            </a>
          </div>
        </div>
      </div>
      
      {/* Mẹo du lịch */}
      {visitorTips && (
        <div className="p-4 border-t border-neutral-100">
          <div className="flex items-start">
            <FaInfoCircle className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
            <p className="text-sm text-neutral-600">
              {visitorTips}
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default LocationExtraInfo; 