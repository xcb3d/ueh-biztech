import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';
import { useMapContext } from '../MapContext';

import { Location, Moment } from '@/types/map-types';
import { CraftVillage } from '@/data/craft-villages';
import { memories as allMoments } from '@/data/memoryData';
import CreateMomentModal from '../../feed/CreateMomentModal';

interface SelectedPointDetailProps {
  point: Location | CraftVillage;
  onBack: () => void;
}

const SelectedPointDetail: React.FC<SelectedPointDetailProps> = ({ point, onBack }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'moments'>('info');
  const { state } = useMapContext();
  const { isLocationTransitioning } = state;

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number = 0) => ({
      opacity: 1, 
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3
      }
    })
  };

  const momentsAtPoint = allMoments.filter(m => m.locationId === point.id);
  
  // In a real app, you'd update a global state.
  const handleCreateMoment = (newMoment: Moment) => {
    console.log('New moment created:', newMoment);
    setIsModalOpen(false);
  };

  return (
    <motion.div 
      className="h-full flex flex-col"
      initial="hidden"
      animate={isLocationTransitioning ? "hidden" : "visible"}
      exit="exit"
      variants={containerVariants}
    >
      <div className="relative h-48 bg-gray-200">
        <Image 
          src={point.heroImage} 
          alt={point.name}
          layout="fill"
          objectFit="cover"
          className="brightness-[0.85]"
        />
        <motion.button 
          onClick={onBack}
          className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          variants={itemVariants}
        >
          <ChevronLeftIcon className="h-5 w-5 text-gray-700" />
        </motion.button>
        <motion.div 
          className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent"
          variants={itemVariants}
        >
          <h2 className="text-xl font-bold text-white">{point.name}</h2>
          <p className="text-sm text-white/90">
            {point.type === 'location' ? point.region : 'Làng nghề truyền thống'}
          </p>
        </motion.div>
      </div>
      
      <motion.div className="border-b border-white/10" variants={itemVariants}>
        <nav className="-mb-px flex space-x-6 px-4" aria-label="Tabs">
          <motion.button
            onClick={() => setActiveTab('info')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
              ${activeTab === 'info' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
            `}
            whileHover={{ y: -1 }}
            whileTap={{ y: 1 }}
          >
            Thông tin
          </motion.button>
          <motion.button
            onClick={() => setActiveTab('moments')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
              ${activeTab === 'moments' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
            `}
            whileHover={{ y: -1 }}
            whileTap={{ y: 1 }}
          >
            Khoảnh khắc
          </motion.button>
        </nav>
      </motion.div>
      
      <div className="flex-grow overflow-y-auto custom-scrollbar p-4">
        <AnimatePresence mode="wait" initial={false}>
          {activeTab === 'info' ? (
            <motion.div
              key="info"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <motion.div 
                className="bg-white/70 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-white/30"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Giới thiệu</h3>
                <p className="text-gray-600">{point.summary}</p>
              </motion.div>
              
              {'historicalFact' in point && (
                <motion.div 
                  className="bg-amber-50/80 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-amber-100/50"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <h3 className="text-lg font-semibold text-amber-800 mb-2">Sự kiện lịch sử</h3>
                  <p className="text-amber-700">{point.historicalFact}</p>
                </motion.div>
              )}
              
              {'category' in point && (
                <motion.div 
                  className="bg-blue-50/80 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-blue-100/50"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">Danh mục</h3>
                  <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {point.category === 'kien-truc-nghe-thuat' && 'Di tích kiến trúc - nghệ thuật'}
                    {point.category === 'lich-su' && 'Di tích lịch sử'}
                    {point.category === 'khao-co' && 'Di tích khảo cổ'}
                    {point.category === 'danh-lam-thang-canh' && 'Di tích danh lam thắng cảnh'}
                    {point.category === 'bao-tang' && 'Bảo tàng và kho hiện vật'}
                  </div>
                </motion.div>
              )}
              
              {'product' in point && (
                <motion.div 
                  className="bg-purple-50/80 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-purple-100/50"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <h3 className="text-lg font-semibold text-purple-800 mb-2">Loại hình làng nghề</h3>
                  <div className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                    {point.product}
                  </div>
                </motion.div>
              )}
              
              <motion.div
                className="mt-6"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <Link 
                  href={point.type === 'location' ? `/location/${point.id}` : `/lang-nghe/${point.slug}`}
                  className="flex items-center justify-center w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg transition-colors shadow-sm group"
                >
                  <span className="font-medium">Xem trang chi tiết</span>
                  <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="moments"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {momentsAtPoint.length > 0 ? (
                <motion.div 
                  className="space-y-4"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { 
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1
                      }
                    }
                  }}
                  initial="hidden"
                  animate="visible"
                >
                  {momentsAtPoint.map((moment, index) => (
                    <motion.div 
                      key={moment.id} 
                      className="bg-white/70 backdrop-blur-sm rounded-lg overflow-hidden shadow-sm border border-white/30"
                      variants={itemVariants}
                      custom={index}
                      whileHover={{ y: -2, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)' }}
                    >
                      {moment.imageUrl && (
                        <div className="h-40 relative">
                          <Image 
                            src={moment.imageUrl} 
                            alt={moment.title}
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <div className="flex items-center mb-2">
                          <div className="h-8 w-8 rounded-full overflow-hidden mr-2">
                            <Image 
                              src={moment.author.avatarUrl} 
                              alt={moment.author.name}
                              width={32}
                              height={32}
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{moment.author.name}</p>
                            <p className="text-xs text-gray-500">
                              {new Date(moment.createdAt).toLocaleDateString('vi-VN')}
                            </p>
                          </div>
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-1">{moment.title}</h3>
                        <p className="text-gray-600 text-sm line-clamp-3">{moment.content}</p>
                      </div>
                    </motion.div>
                  ))}
                  
                  <motion.div
                    className="mt-6 flex flex-col space-y-3"
                    variants={itemVariants}
                    custom={momentsAtPoint.length}
                  >
                    <button 
                      className="flex items-center justify-center w-full bg-blue-50 hover:bg-blue-100 text-blue-600 py-3 px-4 rounded-lg transition-colors shadow-sm border border-blue-200 group"
                      onClick={() => setIsModalOpen(true)}
                    >
                      <span className="font-medium">Chia sẻ khoảnh khắc của bạn</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                    
                    <Link 
                      href={point.type === 'location' ? `/location/${point.id}` : `/lang-nghe/${point.slug}`}
                      className="flex items-center justify-center w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg transition-colors shadow-sm group"
                    >
                      <span className="font-medium">Xem trang chi tiết</span>
                      <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div 
                  className="space-y-6"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="text-center py-10 bg-white/70 backdrop-blur-sm rounded-lg border border-white/30">
                    <p className="text-gray-500">Chưa có khoảnh khắc nào được chia sẻ.</p>
                    <button 
                      className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                      onClick={() => setIsModalOpen(true)}
                    >
                      Chia sẻ khoảnh khắc
                    </button>
                  </div>
                  
                  <Link 
                    href={point.type === 'location' ? `/location/${point.id}` : `/lang-nghe/${point.slug}`}
                    className="flex items-center justify-center w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg transition-colors shadow-sm group"
                  >
                    <span className="font-medium">Xem trang chi tiết</span>
                    <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {isModalOpen && (
        <CreateMomentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onMomentCreate={handleCreateMoment}
          preselectedLocationId={point.id}
        />
      )}
    </motion.div>
  );
};

export default SelectedPointDetail; 