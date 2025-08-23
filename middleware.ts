import { withClerkMiddleware } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

const ONBOARDING_ROUTE = "/onboarding";
const PUBLIC_ROUTES = ["/"];
const PROTECTED_ROUTES = ["/profile", "/sellers"];

function isPublicRoute(pathname: string) {
  return PUBLIC_ROUTES.some(route => pathname.startsWith(route));
}

function isProtectedRoute(pathname: string) {
  return PROTECTED_ROUTES.some(route => pathname.startsWith(route));
}

import { getAuth } from "@clerk/nextjs/server";

type PublicMetadata = {
  onboardingComplete?: boolean;
  [key: string]: any;
};

export default withClerkMiddleware((req: NextRequest) => {
  const { userId, sessionClaims } = getAuth(req);
  const publicMetadata: PublicMetadata = sessionClaims?.publicMetadata || {};

  const url = new URL(req.url);

  // Allow onboarding route
  if (userId && url.pathname === ONBOARDING_ROUTE) return NextResponse.next();

  // Redirect to sign-in if not logged in and route is protected
  if (!userId && !isPublicRoute(url.pathname)) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // Redirect to onboarding if logged in but onboarding incomplete
  if (userId && !publicMetadata?.onboardingComplete) {
    return NextResponse.redirect(new URL(ONBOARDING_ROUTE, req.url));
  }

  // Allow access otherwise
  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
