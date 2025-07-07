'use client';

import React, { useState, useEffect } from 'react';
import MomentCard from './MomentCard';
import MomentCardSkeleton from './MomentCardSkeleton';
import { moments as initialMoments } from '@/data/momentData';
import { storylines as initialStorylines } from '@/data/storylineData';
import { Moment } from '@/types/map-types';
import CreateMomentModal from './CreateMomentModal';
import MomentDetailModal from './MomentDetailModal';
import { UserIcon, FireIcon, BookmarkIcon, HomeIcon, UserGroupIcon, BellIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';
import { MagnifyingGlassIcon, MapPinIcon, GlobeAltIcon, NewspaperIcon, HashtagIcon } from '@heroicons/react/24/outline';
import StorylineCard from './StorylineCard';
import { motion } from 'framer-motion';
import { memoryTypes } from '@/data/memoryData';
import Image from 'next/image';
import Link from 'next/link';
import { users } from '@/data/userData';
import StoriesContainer from '../stories/StoriesContainer';

const CreateMomentTrigger = ({ onClick }: { onClick: () => void }) => (
  <div className="bg-white rounded-xl shadow-md p-4 mb-6 border border-gray-200/80 hover:shadow-lg transition-all duration-300">
    <div className="flex items-center space-x-3">
       <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex-shrink-0 flex items-center justify-center">
         <UserIcon className="h-6 w-6 text-white"/>
       </div>
      <div 
        onClick={onClick}
        className="flex-1 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer rounded-full py-3 px-4 text-gray-500"
      >
        Bạn muốn chia sẻ khoảnh khắc nào?
      </div>
    </div>
  </div>
);

type FeedItem = (Moment & { type: 'moment' }) | (typeof initialStorylines[0] & { type: 'storyline', createdAt: string });

type SortOption = 'newest' | 'popular' | 'trending';
type FilterOption = 'all' | 'moments' | 'storylines' | string;

// Trending hashtags giả lập
const trendingHashtags = [
  { tag: '#DuLịchViệtNam', count: 2453 },
  { tag: '#ẨmThựcĐường Phố', count: 1872 },
  { tag: '#LễHộiTruyềnThống', count: 1245 },
  { tag: '#PhongCảnhViệtNam', count: 987 },
  { tag: '#VănHóaVùngMiền', count: 765 }
];

// Người dùng gợi ý kết nối
const suggestedUsers = users.slice(0, 5);

const MomentFeed: React.FC = () => {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<FeedItem[]>([]);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [selectedMoment, setSelectedMoment] = useState<Moment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOption, setSortOption] = useState<SortOption>('newest');
  const [filterOption, setFilterOption] = useState<FilterOption>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'for-you' | 'following'>('for-you');

  useEffect(() => {
    const momentsWithType = initialMoments.map(m => ({ ...m, type: 'moment' as const }));
    
    // Storylines don't have a createdAt, so we'll assign one for sorting purposes
    // In a real app, storylines would have their own creation date
    const storylinesWithType = initialStorylines.map((s, i) => ({ 
      ...s, 
      type: 'storyline' as const,
      createdAt: new Date(new Date().getTime() - i * 24 * 60 * 60 * 1000 * 2).toISOString(), // Simulate creation dates
    }));

    const combinedFeed = [...momentsWithType, ...storylinesWithType];
    
    const sortedFeed = combinedFeed.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    setFeedItems(sortedFeed);
    setFilteredItems(sortedFeed);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Apply filters and sorting
    let result = [...feedItems];
    
    // Filter by type
    if (filterOption === 'moments') {
      result = result.filter(item => item.type === 'moment');
    } else if (filterOption === 'storylines') {
      result = result.filter(item => item.type === 'storyline');
    } else if (filterOption !== 'all') {
      // Filter by category
      result = result.filter(item => 
        item.type === 'moment' && item.category === filterOption
      );
    }
    
    // Apply search
    if (searchTerm) {
      result = result.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (item.type === 'moment' && item.content.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Apply sorting
    if (sortOption === 'newest') {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortOption === 'popular') {
      // In a real app, this would sort by like count or view count
      // Here we'll just use a random number for demonstration
      result.sort(() => Math.random() - 0.5);
    } else if (sortOption === 'trending') {
      // In a real app, this would use an algorithm to determine trending content
      // Here we'll just use a different random sort
      result.sort(() => Math.random() - 0.5);
    }
    
    setFilteredItems(result);
  }, [feedItems, sortOption, filterOption, searchTerm]);

  const handleCreateMoment = (newMoment: Moment) => {
    const newFeedItem = { ...newMoment, type: 'moment' as const };
    setFeedItems(prevItems => [newFeedItem, ...prevItems]);
  };
  
  const handleMomentClick = (moment: Moment) => {
    setSelectedMoment(moment);
  };

  const handleCloseDetailModal = () => {
    setSelectedMoment(null);
  };

  // Get all categories from memory types
  const categories = Object.entries(memoryTypes).map(([key, value]) => ({
    id: key,
    name: value.name,
    color: value.color
  }));

  return (
    <>
      <div className="w-full max-w-7xl mx-auto py-4 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Sidebar - Navigation */}
          <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
            <div className="sticky top-20">
              <div className="bg-white rounded-xl shadow-md p-4 mb-4">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                    <UserIcon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Người dùng</p>
                    <p className="text-xs text-gray-500">@username</p>
                  </div>
                </div>
                
                <nav className="space-y-1">
                  <Link href="/" className="flex items-center space-x-3 p-3 rounded-lg bg-blue-50 text-blue-700 font-medium">
                    <HomeIcon className="h-6 w-6" />
                    <span>Trang chủ</span>
                  </Link>
                  <Link href="/explore" className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                    <GlobeAltIcon className="h-6 w-6" />
                    <span>Khám phá</span>
                  </Link>
                  <Link href="/notifications" className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                    <BellIcon className="h-6 w-6" />
                    <span>Thông báo</span>
                  </Link>
                  <Link href="/messages" className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                    <ChatBubbleLeftRightIcon className="h-6 w-6" />
                    <span>Tin nhắn</span>
                  </Link>
                  <Link href="/groups" className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                    <UserGroupIcon className="h-6 w-6" />
                    <span>Nhóm</span>
                  </Link>
                  <Link href="/bookmarks" className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                    <BookmarkIcon className="h-6 w-6" />
                    <span>Đã lưu</span>
                  </Link>
                </nav>
              </div>
              
              {/* Categories */}
              <div className="bg-white rounded-xl shadow-md p-4">
                <h3 className="font-semibold text-gray-800 mb-3">Danh mục</h3>
                <div className="space-y-1">
                  {categories.slice(0, 6).map(category => (
                    <button 
                      key={category.id}
                      onClick={() => setFilterOption(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center ${filterOption === category.id ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50 text-gray-700'}`}
                    >
                      <span 
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: category.color }}
                      ></span>
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Feed */}
          <div className="lg:col-span-6 xl:col-span-7">
            {/* Feed Header */}
            <div className="bg-white rounded-xl shadow-md p-4 mb-4">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-gray-900">Dòng chảy</h1>
                <div className="relative">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-60 transition-all"
                  />
                </div>
              </div>
              
              {/* Feed Tabs */}
              <div className="flex border-b">
                <button
                  className={`flex-1 py-3 font-medium text-center transition-colors relative ${
                    activeTab === 'for-you' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('for-you')}
                >
                  Dành cho bạn
                  {activeTab === 'for-you' && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                      layoutId="activeTabIndicator"
                    />
                  )}
                </button>
                <button
                  className={`flex-1 py-3 font-medium text-center transition-colors relative ${
                    activeTab === 'following' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('following')}
                >
                  Đang theo dõi
                  {activeTab === 'following' && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                      layoutId="activeTabIndicator"
                    />
                  )}
                </button>
              </div>
              
              {/* Sort Options */}
              <div className="flex justify-end pt-3">
                <div className="flex space-x-2 text-sm">
                  <button 
                    onClick={() => setSortOption('newest')}
                    className={`px-2 py-1 rounded ${sortOption === 'newest' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
                  >
                    Mới nhất
                  </button>
                  <button 
                    onClick={() => setSortOption('popular')}
                    className={`px-2 py-1 rounded ${sortOption === 'popular' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
                  >
                    Phổ biến
                  </button>
                  <button 
                    onClick={() => setSortOption('trending')}
                    className={`px-2 py-1 rounded ${sortOption === 'trending' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
                  >
                    <span className="flex items-center">
                      <FireIcon className="h-3 w-3 mr-1" />
                      Xu hướng
                    </span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Create Post */}
            <CreateMomentTrigger onClick={() => setCreateModalOpen(true)} />
            
            {/* Story/Highlight Reel */}
            <div className="mb-6 overflow-x-auto">
              <StoriesContainer />
            </div>
            
            {/* Feed Content */}
            <div className="space-y-4">
              {isLoading
                ? Array.from({ length: 5 }).map((_, index) => <MomentCardSkeleton key={index} />)
                : filteredItems.length > 0 
                  ? filteredItems.map((item, index) => (
                      <motion.div
                        key={item.type === 'moment' ? `moment-${item.id}` : `storyline-${item.id}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        {item.type === 'moment' ? (
                          <MomentCard moment={item} onCardClick={handleMomentClick} />
                        ) : (
                          <StorylineCard storyline={item} />
                        )}
                      </motion.div>
                    ))
                  : (
                    <div className="bg-white rounded-xl shadow-md p-8 text-center">
                      <MapPinIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">Không tìm thấy kết quả</h3>
                      <p className="text-gray-600">Không có khoảnh khắc hoặc tuyến hành trình nào phù hợp với tiêu chí tìm kiếm của bạn.</p>
                    </div>
                  )
              }
            </div>
          </div>
          
          {/* Right Sidebar */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-20 space-y-4">
              {/* Trending */}
              <div className="bg-white rounded-xl shadow-md p-4">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <FireIcon className="h-5 w-5 text-orange-500 mr-2" />
                  Xu hướng
                </h3>
                <div className="space-y-3">
                  {trendingHashtags.map((item, index) => (
                    <div key={index} className="group cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <HashtagIcon className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-gray-800 group-hover:text-blue-600 transition-colors font-medium">{item.tag}</span>
                        </div>
                        <span className="text-xs text-gray-500">{item.count.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="mt-3 text-sm text-blue-600 hover:text-blue-800 font-medium">
                  Xem thêm
                </button>
              </div>
              
              {/* Suggested Users */}
              <div className="bg-white rounded-xl shadow-md p-4">
                <h3 className="font-semibold text-gray-800 mb-3">Gợi ý kết nối</h3>
                <div className="space-y-3">
                  {suggestedUsers.map((user, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Image 
                          src={user.avatarUrl} 
                          alt={user.name} 
                          width={36} 
                          height={36}
                          className="rounded-full"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-800">{user.name}</p>
                          <p className="text-xs text-gray-500">@{user.name.toLowerCase().replace(/\s+/g, '')}</p>
                        </div>
                      </div>
                      <button className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium py-1 px-3 rounded-full transition-colors">
                        Theo dõi
                      </button>
                    </div>
                  ))}
                </div>
                <button className="mt-3 text-sm text-blue-600 hover:text-blue-800 font-medium">
                  Xem tất cả
                </button>
              </div>
              
              {/* Latest News */}
              <div className="bg-white rounded-xl shadow-md p-4">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <NewspaperIcon className="h-5 w-5 text-gray-600 mr-2" />
                  Tin tức mới nhất
                </h3>
                <div className="space-y-3">
                  <div className="group cursor-pointer">
                    <p className="text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors">Lễ hội hoa đăng tại Hội An thu hút hàng nghìn du khách</p>
                    <p className="text-xs text-gray-500">2 giờ trước</p>
                  </div>
                  <div className="group cursor-pointer">
                    <p className="text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors">Làng nghề truyền thống tại Hà Nam được công nhận di sản văn hóa</p>
                    <p className="text-xs text-gray-500">5 giờ trước</p>
                  </div>
                  <div className="group cursor-pointer">
                    <p className="text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors">Khám phá 10 món ăn đường phố nổi tiếng tại Việt Nam</p>
                    <p className="text-xs text-gray-500">8 giờ trước</p>
                  </div>
                </div>
                <button className="mt-3 text-sm text-blue-600 hover:text-blue-800 font-medium">
                  Xem tất cả
                </button>
              </div>
              
              {/* Footer */}
              <div className="text-xs text-gray-500 px-2">
                <p>© 2023 UEH BizTech · Điều khoản · Chính sách · Trợ giúp</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <CreateMomentModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setCreateModalOpen(false)} 
        onMomentCreate={handleCreateMoment} 
      />
      
      {selectedMoment && (
        <MomentDetailModal moment={selectedMoment} onClose={handleCloseDetailModal} />
      )}
      
      {/* CSS cho custom scrollbar */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
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

export default MomentFeed; 