"use client";

import React from 'react';
import ProductCard from "@/components/ProductCard";

// Helper for Skeleton (SOLID: Separation of Concerns)
const ProductSkeleton = () => (
  <div className="w-full animate-pulse flex flex-col gap-4">
    <div className="aspect-[4/5] w-full bg-slate-200 rounded-2xl" />
    <div className="space-y-2">
      <div className="h-4 w-1/3 bg-slate-200 rounded" />
      <div className="h-6 w-full bg-slate-200 rounded" />
      <div className="h-6 w-1/2 bg-slate-200 rounded" />
    </div>
  </div>
);

export default function ProductGrid({ products, isLoading = false }) {
  // Empty State: Improved UX with a call to action
  if (!isLoading && (!products || products.length === 0)) {
    return (
      <div className="container py-20">
        <div className="flex flex-col items-center justify-center text-center p-12 bg-slate-50 rounded-3xl border border-slate-100">
          <div className="mb-4 text-slate-300">
             {/* Simple SVG Icon or Lucide Icon for "Empty" */}
             <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
             </svg>
          </div>
          <p className="text-brand-primary text-xl font-semibold tracking-tight">
            No products found.
          </p>
          <p className="text-slate-500 text-sm mt-1">
            Try adjusting your filters or check back later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="container mx-auto max-w-7xl py-6">
      {/* Grid Logic: 
         - 2 cols on mobile (standard E-comm)
         - Optimized gaps for touch targets
         - grid-auto-rows-[1fr] ensures cards have equal height 
      */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-3 gap-y-8 sm:gap-x-6 sm:gap-y-10">
        {isLoading 
          ? Array.from({ length: 10 }).map((_, i) => <ProductSkeleton key={i} />)
          : products.map((product,index) => (
                <ProductCard product={product} key={index} />
            ))
        }
      </div>
    </section>
  );
}