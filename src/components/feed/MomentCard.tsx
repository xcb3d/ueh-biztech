'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChatBubbleLeftRightIcon, HeartIcon as HeartIconOutline, ShareIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { Moment } from '@/types/map-types';
import { memoryTypes } from '@/data/memoryData';
import { feelings } from '@/data/feelingData';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { motion } from 'framer-motion';

interface MomentCardProps {
  moment: Moment;
  onCardClick?: (moment: Moment) => void;
}

const MomentCard: React.FC<MomentCardProps> = ({ moment, onCardClick }) => {
  // --- Fake Interaction State ---
  // In a real app, this would be connected to a backend
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 20));
  const [commentCount] = useState(Math.floor(Math.random() * 10));
  const [openLightbox, setOpenLightbox] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  
  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };
  
  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    // In a real app, this would open a share dialog
    alert('Chức năng chia sẻ sẽ được phát triển sau!');
  };
  
  const handleCardClick = () => {
    if (onCardClick) {
      onCardClick(moment);
    } else {
      // Hành vi mặc định nếu không có onCardClick
      console.log(`Card clicked, but no handler provided. Moment ID: ${moment.id}`);
    }
  };

  const openImageSlider = (index: number) => {
    setLightboxIndex(index);
    setOpenLightbox(true);
  };
  // --- End Fake Interaction State ---

  // Get category display information
  const category = moment.category || 'default';
  const categoryInfo = memoryTypes[category as keyof typeof memoryTypes] || memoryTypes.default;

  // Get images to display
  const images = moment.images || (moment.imageUrl ? [moment.imageUrl] : []);

  // Render image grid in Facebook style
  const renderImageGrid = () => {
    if (images.length === 0) return null;

    if (images.length === 1) {
      return (
        <div className="relative w-full h-96 overflow-hidden" onClick={() => openImageSlider(0)}>
          <Image
            src={images[0]}
            alt={moment.title}
            layout="fill"
            objectFit="cover"
          />
        </div>
      );
    }

    if (images.length === 2) {
      return (
        <div className="grid grid-cols-2 gap-1 h-96">
          {images.map((img, index) => (
            <div key={index} className="relative h-full overflow-hidden" onClick={() => openImageSlider(index)}>
              <Image
                src={img}
                alt={`${moment.title} - ảnh ${index + 1}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
          ))}
        </div>
      );
    }

    if (images.length === 3) {
      return (
        <div className="grid grid-cols-2 gap-1 h-96">
          <div className="relative h-full overflow-hidden" onClick={() => openImageSlider(0)}>
            <Image
              src={images[0]}
              alt={`${moment.title} - ảnh 1`}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="grid grid-rows-2 gap-1 h-full">
            {images.slice(1, 3).map((img, index) => (
              <div key={index} className="relative h-full overflow-hidden" onClick={() => openImageSlider(index + 1)}>
                <Image
                  src={img}
                  alt={`${moment.title} - ảnh ${index + 2}`}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 4 hoặc nhiều ảnh: hiển thị 1 ảnh lớn, 2 ảnh nhỏ, và ảnh cuối cùng có hiệu ứng phủ mờ với dấu + số ảnh còn lại
    return (
      <div className="h-96 grid grid-cols-2 gap-1">
        {/* Ảnh lớn bên trái */}
        <div className="relative h-full overflow-hidden" onClick={() => openImageSlider(0)}>
          <Image
            src={images[0]}
            alt={`${moment.title} - ảnh 1`}
            layout="fill"
            objectFit="cover"
          />
        </div>
        
        {/* Cột phải: 2 ảnh nhỏ */}
        <div className="grid grid-rows-2 gap-1 h-full">
          {/* Ảnh nhỏ thứ nhất */}
          <div className="relative h-full overflow-hidden" onClick={() => openImageSlider(1)}>
            <Image
              src={images[1]}
              alt={`${moment.title} - ảnh 2`}
              layout="fill"
              objectFit="cover"
            />
          </div>
          
          {/* Ảnh nhỏ thứ hai với lớp phủ nếu có nhiều hơn 3 ảnh */}
          <div className="relative h-full overflow-hidden" onClick={() => openImageSlider(2)}>
            <Image
              src={images[2]}
              alt={`${moment.title} - ảnh 3`}
              layout="fill"
              objectFit="cover"
            />
            
            {/* Lớp phủ hiển thị số ảnh còn lại */}
            {images.length > 3 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">+{images.length - 3}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <motion.div 
        onClick={handleCardClick}
        className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200/80 cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-5">
          {/* Post Header */}
          <div className="flex items-center space-x-3">
            <Image
              src={moment.author.avatarUrl}
              alt={moment.author.name}
              width={44}
              height={44}
              className="rounded-full ring-2 ring-white shadow-sm"
            />
            <div>
              <p className="text-sm font-semibold text-gray-800">
                {moment.author.name}
                {moment.feeling && feelings[moment.feeling] && (
                  <span className="font-normal text-gray-600">
                    {' '}
                    đang cảm thấy{' '}
                    <span className="font-semibold">
                      {feelings[moment.feeling].text} {feelings[moment.feeling].emoji}
                    </span>
                  </span>
                )}
              </p>
              <p className="text-xs text-gray-500">{new Date(moment.createdAt).toLocaleDateString('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
          </div>
        </div>

        {/* Clickable Content Area */}
        <div className="px-5 pb-3">
          <div className="flex items-center mb-2">
            <h2 className="text-xl font-bold text-gray-900 mr-2">{moment.title}</h2>
            <span 
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" 
              style={{ 
                backgroundColor: `${categoryInfo.color}20`, 
                color: categoryInfo.color 
              }}
            >
              {categoryInfo.name}
            </span>
          </div>
          <p className="text-gray-700 text-base line-clamp-3">{moment.content}</p>

          {/* Hashtags */}
          {moment.hashtags && moment.hashtags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {moment.hashtags.map((tag, index) => (
                <span 
                  key={index} 
                  className="text-sm font-medium text-blue-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        
        {/* Image Grid */}
        {images.length > 0 && renderImageGrid()}

        {/* Post Actions */}
        <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/50 flex justify-between">
          <div className="flex space-x-4">
            <motion.button 
              onClick={handleLikeClick}
              className="flex items-center space-x-1 text-gray-500"
              whileTap={{ scale: 0.9 }}
            >
              {isLiked ? (
                <HeartIconSolid className="h-5 w-5 text-red-500" />
              ) : (
                <HeartIconOutline className="h-5 w-5" />
              )}
              <span>{likeCount}</span>
            </motion.button>
            <motion.button 
              className="flex items-center space-x-1 text-gray-500"
              whileTap={{ scale: 0.9 }}
            >
              <ChatBubbleLeftRightIcon className="h-5 w-5" />
              <span>{commentCount}</span>
            </motion.button>
          </div>
          <motion.button 
            onClick={handleShareClick}
            className="flex items-center space-x-1 text-gray-500"
            whileTap={{ scale: 0.9 }}
          >
            <ShareIcon className="h-5 w-5" />
            <span className="text-sm">Chia sẻ</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Lightbox for image viewing */}
      <Lightbox
        open={openLightbox}
        close={() => setOpenLightbox(false)}
        index={lightboxIndex}
        slides={images.map(src => ({ src }))}
      />
    </>
  );
};

export default MomentCard; 