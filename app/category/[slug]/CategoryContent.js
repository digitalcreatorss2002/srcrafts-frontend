// app/category/[slug]/CategoryContent.js
import { getProductsCached } from '@/modules/categorys/services/productService';
import FilterSidebar from '@/modules/categorys/compoenets/FilterSlidebar';
import InfiniteProductList from '@/modules/categorys/compoenets/InfiniteProductList';
import Link from 'next/link';
import Section from '@/components/container/genericContainer/Section'; 

export default async function CategoryContent({ promiseParams, promiseFilters }) {
  // 1. Await dynamic data INSIDE the suspense boundary
  const { slug } = await promiseParams;
  const filters = await promiseFilters;

  // 2. Initial Fetch using the Service
  const initialData = await getProductsCached(slug, filters, 1);

  const collectionName = initialData?.product_category?.name || 'Category';

  return (
    <div className='px-3 sm:px-6 py-4 max-w-7xl mx-auto'>
      <div className="flex flex-col md:flex-row gap-4 lg:gap-6">
        
        {/* === Filter Component (Drawer on Mobile, Sticky Sidebar on Desktop) === */}
        <div className="w-full md:w-64 lg:w-72 shrink-0">
          <FilterSidebar slug={slug} currentFilters={filters} />
        </div>
        
        {/* === Product List: Infinite Scroll === */}
        <div className="flex-1 min-w-0">
          <Section>
            <nav className="text-xs sm:text-sm font-medium text-gray-500 mb-2 sm:mb-4">
              <Link href="/" className="hover:text-gray-700 transition">Home</Link> 
              <span className="mx-2">/</span> 
              <span className="text-gray-700 font-semibold">{collectionName}</span>
            </nav>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4">{collectionName}</h1>
          </Section>
          <InfiniteProductList 
            initialData={initialData} 
            slug={slug} 
            currentFilters={filters} 
          />
        </div>
        
      </div>
    </div>
  );
}