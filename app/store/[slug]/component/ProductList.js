"use client";
import { useState, useEffect, useRef } from "react";
import ProductCard from "@/components/ProductCard"; // Create a simple card UI

export default function ProductList({ initialProducts, initialHasMore, slug }) {
  const [products, setProducts] = useState(initialProducts);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loading, setLoading] = useState(false);
  
  const loaderRef = useRef(null);

  const fetchMoreProducts = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    const nextPage = page + 1;
    
    try {
      const res = await fetch(`/api/vendors/store/${slug}?page=${nextPage}&limit=8`);
      const data = await res.json();
      
      if (data.products.length > 0) {
        setProducts((prev) => [...prev, ...data.products]);
        setPage(nextPage);
        setHasMore(data.pagination.hasMore);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to load products", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchMoreProducts();
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore, page, loading]);

  return (
    <>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {/* Sentinel Element for Intersection Observer */}
      <div ref={loaderRef} className="py-10 text-center">
        {loading && <p className="animate-pulse text-gray-500">Loading more products...</p>}
        {!hasMore && <p className="text-gray-400">No more products to show.</p>}
      </div>
    </>
  );
}