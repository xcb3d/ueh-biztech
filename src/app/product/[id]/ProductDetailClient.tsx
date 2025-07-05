'use client';

import { useState } from 'react';
import { useCartStore } from '@/store/cart-store';
import { Product } from '@/data/craft-villages';

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
      <div className="flex items-center space-x-4">
        <div className="flex-grow">
          <button
            onClick={handleAddToCart}
            disabled={isAdded}
            className={`w-full py-3 px-8 rounded-lg text-white font-bold text-lg transition-colors ${
              isAdded ? 'bg-green-500' : 'bg-purple-600 hover:bg-purple-700'
            }`}
          >
            {isAdded ? 'Đã thêm vào giỏ!' : 'Thêm vào giỏ hàng'}
          </button>
        </div>
      </div>
      
      <p className="text-sm text-gray-500 text-center">
        Miễn phí vận chuyển cho đơn hàng từ 500.000₫
      </p>
    </div>
  );
} 