'use client';

import { getImageUrl } from '@/utils/helperFunction';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

/**
 * CollectionCard: Premium Bento/Slider item
 * Prioritizes high-end typography and subtle motion.
 */
export default function CollectionCard({ collection, gridClasses }) {
  const { name, image, slug } = collection;
  
  return (
    <Link 
      href={`/collections/${slug}`}
      className={`
        group relative block overflow-hidden rounded-md
        border border-white/10 bg-gray-100
        transition-all duration-500 ease-out
        hover:shadow-xl active:scale-[0.98]
        ${gridClasses}
      `}
    >
      {/* 1. Background Image with subtle zoom */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-110"
        style={{ backgroundImage: `url(${getImageUrl(image)})` }}
        role="img"
        aria-label={name}
      />

      {/* 2. Professional Gradient Overlay (Clearer Image) */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

      {/* 3. Content Area */}
      <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end">
        <div className="relative">
          {/* Accent Line - Brand Identity */}
          <div className="w-6 h-1px bg-brand-secondary mb-3 transition-all duration-500 group-hover:w-12" />
          
          <h3 className="text-sm md:text-2xl font-medium text-white tracking-tight leading-tight uppercase">
            {name}
          </h3>
          
          {/* Animated "Explore" reveal */}
          <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out">
            <div className="overflow-hidden">
              <p className="pt-2 text-[10px] font-bold text-brand-secondary uppercase tracking-[0.2em] flex items-center gap-1">
                Explore Collection
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Functional Detail: Top-Right Icon */}
      <div className="absolute top-4 right-4 text-white/40 group-hover:text-brand-secondary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300">
        <ArrowUpRight size={20} strokeWidth={1.2} />
      </div>

      {/* 5. Glassy Inner Border */}
      <div className="absolute inset-0 border border-white/5 rounded-md pointer-events-none group-hover:border-white/20 transition-all duration-500" />
    </Link>
  );
}