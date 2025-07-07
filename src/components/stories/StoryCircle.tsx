'use client';

import React from 'react';
import Image from 'next/image';
import { User } from '@/types/map-types';
import { getUserStories, hasUnviewedStories } from '@/data/storyData';
import { motion } from 'framer-motion';

interface StoryCircleProps {
  user: User;
  onOpenStory: (userId: string) => void;
  size?: 'sm' | 'md' | 'lg';
  showName?: boolean;
}

const StoryCircle: React.FC<StoryCircleProps> = ({ 
  user, 
  onOpenStory, 
  size = 'md',
  showName = true 
}) => {
  const hasUnviewed = hasUnviewedStories(user.id);
  const userStories = getUserStories(user.id);
  
  // Kích thước dựa trên prop size
  const dimensions = {
    sm: { outer: 'w-16 h-16', inner: 'w-14 h-14', text: 'text-xs' },
    md: { outer: 'w-20 h-20', inner: 'w-[4.5rem] h-[4.5rem]', text: 'text-sm' },
    lg: { outer: 'w-24 h-24', inner: 'w-[5.5rem] h-[5.5rem]', text: 'text-base' }
  };
  
  // Tính toán thời gian còn lại của story
  const getTimeRemaining = () => {
    if (userStories.length === 0) return '';
    
    const latestStory = userStories[0];
    const expiryTime = new Date(latestStory.expiresAt).getTime();
    const now = Date.now();
    const timeLeft = expiryTime - now;
    
    if (timeLeft <= 0) return 'Hết hạn';
    
    const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
    if (hoursLeft > 0) return `${hoursLeft}h`;
    
    const minutesLeft = Math.floor(timeLeft / (1000 * 60));
    return `${minutesLeft}m`;
  };

  return (
    <div className="flex flex-col items-center">
      <motion.div 
        className={`${dimensions[size].outer} relative cursor-pointer`}
        onClick={() => onOpenStory(user.id)}
        whileTap={{ scale: 0.95 }}
      >
        {/* Gradient border cho stories chưa xem */}
        {hasUnviewed ? (
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-500"></div>
        ) : (
          <div className="absolute inset-0 rounded-full bg-gray-200"></div>
        )}
        
        {/* Avatar */}
        <div className="absolute inset-0 m-[2px] rounded-full overflow-hidden bg-white flex items-center justify-center">
          <div className={`relative ${dimensions[size].inner} rounded-full overflow-hidden`}>
            <Image
              src={user.avatarUrl}
              alt={user.name}
              layout="fill"
              objectFit="cover"
              className={hasUnviewed ? 'opacity-100' : 'opacity-90'}
            />
          </div>
        </div>
        
        {/* Time indicator */}
        {userStories.length > 0 && (
          <div className="absolute -bottom-1 right-0 bg-blue-500 text-white text-[10px] rounded-full px-1.5 py-0.5 shadow-sm">
            {getTimeRemaining()}
          </div>
        )}
      </motion.div>
      
      {/* User name */}
      {showName && (
        <p className={`mt-1 ${dimensions[size].text} text-center font-medium text-gray-700 truncate max-w-[80px]`}>
          {user.name.split(' ').pop()}
        </p>
      )}
    </div>
  );
};

export default StoryCircle; 