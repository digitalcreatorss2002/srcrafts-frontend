// app/collections/[slug]/actions.js
'use server';
import { getProducts, getProductsCached } from "@/modules/collections/services/productService";

export async function fetchMoreProducts(slug, filters, page) {
  // Client component calls this server function
  try {
    const data = await getProductsCached(slug, filters, page);
    return data;
  } catch (error) {
    return { products: [], pages: 0, error: true };
  }
}


export async function fetchProducts(slug,filters,page){
  try {
    const data =await getProducts(slug, filters, page);
  } catch (error) {
    
  }
}
