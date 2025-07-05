'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Storyline } from '@/data/storylineData';
import { ArrowRightIcon } from '@heroicons/react/24/solid';

interface StorylineCardProps {
  storyline: Storyline;
}

const StorylineCard: React.FC<StorylineCardProps> = ({ storyline }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200/80 hover:shadow-lg transition-shadow duration-300">
      <Link href={`/storyline/${storyline.id}`} className="block">
        <div className="relative h-48 w-full">
          <Image
            src={storyline.coverImage}
            alt={storyline.title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute top-2 left-2">
            <span className="px-3 py-1 text-xs text-white bg-blue-600 rounded-full font-semibold shadow">
              TUYẾN HÀNH TRÌNH
            </span>
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{storyline.title}</h3>
          <p className="text-gray-600 text-sm mb-4">{storyline.description}</p>
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-3">
              <Image 
                src={storyline.author.avatarUrl} 
                alt={storyline.author.name}
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="text-sm font-medium text-gray-700">{storyline.author.name}</span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-blue-600 font-semibold">
              <span>Khám phá</span>
              <ArrowRightIcon className="h-4 w-4" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default StorylineCard; 