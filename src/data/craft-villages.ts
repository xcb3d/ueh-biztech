// import { StaticImageData } from "next/image";

// import batTrangImage from "@/public/images/bat-trang.jpg";
// import vanPhucImage from "@/public/images/van-phuc.jpg";
// import dongHoImage from "@/public/images/dong-ho.jpg";
// import nonLaImage from "@/public/images/non-la.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface CraftVillage {
  id: string;
  name: string;
  slug: string;
  product: string;
  summary: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  heroImage: string;
  articleContent: string;
  history: string;
  type: 'craft-village';
  products: Product[];
}

export const craftVillages: CraftVillage[] = [
  {
    id: "1",
    name: "Làng gốm Bát Tràng",
    slug: "lang-gom-bat-trang",
    product: "Gốm sứ",
    summary: "Làng gốm sứ lâu đời và nổi tiếng nhất Việt Nam.",
    coordinates: {
      lat: 20.982,
      lng: 105.91,
    },
    heroImage: "https://picsum.photos/seed/bat-trang/800/600",
    articleContent:
      "Làng gốm Bát Tràng, nằm bên bờ sông Hồng, thuộc huyện Gia Lâm, Hà Nội, là một trong những trung tâm sản xuất gốm sứ lớn và lâu đời nhất của Việt Nam. Sản phẩm gốm Bát Tràng nổi tiếng với chất lượng men, kiểu dáng đa dạng và kỹ thuật tinh xảo.",
    history:
      "Làng nghề có lịch sử hơn 700 năm, bắt đầu từ thời nhà Lý. Trải qua nhiều thăng trầm của lịch sử, các nghệ nhân Bát Tràng vẫn giữ gìn và phát huy những kỹ thuật làm gốm truyền thống, đồng thời không ngừng sáng tạo để đáp ứng thị hiếu hiện đại.",
    type: 'craft-village',
    products: [
      { id: 'bt-01', name: 'Bình gốm men lam', price: 550000, image: 'https://picsum.photos/seed/binh-gom/400/400' },
      { id: 'bt-02', name: 'Bộ ấm trà sứ trắng', price: 780000, image: 'https://picsum.photos/seed/am-tra/400/400' },
      { id: 'bt-03', name: 'Tượng gốm trang trí', price: 320000, image: 'https://picsum.photos/seed/tuong-gom/400/400' },
    ]
  },
  {
    id: "2",
    name: "Làng lụa Vạn Phúc",
    slug: "lang-lua-van-phuc",
    product: "Lụa tơ tằm",
    summary: "Nơi dệt nên những tấm lụa mềm mại, tinh xảo.",
    coordinates: {
      lat: 20.963,
      lng: 105.78,
    },
    heroImage: "https://picsum.photos/seed/van-phuc/800/600",
    articleContent:
      "Làng lụa Vạn Phúc (nay thuộc phường Vạn Phúc, quận Hà Đông, Hà Nội) là một trong những làng nghề dệt lụa tơ tằm đẹp và nổi tiếng bậc nhất Việt Nam. Lụa Vạn Phúc được biết đến với chất liệu mềm mại, hoa văn tinh xảo và độ bền cao.",
    history:
      "Với lịch sử hơn 1000 năm, lụa Vạn Phúc từng được chọn làm cống phẩm cho hoàng gia. Ngày nay, làng lụa vẫn giữ được nét truyền thống và là điểm đến hấp dẫn cho du khách trong và ngoài nước.",
    type: 'craft-village',
    products: [
      { id: 'vp-01', name: 'Khăn lụa tơ tằm', price: 450000, image: 'https://picsum.photos/seed/khan-lua/400/400' },
      { id: 'vp-02', name: 'Áo dài lụa Hà Đông', price: 1800000, image: 'https://picsum.photos/seed/ao-dai/400/400' },
    ]
  },

  {
    id: "3",
    name: "Làng tranh Đông Hồ",
    slug: "lang-tranh-dong-ho",
    product: "Tranh dân gian",
    summary: "Những bức tranh đậm đà bản sắc văn hóa Việt.",
    coordinates: {
      lat: 21.109,
      lng: 106.12,
    },
    heroImage: "https://picsum.photos/seed/dong-ho/800/600",
    articleContent:
      "Làng tranh Đông Hồ, thuộc xã Song Hồ, huyện Thuận Thành, tỉnh Bắc Ninh, là cái nôi của dòng tranh khắc gỗ dân gian Việt Nam. Tranh Đông Hồ hấp dẫn người xem bởi những đề tài gần gũi với cuộc sống làng quê và màu sắc tự nhiên, mộc mạc.",
    history:
      "Tranh Đông Hồ ra đời từ khoảng thế kỷ 17. Điểm đặc biệt của tranh là được in trên giấy điệp, làm từ vỏ sò điệp nghiền mịn, và sử dụng màu sắc từ các nguyên liệu thiên nhiên như lá chàm, gạch non, hoa hòe...",
    type: 'craft-village',
    products: [
        { id: 'dh-01', name: 'Tranh Đám Cưới Chuột', price: 250000, image: 'https://picsum.photos/seed/dam-cuoi-chuot/400/400' },
        { id: 'dh-02', name: 'Tranh Vinh Hoa Phú Quý', price: 250000, image: 'https://picsum.photos/seed/vinh-hoa/400/400' },
    ]
  },
  {
    id: "4",
    name: "Làng nón lá Tây Hồ",
    slug: "lang-non-la-tay-ho",
    product: "Nón lá",
    summary: "Biểu tượng của vẻ đẹp và sự duyên dáng người phụ nữ Việt.",
    coordinates: {
      lat: 21.060,
      lng: 105.81,
    },
    heroImage: "https://picsum.photos/seed/non-la/800/600",
    articleContent:
      "Làng nón lá Tây Hồ là tên gọi chung cho nhiều làng làm nón quanh khu vực Tây Hồ, Hà Nội xưa, nổi tiếng nhất là làng Chuông. Nón lá không chỉ là vật che mưa, che nắng mà còn là một biểu tượng văn hóa, gắn liền với hình ảnh người phụ nữ Việt Nam.",
    history:
      "Nghề làm nón lá đã có từ rất lâu đời. Để làm ra một chiếc nón, người thợ phải trải qua nhiều công đoạn tỉ mỉ, từ việc chọn lá, làm khung, đến khâu nón. Mỗi chiếc nón là một tác phẩm nghệ thuật, thể hiện sự khéo léo và kiên nhẫn của người thợ.",
    type: 'craft-village',
    products: [
        { id: 'nl-01', name: 'Nón bài thơ', price: 150000, image: 'https://picsum.photos/seed/non-bai-tho/400/400' },
    ]
  }
]; 