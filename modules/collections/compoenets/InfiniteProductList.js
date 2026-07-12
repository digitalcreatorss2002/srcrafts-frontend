"use client";
import { useState, useEffect, useRef } from "react";
import { fetchProducts} from '@/app/collections/[slug]/action'
import ProductCard from "@/components/ProductCard";
import Section from "@/components/container/genericContainer/Section";

export default function InfiniteProductList({ initialData, slug, currentFilters, isBulkOrder }) {
  const [products, setProducts] = useState(initialData?.products || []);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialData?.page < initialData?.pages);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const observerTarget = useRef(null);

  useEffect(() => { setMounted(true); }, []);

  // Sync state when filters change (Server sends new initialData)
  useEffect(() => {
    if (mounted) {
      setProducts(initialData?.products || []);
      setPage(1);
      setHasMore(initialData?.page < initialData?.pages);
    }
  }, [initialData, mounted]);

  useEffect(() => {
    if (!mounted) return;

    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setLoading(true);
          const nextPage = page + 1;
          const data = await fetchProducts(slug, currentFilters, nextPage);
          
          if (data?.products) {
            setProducts((prev) => [...prev, ...data.products]);
            setPage(nextPage);
            setHasMore(nextPage < data.pages);
          }
          setLoading(false);
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) observer.observe(observerTarget.current);
    return () => observer.disconnect();
  }, [hasMore, page, loading, slug, currentFilters, mounted]);

  if (!mounted) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {initialData?.products?.map((p) => <ProductCard key={p._id} product={p} isBulkOrder={isBulkOrder}/>)}
      </div>
    );
  }

  return (
    <Section className="w-full py-0">
      {products.length === 0 ? (
        <div className="text-center py-10">
          <h2 className="text-xl font-bold">No results found.</h2>
          {initialData?.recommendations?.length > 0 && (
            <div className="mt-8">
              <p className="mb-4 text-gray-500">Check these out instead:</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {initialData.recommendations.map(p => <ProductCard key={p._id} product={p} />)}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((p) => <ProductCard key={p._id} product={p} />)}
        </div>
      )}

      <div ref={observerTarget} className="h-20 flex justify-center items-center">
        {loading && <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>}
      </div>
    </Section>
  );
}