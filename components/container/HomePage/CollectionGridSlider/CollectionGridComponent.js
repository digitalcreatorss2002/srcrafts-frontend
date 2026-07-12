"use client"
import React from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import CollectionSlider from '@/components/container/HomePage/CollectionGridSlider/CollectionSlider';
import DynamicGrid from '@/components/container/HomePage/CollectionGridSlider/DynamicGrid';
import Section from '../../genericContainer/Section';

const swiperConfig = {
  modules: [Navigation, Pagination],
  spaceBetween: 20,
  slidesPerView: 1.2,
  loop: true,
  navigation: true,
  pagination: { clickable: true },
  breakpoints: { 640: { slidesPerView: 2 }, 1024: { slidesPerView: 4 } },
};

/**
 * CollectionSlider Component.
 */
export default function CollectionGridComponent({ collections_component, title }) {
  const { product_collections } = collections_component || {};
  if (!product_collections || product_collections.length === 0 || product_collections.length === undefined)
    return (
    <Section>
        NO collection present...
    </Section>
  );
  else if (product_collections?.length<9){
    return(
        <Section>
        {title && <h2 className="text-3xl font-bold pt-4 text-brand-primary text-center">{title}</h2>}
        <div className="pb-4 rounded-xl ">
        <DynamicGrid product_collections={product_collections}/>
        </div>
        </Section>
    )
    
  }
  else{
    return(
        <Section >
        <h2 className="text-3xl font-bold pt-4 text-brand-primary text-center">{title}</h2>
        <div className="pb-4 pt-4 mx-4 rounded-xl ">
            <CollectionSlider product_collections = {product_collections}/>
        </div>
        </Section>
    )
  }
}