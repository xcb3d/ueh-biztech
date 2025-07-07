'use client';

import { useState } from 'react';
import { useCartStore } from '@/store/cart-store';
import { Product } from '@/data/craft-villages';
import { motion } from 'framer-motion';
import { FaShoppingCart } from 'react-icons/fa';

export default function ProductDetailClient({ product }: { product: Product }) {
  const [isAdded, setIsAdded] = useState(false);
  const addToCart = useCartStore(state => state.addToCart);

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <div className="mt-8 space-y-4">
      <motion.button
        onClick={handleAddToCart}
        disabled={isAdded}
        className={`w-full py-3 px-8 rounded-lg text-white font-bold text-lg transition-colors flex items-center justify-center space-x-2 ${
          isAdded ? 'bg-green-500' : 'bg-blue-600 hover:bg-blue-700'
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <FaShoppingCart className="mr-2" />
        <span>{isAdded ? 'Đã thêm vào giỏ!' : 'Thêm vào giỏ hàng'}</span>
      </motion.button>
      
      <div className="flex items-center justify-center mt-4 text-sm text-gray-500">
        <svg className="w-4 h-4 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p>Miễn phí vận chuyển cho đơn hàng từ 500.000₫</p>
      </div>
    </div>
  );
} 