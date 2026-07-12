"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import BannerSlide from "./BannerSlide";

import "swiper/css";
import "swiper/css/pagination";

export default function SwiperWrapper({ slides }) {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      slidesPerView={1}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      className="w-full h-full"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={slide._id}>
          <BannerSlide slide={slide} isPriority={index === 0} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}