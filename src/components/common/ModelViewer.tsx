'use client';

import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, useProgress, Html, Stars, ContactShadows } from '@react-three/drei';
import { Suspense, useState } from 'react';
import { FaExpand, FaCompress } from 'react-icons/fa';

interface ModelViewerProps {
  modelPath: string;
}

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center">
        <div className="w-20 h-20 border-4 border-neutral-200 border-t-black rounded-full animate-spin mb-4"></div>
        <p className="text-neutral-800 font-medium">{progress.toFixed(0)}% tải xong</p>
      </div>
    </Html>
  );
}

function Model({ modelPath }: { modelPath: string }) {
  const { scene } = useGLTF(modelPath);
  
  return <primitive object={scene} scale={0.4} position={[0, -1, 0]} />;
}

export default function ModelViewer({ modelPath }: ModelViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={`relative rounded-lg overflow-hidden transition-all duration-500 ${isFullscreen ? 'fixed inset-0 z-50 rounded-none' : 'w-full h-[550px]'}`}>
      {/* Header with title */}
      <div className="bg-gradient-to-r from-neutral-50 to-neutral-100 p-4 border-b border-neutral-100">
        <h2 className="text-2xl font-bold text-neutral-800">Khám phá không gian 3D</h2>
        <p className="text-neutral-500 text-sm mt-1">Kéo để xoay, lăn chuột để phóng to/thu nhỏ</p>
      </div>
      
      {/* Fullscreen toggle button */}
      <button 
        onClick={toggleFullscreen}
        className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
        aria-label={isFullscreen ? "Thoát toàn màn hình" : "Xem toàn màn hình"}
      >
        {isFullscreen ? <FaCompress size={16} /> : <FaExpand size={16} />}
      </button>

      <Canvas 
        camera={{ position: [0, 2, 5], fov: 25 }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#f8f8f8']} />
        
        {/* Improved lighting */}
        <ambientLight intensity={0.6} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={0.5} />
        <directionalLight position={[0, 10, 0]} intensity={1} />
        
        <Suspense fallback={<Loader />}>
          <Model modelPath={modelPath} />
          
          {/* Add subtle stars in background for aesthetic */}
          <Stars radius={100} depth={50} count={1000} factor={4} fade speed={1} />
          
          {/* Add shadow beneath model */}
          <ContactShadows 
            position={[0, -1.5, 0]} 
            opacity={0.4} 
            scale={10} 
            blur={2} 
            far={4} 
            resolution={256} 
          />
          
          <OrbitControls 
            autoRotate
            autoRotateSpeed={0.5}
            enableZoom={true}
            enablePan={false}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI - Math.PI / 6}
            makeDefault
          />
        </Suspense>
      </Canvas>
      
      {/* Overlay instructions when in fullscreen */}
      {isFullscreen && (
        <div className="absolute bottom-4 left-4 bg-black/50 text-white text-sm p-3 rounded-lg">
          <p>Kéo: Xoay | Cuộn: Phóng to/thu nhỏ | ESC: Thoát</p>
        </div>
      )}
    </div>
  );
} 