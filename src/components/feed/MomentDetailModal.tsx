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
import { motion, AnimatePresence } from 'framer-motion';


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
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop với hiệu ứng blur và gradient */}
        <motion.div 
          className="absolute inset-0 backdrop-blur-md"
          initial={{ backdropFilter: "blur(0px)" }}
          animate={{ backdropFilter: "blur(8px)" }}
          exit={{ backdropFilter: "blur(0px)" }}
          transition={{ duration: 0.4 }}
          style={{
            background: "radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, rgba(200,200,255,0.1) 100%)"
          }}
        />
        
        <motion.button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/30 backdrop-blur-md text-black hover:bg-white/50 transition-colors"
          aria-label="Đóng"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <XMarkIcon className="h-6 w-6" />
        </motion.button>
        
        <motion.div 
          className="relative w-full max-w-6xl max-h-[95vh] md:h-[720px] flex flex-col md:flex-row overflow-hidden"
          onClick={(e) => e.stopPropagation()}
          initial={{ y: 50, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 50, opacity: 0, scale: 0.9 }}
          transition={{ 
            type: "spring", 
            damping: 25, 
            stiffness: 300
          }}
        >
          {/* Image Slider Side */}
          <motion.div 
            className="w-full md:w-1/2 bg-black relative flex items-center justify-center overflow-hidden rounded-l-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
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
          </motion.div>
          
          {/* Content Side - Glassmorphism Effect */}
          <motion.div 
            className="w-full md:w-1/2 flex flex-col rounded-r-lg"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.18)'
            }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div 
              className="p-5 border-b border-white/20"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center space-x-3">
                <Image src={moment.author.avatarUrl} alt={moment.author.name} width={44} height={44} className="rounded-full ring-2 ring-white/50" />
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {moment.author.name}
                    {moment.feeling && feelings[moment.feeling] && (
                      <span className="font-normal text-gray-600"> đang cảm thấy <span className="font-semibold">{feelings[moment.feeling].text} {feelings[moment.feeling].emoji}</span></span>
                    )}
                  </p>
                  <p className="text-xs text-gray-500">{new Date(moment.createdAt).toLocaleDateString('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
              </div>
            </motion.div>

            {/* Comments Section is the main scrollable area now */}
            <motion.div 
              className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
               {/* Post content is now inside the scrollable area */}
              <motion.h2 
                className="text-xl font-bold text-gray-900"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                {moment.title}
              </motion.h2>
              <motion.p 
                className="text-gray-700 text-base"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                {moment.content}
              </motion.p>

              {moment.hashtags && moment.hashtags.length > 0 && (
                <motion.div 
                  className="flex flex-wrap gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  {moment.hashtags.map((tag, index) => (
                    <span key={index} className="text-sm font-medium text-blue-600">
                      {tag}
                    </span>
                  ))}
                </motion.div>
              )}
              
              {/* Divider */}
              <hr className="border-white/20 my-4" />

              {/* Comments */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                {displayedComments.map((comment, index) => (
                  <motion.div 
                    key={comment.id} 
                    className="flex items-start space-x-3 mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                  >
                    <Image src={comment.author.avatarUrl} alt={comment.author.name} width={36} height={36} className="rounded-full" />
                    <div className="flex-1">
                      <div className="bg-white/50 backdrop-blur-sm rounded-xl p-3 shadow-sm">
                        <p className="text-sm font-semibold text-gray-800">{comment.author.name}</p>
                        <p className="text-sm text-gray-700">{comment.content}</p>
                      </div>
                       <p className="text-xs text-gray-500 mt-1">{new Date(comment.createdAt).toLocaleDateString('vi-VN', { day: 'numeric', month: 'numeric', year: 'numeric' })}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Actions and Comment Input are at the bottom */}
            <motion.div 
              className="mt-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <div className="px-5 py-3 border-t border-white/20 bg-white/10 backdrop-blur-sm flex justify-between">
                <div className="flex space-x-4">
                  <motion.button 
                    onClick={(e) => { e.stopPropagation(); setIsLiked(!isLiked); setLikeCount(p => isLiked ? p - 1 : p + 1); }} 
                    className="flex items-center space-x-1 text-gray-500"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isLiked ? <HeartIconSolid className="h-5 w-5 text-red-500" /> : <HeartIconOutline className="h-5 w-5" />}
                    <span className="text-sm">{likeCount}</span>
                  </motion.button>
                  <motion.button 
                    className="flex items-center space-x-1 text-gray-500"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChatBubbleLeftRightIcon className="h-5 w-5" />
                    <span className="text-sm">{displayedComments.length}</span>
                  </motion.button>
                </div>
                <motion.button 
                  onClick={(e) => e.stopPropagation()} 
                  className="text-gray-500"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ShareIcon className="h-5 w-5" />
                </motion.button>
              </div>
              
              <div className="p-3 border-t border-white/20 bg-white/30 backdrop-blur-sm">
                <form onSubmit={handleCommentSubmit} className="flex items-center space-x-2">
                  <Image src={users.find(u => u.id === 'user-1')!.avatarUrl} alt="Your avatar" width={36} height={36} className="rounded-full" />
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Viết bình luận..."
                    className="w-full bg-white/50 backdrop-blur-sm border-none rounded-full py-2 px-4 focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                  <motion.button 
                    type="submit" 
                    className="text-blue-600 font-semibold text-sm disabled:text-gray-400"
                    disabled={!newComment.trim()}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Gửi
                  </motion.button>
                </form>
              </div>
            </motion.div>

          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
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
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}
`;

const MomentDetailModal: React.FC<MomentDetailModalProps> = (props) => (
  <>
    <style>{styles}</style>
    <MomentDetailModalComponent {...props} />
  </>
);

export default MomentDetailModal; 