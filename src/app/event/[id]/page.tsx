'use client';

import { useParams, notFound } from 'next/navigation';
import { events } from '@/data/eventData';
import { locations } from '@/data/locationData';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import Link from 'next/link';
import ChatBot from '@/components/ai/ChatBot';

export default function EventDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const event = events.find(evt => evt.id === id);
  
  if (!event) {
    notFound();
  }

  const location = locations.find(loc => loc.id === event.locationId);

  return (
    <>
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">

          {/* Header Section */}
          <header className="mb-8">
            <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={event.heroImage}
                alt={`Hình ảnh của ${event.name}`}
                layout="fill"
                objectFit="cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8">
                <span className="px-3 py-1 text-sm font-semibold text-white bg-yellow-500 rounded-full">Sự kiện</span>
                <h1 className="text-5xl font-extrabold text-white mt-2 drop-shadow-lg">{event.name}</h1>
                {location && (
                   <p className="text-xl font-medium text-white/90 mt-2">
                      Tại: <Link href={`/location/${location.id}`} className="hover:underline">{location.name}</Link>
                   </p>
                )}
              </div>
            </div>
          </header>
          
          <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Article Content */}
            <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-lg">
              <article className="prose prose-lg max-w-none prose-h2:text-3xl prose-h2:font-bold prose-h3:text-2xl prose-h3:font-semibold prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-img:rounded-lg">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {event.articleContent}
                </ReactMarkdown>
              </article>
            </div>

            {/* Sidebar for Related Info */}
            <aside className="lg:col-span-1">
              <div className="sticky top-8">
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                      <h3 className="text-xl font-bold text-gray-800 border-b pb-3 mb-4">Thông tin sự kiện</h3>
                      <ul className="text-gray-600 space-y-2">
                        <li><strong>Bắt đầu:</strong> {new Date(event.startTime).toLocaleString('vi-VN')}</li>
                        <li><strong>Kết thúc:</strong> {new Date(event.endTime).toLocaleString('vi-VN')}</li>
                        {location && (
                          <li><strong>Địa điểm:</strong> <Link href={`/location/${location.id}`} className="text-blue-600 hover:underline">{location.name}</Link></li>
                        )}
                      </ul>
                  </div>
                  
                  <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
                      <h3 className="text-xl font-bold text-gray-800 border-b pb-3 mb-4">Tóm tắt</h3>
                      <p className="text-gray-600">{event.summary}</p>
                  </div>
              </div>
            </aside>
          </main>
        </div>
      </div>
      <ChatBot 
        entityType="event"
        entityId={id}
        entityName={event.name}
      />
    </>
  );
} 