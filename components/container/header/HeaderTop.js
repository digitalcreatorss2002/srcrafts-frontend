// components/HeaderTop.js
"use client"
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
const  HeaderLoginComponent = dynamic(()=> import('./LoginComponent'),{ssr:false});

const HeaderTop = () => {
  return (
    <div className=" bg-premium-dark text-white p-1 md:p-3 shadow-md w-full">
      <div className="max-w-7xl mx-auto flex flex-row items-center justify-between gap-y-4">

        {/* Left: Logo */}
        <div className=" flex items-center  md:space-x-2">
          <Link href="/" className="flex items-center">
            <Image
              src="/image/logo/logo3.png"
              alt="CraftCreation Logo"
              width={120}
              height={50}
              className="object-contain hidden md:flex"
              priority
            />
            <Image
              src="/image/logo/logo3.png"
              alt="CraftCreation Logo"
              width={80}
              height={50}
              className="object-contain md:hidden"
              priority
            />
          </Link>
        </div>

          
        {/* Right: User / Cart / Wishlist */}
        <HeaderLoginComponent/>

      </div>
    </div>
  );
};

export default HeaderTop;
