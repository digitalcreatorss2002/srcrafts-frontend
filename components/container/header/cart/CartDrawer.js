'use client';
import { useSelector, useDispatch } from 'react-redux';
import { setCartOpen} from "@/modules/cart/cartSlice"
import CartItem from './CartItem';

export default function CartDrawer() {
  const dispatch = useDispatch();
  const { items, isOpen, status } = useSelector((state) => state.cart);

  // Calculate totals on the fly (Memoized logic can be added later)
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const hasUnavailableItems = items.some(item => !item.isAvailable);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 overflow-hidden">
      {/* Backdrop with Fade */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={() => dispatch(setCartOpen(false))}
      />

      {/* Slide-out Panel */}
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out">
          
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-bold text-gray-900">Your Cart ({items.length})</h2>
            <button 
              onClick={() => dispatch(setCartOpen(false))}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              &times;
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                <p>Your cart is empty</p>
                <button 
                   onClick={() => dispatch(setCartOpen(false))}
                   className="mt-4 text-indigo-600 font-medium underline"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => <CartItem key={item.variantId} item={item} />)
            )}
          </div>

          {/* Footer / Summary */}
          {items.length > 0 && (
            <div className="p-6 border-t bg-gray-50">
              <div className="flex justify-between text-base font-medium text-gray-900 mb-1">
                <p>Subtotal</p>
                <p>&#8377;{subtotal.toFixed(2)}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500 mb-6">Shipping and taxes calculated at checkout.</p>
              
              <button
                disabled={hasUnavailableItems || status === 'loading'}
                className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg shadow-indigo-200"
              >
                {status === 'loading' ? 'Syncing...' : 'Checkout Now'}
              </button>
              
              {hasUnavailableItems && (
                <p className="text-center text-xs text-red-500 mt-3 font-medium">
                  Please remove unavailable items before proceeding.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}