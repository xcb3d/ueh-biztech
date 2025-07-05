'use client';

import { useParams } from 'next/navigation';
import { locations } from '@/data/locationData';
import { memories as allMemories } from '@/data/memoryData';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import DetailPageLayout from '@/components/details/DetailPageLayout';
import ChatBot from '@/components/ai/ChatBot';

export default function LocationDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const location = locations.find(loc => loc.id === id);
  
  if (!location) {
    // If no location is found, render the 404 page
    notFound();
  }

  const relatedMemories = allMemories.filter(mem => mem.locationId === id);

  const mainContent = (
    <ReactMarkdown remarkPlugins={[remarkGfm]}>
      {location.articleContent}
    </ReactMarkdown>
  );

  const sidebarContent = (
    <>
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 border-b pb-3 mb-4">Tóm tắt</h3>
        <p className="text-gray-600">{location.summary}</p>
      </div>
      
      <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 border-b pb-3 mb-4">Các ký ức liên quan ({relatedMemories.length})</h3>
        {relatedMemories.length > 0 ? (
          <Link href={`/#memory-feed-for-${id}`} className="text-blue-600 hover:underline">
            Xem trên Dòng chảy &rarr;
          </Link>
        ) : (
          <p className="text-sm text-gray-500">Chưa có ký ức nào được chia sẻ.</p>
        )}
      </div>
    </>
  );

  return (
    <>
      <DetailPageLayout
        title={location.name}
        badge={location.region}
        heroImage={location.heroImage}
        mainContent={mainContent}
        sidebarContent={sidebarContent}
      />
      <ChatBot 
        entityType="location"
        entityId={id}
        entityName={location.name}
      />
    </>
  );
} 