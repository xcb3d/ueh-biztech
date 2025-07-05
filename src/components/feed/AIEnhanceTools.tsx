'use client';

import { useState } from 'react';
import { enhanceContent, fixGrammar, summarizeContent } from '@/lib/ai-service';
import { SparklesIcon, WrenchIcon, ArrowsPointingInIcon } from '@heroicons/react/24/outline';

interface AIEnhanceToolsProps {
  title: string;
  content: string;
  locationId?: string;
  images?: string[];
  onApplyChanges: (newTitle: string, newContent: string) => void;
}

export default function AIEnhanceTools({ title, content, locationId, images, onApplyChanges }: AIEnhanceToolsProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleEnhance = async (type: 'grammar' | 'enhance' | 'summarize') => {
    if (!content.trim() && (!images || images.length === 0)) {
      setError('Vui lòng nhập nội dung hoặc tải lên hình ảnh trước khi sử dụng tính năng cải thiện AI');
      return;
    }

    setIsLoading(type);
    setError(null);

    try {
      let result;
      switch (type) {
        case 'grammar':
          result = await fixGrammar(title, content, locationId, images);
          break;
        case 'enhance':
          result = await enhanceContent(title, content, locationId, images);
          break;
        case 'summarize':
          result = await summarizeContent(title, content, locationId, images);
          break;
      }

      if (result.error) {
        setError(result.error);
      } else {
        onApplyChanges(result.title, result.content);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Lỗi không xác định');
    } finally {
      setIsLoading(null);
    }
  };

  const hasImages = images && images.length > 0;

  return (
    <div className="border rounded-md p-3 bg-gray-50 mb-4">
      <div className="flex flex-col space-y-2">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Cải thiện bài viết bằng AI</h3>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md text-sm mb-2">
            {error}
          </div>
        )}
        
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => handleEnhance('grammar')}
            disabled={!!isLoading}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium ${
              isLoading === 'grammar'
                ? 'bg-blue-100 text-blue-800 cursor-wait'
                : 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-700'
            }`}
          >
            <WrenchIcon className="h-4 w-4" />
            {isLoading === 'grammar' ? 'Đang xử lý...' : 'Sửa lỗi ngữ pháp'}
          </button>
          
          <button
            type="button"
            onClick={() => handleEnhance('enhance')}
            disabled={!!isLoading}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium ${
              isLoading === 'enhance'
                ? 'bg-blue-100 text-blue-800 cursor-wait'
                : 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-700'
            }`}
          >
            <SparklesIcon className="h-4 w-4" />
            {isLoading === 'enhance' ? 'Đang xử lý...' : hasImages && !content.trim() ? 'Tạo bài viết từ ảnh' : 'Làm phong phú nội dung'}
          </button>
          
          <button
            type="button"
            onClick={() => handleEnhance('summarize')}
            disabled={!!isLoading || (!content.trim() && hasImages)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium ${
              isLoading === 'summarize'
                ? 'bg-blue-100 text-blue-800 cursor-wait'
                : !content.trim() && hasImages
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-700'
            }`}
          >
            <ArrowsPointingInIcon className="h-4 w-4" />
            {isLoading === 'summarize' ? 'Đang xử lý...' : 'Tóm tắt nội dung'}
          </button>
        </div>
        
        <p className="text-xs text-gray-500 mt-2">
          {hasImages && !content.trim() 
            ? 'AI sẽ phân tích hình ảnh và tạo bài viết phù hợp.' 
            : 'Lưu ý: Tính năng AI có thể mất một chút thời gian để xử lý và kết quả có thể không hoàn hảo.'}
          {hasImages && <span className="block mt-1 text-blue-600">{images.length} hình ảnh sẽ được sử dụng để {content.trim() ? 'cải thiện' : 'tạo'} bài viết.</span>}
        </p>
      </div>
    </div>
  );
} 