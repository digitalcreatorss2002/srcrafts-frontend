// repositories/collectionRepo.js
import { apiFetcher } from "@/lib/fetcher";
export async function fetchCategoryBySlug(slug) {
    const response = await apiFetcher(`/api/products/categories/${slug}`, {
        method:'GET',
      
    });
  
  
    return response
  }