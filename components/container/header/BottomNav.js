'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { 
  Home, 
  Search,
  ShoppingCart, 
  User, 
  Blocks
} from 'lucide-react';
import { selectCartItemCount } from '@/redux/cart/cartSlice';

// --- Types & Constants (Open/Closed Principle) ---


export default function BottomNav() {
  const pathname = usePathname();
  const cartItemCount = useSelector(selectCartItemCount);
  const { user } = useSelector((state) => state.user);
  const [mounted, setMounted] = useState(false);
  
  const firstName = mounted && user?.name ? user.name.split(' ')[0] : 'Login';
  const profileHref = mounted && user ? "/profile" : "/user/login";

  useEffect(()=>{
    setMounted(true);
  },[])
  // Configuration array makes it easy to add/remove items without changing JSX
  const navigationItems = useMemo(() => [
    { label: 'Home', href: '/', icon: Home },
    {label:'Categories', icon:Blocks},
    { label: 'Search', icon:Search, strokeWidth:4 },
    { label: 'Cart', href: '/cart', icon: ShoppingCart, badgeCount: cartItemCount },
    { label: firstName, href: profileHref, icon: User },
  ], [cartItemCount, firstName, profileHref]);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-100 md:hidden">
      {/* Frosted Glass Effect Container */}
      <div className="bg-white backdrop-blur-lg border-t border-gray-100 px-4 ">
        <div className="flex justify-around h-20 max-w-md mx-auto">
          {navigationItems.map((item) => {
            const active = pathname === item.href;
            const baseStrokeWidth = item?.strokeWidth ?? 1.5;
            
            if(item?.href)
            {
                return (
                    <Link 
                      key={item.label} 
                      href={item.href}
                      className="relative flex flex-col items-center justify-center flex-1 group transition-all duration-300"
                    >
                      
                      {/* Active Indicator Dot */}
                      {active && (
                        <motion.div 
                          layoutId="nav-indicator"
                          className="absolute -top-1 w-1 h-1 rounded-full bg-brand-secondary" 
                        />
                      )}
      
                      <div className={`relative p-1 transition-transform active:scale-90 ${
                        active ? 'text-brand-secondary' : 'text-brand-primary'
                      }`}>
                        <item.icon
                          size={22}
                          strokeWidth={active ? baseStrokeWidth + 1 : baseStrokeWidth}
                        />
      
                      

                        {mounted && typeof item.badgeCount === "number" && (
                          <span className="absolute -top-2 -right-2 bg-rose-500 text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                            {item.badgeCount > 99 ? '99+' : item.badgeCount??0}
                          </span>
                        )}
                      </div>
                          
                      <span className={`text-[10px]  font-semibold transition-colors text-center  ${
                        active ? 'text-brand-secondary' : 'text-brand-primary'
                      }`}>
                        {item.label}
                      </span>
                    </Link>
                  );
            }
            else{
                return (
                    <div
                      key={item.label} 
                      className="relative flex flex-col items-center justify-center flex-1 group transition-all duration-300"
                    >
                      {/* Active Indicator Dot */}
                      {active && (
                        <motion.div 
                          layoutId="nav-indicator"
                          className="absolute -top-1 w-1 h-1 rounded-full bg-[var(--color-brand-secondary)]" 
                        />
                      )}
      
                      <div className={`relative p-1 transition-transform active:scale-90 ${
                        active ? 'text-brand-secondary' : 'text-brand-primary'
                      }`}>
                        <item.icon
                          size={22}
                          strokeWidth={active ? baseStrokeWidth + 1 : baseStrokeWidth}
                        />
      
                        {/* Enhanced Badge System */}
                        {item.badgeCount !== undefined && item.badgeCount > 0 && (
                          <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-rose-500 px-1 text-[9px] font-bold text-white ring-2 ring-white">
                            {item.badgeCount > 99 ? '99+' : item.badgeCount}
                          </span>
                        )}
                      </div>
                          
                      <span className={`text-[10px]  font-semibold transition-colors text-center  w-full  ${
                        active ? 'text-brand-secondary' : 'text-brand-primary'
                      }`}>
                        {item.label}
                      </span>
                    </div>
                  );
            }
          })}
        </div>
      </div>
    </nav>
  );
}