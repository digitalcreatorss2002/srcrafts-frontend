import React from 'react';

/**
 * UI Component for individual order display.
 * @param {Object} props.order - The order data object.
 */
export const OrderCard = ({ order }) => {
  // Defensive check to avoid crashes if data is missing
  if (!order) return null;

  return (
    <div className="group border border-brand-primary/10 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300">
      {/* Header Section */}
      <div className="bg-brand-primary p-4 flex justify-between items-center">
        <div>
          <span className="text-brand-secondary text-[10px] font-black uppercase tracking-widest">Reference</span>
          <h3 className="text-white font-mono text-lg font-bold">#{order.order_id}</h3>
        </div>
        <div className="text-right">
          <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black ${
            order.status === 'PROCESSING' ? 'bg-brand-secondary text-brand-primary' : 'bg-brand-accent text-brand-primary'
          }`}>
            {order.status}
          </span>
          <p className="text-white/60 text-[10px] mt-1 italic">
            Ordered: {new Date(order.order_date).toLocaleDateString('en-IN')}
          </p>
        </div>
      </div>

      {/* Details Grid */}
      <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Customer Info */}
        <div className="space-y-1">
          <h4 className="text-brand-primary font-bold text-xs mb-2 uppercase border-b border-brand-accent/30 pb-1">Customer</h4>
          <p className="text-gray-800 font-bold leading-tight">{order.customer?.name}</p>
          <p className="text-gray-500 text-xs">{order.customer?.email}</p>
          <p className="text-brand-accent-pink text-[11px] font-medium mt-2">
            📍 {order.address?.city}, {order.address?.state}
          </p>
        </div>

        {/* Product Items */}
        <div className="md:col-span-1">
          <h4 className="text-brand-primary font-bold text-xs mb-2 uppercase border-b border-brand-accent/30 pb-1">Line Items</h4>
          <div className="max-h-24 overflow-y-auto">
            {order.products?.map((item) => (
              <div key={item._id} className="flex justify-between text-xs mb-2 border-b border-gray-50 pb-1 last:border-0">
                <span className="text-gray-600 truncate max-w-[150px]">{item.name}</span>
                <span className="text-brand-primary font-bold bg-brand-accent/10 px-1 rounded">x{item.quantity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Summary */}
        <div className="bg-gray-50 p-3 rounded-lg flex flex-col justify-center border-l-2 border-brand-secondary">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">Payment</span>
            <span className="text-[10px] font-black text-brand-primary bg-white border border-gray-200 px-2 py-0.5 rounded shadow-sm">
              {order.payment_method}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-gray-400 uppercase">Grand Total</span>
            <div className="text-2xl font-black text-brand-primary leading-none">
               ₹{order.total_amount?.toLocaleString('en-IN')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};