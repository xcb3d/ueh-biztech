'use client';

import { useState } from 'react';
import { useCartStore } from '@/store/cart-store';
import Image from 'next/image';
import Link from 'next/link';

export default function CheckoutPage() {
  const { items, clearCart } = useCartStore();
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    notes: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsSubmitting(true);

    // Simulate API call
    console.log("ĐƠN HÀNG MỚI:", {
      customer: formData,
      items: items,
      totalPrice: totalPrice,
      orderDate: new Date().toISOString(),
    });

    setTimeout(() => {
      clearCart();
      setIsSubmitting(false);
      setOrderPlaced(true);
    }, 1500); // Giả lập thời gian chờ xử lý
  };

  if (orderPlaced) {
    return (
      <div className="container mx-auto max-w-4xl py-12 px-4 text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-4">Đặt hàng thành công!</h1>
        <p className="text-gray-700 text-lg mb-8">Cảm ơn bạn đã mua sắm. Chúng tôi sẽ xử lý đơn hàng của bạn trong thời gian sớm nhất.</p>
        <Link href="/" className="bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors">
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="container mx-auto max-w-4xl py-12 px-4 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Giỏ hàng của bạn đang trống</h1>
        <p className="text-gray-600 mb-8">Hãy thêm vài sản phẩm vào giỏ trước khi tiến hành thanh toán nhé.</p>
        <Link href="/map" className="bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors">
          Khám phá Bản đồ Làng nghề
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto max-w-6xl py-12 px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Thanh Toán Đơn Hàng</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cột thông tin khách hàng */}
            <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-b pb-4">Thông tin giao hàng</h2>
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-1">Họ và tên</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500" required />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-600 mb-1">Số điện thoại</label>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500" required />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-600 mb-1">Địa chỉ nhận hàng</label>
                  <input type="text" id="address" name="address" value={formData.address} onChange={handleInputChange} className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500" required />
                </div>
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-600 mb-1">Ghi chú (tùy chọn)</label>
                  <textarea id="notes" name="notes" rows={3} value={formData.notes} onChange={handleInputChange} className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"></textarea>
                </div>
              </div>
            </div>

            {/* Cột tóm tắt đơn hàng */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-xl shadow-lg sticky top-28">
                <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-b pb-4">Tóm tắt đơn hàng</h2>
                <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                  {items.map(item => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden border">
                        <Image src={item.image} alt={item.name} layout="fill" objectFit="cover" />
                        <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{item.quantity}</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800 text-sm">{item.name}</p>
                        <p className="text-gray-500 text-sm">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 border-t pt-4 space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Tạm tính</span>
                    <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Phí vận chuyển</span>
                    <span className="font-semibold text-green-600">Miễn phí</span>
                  </div>
                  <div className="flex justify-between font-bold text-xl text-gray-800 border-t pt-3 mt-3">
                    <span>Tổng cộng</span>
                    <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice)}</span>
                  </div>
                </div>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-6 bg-purple-600 text-white font-bold py-3 rounded-lg hover:bg-purple-700 transition-colors disabled:bg-purple-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Đang xử lý...
                    </>
                  ) : 'Hoàn tất Đặt hàng'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
} 