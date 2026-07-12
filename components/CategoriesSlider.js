"use client"
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

function CategoriesSlider() {

    // -------------------Categories Image-------------------
const categories = [
  { name: "Handicraft Items", image: "/categories/HandiCraft.jpg" },
  { name: "Water Fountains", image: "/categories/waterFoundation.jpg" },
  { name: "Buddha Idols", image: "/categories/buddha-idols.jpg" },
  { name: "Pendulum Clocks", image: "/categories/clocks.jpg" },
  { name: "Wall Hangings", image: "/categories/hangings.jpg" },
  { name: "Couple Statues", image: "/categories/couple-statue.jpg" },
  { name: "Buddha Paintings", image: "/categories/buddha-painting.jpg" },
  
  ];

  return (
    <div>
      <section className="py-12 bg-white">
        <div className="max-w-8xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-center mb-10">
            Explore Our Categories
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 justify-items-center">
            {categories.map((cat, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden shadow-md transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="mt-3 text-sm sm:text-base font-medium text-gray-700 group-hover:text-red-700 transition-colors">
                  {cat.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default CategoriesSlider
