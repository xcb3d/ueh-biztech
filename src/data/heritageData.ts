export interface Heritage {
  id: string;
  dayOfYear: number; // 1-366
  title: string;
  content: string;
  type: 'CUSTOMS' | 'FESTIVAL' | 'ART' | 'CUISINE' | 'CRAFT_VILLAGE' | 'FOLKLORE' | 'ARCHITECTURE';
  mainImageUrl: string;
  sourceInfo?: string;
}

// Helper để lấy ngày trong năm (1-366) từ tháng và ngày
export const getDayOfYear = (month: number, day: number): number => {
  const date = new Date(new Date().getFullYear(), month - 1, day);
  const startOfYear = new Date(new Date().getFullYear(), 0, 0);
  const diff = date.getTime() - startOfYear.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
};

// Dữ liệu mẫu cho tính năng "Di sản Việt mỗi ngày"
export const heritageData: Heritage[] = [
  // CUSTOMS - Phong tục, tập quán
  {
    id: 'heritage-customs-1',
    dayOfYear: getDayOfYear(1, 1),
    title: 'Lễ Cúng Giao Thừa',
    content: 'Giao thừa là thời khắc thiêng liêng đánh dấu sự chuyển giao giữa năm cũ và năm mới. Theo phong tục Việt Nam, vào thời khắc này, mỗi gia đình đều làm lễ cúng Giao thừa với mâm cỗ đầy đủ, hương hoa, trầu cau để đón các vị thần vào nhà, mong cầu một năm mới an lành, may mắn. Đây cũng là dịp để mọi người trong gia đình đoàn tụ, cùng nhau đón năm mới với niềm hy vọng và hạnh phúc.',
    type: 'CUSTOMS',
    mainImageUrl: 'https://images.unsplash.com/photo-1578923931302-55cb1ee89d6a?q=80&w=2070&auto=format&fit=crop',
    sourceInfo: 'Viện Văn hóa Dân gian Việt Nam'
  },
  {
    id: 'heritage-customs-2',
    dayOfYear: getDayOfYear(3, 10),
    title: 'Lễ Hội Chùa Hương',
    content: 'Lễ hội Chùa Hương là một trong những lễ hội lớn nhất và lâu đời nhất của Việt Nam, diễn ra từ tháng Giêng đến tháng Ba âm lịch hàng năm. Người dân từ khắp nơi đổ về chùa Hương để tham gia lễ hội, cầu mong một năm mới an lành, may mắn. Đặc biệt, du khách sẽ được trải nghiệm hành trình đi thuyền trên dòng suối Yến thơ mộng, chiêm ngưỡng cảnh đẹp hùng vĩ của núi rừng và thăm các hang động, đền chùa linh thiêng.',
    type: 'CUSTOMS',
    mainImageUrl: 'https://images.unsplash.com/photo-1555921015-5532091f6026?q=80&w=2070&auto=format&fit=crop',
    sourceInfo: 'Ban Quản lý Di tích Chùa Hương'
  },
  
  // FESTIVAL - Lễ hội truyền thống
  {
    id: 'heritage-festival-1',
    dayOfYear: getDayOfYear(4, 10),
    title: 'Lễ Hội Đền Hùng',
    content: 'Lễ hội Đền Hùng là một trong những lễ hội lớn và quan trọng nhất của dân tộc Việt Nam, diễn ra vào ngày 10 tháng 3 âm lịch hàng năm tại Đền Hùng, tỉnh Phú Thọ. Đây là dịp để người dân Việt Nam tưởng nhớ công ơn các Vua Hùng đã có công dựng nước và giữ nước. Lễ hội bao gồm nhiều nghi thức trang nghiêm như lễ dâng hương, dâng lễ vật, cùng các hoạt động văn hóa, nghệ thuật đặc sắc như hát xoan, múa trống, đánh chiêng...',
    type: 'FESTIVAL',
    mainImageUrl: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=2070&auto=format&fit=crop',
    sourceInfo: 'Ban Quản lý Khu Di tích Lịch sử Đền Hùng'
  },
  {
    id: 'heritage-festival-2',
    dayOfYear: getDayOfYear(9, 15),
    title: 'Tết Trung Thu',
    content: 'Tết Trung Thu là một trong những lễ hội truyền thống quan trọng của Việt Nam, diễn ra vào ngày 15 tháng 8 âm lịch. Đây là dịp để các gia đình đoàn tụ, cùng nhau thưởng thức bánh trung thu, uống trà, ngắm trăng và kể chuyện cho trẻ em. Trẻ em sẽ được rước đèn, múa lân, xem múa rối nước và nhận quà từ người lớn. Tết Trung Thu còn là dịp để tôn vinh tình cảm gia đình và giáo dục trẻ em về giá trị truyền thống.',
    type: 'FESTIVAL',
    mainImageUrl: 'https://images.unsplash.com/photo-1631116618090-634b696caa26?q=80&w=2000&auto=format&fit=crop',
    sourceInfo: 'Bảo tàng Dân tộc học Việt Nam'
  },
  
  // ART - Nghệ thuật truyền thống
  {
    id: 'heritage-art-1',
    dayOfYear: getDayOfYear(5, 5),
    title: 'Hát Xoan Phú Thọ',
    content: 'Hát Xoan là một loại hình nghệ thuật dân gian cổ truyền của người Việt ở vùng đất Tổ Phú Thọ, đã được UNESCO công nhận là Di sản Văn hóa Phi vật thể đại diện của nhân loại. Hát Xoan thường được biểu diễn trong các dịp lễ hội đầu xuân, đặc biệt là tại các đình làng cổ. Nghệ thuật này kết hợp giữa ca, múa và nhạc với những làn điệu đặc trưng như "Cửa đền", "Cửa quyền", "Cửa bùa", mang đậm tính nghi lễ và tâm linh.',
    type: 'ART',
    mainImageUrl: 'https://images.unsplash.com/photo-1551524164-687a55dd1126?q=80&w=2025&auto=format&fit=crop',
    sourceInfo: 'Trung tâm Bảo tồn Di sản Hát Xoan'
  },
  {
    id: 'heritage-art-2',
    dayOfYear: getDayOfYear(7, 7),
    title: 'Tuồng - Hát Bội',
    content: 'Tuồng hay còn gọi là Hát Bội là một loại hình nghệ thuật sân khấu truyền thống của Việt Nam, có lịch sử phát triển từ thế kỷ 13. Tuồng kết hợp giữa âm nhạc, múa, hát và diễn xuất với những động tác, điệu bộ mang tính ước lệ cao. Các vai diễn trong Tuồng thường được chia thành các nhóm chính như: Võ (vai võ), Văn (vai văn), Đào (vai nữ), Hề (vai hài). Nội dung của Tuồng thường lấy từ các câu chuyện lịch sử, truyền thuyết hoặc các tác phẩm văn học nổi tiếng.',
    type: 'ART',
    mainImageUrl: 'https://images.unsplash.com/photo-1564585222527-c2777a5bc6cb?q=80&w=2074&auto=format&fit=crop',
    sourceInfo: 'Nhà hát Tuồng Việt Nam'
  },
  
  // CUISINE - Ẩm thực di sản
  {
    id: 'heritage-cuisine-1',
    dayOfYear: getDayOfYear(2, 15),
    title: 'Phở - Linh hồn ẩm thực Việt',
    content: 'Phở là một trong những món ăn tiêu biểu nhất của ẩm thực Việt Nam, đã trở thành một biểu tượng văn hóa được yêu thích trên toàn thế giới. Món ăn này bắt nguồn từ miền Bắc Việt Nam vào đầu thế kỷ 20, với nước dùng thơm ngon được ninh từ xương bò hoặc gà cùng các loại gia vị đặc trưng như hồi, quế, đinh hương, hạt ngò... Phở được ăn kèm với bánh phở, thịt bò hoặc gà, và các loại rau thơm tạo nên hương vị đặc trưng không thể nhầm lẫn.',
    type: 'CUISINE',
    mainImageUrl: 'https://images.unsplash.com/photo-1576577445504-6af96477db52?q=80&w=2070&auto=format&fit=crop',
    sourceInfo: 'Hiệp hội Văn hóa Ẩm thực Việt Nam'
  },
  {
    id: 'heritage-cuisine-2',
    dayOfYear: getDayOfYear(6, 6),
    title: 'Bánh Chưng - Tinh hoa Tết Việt',
    content: 'Bánh chưng là một trong những món ăn truyền thống không thể thiếu trong dịp Tết Nguyên đán của người Việt. Theo truyền thuyết, bánh chưng được sáng tạo bởi Lang Liêu - con trai vua Hùng thứ 6, để dâng lên vua cha trong một cuộc thi chọn người kế vị. Bánh chưng hình vuông tượng trưng cho đất, được làm từ gạo nếp, đậu xanh, thịt lợn, lá dong và được gói cẩn thận, luộc trong nhiều giờ. Quá trình làm bánh chưng thường là dịp để các thành viên trong gia đình quây quần, trò chuyện và truyền dạy các giá trị văn hóa cho thế hệ trẻ.',
    type: 'CUISINE',
    mainImageUrl: 'https://images.unsplash.com/photo-1610452220299-5edf90b8a6ed?q=80&w=2070&auto=format&fit=crop',
    sourceInfo: 'Viện Nghiên cứu Văn hóa Việt Nam'
  },
  
  // CRAFT_VILLAGE - Làng nghề truyền thống
  {
    id: 'heritage-craft-village-1',
    dayOfYear: getDayOfYear(8, 8),
    title: 'Làng Gốm Bát Tràng',
    content: 'Làng gốm Bát Tràng, cách trung tâm Hà Nội khoảng 13km, là một trong những làng nghề cổ nhất Việt Nam với lịch sử hơn 700 năm. Nơi đây nổi tiếng với nghề làm gốm sứ truyền thống, sản xuất ra các sản phẩm tinh xảo như bát, đĩa, lọ hoa, đồ thờ cúng... Đặc trưng của gốm Bát Tràng là men ngọc trắng xanh và hoa văn vẽ tay tinh tế. Ngày nay, làng gốm không chỉ là điểm đến du lịch hấp dẫn mà còn là nơi lưu giữ và phát triển những kỹ thuật làm gốm truyền thống của người Việt.',
    type: 'CRAFT_VILLAGE',
    mainImageUrl: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=2070&auto=format&fit=crop',
    sourceInfo: 'Hiệp hội Làng nghề Việt Nam'
  },
  {
    id: 'heritage-craft-village-2',
    dayOfYear: getDayOfYear(10, 10),
    title: 'Làng Lụa Vạn Phúc',
    content: 'Làng lụa Vạn Phúc, nằm ở phía Tây Hà Nội, là một trong những làng nghề dệt lụa nổi tiếng nhất Việt Nam với lịch sử hơn 1,200 năm. Lụa Vạn Phúc nổi tiếng với chất lượng cao, mềm mại, bền màu và các hoa văn tinh xảo. Nghề dệt lụa ở đây được truyền từ đời này sang đời khác, với những kỹ thuật dệt truyền thống được gìn giữ cẩn thận. Các sản phẩm lụa Vạn Phúc từng được sử dụng trong cung đình và được coi là báu vật của dân tộc. Ngày nay, làng lụa Vạn Phúc không chỉ là điểm đến du lịch hấp dẫn mà còn là nơi bảo tồn và phát triển nghề dệt lụa truyền thống của Việt Nam.',
    type: 'CRAFT_VILLAGE',
    mainImageUrl: 'https://images.unsplash.com/photo-1590736969955-71a0d3862ed5?q=80&w=2069&auto=format&fit=crop',
    sourceInfo: 'Trung tâm Bảo tồn Di sản Làng nghề Việt Nam'
  },
  
  // FOLKLORE - Truyền thuyết, cổ tích, ca dao
  {
    id: 'heritage-folklore-1',
    dayOfYear: getDayOfYear(11, 11),
    title: 'Truyền thuyết Thánh Gióng',
    content: 'Truyền thuyết Thánh Gióng là một trong những câu chuyện nổi tiếng nhất trong kho tàng truyền thuyết Việt Nam. Tương truyền, vào thời Hùng Vương thứ 6, có một cậu bé 3 tuổi vẫn chưa biết nói, biết cười, biết đi. Khi giặc Ân xâm lược, cậu bỗng nhiên nói được và xin vua cho ngựa sắt, roi sắt để đánh giặc. Sau khi ăn rất nhiều, cậu bé lớn nhanh như thổi, trở thành một tráng sĩ khổng lồ. Thánh Gióng cưỡi ngựa sắt, cầm roi sắt xông vào trận địch, đánh đuổi giặc Ân. Sau khi chiến thắng, Thánh Gióng bay về trời. Vua Hùng đã cho lập đền thờ Ngài, và hàng năm đều tổ chức lễ hội để tưởng nhớ.',
    type: 'FOLKLORE',
    mainImageUrl: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=2070&auto=format&fit=crop',
    sourceInfo: 'Viện Nghiên cứu Văn học Việt Nam'
  },
  {
    id: 'heritage-folklore-2',
    dayOfYear: getDayOfYear(12, 12),
    title: 'Truyện Cổ Tấm Cám',
    content: 'Tấm Cám là một trong những truyện cổ tích nổi tiếng nhất của Việt Nam, kể về câu chuyện của cô gái mồ côi tên Tấm bị mẹ kế và em gái Cám ngược đãi. Dù gặp nhiều khó khăn, Tấm vẫn luôn hiền lành, chăm chỉ và được các lực lượng siêu nhiên giúp đỡ. Nhờ đó, Tấm đã được gặp và kết duyên với nhà vua. Tuy nhiên, vì lòng đố kỵ, mẹ kế và Cám đã nhiều lần hãm hại Tấm. Sau nhiều lần biến hóa qua các kiếp sống khác nhau, cuối cùng Tấm đã trở về với vua và trừng phạt mẹ kế cùng Cám. Câu chuyện mang thông điệp về chiến thắng của điều thiện trước cái ác, và niềm tin vào công lý.',
    type: 'FOLKLORE',
    mainImageUrl: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?q=80&w=2070&auto=format&fit=crop',
    sourceInfo: 'Trung tâm Nghiên cứu Văn học Dân gian'
  },
  
  // ARCHITECTURE - Kiến trúc cổ, di tích lịch sử
  {
    id: 'heritage-architecture-1',
    dayOfYear: getDayOfYear(7, 20),
    title: 'Chùa Một Cột - Kiệt tác kiến trúc Phật giáo',
    content: 'Chùa Một Cột, hay còn gọi là Liên Hoa Đài, là một trong những di tích kiến trúc độc đáo nhất của Việt Nam, nằm ở Hà Nội. Được xây dựng vào năm 1049 dưới triều vua Lý Thái Tông, chùa có kiến trúc độc đáo với một ngôi chùa nhỏ được đặt trên một cột đá duy nhất, tượng trưng cho một bông sen mọc lên từ bùn lầy, biểu tượng của sự thanh tịnh trong Phật giáo. Theo truyền thuyết, vua Lý Thái Tông đã nằm mơ thấy Phật Quan Âm ngồi trên đài sen và dẫn ông đến gặp. Khi tỉnh dậy, nhà vua đã cho xây dựng ngôi chùa này để tưởng nhớ giấc mơ thiêng liêng đó.',
    type: 'ARCHITECTURE',
    mainImageUrl: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?q=80&w=2233&auto=format&fit=crop',
    sourceInfo: 'Trung tâm Bảo tồn Di sản Văn hóa Việt Nam'
  },
  {
    id: 'heritage-architecture-2',
    dayOfYear: getDayOfYear(9, 2),
    title: 'Nhà Rường Huế - Tinh hoa kiến trúc cung đình',
    content: 'Nhà rường Huế là một loại hình kiến trúc truyền thống độc đáo của cố đô Huế, tiêu biểu cho sự kết hợp hài hòa giữa kiến trúc cung đình và dân gian. Đặc trưng của nhà rường là kết cấu gỗ chắc chắn với hệ thống cột, kèo, rường được chạm khắc tinh xảo. Mái nhà thường lợp ngói âm dương, tạo nên vẻ đẹp cổ kính, thanh nhã. Không gian bên trong nhà rường được bố trí theo nguyên tắc phong thủy với ba gian chính và hai chái, trong đó gian giữa thường là nơi thờ cúng tổ tiên. Nhà rường không chỉ là nơi ở mà còn là biểu tượng cho địa vị, tâm hồn và gu thẩm mỹ của chủ nhân.',
    type: 'ARCHITECTURE',
    mainImageUrl: 'https://images.unsplash.com/photo-1563267894-7d3e4322c353?q=80&w=2070&auto=format&fit=crop',
    sourceInfo: 'Trung tâm Bảo tồn Di tích Cố đô Huế'
  }
];

// Hàm lấy di sản của ngày hiện tại
export const getTodayHeritage = (): Heritage | undefined => {
  const today = new Date();
  const dayOfYear = getDayOfYear(today.getMonth() + 1, today.getDate());
  return heritageData.find(heritage => heritage.dayOfYear === dayOfYear);
};

// Hàm lấy di sản ngẫu nhiên (dùng cho mockup)
export const getRandomHeritage = (): Heritage => {
  const randomIndex = Math.floor(Math.random() * heritageData.length);
  return heritageData[randomIndex];
}; 