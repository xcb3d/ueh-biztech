'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
import { Product } from "@/data/craft-villages";

const ProductCard = ({ product }: { product: Product }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000); // Reset sau 2 giây
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative w-full h-56">
          <Image 
            src={product.image} 
            alt={product.name} 
            layout="fill" 
            objectFit="cover" 
          />
        </div>
      </Link>
      <div className="p-4 flex flex-col">
        <Link href={`/product/${product.id}`} className="block hover:text-purple-600 transition-colors">
          <h3 className="font-semibold text-lg text-gray-800 flex-grow">{product.name}</h3>
        </Link>
        <p className="text-purple-600 font-bold mt-2">
          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
        </p>
        <button 
          onClick={handleAddToCart}
          disabled={isAdded}
          className={`w-full mt-4 text-white font-semibold py-2 rounded-lg transition-colors duration-300 ${isAdded ? 'bg-green-500' : 'bg-purple-600 hover:bg-purple-700'}`}
        >
          {isAdded ? 'Đã thêm!' : 'Thêm vào giỏ'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard; 