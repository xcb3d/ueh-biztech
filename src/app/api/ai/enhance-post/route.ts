import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { locations } from '@/data/locationData';

// Định nghĩa kiểu dữ liệu cho Gemini API
interface InlineData {
  mime_type: string;
  data: string;
}

interface Part {
  text?: string;
  inline_data?: InlineData;
}

interface Content {
  parts: Part[];
}

interface GenerationConfig {
  temperature: number;
  topK: number;
  topP: number;
  maxOutputTokens: number;
}

interface GeminiRequest {
  contents: Content[];
  generationConfig: GenerationConfig;
}

export async function POST(request: NextRequest) {
  try {
    const { title, content, enhancementType, locationId, images } = await request.json();

    // Kiểm tra nếu không có cả content và images
    if (!content && (!images || images.length === 0)) {
      return NextResponse.json(
        { error: 'Cần có nội dung hoặc hình ảnh để cải thiện bài viết' },
        { status: 400 }
      );
    }

    // Lấy API key từ biến môi trường
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key chưa được cấu hình' },
        { status: 500 }
      );
    }

    // Tìm thông tin về địa điểm nếu có
    let locationInfo = '';
    if (locationId) {
      const location = locations.find(loc => loc.id === locationId);
      if (location) {
        locationInfo = `Thông tin về địa điểm "${location.name}": ${location.summary || ''}`;
      }
    }

    // Xây dựng system prompt để AI hiểu bối cảnh
    const systemPrompt = `
Bạn là trợ lý viết bài chuyên nghiệp, giúp cải thiện bài viết về trải nghiệm du lịch và địa điểm tại Việt Nam.
Nhiệm vụ của bạn là làm cho bài viết trở nên hấp dẫn, chính xác và phong phú hơn.

Khi cải thiện bài viết:
1. Giữ nguyên giọng điệu và quan điểm cá nhân của người viết
2. Sửa lỗi ngữ pháp, chính tả và cách diễn đạt
3. Bổ sung thông tin về địa điểm được đề cập nếu có thể (lịch sử, văn hóa, đặc điểm nổi bật)
4. Làm cho bài viết sinh động hơn với các chi tiết mô tả
5. Nếu có hình ảnh, hãy mô tả hoặc đề cập đến các yếu tố trong hình ảnh để làm phong phú bài viết
6. Nếu chỉ có hình ảnh mà không có nội dung, hãy tạo một bài viết dựa trên phân tích hình ảnh và thông tin địa điểm

Trả về kết quả ở định dạng JSON với cấu trúc: { "title": "tiêu đề đã cải thiện", "content": "nội dung đã cải thiện" }
`;

    // Xây dựng prompt dựa trên loại cải thiện và có nội dung hay không
    let prompt = '';
    const hasContent = content && content.trim().length > 0;
    
    if (hasContent) {
      // Trường hợp có nội dung
      switch (enhancementType) {
        case 'grammar':
          prompt = `${systemPrompt}

Hãy sửa lỗi ngữ pháp, chính tả và cải thiện cách diễn đạt cho đoạn văn sau, giữ nguyên ý nghĩa ban đầu:

Tiêu đề: ${title}

Nội dung: ${content}

${locationInfo ? `Địa điểm check-in: ${locationInfo}` : ''}`;
          break;
        case 'enhance':
          prompt = `${systemPrompt}

Hãy cải thiện và làm phong phú đoạn văn sau, thêm chi tiết và làm cho nó hấp dẫn hơn, giữ nguyên ý nghĩa ban đầu:

Tiêu đề: ${title}

Nội dung: ${content}

${locationInfo ? `Địa điểm check-in: ${locationInfo}` : ''}`;
          break;
        case 'summarize':
          prompt = `${systemPrompt}

Hãy tóm tắt đoạn văn sau một cách ngắn gọn, súc tích:

Tiêu đề: ${title}

Nội dung: ${content}

${locationInfo ? `Địa điểm check-in: ${locationInfo}` : ''}`;
          break;
        default:
          prompt = `${systemPrompt}

Hãy cải thiện đoạn văn sau, sửa lỗi ngữ pháp, chính tả và làm cho nó hấp dẫn hơn:

Tiêu đề: ${title}

Nội dung: ${content}

${locationInfo ? `Địa điểm check-in: ${locationInfo}` : ''}`;
      }
    } else {
      // Trường hợp chỉ có hình ảnh, không có nội dung
      prompt = `${systemPrompt}

Hãy tạo một bài viết ngắn gọn, tự nhiên dựa trên phân tích hình ảnh được cung cấp:

Tiêu đề: ${title || 'Cần đề xuất tiêu đề ngắn gọn, hấp dẫn'}

${locationInfo ? `Địa điểm check-in: ${locationInfo}

` : ''}Hãy viết một bài đăng (khoảng 4-8 câu) như thể người dùng đang chia sẻ khoảnh khắc trên mạng xã hội. Giọng điệu tự nhiên, thân thiện, đôi khi có thể thêm emoji phù hợp. Tránh văn phong quá hoa mỹ hay học thuật, nhưng vẫn có thể thêm một số chi tiết về không gian, cảm nhận và bối cảnh. Hãy tập trung vào cảm xúc, trải nghiệm cá nhân và điểm nổi bật trong hình ảnh.`;
    }

    // Chuẩn bị request body cho Gemini API
    const requestBody: GeminiRequest = {
      contents: [
        {
          parts: [
            { text: prompt }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: hasContent ? 1024 : 500, // Tăng giới hạn độ dài kết quả khi chỉ có ảnh
      }
    };

    // Thêm hình ảnh vào request nếu có
    if (images && images.length > 0) {
      // Giới hạn số lượng ảnh để tránh vượt quá giới hạn của API
      const imagesToProcess = images.slice(0, 3); // Xử lý tối đa 3 ảnh
      
      for (const imageUrl of imagesToProcess) {
        try {
          // Kiểm tra nếu là base64 data URL
          if (imageUrl.startsWith('data:image')) {
            const base64Data = imageUrl.split(',')[1];
            if (base64Data) {
              requestBody.contents[0].parts.push({
                inline_data: {
                  mime_type: imageUrl.split(';')[0].split(':')[1],
                  data: base64Data
                }
              });
            }
          }
          // Nếu là URL thông thường
          else {
            // Tải ảnh từ URL và chuyển thành base64
            const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
            const buffer = Buffer.from(imageResponse.data, 'binary');
            const base64 = buffer.toString('base64');
            
            requestBody.contents[0].parts.push({
              inline_data: {
                mime_type: imageResponse.headers['content-type'] || 'image/jpeg',
                data: base64
              }
            });
          }
        } catch (error) {
          console.error('Error processing image:', error);
          // Tiếp tục với các ảnh khác nếu có lỗi
        }
      }
      
      // Thêm hướng dẫn về việc sử dụng hình ảnh
      if (hasContent) {
        requestBody.contents[0].parts.push({
          text: "\n\nHãy phân tích các hình ảnh được cung cấp và sử dụng thông tin từ hình ảnh để làm phong phú bài viết. Mô tả các yếu tố quan trọng trong hình ảnh nếu phù hợp với nội dung."
        });
      } else {
        requestBody.contents[0].parts.push({
          text: "\n\nHãy phân tích các hình ảnh được cung cấp và tạo bài viết tự nhiên. Không cần mô tả chi tiết mọi thứ trong ảnh, nhưng có thể thêm một số chi tiết về không gian, cảm nhận và bối cảnh. Tập trung vào cảm xúc và trải nghiệm cá nhân. Viết như thể người dùng thực sự đang chia sẻ khoảnh khắc của họ."
        });
      }
    }

    // Gọi API Gemini 2.0 Flash
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      requestBody
    );

    // Xử lý phản hồi từ Gemini
    const responseText = response.data.candidates[0].content.parts[0].text;
    
    // Cố gắng parse JSON từ phản hồi
    try {
      // Tìm và trích xuất JSON từ phản hồi
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const jsonResponse = JSON.parse(jsonMatch[0]);
        return NextResponse.json(jsonResponse);
      } else {
        // Nếu không tìm thấy JSON, trả về văn bản gốc
        return NextResponse.json({
          title: title || 'Bài viết từ hình ảnh',
          content: responseText
        });
      }
    } catch {
      // Nếu không parse được JSON, trả về văn bản gốc
      return NextResponse.json({
        title: title || 'Bài viết từ hình ảnh',
        content: responseText
      });
    }
  } catch (error: unknown) {
    console.error('Error enhancing post with AI:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `Lỗi khi cải thiện bài viết: ${errorMessage}` },
      { status: 500 }
    );
  }
} 