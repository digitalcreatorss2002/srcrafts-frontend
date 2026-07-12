// src/app/products/[slug]/page.jsx

import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import ProductSkeleton from '@/components/Skeletons'; 
import { getProductBySlug } from '@/modules/products/services/productServices'; 
import ProductContent from './components/ProductContent';
/**
 * Scalability: Absolute URL handling for SEO
 */
export async function generateMetadata({ params }) {
  const { slug } = await params; 
  
  try {
    const data = await getProductBySlug(slug);
    if (!data?.product) return { title: 'Product Not Found' };

    const { product } = data;

    return {
      title: `${product.meta_title || product.name} | MyStore`,
      description: product.meta_description || `Buy ${product.name} at best prices.`,
      openGraph: {
        title: product.name,
        images: [
          {
            url: product.media?.[0] || '/default-product-share.jpg',
            width: 800,
            height: 600,
          },
        ],
      },
    };
  } catch (error) {
    return { title: 'Product Details' };
  }
}



/**
 * 3. 🏁 ProductPage (Main Export)
 */
export default async function ProductPage({ params }) {

  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ProductContent params={params} />
    </Suspense>
  );
}