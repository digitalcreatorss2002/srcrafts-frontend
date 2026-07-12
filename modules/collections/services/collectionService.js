// services/collectionService.js
import { fetchCollectionBySlug } from "../repositories/collectionRepo";
import { cacheLife, cacheTag } from 'next/cache';

export async function getCollectionDetail(slug) {
  'use cache';
  cacheLife('days'); // Store in memory for ultra-low latency

  const data = await fetchCollectionBySlug(slug);

  // Relational Tagging:
  // We tag this cache entry with the collection ID AND all product IDs inside it.
  const tags = [`collection-${slug}`];
  
  if (data.products && data.products.length > 0) {
    data.products.forEach(p => tags.push(`product-${p.slug}`));
  }

  if (data.parent_collection?.slug) {
    tags.push(`collection-${data.parent_collection.slug}`);
  }

  // Register tags so they can be invalidated individually
  tags.forEach(tag => cacheTag(tag));

  return data;
}