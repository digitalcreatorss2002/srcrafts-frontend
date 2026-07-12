'use client';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingCartIcon } from 'lucide-react';
import { toggleCart } from '@/modules/cart/cartSlice';

export default function CartIcon() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; 

  const itemCount = Array.isArray(items)
    ? items.reduce((sum, item) => sum + (item.quantity || 0), 0)
    : 0;

  const handleOpenCart = () => {
    dispatch(toggleCart());
  };

  return (
    <button
      className="relative p-2 group transition-all"
      onClick={handleOpenCart}
      aria-label="Open Shopping Cart"
    >
      <ShoppingCartIcon
        className="text-white group-hover:text-rose-200 transition-colors"
        size={24}
      />

      {itemCount > 0 && (
        <span className="absolute top-3 right-2 translate-x-1/2 -translate-y-1/2 bg-rose-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center border-2 border-gray-900">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </button>
  );
}
