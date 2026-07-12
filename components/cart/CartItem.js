'use client';

import { getImageUrl } from '@/utils/helperFunction';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  const {
    product,
    variation,
    quantity,
    name,
    image,
    price,
    regularPrice,
    slug,
    stock,
  } = item;

  const handleIncrease = () => {
    if (quantity < stock) {
      onUpdateQuantity(product, variation, quantity + 1);
    }
  };
  console.log(image);

  const handleDecrease = () => {
    if (quantity > 1) {
      onUpdateQuantity(product, variation, quantity - 1);
    }
  };

  const handleRemove = () => {
    onRemove(product, variation);
  };

  const subtotal = price * quantity;
  const hasDiscount = regularPrice && regularPrice > price;
  const discountPercentage = hasDiscount
    ? Math.round(((regularPrice - price) / regularPrice) * 100)
    : 0;

  return (
    <div className='flex gap-4 py-4 border-b border-gray-200 last:border-b-0'>
      {/* Product Image */}
      <div className='relative w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-gray-100'>
        {image ? (
          <Image src={getImageUrl(image)} alt={name} fill className='object-cover' unoptimized={true}/>
        ) : (
          <div className='w-full h-full flex items-center justify-center text-gray-400'>
            No Image
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className='flex-1 min-w-0'>
        <h3 className='text-sm font-medium text-gray-900 mb-1 truncate'>
          {name}
        </h3>

        {/* Price */}
        <div className='flex items-center gap-2 mb-2'>
          <span className='text-lg font-semibold text-gray-900'>₹{price}</span>
          {hasDiscount && (
            <>
              <span className='text-sm text-gray-500 line-through'>
                ₹{regularPrice}
              </span>
              <span className='text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded'>
                {discountPercentage}% OFF
              </span>
            </>
          )}
        </div>

        {/* Stock Info */}
        {stock <= 5 && stock > 0 && (
          <p className='text-xs text-orange-600 mb-2'>
            Only {stock} left in stock
          </p>
        )}
        {stock === 0 && (
          <p className='text-xs text-red-600 mb-2'>Out of stock</p>
        )}

        {/* Quantity Controls */}
        <div className='flex items-center gap-4'>
          <div className='flex items-center border border-gray-300 rounded-lg'>
            <button
              onClick={handleDecrease}
              disabled={quantity <= 1}
              className='p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
              aria-label='Decrease quantity'
            >
              <Minus className='w-4 h-4' />
            </button>
            <span className='px-4 py-2 min-w-12 text-center font-medium'>
              {quantity}
            </span>
            <button
              onClick={handleIncrease}
              disabled={quantity >= stock}
              className='p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
              aria-label='Increase quantity'
            >
              <Plus className='w-4 h-4' />
            </button>
          </div>

          <button
            onClick={handleRemove}
            className='flex items-center gap-1 text-sm text-red-600 hover:text-red-700 transition-colors'
          >
            <Trash2 className='w-4 h-4' />
            Remove
          </button>
        </div>
      </div>

      {/* Subtotal */}
      <div className='text-right'>
        <p className='text-lg font-semibold text-gray-900'>
          ₹{subtotal.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
