"use client";

import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { addToCart } from "@/redux/cart/cartSlice";
import { toast } from "react-hot-toast";
import { formatPrice } from "@/utils/helperFunction";
import VariationSelector from "./VariationSelector";
import ProductSpecs from "./ProductSpecs";
import ButtonPrimary from "@/components/ButtonPrimary";
import { ButtonSecondary } from "@/components/ButtonSecondary";
import ReviewStars from "../../../../modules/Reviews/Components/ReviewStars";
import calculateDiscountPercentage from "@/utils/calculateDiscountPercentage";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';


export default function ProductInfo() {
  const { currentProduct, selectedVariation, status } = useSelector(
    (state) => state.product
  );
  
  const dispatch = useDispatch();
  const badgeHeight = 'w6 h-6'
  const badgeText = 'text-[12px] text-center line-height'
  const router = useRouter();
  const outOfStock = !currentProduct?.in_stock || currentProduct?.stock <= 0;
  if (!currentProduct) return null;
  const price = selectedVariation?.sale_price ?? currentProduct.sale_price;
  const originalPrice = selectedVariation?.regular_price ?? currentProduct.regular_price;
  const sku = selectedVariation?.sku ?? currentProduct.sku;
  const discount = calculateDiscountPercentage(originalPrice, price)
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const product = currentProduct;
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
          image: product.media?.[0] || '',
          price: parseFloat(product.sale_price) || 0,
          regularPrice:
            parseFloat(product.regular_price) ||
            parseFloat(product.sale_price) ||
            0,
          vendor: product.vendor?._id || null,
          vendorName: product.vendor?.name || 'Unknown Vendor',
          stock: product.stock || 0,
        },
      })
    );
    toast.success(`${product.name} added to cart!`);
  };
  const handleCheckout = (e) => {
    console.log(currentProduct);
    e.preventDefault(); 
    e.stopPropagation();
    const slug = currentProduct.slug;
    const id = currentProduct._id;
    if (outOfStock) toast.error("Out of stock");
    else {
      router.push(`/checkout/direct/${slug}/${id}`)
    }    
  };
  return (
   <div className="lg:col-span-6 px-4 leading-3 capitalize flex justify-center">
     <div className="container xl:max-w-2xl max-w-xl">
      
      {/* Title */}
      <h1 className="text-2xl lg:text-2xl font-bold text-brand-primary mb-2">
        {currentProduct.name || "Untitled Product"}
      </h1>

      {/* Vendor */}

      {currentProduct.vendor.vendor.store_active?(currentProduct.vendor.vendor.store_name) && (
        <Link href={`/store/${currentProduct.vendor.vendor.store_slug}`}>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs text-gray-600">Sold By:</span>
            <button className="text-sm font-semibold text-brand-secondary">
              {currentProduct.vendor.vendor.store_name}
            </button>
          </div>
        </Link>
      ):(currentProduct.vendor.vendor.name) && (
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs text-gray-600">Sold By:</span>
          <button className="text-sm font-semibold text-brand-secondary">
            {currentProduct.vendor.name}
          </button>
        </div>
      )}

      <div className="mb-5">
        <ReviewStars rating={4.5} count={25}/>
      </div>

      
      {/* Details */}
      <div className="mb-10 ">
      <ProductSpecs specifications={currentProduct.specifications} description={currentProduct.description} />
      </div>
      
      

      {/* Price */}
      <div className="flex flex-col gap-3 font-sans">
      {/* Top Row: Discount Badge (High Visibility for FOMO) */}
      {discount && (
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-0.5 text-xs font-bold text-red-600 ring-1 ring-inset ring-red-600/20">
            -{discount}% OFF
          </span>
        </div>
      )}

      {/* Middle Row: Primary Price and Comparison */}
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold  text-brand-primary">
          {formatPrice(price)}
        </span>
        
        {discount && (
          <span className="text-lg font-medium text-slate-500 line-through decoration-slate-400/50">
            {formatPrice(originalPrice)}
          </span>
        )}
      </div>

      {/* Bottom Row: Tax/Shipping Info (Transparency improves Trust) */}
      <p className="text-xs text-slate-500">
        Prices include VAT. <span className="underline cursor-help">Shipping calculated at checkout.</span>
      </p>
    </div>
      {/* Variations */}
      <VariationSelector />

      

      {/* Actions */}
      <div className="flex gap-4 mb-6 ">
        <ButtonPrimary
          onClick={handleAddToCart}
          disabled={status === "loading"}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" height="16" 
            viewBox="0 0 24 24" fill="none" 
            stroke="currentColor" strokeWidth="3.5" 
            strokeLinecap="round" strokeLinejoin="round"
          >
            <path d="M5 12h14m-7-7v14"/>
          </svg>
          {status === "loading" ? "Adding..." : "Add to Cart"}
        </ButtonPrimary>

        <ButtonSecondary 
        onClick={handleCheckout}
        >
          Buy Now
        </ButtonSecondary>

       
      </div>

      

      {/* Trust Badges */}
      <div className="border-t pt-4">
        <div className="flex gap-3 md:gap-6 lg:gap-10 flex-wrap justify-center ">
          
          {currentProduct?.cod_available && <div className="flex items-center gap-3 flex-col">
              <div className={`${badgeHeight} flex items-center justify-center `}>
                <Image
                  src={'/icons/cash-on-delivery.png'}
                  alt="icon"
                  width={40}
                  height={40}
                />
              </div>
              <div className={badgeText}>
              COD<br className="md:hidden"/> Available
              </div>
          </div>}
          {<div className="flex items-center gap-3 flex-col">
              <div className={`${badgeHeight} flex items-center justify-center `}>
                <Image
                  src={'/icons/authenticity.png'}
                  alt="icon"
                  width={40}
                  height={40}
                />
              </div>
              <div className={badgeText}>
              100%<br className="md:hidden"/> Authentic
              </div>
          </div>}
          {currentProduct?.return_available && <div className="flex items-center gap-3 flex-col">
              <div className={`${badgeHeight} flex items-center justify-center `}>
                <Image
                  src={'/icons/return.png'}
                  alt="icon"
                  width={40}
                  height={40}
                />
              </div>
              <div className={badgeText}>
              7 days<br className="md:hidden"/> return
              </div>
          </div>}
          {currentProduct?.exchange_available && <div className="flex items-center gap-3 flex-col">
              <div className={`${badgeHeight} flex items-center justify-center `}>
                <Image
                  src={'/icons/return.png'}
                  alt="icon"
                  width={40}
                  height={40}
                />
              </div>
              <div className={badgeText}>
              7 days<br className="md:hidden"/> replacement
              </div>
          </div>}
          <div className="flex items-center gap-3 flex-col">
              <div className={`${badgeHeight} flex items-center justify-center `}>
                <Image
                  src={'/icons/makiinindia.png'}
                  alt="icon"
                  width={40}
                  height={40}
                />
              </div>
              <div className={badgeText}>
              Make In<br className="md:hidden"/> India
              </div>
          </div>
        </div>
      </div>

      
    </div>
   </div>
  );
}
