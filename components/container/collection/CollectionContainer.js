  "use client" 
  import React, { useEffect } from 'react';
  import {  useDispatch, useSelector } from 'react-redux';
  import { fetchCollectionsRequest } from '@/redux/collections/collectionSlice';
  import Image from 'next/image';
  import Link from 'next/link';
  import { getImageUrl } from '@/utils/helperFunction'; 
import InfinityLoader from '@/components/InfinityLoader';


  const collections = [
    {
      id: 'cushion-covers',
      name: 'Cushion Covers',
      imageUrl: '/images/cushion-covers.jpg', // Replace with your actual image path
      link: '/collections/cushion-covers',
      isLarge: true, //
    },
    {
      id: 'home-decor',
      name: 'Home Decor',
      imageUrl: '/images/home-decor.jpg', // Replace with your actual image path
      link: '/collections/home-decor',
      isLarge: false,
    },
    {
      id: 'bedsheets',
      name: 'Bedsheets',
      imageUrl: '/images/bedsheets.jpg', // Replace with your actual image path
      link: '/collections/bedsheets',
      isLarge: false,
    },
    {
      id: 'floor-coverings',
      name: 'Floor Coverings',
      imageUrl: '/images/floor-coverings.jpg', // Replace with your actual image path
      link: '/collections/floor-coverings',
      isLarge: false,
    },
  ];


  // Individual Collection Card Component (reusable)
  const CollectionCard = ({ collection }) => (
    <Link href={collection.link} className="block group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <div className="relative w-full h-full">
        <Image
          src={collection.imageUrl}
          alt={collection.name}
          layout="fill"
          objectFit="cover"
          className="transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
          // If your images are from external sources or not optimized, use unoptimized={true}
          // For local images, Next.js Image component handles optimization by default.
          unoptimized={true} 
        />
  
        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300"></div>
        <h3 className="absolute bottom-4 left-4 text-white text-lg sm:text-xl font-semibold z-10">
          {collection.name}
          hello
        </h3>
      </div>
    </Link>
  );


  export default function CollectionContainer() {
    const dispatch = useDispatch();
    const { collections: collectionData, loading, error } = useSelector((state)=>(state.collections))
    useEffect(()=>{
      dispatch(fetchCollectionsRequest());
    },[dispatch]);

    useEffect(() => {
      if (collectionData) { // Check if data is populated
          console.log('Collections Data:', collectionData);
      }
  }, [collectionData]);

    return (
      <section className="container mx-auto px-4 py-12">
        {/* Section Title */}
        <h2 className="text-center text-4xl font-serif text-rose-800 mb-10 tracking-wide">
          Celebrate The New Beginning
        </h2>
      {/* <InfinityLoader/> */}
        {/* Main Grid Layout */}
        <div classNam="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Large Collection Item (Cushion Covers) - Takes full height on md, 2 columns on lg */}
          <div className="
            md:col-span-1 
            lg:col-span-2 
            row-span-2 
            min-h-[400px] 
            md:min-h-0 
            h-full 
            max-h-[700px] 
            relative
          ">
            {/* <CollectionCard collection={collections.find(c => c.id === 'cushion-covers')} /> */}
          </div>

          {/* Smaller Collection Items Grid */}
          <div className="
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-1 
            lg:grid-cols-2 
            gap-6 
            md:col-span-1 
            lg:col-span-1
          ">
            {collections.filter(c => !c.isLarge).map((collection) => (
              <div key={collection.id} className="min-h-[200px] sm:min-h-[250px] relative">
                <CollectionCard collection={collection} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }