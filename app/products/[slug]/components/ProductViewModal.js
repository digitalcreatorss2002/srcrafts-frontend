"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { X, ChevronUp, ChevronDown } from 'lucide-react';
import { getImageUrl } from '@/utils/helperFunction';

export default function ProductViewModal({ isModalOpen, images = [], setIsModalOpen }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  // Sync scroll position of thumbnails when activeIndex changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      const activeThumbnail = scrollContainerRef.current.children[activeIndex];
      activeThumbnail?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [activeIndex]);

  if (!isModalOpen) return null;

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % images.length);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
      
      <div className="relative w-full h-full md:h-[90vh] md:w-[95vw] max-w-7xl flex flex-col md:flex-row bg-white md:rounded-3xl overflow-hidden shadow-2xl">
        
        {/* --- LEFT SIDE: THE THUMBNAIL RAIL --- */}
        <div className="hidden md:flex flex-col w-24 bg-slate-50 border-r border-slate-100 p-4">
          <button onClick={handlePrev} className="mb-2 p-1 hover:bg-slate-200 rounded-full transition-colors">
            <ChevronUp className="w-6 h-6 text-slate-400" />
          </button>
          
          <div 
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto space-y-4 scrollbar-hide py-2"
          >
            {images.map((src, i) => (
              <div 
                key={`thumb-${i}`}
                onClick={() => setActiveIndex(i)}
                className={`relative w-16 h-16 rounded-lg cursor-pointer transition-all duration-200 overflow-hidden border-2 
                  ${activeIndex === i ? 'border-brand-primary ring-2 ring-brand-primary/20 scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                <Image src={getImageUrl(src)} alt="thumb" fill className="object-cover" unoptimized />
              </div>
            ))}
          </div>

          <button onClick={handleNext} className="mt-2 p-1 hover:bg-slate-200 rounded-full transition-colors">
            <ChevronDown className="w-6 h-6 text-slate-400" />
          </button>
        </div>

        {/* --- CENTER: THE MAIN STAGE --- */}
        <div className="relative flex-1 bg-white flex items-center justify-center p-4 md:p-12">
          {/* Close Button */}
          <button 
            onClick={() => setIsModalOpen(false)} 
            className="absolute top-6 right-6 z-50 p-2 bg-slate-100 hover:bg-red-50 rounded-full transition-all"
          >
            <X className="w-6 h-6 text-slate-600" />
          </button>

          {/* Active Image */}
          <div className="relative w-full h-full animate-in slide-in-from-right-5 duration-500">
            <Image 
              src={getImageUrl(images[activeIndex])} 
              alt={`View ${activeIndex}`} 
              fill 
              className="object-contain" 
              unoptimized 
              priority
            />
          </div>

          {/* Navigation Overlay (Mobile/Desktop Arrows) */}
          <div className="absolute inset-x-4 flex justify-between pointer-events-none">
            <button onClick={handlePrev} className="pointer-events-auto p-3 bg-white/80 backdrop-blur rounded-full shadow-lg hover:bg-white transition-all active:scale-90">
              <ChevronUp className="w-6 h-6 -rotate-90 text-slate-900" />
            </button>
            <button onClick={handleNext} className="pointer-events-auto p-3 bg-white/80 backdrop-blur rounded-full shadow-lg hover:bg-white transition-all active:scale-90">
              <ChevronDown className="w-6 h-6 -rotate-90 text-slate-900" />
            </button>
          </div>
        </div>

        {/* --- MOBILE THUMBNAILS (Horizontal) --- */}
        <div className="md:hidden flex space-x-2 overflow-x-auto p-4 bg-slate-50 border-t border-slate-100">
          {images.map((src, i) => (
            <div 
              key={`mobile-thumb-${i}`}
              onClick={() => setActiveIndex(i)}
              className={`relative flex-shrink-0 w-16 h-16 rounded-md border-2 ${activeIndex === i ? 'border-brand-primary' : 'border-transparent'}`}
            >
              <Image src={getImageUrl(src)} alt="thumb" fill className="object-cover" unoptimized />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}