'use client';

import { CraftVillage } from "@/data/craft-villages";
import DetailPageLayout from "@/components/details/DetailPageLayout";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ProductCard from "@/components/products/ProductCard";
import React from "react";
import { Tour } from "@/types/tour";
import Link from "next/link";
import Image from "next/image";

// Re-usable TourCard component from tours page
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
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{tour.title}</h3>
        
        <div className="flex items-center mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="ml-1 text-xs font-medium">{tour.rating}</span>
        </div>
        
        <div className="flex justify-between items-center mt-3">
          <div>
            <span className="text-base font-bold text-indigo-600">{tour.price.toLocaleString()} {tour.priceUnit}</span>
          </div>
          <Link 
            href={`/tours/${tour.id}`}
            className="px-3 py-1 text-sm bg-white border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50 transition-colors"
          >
            Xem Tour
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CraftVillageClientPage({ village, relatedTours }: { village: CraftVillage, relatedTours: Tour[] }) {
  const mainContent = (
    <>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {village.articleContent}
      </ReactMarkdown>

      {/* Product Section */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold text-purple-800 border-t pt-8">Sản phẩm nổi bật</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
          {village.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Related Tours Section */}
      {relatedTours && relatedTours.length > 0 && (
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-green-800 border-t pt-8">Tour trải nghiệm tại đây</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
            {relatedTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </div>
      )}
    </>
  );

  const sidebarContent = (
    <div className="bg-white p-6 rounded-xl shadow-lg space-y-4">
      <div>
        <h3 className="text-xl font-bold text-gray-800 border-b pb-3 mb-2">Sản phẩm đặc trưng</h3>
        <p className="text-gray-600">{village.product}</p>
      </div>
      <div>
        <h3 className="text-xl font-bold text-gray-800 border-b pb-3 mb-2">Lịch sử</h3>
        <p className="text-gray-600">{village.history}</p>
      </div>
    </div>
  );

  return (
    <DetailPageLayout
      title={village.name}
      badge="Làng nghề"
      heroImage={village.heroImage}
      mainContent={mainContent}
      sidebarContent={sidebarContent}
    />
  );
} 