import { withClerkMiddleware, getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const ONBOARDING_ROUTE = "/onboarding";
const SELLERS_ROUTE = "/sellers";
const PUBLIC_ROUTES = ["/", "/sign-in", "/sign-up"];
const PROTECTED_ROUTES = ["/profile", "/sellers", "/onboarding"];

type PublicMetadata = {
  onboardingComplete?: boolean;
  [key: string]: any;
};

function isPublicRoute(pathname: string) {
  return PUBLIC_ROUTES.some((route) => pathname === route);
}

function isProtectedRoute(pathname: string) {
  return PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
}

export default withClerkMiddleware((req: NextRequest) => {
  const { userId, sessionClaims } = getAuth(req);
  const publicMetadata: PublicMetadata = sessionClaims?.publicMetadata || {};
  const url = new URL(req.url);
  const pathname = url.pathname;

  // 🔒 Not logged in → block protected routes
  if (!userId && isProtectedRoute(pathname)) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // 🛠 Logged in but onboarding not complete
  if (userId && !publicMetadata?.onboardingComplete) {
    // allow user to stay on onboarding
    if (pathname !== ONBOARDING_ROUTE) {
      return NextResponse.redirect(new URL(ONBOARDING_ROUTE, req.url));
    }
    return NextResponse.next();
  }

  // 🚀 Logged in + onboarding complete
  if (userId && publicMetadata?.onboardingComplete) {
    // prevent access to onboarding again
    if (pathname === ONBOARDING_ROUTE) {
      return NextResponse.redirect(new URL(SELLERS_ROUTE, req.url));
    }
    // root → sellers
    if (pathname === "/") {
      return NextResponse.redirect(new URL(SELLERS_ROUTE, req.url));
    }
  }

  // ✅ otherwise allow
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
