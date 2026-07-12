// components/Menu/MenuUtils.js
import Link from 'next/link';

export const NavLink = ({ item, children, className }) => {
  if (item.url) {
    return (
      <Link href={item.url} className={className}>
        {children}
      </Link>
    );
  }
  return <span className={className}>{children}</span>;
};