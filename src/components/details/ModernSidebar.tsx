'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaLightbulb, FaBookOpen, FaMemory, FaCompass } from 'react-icons/fa';

interface ModernSidebarProps {
  summary: string;
  historicalFact: string;
  relatedMemories: { id: string; title: string }[];
  locationId: string;
}

const ModernSidebar: React.FC<ModernSidebarProps> = ({
  summary,
  historicalFact,
  relatedMemories,
  locationId,
}) => {
  return (
    <>
      {/* Summary Card */}
      <motion.div 
        className="bg-white rounded-xl p-6 shadow-sm border border-neutral-100"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
      >
        <div className="flex items-center mb-4">
          <FaMapMarkerAlt className="text-red-500 mr-2" size={18} />
          <h3 className="text-lg font-semibold text-neutral-800">Tóm tắt</h3>
        </div>
        <p className="text-neutral-600 leading-relaxed">{summary}</p>
      </motion.div>
      
      {/* Historical Fact Card */}
      <motion.div 
        className="bg-white rounded-xl p-6 shadow-sm border border-neutral-100"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
      >
        <div className="flex items-center mb-4">
          <FaLightbulb className="text-amber-500 mr-2" size={18} />
          <h3 className="text-lg font-semibold text-neutral-800">Sự kiện lịch sử</h3>
        </div>
        <p className="text-neutral-600 italic leading-relaxed">{historicalFact}</p>
      </motion.div>
      
      {/* Related Memories Card */}
      <motion.div 
        className="bg-white rounded-xl p-6 shadow-sm border border-neutral-100"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
      >
        <div className="flex items-center mb-4">
          <FaMemory className="text-purple-500 mr-2" size={18} />
          <h3 className="text-lg font-semibold text-neutral-800">
            Ký ức liên quan <span className="bg-purple-100 text-purple-700 text-xs py-0.5 px-2 rounded-full">{relatedMemories.length}</span>
          </h3>
        </div>
        
        {relatedMemories.length > 0 ? (
          <div className="space-y-4">
            <ul className="space-y-3">
              {relatedMemories.slice(0, 3).map(memory => (
                <li key={memory.id} className="text-neutral-600 flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span>{memory.title}</span>
                </li>
              ))}
            </ul>
            <Link 
              href={`/#memory-feed-for-${locationId}`} 
              className="inline-block px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-lg text-sm font-medium transition-colors"
            >
              Xem tất cả
            </Link>
          </div>
        ) : (
          <div className="bg-neutral-50 p-4 rounded-lg text-center">
            <p className="text-neutral-500 text-sm mb-2">Chưa có ký ức nào được chia sẻ.</p>
            <Link
              href={`/create/memory?locationId=${locationId}`}
              className="text-purple-600 text-sm font-medium hover:underline"
            >
              + Chia sẻ ký ức của bạn
            </Link>
          </div>
        )}
      </motion.div>
      
      {/* Reading Guide */}
      <motion.div 
        className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 shadow-sm border border-blue-100"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
      >
        <div className="flex items-center mb-4">
          <FaBookOpen className="text-blue-500 mr-2" size={18} />
          <h3 className="text-lg font-semibold text-neutral-800">Hướng dẫn đọc</h3>
        </div>
        <ul className="space-y-2 text-sm text-neutral-600">
          <li className="flex items-start">
            <span className="text-blue-400 mr-2">•</span>
            <span>Kéo chuột để xoay mô hình 3D</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-400 mr-2">•</span>
            <span>Cuộn chuột để phóng to/thu nhỏ</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-400 mr-2">•</span>
            <span>Nhấn vào nút chia sẻ để gửi cho bạn bè</span>
          </li>
        </ul>
      </motion.div>
      
      {/* Explore More Button */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Link 
          href="/map" 
          className="inline-flex items-center justify-center px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-neutral-800 transition-colors w-full"
        >
          <FaCompass className="mr-2" />
          Khám phá thêm địa điểm
        </Link>
      </motion.div>
    </>
  );
};

export default ModernSidebar; 