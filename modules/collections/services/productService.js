// services/productService.js
import { apiFetcher } from '@/lib/fetcher';
import { cacheLife, cacheTag } from 'next/cache';


export async function getProducts(slug, filters = {}, page = 1) {
    const query = new URLSearchParams({
      pageNumber: page,
      ...filters // Spread all filters like min_price, search etc.
    }).toString();
  
    const res = await apiFetcher(`/api/products/collection/${slug}?${query}`);
  
    // Edge Case 1 & 2: Agar products nahi mile
    if (data.products.length === 0) {
      // Search similar products in the same category or general search
      const fallbackRes = await apiFetcher(`${process.env.NEXT_PUBLIC_API_URL}/api/products/search?limit=4`);
      return { ...data, products: [], recommendations: fallbackRes.products, isFallback: true };
    }
  
    return { ...res, isFallback: false };
  }


// src/services/productService.js

/**
 * Why: Centralized service for product fetching with Next.js 16 caching.
 * SOLID: Single Responsibility (Data Fetching + Cache Management).
 */
export async function getProductsCached(slug, filters, page = 1) {
  'use cache'; // Opt-in to Next.js 16 caching
  cacheLife('days'); // Store for long-term (0ms latency on hit)

  // 1. URL Query build karein (same as your backend expectations)
  const queryParams = new URLSearchParams({
    pageNumber: page,
    ...filters,
  }).toString();

  const url = `/api/products/collection/${slug}?${queryParams}`;

  try {
    const res = await apiFetcher(url, {
        method:'GET',
      headers: {
        'Authorization': `Bearer ${process.env.INTERNAL_API_TOKEN}`,
      },
    });

    return res;
  } catch (error) {
    console.error("Fetch Error in getProductsCached:", error);
    return { products: [], pages: 0, count: 0, error: true };
  }
}