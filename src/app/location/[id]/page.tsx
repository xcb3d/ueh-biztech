'use client';

import { useParams } from 'next/navigation';
import { locations } from '@/data/locationData';
import { memories as allMemories } from '@/data/memoryData';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { notFound } from 'next/navigation';
import ChatBot from '@/components/ai/ChatBot';
import ModelViewer from '@/components/common/ModelViewer';
import ModernDetailPageLayout from '@/components/details/ModernDetailPageLayout';
import ModernSidebar from '@/components/details/ModernSidebar';
import LocationExtraInfo from '@/components/details/LocationExtraInfo';

export default function LocationDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const location = locations.find(loc => loc.id === id);
  
  if (!location) {
    notFound();
  }

  const relatedMemories = allMemories
    .filter(mem => mem.locationId === id)
    .map(mem => ({ id: mem.id, title: mem.title }));

  // Main content with markdown
  const mainContent = (
    <ReactMarkdown remarkPlugins={[remarkGfm]}>
      {location.articleContent}
    </ReactMarkdown>
  );

  // Extra Info component
  const extraInfoContent = (
    <LocationExtraInfo 
      coordinates={location.coordinates} 
      region={location.region}
      openingHours={location.openingHours}
      bestTimeToVisit={location.bestTimeToVisit}
      visitorTips={location.visitorTips}
    />
  );

  // 3D Model content (if available)
  const modelContent = location.modelPath ? (
    <div className="p-6">
      <ModelViewer modelPath={location.modelPath} />
    </div>
  ) : null;

  // Modern sidebar with summary, historical fact, and related memories
  const sidebarContent = (
    <ModernSidebar
      summary={location.summary}
      historicalFact={location.historicalFact}
      relatedMemories={relatedMemories}
      locationId={id}
    />
  );

  return (
    <>
      <ModernDetailPageLayout
        title={location.name}
        badge={location.region}
        heroImage={location.heroImage}
        mainContent={mainContent}
        modelContent={modelContent}
        sidebarContent={sidebarContent}
        extraInfoContent={extraInfoContent}
      />
      <ChatBot 
        entityType="location"
        entityId={id}
        entityName={location.name}
      />
    </>
  );
} 