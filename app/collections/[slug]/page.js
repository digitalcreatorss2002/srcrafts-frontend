// app/collections/[slug]/page.js
import { Suspense } from 'react';
import CollectionContent from './CollectionContent'; 
import { CollectionSkeleton } from '@/components/Skeletons';

// Note: Humne params/searchParams ko yahan await nahi kiya
export default function Page({ params, searchParams }) {
  return (
    <>
      {/* Dynamic Content: Iske andar await hoga */}
      <Suspense fallback={<CollectionSkeleton />}>
        <CollectionContent promiseParams={params} promiseFilters={searchParams} />
      </Suspense>
    </>
  );
}