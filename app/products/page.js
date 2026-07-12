2// app/collections/[slug]/page.js
import { Suspense } from 'react';
import ProductContent from './ProductContent';
import { CollectionSkeleton } from '@/components/Skeletons';

// Note: Humne params/searchParams ko yahan await nahi kiya
export default function Page({ params, searchParams }) {
  return (
    <>
      {/* Dynamic Content: Iske andar await hoga */}
      <Suspense fallback={<CollectionSkeleton />}>
        <ProductContent promiseParams={params} promiseFilters={searchParams} />
      </Suspense>
    </>
  );
}