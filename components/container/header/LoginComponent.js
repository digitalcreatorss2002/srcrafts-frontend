'use client';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { syncCartFromStorage, selectCartItemCount } from '@/redux/cart/cartSlice';
import SearchBar from './SearchBar';
import { User, LogOut, LayoutDashboard, Headset, ShoppingBag, ShieldCheck,UserCircle, ChevronDown, ArrowRight, Package, ShoppingCartIcon, HeartPlus } from 'lucide-react';
import Link from 'next/link';

function HeaderLoginComponent() {
  const [hover, setHover] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // Destructuring as per your state structure
  const user = useSelector((state) => state?.user?.user ?? null);
  const cartItemCount = useSelector((state) => 
  selectCartItemCount(state ?? {})
) ?? 0;
  const dispatch = useDispatch();

  useEffect(() => {
    setIsMounted(true);
    dispatch(syncCartFromStorage());
  }, [dispatch]);

  if (!isMounted) return <div className="w-1/2 h-16" />; // Prevent Hydration Jitter

  return (
    <div className=' flex items-center justify-end space-x-6  w-1/2 px-2 md:px-0 h-16'>
      <SearchBar />

      <div className='flex items-center space-x-6'>
        {/* Step 1: Logic Switch - User vs Guest */}
        <div 
          className='relative py-2 hidden md:flex flex-wrap'
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {user ? (
            <UserMenu user={user} hover={hover} />
          ) : (
            <GuestMenu hover={hover} />
          )}
        </div>

        {/* Step 2: Shared Action Icons (Cart/Wishlist) */}
        <ActionIcons cartCount={cartItemCount} isMounted={isMounted} />
      </div>
    </div>
  );
}

export default HeaderLoginComponent;



const GuestMenu = ({ hover }) => (
  <>
    <Link href="/user/login" className='flex items-center gap-2 group cursor-pointer'>
      <UserCircle className='text-white group-hover:text-brand-secondary transition-colors' size={24} />
      <div className=' items-center flex'>
        <span className='text-sm font-bold text-white'>Login</span>
        <ChevronDown size={16} className={`text-white transition-transform duration-200 ${hover ? 'rotate-180' : ''}`} />
      </div>
    </Link>

    {hover && (
      <div className='absolute top-full right-0 pt-2 z-50 animate-in fade-in zoom-in-95 duration-200'>
        <div className='bg-white border border-slate-200 shadow-lg rounded-md w-64 overflow-hidden'>
          <Link href='/user/register' className='flex items-center justify-between p-4 bg-slate-50/50 hover:bg-white border-b border-slate-100 group transition-colors'>
            <div className='flex flex-col text-left'>
              <span className='text-[10px] uppercase tracking-widest text-slate-400 font-bold'>New Customer?</span>
              <span className='font-bold text-brand-primary group-hover:text-brand-secondary'>Create Account</span>
            </div>
            <ArrowRight size={16} className="text-brand-secondary" />
          </Link>
          <Link href='/vendor/register' className='flex items-center gap-3 p-4 hover:bg-slate-50 text-brand-primary'>
            <Package size={18} className="text-slate-400" />
            <span className='font-bold text-sm'>Become a Seller</span>
          </Link>
        </div>
      </div>
    )}
  </>
);



import { logoutRequest } from '@/modules/user/state/userSlice';

const UserMenu = ({ user, hover }) => {
  const dispatch = useDispatch();
  
  const handleLogout = () => {
    dispatch(logoutRequest());
    window.location.href = '/'; 
  };

  return (
    <>
      <div className='flex items-center gap-2 group cursor-pointer'>
        <div className="w-8 h-8 rounded-md bg-brand-secondary flex items-center justify-center text-brand-primary font-bold border border-white/20">
          {user.name?.charAt(0).toUpperCase()}
        </div>
        <div className=' items-center flex'>
          <span className='text-sm font-bold text-white max-w-80px truncate'>{user.name}</span>
          <ChevronDown size={16} className={`text-white transition-transform duration-200 ${hover ? 'rotate-180' : ''}`} />
        </div>
      </div>

      {hover && (
        <div className='absolute top-full right-0 pt-2 z-50 animate-in fade-in zoom-in-95 duration-200'>
          <div className='bg-white border border-slate-200 shadow-xl rounded-md w-60 overflow-hidden'>
            <div className='p-4 bg-brand-primary text-white'>
              <p className='text-[10px] opacity-70 uppercase font-bold tracking-widest'>Verified Account</p>
              <p className='text-xs font-medium truncate opacity-90'>{user.email}</p>
            </div>
            
            <div className='p-1 flex flex-col'>
              <DropdownItem href="/user/profile" icon={<User size={16}/>} label="My Profile" />
              <DropdownItem href="/user/profile?tab=orders" icon={<ShoppingBag size={16}/>} label="Orders" />
              <DropdownItem href="/contact" icon={<Headset size={16}/>} label="Support" />
              <div className="h-1px bg-slate-100 my-1" />
              <DropdownItem href="/vendor/dashboard" icon={<ShieldCheck size={16}/>} label="Seller Portal" />
            </div>

            <button 
              onClick={handleLogout}
              className='w-full flex items-center gap-3 p-3 hover:bg-rose-50 text-rose-600 transition-colors border-t border-slate-100 font-bold text-xs'
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
};

// Helper internal component for clean code
const DropdownItem = ({ href, icon, label }) => (
  <Link href={href} className='flex items-center gap-3 p-3 hover:bg-slate-50 text-brand-primary text-sm font-semibold transition-colors rounded-md'>
    <span className='text-slate-400'>{icon}</span>
    {label}
  </Link>
);


 function ActionIcons({ cartCount, isMounted }) {
  // Wishlist count can be connected to Redux later, hardcoding for now as per your snippet
  const wishListItemCount = 0; 

  return (
    <div className='flex items-center md:space-x-0'>
      {/* Wishlist Link */}
      <Link 
        href='/wishlist' 
        className='relative group md:p-2 rounded-md hover:bg-white/10 transition-all duration-200'
      >
        <HeartPlus 
          className='text-white group-hover:text-brand-secondary transition-colors' 
          size={22} 
          strokeWidth={2}
        />
        
        {isMounted && (
          <span className={`absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center bg-rose-500 text-white text-[10px] font-bold rounded-full border-2 border-brand-primary animate-in fade-in zoom-in ${wishListItemCount === 0 ? 'opacity-0' : 'opacity-100'}`}>
            {wishListItemCount}
          </span>
        )}
      </Link>

      {/* Cart Link */}
      <Link 
        href='/cart' 
        className='relative group md:p-2 ml-3 rounded-md hover:bg-white/10 transition-all duration-200'
      >
        <ShoppingCartIcon 
          className='text-white group-hover:text-brand-secondary transition-colors' 
          size={22} 
          strokeWidth={2}
        />
        
        {isMounted && (
          <span className={`absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center bg-brand-secondary text-brand-primary text-[10px] font-black rounded-full border-2 border-brand-primary animate-in fade-in zoom-in ${cartCount === 0 ? 'opacity-0' : 'opacity-100'}`}>
            {cartCount}
          </span>
        )}
      </Link>

    </div>
  );
}