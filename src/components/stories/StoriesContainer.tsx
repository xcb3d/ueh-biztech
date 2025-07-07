'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import StoryCircle from './StoryCircle';
import StoryViewer from './StoryViewer';
import CreateStory from './CreateStory';
import { getUsersWithStories, getUserStories } from '@/data/storyData';
import { User } from '@/types/map-types';

const StoriesContainer: React.FC = () => {
  const [usersWithStories, setUsersWithStories] = useState<User[]>([]);
  const [currentUserIndex, setCurrentUserIndex] = useState<number | null>(null);
  const [showCreateStory, setShowCreateStory] = useState(false);
  
  useEffect(() => {
    // Lấy danh sách users có stories
    const users = getUsersWithStories();
    setUsersWithStories(users);
  }, []);
  
  const handleOpenStory = (userId: string) => {
    const userIndex = usersWithStories.findIndex(user => user.id === userId);
    if (userIndex !== -1) {
      setCurrentUserIndex(userIndex);
    }
  };
  
  const handleCloseStory = () => {
    setCurrentUserIndex(null);
  };
  
  const handleNextUser = () => {
    if (currentUserIndex !== null && currentUserIndex < usersWithStories.length - 1) {
      setCurrentUserIndex(currentUserIndex + 1);
    } else {
      handleCloseStory();
    }
  };
  
  const handlePrevUser = () => {
    if (currentUserIndex !== null && currentUserIndex > 0) {
      setCurrentUserIndex(currentUserIndex - 1);
    }
  };
  
  const handleOpenCreateStory = () => {
    setShowCreateStory(true);
  };
  
  const handleCloseCreateStory = () => {
    setShowCreateStory(false);
  };
  
  const handleSubmitStory = (data: {
    imageFile: File | null;
    caption?: string;
    location?: string;
    hasText?: boolean;
    textContent?: string;
    textPosition?: 'center' | 'top' | 'bottom';
    textColor?: string;
  }) => {
    // Trong môi trường thực tế, ở đây sẽ gửi dữ liệu lên server
    console.log('Story data:', data);
    
    // Đóng modal tạo story
    setShowCreateStory(false);
    
    // Hiển thị thông báo thành công (có thể thêm toast notification ở đây)
    alert('Story đã được tạo thành công!');
  };

  return (
    <div className="py-4 px-2 bg-white rounded-lg shadow-sm">
      {/* Container cho story circles */}
      <div className="flex space-x-4 overflow-x-auto py-2 px-2 scrollbar-thin">
        {/* Tạo mới story */}
        <div className="flex-shrink-0">
          <div 
            className="w-20 h-20 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={handleOpenCreateStory}
          >
            <span className="text-3xl text-gray-400">+</span>
          </div>
          <p className="mt-1 text-sm text-center text-gray-500">Tạo mới</p>
        </div>
        
        {/* Story circles */}
        {usersWithStories.map((user) => (
          <div key={user.id} className="flex-shrink-0">
            <StoryCircle user={user} onOpenStory={handleOpenStory} />
          </div>
        ))}
      </div>
      
      {/* Story Viewer */}
      <AnimatePresence>
        {currentUserIndex !== null && (
          <StoryViewer
            stories={getUserStories(usersWithStories[currentUserIndex].id)}
            user={usersWithStories[currentUserIndex]}
            onClose={handleCloseStory}
            onNext={handleNextUser}
            onPrev={handlePrevUser}
          />
        )}
      </AnimatePresence>
      
      {/* Create Story Modal */}
      <AnimatePresence>
        {showCreateStory && (
          <CreateStory 
            onClose={handleCloseCreateStory}
            onSubmit={handleSubmitStory}
          />
        )}
      </AnimatePresence>
      
      {/* CSS cho scrollbar */}
      <style jsx global>{`
        .scrollbar-thin::-webkit-scrollbar {
          height: 4px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 2px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #ccc;
          border-radius: 2px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #999;
        }
      `}</style>
    </div>
  );
};

export default StoriesContainer; 