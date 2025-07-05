'use client';

import { mockTours } from "@/data/mockTours";
import { Tour } from "@/types/tour";
import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";

// Lấy danh sách các tỉnh duy nhất từ mockdata
const provinces = Array.from(new Set(mockTours.map(tour => tour.location.province)));

export default function ToursPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('all');
  const [minRating, setMinRating] = useState(0);
  const [sortOption, setSortOption] = useState('featured');

  const filteredAndSortedTours = useMemo(() => {
    let tours = [...mockTours];

    // Lọc theo từ khóa tìm kiếm
    if (searchTerm) {
      tours = tours.filter(tour => 
        tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tour.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tour.location.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Lọc theo tỉnh/thành
    if (selectedProvince !== 'all') {
      tours = tours.filter(tour => tour.location.province === selectedProvince);
    }
    
    // Lọc theo đánh giá
    if (minRating > 0) {
      tours = tours.filter(tour => tour.rating >= minRating);
    }
    
    // Sắp xếp
    switch (sortOption) {
      case 'price-asc':
        tours.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        tours.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        tours.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        tours.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return tours;
  }, [searchTerm, selectedProvince, minRating, sortOption]);

  const featuredTours = filteredAndSortedTours.filter(tour => tour.featured);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-2">Khám phá tour du lịch văn hóa</h1>
      <p className="text-gray-600 mb-6">Tìm kiếm, lọc và sắp xếp các tour trải nghiệm độc đáo trên khắp Việt Nam.</p>

      {/* Filter and Sort Controls */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-8 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search Input */}
          <div className="lg:col-span-2">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Tìm kiếm</label>
            <input
              type="text"
              id="search"
              placeholder="Nhập tên tour, địa điểm..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Province Filter */}
          <div>
            <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-1">Tỉnh/Thành phố</label>
            <select
              id="province"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              value={selectedProvince}
              onChange={e => setSelectedProvince(e.target.value)}
            >
              <option value="all">Tất cả</option>
              {provinces.map(province => (
                <option key={province} value={province}>{province}</option>
              ))}
            </select>
          </div>

          {/* Rating Filter */}
          <div>
            <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">Đánh giá</label>
            <select
              id="rating"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              value={minRating}
              onChange={e => setMinRating(Number(e.target.value))}
            >
              <option value="0">Tất cả</option>
              <option value="4">Từ 4 sao</option>
              <option value="4.5">Từ 4.5 sao</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">Sắp xếp theo</label>
            <select
              id="sort"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              value={sortOption}
              onChange={e => setSortOption(e.target.value)}
            >
              <option value="featured">Nổi bật</option>
              <option value="price-asc">Giá tăng dần</option>
              <option value="price-desc">Giá giảm dần</option>
              <option value="rating-desc">Đánh giá cao nhất</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Featured Tours Section */}
      {featuredTours.length > 0 && sortOption === 'featured' && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Tour nổi bật</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTours.map(tour => (
                <FeaturedTourCard key={tour.id} tour={tour} />
              ))}
          </div>
        </div>
      )}
      
      {/* All Tours Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">
          {sortOption !== 'featured' ? 'Kết quả' : 'Tất cả các tour'}
        </h2>
        {filteredAndSortedTours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedTours.map(tour => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-lg font-medium text-gray-700">Không tìm thấy tour phù hợp.</p>
            <p className="text-gray-500 mt-2">Vui lòng thử lại với bộ lọc khác.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function FeaturedTourCard({ tour }: { tour: Tour }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-64 w-full">
        <Image 
          src={tour.images[0] || "/images/placeholder.jpg"}
          alt={tour.title}
          fill
          className="object-cover"
        />
        <div className="absolute top-4 right-4 bg-yellow-500 text-white px-2 py-1 rounded-md text-sm font-medium">
          Nổi bật
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center mb-2">
          <div className="relative h-6 w-6 rounded-full overflow-hidden mr-2">
            <Image
              src={tour.provider.logo || "/images/placeholder-logo.png"}
              alt={tour.provider.name}
              fill
              className="object-cover"
            />
          </div>
          <span className="text-sm text-gray-600">{tour.provider.name}</span>
        </div>
        
        <h3 className="text-xl font-semibold mb-2">{tour.title}</h3>
        
        <div className="flex items-center mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="ml-1 text-sm font-medium">{tour.rating}</span>
          <span className="mx-1 text-gray-400">•</span>
          <span className="text-sm text-gray-600">{tour.reviewCount} đánh giá</span>
        </div>
        
        <div className="flex items-center mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span className="ml-1 text-sm text-gray-600">{tour.location.name}, {tour.location.province}</span>
        </div>
        
        <div className="flex items-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          <span className="ml-1 text-sm text-gray-600">{tour.duration}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <span className="text-lg font-bold text-indigo-600">{tour.price.toLocaleString()} {tour.priceUnit}</span>
            <span className="text-sm text-gray-500">/người</span>
          </div>
          
          <Link 
            href={`/tours/${tour.id}`}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Chi tiết
          </Link>
        </div>
      </div>
    </div>
  );
}

function TourCard({ tour }: { tour: Tour }) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full">
        <Image 
          src={tour.images[0] || "/images/placeholder.jpg"}
          alt={tour.title}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="p-4">
        <div className="flex items-center mb-2">
          <div className="relative h-5 w-5 rounded-full overflow-hidden mr-2">
            <Image
              src={tour.provider.logo || "/images/placeholder-logo.png"}
              alt={tour.provider.name}
              fill
              className="object-cover"
            />
          </div>
          <span className="text-xs text-gray-600">{tour.provider.name}</span>
        </div>
        
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{tour.title}</h3>
        
        <div className="flex items-center mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="ml-1 text-xs font-medium">{tour.rating}</span>
          <span className="mx-1 text-gray-400">•</span>
          <span className="text-xs text-gray-600">{tour.location.name}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <span className="text-base font-bold text-indigo-600">{tour.price.toLocaleString()} {tour.priceUnit}</span>
          </div>
          
          <Link 
            href={`/tours/${tour.id}`}
            className="px-3 py-1 text-sm bg-white border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50 transition-colors"
          >
            Chi tiết
          </Link>
        </div>
      </div>
    </div>
  );
} 