'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Heart, Trash2, ShoppingCart, ArrowLeft, ArrowRight } from 'lucide-react';
import {
  selectWishlistItems,
  removeFromWishlist,
  syncWishlistFromStorage,
} from '@/redux/wishlist/wishlistSlice';
import { addToCart } from '@/redux/cart/cartSlice';
import { getImageUrl, formatPrice } from '@/utils/helperFunction';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import Image from 'next/image';
import Section from '@/components/container/genericContainer/Section';

export default function WishlistPage() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(selectWishlistItems);

  // Sync wishlist from localStorage on mount
  useEffect(() => {
    dispatch(syncWishlistFromStorage());
  }, [dispatch]);

  const handleRemove = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(removeFromWishlist(id));
    toast.success('Removed from Wishlist');
  };

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.in_stock || product.stock <= 0) {
      toast.error('This product is out of stock');
      return;
    }
    
    dispatch(
      addToCart({
        product: product._id,
        variation: null,
        quantity: 1,
        productData: {
          slug: product.slug,
          name: product.name,
          image: product.media?.[0] || product.image || '',
          price: parseFloat(product.sale_price) || 0,
          regularPrice: parseFloat(product.regular_price) || parseFloat(product.sale_price) || 0,
          vendor: product.vendor?._id || product.vendor || null,
          vendorName: product.vendor?.vendor?.store_name || product.vendor?.name || product.vendorName || 'Unknown Vendor',
          stock: product.stock || 0,
        },
      })
    );
    toast.success('Added to cart');
  };

  // Empty state
  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-700">
            <div className="relative mb-8">
              <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center shadow-2xl border border-gray-100">
                <Heart className="w-20 h-20 text-rose-500/20" />
              </div>
              <div className="absolute inset-0 border-2 border-rose-500/30 rounded-full animate-ping scale-110 opacity-20"></div>
            </div>

            <h2 className="text-3xl font-bold text-brand-primary mb-3">
              Your wishlist is <span className="text-rose-500 italic">empty</span>
            </h2>
            
            <p className="text-gray-500 mb-10 max-w-md leading-relaxed">
              Explore our native crafts, handlooms, and home decor, and click the heart icon on products to save them here!
            </p>

            <Link
              href="/"
              className="group relative overflow-hidden bg-brand-primary text-brand-secondary font-bold py-4 px-10 rounded-xl transition-all duration-300 hover:shadow-[0_10px_20px_rgba(5,31,32,0.3)] hover:-translate-y-1"
            >
              <span className="relative z-10 flex items-center gap-2">
                Discover Products
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Section>
      <div className="min-h-screen py-8 bg-gray-50/50">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Heart className="w-8 h-8 text-rose-500 fill-current" />
              My Wishlist
              <span className="text-xl font-normal text-gray-600">
                ({wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'})
              </span>
            </h1>
          </div>

          {/* Grid list of wishlist items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistItems.map((product) => {
              const discount = product.regular_price && product.regular_price > product.sale_price
                ? Math.round(((product.regular_price - product.sale_price) / product.regular_price) * 100)
                : 0;
              const imageUrl = product.media?.[0] || product.image || '/placeholder.png';
              const vendorName = product.vendor?.vendor?.store_name || product.vendor?.name || product.vendorName || 'Artisan Cooperative';

              return (
                <div 
                  key={product._id} 
                  className="group relative flex flex-col h-full w-full overflow-hidden rounded-xl bg-white border border-slate-100 transition-all duration-500 hover:shadow-md"
                >
                  {/* Top Section: Image */}
                  <div className="relative aspect-square w-full overflow-hidden bg-slate-50">
                    <Link href={`/products/${product.slug}`} className="block h-full w-full">
                      <Image
                        src={getImageUrl(imageUrl)}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                        unoptimized={true}
                      />
                    </Link>

                    {/* Remove Action Button */}
                    <button
                      onClick={(e) => handleRemove(product._id, e)}
                      title="Remove from Wishlist"
                      className="absolute top-3 right-3 p-2 bg-white/95 hover:bg-rose-500 hover:text-white rounded-full shadow-md text-gray-500 transition-colors z-20"
                    >
                      <Trash2 size={16} />
                    </button>

                    {discount > 0 && (
                      <span className="absolute left-3 top-3 bg-brand-accent px-2 py-1 text-[10px] font-bold text-brand-primary rounded-md shadow-sm z-10">
                        -{discount}%
                      </span>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="flex grow flex-col p-4 bg-white">
                    <div className="mb-2">
                      <p className="text-[9px] font-bold uppercase tracking-[2px] text-slate-400">
                        Sold By: {vendorName}
                      </p>
                      <Link href={`/products/${product.slug}`}>
                        <h3 className="mt-1 line-clamp-1 text-sm font-semibold text-brand-primary group-hover:text-brand-secondary transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                    </div>

                    <div className="flex items-baseline gap-2 mt-auto pt-2">
                      <span className="text-lg font-bold text-brand-primary">
                        {formatPrice(product.sale_price)}
                      </span>
                      {discount > 0 && (
                        <span className="text-xs text-slate-400 line-through">
                          {formatPrice(product.regular_price)}
                        </span>
                      )}
                    </div>

                    {/* Add to Cart CTA */}
                    <div className="mt-4 pt-2 border-t border-slate-50">
                      <button
                        onClick={(e) => handleAddToCart(product, e)}
                        disabled={!product.in_stock || product.stock <= 0}
                        className="w-full py-2 px-4 bg-brand-primary hover:bg-black text-brand-secondary disabled:bg-gray-100 disabled:text-gray-400 font-bold rounded-lg text-xs transition-colors flex items-center justify-center gap-2"
                      >
                        <ShoppingCart size={14} />
                        {product.in_stock && product.stock > 0 ? 'ADD TO CART' : 'OUT OF STOCK'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
