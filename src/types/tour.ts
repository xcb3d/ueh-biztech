export interface TourProvider {
  id: string;
  name: string;
  logo: string;
  website: string;
}

export interface Tour {
  id: string;
  title: string;
  description: string;
  images: string[];
  location: {
    name: string;
    province: string;
    coordinates?: {
      lat: number;
      lng: number;
    }
  };
  duration: string; // Ví dụ: "2 ngày 1 đêm"
  price: number;
  priceUnit: string; // VND, USD
  rating: number;
  reviewCount: number;
  provider: TourProvider;
  bookingUrl: string; // URL để chuyển hướng đến trang đặt tour của nhà cung cấp
  tags: string[]; // Các tag như "Văn hóa", "Ẩm thực", "Làng nghề"...
  featured?: boolean; // Có phải tour được đề xuất không
} 