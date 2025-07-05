'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Moment } from '@/types/map-types';
import { locations } from '@/data/locationData';
import { 
  XMarkIcon, 
  MapPinIcon, 
  PhotoIcon, 
  EyeIcon, 
  DocumentTextIcon, 
  FaceSmileIcon as FaceSmileIconOutline,
  TagIcon,
} from '@heroicons/react/24/outline';
import { FaceSmileIcon as FaceSmileIconSolid } from '@heroicons/react/24/solid';
import { users } from '@/data/userData';
import Image from 'next/image';
import { memoryTypes } from '@/data/memoryData';
import TiptapEditor from './TiptapEditor';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { feelings } from '@/data/feelingData';
import AIEnhanceTools from './AIEnhanceTools';

interface CreateMomentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMomentCreate: (newMoment: Moment) => void;
  preselectedLocationId?: string;
}

const CreateMomentModal: React.FC<CreateMomentModalProps> = ({ isOpen, onClose, onMomentCreate, preselectedLocationId }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedLocationId, setSelectedLocationId] = useState(preselectedLocationId || locations[0]?.id || '');
  const [selectedCategory, setSelectedCategory] = useState<string>('default');
  const [selectedFeeling, setSelectedFeeling] = useState<string | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [currentHashtag, setCurrentHashtag] = useState('');
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [isMounted, setIsMounted] = useState(false);
  const [isDraft, setIsDraft] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showFeelingPicker, setShowFeelingPicker] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const feelingPickerRef = useRef<HTMLDivElement>(null);

  // Close pickers when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
        setShowEmojiPicker(false);
      }
      if (feelingPickerRef.current && !feelingPickerRef.current.contains(event.target as Node)) {
        setShowFeelingPicker(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Load draft from localStorage if exists
  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
      const savedDraft = localStorage.getItem('momentDraft');
      if (savedDraft) {
        try {
          const draft = JSON.parse(savedDraft);
          setTitle(draft.title || '');
          setContent(draft.content || '');
          setSelectedLocationId(draft.locationId || preselectedLocationId || locations[0]?.id || '');
          setSelectedCategory(draft.category || 'default');
          setSelectedFeeling(draft.feeling || null);
          setHashtags(draft.hashtags || []);
          if (draft.imagePreviews && Array.isArray(draft.imagePreviews)) {
            setImagePreviews(draft.imagePreviews);
          }
          setIsDraft(true);
        } catch (e) {
          console.error('Error parsing draft:', e);
        }
      }
    }
  }, [preselectedLocationId]);
  
  // Update selectedLocationId when preselectedLocationId changes (e.g., user clicks another location on the map)
  useEffect(() => {
    if (preselectedLocationId) {
      setSelectedLocationId(preselectedLocationId);
    }
  }, [preselectedLocationId]);

  // Placeholder for the current user
  const currentUser = users.find(u => u.id === 'user-1')!;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    if (imagePreviews.length + files.length > 10) {
      alert('Bạn chỉ có thể tải lên tối đa 10 ảnh');
      return;
    }
    
    Array.from(files).forEach(file => {
      if (file.size > 5 * 1024 * 1024) {
        alert(`Ảnh ${file.name} vượt quá 5MB. Vui lòng chọn ảnh nhỏ hơn.`);
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleHashtagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const newHashtag = currentHashtag.trim().replace(/#/g, '');
      if (newHashtag && !hashtags.includes(newHashtag) && hashtags.length < 5) {
        setHashtags([...hashtags, newHashtag]);
      }
      setCurrentHashtag('');
    }
  };

  const removeHashtag = (tagToRemove: string) => {
    setHashtags(hashtags.filter(tag => tag !== tagToRemove));
  };

  const saveDraft = () => {
    const draft = {
      title,
      content,
      locationId: selectedLocationId,
      category: selectedCategory,
      feeling: selectedFeeling,
      imagePreviews,
      hashtags,
    };
    localStorage.setItem('momentDraft', JSON.stringify(draft));
    setIsDraft(true);
    alert('Đã lưu bản nháp');
  };

  const clearDraft = () => {
    localStorage.removeItem('momentDraft');
    setTitle('');
    setContent('');
    setSelectedLocationId(preselectedLocationId || locations[0]?.id || '');
    setSelectedCategory('default');
    setSelectedFeeling(null);
    setImagePreviews([]);
    setHashtags([]);
    setIsDraft(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !selectedLocationId) {
      alert('Vui lòng điền đầy đủ tiêu đề, nội dung và chọn địa điểm.');
      return;
    }
    
    const newMoment: Moment = {
      id: `moment-${Date.now()}`,
      locationId: selectedLocationId,
      title: title.trim(),
      content: content.trim(),
      author: currentUser,
      createdAt: new Date().toISOString(),
      images: imagePreviews.length > 0 ? imagePreviews : ['/moments/placeholder.jpg'],
      category: selectedCategory,
      hashtags: hashtags,
      ...(selectedFeeling && { feeling: selectedFeeling })
    };

    onMomentCreate(newMoment);
    
    clearDraft();
    setActiveTab('edit');
    onClose();
  };

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setContent(prevContent => prevContent + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const handleFeelingSelect = (feelingKey: string) => {
    setSelectedFeeling(prev => prev === feelingKey ? null : feelingKey);
    setShowFeelingPicker(false);
  }

  const renderImageGrid = (images: string[]) => {
    if (images.length === 0) return null;
    
    if (images.length === 1) {
      return (
        <div className="relative w-full h-64 rounded-lg overflow-hidden">
          <Image src={images[0]} alt="Uploaded image" layout="fill" objectFit="cover" />
        </div>
      );
    }
    
    if (images.length === 2) {
      return (
        <div className="grid grid-cols-2 gap-1 h-64">
          {images.map((img, index) => (
            <div key={index} className="relative h-full overflow-hidden rounded-lg">
              <Image
                src={img}
                alt={`Preview ${index + 1}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
          ))}
        </div>
      );
    }
    
    if (images.length === 3) {
      return (
        <div className="grid grid-cols-2 gap-1 h-64">
          <div className="relative h-full overflow-hidden rounded-lg">
            <Image
              src={images[0]}
              alt="Preview 1"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="grid grid-rows-2 gap-1 h-full">
            {images.slice(1, 3).map((img, index) => (
              <div key={index} className="relative h-full overflow-hidden rounded-lg">
                <Image
                  src={img}
                  alt={`Preview ${index + 2}`}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    // 4 hoặc nhiều ảnh
    return (
      <div className="h-64 grid grid-cols-2 gap-1">
        {/* Ảnh lớn bên trái */}
        <div className="relative h-full overflow-hidden rounded-lg">
          <Image
            src={images[0]}
            alt="Preview 1"
            layout="fill"
            objectFit="cover"
          />
        </div>
        
        {/* Cột phải: 2 ảnh nhỏ */}
        <div className="grid grid-rows-2 gap-1 h-full">
          {/* Ảnh nhỏ thứ nhất */}
          <div className="relative h-full overflow-hidden rounded-lg">
            <Image
              src={images[1]}
              alt="Preview 2"
              layout="fill"
              objectFit="cover"
            />
          </div>
          
          {/* Ảnh nhỏ thứ hai với lớp phủ nếu có nhiều hơn 3 ảnh */}
          <div className="relative h-full overflow-hidden rounded-lg">
            <Image
              src={images[2]}
              alt="Preview 3"
              layout="fill"
              objectFit="cover"
            />
            
            {/* Lớp phủ hiển thị số ảnh còn lại */}
            {images.length > 3 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">+{images.length - 3}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const handleAIEnhancement = (newTitle: string, newContent: string) => {
    setTitle(newTitle);
    setContent(newContent);
  };

  if (!isMounted) return null;

  const modalContent = (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col" 
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b relative">
          <h2 className="text-xl font-bold text-gray-800 text-center w-full">
            {isDraft ? '📝 Tiếp tục bản nháp' : 'Tạo Khoảnh khắc mới'}
          </h2>
          <button onClick={onClose} className="absolute top-1/2 right-3 -translate-y-1/2 p-2 rounded-full bg-gray-100 hover:bg-gray-200">
            <XMarkIcon className="h-6 w-6 text-gray-600" />
          </button>
        </header>

        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('edit')}
            className={`flex-1 py-2 px-4 font-medium text-sm ${activeTab === 'edit' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
          >
            <DocumentTextIcon className="h-4 w-4 inline mr-1" /> Soạn thảo
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex-1 py-2 px-4 font-medium text-sm ${activeTab === 'preview' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
          >
            <EyeIcon className="h-4 w-4 inline mr-1" /> Xem trước
          </button>
        </div>

        {activeTab === 'edit' ? (
          <div className="flex-1 overflow-y-auto p-5">
            <form id="moment-form" onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center space-x-3">
                <Image src={currentUser.avatarUrl} alt={currentUser.name} width={44} height={44} className="rounded-full" />
                <div>
                  <p className="font-semibold text-gray-800">
                    {currentUser.name} 
                    {selectedFeeling && feelings[selectedFeeling] && (
                      <span className="font-normal text-gray-600">
                        {' '}đang cảm thấy{' '}
                        <span className="font-semibold">{feelings[selectedFeeling].emoji} {feelings[selectedFeeling].text}</span>
                      </span>
                    )}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPinIcon className="h-4 w-4 mr-1" />
                    <select
                      value={selectedLocationId}
                      onChange={e => setSelectedLocationId(e.target.value)}
                      className="p-0 border-0 focus:ring-0 text-sm bg-transparent"
                    >
                      {locations.map(loc => (<option key={loc.id} value={loc.id}>{loc.name}</option>))}
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <input type="text" placeholder="Tiêu đề Khoảnh khắc..." value={title} onChange={e => setTitle(e.target.value)} className="w-full text-xl font-bold border-none focus:ring-0 p-0 placeholder-gray-400" />
                <TiptapEditor content={content} onChange={setContent} placeholder="Bạn đang nghĩ gì?" />
              </div>
              
              <AIEnhanceTools 
                title={title}
                content={content}
                locationId={selectedLocationId}
                images={imagePreviews}
                onApplyChanges={handleAIEnhancement}
              />
              
              <div className="flex items-center justify-between border rounded-lg p-2 bg-gray-50">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium text-gray-600 hidden sm:inline">Thêm:</span>
                  <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-gray-200 border-none rounded-full px-3 py-1.5 text-sm focus:ring-blue-500"
                  >
                    {Object.entries(memoryTypes).map(([key, { name }]) => (<option key={key} value={key}>{name}</option>))}
                  </select>
                  <div className="relative" ref={feelingPickerRef}>
                    <button type="button" onClick={() => setShowFeelingPicker(p => !p)} className="p-2 rounded-full hover:bg-gray-200 transition-colors" aria-label="Thêm cảm xúc">
                      {selectedFeeling ? <FaceSmileIconSolid className="h-6 w-6 text-blue-500" /> : <FaceSmileIconOutline className="h-6 w-6 text-gray-500" />}
                    </button>
                    {showFeelingPicker && (
                      <div className="absolute bottom-full left-0 mb-2 w-56 bg-white border rounded-lg shadow-xl z-10">
                        <div className="p-2 font-semibold border-b text-center">Bạn đang cảm thấy thế nào?</div>
                        <ul className="py-1 max-h-48 overflow-y-auto">
                          {Object.entries(feelings).map(([key, { text, emoji }]) => (
                            <li key={key}>
                              <button type="button" onClick={() => handleFeelingSelect(key)} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3">
                                <span className="text-xl">{emoji}</span>
                                <span>{text}</span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                <div className="relative" ref={emojiPickerRef}>
                  <button type="button" onClick={() => setShowEmojiPicker(p => !p)} className="p-2 rounded-full hover:bg-gray-200 transition-colors" aria-label="Thêm biểu tượng cảm xúc">
                    <FaceSmileIconOutline className="h-6 w-6 text-gray-500" />
                  </button>
                  {showEmojiPicker && (<div className="absolute bottom-full right-0 mb-2 z-10"><EmojiPicker onEmojiClick={onEmojiClick} /></div>)}
                </div>
              </div>
              
              <div className="border rounded-md p-3 bg-gray-50">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm font-medium text-gray-700">Thêm hình ảnh</span>
                  <PhotoIcon className="h-5 w-5 text-gray-500" />
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" multiple />
                </label>
                {imagePreviews.length > 0 && (
                  <div className="mt-3 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <Image src={preview} alt={`Preview ${index + 1}`} layout="fill" objectFit="cover" className="rounded-md" />
                        <button type="button" onClick={() => removeImage(index)} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"><XMarkIcon className="h-3 w-3" /></button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Hashtag Input */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hashtags (nhấn Enter hoặc dấu cách để thêm)
                </label>
                <div className="flex items-center border border-gray-300 rounded-md p-2 flex-wrap gap-2">
                  {hashtags.map((tag) => (
                    <span key={tag} className="flex items-center bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                      #{tag}
                      <button
                        type="button"
                        onClick={() => removeHashtag(tag)}
                        className="ml-1.5 text-blue-500 hover:text-blue-700"
                      >
                        <XMarkIcon className="h-4 w-4" />
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    value={currentHashtag}
                    onChange={(e) => setCurrentHashtag(e.target.value)}
                    onKeyDown={handleHashtagKeyDown}
                    placeholder={hashtags.length < 5 ? "Thêm hashtag..." : "Tối đa 5 hashtag"}
                    className="flex-1 bg-transparent outline-none border-none text-sm"
                    disabled={hashtags.length >= 5}
                  />
                </div>
              </div>
            </form>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            <div className="border-b pb-2">
              <h1 className="text-2xl font-bold">{title || 'Tiêu đề bài viết'}</h1>
              <div className="flex items-center space-x-2 mt-2 text-sm text-gray-500">
                <div className="flex items-center">
                  <MapPinIcon className="h-4 w-4 text-red-500 mr-1" />
                  {locations.find(loc => loc.id === selectedLocationId)?.name || 'Chưa chọn địa điểm'}
                </div>
                <span>•</span>
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: memoryTypes[selectedCategory as keyof typeof memoryTypes]?.color }}></span>
                  {memoryTypes[selectedCategory as keyof typeof memoryTypes]?.name || 'Khác'}
                </div>
                <span>•</span>
                <div className="flex items-center">
                  <TagIcon className="h-4 w-4 text-blue-500 mr-1" />
                  {hashtags.length > 0 ? `${hashtags.length} hashtag` : 'Chưa có hashtag'}
                </div>
              </div>
            </div>
            
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content || '<p class="text-gray-400">Nội dung bài viết sẽ hiển thị ở đây...</p>' }}></div>
            
            {imagePreviews.length > 0 && (
              <div className="mt-4">
                {renderImageGrid(imagePreviews)}
              </div>
            )}
          </div>
        )}
        
        <footer className="p-4 bg-gray-50 border-t">
          <div className="flex justify-between items-center">
            <div>
              {isDraft ? (
                <button type="button" onClick={clearDraft} className="text-sm text-red-600 hover:text-red-800">Xóa bản nháp</button>
              ) : (
                <button type="button" onClick={saveDraft} className="text-sm text-gray-600 hover:text-gray-800" disabled={!title && !content && !selectedFeeling}>Lưu nháp</button>
              )}
            </div>
            <button type="submit" form="moment-form" disabled={!title.trim() || !content.trim() || !selectedLocationId} className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed">
              Đăng
            </button>
          </div>
        </footer>
      </div>
    </div>
  );

  if (!isOpen) return null;
  
  const modalRoot = document.getElementById('modal-root');
  return modalRoot ? createPortal(modalContent, modalRoot) : null;
}

export default CreateMomentModal; 