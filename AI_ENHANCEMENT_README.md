# Tính năng cải thiện bài viết AI

Tính năng này sử dụng API của Google Gemini 2.0 Flash để cải thiện bài viết của người dùng trong ứng dụng.

## Thiết lập

1. Đăng ký tài khoản và lấy API key từ [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Tạo file `.env.local` trong thư mục gốc của dự án
3. Thêm biến môi trường sau vào file `.env.local`:

```
GEMINI_API_KEY=your_gemini_api_key_here
```

## Tính năng

Tính năng cải thiện bài viết AI bao gồm các chức năng chính:

1. **Sửa lỗi ngữ pháp**: Tự động sửa lỗi ngữ pháp, chính tả và cải thiện cách diễn đạt
2. **Làm phong phú nội dung**: Thêm chi tiết và làm cho bài viết hấp dẫn hơn
3. **Tóm tắt nội dung**: Tóm tắt bài viết dài thành nội dung ngắn gọn, súc tích
4. **Tạo bài viết từ ảnh**: Phân tích hình ảnh và tự động tạo bài viết phù hợp khi không có nội dung

## Cách sử dụng

### Cải thiện bài viết có sẵn
1. Trong giao diện tạo bài viết mới, nhập tiêu đề và nội dung
2. Chọn địa điểm check-in (nếu có)
3. Tải lên hình ảnh (nếu muốn)
4. Sử dụng các nút cải thiện AI ở dưới trình soạn thảo
5. Chọn loại cải thiện phù hợp với nhu cầu
6. Kết quả sẽ được áp dụng trực tiếp vào trình soạn thảo

### Tạo bài viết từ ảnh
1. Trong giao diện tạo bài viết mới, tải lên hình ảnh (bắt buộc)
2. Có thể thêm tiêu đề và chọn địa điểm check-in để cung cấp thêm ngữ cảnh
3. Nhấn nút "Tạo bài viết từ ảnh" (nút "Làm phong phú nội dung" sẽ tự động đổi tên khi chỉ có ảnh)
4. AI sẽ phân tích hình ảnh và tạo bài viết phù hợp
5. Kết quả sẽ được áp dụng trực tiếp vào trình soạn thảo

## Phong cách viết

### Khi cải thiện bài viết có sẵn
- Giữ nguyên giọng điệu và quan điểm cá nhân của người viết
- Sửa lỗi ngữ pháp, chính tả và cách diễn đạt
- Bổ sung thông tin phong phú về địa điểm và trải nghiệm
- Có thể chi tiết và mang tính mô tả cao

### Khi tạo bài viết từ ảnh
- Độ dài vừa phải (khoảng 4-8 câu), tự nhiên như đăng trên mạng xã hội
- Giọng điệu thân thiện, cá nhân, đôi khi có thể thêm emoji phù hợp
- Tập trung vào cảm xúc và trải nghiệm cá nhân
- Có thể thêm một số chi tiết về không gian, cảm nhận và bối cảnh
- Tránh văn phong quá hoa mỹ hay học thuật
- Viết như thể người dùng thực sự đang chia sẻ khoảnh khắc của họ

## Cách hoạt động

- AI được cung cấp thông tin về địa điểm check-in (nếu có) để làm phong phú bài viết
- AI phân tích hình ảnh đã tải lên và sử dụng thông tin từ hình ảnh để làm phong phú hoặc tạo bài viết
- Tính năng này sử dụng system prompt thông minh giúp AI hiểu bối cảnh và nhiệm vụ của nó
- AI sẽ tự động bổ sung thông tin về địa điểm được đề cập trong bài viết
- Khi chỉ có hình ảnh, AI sẽ tạo nội dung hoàn chỉnh dựa trên phân tích hình ảnh và thông tin địa điểm

## Xử lý hình ảnh

- Tối đa 3 hình ảnh sẽ được gửi đến API để phân tích
- Hình ảnh được chuyển đổi thành định dạng base64 trước khi gửi
- AI sẽ mô tả các yếu tố quan trọng trong hình ảnh và tích hợp vào bài viết
- Cả hình ảnh dạng URL và hình ảnh đã tải lên đều được hỗ trợ
- Khi chỉ có hình ảnh mà không có nội dung, AI sẽ tạo bài viết hoàn chỉnh dựa trên phân tích hình ảnh

## Lưu ý

- Tính năng này yêu cầu kết nối internet
- Kết quả từ AI có thể không hoàn hảo và nên được kiểm tra trước khi đăng bài
- Số lượng yêu cầu API có thể bị giới hạn theo chính sách của Google Gemini
- Gemini 2.0 Flash được tối ưu hóa cho phản hồi nhanh và hiệu quả
- Xử lý nhiều hình ảnh có thể làm tăng thời gian phản hồi
- Chức năng tóm tắt nội dung sẽ bị vô hiệu hóa khi chỉ có hình ảnh mà không có nội dung 