'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { GlobeAltIcon } from "@heroicons/react/24/solid";
import Cart from "../cart/Cart";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Xác định tiêu đề trang dựa vào pathname
  const getPageTitle = () => {
    switch (pathname) {
      case '/map':
        return 'Bản đồ Ký ức';
      case '/account':
        return 'Tài khoản';
      case '/sign-in':
        return 'Đăng nhập';
      case '/sign-up':
        return 'Đăng ký';
      case '/tours':
        return 'Tour Du lịch';
      default:
        return '';
    }
  };

  // Kiểm tra xem route hiện tại có active không
  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  // Hiệu ứng scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md transition-all duration-300 ${
        scrolled ? 'shadow-md' : 'shadow-sm'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo và tên */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex items-center justify-center h-8 w-8 rounded-md bg-gradient-to-br from-blue-500 to-blue-700 text-white">
                <GlobeAltIcon className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                UEH BizTech
              </span>
            </Link>
            
            {/* Hiển thị tiêu đề trang */}
            {getPageTitle() && (
              <>
                <span className="hidden md:inline-block mx-3 text-gray-300">|</span>
                <h1 className="hidden md:block text-lg font-medium text-gray-700">{getPageTitle()}</h1>
              </>
            )}
          </div>

          {/* Menu desktop */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Dòng chảy
            </Link>
            <Link
              href="/map"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/map') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Bản đồ
            </Link>
            <Link
              href="/tours"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/tours') 
                  ? 'text-green-600 bg-green-50' 
                  : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
              }`}
            >
              Tour Du lịch
            </Link>
            <Link
              href="/marketplace"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/marketplace') 
                  ? 'text-purple-600 bg-purple-50' 
                  : 'text-gray-700 hover:text-purple-600 hover:bg-gray-50'
              }`}
            >
              Marketplace
            </Link>
            <SignedIn>
              <Link
                href="/account"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/account') 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                Tài khoản
              </Link>
            </SignedIn>
            
            <div className="ml-4 flex items-center space-x-4">
              <Cart />
              <SignedIn>
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "h-9 w-9 rounded-full ring-2 ring-white",
                      userButtonTrigger: "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                    },
                  }}
                />
              </SignedIn>
              <SignedOut>
                <Link
                  href="/sign-in"
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Đăng nhập
                </Link>
              </SignedOut>
            </div>
          </nav>

          {/* Menu button mobile */}
          <div className="flex items-center md:hidden">
            <Cart />
            <button
              type="button"
              className="ml-2 inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Mở menu chính</span>
              {isMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="space-y-1 px-2 pb-3 pt-2">
          <Link
            href="/"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/') 
                ? 'text-blue-600 bg-blue-50' 
                : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Dòng chảy
          </Link>
          <Link
            href="/map"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/map') 
                ? 'text-blue-600 bg-blue-50' 
                : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Bản đồ
          </Link>
          <Link
            href="/tours"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/tours') 
                ? 'text-green-600 bg-green-50' 
                : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Tour Du lịch
          </Link>
          <Link
            href="/marketplace"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/marketplace') 
                ? 'text-purple-600 bg-purple-50' 
                : 'text-gray-700 hover:text-purple-600 hover:bg-gray-50'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Marketplace
          </Link>
          <SignedIn>
            <Link
              href="/account"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/account') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Tài khoản
            </Link>
          </SignedIn>
          <SignedOut>
            <Link
              href="/sign-in"
              className="block w-full mt-3 text-center rounded-md bg-blue-600 px-4 py-2 text-base font-medium text-white hover:bg-blue-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Đăng nhập
            </Link>
          </SignedOut>
        </div>
      </div>
    </header>
  );
} 