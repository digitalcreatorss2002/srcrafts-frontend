// components/Menu/layouts/MobileMenu.jsx
import { useState } from 'react';
import Link from 'next/link';

const MobileMenu = ({ items, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden fixed inset-0 bg-white z-100000000000000 overflow-y-auto p-6 ">
      <ul className="space-y-6">
        {items.map((item) => (
          <li key={item._id} className=" pb-4">
            <Link href={item.url || "#"} className="text-xl font-bold uppercase">{item.title}</Link>
            <div className="mt-4 ml-4 space-y-3">
              {item.children?.map((child) => (
                <Link key={child._id} href={child.url || "#"} className="block text-gray-600">
                  {child.title}
                </Link>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MobileMenu;