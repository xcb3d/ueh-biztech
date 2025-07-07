import { Tour } from "@/types/tour";

export const mockTours: Tour[] = [
  {
    id: "tour-1",
    title: "Khám phá làng nghề gốm Bát Tràng truyền thống",
    description: "Trải nghiệm không gian làng nghề gốm sứ lâu đời nhất miền Bắc. Tham quan các lò gốm, học cách nặn gốm cùng nghệ nhân và mang về sản phẩm do chính tay bạn làm ra.",
    images: [
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    location: {
      name: "Làng gốm Bát Tràng",
      province: "Hà Nội",
      coordinates: {
        lat: 20.9758,
        lng: 105.9141
      }
    },
    duration: "1 ngày",
    price: 650000,
    priceUnit: "VND",
    rating: 4.8,
    reviewCount: 124,
    provider: {
      id: "provider-1",
      name: "Hanoitourist",
      logo: "/images/providers/hanoitourist.png",
      website: "https://hanoitourist.com.vn"
    },
    bookingUrl: "https://hanoitourist.com.vn/tour/lang-gom-bat-trang",
    tags: ["Làng nghề", "Văn hóa", "Trải nghiệm"],
    featured: true
  },
  {
    id: "tour-2",
    title: "Tour làng lụa Vạn Phúc - Nét đẹp truyền thống Hà Đông",
    description: "Tham quan làng nghề dệt lụa truyền thống với lịch sử hơn ngàn năm tuổi. Tìm hiểu quy trình dệt lụa và thưởng thức những sản phẩm tinh xảo từ bàn tay khéo léo của các nghệ nhân.",
    images: [
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    location: {
      name: "Làng lụa Vạn Phúc",
      province: "Hà Nội",
      coordinates: {
        lat: 20.9805,
        lng: 105.7527
      }
    },
    duration: "Nửa ngày",
    price: 450000,
    priceUnit: "VND",
    rating: 4.6,
    reviewCount: 86,
    provider: {
      id: "provider-1",
      name: "Hanoitourist",
      logo: "/images/providers/hanoitourist.png",
      website: "https://hanoitourist.com.vn"
    },
    bookingUrl: "https://hanoitourist.com.vn/tour/lang-lua-van-phuc",
    tags: ["Làng nghề", "Văn hóa", "Lụa"]
  },
  {
    id: "tour-3",
    title: "Khám phá làng tranh Đông Hồ - Bắc Ninh",
    description: "Hành trình về nguồn với nghệ thuật tranh dân gian Đông Hồ. Tìm hiểu cách làm giấy điệp, cách in tranh truyền thống và tham gia vào quá trình tạo ra một bức tranh Đông Hồ đặc trưng.",
    images: [
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    location: {
      name: "Làng tranh Đông Hồ",
      province: "Bắc Ninh",
      coordinates: {
        lat: 21.0769,
        lng: 106.0839
      }
    },
    duration: "1 ngày",
    price: 550000,
    priceUnit: "VND",
    rating: 4.7,
    reviewCount: 62,
    provider: {
      id: "provider-2",
      name: "Vietravel",
      logo: "/images/providers/vietravel.png",
      website: "https://travel.com.vn"
    },
    bookingUrl: "https://travel.com.vn/tour/lang-tranh-dong-ho",
    tags: ["Làng nghề", "Văn hóa", "Nghệ thuật"]
  },
  {
    id: "tour-4",
    title: "Tour làng hương Thủy Xuân - Huế",
    description: "Khám phá nghề làm hương truyền thống tại làng Thủy Xuân, Huế. Tìm hiểu về quy trình làm hương thủ công và tự tay làm những cây hương thơm ngát.",
    images: [
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    location: {
      name: "Làng hương Thủy Xuân",
      province: "Thừa Thiên Huế",
      coordinates: {
        lat: 16.4498,
        lng: 107.5623
      }
    },
    duration: "Nửa ngày",
    price: 400000,
    priceUnit: "VND",
    rating: 4.5,
    reviewCount: 48,
    provider: {
      id: "provider-3",
      name: "Huế Heritage",
      logo: "/images/providers/hue-heritage.png",
      website: "https://hueheritage.com.vn"
    },
    bookingUrl: "https://hueheritage.com.vn/tour/lang-huong-thuy-xuan",
    tags: ["Làng nghề", "Văn hóa", "Truyền thống"]
  },
  {
    id: "tour-5",
    title: "Khám phá làng nón Huế - Di sản văn hóa Việt",
    description: "Tham quan làng nghề làm nón lá truyền thống tại Huế. Tìm hiểu về lịch sử, quy trình làm nón và tự tay trang trí một chiếc nón lá độc đáo.",
    images: [
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    location: {
      name: "Làng nón Huế",
      province: "Thừa Thiên Huế",
      coordinates: {
        lat: 16.4632,
        lng: 107.5954
      }
    },
    duration: "Nửa ngày",
    price: 350000,
    priceUnit: "VND",
    rating: 4.4,
    reviewCount: 37,
    provider: {
      id: "provider-3",
      name: "Huế Heritage",
      logo: "/images/providers/hue-heritage.png",
      website: "https://hueheritage.com.vn"
    },
    bookingUrl: "https://hueheritage.com.vn/tour/lang-non-hue",
    tags: ["Làng nghề", "Văn hóa", "Truyền thống"]
  },
  {
    id: "tour-6",
    title: "Tour làng nghề kim hoàn Châu Khê - Bắc Ninh",
    description: "Khám phá làng nghề kim hoàn lâu đời với những sản phẩm vàng bạc tinh xảo. Tìm hiểu về quy trình chế tác và bí quyết nghề từ các nghệ nhân lành nghề.",
    images: [
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    location: {
      name: "Làng kim hoàn Châu Khê",
      province: "Bắc Ninh",
      coordinates: {
        lat: 21.1862,
        lng: 106.0767
      }
    },
    duration: "1 ngày",
    price: 600000,
    priceUnit: "VND",
    rating: 4.6,
    reviewCount: 42,
    provider: {
      id: "provider-2",
      name: "Vietravel",
      logo: "/images/providers/vietravel.png",
      website: "https://travel.com.vn"
    },
    bookingUrl: "https://travel.com.vn/tour/lang-kim-hoan-chau-khe",
    tags: ["Làng nghề", "Văn hóa", "Thủ công"]
  }
]; 