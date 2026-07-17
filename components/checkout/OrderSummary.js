'use client';

import { Package, Truck, Tag, Store, Info } from 'lucide-react';
import Image from 'next/image';
import { getImageUrl } from '@/utils/helperFunction';

export default function OrderSummary({
  validatedCart = [],
  deliveryCharges = 0,
  codCharges = 0,
  discount = 0,
}) {
  // Group items by vendor
  const vendorGroups = {};
  validatedCart.forEach((item) => {
    const vendorId = item.vendor && typeof item.vendor === 'object'
      ? (item.vendor._id || item.vendor.id || 'unknown')
      : (item.vendor || 'unknown');
    if (!vendorGroups[vendorId]) {
      vendorGroups[vendorId] = [];
    }
    vendorGroups[vendorId].push(item);
  });

  const subtotal = validatedCart.reduce(
    (sum, item) =>
      sum + parseFloat(item.sale_price || item.regular_price || 0) * item.quantity,
    0
  );

  const total = subtotal + deliveryCharges + codCharges - discount;

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-brand-primary/5 flex flex-col h-full overflow-hidden">
      {/* Header - Compact & Premium */}
      <div className="p-4 md:p-5 border-b border-slate-50 shrink-0 bg-white">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-black text-brand-primary uppercase tracking-tighter flex items-center gap-2">
            <Package className="w-4 h-4 text-brand-secondary" />
            Review Order
          </h2>
          <span className="px-2 py-0.5 bg-brand-primary/5 text-brand-primary text-[10px] font-bold rounded-full border border-brand-primary/10">
            {validatedCart.length} {validatedCart.length > 1 ? 'Items' : 'Item'}
          </span>
        </div>
      </div>

      {/* Vendor-wise Items - Scrollable area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-5 space-y-5 scrollbar-hide">
        {Object.entries(vendorGroups).map(([vendorId, items]) => (
          <div key={vendorId} className="group">
            {/* Vendor Badge */}
            <div className="flex items-center gap-2 mb-3">
              <Store className="w-3 h-3 text-brand-secondary" />
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 group-hover:text-brand-primary transition-colors">
                Sold by: {items[0]?.vendor?.store_name || items[0]?.vendor?.name || items[0]?.vendorName || `Store`}
              </span>
            </div>

            <div className="space-y-4">
              {items.map((item, idx) => {
                const itemKey = `${item.product}_${item.variation || idx}`;
                const price = parseFloat(item.sale_price || item.regular_price || 0);
                
                return (
                  <div key={itemKey} className="flex gap-4 animate-in fade-in slide-in-from-right-2 duration-300">
                    <div className="relative w-14 h-14 md:w-16 md:h-16 shrink-0 rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden">
                      {item.image ? (
                        <Image
                          src={getImageUrl(item.image)}
                          alt={item.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          unoptimized={true}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center"><Package className="text-slate-200" /></div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <h4 className="text-xs md:text-sm font-bold text-brand-primary truncate leading-tight mb-1">
                        {item.name}
                      </h4>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xs font-black text-brand-primary">₹{price.toLocaleString()}</span>
                        <span className="text-[10px] text-slate-400 font-medium italic">x {item.quantity}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Price Breakdown - Sticky Bottom */}
      <div className="shrink-0 p-4 md:p-6 bg-slate-50/80 border-t border-slate-100 backdrop-blur-sm">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between items-center text-[11px] md:text-xs font-medium uppercase tracking-tight">
            <span className="text-slate-500">Subtotal</span>
            <span className="text-brand-primary font-bold">₹{subtotal.toLocaleString()}</span>
          </div>

          <div className="flex justify-between items-center text-[11px] md:text-xs font-medium uppercase tracking-tight">
            <span className="text-slate-500 flex items-center gap-1.5">
              <Truck className="w-3 h-3 text-brand-accent" />
              Delivery
            </span>
            <span className={deliveryCharges > 0 ? "text-brand-primary font-bold" : "text-brand-accent font-black"}>
              {deliveryCharges > 0 ? `+ ₹${deliveryCharges}` : 'FREE'}
            </span>
          </div>

          {codCharges > 0 && (
            <div className="flex justify-between items-center text-[11px] md:text-xs font-medium uppercase tracking-tight">
              <span className="text-slate-500">COD Fee</span>
              <span className="text-brand-primary font-bold">+ ₹{codCharges}</span>
            </div>
          )}

          {discount > 0 && (
            <div className="flex justify-between items-center text-[11px] md:text-xs font-medium uppercase tracking-tight">
              <span className="text-brand-accent-pink flex items-center gap-1.5 font-bold">
                <Tag className="w-3 h-3" />
                Savings
              </span>
              <span className="text-brand-accent-pink font-black">- ₹{discount.toLocaleString()}</span>
            </div>
          )}
        </div>

        {/* Total Highlight */}
        <div className="pt-4 border-t border-slate-200/60">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Total Payable</p>
              <div className="text-2xl md:text-3xl font-black text-brand-primary tracking-tighter">
                ₹{total.toLocaleString()}
              </div>
            </div>
            <div className="mb-1">
               <span className="px-2 py-1 bg-brand-secondary text-brand-primary text-[9px] font-black rounded uppercase tracking-tighter">
                 GST Included
               </span>
            </div>
          </div>
        </div>
      </div>

      {/* Multi-vendor Alert - Aesthetic Version */}
      {Object.keys(vendorGroups).length > 1 && (
        <div className="px-4 py-3 bg-brand-primary text-brand-secondary flex items-center gap-3 shrink-0">
          <Info size={14} className="shrink-0" />
          <p className="text-[10px] font-bold leading-tight">
            SHIPMENT SPLIT: Items will arrive in {Object.keys(vendorGroups).length} separate high-priority packages.
          </p>
        </div>
      )}
    </div>
  );
}