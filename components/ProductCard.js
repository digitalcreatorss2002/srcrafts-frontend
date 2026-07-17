"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Share2, Heart, Zap } from "lucide-react";

import { getImageUrl } from "@/utils/helperFunction";
import { addToCart } from "@/redux/cart/cartSlice";
import { addToWishlist, removeFromWishlist, selectWishlistItems } from "@/redux/wishlist/wishlistSlice";
import calculateDiscountPercentage from "@/utils/calculateDiscountPercentage";
import ReviewStars from "@/modules/Reviews/Components/ReviewStars";

const SLIDE_DURATION = 3000;

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(selectWishlistItems);
  const isWishlisted = wishlistItems.some((item) => item._id === product?._id);

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product) return;
    if (isWishlisted) {
      dispatch(removeFromWishlist(product._id));
      toast.success("Removed from Wishlist");
    } else {
      dispatch(addToWishlist(product));
      toast.success("Added to Wishlist");
    }
  };
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showMobileActions, setShowMobileActions] = useState(false); // Mobile state
  const timerRef = useRef(null);
  const cardRef = useRef(null); // Ref for outside click detection
  const router = useRouter();
  const images = product?.media?.length > 0 ? product.media : ["/placeholder.png"];
  const outOfStock = !product?.in_stock || product?.stock <= 0;
  const discount = calculateDiscountPercentage(product?.regular_price, product?.sale_price);

  // --- Mobile Interaction: Close actions when clicking outside ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setShowMobileActions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMobileActions = (e) => {
    // Only toggle on mobile (prevent conflict with desktop hover if needed)
    setShowMobileActions(!showMobileActions);
  };

  // --- Slider Logic ---
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const startSlider = () => {
    stopSlider();
    if (!outOfStock && images.length > 1) {
      timerRef.current = setInterval(nextSlide, SLIDE_DURATION);
    }
  };

  const stopSlider = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  useEffect(() => {
    isHovered ? stopSlider() : startSlider();
    return () => stopSlider();
  }, [isHovered, images.length]);

  // --- Action Handlers ---
  const handleShare = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}/products/${product.slug}`;

    if (navigator.share) {
      try {
        await navigator.share({ title: product.name, url });
      } catch (err) { console.error("Share failed", err); }
    } else {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (outOfStock) toast.error("Out of stock");

    else {
      console.log(product);
      dispatch(addToCart({
        product: product._id,
        quantity: product.minQty || 1,
        productData: { ...product, image: images[0] }
      }));
      toast.success("Added to cart");
    }
  };

  const handleCheckout = (e) => {
    console.log(product);
    e.preventDefault();
    e.stopPropagation();
    const slug = product.slug;
    const id = product._id;
    if (outOfStock) toast.error("Out of stock");
    else {
      router.push(`/checkout/direct/${slug}/${id}`)
    }
  };

  return (
    <div
      ref={cardRef}
      className="group relative flex flex-col h-full w-full overflow-hidden rounded-md bg-white border border-slate-100 transition-all duration-500 hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowMobileActions(false);
      }}
      onClick={toggleMobileActions} // Toggle for mobile tap
    >
      {/* Top Section: Image & Overlay Actions */}
      <div className="relative aspect-square w-full overflow-hidden bg-slate-50">
        <Link href={`/products/${product?.slug}`} className="block h-full w-full">
          {images.map((img, idx) => (
            <Image
              key={idx}
              src={getImageUrl(img)}
              alt={product.name}
              fill
              className={`object-cover transition-all duration-700 ease-in-out ${idx === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-110"
                }`}
              unoptimized
            />
          ))}
        </Link>

        {/* TOP FLOATING ACTIONS */}
        <div
          className={`
            absolute top-3 right-3 flex flex-col gap-2 z-30 transition-all duration-300
            /* Mobile/Active State */
            ${showMobileActions ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"}
            /* Desktop Hover State */
            group-hover:translate-x-0 group-hover:opacity-100
            /* Accessibility Focus */
            focus-within:translate-x-0 focus-within:opacity-100
          `}
        >
          <button
            onClick={handleShare}
            title="Share"
            className="p-2.5 bg-white rounded-full shadow-lg text-brand-primary hover:bg-brand-primary hover:text-white transition-colors active:scale-90"
          >
            <Share2 size={16} />
          </button>
          <button
            onClick={handleWishlistToggle}
            title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
            className={`p-2.5 rounded-full shadow-lg transition-colors active:scale-90 ${
              isWishlisted 
                ? 'bg-rose-500 text-white hover:bg-rose-600' 
                : 'bg-white text-brand-primary hover:text-rose-500'
            }`}
          >
            <Heart size={16} className={isWishlisted ? 'fill-current' : ''} />
          </button>
          <button
            onClick={handleAddToCart}
            title="Quick Add"
            className="p-2.5 bg-white rounded-full shadow-lg text-brand-primary hover:bg-brand-accent hover:text-brand-primary transition-colors active:scale-90"
          >
            <ShoppingCart size={16} />
          </button>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 z-20">
          {images.length > 1 && images.map((_, idx) => (
            <div key={idx} className={`h-1 rounded-full transition-all ${idx === currentIndex ? "w-4 bg-brand-secondary" : "w-1 bg-white/50"}`} />
          ))}
        </div>

        {discount > 0 && (
          <span className="absolute left-3 top-3 bg-brand-accent px-2 py-1 text-[10px] font-bold text-brand-primary rounded-md shadow-sm z-10">
            -{discount}%
          </span>
        )}
      </div>

      {/* Content Section */}
      <div className="flex grow flex-col md:p-4 bg-white">
        <div className="mb-0 md:mb-2 p-1 md:p-0">
          <p className="text-[9px] font-bold uppercase tracking-[2px] text-slate-400">
            Sold By: {product?.vendor?.name || "Unknown"}
          </p>
          <Link href={`/products/${product?.slug}`}>
            <h3 className="mt-1 line-clamp-1 text-sm font-semibold text-brand-primary group-hover:text-brand-secondary transition-colors">
              {product.name}
            </h3>
          </Link>
        </div>

        <div className="mb-0 md:mb-2 px-1 md:px-0">
          <ReviewStars
            rating={product?.averageRating || 0}
            size={14}
            showLabel={true}
          />
        </div>

        {product?.minQty > 1 && (
          <div className="mb-0 md:mb-2 p-1 md:p-0">
            <p className="text-[8px] font-extrabold uppercase  text-brand-primary">
              Min Order Qty: {product?.minQty || "Unknown"}
            </p>
          </div>
        )}

        <div className=" flex items-baseline gap-2 px-1 md:px-0">
          <span className="text-lg font-bold text-brand-primary">₹{product.sale_price}</span>
          {discount > 0 && (
            <span className="text-xs text-slate-400 line-through">₹{product.regular_price}</span>
          )}
        </div>

        <div className="mt-auto pt-1 md:pt-2">
          {outOfStock ? (
            <button
              disabled
              className="w-full md:rounded-md bg-slate-200 py-2 text-[11px] font-bold uppercase text-slate-500"
            >
              OUT OF STOCK
            </button>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <button
                onClick={handleAddToCart}
                className="hidden md:flex items-center justify-center rounded-lg border-2 border-brand-primary py-2 text-[11px] font-bold text-brand-primary transition-all hover:bg-brand-primary hover:text-white"
              >
                ADD TO CART
              </button>
              <button
                onClick={handleCheckout}
                className=" flex items-center justify-center gap-1 md:rounded-lg bg-brand-secondary py-2 text-[11px] font-bold text-brand-primary transition-all hover:brightness-110 active:scale-95 "
              >

                BUY NOW
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;