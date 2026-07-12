// components/CategoriesSlider.js
"use client";
import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules"; // Only import modules you use
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { getImageUrl } from '@/utils/helperFunction';


// This component is OPEN to different category data (OCP) but CLOSED to data fetching changes (DIP).
// SRP: Solely responsible for rendering the interactive slider UI.
export default function CategoriesSlider({ categories }) { 

    if (!categories || categories.length === 0) {
        return <div className="text-center p-8">No categories available to display.</div>;
    }

    return (
        // The section wrapper is moved to the Server Component (Wrapper) to keep this clean
        <Swiper
            // Modules are necessary for the slider functionality
            modules={[Autoplay, Navigation]} 
            spaceBetween={20}
            slidesPerView={2}
            autoplay={{ delay: 4000, disableOnInteraction: true }}
            loop={categories.length > 5} // Loop only if enough slides exist
            
            // Responsive Breakpoints for Grid/Slider Layout (ISP - only loads the necessary UI logic)
            breakpoints={{
                640: { slidesPerView: 3, spaceBetween: 30 },
                768: { slidesPerView: 5, spaceBetween: 30 },
                1024: { slidesPerView: 7, spaceBetween: 30 },
            }}
            className="mySwiper categories-slider"
        >
            {categories.map((cat, index) => (
                <SwiperSlide key={cat.id}>
                    <a
                        href={cat.link} // Use the pre-calculated link
                        className="flex flex-col items-center text-center group cursor-pointer"
                    >
                        <div className="relative w-32 h-32 sm:w-36 sm:h-36  rounded-full overflow-hidden shadow-md transition-transform duration-300 group-hover:scale-105 flex items-center justify-center">
                            <Image
                                // Use the dynamic image and slug properties from the prop
                                src={getImageUrl(cat.image)} 
                                alt={cat.name}
                                width={100}
                                height={100}
                                className="object-cover"
                                unoptimized={true}
                            />
                        </div>
                        <p className="mt-3 text-sm sm:text-base font-medium text-gray-700 group-hover:text-red-700 transition-colors">
                            {cat.name}
                        </p>
                    </a>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}