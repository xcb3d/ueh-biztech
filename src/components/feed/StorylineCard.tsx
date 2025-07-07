'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Storyline } from '@/data/storylineData';
import { ArrowRightIcon, MapPinIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

interface StorylineCardProps {
  storyline: Storyline;
}

const StorylineCard: React.FC<StorylineCardProps> = ({ storyline }) => {
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200/80 hover:shadow-lg transition-all duration-300 group"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/storyline/${storyline.id}`} className="block">
        <div className="relative h-56 w-full overflow-hidden">
          <Image
            src={storyline.coverImage}
            alt={storyline.title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          
          {/* Badge with glow effect */}
          <div className="absolute top-4 left-4 z-10">
            <motion.div
              className="px-3 py-1.5 text-xs text-white bg-blue-600 rounded-full font-semibold shadow-lg flex items-center space-x-1"
              whileHover={{ scale: 1.05 }}
              style={{
                boxShadow: '0 0 15px rgba(37, 99, 235, 0.5)'
              }}
            >
              <MapPinIcon className="h-3 w-3 mr-1" />
              <span>TUYẾN HÀNH TRÌNH</span>
            </motion.div>
          </div>
          
          {/* Title overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-100 transition-colors">
              {storyline.title}
            </h3>
            
            {/* Location indicator - using city names from description */}
            <div className="flex items-center text-white/80 text-sm mb-2">
              <MapPinIcon className="h-4 w-4 mr-1" />
              <span>
                {storyline.title.includes('Sài Gòn') ? 'TP. Hồ Chí Minh' : 
                 storyline.title.includes('Hà Nội') ? 'Hà Nội' : 'Việt Nam'}
              </span>
            </div>
          </div>
        </div>
        
        <div className="p-5">
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{storyline.description}</p>
          
          {/* Moment count badge */}
          {storyline.momentIds && (
            <div className="mb-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-700">
                {storyline.momentIds.length} khoảnh khắc
              </span>
            </div>
          )}
          
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-3">
              <Image 
                src={storyline.author.avatarUrl} 
                alt={storyline.author.name}
                width={32}
                height={32}
                className="rounded-full ring-2 ring-white shadow"
              />
              <span className="text-sm font-medium text-gray-700">{storyline.author.name}</span>
            </div>
            <motion.div 
              className="flex items-center space-x-1 text-sm text-blue-600 font-semibold"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span>Khám phá</span>
              <ArrowRightIcon className="h-4 w-4" />
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default StorylineCard; 