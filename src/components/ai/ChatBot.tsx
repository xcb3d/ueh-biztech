'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatBotProps {
  entityType: 'location' | 'event';
  entityId: string;
  entityName: string;
}

const ChatBot: React.FC<ChatBotProps> = ({ entityType, entityId, entityName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialSuggestions = {
    location: [
      `Tóm tắt về ${entityName} cho mình nhé.`,
      `Ở đây có hoạt động gì vui không?`,
      `Kể cho mình một sự thật thú vị về nơi này.`,
    ],
    event: [
      `Sự kiện "${entityName}" có gì đặc biệt?`,
      `Làm sao để tham gia sự kiện này?`,
      `Tóm tắt nội dung chính của sự kiện.`,
    ],
  };
  
  // Tự động cuộn xuống cuối khi có tin nhắn mới
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory]);

  // Hiển thị tin nhắn chào mừng khi mở chat
  useEffect(() => {
    if (isOpen && chatHistory.length === 0) {
      setChatHistory([
        {
          role: 'assistant',
          content: `👋 Xin chào bạn! Mình là BizTech Buddy, trợ lý AI dễ thương sẵn sàng giúp bạn tìm hiểu về ${entityName}. Bạn có câu hỏi gì không? 😊`
        }
      ]);
    }
  }, [isOpen, chatHistory.length, entityName]);

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim()) return;

    setAiSuggestions([]); // Xóa gợi ý cũ
    const userMessage: ChatMessage = { role: 'user', content: messageText };
    const updatedHistory = [...chatHistory, userMessage];
    setChatHistory(updatedHistory);
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText,
          entityType,
          entityId,
          chatHistory: updatedHistory,
        }),
      });
      
      const data = await response.json();
      
      if (data.error) throw new Error(data.error);
      
      setChatHistory(prev => [...prev, { role: 'assistant', content: data.response }]);
      setAiSuggestions(data.suggestions || []);
    } catch (error) {
      console.error('Lỗi khi gọi API chatbot:', error);
      setChatHistory(prev => [
        ...prev,
        { role: 'assistant', content: '😥 Xin lỗi bạn, mình đang gặp một chút trục trặc. Bạn vui lòng thử lại sau nhé!' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(message);
    setMessage('');
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Nút mở chatbot */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 animate-bounce"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span className="font-medium">Hỏi BizTech Buddy</span>
        </button>
      )}

      {/* Cửa sổ chat */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl w-80 sm:w-96 overflow-hidden border-2 border-purple-200 transition-all duration-300 animate-fadeIn">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8 rounded-full bg-white p-1">
                <Image 
                  src="https://plus.unsplash.com/premium_photo-1670148434900-5f0af77ba500?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt="BizTech Buddy" 
                  width={32} 
                  height={32}
                  className="rounded-full"
                  onError={(e) => {
                    // Fallback khi không tìm thấy hình ảnh
                    e.currentTarget.src = "https://api.dicebear.com/7.x/bottts/svg?seed=BizTech";
                  }}
                />
              </div>
              <div>
                <h3 className="font-bold text-white">BizTech Buddy</h3>
                <p className="text-xs text-white opacity-80">Trợ lý AI dễ thương</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Chat messages */}
          <div className="h-80 overflow-y-auto p-4 bg-gray-50">
            {chatHistory.map((chat, index) => (
              <div 
                key={index} 
                className={`mb-4 flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    chat.role === 'user' 
                      ? 'bg-purple-500 text-white rounded-tr-none' 
                      : 'bg-white border border-gray-200 shadow-sm rounded-tl-none'
                  }`}
                >
                  {chat.role === 'assistant' ? (
                    <div className="text-sm prose prose-sm max-w-none prose-p:my-1 prose-strong:text-gray-800 prose-em:text-gray-700">
                      <ReactMarkdown>
                        {chat.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-sm">{chat.content}</p>
                  )}
                </div>
              </div>
            ))}
            
            {/* Initial Suggestions */}
            {chatHistory.length === 1 && !isLoading && (
              <div className="mt-2 mb-4 px-2">
                <p className="text-xs text-gray-500 mb-2 font-medium">Hoặc thử một trong các gợi ý sau:</p>
                <div className="flex flex-wrap gap-2">
                  {initialSuggestions[entityType].map((suggestion, i) => (
                    <button
                      key={i}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-3 py-1.5 bg-purple-100 text-purple-800 rounded-full text-sm hover:bg-purple-200 transition-colors font-medium"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* AI-Generated Suggestions */}
            {aiSuggestions.length > 0 && !isLoading && (
              <div className="mt-2 mb-4 px-2">
                <p className="text-xs text-gray-500 mb-2 font-medium">Bạn có thể hỏi thêm:</p>
                <div className="flex flex-wrap gap-2">
                  {aiSuggestions.map((suggestion, i) => (
                    <button
                      key={i}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-3 py-1.5 bg-purple-100 text-purple-800 rounded-full text-sm hover:bg-purple-200 transition-colors font-medium"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="bg-white border border-gray-200 shadow-sm rounded-2xl rounded-tl-none max-w-[80%] px-4 py-3">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-pink-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input form */}
          <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Nhập câu hỏi của bạn..."
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !message.trim()}
              className={`bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full p-2 ${
                isLoading || !message.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot; 