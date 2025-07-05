'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { moments } from '@/data/momentData';
import { locations } from '@/data/locationData';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { LightBulbIcon } from '@heroicons/react/24/outline';

export default function MomentDetailPage() {
  const params = useParams();
  const momentId = params.id as string;

  const moment = moments.find((m) => m.id === momentId);
  const location = moment ? locations.find(l => l.id === moment.locationId) : null;

  if (!moment || !location) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-64px)]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Không tìm thấy khoảnh khắc</h2>
          <p className="text-gray-600 mt-2">Khoảnh khắc bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
          <Link href="/" className="mt-6 inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            Quay về Dòng chảy
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto max-w-4xl p-4">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
            <ArrowLeftIcon className="h-5 w-5" />
            <span className="font-medium">Quay về Dòng chảy</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200/80">
          {moment.imageUrl && (
            <div className="relative w-full h-96 lg:h-[500px]">
              <Image src={moment.imageUrl} alt={moment.title} layout="fill" objectFit="cover" />
            </div>
          )}
          
          <div className="p-6 md:p-8">
            <div className="mb-4">
              <Link href={`/location/${location.id}`} className="text-blue-600 hover:underline font-semibold">
                {location.name}
              </Link>
            </div>
            
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{moment.title}</h1>
            
            <div className="flex items-center space-x-4 mb-6 border-b pb-4">
              <Image src={moment.author.avatarUrl} alt={moment.author.name} width={48} height={48} className="rounded-full"/>
              <div>
                <p className="font-semibold text-gray-800">{moment.author.name}</p>
                <p className="text-sm text-gray-500">{new Date(moment.createdAt).toLocaleDateString('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              </div>
            </div>
            
            <div className="prose lg:prose-lg max-w-none text-gray-800">
              <p>{moment.content}</p>
            </div>

            {location.historicalFact && (
              <div className="mt-8 p-4 bg-blue-50/70 border-l-4 border-blue-400 rounded-r-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <LightBulbIcon className="h-6 w-6 text-blue-500" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      <span className="font-bold">Bạn có biết?</span> {location.historicalFact}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
