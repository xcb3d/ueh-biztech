'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
import { Product } from "@/data/craft-villages";
import { motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";

// Extended product type with village information
interface ExtendedProduct extends Product {
  villageName?: string;
  villageSlug?: string;
}

const ProductCard = ({ product }: { product: ExtendedProduct }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to product page
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000); // Reset after 2 seconds
  };

  return (
    <div className="relative h-full bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 transition-all duration-300">
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative w-full h-60 overflow-hidden">
          <Image 
            src={product.image} 
            alt={product.name} 
            layout="fill" 
            objectFit="cover"
          />
          
          {/* Status indicator - elegant version */}
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex items-center bg-white/90 backdrop-blur-sm text-green-600 text-xs font-medium px-2.5 py-1 rounded-full border border-green-100">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
              Còn hàng
            </span>
          </div>
        </div>
        
        <div className="p-4">
          {product.villageName && (
            <div className="mb-2">
              <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                {product.villageName}
              </span>
            </div>
          )}
          
          <h3 className="font-semibold text-lg text-gray-800 line-clamp-2 mb-2">
            {product.name}
          </h3>
          
          <div className="flex items-center justify-between mt-3">
            <div className="text-blue-600 font-bold text-lg">
              {new Intl.NumberFormat('vi-VN', { 
                style: 'currency', 
                currency: 'VND',
                maximumFractionDigits: 0
              }).format(product.price)}
            </div>
            
            <motion.button
              className={`p-2.5 rounded-full ${
                isAdded ? 'bg-green-500' : 'bg-blue-600'
              } text-white`}
              onClick={handleAddToCart}
              whileTap={{ scale: 0.95 }}
              aria-label="Thêm vào giỏ hàng"
            >
              {isAdded ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              ) : (
                <FaShoppingCart size={16} />
              )}
            </motion.button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard; 