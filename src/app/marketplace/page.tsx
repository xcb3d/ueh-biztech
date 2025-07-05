'use client';

import { useState } from "react";
import { craftVillages } from "@/data/craft-villages";
import ProductCard from "@/components/products/ProductCard";
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";

export default function MarketplacePage() {
  const allProducts = craftVillages.flatMap(village => 
    village.products.map(product => ({ ...product, villageName: village.name, villageSlug: village.slug }))
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('all');
  const [sortOrder, setSortOrder] = useState('default');
  const [showFilters, setShowFilters] = useState(false);

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

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Khám Phá</span>
            <span className="block text-purple-600">Thế Giới Sản Phẩm Thủ Công</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Tất cả sản phẩm độc đáo từ các làng nghề truyền thống Việt Nam, hội tụ tại một nơi.
          </p>
        </div>

        {/* Filter and Sort Controls - Improved UI */}
        <div className="bg-white rounded-xl shadow-lg mb-8 sticky top-20 z-10 overflow-hidden">
          <div className="p-4 border-b">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="search"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
              />
            </div>
            <div className="mt-4 flex justify-between items-center">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center text-sm font-medium text-purple-600 hover:text-purple-800 transition-colors"
              >
                <AdjustmentsHorizontalIcon className="h-5 w-5 mr-1" />
                {showFilters ? 'Ẩn bộ lọc' : 'Hiển thị bộ lọc'}
              </button>
              <div className="text-sm text-gray-500">
                Hiển thị <span className="font-semibold">{filteredAndSortedProducts.length}</span> sản phẩm
              </div>
            </div>
          </div>
          
          {showFilters && (
            <div className="p-4 bg-gray-50 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Filter by Village - Improved */}
              <div>
                <label htmlFor="village-filter" className="block text-sm font-medium text-gray-700 mb-1">Làng nghề</label>
                <select
                  id="village-filter"
                  value={selectedVillage}
                  onChange={(e) => setSelectedVillage(e.target.value)}
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                >
                  <option value="all">Tất cả làng nghề</option>
                  {craftVillages.map(village => (
                    <option key={village.slug} value={village.slug}>{village.name}</option>
                  ))}
                </select>
              </div>
              
              {/* Sort Order - Improved */}
              <div>
                <label htmlFor="sort-order" className="block text-sm font-medium text-gray-700 mb-1">Sắp xếp theo</label>
                <select
                  id="sort-order"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                >
                  <option value="default">Sắp xếp mặc định</option>
                  <option value="price-asc">Giá: Thấp đến Cao</option>
                  <option value="price-desc">Giá: Cao đến Thấp</option>
                  <option value="name-asc">Tên: A-Z</option>
                  <option value="name-desc">Tên: Z-A</option>
                </select>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredAndSortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredAndSortedProducts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="mt-4 text-2xl font-semibold text-gray-700">Không tìm thấy sản phẩm phù hợp</h3>
            <p className="mt-2 text-gray-500">Vui lòng thử lại với từ khóa hoặc bộ lọc khác.</p>
            <button 
              onClick={() => {setSearchTerm(''); setSelectedVillage('all'); setSortOrder('default');}}
              className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              Xóa bộ lọc
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 