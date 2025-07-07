'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePathname } from 'next/navigation';

type HeritageContextType = {
  shouldShowHeritageWidget: boolean;
};

const HeritageContext = createContext<HeritageContextType | undefined>(undefined);

// Danh sách các đường dẫn nên hiển thị widget
const SHOW_WIDGET_PATHS = [
  '/', // Trang chủ
  '/explore', // Trang khám phá
  '/map', // Trang bản đồ
  '/storyline', // Trang storyline
  '/moment', // Trang moment
  '/location', // Trang location
  '/lang-nghe', // Trang làng nghề
  '/event', // Trang sự kiện
  '/events', // Trang danh sách sự kiện
];

// Danh sách các đường dẫn không nên hiển thị widget
const HIDE_WIDGET_PATHS = [
  '/sign-in',
  '/sign-up',
  '/checkout',
  '/account',
  '/product',
  '/san-pham',
  '/create',
  '/admin',
];

export const HeritageProvider = ({ children }: { children: ReactNode }) => {
  const [shouldShowHeritageWidget, setShouldShowHeritageWidget] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Kiểm tra xem đường dẫn hiện tại có nằm trong danh sách hiển thị không
    const shouldShow = () => {
      // Nếu đường dẫn nằm trong danh sách ẩn, không hiển thị
      if (HIDE_WIDGET_PATHS.some(path => pathname.startsWith(path))) {
        return false;
      }
      
      // Nếu đường dẫn nằm trong danh sách hiển thị hoặc là trang chủ, hiển thị
      if (pathname === '/' || SHOW_WIDGET_PATHS.some(path => pathname.startsWith(path))) {
        return true;
      }
      
      // Mặc định không hiển thị
      return false;
    };

    setShouldShowHeritageWidget(shouldShow());
  }, [pathname]);

  return (
    <HeritageContext.Provider value={{ shouldShowHeritageWidget }}>
      {children}
    </HeritageContext.Provider>
  );
};

export const useHeritage = (): HeritageContextType => {
  const context = useContext(HeritageContext);
  if (context === undefined) {
    throw new Error('useHeritage must be used within a HeritageProvider');
  }
  return context;
}; 