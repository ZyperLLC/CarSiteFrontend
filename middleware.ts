import { withClerkMiddleware, getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const ONBOARDING_ROUTE = "/onboarding";
const SELLERS_ROUTE = "/sellers";
const PUBLIC_ROUTES = ["/"];
const PROTECTED_ROUTES = ["/profile", "/sellers", "/onboarding"];

function isPublicRoute(pathname: string) {
  return PUBLIC_ROUTES.some((route) => pathname.startsWith(route));
}

function isProtectedRoute(pathname: string) {
  return PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
}

type PublicMetadata = {
  onboardingComplete?: boolean;
  [key: string]: any;
};

export default withClerkMiddleware((req: NextRequest) => {
  const { userId, sessionClaims } = getAuth(req);
  const publicMetadata: PublicMetadata = sessionClaims?.publicMetadata || {};
  const url = new URL(req.url);

  // 🔒 If not logged in and trying to access a protected route → redirect to sign-in
  if (!userId && isProtectedRoute(url.pathname)) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // 🛠 If logged in but onboarding not complete → force /onboarding
  if (userId && !publicMetadata?.onboardingComplete) {
    if (url.pathname !== ONBOARDING_ROUTE) {
      return NextResponse.redirect(new URL(ONBOARDING_ROUTE, req.url));
    }
  }

  // 🚀 If onboarding is complete:
  if (userId && publicMetadata?.onboardingComplete) {
    // → Prevent access to /onboarding
    if (url.pathname === ONBOARDING_ROUTE) {
      return NextResponse.redirect(new URL(SELLERS_ROUTE, req.url));
    }
    // → Redirect root "/" to /sellers
    if (url.pathname === "/") {
      return NextResponse.redirect(new URL(SELLERS_ROUTE, req.url));
    }
  }

  // ✅ Allow access otherwise
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
