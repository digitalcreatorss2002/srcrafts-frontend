"use client"
import dynamic from 'next/dynamic';
import BannerSlide from './BannerSlide';
import Section from '../../genericContainer/Section';

const SwiperContainer = dynamic(() => import('./SwiperWrapper'), {
  ssr: false,
  loading: ({ slides }) => <BannerPlaceholder slide={slides?.[0]} />
});

function BannerPlaceholder({ slide }) {
  return (
    <div className="w-full h-[80vh] md:h-[83vh] bg-gray-900">
      {slide && <BannerSlide slide={slide} isPriority={true} />}
    </div>
  );
}
      
export default function Banner({ data, title, description }) {
  if (!data?.length) return null;

  // Propagate parent title and description to slides if they don't have individual text
  const slidesWithMetadata = data.map(slide => ({
    ...slide,
    title: slide.title || title,
    description: slide.description || description
  }));

  return (
    <div className="w-full h-[40vh] md:h-[83vh] overflow-hidden">
      <SwiperContainer slides={slidesWithMetadata} />
    </div>
  );
}