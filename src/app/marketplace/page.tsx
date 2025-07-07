'use client';

import { useState, useRef, useEffect } from "react";
import { craftVillages } from "@/data/craft-villages";
import ProductCard from "@/components/products/ProductCard";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { FaShoppingBasket, FaFilter, FaSortAmountDown, FaChevronDown } from 'react-icons/fa';

export default function MarketplacePage() {
  const allProducts = craftVillages.flatMap(village => 
    village.products.map(product => ({ ...product, villageName: village.name, villageSlug: village.slug }))
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('all');
  const [sortOrder, setSortOrder] = useState('default');
  const [showFilters, setShowFilters] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  
  const contentRef = useRef<HTMLDivElement>(null);
  
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

  const filteredAndSortedProducts = allProducts
    .filter(product => {
      // Lọc theo tên sản phẩm
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      // Lọc theo làng nghề
      const matchesVillage = selectedVillage === 'all' || product.villageSlug === selectedVillage;
      return matchesSearch && matchesVillage;
    })
    .sort((a, b) => {
      switch (sortOrder) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section with Parallax Effect */}
      <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
        <motion.div 
          className="absolute inset-0"
          style={{ y, opacity }}
        >
          <Image
            src="https://images.unsplash.com/photo-1573227895118-8f8fa1172a09?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Thế Giới Sản Phẩm Thủ Công"
            layout="fill"
            objectFit="cover"
            priority
            className="brightness-90 filter"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 flex flex-col justify-end p-6 sm:p-16 z-10"
        >
          <span className="px-4 py-1.5 text-sm font-medium text-white bg-blue-600/90 backdrop-blur-sm rounded-full inline-block mb-4 w-fit">
            Marketplace
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 max-w-4xl leading-tight drop-shadow-lg">
            Thế Giới Sản Phẩm Thủ Công
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-3xl mb-8">
            Tất cả sản phẩm độc đáo từ các làng nghề truyền thống Việt Nam, hội tụ tại một nơi.
          </p>
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

      {/* Floating header when scrolled */}
      <motion.div 
        className={`fixed top-0 left-0 right-0 bg-white z-30 shadow-md py-3 px-4 md:px-8 flex items-center justify-between transition-transform duration-300 ${isScrolled ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <h2 className="text-xl font-bold text-blue-600 flex items-center">
          <FaShoppingBasket className="mr-2" /> Marketplace
        </h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-40 md:w-60 pl-8 py-1.5 border border-blue-200 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
            />
            <MagnifyingGlassIcon className="h-4 w-4 text-blue-400 absolute left-2 top-1/2 transform -translate-y-1/2" />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors"
          >
            <FaFilter className="h-4 w-4 text-blue-600" />
          </button>
        </div>
      </motion.div>

      {/* Content Section */}
      <div ref={contentRef} className="container mx-auto px-4 py-12">
        {/* Search and Filter Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-blue-100 mb-8 overflow-hidden"
        >
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-blue-400" />
                </div>
                <input
                  type="text"
                  id="search"
                  placeholder="Tìm kiếm sản phẩm..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full border-blue-200 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                />
              </div>
              
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors"
                >
                  <FaFilter className="mr-2" />
                  <span>{showFilters ? 'Ẩn bộ lọc' : 'Hiển thị bộ lọc'}</span>
                </button>
                
                <div className="text-sm text-gray-500 hidden md:block">
                  <span className="font-semibold">{filteredAndSortedProducts.length}</span> sản phẩm
                </div>
              </div>
            </div>
            
            {showFilters && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 pt-6 border-t border-blue-100"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Filter by Village */}
                  <div>
                    <label htmlFor="village-filter" className="block text-sm font-medium text-gray-700 mb-2">Làng nghề</label>
                    <div className="relative">
                      <select
                        id="village-filter"
                        value={selectedVillage}
                        onChange={(e) => setSelectedVillage(e.target.value)}
                        className="w-full border-blue-200 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 pl-4 pr-10 py-2.5 appearance-none bg-white"
                      >
                        <option value="all">Tất cả làng nghề</option>
                        {craftVillages.map(village => (
                          <option key={village.slug} value={village.slug}>{village.name}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <FaChevronDown className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Sort Order */}
                  <div>
                    <label htmlFor="sort-order" className="block text-sm font-medium text-gray-700 mb-2">Sắp xếp theo</label>
                    <div className="relative">
                      <select
                        id="sort-order"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="w-full border-blue-200 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 pl-4 pr-10 py-2.5 appearance-none bg-white"
                      >
                        <option value="default">Mặc định</option>
                        <option value="price-asc">Giá: Thấp đến Cao</option>
                        <option value="price-desc">Giá: Cao đến Thấp</option>
                        <option value="name-asc">Tên: A-Z</option>
                        <option value="name-desc">Tên: Z-A</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <FaSortAmountDown className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Product Grid */}
        {filteredAndSortedProducts.length > 0 ? (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {filteredAndSortedProducts.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 bg-white rounded-lg shadow-sm border border-blue-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="mt-4 text-2xl font-semibold text-gray-700">Không tìm thấy sản phẩm phù hợp</h3>
            <p className="mt-2 text-gray-500">Vui lòng thử lại với từ khóa hoặc bộ lọc khác.</p>
            <button 
              onClick={() => {setSearchTerm(''); setSelectedVillage('all'); setSortOrder('default');}}
              className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Xóa bộ lọc
            </button>
          </motion.div>
        )}
      </div>
      
      {/* Back to top button */}
      <motion.button
        className={`fixed bottom-6 right-6 p-3 bg-blue-600 text-white rounded-full shadow-lg z-30 transition-opacity duration-300 ${isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaChevronDown className="transform rotate-180" />
      </motion.button>
    </div>
  );
} 