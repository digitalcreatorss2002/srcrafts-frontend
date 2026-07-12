


import React from 'react'
import FilterSidebar from '@/modules/collections/compoenets/FilterSlidebar';
import InfiniteProductList from '@/modules/collections/compoenets/InfiniteProductList';
import Link from 'next/link';
import Section from '@/components/container/genericContainer/Section'; 

export default function StaticCollection({filters,initialData,slug}) {

    const collectionName = initialData?.product_collection?.name || 'Collection';
    console.log(collectionName);
    return (
        <div className='px-2  '>
          
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 md:gap-2 ">
            
            {/* === Sidebar: Filters (1/4 or 1/5 width) === */}
            <div className="md:col-span-1 my-2 ">
              <div className="sticky top-12 h-[calc(100vh-6rem)] overflow-y-auto">
                <FilterSidebar slug={slug} currentFilters={filters} />
              </div>
            </div>
            
            {/* === Product List: Infinite Scroll (3/4 or 4/5 width) === */}
            <div className="md:col-span-3 lg:col-span-4">
              <Section >
              <nav className="text-sm font-medium text-gray-500 mb-4">
                <Link href="/" className="hover:text-gray-700 transition">Home</Link> 
                <span className="mx-2">/</span> 
                <span className="text-gray-700 font-semibold">{collectionName}</span>
              </nav>
              <h1 className="text-3xl font-extrabold text-gray-900">{collectionName}</h1>
              </Section>
              <InfiniteProductList 
                initialData={initialData} 
                slug={slug} 
                currentFilters={filters} 
              />
            </div>
            
          </div>
        </div>
    );
    
}
