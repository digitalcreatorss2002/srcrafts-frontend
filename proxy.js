// proxy.js
import { NextResponse } from 'next/server';

// 1. Core Protected Paths
const PROTECTED_PATHS = ['/dashboard', '/profile', '/settings',];

export const config = {
  /*
   * FIX: The matcher now excludes static files.
   * This is the "Industry Standard" way to prevent images from hitting your logic.
   */
  matcher: [
    
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:jpg|jpeg|gif|png|svg|ico|webp)$).*)',
  ],
};

export function proxy(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('auth_token')?.value;


  const isProtected = PROTECTED_PATHS.some(path => 
    path === '/' ? pathname === '/' : pathname.startsWith(path)
  );

  const isLoginPage = pathname.startsWith('/login');

  // Logic 1: Auth Guard
  if (!token && isProtected) {
    return NextResponse.redirect(new URL('/user/login', request.url));
  }

  // Logic 2: Anti-Auth Guard (Logged in users shouldn't see login page)
  if (token && isLoginPage) {
    return NextResponse.next(); // Or redirect to dashboard
  }

  return NextResponse.next();
}