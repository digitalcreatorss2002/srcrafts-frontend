'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { ShoppingCart, ArrowLeft, ArrowRight } from 'lucide-react';
import {
  selectCartItems,
  selectCartItemCount,
  selectCartTotal,
  selectCartByVendor,
  updateQuantity,
  removeFromCart,
  syncCartFromStorage,
} from '@/redux/cart/cartSlice';
import VendorCartSection from '@/components/cart/VendorCartSection';
import CartSummary from '@/components/cart/CartSummary';
import Link from 'next/link';
import Section from '@/components/container/genericContainer/Section';

export default function CartPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const cartItems = useSelector(selectCartItems);
  const itemCount = useSelector(selectCartItemCount);
  const subtotal = useSelector(selectCartTotal);
  const cartByVendor = useSelector(selectCartByVendor);
  console.log(cartItems);
  // Sync cart from localStorage on mount
  useEffect(() => {
    dispatch(syncCartFromStorage());
  }, [dispatch]);

  const handleUpdateQuantity = (productId, variationId, newQuantity) => {
    dispatch(
      updateQuantity({
        product: productId,
        variation: variationId,
        quantity: newQuantity,
      })
    );
  };

  const handleRemoveItem = (productId, variationId) => {
    dispatch(
      removeFromCart({
        product: productId,
        variation: variationId,
      })
    );
  };

  // Calculate delivery charges (₹60 per vendor as per backend logic)
  const vendorCount = Object.keys(cartByVendor).length;
  const deliveryCharges = vendorCount * 60;

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center py-12'>
        <div className='container mx-auto px-4 max-w-7xl'>
          <div className='flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-700'>
            
            {/* Icon Container with Brand Colors */}
            <div className='relative mb-8'>
              <div className='w-40 h-40 bg-white rounded-full flex items-center justify-center shadow-2xl border border-gray-100'>
                <ShoppingCart className='w-20 h-20 text-brand-primary/20' />
              </div>
              {/* Decorative Gold Ring */}
              <div className='absolute inset-0 border-2 border-brand-secondary/30 rounded-full animate-ping scale-110 opacity-20'></div>
            </div>
  
            {/* Typography using Brand Primary */}
            <h2 className='text-3xl font-bold text-brand-primary mb-3'>
              Your cart is <span className='text-brand-secondary italic'>waiting</span>
            </h2>
            
            <p className='text-gray-500 mb-10 max-w-md leading-relaxed'>
              It seems you haven't discovered your next favorite piece yet. 
              Explore our curated collections and fill your cart with excellence.
            </p>
  
            {/* Primary CTA using Brand Primary/Secondary contrast */}
            <Link
              href='/'
              className='group relative overflow-hidden bg-brand-primary text-brand-secondary font-bold py-4 px-10 rounded-xl transition-all duration-300 hover:shadow-[0_10px_20px_rgba(5,31,32,0.3)] hover:-translate-y-1'
            >
              <span className='relative z-10 flex items-center gap-2'>
                Continue Shopping 
                <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
              </span>
              {/* Subtle Gradient Overlay */}
              <div className='absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000'></div>
            </Link>
  
            {/* Decorative Brand Element */}
            <div className='mt-12 flex gap-2'>
              <div className='w-2 h-2 rounded-full bg-brand-secondary'></div>
              <div className='w-2 h-2 rounded-full bg-brand-accent'></div>
              <div className='w-2 h-2 rounded-full bg-brand-accent-pink'></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
   <>
   <Section>
       <div className='min-h-screen  py-8'>
      <div className='container mx-auto px-4 max-w-7xl'>
        {/* Header */}
        <div className='mb-8'>
          <Link
            href='/products'
            className='inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 transition-colors'
          >
            <ArrowLeft className='w-4 h-4' />
            Continue Shopping
          </Link>
          <h1 className='text-3xl font-bold text-gray-900 flex items-center gap-3'>
            <ShoppingCart className='w-8 h-8' />
            Shopping Cart
            <span className='text-xl font-normal text-gray-600'>
              ({itemCount} {itemCount === 1 ? 'item' : 'items'})
            </span>
          </h1>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Cart Items - Left Side */}
          <div className='lg:col-span-2 space-y-4'>
            {Object.entries(cartByVendor).map(([vendorId, { items }]) => {
              const firstItem = items[0];
              let vendorName = firstItem?.vendorName;

              if (!vendorName || vendorName === 'undefined') {
                if (typeof firstItem?.vendor === 'object' && firstItem?.vendor !== null) {
                  vendorName = firstItem.vendor.name || firstItem.vendor.store_name || firstItem.vendor.username;
                } else if (typeof firstItem?.vendor === 'string' && !firstItem.vendor.includes('[object')) {
                  vendorName = firstItem.vendor;
                }
              }

              if (!vendorName || vendorName.includes('[object')) {
                vendorName = 'Artisan Store';
              }

              return (
                <VendorCartSection
                  key={vendorId}
                  vendorId={vendorId}
                  vendorName={vendorName}
                  items={items}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemoveItem}
                />
              );
            })}

            {/* Multi-vendor notice */}
            {vendorCount > 1 && (
              <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
                <p className='text-sm text-blue-800'>
                  <strong>Note:</strong> Your order contains items from{' '}
                  {vendorCount} different vendors. You will receive separate
                  shipments and may have different delivery times.
                </p>
              </div>
            )}
          </div>

          {/* Cart Summary - Right Side */}
          <div className='lg:col-span-1'>
            <CartSummary
              itemCount={itemCount}
              subtotal={subtotal}
              deliveryCharges={deliveryCharges}
              discount={0}
              isCodAvailable={true}
            />
          </div>
        </div>

        {/* Trust Badges */}
        <div className='mt-12 grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div className='flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm'>
            <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0'>
              <ShoppingCart className='w-6 h-6 text-blue-600' />
            </div>
            <div>
              <h3 className='font-semibold text-gray-900'>Free Shipping</h3>
              <p className='text-sm text-gray-600'>On orders above ₹999</p>
            </div>
          </div>
          <div className='flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm'>
            <div className='w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0'>
              <svg
                className='w-6 h-6 text-green-600'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </div>
            <div>
              <h3 className='font-semibold text-gray-900'>Secure Payment</h3>
              <p className='text-sm text-gray-600'>100% secure transactions</p>
            </div>
          </div>
          <div className='flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm'>
            <div className='w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0'>
              <svg
                className='w-6 h-6 text-orange-600'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6'
                />
              </svg>
            </div>
            <div>
              <h3 className='font-semibold text-gray-900'>Easy Returns</h3>
              <p className='text-sm text-gray-600'>7 days return policy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Section>
    </>
  );
}
