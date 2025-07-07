import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  BuildingLibraryIcon, 
  ArchiveBoxIcon, 
  GlobeAsiaAustraliaIcon, 
  BuildingOffice2Icon, 
  MagnifyingGlassIcon 
} from '@heroicons/react/24/outline';
import { Location, Moment, Event } from '@/types/map-types';
import { motion, AnimatePresence } from 'framer-motion';

// Danh sách các danh mục và thông tin hiển thị
const categories = [
  { id: 'kien-truc-nghe-thuat', name: 'Di tích kiến trúc - nghệ thuật', icon: BuildingOffice2Icon },
  { id: 'lich-su', name: 'Di tích lịch sử', icon: ArchiveBoxIcon },
  { id: 'khao-co', name: 'Di tích khảo cổ', icon: ArchiveBoxIcon },
  { id: 'danh-lam-thang-canh', name: 'Di tích danh lam thắng cảnh', icon: GlobeAsiaAustraliaIcon },
  { id: 'bao-tang', name: 'Bảo tàng và kho hiện vật', icon: BuildingLibraryIcon },
];

interface MapOverviewProps {
    searchTerm: string;
    onSearchTermChange: (term: string) => void;
    searchResults: Location[];
    onSearchResultClick: (location: Location) => void;
    showOnlyLocationsWithEvents: boolean;
    onToggleEventsFilter: () => void;
    latestMoments: Moment[];
    onMomentClick: (moment: Moment) => void;
    upcomingEvents: Event[];
    isEventToday: (event: Event) => boolean;
    formatEventDate: (dateString: string) => string;
    allLocations: Location[];
    selectedTheme: string | null;
    onThemeClick: (themeId: string) => void;
}

