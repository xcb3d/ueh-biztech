'use client';

import React from 'react';
import Head from 'next/head';
import MomentMapContainer from '@/components/map/MomentMapContainer';

const MapPage = () => {
  return (
    <>
      <Head>
        <title>Bản đồ Khoảnh khắc | UEH BizTech</title>
        <meta name="description" content="Khám phá Việt Nam qua những khoảnh khắc được cộng đồng chia sẻ." />
      </Head>
      <div className="h-[calc(100vh-64px)] overflow-hidden">
        <MomentMapContainer />
      </div>
    </>
  );
};

export default MapPage; 