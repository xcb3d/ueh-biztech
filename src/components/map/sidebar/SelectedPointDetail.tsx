import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/outline';

import { Location, Moment } from '@/types/map-types';
import { CraftVillage } from '@/data/craft-villages';
import { memories as allMoments } from '@/data/memoryData';
import { events as allEvents } from '@/data/eventData';
import CreateMomentModal from '../../feed/CreateMomentModal';

interface SelectedPointDetailProps {
  point: Location | CraftVillage;
  onBack: () => void;
}

const SelectedPointDetail: React.FC<SelectedPointDetailProps> = ({ point, onBack }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const momentsAtPoint = allMoments.filter(m => m.locationId === point.id);
  const eventsAtPoint = point.type === 'location' ? allEvents.filter(e => e.locationId === point.id) : [];
  
  // In a real app, you'd update a global state.
  const handleCreateMoment = (newMoment: Moment) => {
    console.log('New moment created:', newMoment);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="p-5 border-b border-gray-200">
        <button 
          onClick={onBack} 
          className="text-sm text-blue-600 hover:underline mb-4 flex items-center font-semibold"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Tất cả địa điểm
        </button>

        <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4">
          <Image
            src={point.heroImage}
            alt={`Hình ảnh của ${point.name}`}
            layout="fill"
            objectFit="cover"
          />
        </div>

        <h2 className={`text-2xl font-bold mb-2 ${point.type === 'craft-village' ? 'text-purple-800' : 'text-gray-900'}`}>{point.name}</h2>
        <p className="text-sm text-gray-700">{point.summary}</p>
      </div>

      {point.type === 'location' && eventsAtPoint.length > 0 && (
        <div className="p-5 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-3">Sự kiện sắp diễn ra</h3>
          <ul className="space-y-3">
            {eventsAtPoint.map(event => (
              <li key={event.id}>
                <Link href={`/event/${event.id}`} className="block p-3 rounded-lg hover:bg-gray-100 transition-colors">
                    <p className="font-semibold text-gray-800">{event.name}</p>
                    <p className="text-sm text-gray-500">{new Date(event.startTime).toLocaleDateString('vi-VN')} - {new Date(event.endTime).toLocaleDateString('vi-VN')}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-5">
        <div className="my-5">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <PlusIcon className="h-5 w-5" />
            <span>Chia sẻ Khoảnh khắc của bạn</span>
          </button>
        </div>

        <h3 className="font-semibold text-lg text-gray-800 mb-4">
          Khoảnh khắc tại đây ({momentsAtPoint.length})
        </h3>
        <div className="space-y-4">
          {momentsAtPoint.length > 0 ? (
            momentsAtPoint.map(moment => (
              <div key={moment.id} className="bg-white rounded-lg p-3 border border-gray-200/80 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center mb-2">
                  <Image
                    src={moment.author.avatarUrl}
                    alt={moment.author.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <div className="ml-2">
                    <p className="text-sm font-semibold text-gray-800">{moment.author.name}</p>
                    <p className="text-xs text-gray-500">{new Date(moment.createdAt).toLocaleDateString('vi-VN')}</p>
                  </div>
                </div>
                <h4 className="font-semibold text-md text-gray-900 mb-1">{moment.title}</h4>
                <p className="text-sm text-gray-600 line-clamp-2">{moment.content}</p>
              </div>
            ))
          ) : (
            <div className="text-center py-8 px-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600 font-medium">Chưa có khoảnh khắc nào</p>
              <p className="text-sm text-gray-500 mt-1">Hãy là người đầu tiên chia sẻ!</p>
            </div>
          )}
        </div>
        
        <div className="mt-6 text-center">
            <Link 
              href={point.type === 'location' ? `/location/${point.id}` : `/lang-nghe/${point.slug}`} 
              className="text-sm font-semibold text-blue-600 hover:underline"
            >
                {point.type === 'location' ? `Xem bài viết chi tiết về ${point.name}` : 'Xem trang riêng'} &rarr;
            </Link>
        </div>
      </div>

       <CreateMomentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onMomentCreate={handleCreateMoment}
        preselectedLocationId={point.id}
      />
    </>
  );
};

export default SelectedPointDetail; 