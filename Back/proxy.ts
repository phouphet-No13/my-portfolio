import { auth } from "./auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isAuthRoute = req.nextUrl.pathname.startsWith('/login');
  
  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL('/projects', req.nextUrl));
    }
    return NextResponse.next();
  }

  if (!isLoggedIn && req.nextUrl.pathname.startsWith('/projects')) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  return NextResponse.next();
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
