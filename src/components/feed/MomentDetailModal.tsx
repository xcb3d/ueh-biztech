'use client';

import React from 'react';
import { createPortal } from 'react-dom';
import { Moment, Comment } from '@/types/map-types';
import { feelings } from '@/data/feelingData';
import { 
  XMarkIcon,
  HeartIcon as HeartIconOutline, 
  ChatBubbleLeftRightIcon, 
  ShareIcon 
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { comments as allComments } from '@/data/commentData';
import { users } from '@/data/userData';


interface MomentDetailModalProps {
  moment: Moment;
  onClose: () => void;
}

const MomentDetailModalComponent: React.FC<MomentDetailModalProps> = ({ moment, onClose }) => {
  const [isMounted, setIsMounted] = React.useState(false);
  
  // States for interactions
  const [isLiked, setIsLiked] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(Math.floor(Math.random() * 20));
  const [displayedComments, setDisplayedComments] = React.useState<Comment[]>([]);
  const [newComment, setNewComment] = React.useState('');
  
  const images = moment.images || (moment.imageUrl ? [moment.imageUrl] : []);

  React.useEffect(() => {
    setIsMounted(true);
    document.body.style.overflow = 'hidden';
    
    const momentComments = allComments.filter(comment => moment.commentIds?.includes(comment.id));
    setDisplayedComments(momentComments);

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [moment.commentIds]);
  
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const currentUser = users.find(u => u.id === 'user-1');
    if (!currentUser) return;

    const newCommentObject: Comment = {
      id: `comment-new-${Date.now()}`,
      author: currentUser,
      content: newComment.trim(),
      createdAt: new Date().toISOString(),
    };

    setDisplayedComments(prev => [...prev, newCommentObject]);
    setNewComment('');
  };


  if (!isMounted) {
    return null;
  }

  const modalContent = (
    <>
      <div 
        className="fixed inset-0 bg-white/80 dark:bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in"
        onClick={onClose}
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-200/50 dark:bg-gray-800/50 text-black dark:text-white hover:bg-gray-300/70"
          aria-label="Đóng"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        
        <div 
          className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl w-full max-w-6xl max-h-[95vh] md:h-[720px] flex flex-col md:flex-row" 
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image Slider Side */}
          <div className="w-full md:w-1/2 bg-black relative flex items-center justify-center overflow-hidden">
            {images.length > 0 ? (
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                className="w-full h-full"
              >
                {images.map((img, index) => (
                  <SwiperSlide key={index} className="flex items-center justify-center bg-black">
                    <div className="relative w-full h-full">
                       <Image
                          src={img}
                          alt={`${moment.title} - ảnh ${index + 1}`}
                          layout="fill"
                          objectFit="contain"
                       />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="text-gray-500">Không có ảnh</div>
            )}
          </div>
          
          {/* Content Side */}
          <div className="w-full md:w-1/2 flex flex-col">
            <div className="p-5 border-b dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <Image src={moment.author.avatarUrl} alt={moment.author.name} width={44} height={44} className="rounded-full" />
                <div>
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                    {moment.author.name}
                    {moment.feeling && feelings[moment.feeling] && (
                      <span className="font-normal text-gray-600 dark:text-gray-400"> đang cảm thấy <span className="font-semibold">{feelings[moment.feeling].text} {feelings[moment.feeling].emoji}</span></span>
                    )}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{new Date(moment.createdAt).toLocaleDateString('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
              </div>
            </div>

            {/* Comments Section is the main scrollable area now */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
               {/* Post content is now inside the scrollable area */}
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{moment.title}</h2>
              <p className="text-gray-700 dark:text-gray-300 text-base">{moment.content}</p>

              {moment.hashtags && moment.hashtags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {moment.hashtags.map((tag, index) => (
                    <span key={index} className="text-sm font-medium text-blue-600 hover:underline cursor-pointer">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              
              {/* Divider */}
              <hr className="border-gray-200 dark:border-gray-700 my-4" />

              {/* Comments */}
              {displayedComments.map(comment => (
                <div key={comment.id} className="flex items-start space-x-3">
                  <Image src={comment.author.avatarUrl} alt={comment.author.name} width={36} height={36} className="rounded-full" />
                  <div className="flex-1">
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-3">
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{comment.author.name}</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{comment.content}</p>
                    </div>
                     <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{new Date(comment.createdAt).toLocaleDateString('vi-VN', { day: 'numeric', month: 'numeric', year: 'numeric' })}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions and Comment Input are at the bottom */}
            <div className="mt-auto">
              <div className="px-5 py-3 border-t dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 flex justify-between">
                <div className="flex space-x-4">
                  <button onClick={(e) => { e.stopPropagation(); setIsLiked(!isLiked); setLikeCount(p => isLiked ? p - 1 : p + 1); }} className="flex items-center space-x-1 text-gray-500 hover:text-blue-600">
                    {isLiked ? <HeartIconSolid className="h-5 w-5 text-red-500" /> : <HeartIconOutline className="h-5 w-5" />}
                    <span className="text-sm">{likeCount}</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600">
                    <ChatBubbleLeftRightIcon className="h-5 w-5" />
                    <span className="text-sm">{displayedComments.length}</span>
                  </button>
                </div>
                <button onClick={(e) => e.stopPropagation()} className="text-gray-500 hover:text-blue-600">
                  <ShareIcon className="h-5 w-5" />
                </button>
              </div>
              
              <div className="p-3 border-t dark:border-gray-700">
                <form onSubmit={handleCommentSubmit} className="flex items-center space-x-2">
                  <Image src={users.find(u => u.id === 'user-1')!.avatarUrl} alt="Your avatar" width={36} height={36} className="rounded-full" />
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Viết bình luận..."
                    className="w-full bg-gray-100 dark:bg-gray-700 border-none rounded-full py-2 px-4 focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                  <button type="submit" className="text-blue-600 font-semibold text-sm hover:text-blue-700 disabled:text-gray-400" disabled={!newComment.trim()}>
                    Gửi
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );

  const modalRoot = document.getElementById('modal-root');
  return modalRoot ? createPortal(modalContent, modalRoot) : null;
};

// CSS styles
const styles = `
.swiper-pagination-bullet-active {
  background-color: #ffffff !important;
}
.swiper-button-next, .swiper-button-prev {
  color: #ffffff !important;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  width: 44px !important;
  height: 44px !important;
  transition: background-color 0.2s;
}
.swiper-button-next:hover, .swiper-button-prev:hover {
  background-color: rgba(0, 0, 0, 0.5);
}
.swiper-button-next:after, .swiper-button-prev:after {
  font-size: 18px !important;
  font-weight: bold;
}
`;

const MomentDetailModal: React.FC<MomentDetailModalProps> = (props) => (
  <>
    <style>{styles}</style>
    <MomentDetailModalComponent {...props} />
  </>
);

export default MomentDetailModal; 