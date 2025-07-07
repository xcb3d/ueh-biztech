'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  MdHome, 
  MdExplore, 
  MdNotifications, 
  MdChat, 
  MdPerson, 
  MdSearch,
  MdEvent,
  MdStorefront
} from 'react-icons/md';

const Header: React.FC = () => {
  const pathname = usePathname();
  const [showSearch, setShowSearch] = useState(false);
  
  const navItems = [
    { icon: MdHome, label: 'Trang chủ', href: '/' },
    { icon: MdExplore, label: 'Khám phá', href: '/map' },
    { icon: MdEvent, label: 'Sự kiện', href: '/events' },
    { icon: MdStorefront, label: 'Chợ', href: '/marketplace' },
  ];
  
  const actionItems = [
    { icon: MdSearch, label: 'Tìm kiếm', action: () => setShowSearch(!showSearch) },
    { icon: MdNotifications, label: 'Thông báo', href: '/notifications', badge: 3 },
    { icon: MdChat, label: 'Tin nhắn', href: '/messages', badge: 5 },
    { icon: MdPerson, label: 'Trang cá nhân', href: '/profile' },
  ];
  
  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };
  
  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <div className="flex items-center">
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image 
                    src="/globe.svg" 
                    alt="UEH BizTech Logo" 
                    layout="fill"
                    className="p-1 bg-blue-50"
                  />
                </div>
                <span className="ml-2 text-lg font-bold text-blue-600 hidden md:block">UEH BizTech</span>
              </div>
            </Link>
          </div>
          
          {/* Navigation - Center */}
          <nav className="flex items-center justify-center">
            <div className="flex space-x-1 md:space-x-4">
              {navItems.map((item) => (
                <Link 
                  key={item.href} 
                  href={item.href}
                  className={`relative flex flex-col items-center justify-center p-2 rounded-full transition-colors ${
                    isActive(item.href) 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  aria-label={item.label}
                >
                  <item.icon size={24} />
                  <span className="text-xs mt-1 hidden md:block">{item.label}</span>
                  {isActive(item.href) && (
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full md:hidden"></span>
                  )}
                </Link>
              ))}
            </div>
          </nav>
          
          {/* Action Items - Right */}
          <div className="flex items-center space-x-1 md:space-x-3">
            {actionItems.map((item, index) => (
              item.href ? (
                <Link 
                  key={item.href} 
                  href={item.href}
                  className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full"
                  aria-label={item.label}
                >
                  <item.icon size={22} />
                  {item.badge && (
                    <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ) : (
                <button
                  key={index}
                  onClick={item.action}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
                  aria-label={item.label}
                >
                  <item.icon size={22} />
                </button>
              )
            ))}
            
            {/* User Profile */}
            <div className="relative ml-2">
              <button className="flex items-center">
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-200">
                  <Image 
                    src="https://i.pravatar.cc/150?u=user-1" 
                    alt="User Avatar" 
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
        
        {/* Search Bar */}
        {showSearch && (
          <div className="py-2 px-4 border-t">
            <div className="relative">
              <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 