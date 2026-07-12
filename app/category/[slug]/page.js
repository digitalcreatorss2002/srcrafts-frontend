// app/collections/[slug]/page.js
import { Suspense } from 'react';
import CategoryContent from './CategoryContent'; 
import { CollectionSkeleton } from '@/components/Skeletons';

export default function Page({ params, searchParams }) {
  return (
    <>
      <Suspense fallback={<CollectionSkeleton />}>
        <CategoryContent promiseParams={params} promiseFilters={searchParams} />
      </Suspense>
    </>
  );
}