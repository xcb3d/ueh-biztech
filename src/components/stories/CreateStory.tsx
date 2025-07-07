'use client';

import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { MdClose, MdCheck, MdLocationOn, MdFormatColorText, MdCameraAlt, MdPhotoLibrary } from 'react-icons/md';
import Webcam from 'react-webcam';

interface CreateStoryProps {
  onClose: () => void;
  onSubmit: (data: {
    imageFile: File | null;
    caption?: string;
    location?: string;
    hasText?: boolean;
    textContent?: string;
    textPosition?: 'center' | 'top' | 'bottom';
    textColor?: string;
  }) => void;
}

const CreateStory: React.FC<CreateStoryProps> = ({ onClose, onSubmit }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [hasText, setHasText] = useState(false);
  const [textContent, setTextContent] = useState('');
  const [textPosition, setTextPosition] = useState<'center' | 'top' | 'bottom'>('center');
  const [textColor, setTextColor] = useState('#ffffff');
  const [step, setStep] = useState<'upload' | 'camera' | 'edit'>('upload');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const webcamRef = useRef<Webcam>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Tạo preview
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImagePreview(e.target.result as string);
          setStep('edit');
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleCameraCapture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setImagePreview(imageSrc);
        
        // Convert base64 to file
        fetch(imageSrc)
          .then(res => res.blob())
          .then(blob => {
            const file = new File([blob], "webcam-capture.png", { type: "image/png" });
            setImageFile(file);
            setStep('edit');
          });
      }
    }
  }, [webcamRef]);
  
  const handleSubmit = () => {
    onSubmit({
      imageFile,
      caption: caption || undefined,
      location: location || undefined,
      hasText,
      textContent: hasText ? textContent : undefined,
      textPosition: hasText ? textPosition : undefined,
      textColor: hasText ? textColor : undefined,
    });
  };
  
  const renderContent = () => {
    switch (step) {
      case 'upload':
        return (
          <div className="flex flex-col items-center justify-center h-full p-6">
            <div className="flex space-x-6 mb-8">
              <div 
                className="w-24 h-24 rounded-full bg-blue-50 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-100 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <MdPhotoLibrary size={32} className="text-blue-500 mb-1" />
                <span className="text-sm text-blue-500">Thư viện</span>
              </div>
              <div 
                className="w-24 h-24 rounded-full bg-blue-50 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-100 transition-colors"
                onClick={() => setStep('camera')}
              >
                <MdCameraAlt size={32} className="text-blue-500 mb-1" />
                <span className="text-sm text-blue-500">Camera</span>
              </div>
            </div>
            <p className="text-lg font-medium mb-2">Tạo story mới</p>
            <p className="text-gray-500 text-center mb-6">Chọn ảnh hoặc chụp ảnh mới</p>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>
        );
        
      case 'camera':
        return (
          <div className="h-full flex flex-col">
            <div className="relative flex-1 bg-black">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/png"
                videoConstraints={{
                  facingMode: "user"
                }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="p-4 bg-black flex justify-center">
              <button
                className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center"
                onClick={handleCameraCapture}
              >
                <div className="w-12 h-12 rounded-full bg-white"></div>
              </button>
            </div>
          </div>
        );
        
      case 'edit':
        return (
          <div className="h-full flex flex-col">
            {/* Image preview */}
            <div className="relative flex-1">
              {imagePreview && (
                <div className="absolute inset-0">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    layout="fill"
                    objectFit="cover"
                  />
                  
                  {/* Text overlay */}
                  {hasText && textContent && (
                    <div 
                      className={`absolute ${
                        textPosition === 'top' ? 'top-10' : 
                        textPosition === 'bottom' ? 'bottom-20' : 
                        'top-1/2 -translate-y-1/2'
                      } left-0 right-0 p-4 text-center`}
                    >
                      <h2 
                        className="text-2xl font-bold drop-shadow-lg"
                        style={{ color: textColor }}
                      >
                        {textContent}
                      </h2>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Edit options */}
            <div className="p-4 bg-white border-t">
              <div className="flex space-x-4 mb-4">
                <button 
                  className={`flex items-center justify-center px-3 py-2 rounded-lg ${hasText ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
                  onClick={() => setHasText(!hasText)}
                >
                  <MdFormatColorText size={20} className="mr-1" />
                  Thêm chữ
                </button>
                
                <button 
                  className="flex items-center justify-center px-3 py-2 rounded-lg bg-gray-100 text-gray-600"
                  onClick={() => {}}
                >
                  <MdLocationOn size={20} className="mr-1" />
                  Vị trí
                </button>
              </div>
              
              {hasText && (
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Nhập nội dung văn bản..."
                    className="w-full p-2 border rounded-lg"
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                  />
                  <div className="flex justify-between mt-2">
                    <div className="flex space-x-2">
                      <button 
                        className={`w-8 h-8 rounded-full ${textPosition === 'top' ? 'bg-blue-100' : 'bg-gray-100'}`}
                        onClick={() => setTextPosition('top')}
                      >
                        T
                      </button>
                      <button 
                        className={`w-8 h-8 rounded-full ${textPosition === 'center' ? 'bg-blue-100' : 'bg-gray-100'}`}
                        onClick={() => setTextPosition('center')}
                      >
                        C
                      </button>
                      <button 
                        className={`w-8 h-8 rounded-full ${textPosition === 'bottom' ? 'bg-blue-100' : 'bg-gray-100'}`}
                        onClick={() => setTextPosition('bottom')}
                      >
                        B
                      </button>
                    </div>
                    <input
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="w-8 h-8 rounded-full cursor-pointer"
                    />
                  </div>
                </div>
              )}
              
              <div>
                <input
                  type="text"
                  placeholder="Thêm mô tả..."
                  className="w-full p-2 border rounded-lg mb-2"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Thêm vị trí..."
                  className="w-full p-2 border rounded-lg"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>
          </div>
        );
    }
  };
  
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-md h-[80vh] max-h-[700px] bg-white rounded-lg overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 25 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <button
            className="w-8 h-8 flex items-center justify-center rounded-full"
            onClick={step === 'edit' || step === 'camera' ? () => setStep('upload') : onClose}
          >
            {step === 'edit' || step === 'camera' ? (
              <MdClose size={24} />
            ) : (
              <MdClose size={24} />
            )}
          </button>
          <h2 className="text-lg font-medium">
            {step === 'upload' && 'Tạo story mới'}
            {step === 'camera' && 'Chụp ảnh'}
            {step === 'edit' && 'Chỉnh sửa story'}
          </h2>
          {step === 'edit' && (
            <button
              className="flex items-center justify-center bg-blue-500 text-white px-3 py-1 rounded-full text-sm"
              onClick={handleSubmit}
            >
              <MdCheck size={18} className="mr-1" /> Đăng
            </button>
          )}
          {(step === 'upload' || step === 'camera') && <div className="w-8"></div>}
        </div>
        
        {/* Content */}
        <div className="h-[calc(100%-60px)]">
          {renderContent()}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CreateStory; 