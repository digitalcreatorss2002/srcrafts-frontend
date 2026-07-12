'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { 
  CheckCircle2, Package, Truck, Mail, 
  Phone, MapPin, Home, ReceiptText, ArrowRight,
  ShoppingBag, Sparkles
} from 'lucide-react';
import OrderSkeleton from './OrderSkeleton';
import { useSelector } from 'react-redux';

const API_URL = process.env.NEXT_PUBLIC_API_URI || 'http://localhost:5000';

export default function OrderConfirmationClient({ params }) {
  const resolvedParams = use(params);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(resolvedParams.id !== 'success');
  const [formattedDate, setFormattedDate] = useState("");
  const { token, isAuthChecking } = useSelector((state => state.user));
  useEffect(() => {
    if (isAuthChecking) return;
    const fetchOrder = async () => {
      try {

        if(!token || token === 'undefined'){
          console.error("OrderConfirmation: Token missing or undefined. User might not be logged in.");
        return [];
        }
        const response = await fetch(`${API_URL}/api/orders/${resolvedParams.id}`,{
          method:'GET',
          cache: 'no-store',
          headers:{
            'Content-Type':'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setOrder(data);
          const date = new Date(data.order_date || data.createdAt);
          setFormattedDate(date.toLocaleDateString('en-IN', {
            day: 'numeric', month: 'long', year: 'numeric'
          }));
        }
      } catch (error) {
        console.error('Fetch Error:', error);
      } finally {
        setLoading(false);
      }
    };
    if (resolvedParams.id && resolvedParams.id !== 'success') fetchOrder();
  }, [resolvedParams.id, token, isAuthChecking]);

  if (loading) return <OrderSkeleton />;
  if (resolvedParams.id === 'success') return <ThankYouState />;
  if (!order) return <EmptyState />;

  return (
    <div className='min-h-screen bg-slate-50/50 pb-20 font-sans antialiased text-brand-primary'>
      
      {/* Header: Subtle Green Accent */}
      <header className='bg-white border-b border-slate-200 pt-16 pb-12 mb-10'>
        <div className='container mx-auto px-4 text-center'>
          <div className='w-16 h-16 bg-brand-accent/10 rounded-md flex items-center justify-center mx-auto mb-5 border border-brand-accent/20'>
            <CheckCircle2 className='w-10 h-10 text-brand-accent' strokeWidth={1.5} />
          </div>
          <h1 className='text-3xl font-bold mb-2 tracking-tight'>Order Confirmed</h1>
          <p className='text-slate-500 text-sm'>
            Thank you for your purchase. We've sent the details to <span className='font-semibold text-brand-primary'>{order.customer?.email}</span>
          </p>
        </div>
      </header>

      <main className='container mx-auto px-4 max-w-5xl'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-start'>
          
          {/* Column 1 & 2: Main Details */}
          <div className='lg:col-span-2 space-y-6'>
            
            {/* Items Table Card */}
            <div className='bg-white rounded-md border border-slate-200 shadow-sm'>
              <div className='px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50'>
                <div className='flex items-center gap-2'>
                  <Package size={16} className='text-brand-secondary' />
                  <span className='font-bold text-sm uppercase tracking-wider'>Shipment Details</span>
                </div>
                <span className='text-xs font-medium px-2 py-1 bg-brand-primary text-white rounded-md'>
                  ID: #{order.order_id}
                </span>
              </div>
              
              <div className='p-6 divide-y divide-slate-100'>
                {order.products?.map((item, idx) => (
                  <div key={idx} className='py-4 first:pt-0 last:pb-0 flex justify-between items-center'>
                    <div className='space-y-1'>
                      <p className='font-semibold text-sm'>{item.name}</p>
                      <p className='text-xs text-slate-500'>Quantity: {item.quantity}</p>
                    </div>
                    <div className='text-right'>
                      <p className='font-bold text-sm'>₹{(item.sale_price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Info Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {/* Shipping Address */}
              <div className='p-6 bg-white rounded-md border border-slate-200 shadow-sm'>
                <h3 className='text-xs font-bold uppercase text-slate-400 mb-4 flex items-center gap-2 tracking-widest'>
                  <MapPin size={14} className='text-brand-secondary'/> Delivery Address
                </h3>
                <div className='text-sm space-y-1'>
                  <p className='font-bold text-brand-primary'>{order.customer?.name}</p>
                  <p className='text-slate-600'>{order.address?.address_1}</p>
                  <p className='text-slate-600'>{order.address?.city}, {order.address?.state} - {order.address?.pin}</p>
                </div>
              </div>

              {/* Delivery Status */}
              <div className='p-6 bg-white rounded-md border border-slate-200 shadow-sm'>
                <h3 className='text-xs font-bold uppercase text-slate-400 mb-4 flex items-center gap-2 tracking-widest'>
                  <Truck size={14} className='text-brand-secondary'/> Order Status
                </h3>
                <div className='space-y-2'>
                  <span className='inline-block px-3 py-1 bg-brand-accent/10 text-brand-accent text-xs font-bold rounded-md border border-brand-accent/20 capitalize'>
                    {order.status}
                  </span>
                  <p className='text-xs text-slate-500 mt-2'>Payment via <span className='font-bold uppercase'>{order.payment_method}</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Summary Sidebar */}
          <aside className='space-y-4'>
            <div className='bg-brand-primary text-white p-8 rounded-md shadow-sm border border-white/10'>
              <h3 className='font-bold mb-6 flex items-center gap-2 text-brand-secondary border-b border-white/10 pb-4'>
                <ReceiptText size={18}/> Bill Summary
              </h3>
              <div className='space-y-4 text-sm'>
                <div className='flex justify-between opacity-70'>
                  <span>Subtotal</span>
                  <span>₹{order.sub_total?.toLocaleString()}</span>
                </div>
                <div className='flex justify-between opacity-70'>
                  <span>Shipping</span>
                  <span>{order.delivery_charges > 0 ? `₹${order.delivery_charges}` : 'FREE'}</span>
                </div>
                <div className='pt-4 mt-4 border-t border-white/10 flex justify-between text-xl font-bold text-white'>
                  <span>Total</span>
                  <span className='text-brand-secondary'>₹{order.total_amount?.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <Link href="/" className='group w-full py-4 bg-brand-secondary text-brand-primary rounded-md flex items-center justify-center gap-2 font-bold hover:bg-white border border-brand-secondary transition-all duration-300'>
              <Home size={18}/> 
              <span>Back to Store</span>
              <ArrowRight size={16} className='group-hover:translate-x-1 transition-transform' />
            </Link>
          </aside>

        </div>
      </main>
    </div>
  );
}

function EmptyState() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-slate-50'>
      <div className='text-center p-12 bg-white rounded-md border border-slate-200'>
        <Package size={48} className='mx-auto text-slate-200 mb-4' />
        <h2 className='text-xl font-bold mb-2'>Order Not Found</h2>
        <Link href="/" className='text-brand-secondary font-bold hover:underline'>Return to Home</Link>
      </div>
    </div>
  );
}

function ThankYouState() {
  return (
    <div className='min-h-screen bg-slate-50/50 pb-20 font-sans antialiased text-brand-primary'>
      {/* Header: Confetti / Success celebration styling */}
      <header className='bg-white border-b border-slate-200 pt-20 pb-16 mb-10 shadow-sm relative overflow-hidden'>
        {/* Subtle background glow */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-secondary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className='container mx-auto px-4 text-center relative z-10'>
          <div className='w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-100 shadow-md animate-bounce'>
            <CheckCircle2 className='w-12 h-12 text-emerald-500' strokeWidth={1.5} />
          </div>
          <h1 className='text-4xl font-extrabold mb-3 tracking-tight text-slate-900'>Thank You For Your Order!</h1>
          <p className='text-slate-500 text-lg max-w-xl mx-auto'>
            Your purchase was successful. We are now processing your order and will keep you updated every step of the way.
          </p>
        </div>
      </header>

      <main className='container mx-auto px-4 max-w-4xl'>
        <div className='bg-white rounded-2xl border border-slate-100 shadow-xl p-8 md:p-12 mb-8 relative overflow-hidden'>
          
          <div className='grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-10'>
            {/* Delivery Timeline / Tracking Simulator */}
            <div>
              <h3 className='text-lg font-bold text-slate-900 mb-6 flex items-center gap-2'>
                <Truck className="text-brand-secondary" size={20} />
                <span>Delivery Timeline</span>
              </h3>
              
              <div className="space-y-6 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                {/* Step 1 */}
                <div className="flex items-start gap-4 relative">
                  <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-sm shadow-md border-2 border-white z-10">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-800">Order Confirmed</h4>
                    <p className="text-xs text-slate-500">We have received and approved your order</p>
                  </div>
                </div>
                
                {/* Step 2 */}
                <div className="flex items-start gap-4 relative">
                  <div className="w-9 h-9 rounded-full bg-brand-secondary flex items-center justify-center text-brand-primary font-bold text-sm shadow-md border-2 border-white z-10 animate-pulse">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-800">Processing & Packaging</h4>
                    <p className="text-xs text-slate-500">Currently undergoing rigorous quality inspections</p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-4 relative">
                  <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-sm border-2 border-white z-10">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-400">Shipped</h4>
                    <p className="text-xs text-slate-400">Handed over to our reliable courier partner</p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex items-start gap-4 relative">
                  <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-sm border-2 border-white z-10">
                    4
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-400">Delivered</h4>
                    <p className="text-xs text-slate-400">Safely arrived at your shipping address</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Estimated Delivery and Info details */}
            <div className="bg-slate-50/50 p-6 md:p-8 rounded-xl border border-slate-100 space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Estimated Delivery</h4>
                <p className="text-2xl font-extrabold text-brand-primary flex items-center gap-2">
                  <Sparkles className="text-brand-secondary" size={20} />
                  <span>3 - 5 Business Days</span>
                </p>
              </div>

              <div className="border-t border-slate-200/60 pt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Order Notifications</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  We've sent a receipt and full confirmation email with a live tracking link to your registered email address.
                </p>
              </div>

              <div className="border-t border-slate-200/60 pt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-primary/5 flex items-center justify-center text-brand-primary">
                  <Mail size={18} />
                </div>
                <div className="text-xs">
                  <p className="font-semibold text-slate-700">Need Help?</p>
                  <p className="text-slate-500">Contact us at support@multivendor.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className='flex flex-col sm:flex-row gap-4 border-t border-slate-100 pt-8'>
            <Link href="/" className='flex-1 py-4 bg-brand-primary text-brand-secondary hover:bg-black rounded-xl flex items-center justify-center gap-2 font-bold shadow-lg transition-all duration-300'>
              <ShoppingBag size={18} />
              <span>Continue Shopping</span>
            </Link>
            <Link href="/user/profile" className='flex-1 py-4 bg-white text-slate-700 border-2 border-slate-200 hover:border-brand-primary hover:text-brand-primary rounded-xl flex items-center justify-center gap-2 font-bold transition-all duration-300'>
              <ReceiptText size={18} />
              <span>View Order History</span>
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}