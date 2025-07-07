'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { getRandomHeritage, Heritage } from '@/data/heritageData';
import { XMarkIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence, Variants } from 'framer-motion';

const DailyHeritageWidget: React.FC = () => {
  const [heritage, setHeritage] = useState<Heritage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Lấy di sản ngẫu nhiên khi component mount
    setHeritage(getRandomHeritage());
  }, []);

  useEffect(() => {
    // Hiệu ứng hiển thị nội dung sau khi modal mở
    if (isModalOpen) {
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 400);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [isModalOpen]);

  // Nếu chưa có dữ liệu, hiển thị loading
  if (!heritage) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden h-16 animate-pulse flex items-center px-3">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
      </div>
    );
  }

  // Hàm chuyển đổi loại di sản sang tiếng Việt
  const getHeritageTypeLabel = (type: Heritage['type']): string => {
    const typeMap: Record<Heritage['type'], string> = {
      'CUSTOMS': 'Phong tục tập quán',
      'FESTIVAL': 'Lễ hội truyền thống',
      'ART': 'Nghệ thuật truyền thống',
      'CUISINE': 'Ẩm thực di sản',
      'CRAFT_VILLAGE': 'Làng nghề truyền thống',
      'FOLKLORE': 'Truyền thuyết, cổ tích',
      'ARCHITECTURE': 'Kiến trúc cổ'
    };
    return typeMap[type] || type;
  };

  // Hàm lấy màu sắc cho từng loại di sản
  const getHeritageTypeColor = (type: Heritage['type']): string => {
    const colorMap: Record<Heritage['type'], string> = {
      'CUSTOMS': '#E53935',
      'FESTIVAL': '#8E24AA',
      'ART': '#1E88E5',
      'CUISINE': '#43A047',
      'CRAFT_VILLAGE': '#FB8C00',
      'FOLKLORE': '#6D4C41',
      'ARCHITECTURE': '#757575'
    };
    return colorMap[type] || '#000000';
  };

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3,
        when: "beforeChildren" 
      }
    },
    exit: { 
      opacity: 0,
      transition: { 
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren" 
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        damping: 12
      }
    },
    exit: { 
      y: -20, 
      opacity: 0,
      transition: { duration: 0.2 } 
    }
  };

  return (
    <>
      {/* Widget nhỏ gọn với hiệu ứng pulse */}
      <motion.div 
        className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300 flex items-center"
        onClick={() => setIsModalOpen(true)}
        whileHover={{ 
          scale: 1.05,
          boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.13)"
        }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 400, 
          damping: 17 
        }}
      >
        <motion.div 
          className="relative h-16 w-16 flex-shrink-0"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Image 
            src={heritage.mainImageUrl}
            alt={heritage.title}
            fill
            className="object-cover"
          />
          <motion.div
            className="absolute inset-0 bg-blue-500/10"
            animate={{ 
              opacity: [0, 0.2, 0],
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2,
              repeatType: "reverse"
            }}
          />
        </motion.div>
        <div className="p-3 flex-1">
          <div className="flex items-center gap-1">
            <motion.h3 
              className="text-sm font-medium text-blue-600"
              animate={{ 
                color: ['#1E40AF', '#3B82F6', '#1E40AF'],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 3,
              }}
            >
              Di sản Việt mỗi ngày
            </motion.h3>
            <motion.div
              animate={{ 
                rotate: [0, 10, 0, -10, 0],
                scale: [1, 1.2, 1, 1.2, 1]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 5,
                repeatType: "loop"
              }}
            >
              <InformationCircleIcon className="h-4 w-4 text-blue-600" />
            </motion.div>
          </div>
          <p className="text-gray-900 font-medium text-sm line-clamp-1">{heritage.title}</p>
        </div>
      </motion.div>

      {/* Modal chi tiết với hiệu ứng glassmorphism và animation */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
            }}
            exit={{ 
              opacity: 0,
              transition: { duration: 0.3, when: "afterChildren" } 
            }}
            onClick={() => setIsModalOpen(false)}
          >
            {/* Backdrop với hiệu ứng blur và gradient */}
            <motion.div 
              className="absolute inset-0 backdrop-blur-md"
              initial={{ backdropFilter: "blur(0px)" }}
              animate={{ backdropFilter: "blur(10px)" }}
              exit={{ backdropFilter: "blur(0px)" }}
              transition={{ duration: 0.4 }}
              style={{
                background: "radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, rgba(200,200,255,0.2) 100%)"
              }}
            />
            
            {/* Modal content */}
            <motion.div 
              className="relative max-w-2xl w-full max-h-[90vh] overflow-hidden rounded-xl"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                border: '1px solid rgba(255, 255, 255, 0.18)'
              }}
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 100, opacity: 0, scale: 0.8, rotateX: "10deg" }}
              animate={{ 
                y: 0, 
                opacity: 1, 
                scale: 1, 
                rotateX: "0deg",
              }}
              exit={{ 
                y: 100, 
                opacity: 0, 
                scale: 0.8, 
                rotateX: "10deg",
              }}
              transition={{ 
                type: "spring", 
                damping: 20, 
                stiffness: 300,
                duration: 0.6
              }}
            >
              {/* Hiệu ứng ánh sáng nổi bật */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  background: "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)",
                  mixBlendMode: "overlay"
                }}
              />

              {/* Header với hiệu ứng glassmorphism đậm hơn */}
              <motion.div 
                className="flex justify-between items-center p-4 border-b border-white/20"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.25)',
                  backdropFilter: 'blur(10px)'
                }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div>
                  <motion.h2 
                    className="text-2xl font-bold text-gray-800"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                  >
                    {heritage.title}
                  </motion.h2>
                  <motion.div 
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1"
                    style={{ 
                      backgroundColor: `${getHeritageTypeColor(heritage.type)}20`, 
                      color: getHeritageTypeColor(heritage.type)
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    {getHeritageTypeLabel(heritage.type)}
                  </motion.div>
                </div>
                <motion.button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsModalOpen(false);
                  }}
                  className="text-gray-500 hover:text-gray-700 transition-colors rounded-full p-1"
                  whileHover={{ 
                    scale: 1.2, 
                    rotate: 90,
                    backgroundColor: "rgba(255,255,255,0.3)" 
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <XMarkIcon className="h-6 w-6" />
                </motion.button>
              </motion.div>
              
              {/* Nội dung với scroll riêng */}
              <div className="overflow-y-auto max-h-[calc(90vh-80px)] custom-scrollbar">
                <motion.div 
                  className="p-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate={showContent ? "visible" : "hidden"}
                  exit="exit"
                >
                  {/* Hình ảnh */}
                  <motion.div 
                    className="relative h-64 w-full mb-6 rounded-lg overflow-hidden shadow-lg"
                    variants={itemVariants}
                  >
                    <Image 
                      src={heritage.mainImageUrl}
                      alt={heritage.title}
                      fill
                      className="object-cover"
                    />
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                    />
                    
                    {/* Hiệu ứng ánh sáng di chuyển */}
                    <motion.div
                      className="absolute inset-0 opacity-50"
                      style={{
                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                        backgroundSize: "200% 100%"
                      }}
                      animate={{
                        backgroundPosition: ["200% 0%", "-200% 0%"]
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 3,
                        ease: "linear"
                      }}
                    />
                  </motion.div>
                  
                  {/* Nội dung văn bản */}
                  <motion.div 
                    className="text-base text-gray-700 whitespace-pre-line leading-relaxed"
                    variants={itemVariants}
                  >
                    {heritage.content}
                  </motion.div>
                  
                  {/* Nguồn */}
                  {heritage.sourceInfo && (
                    <motion.div 
                      className="mt-6 p-3 rounded-lg text-sm text-gray-600"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.5)',
                        backdropFilter: 'blur(5px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)'
                      }}
                      variants={itemVariants}
                    >
                      <span className="font-medium">Nguồn:</span> {heritage.sourceInfo}
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CSS cho custom scrollbar */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(100, 116, 139, 0.3);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(100, 116, 139, 0.5);
        }
      `}</style>
    </>
  );
};

export default DailyHeritageWidget; 