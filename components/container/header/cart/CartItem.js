'use client';
import { useDispatch } from 'react-redux';
import { updateQtyRequest, removeItemRequest } from '@/modules/cart/cartSlice'
import { Trash2, Plus, Minus } from 'lucide-react'; // Optional: Use icons for cleaner UI

export default function CartItem({ item }) {
  const dispatch = useDispatch();
  const isUnavailable = item.isAvailable === false;

  const handleQtyChange = (delta) => {
    const newQty = item.quantity + delta;
    if (newQty > 0) {
      dispatch(updateQtyRequest({ variantId: item.variantId, quantity: newQty }));
    }
  };

  const handleRemove = () => {
    dispatch(removeItemRequest(item.variantId));
  };

  return (
    <div className={`flex flex-col p-4 border-b transition-all ${isUnavailable ? 'bg-red-50' : 'bg-white'}`}>
      <div className="flex items-center justify-between gap-4">
        {/* Product Image & Info */}
        <div className="flex gap-4 items-center">
          <div className="w-16 h-16 bg-gray-100 rounded-md shrink-0 overflow-hidden">
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h3 className={`text-sm font-semibold ${isUnavailable ? 'text-red-800' : 'text-gray-900'}`}>
              {item.name}
            </h3>
            <p className="text-xs text-gray-500">{item.variantLabel}</p>
            <p className="text-sm font-bold mt-1">${item.price}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col items-end gap-2">
          <button 
            onClick={handleRemove}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 size={16} />
          </button>
          
          <div className="flex items-center gap-2 border rounded-lg bg-white px-1 py-0.5">
            <button 
              disabled={isUnavailable}
              onClick={() => handleQtyChange(-1)}
              className="p-1 hover:bg-gray-100 rounded disabled:opacity-30"
            ><Minus size={14} /></button>
            <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
            <button 
              disabled={isUnavailable}
              onClick={() => handleQtyChange(1)}
              className="p-1 hover:bg-gray-100 rounded disabled:opacity-30"
            ><Plus size={14} /></button>
          </div>
        </div>
      </div>

      {isUnavailable && (
        <p className="text-[10px] font-bold text-red-600 mt-2 uppercase tracking-tight">
          Currently Unavailable - Please remove to checkout
        </p>
      )}
    </div>
  );
}