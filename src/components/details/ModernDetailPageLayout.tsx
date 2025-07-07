'use client';

import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { FaFacebook, FaTwitter, FaLink, FaChevronDown } from 'react-icons/fa';

interface ModernDetailPageLayoutProps {
  title: string;
  badge?: string;
  heroImage: string;
  mainContent: React.ReactNode;
  modelContent?: React.ReactNode;
  sidebarContent: React.ReactNode;
  extraInfoContent?: React.ReactNode;
}

const ModernDetailPageLayout: React.FC<ModernDetailPageLayoutProps> = ({
  title,
  badge,
  heroImage,
  mainContent,
  modelContent,
  sidebarContent,
  extraInfoContent,
}) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  
  const [copied, setCopied] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const contentRef = useRef<HTMLDivElement>(null);
  const contentInView = useInView(contentRef, { once: true, amount: 0.1 });
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Check if page is scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Không cần preload thủ công vì Next.js Image đã có priority
  
  return (
    <div className="bg-neutral-50 min-h-screen">
      {/* Hero Section with Parallax Effect */}
      <div className="relative h-[80vh] md:h-[85vh] w-full overflow-hidden">
        <motion.div 
          className="absolute inset-0"
          style={{ y, opacity }}
        >
          <Image
            src={heroImage}
            alt={`Hình ảnh của ${title}`}
            layout="fill"
            objectFit="cover"
            priority
            className="brightness-80 filter hover:scale-105 transition-transform duration-[3s]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 flex flex-col justify-end p-6 sm:p-16 z-10"
        >
          {badge && (
            <span className="px-4 py-1.5 text-sm font-medium text-white bg-black/70 backdrop-blur-sm rounded-full inline-block mb-4 w-fit">
              {badge}
            </span>
          )}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 max-w-4xl leading-tight drop-shadow-lg">
            {title}
          </h1>
          
          {/* Social Share Buttons */}
          <div className="flex space-x-3 mt-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition-colors"
              onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
              aria-label="Chia sẻ trên Facebook"
            >
              <FaFacebook size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 bg-sky-500 rounded-full text-white hover:bg-sky-600 transition-colors"
              onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(title)}`, '_blank')}
              aria-label="Chia sẻ trên Twitter"
            >
              <FaTwitter size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 bg-neutral-700 rounded-full text-white hover:bg-neutral-800 transition-colors relative"
              onClick={handleCopyLink}
              aria-label="Sao chép liên kết"
            >
              <FaLink size={18} />
              {copied && (
                <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                  Đã sao chép!
                </span>
              )}
            </motion.button>
          </div>
        </motion.div>
        
        {/* Scroll down indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          onClick={scrollToContent}
        >
          <FaChevronDown className="text-white text-2xl" />
        </motion.div>
      </div>

      {/* Content Section */}
      <div ref={contentRef} className="container mx-auto px-4 py-12">
        {/* Floating title that appears when scrolled */}
        <motion.div 
          className={`fixed top-0 left-0 right-0 bg-white z-30 shadow-md py-3 px-4 md:px-8 flex items-center justify-between transition-transform duration-300 ${isScrolled ? 'translate-y-0' : '-translate-y-full'}`}
        >
          <h2 className="text-xl font-bold text-neutral-800 truncate">{title}</h2>
          <div className="flex space-x-2">
            <button 
              className="p-2 bg-neutral-100 rounded-full hover:bg-neutral-200 transition-colors"
              onClick={handleCopyLink}
            >
              <FaLink size={14} />
            </button>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-12">
            {/* 3D Model Section - If Available */}
            {modelContent && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-neutral-100"
              >
                {modelContent}
              </motion.div>
            )}
            
            {/* Article Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-neutral-100"
            >
              <article className="prose prose-lg max-w-none prose-h2:text-2xl prose-h2:font-bold prose-h3:text-xl prose-h3:font-semibold prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-img:rounded-lg prose-p:text-neutral-700">
                {mainContent}
              </article>
            </motion.div>
            
            {/* Extra Info Section */}
            {extraInfoContent && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                {extraInfoContent}
              </motion.div>
            )}
          </div>
          
          {/* Sidebar */}
          <motion.aside 
            initial={{ opacity: 0, x: 20 }}
            animate={contentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="lg:col-span-4"
          >
            <div className="sticky top-20 space-y-8">
              {sidebarContent}
            </div>
          </motion.aside>
        </div>
      </div>
      
      {/* Back to top button */}
      <motion.button
        className={`fixed bottom-6 right-6 p-3 bg-black text-white rounded-full shadow-lg z-30 transition-opacity duration-300 ${isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaChevronDown className="transform rotate-180" />
      </motion.button>
    </div>
  );
};

export default ModernDetailPageLayout; 