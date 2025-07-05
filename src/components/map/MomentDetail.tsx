'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useMapContext } from './MapContext';
import { memoryTypes } from '@/data/memoryData';

const MemoryDetail: React.FC = () => {
  const { state, dispatch } = useMapContext();
  const { selectedPoint, isDetailOpen } = state;

  // Close the detail panel with Escape key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isDetailOpen) {
        dispatch({ type: 'TOGGLE_DETAIL', payload: false });
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [isDetailOpen, dispatch]);

  if (!selectedPoint || !isDetailOpen) {
    return null;
  }

  const typeInfo = memoryTypes[selectedPoint.type as keyof typeof memoryTypes];

  const handleClose = () => {
    dispatch({ type: 'TOGGLE_DETAIL', payload: false });
  };

  return (
    <div className={`
      fixed top-0 right-0 h-full w-full md:w-96 bg-white/95 backdrop-blur-md shadow-lg 
      overflow-y-auto z-[1000] border-l border-gray-100 animate-slideInRight
    `}>
      <div className="relative flex flex-col h-full">
        {/* Header Image */}
        <div className="h-56 w-full relative flex-shrink-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
          <Image
            src={selectedPoint.mediaUrl}
            alt={selectedPoint.title}
            fill
            sizes="(max-width: 768px) 100vw, 384px"
            priority
            style={{ objectFit: 'cover' }}
            className="brightness-[0.98] transition-all duration-500"
          />
          
          {/* Close button */}
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all z-20 group"
            aria-label="Đóng"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Memory type badge */}
          <div className="absolute top-4 left-4 z-20">
            <span 
              className="text-xs font-medium px-3 py-1 rounded-full text-white shadow-sm flex items-center"
              style={{ backgroundColor: typeInfo.color }}
            >
              <span className="w-1.5 h-1.5 bg-white rounded-full mr-1.5 opacity-80"></span>
              {typeInfo.name}
            </span>
          </div>
          
          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
            <h2 className="text-2xl font-bold text-white mb-1 drop-shadow-sm">{selectedPoint.title}</h2>
            <p className="text-white/90 text-sm flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {selectedPoint.province}
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Content */}
          <div className="p-6">
            <div className="flex items-center justify-between text-sm text-gray-500 mb-5">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {selectedPoint.viewCount} lượt xem
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {new Date(selectedPoint.createdAt).toLocaleDateString('vi-VN')}
              </div>
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-6">{selectedPoint.summary}</p>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {selectedPoint.category.map(cat => (
                <span 
                  key={cat} 
                  className="text-xs bg-gray-100 px-3 py-1.5 rounded-full text-gray-600 hover:bg-gray-200 transition-colors"
                >
                  {cat}
                </span>
              ))}
            </div>
            
            <Link 
              href={selectedPoint.storyUrl}
              className="block w-full text-center bg-primary hover:bg-primary-dark text-white py-3 px-4 rounded-lg transition-colors font-medium shadow-sm hover:shadow"
            >
              Đọc câu chuyện đầy đủ
            </Link>
          </div>

          {/* Related stories */}
          <div className="px-6 pt-4 pb-6 border-t border-gray-100">
            <h3 className="font-medium text-gray-800 mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Câu chuyện liên quan
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 group cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                <div className="w-16 h-16 bg-gray-100 rounded-md flex-shrink-0 overflow-hidden relative">
                  <Image 
                    src="https://source.unsplash.com/random/100x100?vietnamese,craft" 
                    alt="Nghệ thuật chạm khắc gỗ"
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div className="group-hover:text-primary transition-colors">
                  <p className="font-medium text-sm">Nghệ thuật chạm khắc gỗ Việt Nam</p>
                  <p className="text-xs text-gray-500 mt-1">Hà Nội</p>
                </div>
              </div>
              <div className="flex items-center gap-3 group cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                <div className="w-16 h-16 bg-gray-100 rounded-md flex-shrink-0 overflow-hidden relative">
                  <Image 
                    src="https://source.unsplash.com/random/100x100?vietnamese,house" 
                    alt="Kiến trúc nhà sàn"
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div className="group-hover:text-primary transition-colors">
                  <p className="font-medium text-sm">Kiến trúc nhà sàn truyền thống</p>
                  <p className="text-xs text-gray-500 mt-1">Hòa Bình</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryDetail; 