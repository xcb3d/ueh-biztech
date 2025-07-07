'use client';

import React, { useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import { storylines } from '@/data/storylineData';
import { moments as allMoments } from '@/data/momentData';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeftIcon, MapPinIcon, CalendarIcon, UserGroupIcon } from '@heroicons/react/24/solid';
import { ShareIcon } from '@heroicons/react/24/outline';
import MomentCard from '@/components/feed/MomentCard';
import { motion } from 'framer-motion';

export default function StorylineDetailPage() {
  const params = useParams();
  const storylineId = params.id as string;
  const [activeTab, setActiveTab] = useState<'moments' | 'map'>('moments');

  const storyline = storylines.find((s) => s.id === storylineId);

  if (!storyline) {
    notFound();
  }

  const momentsInStoryline = allMoments.filter(m => storyline.momentIds.includes(m.id));
  
  // Lấy vị trí dựa trên tiêu đề
  const getLocationFromTitle = () => {
    if (storyline.title.includes('Sài Gòn')) return 'TP. Hồ Chí Minh';
    if (storyline.title.includes('Hà Nội')) return 'Hà Nội';
    return 'Việt Nam';
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto max-w-5xl p-4">
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link href="/" className="inline-flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
            <ArrowLeftIcon className="h-5 w-5" />
            <span className="font-medium">Quay về Dòng chảy</span>
          </Link>
        </motion.div>

        <motion.div 
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200/80 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="relative w-full h-96">
            <Image 
              src={storyline.coverImage} 
              alt={storyline.title} 
              layout="fill" 
              objectFit="cover" 
              className="brightness-95"
              priority
            />
            {/* Overlay gradient with animation */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {/* Badge */}
              <motion.div
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold text-white bg-blue-600 shadow-lg mb-4 w-fit"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                style={{ boxShadow: '0 0 15px rgba(37, 99, 235, 0.5)' }}
              >
                <MapPinIcon className="h-4 w-4 mr-1" />
                TUYẾN HÀNH TRÌNH
              </motion.div>
              
              {/* Title with animation */}
              <motion.h1 
                className="text-4xl md:text-5xl font-bold text-white mb-3 drop-shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {storyline.title}
              </motion.h1>
              
              {/* Description with animation */}
              <motion.p 
                className="text-lg text-white/90 drop-shadow-md max-w-3xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                {storyline.description}
              </motion.p>
              
              {/* Location and stats */}
              <motion.div 
                className="flex flex-wrap items-center gap-4 mt-4 text-white/80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="flex items-center">
                  <MapPinIcon className="h-5 w-5 mr-1" />
                  <span>{getLocationFromTitle()}</span>
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="h-5 w-5 mr-1" />
                  <span>Tạo {new Date().toLocaleDateString('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center">
                  <UserGroupIcon className="h-5 w-5 mr-1" />
                  <span>{Math.floor(Math.random() * 100) + 5} người đã xem</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Author info with animation */}
          <motion.div 
            className="flex items-center justify-between p-6 border-b"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Image 
                  src={storyline.author.avatarUrl} 
                  alt={storyline.author.name} 
                  width={48} 
                  height={48} 
                  className="rounded-full ring-2 ring-blue-100 shadow-md"
                />
                <motion.div 
                  className="absolute inset-0 rounded-full"
                  animate={{ 
                    boxShadow: ['0 0 0 0 rgba(59, 130, 246, 0)', '0 0 0 4px rgba(59, 130, 246, 0.3)', '0 0 0 0 rgba(59, 130, 246, 0)'],
                  }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 2,
                  }}
                />
              </div>
              <div>
                <p className="font-semibold text-gray-800">{storyline.author.name}</p>
                <p className="text-sm text-gray-500">Người kể chuyện</p>
              </div>
            </div>
            
            {/* Share button */}
            <motion.button
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShareIcon className="h-5 w-5" />
              <span className="font-medium">Chia sẻ</span>
            </motion.button>
          </motion.div>
          
          {/* Tabs */}
          <div className="flex border-b">
            <button 
              className={`flex-1 py-4 font-medium text-center transition-colors ${activeTab === 'moments' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('moments')}
            >
              Khoảnh khắc ({momentsInStoryline.length})
            </button>
            <button 
              className={`flex-1 py-4 font-medium text-center transition-colors ${activeTab === 'map' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('map')}
            >
              Xem bản đồ
            </button>
          </div>
        </motion.div>
        
        {activeTab === 'moments' ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h2 
              className="text-2xl font-bold text-gray-800 mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Các khoảnh khắc trong hành trình:
            </motion.h2>
            
            <div className="space-y-6">
              {momentsInStoryline.map((moment, index) => (
                <motion.div
                  key={moment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <MomentCard moment={moment} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200/80 p-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <MapPinIcon className="h-16 w-16 text-blue-200 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Bản đồ hành trình</h3>
            <p className="text-gray-600 mb-6">Tính năng bản đồ sẽ được phát triển trong phiên bản tiếp theo.</p>
            <button 
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              onClick={() => setActiveTab('moments')}
            >
              Quay lại khoảnh khắc
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
} 