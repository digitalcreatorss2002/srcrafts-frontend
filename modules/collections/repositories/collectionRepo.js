// repositories/collectionRepo.js
import { apiFetcher } from "@/lib/fetcher";
export async function fetchCollectionBySlug(slug) {
    const response = await apiFetcher(`/api/products/collection/${slug}`, {
        method:'GET',
      
    });
  
  
    return response
  }