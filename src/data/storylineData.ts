import { User } from '@/types/map-types';
import { users } from './userData';

export interface Storyline {
  id: string;
  title: string;
  author: User;
  description: string;
  momentIds: string[];
  coverImage: string; // A representative image for the storyline
}

const user1 = users.find(u => u.id === 'user-1')!;
const user2 = users.find(u => u.id === 'user-2')!;

export const storylines: Storyline[] = [
  {
    id: 'storyline-1',
    title: 'Hành trình cà phê Sài Gòn',
    author: user1,
    description: 'Khám phá những quán cà phê mang đậm dấu ấn thời gian và không khí đặc trưng của Sài Gòn.',
    momentIds: ['moment-hcm-cafe-1', 'moment-hcm-cafe-2'],
    coverImage: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 'storyline-2',
    title: 'Một ngày ở Hà Nội cổ kính',
    author: user2,
    description: 'Dạo bước qua những con phố và địa danh lịch sử, cảm nhận nhịp sống chậm rãi của thủ đô ngàn năm văn hiến.',
    momentIds: ['moment-hanoi-1', 'moment-hanoi-2'],
    coverImage: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
]; 