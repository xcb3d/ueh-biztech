import { users } from './userData';

export interface Story {
  id: string;
  userId: string;
  imageUrl: string;
  caption?: string;
  createdAt: string;
  expiresAt: string; // 24 giờ sau createdAt
  viewed: boolean;
  location?: string;
  hasText?: boolean;
  textContent?: string;
  textPosition?: 'center' | 'top' | 'bottom';
  textColor?: string;
  filter?: string;
  theme?: 'traditional' | 'festival' | 'food' | 'heritage' | 'landscape';
}

// Helper để tạo thời gian hết hạn (24 giờ sau khi tạo)
const getExpiryTime = (createdAt: string): string => {
  const createdDate = new Date(createdAt);
  const expiryDate = new Date(createdDate.getTime() + 24 * 60 * 60 * 1000);
  return expiryDate.toISOString();
};

// Tạo stories cho mỗi user với chủ đề văn hóa Việt Nam
export const stories: Story[] = [
  // User 1 stories - Chủ đề di sản văn hóa
  {
    id: 'story-1',
    userId: 'user-1',
    imageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1470&auto=format&fit=crop',
    caption: 'Phố cổ Hội An - Di sản văn hóa thế giới UNESCO',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 giờ trước
    expiresAt: getExpiryTime(new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()),
    viewed: false,
    location: 'Hội An, Quảng Nam',
    theme: 'heritage',
  },
  
  // User 2 stories - Chủ đề ẩm thực
  {
    id: 'story-2',
    userId: 'user-2',
    imageUrl: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=1470&auto=format&fit=crop',
    caption: 'Chợ nổi Cái Răng - Nét văn hóa đặc trưng miền Tây',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 giờ trước
    expiresAt: getExpiryTime(new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()),
    viewed: false,
    location: 'Cần Thơ',
    theme: 'traditional',
  },
  
  // User 3 stories - Chủ đề cảnh quan
  {
    id: 'story-3',
    userId: 'user-3',
    imageUrl: 'https://images.unsplash.com/photo-1573270689103-d7a4e42b609a?q=80&w=1471&auto=format&fit=crop',
    hasText: true,
    textContent: 'Vịnh Hạ Long - Kỳ quan thiên nhiên thế giới',
    textPosition: 'bottom',
    textColor: '#ffffff',
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 giờ trước
    expiresAt: getExpiryTime(new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString()),
    viewed: false,
    location: 'Vịnh Hạ Long, Quảng Ninh',
    theme: 'landscape',
  },
  
  // User 4 stories - Chủ đề truyền thống
  {
    id: 'story-4',
    userId: 'user-4',
    imageUrl: 'https://images.unsplash.com/photo-1602158123199-91c7d5bd0801?q=80&w=1470&auto=format&fit=crop',
    caption: 'Ruộng bậc thang Mù Cang Chải - Nghệ thuật nông nghiệp truyền thống',
    createdAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(), // 10 giờ trước
    expiresAt: getExpiryTime(new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString()),
    viewed: true,
    location: 'Mù Cang Chải, Yên Bái',
    theme: 'traditional',
  },
  
  // User 5 stories - Chủ đề di sản văn hóa
  {
    id: 'story-5',
    userId: 'user-5',
    imageUrl: 'https://images.unsplash.com/photo-1599708153386-62bf3489c828?q=80&w=1470&auto=format&fit=crop',
    hasText: true,
    textContent: 'Phố cổ Hà Nội - 36 phố phường',
    textPosition: 'center',
    textColor: '#ffffff',
    createdAt: new Date(Date.now() - 15 * 60 * 60 * 1000).toISOString(), // 15 giờ trước
    expiresAt: getExpiryTime(new Date(Date.now() - 15 * 60 * 60 * 1000).toISOString()),
    viewed: false,
    location: 'Phố cổ, Hà Nội',
    theme: 'heritage',
  },
  
  // User 6 stories - Chủ đề di tích lịch sử
  {
    id: 'story-6',
    userId: 'user-6',
    imageUrl: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=1528&auto=format&fit=crop',
    caption: 'Chùa Thiên Mụ - Biểu tượng cố đô Huế',
    createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(), // 18 giờ trước
    expiresAt: getExpiryTime(new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString()),
    viewed: true,
    location: 'Huế, Thừa Thiên Huế',
    theme: 'heritage',
  },
  
  // Thêm story cho user 1 - Chủ đề cảnh quan
  {
    id: 'story-7',
    userId: 'user-1',
    imageUrl: 'https://images.unsplash.com/photo-1589786742305-f24d19aaef8f?q=80&w=1470&auto=format&fit=crop',
    hasText: true,
    textContent: 'Đèo Hải Vân - Đệ nhất hùng quan',
    textPosition: 'bottom',
    textColor: '#ffffff',
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 giờ trước
    expiresAt: getExpiryTime(new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()),
    viewed: false,
    location: 'Đèo Hải Vân, Đà Nẵng',
    theme: 'landscape',
  },
  
  // Thêm story cho user 3 - Chủ đề di sản thiên nhiên
  {
    id: 'story-8',
    userId: 'user-3',
    imageUrl: 'https://images.unsplash.com/photo-1558032040-444efccf5ec3?q=80&w=1470&auto=format&fit=crop',
    caption: 'Hang Sơn Đoòng - Hang động lớn nhất thế giới',
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 giờ trước
    expiresAt: getExpiryTime(new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString()),
    viewed: false,
    location: 'Phong Nha - Kẻ Bàng, Quảng Bình',
    theme: 'landscape',
  },
  
  // Thêm story mới - Chủ đề lễ hội truyền thống
  {
    id: 'story-9',
    userId: 'user-2',
    imageUrl: 'https://images.unsplash.com/photo-1613128566804-6c1e0e86cc4a?q=80&w=1470&auto=format&fit=crop',
    hasText: true,
    textContent: 'Tết Nguyên Đán - Lễ hội lớn nhất Việt Nam',
    textPosition: 'center',
    textColor: '#ffcd00',
    createdAt: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(), // 7 giờ trước
    expiresAt: getExpiryTime(new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString()),
    viewed: false,
    location: 'Toàn quốc',
    theme: 'festival',
  },
  
  // Thêm story về ẩm thực
  {
    id: 'story-10',
    userId: 'user-5',
    imageUrl: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1470&auto=format&fit=crop',
    caption: 'Phở - Linh hồn ẩm thực Việt Nam',
    createdAt: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(), // 9 giờ trước
    expiresAt: getExpiryTime(new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString()),
    viewed: false,
    location: 'Hà Nội',
    theme: 'food',
  },
  
  // Thêm story về nghề truyền thống
  {
    id: 'story-11',
    userId: 'user-6',
    imageUrl: 'https://images.unsplash.com/photo-1628105541664-ae6ee8d261fc?q=80&w=1470&auto=format&fit=crop',
    hasText: true,
    textContent: 'Làng nghề gốm Bát Tràng - Di sản văn hóa phi vật thể',
    textPosition: 'bottom',
    textColor: '#ffffff',
    createdAt: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(), // 14 giờ trước
    expiresAt: getExpiryTime(new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString()),
    viewed: false,
    location: 'Bát Tràng, Hà Nội',
    theme: 'traditional',
  },
  
  // Thêm story về lễ hội
  {
    id: 'story-12',
    userId: 'user-4',
    imageUrl: 'https://images.unsplash.com/photo-1622956051717-0c7d48c1b4d5?q=80&w=1470&auto=format&fit=crop',
    caption: 'Lễ hội Đền Hùng - Tưởng nhớ các Vua Hùng dựng nước',
    createdAt: new Date(Date.now() - 16 * 60 * 60 * 1000).toISOString(), // 16 giờ trước
    expiresAt: getExpiryTime(new Date(Date.now() - 16 * 60 * 60 * 1000).toISOString()),
    viewed: true,
    location: 'Phú Thọ',
    theme: 'festival',
  }
];

// Helper để lấy stories của một user
export const getUserStories = (userId: string): Story[] => {
  return stories.filter(story => story.userId === userId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

// Helper để lấy users có stories
export const getUsersWithStories = () => {
  const userIds = [...new Set(stories.map(story => story.userId))];
  return users.filter(user => userIds.includes(user.id));
};

// Helper để kiểm tra xem user có story chưa xem không
export const hasUnviewedStories = (userId: string): boolean => {
  const userStories = getUserStories(userId);
  return userStories.some(story => !story.viewed);
};

// Helper để lấy stories theo chủ đề
export const getStoriesByTheme = (theme: Story['theme']): Story[] => {
  return stories.filter(story => story.theme === theme)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}; 