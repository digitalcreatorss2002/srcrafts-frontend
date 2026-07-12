"use client"
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, FreeMode } from 'swiper/modules';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getImageUrl } from '@/utils/helperFunction';

import 'swiper/css';
import 'swiper/css/free-mode';

const swiperConfig = {
  // 1. Add FreeMode for better touch "flick" feel
  modules: [Navigation, Autoplay, FreeMode],
  spaceBetween: 16, // Tighter spacing on mobile is more professional
  slidesPerView: 1.3, 
  centeredSlides: false,
  grabCursor: true, // Shows hand icon on desktop, improves touch feel
  
  // 2. Critical for Phone Sensitivity
  touchEventsTarget: 'container',
  touchRatio: 1.5, // Makes the slider move further with less finger effort
  resistanceRatio: 0.85, // Better "rubber band" effect at ends
  slideToClickedSlide: true,
  
  // 3. Prevent interfering with vertical page scroll
  touchStartPreventDefault: false, 
  
  speed: 600,
  autoplay: {
    delay: 5000,
    pauseOnMouseEnter: true,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: '.swiper-button-next-custom',
    prevEl: '.swiper-button-prev-custom',
  },
  breakpoints: {
    640: { slidesPerView: 2.2, spaceBetween: 20 },
    1024: { slidesPerView: 3.5, spaceBetween: 24 },
    1280: { slidesPerView: 4, spaceBetween: 24 }
  },
};

export default function CollectionSlider({ product_collections }) {
  if (!product_collections?.length) return null;

  return (
    <div className="relative group w-full overflow-hidden sm:overflow-visible px-4">
      {/* Note: removed 'overflow-hidden' from Swiper and put it on parent 
          to allow shadows and scales to breathe 
      */}
      <Swiper {...swiperConfig} className="!overflow-visible py-4">
        {product_collections.map((collection) => (
          <SwiperSlide key={collection.collection_id || collection.slug}>
            <Link 
              href={`/collections/${collection.slug}`}
              // Added touch-action: pan-y to allow vertical page scrolling
              className="block group/card relative aspect-square rounded-md overflow-hidden bg-gray-100 transition-all duration-500 active:scale-95 touch-action-pan-y"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${getImageUrl(collection.image)})` }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="text-lg md:text-xl font-medium text-white tracking-tight">
                  {collection.name}
                </h3>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Hide navigation on touch devices (they use fingers!) */}
      <div className="hidden md:block">
        <button className="swiper-button-prev-custom absolute left-2 top-1/2 -translate-y-1/2 z-30 w-11 h-11 bg-white/90 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center text-brand-primary transition-all opacity-0 group-hover:opacity-100 hover:bg-brand-primary hover:text-white disabled:opacity-0">
          <ChevronLeft size={22} />
        </button>
        <button className="swiper-button-next-custom absolute right-2 top-1/2 -translate-y-1/2 z-30 w-11 h-11 bg-white/90 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center text-brand-primary transition-all opacity-0 group-hover:opacity-100 hover:bg-brand-primary hover:text-white disabled:opacity-0">
          <ChevronRight size={22} />
        </button>
      </div>

      <style jsx global>{`
        .swiper-button-disabled {
          opacity: 0 !important;
          cursor: default;
        }
      `}</style>
    </div>
  );
}