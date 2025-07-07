'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Story } from '@/data/storyData';
import { User } from '@/types/map-types';
import { motion } from 'framer-motion';
import { MdClose, MdChevronLeft, MdChevronRight, MdLocationOn } from 'react-icons/md';

interface StoryViewerProps {
  stories: Story[];
  user: User;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

const StoryViewer: React.FC<StoryViewerProps> = ({
  stories,
  user,
  onClose,
  onNext,
  onPrev
}) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const currentStory = stories[currentStoryIndex];
  
  // Xử lý thời gian hiển thị story
  useEffect(() => {
    setProgress(0);
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    if (!isPaused) {
      const duration = 5000; // 5 giây cho mỗi story
      const interval = 100; // Cập nhật progress mỗi 100ms
      const step = (interval / duration) * 100;
      
      intervalRef.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            handleNextStory();
            return 0;
          }
          return prev + step;
        });
      }, interval);
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentStoryIndex, isPaused]);
  
  const handleNextStory = () => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(prev => prev + 1);
    } else if (onNext) {
      onNext();
    }
  };
  
  const handlePrevStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(prev => prev - 1);
    } else if (onPrev) {
      onPrev();
    }
  };
  
  // Tạm dừng khi người dùng giữ chuột
  const handleMouseDown = () => setIsPaused(true);
  const handleMouseUp = () => setIsPaused(false);
  
  // Format thời gian đăng
  const formatTime = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diff = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diff < 1) {
      const minutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return `${minutes} phút trước`;
    }
    
    return `${diff} giờ trước`;
  };

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Container chính */}
      <motion.div 
        className="relative w-full max-w-md h-[80vh] max-h-[700px] overflow-hidden rounded-lg"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
      >
        {/* Thanh tiến trình */}
        <div className="absolute top-0 left-0 right-0 z-10 flex gap-1 p-2">
          {stories.map((_, index) => (
            <div 
              key={index} 
              className="h-1 bg-white/30 rounded-full flex-1 overflow-hidden"
            >
              {index === currentStoryIndex && (
                <motion.div 
                  className="h-full bg-white rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: 'linear' }}
                />
              )}
              {index < currentStoryIndex && (
                <div className="h-full w-full bg-white rounded-full" />
              )}
            </div>
          ))}
        </div>
        
        {/* Nội dung story */}
        <div className="relative h-full overflow-hidden bg-black">
          {/* Hình ảnh story */}
          <div className="absolute inset-0">
            <Image
              src={currentStory.imageUrl}
              alt={currentStory.caption || 'Story image'}
              layout="fill"
              objectFit="cover"
            />
            
            {/* Overlay gradient đơn giản */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
          </div>
          
          {/* Thông tin người dùng */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 pt-6 z-10">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full border border-white/30 overflow-hidden">
                <Image
                  src={user.avatarUrl}
                  alt={user.name}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div className="ml-2">
                <p className="text-white text-sm font-medium">{user.name}</p>
                <p className="text-white/70 text-xs flex items-center">
                  {formatTime(currentStory.createdAt)}
                  {currentStory.location && (
                    <>
                      <span className="mx-1">•</span>
                      <MdLocationOn className="inline text-white" />
                      <span>{currentStory.location}</span>
                    </>
                  )}
                </p>
              </div>
            </div>
            
            <button 
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-black/30 text-white"
            >
              <MdClose size={20} />
            </button>
          </div>
          
          {/* Navigation buttons */}
          <button 
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/20 text-white z-10"
            onClick={(e) => {
              e.stopPropagation();
              handlePrevStory();
            }}
          >
            <MdChevronLeft size={24} />
          </button>
          
          <button 
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/20 text-white z-10"
            onClick={(e) => {
              e.stopPropagation();
              handleNextStory();
            }}
          >
            <MdChevronRight size={24} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default StoryViewer; 