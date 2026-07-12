// services/collectionService.js
import { fetchCategoryBySlug } from "../repositories/categoryRepo";
import { cacheLife, cacheTag } from 'next/cache';

export async function getCategoryDetail(slug) {
  'use cache';
  cacheLife('days'); // Store in memory for ultra-low latency

  const data = await fetchCategoryBySlug(slug);

  // Relational Tagging:
  // We tag this cache entry with the collection ID AND all product IDs inside it.
  const tags = [`category-${slug}`];
  
  if (data.products && data.products.length > 0) {
    data.products.forEach(p => tags.push(`product-${p.slug}`));
  }

  if (data.parent_category?.slug) {
    tags.push(`category-${data.parent_collection.slug}`);
  }

  // Register tags so they can be invalidated individually
  tags.forEach(tag => cacheTag(tag));

  return data;
}