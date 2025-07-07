'use client';

import React from 'react';
import { useHeritage } from '@/lib/heritage-context';
import DailyHeritageWidget from './DailyHeritageWidget';

const GlobalHeritageWidget = () => {
  const { shouldShowHeritageWidget } = useHeritage();

  if (!shouldShowHeritageWidget) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 w-64 shadow-lg rounded-lg overflow-hidden">
      <DailyHeritageWidget />
    </div>
  );
};

export default GlobalHeritageWidget; 