import { Moment } from '@/types/map-types';
import { users } from './userData';

// Helper to get user objects by ID
const user1 = users.find(u => u.id === 'user-1')!;
const user2 = users.find(u => u.id === 'user-2')!;
const user3 = users.find(u => u.id === 'user-3')!;
const user4 = users.find(u => u.id === 'user-4')!;

export const moments: Moment[] = [
  // Moments in HCM
  {
    id: 'moment-hcm-1',
    locationId: 'hcm',
    author: user1,
    title: 'Bưu điện thành phố lúc hoàng hôn',
    content: 'Ánh nắng cuối ngày chiếu qua những ô cửa kính cổ kính thật sự rất đẹp. Một nơi tuyệt vời để chụp ảnh và cảm nhận sự giao thoa giữa quá khứ và hiện tại.',
    createdAt: '2024-06-28T17:30:00Z',
    images: Array(5).fill('https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
    feeling: 'peaceful',
    hashtags: ['#saigon', '#sunset', '#hoanghon'],
    commentIds: ['comment-1', 'comment-2'],
  },
  {
    id: 'moment-hcm-2',
    locationId: 'hcm-dinhdoclap',
    author: user3,
    title: 'Học về lịch sử tại Dinh Độc Lập',
    content: 'Một buổi sáng đầy ý nghĩa khi được tìm hiểu sâu hơn về lịch sử Việt Nam qua các hiện vật và câu chuyện tại Dinh. Rất đáng để đi!',
    createdAt: '2024-06-25T10:00:00Z',
    images: Array(3).fill('https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
    hashtags: ['#dinhdoclap', '#history', '#vietnam'],
    commentIds: ['comment-3'],
  },

  // Moments in Hanoi
  {
    id: 'moment-hanoi-1',
    locationId: 'hanoi-hoguom',
    author: user2,
    title: 'Đi dạo quanh Hồ Gươm',
    content: 'Không khí trong lành và yên bình vào buổi sáng sớm. Gặp gỡ những người dân địa phương tập thể dục thật thú vị.',
    createdAt: '2024-06-27T06:00:00Z',
    images: Array(7).fill('https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
    hashtags: ['#hanoi', '#hoguom', '#peaceful'],
    commentIds: ['comment-4'],
  },
  {
    id: 'moment-hanoi-2',
    locationId: 'hanoi-phoco',
    author: user4,
    title: 'Cà phê trứng ở Phố Cổ',
    content: 'Lần đầu thử cà phê trứng và nó ngon không tưởng! Không gian quán nhỏ xinh, đậm chất Hà Nội. Sẽ quay lại lần nữa.',
    createdAt: '2024-06-20T15:00:00Z',
    images: Array(4).fill('https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
    feeling: 'excited',
    hashtags: ['#caphetrung', '#hanoifood', '#phoco'],
    commentIds: ['comment-5'],
  },
  
  // Moments in Da Nang
  {
    id: 'moment-danang-1',
    locationId: 'danang-caurong',
    author: user1,
    title: 'Cầu Rồng phun lửa!',
    content: 'Phải canh đúng 9h tối cuối tuần mới xem được. Rất đông nhưng vô cùng hoành tráng và đáng xem. Một biểu tượng của Đà Nẵng năng động.',
    createdAt: '2024-05-18T21:00:00Z',
    images: Array(8).fill('https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
    hashtags: ['#danang', '#caurong', '#dragonbridge'],
    commentIds: ['comment-6'],
  },
  
  // Moments in Hue
  {
    id: 'moment-hue-1',
    locationId: 'hue-da-noi',
    author: user2,
    title: 'Một chiều trong Đại Nội',
    content: 'Không gian cổ kính, trầm mặc. Đi bộ mỏi cả chân nhưng mỗi góc đều có một câu chuyện riêng. Cảm giác như lạc vào một thế giới khác.',
    createdAt: '2024-04-10T14:00:00Z',
    images: Array(3).fill('https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
    hashtags: ['#hue', '#dainoi', '#kinhthanhhue'],
  },

  // Moments in Hoi An
  {
    id: 'moment-hoian-1',
    locationId: 'hoian-pho-co',
    author: user3,
    title: 'Phố Hội về đêm',
    content: 'Đèn lồng ở Hội An thực sự là một ma thuật. Không có từ nào để diễn tả hết vẻ đẹp của nơi này khi đêm xuống. Lãng mạn và yên bình.',
    createdAt: '2024-06-22T20:00:00Z',
    images: Array(6).fill('https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
    hashtags: ['#hoian', '#phocohoian', '#denlong'],
    commentIds: ['comment-7'],
  },

  // New Coffee Storyline Moments
  {
    id: 'moment-hcm-cafe-1',
    locationId: 'hcm-caphevot',
    author: user1,
    title: 'Hương vị Sài Gòn xưa trong ly cà phê vợt',
    content: 'Ngồi trên chiếc ghế đẩu, nhìn dòng xe qua lại và thưởng thức ly cà phê đậm đặc được pha bằng vợt. Một trải nghiệm rất khác, rất Sài Gòn. Cảm giác như thời gian chậm lại.',
    createdAt: '2024-07-01T08:00:00Z',
    images: Array(5).fill('https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
    hashtags: ['#caphevot', '#saigoncoffee', '#saigonxua'],
  },
  {
    id: 'moment-hcm-cafe-2',
    locationId: 'hcm-caphechungcu',
    author: user1,
    title: 'Trốn mình trong một góc chung cư cũ',
    content: 'Sau khi lòng vòng tìm đường, cuối cùng cũng đến được quán. Không gian yên tĩnh, nhạc nhẹ nhàng, view nhìn xuống phố đi bộ. Một nơi hoàn hảo để đọc sách và ngắm nhìn một Sài Gòn rất khác.',
    createdAt: '2024-07-01T10:30:00Z',
    images: Array(4).fill('https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
    feeling: 'nostalgic',
    hashtags: ['#caphechungcu', '#hiddengem', '#saigon'],
  }
];