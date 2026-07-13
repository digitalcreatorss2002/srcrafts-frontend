// components/HeaderNav.js (Server Component - Remove 'use client')
import { Suspense } from 'react';
import MenuController from '@/modules/menu/components/MenuController';
import Section from '../genericContainer/Section';
import BottomNav from './BottomNav';

export default function HeaderNav() {
  return (
    <div>
      <div className='hidden md:block '>
          <header className="relative bg-white pt-4 pb-0">
            <div className="w-full flex items-center px-2">
              {/* We wrap the data-fetching part in Suspense to satisfy the build worker */}
              <Suspense fallback={<div className="h-10 w-full bg-gray-100 animate-pulse" />}>
                <MenuController slug="header_menu" />
              </Suspense>
            </div>
          </header>
      </div>  
      <div className='md-hidden'>
        <Suspense fallback={<div className="h-10 w-full bg-gray-100 animate-pulse" />}>
          <BottomNav slug="header_menu" />
        </Suspense>
      </div>
    </div>
  );
}