'use client';

import React, { useState, useEffect } from 'react';
import MomentCard from './MomentCard';
import MomentCardSkeleton from './MomentCardSkeleton';
import { moments as initialMoments } from '@/data/momentData';
import { storylines as initialStorylines } from '@/data/storylineData';
import { Moment } from '@/types/map-types';
import CreateMomentModal from './CreateMomentModal';
import MomentDetailModal from './MomentDetailModal';
import { UserIcon } from '@heroicons/react/24/solid';
import StorylineCard from './StorylineCard';

const CreateMomentTrigger = ({ onClick }: { onClick: () => void }) => (
  <div className="bg-white rounded-xl shadow-md p-4 mb-6 border border-gray-200/80">
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

const MomentFeed: React.FC = () => {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [selectedMoment, setSelectedMoment] = useState<Moment | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
    setIsLoading(false);
  }, []);

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

  return (
    <>
      <div className="w-full max-w-2xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Dòng chảy Khoảnh khắc</h1>
        <CreateMomentTrigger onClick={() => setCreateModalOpen(true)} />
        <div className="space-y-6">
          {isLoading
            ? Array.from({ length: 7 }).map((_, index) => <MomentCardSkeleton key={index} />)
            : feedItems.map(item => {
                if (item.type === 'moment') {
                  return <MomentCard key={`moment-${item.id}`} moment={item} onCardClick={handleMomentClick} />;
                }
                if (item.type === 'storyline') {
                  return <StorylineCard key={`storyline-${item.id}`} storyline={item} />;
                }
                return null;
              })
          }
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
    </>
  );
};

export default MomentFeed; 