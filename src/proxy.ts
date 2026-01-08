import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

/**
 * Public routes that don't require authentication
 */
const publicRoutes = ["/", "/top", "/user/login", "/user/register"];

/**
 * Routes that should redirect to home if already authenticated
 */
const authRoutes = ["/user/login", "/user/register"];

/**
 * Protected routes that require authentication
 */
const protectedRoutes = ["/settings"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAuthenticated = !!token;
  const isAuthRoute = authRoutes.includes(pathname);
  const isProtectedRoute = protectedRoutes.includes(pathname);

  // If authenticated and trying to access auth routes (login/register), redirect to home
  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If not authenticated and trying to access protected routes, redirect to home with message
  if (!isAuthenticated && isProtectedRoute) {
    const homeUrl = new URL("/", request.url);
    homeUrl.searchParams.set("authRequired", "true");
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api routes (handled separately)
     */
    "/((?!_next/static|_next/image|favicon.ico|api).*)",
  ],
};
