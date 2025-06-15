import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verify } from 'jsonwebtoken';


// Paths that require authentication
const protectedPaths = [
  '/dashboard',
  '/profile',
  '/interview/new',
  '/interview/',
  '/feedback',
  '/goals',
  '/progress',
  '/schedule',
  '/achievements',
];

// Paths that should redirect to dashboard if already authenticated
const authPaths = [
  '/login',
  '/register',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get token from cookies
  const token = request.cookies.get('auth-token')?.value;
  
  // Check if the path requires authentication
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));
  
  // Check if the path is an auth path (login/register)
  const isAuthPath = authPaths.some(path => pathname === path);
  
  // If the path requires authentication and there's no token, redirect to login
  if (isProtectedPath && !token) {
    const url = new URL('/login', request.url);
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }
  
  // If the path is an auth path and there's a valid token, redirect to dashboard
  if (isAuthPath && token) {
    try {
      // Verify token
      verify(token, process.env.JWT_SECRET as string);
      return NextResponse.redirect(new URL('/dashboard', request.url));
    } catch (error) {
      // Token is invalid, continue to auth page
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};