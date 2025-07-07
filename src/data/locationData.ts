import type { Location } from '@/types/map-types';

export const locations: Location[] = [
  // Miền Bắc
  {
    id: 'hanoi-hoguom',
    name: 'Hồ Gươm (Hồ Hoàn Kiếm)',
    coordinates: { lat: 21.0287, lng: 105.8522 },
    region: 'Bắc',
    heroImage: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    summary:
      'Là "trái tim" của Thủ đô Hà Nội, gắn liền với truyền thuyết trả gươm báu cho Rùa Vàng, một biểu tượng lịch sử và văn hóa không thể tách rời của người Việt Nam.',
    articleContent: `
## Biểu Tượng Ngàn Năm Văn Hiến

Hồ Gươm không chỉ là một địa danh, mà là một chứng nhân lịch sử đã đi qua bao thăng trầm cùng Thăng Long - Hà Nội. Tên gọi Hoàn Kiếm gắn liền với truyền thuyết Vua Lê Lợi trả lại gươm thần cho Rùa Vàng sau khi đánh đuổi quân Minh, một câu chuyện biểu trưng cho khát vọng hòa bình của dân tộc.

### Các Điểm Tham Quan Chính

*   **Tháp Rùa:** Nằm trên gò đất nhỏ giữa hồ, hình ảnh mang tính biểu tượng nhất của Hà Nội.
*   **Đền Ngọc Sơn:** Nằm trên Đảo Ngọc, được nối với bờ bằng cây **Cầu Thê Húc** sơn màu đỏ son đặc trưng.
*   **Tháp Bút - Đài Nghiên:** Biểu tượng cho tinh thần hiếu học của người Hà Nội xưa.

Ngày nay, khu vực quanh Hồ Gươm là không gian đi bộ vào cuối tuần, một trung tâm sinh hoạt văn hóa, giải trí của người dân Thủ đô và du khách.
    `,
    category: 'danh-lam-thang-canh',
    historicalFact: 'Tên gọi "Hồ Gươm" xuất phát từ truyền thuyết vua Lê Lợi trả lại gươm báu cho Rùa Vàng sau khi chiến thắng giặc Minh.',
    openingHours: 'Cả ngày (Khu vực công cộng)',
    bestTimeToVisit: 'Tháng 9 - Tháng 11 (Mùa thu)',
    visitorTips: 'Gửi xe ở các phố lân cận và đi bộ quanh hồ để cảm nhận trọn vẹn không khí. Thử kem Tràng Tiền gần đó!',
    type: 'location',
  },
  {
    id: 'hanoi-phoco',
    name: 'Phố cổ Hà Nội',
    coordinates: { lat: 21.0333, lng: 105.8500 },
    region: 'Bắc',
    heroImage: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    summary:
      'Khu vực đô thị có từ lâu đời của Hà Nội, nơi tập trung nhiều hàng quán, di tích và hoạt động văn hóa đặc sắc.',
    articleContent: `
## Nơi Thời Gian Ngưng Đọng

Hội An từng là một trung tâm giao thương lớn của Đông Nam Á vào thế kỷ 16-17. Sự giao thoa của các nền văn hóa Nhật Bản, Trung Hoa và phương Tây đã tạo nên một tổng thể kiến trúc và văn hóa vô cùng đặc sắc.

### Nét Đặc Trưng Của Hội An

*   **Chùa Cầu:** Công trình biểu tượng do các thương nhân Nhật Bản xây dựng, là linh hồn của khu phố cổ.
*   **Những ngôi nhà cổ:** Các ngôi nhà như Nhà cổ Tấn Ký, Nhà cổ Phùng Hưng vẫn được bảo tồn gần như nguyên vẹn.
*   **Đèn lồng:** Khi đêm xuống, cả khu phố được thắp sáng bởi hàng nghìn chiếc đèn lồng thủ công, tạo nên một không gian huyền ảo, đầy chất thơ.

Dạo bước trong khu phố cổ, thưởng thức những món ăn đặc sản như Cao Lầu, Mì Quảng là những trải nghiệm không thể nào quên.
    `,
    category: 'kien-truc-nghe-thuat',
    historicalFact: 'Phố cổ Hà Nội nguyên bản bao gồm 36 phố phường, mỗi phố lại chuyên bán một loại mặt hàng đặc trưng riêng.',
    openingHours: 'Cả ngày (Các cửa hàng có giờ riêng)',
    bestTimeToVisit: 'Tháng 9 - Tháng 11 (Thời tiết mát mẻ)',
    visitorTips: 'Nên đi bộ hoặc thuê xích lô để khám phá các ngõ nhỏ. Đừng quên thưởng thức ẩm thực đường phố đặc sắc.',
    type: 'location',
  },

  // Miền Trung
  {
    id: 'hoian-pho-co',
    name: 'Phố cổ Hội An',
    coordinates: { lat: 15.8801, lng: 108.338 },
    region: 'Trung',
    heroImage: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    summary:
      'Một thương cảng quốc tế sầm uất xưa kia, nơi thời gian như ngừng lại trong những ngôi nhà cổ tường vàng, những con hẻm nhỏ và những chiếc đèn lồng lung linh.',
    articleContent: `
## Nơi Thời Gian Ngưng Đọng

Hội An từng là một trung tâm giao thương lớn của Đông Nam Á vào thế kỷ 16-17. Sự giao thoa của các nền văn hóa Nhật Bản, Trung Hoa và phương Tây đã tạo nên một tổng thể kiến trúc và văn hóa vô cùng đặc sắc.

### Nét Đặc Trưng Của Hội An

*   **Chùa Cầu:** Công trình biểu tượng do các thương nhân Nhật Bản xây dựng, là linh hồn của khu phố cổ.
*   **Những ngôi nhà cổ:** Các ngôi nhà như Nhà cổ Tấn Ký, Nhà cổ Phùng Hưng vẫn được bảo tồn gần như nguyên vẹn.
*   **Đèn lồng:** Khi đêm xuống, cả khu phố được thắp sáng bởi hàng nghìn chiếc đèn lồng thủ công, tạo nên một không gian huyền ảo, đầy chất thơ.

Dạo bước trong khu phố cổ, thưởng thức những món ăn đặc sản như Cao Lầu, Mì Quảng là những trải nghiệm không thể nào quên.
    `,
    category: 'kien-truc-nghe-thuat',
    historicalFact: 'Chùa Cầu, biểu tượng của Hội An, còn được gọi là "Cầu Nhật Bản" và được in trên mặt sau của tờ tiền 20.000 VNĐ.',
    openingHours: '08:00 - 21:30 (Vé tham quan)',
    bestTimeToVisit: 'Tháng 2 - Tháng 4 (Mùa khô)',
    visitorTips: 'Tham quan vào ngày rằm (âm lịch) để chiêm ngưỡng đêm hội đèn lồng. May một bộ áo dài lấy ngay trong ngày là một trải nghiệm thú vị.',
    type: 'location',
  },
  {
    id: 'hue-da-noi',
    name: 'Đại Nội Huế',
    coordinates: { lat: 16.4678, lng: 107.5785 },
    region: 'Trung',
    heroImage: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    summary:
      'Quần thể kiến trúc cung đình của triều Nguyễn, một di sản văn hóa thế giới với vẻ đẹp cổ kính và tráng lệ.',
    articleContent: `
## Chứng Nhân Lịch Sử

Dinh Độc Lập, hay Dinh Thống Nhất, không chỉ là một công trình kiến trúc độc đáo mà còn là nơi gắn liền với nhiều sự kiện lịch sử quan trọng của Việt Nam. Được thiết kế bởi kiến trúc sư Ngô Viết Thụ, công trình là sự kết hợp hài hòa giữa kiến trúc hiện đại và các yếu tố phong thủy Á Đông.

### Bên Trong Dinh Có Gì?

*   **Các phòng khánh tiết:** Nơi diễn ra các cuộc họp, tiếp khách quan trọng của chế độ cũ.
*   **Hầm chỉ huy:** Hệ thống hầm ngầm kiên cố với đầy đủ các phòng tác chiến, truyền tin.
*   **Phòng làm việc của Tổng thống:** Tái hiện không gian làm việc của người đứng đầu chính quyền Sài Gòn.

Tham quan Dinh Độc Lập là một hành trình quay ngược thời gian, tìm hiểu về một giai đoạn lịch sử đầy biến động của đất nước.
    `,
    category: 'kien-truc-nghe-thuat',
    historicalFact: 'Đại Nội Huế là nơi ở và làm việc của 13 vị vua triều Nguyễn, triều đại phong kiến cuối cùng của Việt Nam.',
    openingHours: '08:00 - 17:30',
    bestTimeToVisit: 'Tháng 3 - Tháng 4 (Mùa xuân)',
    visitorTips: 'Nên thuê một hướng dẫn viên hoặc xe điện để hiểu rõ hơn về lịch sử và kiến trúc rộng lớn của khu di tích.',
    type: 'location',
  },
  {
    id: 'danang-caurong',
    name: 'Cầu Rồng Đà Nẵng',
    coordinates: { lat: 16.0614, lng: 108.2272 },
    region: 'Trung',
    heroImage: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    summary: 'Cây cầu hiện đại với hình dáng con rồng có khả năng phun lửa và nước vào cuối tuần.',
    articleContent: `
## Kỳ Quan Thiên Nhiên Của Thế Giới

Vịnh Hạ Long là một điểm đến độc đáo với hệ thống đảo đá và hang động kỳ vĩ. Trải qua hàng triệu năm kiến tạo địa chất, vịnh sở hữu hơn 1.600 hòn đảo lớn nhỏ, mỗi hòn đảo mang một cái tên gợi hình như Hòn Gà Chọi, Hòn Đỉnh Hương...

### Hoạt Động Không Thể Bỏ Lỡ

1.  **Du thuyền trên vịnh:** Cách tốt nhất để chiêm ngưỡng trọn vẹn vẻ đẹp của Hạ Long.
2.  **Chèo thuyền Kayak:** Luồn lách qua các hang động và khu vực nước lặng để khám phá ở cự ly gần.
3.  **Tham quan hang động:** Khám phá các hang động nổi tiếng như Hang Sửng Sốt, Hang Đầu Gỗ với hệ thống thạch nhũ tráng lệ.

Vẻ đẹp của Vịnh Hạ Long là sự hòa quyện giữa hùng vĩ và thơ mộng, một nơi nhất định phải đến một lần trong đời.
    `,
    category: 'danh-lam-thang-canh',
    historicalFact: 'Cầu Rồng có thể phun lửa trong 2 phút và phun nước trong 3 phút vào 9 giờ tối mỗi thứ Bảy, Chủ Nhật.',
    openingHours: 'Cả ngày (Phun lửa/nước lúc 21:00 cuối tuần)',
    bestTimeToVisit: 'Tháng 2 - Tháng 8 (Mùa khô)',
    visitorTips: 'Đến sớm vào cuối tuần để có vị trí đẹp xem cầu phun lửa và nước. Các quán cà phê ven sông Hàn là địa điểm lý tưởng.',
    type: 'location',
  },
  {
    id: 'cung-an-dinh',
    name: 'Cung An Định',
    coordinates: { lat: 16.463744, lng: 107.58482 },
    region: 'Trung',
    heroImage: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    summary: 'Cung An Định là cung điện riêng của các vị vua cuối triều Nguyễn, mang nét kiến trúc tân cổ điển độc đáo.',
    articleContent: `
## Dấu ấn kiến trúc Châu Âu giữa lòng Cố đô

Cung An Định là một công trình kiến trúc độc đáo, kết hợp hài hòa giữa phong cách châu Âu và các họa tiết trang trí truyền thống của Việt Nam. Được xây dựng vào đầu thế kỷ 20, đây là nơi ở và sinh hoạt của gia đình vua Khải Định và sau này là của cựu hoàng Bảo Đại.

### Những điểm nổi bật

*   **Lầu Khải Tường:** Tòa nhà chính với kiến trúc tân cổ điển, nơi trưng bày nhiều kỷ vật của triều Nguyễn.
*   **Cổng chính:** Được trang trí bằng các bức phù điêu sành sứ đắp nổi tinh xảo.
*   **Nhà hát Cửu Tư Đài:** Hiện chỉ còn lại phế tích, nhưng từng là một nhà hát lớn và hiện đại.

Cung An Định không chỉ là một di tích lịch sử mà còn là một không gian nghệ thuật, nơi diễn ra nhiều triển lãm và sự kiện văn hóa đương đại.
    `,
    category: 'kien-truc-nghe-thuat',
    historicalFact: 'Cung An Định là nơi thái tử Vĩnh Thụy (sau là vua Bảo Đại) đã sống những năm tháng tuổi thơ trước khi sang Pháp du học.',
    openingHours: '07:30 - 17:00',
    bestTimeToVisit: 'Tháng 3 - Tháng 4',
    visitorTips: 'Chiêm ngưỡng các bức tranh tường nguyên bản ở Lầu Khải Tường và đừng bỏ lỡ rạp hát Cửu Tư Đài ở phía sau.',
    type: 'location',
    modelPath: '/model/an_dinh_palace_-_open_heritage_3d.glb'
  },

  // Miền Nam
  {
    id: 'hcm',
    name: 'Bưu điện Trung tâm Sài Gòn',
    coordinates: { lat: 10.7797, lng: 106.6994 },
    region: 'Nam',
    heroImage: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    summary: 'Công trình kiến trúc độc đáo do người Pháp xây dựng, một biểu tượng của thành phố Hồ Chí Minh.',
    articleContent: `
## Chứng Nhân Lịch Sử

Dinh Độc Lập, hay Dinh Thống Nhất, không chỉ là một công trình kiến trúc độc đáo mà còn là nơi gắn liền với nhiều sự kiện lịch sử quan trọng của Việt Nam. Được thiết kế bởi kiến trúc sư Ngô Viết Thụ, công trình là sự kết hợp hài hòa giữa kiến trúc hiện đại và các yếu tố phong thủy Á Đông.

### Bên Trong Dinh Có Gì?

*   **Các phòng khánh tiết:** Nơi diễn ra các cuộc họp, tiếp khách quan trọng của chế độ cũ.
*   **Hầm chỉ huy:** Hệ thống hầm ngầm kiên cố với đầy đủ các phòng tác chiến, truyền tin.
*   **Phòng làm việc của Tổng thống:** Tái hiện không gian làm việc của người đứng đầu chính quyền Sài Gòn.

Tham quan Dinh Độc Lập là một hành trình quay ngược thời gian, tìm hiểu về một giai đoạn lịch sử đầy biến động của đất nước.
    `,
    category: 'kien-truc-nghe-thuat',
    historicalFact: 'Bưu điện được thiết kế bởi Gustave Eiffel, cùng kiến trúc sư với Tháp Eiffel và Tượng Nữ thần Tự do.',
    openingHours: '07:00 - 19:00',
    bestTimeToVisit: 'Tháng 12 - Tháng 4 (Mùa khô)',
    visitorTips: 'Bên trong vẫn hoạt động như một bưu điện bình thường, bạn có thể gửi bưu thiếp cho bạn bè và gia đình.',
    type: 'location',
  },
  {
    id: 'hcm-dinhdoclap',
    name: 'Dinh Độc Lập',
    coordinates: { lat: 10.7769, lng: 106.6953 },
    region: 'Nam',
    heroImage: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    summary: 'Nơi ghi dấu khoảnh khắc lịch sử trọng đại ngày 30/04/1975, thống nhất đất nước.',
    articleContent: `
## Chứng Nhân Lịch Sử

Dinh Độc Lập, hay Dinh Thống Nhất, không chỉ là một công trình kiến trúc độc đáo mà còn là nơi gắn liền với nhiều sự kiện lịch sử quan trọng của Việt Nam. Được thiết kế bởi kiến trúc sư Ngô Viết Thụ, công trình là sự kết hợp hài hòa giữa kiến trúc hiện đại và các yếu tố phong thủy Á Đông.

### Bên Trong Dinh Có Gì?

*   **Các phòng khánh tiết:** Nơi diễn ra các cuộc họp, tiếp khách quan trọng của chế độ cũ.
*   **Hầm chỉ huy:** Hệ thống hầm ngầm kiên cố với đầy đủ các phòng tác chiến, truyền tin.
*   **Phòng làm việc của Tổng thống:** Tái hiện không gian làm việc của người đứng đầu chính quyền Sài Gòn.

Tham quan Dinh Độc Lập là một hành trình quay ngược thời gian, tìm hiểu về một giai đoạn lịch sử đầy biến động của đất nước.
    `,
    category: 'lich-su',
    historicalFact: 'Chiếc xe tăng số hiệu 843 của quân giải phóng đã húc đổ cổng phụ của Dinh vào ngày 30/04/1975.',
    openingHours: '08:00 - 15:30',
    bestTimeToVisit: 'Tháng 12 - Tháng 4 (Mùa khô)',
    visitorTips: 'Đừng bỏ qua khu hầm trú ẩn dưới lòng đất với các phòng tác chiến và truyền tin được giữ nguyên vẹn.',
    type: 'location',
  },
  {
    id: 'dong-son',
    name: 'Di chỉ khảo cổ Đông Sơn',
    coordinates: { lat: 19.8, lng: 105.78 },
    region: 'Bắc',
    heroImage: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    summary: 'Nơi phát hiện nền văn hóa Đông Sơn nổi tiếng với trống đồng và các hiện vật khảo cổ quý giá.',
    articleContent: `
## Cái nôi của nền văn minh Đông Sơn

Di chỉ khảo cổ Đông Sơn nằm ở xã Đông Sơn, thành phố Thanh Hóa, là nơi các nhà khảo cổ học đã phát hiện ra nền văn hóa Đông Sơn - một nền văn hóa đồ đồng rực rỡ của người Việt cổ từ thế kỷ thứ 7 TCN đến thế kỷ 1 SCN.

### Những phát hiện quan trọng

*   **Trống đồng Đông Sơn:** Hiện vật tiêu biểu nhất, với hoa văn phong phú miêu tả đời sống và tín ngưỡng của người Việt cổ.
*   **Công cụ sản xuất:** Rìu, cuốc, lưỡi cày bằng đồng cho thấy trình độ canh tác nông nghiệp phát triển.
*   **Vũ khí và đồ trang sức:** Biểu hiện của một xã hội phân tầng với kỹ thuật luyện kim tiên tiến.

Văn hóa Đông Sơn được xem là nền tảng của bản sắc văn hóa Việt Nam, với những giá trị vật chất và tinh thần đặc sắc.
    `,
    category: 'khao-co',
    historicalFact: 'Trống đồng Ngọc Lũ, một trong những hiện vật tiêu biểu nhất của văn hóa Đông Sơn, được phát hiện vào năm 1893.',
    openingHours: 'Liên hệ ban quản lý di tích tại địa phương',
    bestTimeToVisit: 'Tháng 9 - Tháng 11 (Mùa khô)',
    visitorTips: 'Nên kết hợp tham quan với Thành nhà Hồ gần đó để có một chuyến đi trọn vẹn về lịch sử vùng đất Thanh Hóa.',
    type: 'location',
  },
  {
    id: 'bao-tang-lich-su-quoc-gia',
    name: 'Bảo tàng Lịch sử Quốc gia',
    coordinates: { lat: 21.0245, lng: 105.8617 },
    region: 'Bắc',
    heroImage: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    summary: 'Nơi lưu giữ và trưng bày các hiện vật quý giá về lịch sử Việt Nam từ thời tiền sử đến hiện đại.',
    articleContent: `
## Kho tàng di sản lịch sử

Bảo tàng Lịch sử Quốc gia, tọa lạc tại số 1 đường Tràng Tiền, Hà Nội, là một trong những bảo tàng lớn nhất Việt Nam. Được thành lập năm 1958, bảo tàng hiện đang lưu giữ và trưng bày hơn 200.000 hiện vật quý giá, từ thời kỳ tiền sử đến cách mạng hiện đại.

### Các bộ sưu tập nổi bật

*   **Thời tiền sử và sơ sử:** Công cụ đá, đồ gốm của các nền văn hóa Hòa Bình, Bắc Sơn, Đông Sơn.
*   **Thời kỳ phong kiến:** Hiện vật từ các triều đại Lý, Trần, Lê, Nguyễn.
*   **Thời kỳ cận - hiện đại:** Tài liệu, hiện vật về các phong trào cách mạng và kháng chiến.

Bảo tàng không chỉ là nơi lưu giữ di sản mà còn là điểm đến giáo dục lịch sử quan trọng cho mọi thế hệ người Việt Nam.
    `,
    category: 'bao-tang',
    historicalFact: 'Bảo tàng Lịch sử Quốc gia được đặt trong một tòa nhà có kiến trúc Đông Dương (Indochine) đặc trưng, được xây dựng năm 1932.',
    openingHours: '08:00 - 12:00 & 13:30 - 17:00 (Trừ thứ 2)',
    bestTimeToVisit: 'Quanh năm',
    visitorTips: 'Bảo tàng rất rộng lớn, hãy dành ít nhất nửa ngày để khám phá. Có hai tòa nhà ở hai bên đường, đừng bỏ lỡ tòa nhà nào nhé!',
    type: 'location',
  }
]; 