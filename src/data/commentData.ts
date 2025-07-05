import { Comment } from '@/types/map-types';
import { users } from './userData';

// Helper to get user objects by ID
const user1 = users.find(u => u.id === 'user-1')!;
const user2 = users.find(u => u.id === 'user-2')!;
const user3 = users.find(u => u.id === 'user-3')!;
const user4 = users.find(u => u.id === 'user-4')!;

export const comments: Comment[] = [
  {
    id: 'comment-1',
    author: user2,
    content: 'Wow, góc chụp đẹp quá bạn ơi! Nhìn hoàng hôn mà mê mẩn.',
    createdAt: '2024-06-28T18:00:00Z',
  },
  {
    id: 'comment-2',
    author: user3,
    content: 'Mình cũng vừa đến đây tuần trước. Nơi này thực sự mang lại cảm giác rất hoài niệm.',
    createdAt: '2024-06-28T19:30:00Z',
  },
  {
    id: 'comment-3',
    author: user1,
    content: 'Cảm ơn bạn đã chia sẻ, mình sẽ ghé thăm nơi này vào cuối tuần!',
    createdAt: '2024-06-26T11:00:00Z',
  },
  {
    id: 'comment-4',
    author: user4,
    content: 'Tuyệt vời! Ảnh nét và màu sắc đẹp quá.',
    createdAt: '2024-06-27T08:00:00Z',
  },
  {
    id: 'comment-5',
    author: user1,
    content: 'Cà phê trứng ở đây là số một rồi!',
    createdAt: '2024-06-20T16:00:00Z',
  },
  {
    id: 'comment-6',
    author: user2,
    content: 'Đúng là một trải nghiệm đáng nhớ.',
    createdAt: '2024-05-18T22:00:00Z',
  },
  {
    id: 'comment-7',
    author: user4,
    content: 'Phố cổ Hội An về đêm đẹp như một bức tranh vậy.',
    createdAt: '2024-06-22T21:00:00Z',
  },
]; 