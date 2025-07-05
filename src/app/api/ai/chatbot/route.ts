import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { locations } from '@/data/locationData';
import { events } from '@/data/eventData';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface GeminiRequest {
  contents: {
    parts: {
      text?: string;
    }[];
  }[];
  generationConfig: {
    temperature: number;
    topK: number;
    topP: number;
    maxOutputTokens: number;
  };
}

export async function POST(request: NextRequest) {
  try {
    const { message, entityType, entityId, chatHistory } = await request.json();

    // Lấy API key từ biến môi trường
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key chưa được cấu hình' },
        { status: 500 }
      );
    }

    // Lấy thông tin về entity (địa điểm hoặc sự kiện)
    let entityInfo = '';
    let entityName = '';

    if (entityType === 'location') {
      const location = locations.find(loc => loc.id === entityId);
      if (location) {
        entityInfo = location.articleContent || location.summary || '';
        entityName = location.name;
      }
    } else if (entityType === 'event') {
      const event = events.find(evt => evt.id === entityId);
      if (event) {
        entityInfo = event.articleContent || event.summary || '';
        entityName = event.name;
      }
    }

    // Xây dựng prompt với thông tin ngữ cảnh
    const systemPrompt = `Bạn là một trợ lý AI dễ thương tên là "BizTech Buddy" đang hỗ trợ du khách tìm hiểu về "${entityName}". 
    
Thông tin về ${entityType === 'location' ? 'địa điểm' : 'sự kiện'} này:
${entityInfo}

Hãy trả lời câu hỏi của người dùng một cách thân thiện, dễ thương với giọng điệu vui vẻ. Sử dụng emoji phù hợp và đôi khi có thể thêm các từ ngữ dễ thương như "bạn ơi", "nè", "nhé". Trả lời ngắn gọn, súc tích nhưng đầy đủ thông tin.

SAU KHI TRẢ LỜI, hãy đề xuất 3 câu hỏi tiếp theo mà người dùng có thể muốn hỏi. Các câu hỏi này phải liên quan đến cuộc trò chuyện và gợi mở những khía cạnh thú vị khác.

QUAN TRỌNG: Trả về kết quả dưới dạng một đối tượng JSON hợp lệ, không chứa bất kỳ văn bản nào khác bên ngoài JSON.
Cấu trúc JSON phải là:
{
  "response": "Nội dung câu trả lời của bạn ở đây. Hỗ trợ định dạng Markdown.",
  "suggestions": ["Câu hỏi gợi ý 1?", "Câu hỏi gợi ý 2?", "Câu hỏi gợi ý 3?"]
}

Lịch sử trò chuyện (nếu có):
${chatHistory ? chatHistory.map((chat: ChatMessage) => `${chat.role === 'user' ? 'Người dùng' : 'BizTech Buddy'}: ${chat.content}`).join('\n') : ''}

Câu hỏi hiện tại: ${message}`;

    // Chuẩn bị request body cho Gemini API
    const requestBody: GeminiRequest = {
      contents: [
        {
          parts: [
            { text: systemPrompt }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 500,
      }
    };

    // Gọi API Gemini
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      requestBody
    );

    // Xử lý phản hồi từ Gemini
    const responseText = response.data.candidates[0].content.parts[0].text;
    
    try {
      // Cố gắng tìm và trích xuất chuỗi JSON từ phản hồi
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const jsonResponse = JSON.parse(jsonMatch[0]);
        return NextResponse.json(jsonResponse);
      }
      
      // Nếu không tìm thấy JSON, trả về văn bản gốc và không có gợi ý
      console.warn('Không tìm thấy JSON trong phản hồi, trả về text thô:', responseText);
      return NextResponse.json({
        response: responseText,
        suggestions: []
      });
    } catch {
      console.error('Lỗi khi parse JSON từ Gemini, trả về text thô:', responseText);
      // Nếu parse lỗi, trả về văn bản gốc trong cấu trúc JSON mong đợi
      return NextResponse.json({
        response: responseText,
        suggestions: []
      });
    }
  } catch (error) {
    console.error('Lỗi khi gọi API Gemini:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi xử lý yêu cầu' },
      { status: 500 }
    );
  }
} 