const MapOverview: React.FC<MapOverviewProps> = ({
    searchTerm,
    onSearchTermChange,
    searchResults,
    onSearchResultClick,
    showOnlyLocationsWithEvents,
    onToggleEventsFilter,
    latestMoments,
    onMomentClick,
    upcomingEvents,
    isEventToday,
    formatEventDate,
    allLocations,
    selectedTheme,
    onThemeClick
}) => {
    const [activeTab, setActiveTab] = useState('events');

    const container = {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1
        }
      }
    };
    
    const item = {
      hidden: { opacity: 0, y: 20 },
      show: { opacity: 1, y: 0 }
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'events':
                return (
                    <div className="p-5 border-b border-white/10">
                      <motion.h3 
                        className="text-lg font-semibold text-gray-800 mb-3"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        Sự kiện Nổi bật
                      </motion.h3>
                      {upcomingEvents.length > 0 ? (
                        <motion.ul 
                          className="space-y-3"
                          variants={container}
                          initial="hidden"
                          animate="show"
                        >
                          {upcomingEvents.map(event => {
                            const location = allLocations.find(loc => loc.id === event.locationId);
                            const isToday = isEventToday(event);
                            
                            return (
                              <motion.li 
                                key={event.id} 
                                className="bg-white/70 backdrop-blur-sm rounded-lg shadow-sm border border-white/30 overflow-hidden hover:shadow-md transition-shadow"
                                variants={item}
                                whileHover={{ scale: 1.02, y: -2 }}
                              >
                                <Link href={`/event/${event.id}`} className="block">
                                  <div className="relative h-24 w-full bg-gray-100">
                                    <Image 
                                      src={event.heroImage} 
                                      alt={event.name}
                                      layout="fill"
                                      objectFit="cover"
                                    />
                                    {isToday && (
                                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                                        Hôm nay
                                      </div>
                                    )}
                                  </div>
                                  <div className="p-3">
                                    <p className="font-semibold text-gray-800 line-clamp-1">{event.name}</p>
                                    <div className="flex items-center mt-1 text-xs text-gray-500">
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                      </svg>
                                      <span>{formatEventDate(event.startTime)}</span>
                                    </div>
                                    <div className="flex items-center mt-1 text-xs text-gray-500">
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                      </svg>
                                      <span className="line-clamp-1">{location?.name || 'Không xác định'}</span>
                                    </div>
                                  </div>
                                </Link>
                              </motion.li>
                            );
                          })}
                        </motion.ul>
                      ) : (
                        <motion.div 
                          className="text-center py-6 bg-white/50 backdrop-blur-sm rounded-lg"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          <p className="text-gray-500">Không có sự kiện sắp tới</p>
                        </motion.div>
                      )}
                      <motion.div 
                        className="mt-3 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Link href="/events" className="text-sm font-medium text-blue-600 hover:underline">
                          Xem tất cả sự kiện
                        </Link>
                      </motion.div>
                    </div>
                );
            case 'moments':
                return (
                    <div className="p-5 border-b border-white/10">
                        <motion.h3 
                          className="text-lg font-semibold text-gray-800 mb-3"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          Khoảnh khắc Gần đây
                        </motion.h3>
                        <motion.ul 
                          className="space-y-3"
                          variants={container}
                          initial="hidden"
                          animate="show"
                        >
                          {latestMoments.map(moment => (
                            <motion.li 
                              key={moment.id} 
                              onClick={() => onMomentClick(moment)}
                              className="flex items-center space-x-3 p-3 rounded-lg bg-white/70 backdrop-blur-sm border border-white/30 shadow-sm cursor-pointer"
                              variants={item}
                              whileHover={{ scale: 1.02, y: -2 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Image src={moment.author.avatarUrl} alt={moment.author.name} width={40} height={40} className="rounded-full ring-2 ring-white/70" />
                              <div>
                                <h4 className="font-semibold text-gray-800 text-sm">{moment.title}</h4>
                                <p className="text-xs text-gray-500">bởi {moment.author.name}</p>
                              </div>
                            </motion.li>
                          ))}
                        </motion.ul>
                    </div>
                );
            case 'themes':
                return (
                    <div className="p-5">
                      <motion.h3 
                        className="text-lg font-semibold text-gray-800 mb-3"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        Danh mục di tích
                      </motion.h3>
                      <motion.div 
                        className="space-y-3"
                        variants={container}
                        initial="hidden"
                        animate="show"
                      >
                        {categories.map((category) => (
                          <motion.button
                            key={category.id}
                            onClick={() => onThemeClick(category.id)}
                            className={`
                              w-full flex items-center p-3 rounded-lg text-left transition-all duration-200
                              ${selectedTheme === category.id 
                                ? 'bg-blue-500 text-white shadow-lg' 
                                : 'bg-white/70 backdrop-blur-sm border border-white/30 text-gray-800 hover:bg-white/90'}
                            `}
                            variants={item}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <category.icon className="h-6 w-6 mr-3 flex-shrink-0" />
                            <span className="font-semibold">{category.name}</span>
                          </motion.button>
                        ))}
                        <motion.button
                          onClick={() => onThemeClick('lang-nghe')}
                          className={`
                            w-full flex items-center p-3 rounded-lg text-left transition-all duration-200
                            ${selectedTheme === 'lang-nghe' 
                              ? 'bg-blue-500 text-white shadow-lg' 
                              : 'bg-white/70 backdrop-blur-sm border border-white/30 text-gray-800 hover:bg-white/90'}
                          `}
                          variants={item}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <ArchiveBoxIcon className="h-6 w-6 mr-3 flex-shrink-0" />
                          <span className="font-semibold">Làng nghề truyền thống</span>
                        </motion.button>
                      </motion.div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
      <div className="h-full flex flex-col overflow-hidden">
        <motion.div 
          className="p-5 border-b border-white/10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Khám Phá</h2>
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Tìm kiếm địa điểm..."
              value={searchTerm}
              onChange={(e) => onSearchTermChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-white/30 bg-white/70 backdrop-blur-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
  
          {/* Event filter toggle */}
          <motion.div 
            className="mt-4 flex items-center justify-between bg-amber-50/70 backdrop-blur-sm p-3 rounded-lg border border-amber-100/50"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium text-gray-700">Chỉ hiển thị địa điểm có sự kiện</span>
            </div>
            <motion.button 
              onClick={onToggleEventsFilter}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${showOnlyLocationsWithEvents ? 'bg-blue-600' : 'bg-gray-200'}`}
              role="switch"
              aria-checked={showOnlyLocationsWithEvents}
              whileTap={{ scale: 0.95 }}
            >
              <span className="sr-only">Chỉ hiển thị địa điểm có sự kiện</span>
              <motion.span 
                className="inline-block h-4 w-4 transform rounded-full bg-white shadow-md"
                animate={{ 
                  x: showOnlyLocationsWithEvents ? 20 : 2
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </motion.button>
          </motion.div>
        </motion.div>
        
        <div className="flex-grow overflow-y-auto custom-scrollbar">
          {searchTerm.trim() !== '' ? (
            <motion.div 
              className="search-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {searchResults.length > 0 ? (
                <motion.ul
                  variants={container}
                  initial="hidden"
                  animate="show"
                >
                  {searchResults.map(location => (
                    <motion.li 
                      key={location.id} 
                      onClick={() => onSearchResultClick(location)}
                      className="p-4 hover:bg-white/70 cursor-pointer border-b border-white/10"
                      variants={item}
                      whileHover={{ x: 5 }}
                    >
                      <h4 className="font-semibold text-gray-800">{location.name}</h4>
                      <p className="text-sm text-gray-500">{location.region}</p>
                    </motion.li>
                  ))}
                </motion.ul>
              ) : (
                <motion.p 
                  className="p-4 text-center text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Không tìm thấy địa điểm nào.
                </motion.p>
              )}
            </motion.div>
          ) : (
            <div>
              <motion.div 
                className="border-b border-white/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <nav className="-mb-px flex space-x-1 px-4" aria-label="Tabs">
                  <motion.button
                    onClick={() => setActiveTab('events')}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
                      ${activeTab === 'events' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                    `}
                    whileHover={{ y: -1 }}
                    whileTap={{ y: 1 }}
                  >
                    Sự kiện
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
                  <motion.button
                    onClick={() => setActiveTab('themes')}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
                      ${activeTab === 'themes' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                    `}
                    whileHover={{ y: -1 }}
                    whileTap={{ y: 1 }}
                  >
                    Danh mục
                  </motion.button>
                </nav>
              </motion.div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderContent()}
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    );
};

export default MapOverview; 