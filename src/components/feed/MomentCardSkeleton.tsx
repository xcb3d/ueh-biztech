import React from 'react';

const MemoryCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200/80 w-full mx-auto">
      <div className="animate-pulse flex flex-col space-y-4">
        {/* Header Skeleton */}
        <div className="flex items-center space-x-3">
          <div className="rounded-full bg-gray-200 h-11 w-11"></div>
          <div className="flex-1 space-y-2 py-1">
            <div className="h-3 bg-gray-200 rounded w-2/5"></div>
            <div className="h-2 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="space-y-3 pt-2">
          <div className="h-4 bg-gray-200 rounded w-4/5"></div>
          <div className="h-3 bg-gray-200 rounded w-full"></div>
          <div className="h-3 bg-gray-200 rounded w-5/6"></div>
        </div>

        {/* Image Skeleton */}
        <div className="rounded-lg bg-gray-200 h-96 w-full"></div>

        {/* Actions Skeleton */}
        <div className="flex justify-around pt-2">
            <div className="h-5 bg-gray-200 rounded w-1/4"></div>
            <div className="h-5 bg-gray-200 rounded w-1/4"></div>
            <div className="h-5 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );
};

export default MemoryCardSkeleton; 