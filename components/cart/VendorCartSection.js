'use client';

import { Store } from 'lucide-react';
import CartItem from './CartItem';

export default function VendorCartSection({
  vendorId,
  items,
  vendorName,
  onUpdateQuantity,
  onRemove,
}) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
      {/* Vendor Header */}
      <div className='bg-gray-50 px-6 py-3 border-b border-gray-200'>
        <div className='flex items-center gap-2'>
          <Store className='w-5 h-5 text-gray-600' />
          <h2 className='text-lg font-semibold text-gray-900'>
            {vendorName || 'Vendor Store'}
          </h2>
        </div>
      </div>

      {/* Cart Items */}
      <div className='px-6'>
        {items.map((item) => {
          const itemKey = item.variation
            ? `${item.product}_${item.variation}`
            : item.product;

          return (
            <CartItem
              key={itemKey}
              item={item}
              onUpdateQuantity={onUpdateQuantity}
              onRemove={onRemove}
            />
          );
        })}
      </div>

      {/* Vendor Subtotal */}
      <div className='bg-gray-50 px-6 py-3 border-t border-gray-200'>
        <div className='flex justify-between items-center'>
          <span className='text-sm font-medium text-gray-700'>
            Subtotal from this vendor
          </span>
          <span className='text-lg font-semibold text-gray-900'>
            ₹{subtotal.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
