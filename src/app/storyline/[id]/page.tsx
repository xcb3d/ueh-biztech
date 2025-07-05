'use client';

import React from 'react';
import { useParams, notFound } from 'next/navigation';
import { storylines } from '@/data/storylineData';
import { moments as allMoments } from '@/data/momentData';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import MomentCard from '@/components/feed/MomentCard';

export default function StorylineDetailPage() {
  const params = useParams();
  const storylineId = params.id as string;

  const storyline = storylines.find((s) => s.id === storylineId);

  if (!storyline) {
    notFound();
  }

  const momentsInStoryline = allMoments.filter(m => storyline.momentIds.includes(m.id));

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto max-w-4xl p-4">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
            <ArrowLeftIcon className="h-5 w-5" />
            <span className="font-medium">Quay về Dòng chảy</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200/80 mb-8">
          <div className="relative w-full h-80">
            <Image 
              src={storyline.coverImage} 
              alt={storyline.title} 
              layout="fill" 
              objectFit="cover" 
              className="brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
              <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">{storyline.title}</h1>
              <p className="text-lg text-white/90 drop-shadow-md">{storyline.description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-6 border-b">
            <Image src={storyline.author.avatarUrl} alt={storyline.author.name} width={48} height={48} className="rounded-full"/>
            <div>
              <p className="font-semibold text-gray-800">{storyline.author.name}</p>
              <p className="text-sm text-gray-500">Người kể chuyện</p>
            </div>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Các khoảnh khắc trong hành trình:</h2>
        
        <div className="space-y-6">
          {momentsInStoryline.map(moment => (
            <MomentCard key={moment.id} moment={moment} />
          ))}
        </div>
      </div>
    </div>
  );
} 