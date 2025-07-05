/**
 * Service để tương tác với API AI cải thiện bài viết
 */

type EnhancementType = 'grammar' | 'enhance' | 'summarize';

interface EnhancePostRequest {
  title: string;
  content: string;
  enhancementType: EnhancementType;
  locationId?: string;
  images?: string[];
}

interface EnhancePostResponse {
  title: string;
  content: string;
  error?: string;
}

/**
 * Gọi API để cải thiện bài viết bằng AI
 */
export async function enhancePost(data: EnhancePostRequest): Promise<EnhancePostResponse> {
  try {
    const response = await fetch('/api/ai/enhance-post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Lỗi khi cải thiện bài viết');
    }

    return result;
  } catch (error) {
    console.error('Error enhancing post:', error);
    return {
      title: data.title,
      content: data.content,
      error: error instanceof Error ? error.message : 'Lỗi không xác định'
    };
  }
}

/**
 * Sửa lỗi ngữ pháp và cải thiện cách diễn đạt
 */
export function fixGrammar(title: string, content: string, locationId?: string, images?: string[]): Promise<EnhancePostResponse> {
  return enhancePost({ title, content, enhancementType: 'grammar', locationId, images });
}

/**
 * Làm phong phú nội dung
 */
export function enhanceContent(title: string, content: string, locationId?: string, images?: string[]): Promise<EnhancePostResponse> {
  return enhancePost({ title, content, enhancementType: 'enhance', locationId, images });
}

/**
 * Tóm tắt nội dung
 */
export function summarizeContent(title: string, content: string, locationId?: string, images?: string[]): Promise<EnhancePostResponse> {
  return enhancePost({ title, content, enhancementType: 'summarize', locationId, images });
} 