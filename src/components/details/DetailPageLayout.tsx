'use client';

import Image from 'next/image';
import React from 'react';

interface DetailPageLayoutProps {
  title: string;
  badge?: string; // Optional badge like region or category
  heroImage: string;
  mainContent: React.ReactNode;
  sidebarContent: React.ReactNode;
}

const DetailPageLayout: React.FC<DetailPageLayoutProps> = ({
  title,
  badge,
  heroImage,
  mainContent,
  sidebarContent,
}) => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={heroImage}
              alt={`Hình ảnh của ${title}`}
              layout="fill"
              objectFit="cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              {badge && (
                <span className="px-3 py-1 text-sm font-semibold text-white bg-purple-500 rounded-full">{badge}</span>
              )}
              <h1 className="text-5xl font-extrabold text-white mt-2 drop-shadow-lg">{title}</h1>
            </div>
          </div>
        </header>
        
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-lg">
            <article className="prose prose-lg max-w-none prose-h2:text-3xl prose-h2:font-bold prose-h3:text-2xl prose-h3:font-semibold prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-img:rounded-lg">
              {mainContent}
            </article>
          </div>
          
          <aside className="lg:col-span-1">
            <div className="sticky top-8">
              {sidebarContent}
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
};

export default DetailPageLayout; 