// components/Header.js

import HeaderTop from './HeaderTop';
import HeaderNav from './HeaderNav';
import { Suspense } from 'react';

const Header = () => {
  console.log("Header Mount");
  return (
   <>
    <header className="flex flex-col justify-center sticky top-0 z-50">
    <Suspense fallback={<div className="h-20 bg-brand-primary animate-pulse" />}>
        <HeaderTop />
    </Suspense>
      <HeaderNav />
    </header>
    </>
  );
};

export default Header;