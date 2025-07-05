'use client';

import { useCartStore } from '@/store/cart-store';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';

export default function Cart() {
  const { items, removeFromCart, updateQuantity } = useCartStore();
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="relative group pb-2">
      <div className="flex items-center cursor-pointer">
        <ShoppingBagIcon className="h-6 w-6" />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </div>

      {/* Dropdown Cart */}
      <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-2xl z-20 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
        {items.length === 0 ? (
          <p className="text-center text-gray-500">Giỏ hàng của bạn đang trống.</p>
        ) : (
          <>
            <div className="space-y-4 max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex items-start space-x-3">
                  <div className="w-16 h-16 relative rounded-md overflow-hidden">
                    <Image src={item.image} alt={item.name} layout="fill" objectFit="cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold">{item.name}</h4>
                    <p className="text-xs text-gray-500">{new Intl.NumberFormat('vi-VN').format(item.price)}đ</p>
                    <div className="flex items-center mt-2">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                        className="w-14 text-center border rounded-md"
                      />
                       <button onClick={() => removeFromCart(item.id)} className="ml-auto text-red-500 hover:text-red-700">Xóa</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 border-t pt-4">
              <div className="flex justify-between font-bold">
                <span>Tổng cộng:</span>
                <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice)}</span>
              </div>
              <Link 
                href="/checkout"
                className="block text-center w-full mt-4 bg-purple-600 text-white font-semibold py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Thanh toán
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 