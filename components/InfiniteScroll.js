"use client"

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { fetchNextProducts } from '@/lib/actions';
import { current } from '@reduxjs/toolkit';
// A wrapper to display products

export default function InfiniteScroll({initialProducts, initialPage, initialHasMore}){
    const [error, setError] = useState(null)
    const [products, setProducts] = useState(initialProducts);
    const [page, setPage] = useState(initialPage);
    const [hasMore, setHasMore] = useState(initialHasMore);
    const [isLoading, setIsLoading] = useState(false);
    const loaderRef = useRef(null);

    const loadMoreProducts = useCallback(async () => {
        if (isLoading || !hasMore) return;

        setIsLoading(true);
        setError(null);
        const nextPage = page + 1;

        try{
            const {products: newProducts, hasMore: newHasMore} = await fetchNextProducts(nextPage);
            setProducts((prev)=>[...prev, ...newProducts]);
            setPage(nextPage);
            setHasMore(newHasMore);
        }
        catch(error)
        {
            console.error(`Error loading products:`, error);
        } finally {
            setIsLoading(false);
        }
    },[isLoading, hasMore, page]);

    useEffect(()=>{
        const observer = new IntersectionObserver((entries)=>{
            if(entries[0].isIntersecting && hasMore && !isLoading){
                loadMoreProducts();
            }
        },{
            rootMargin:`200px`,
        });

        if(loaderRef.current){
            observer.observe(loaderRef.current);
        }
        return ()=>{
            if(loaderRef.current){
                observer.unobserver(loaderRef,current);
            }
        }
    },[loadMoreProducts, hasMore, isLoading]);

    return (
        <div className="product-list-container">
          {/* ProductGrid Component renders the list */}
          <ProductGrid>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ProductGrid>
    
          {/* INFINITE SCROLL LOADER/TRIGGER */}
          <div ref={loaderRef} className="text-center py-8">
            {isLoading && <p>Loading more products...</p>}
            {!hasMore && products.length > initialProducts.length && <p>You've reached the end of the catalog.</p>}
          </div>
        </div>
      );
}
