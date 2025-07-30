import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/auth(.*)",        // ✅ already handles /auth/individual, /auth/dealer
    "/about",
    "/help",
    "/browse",
    "/dealers",
    "/select",
    "/sign-in",         // ✅ MUST ADD this
    "/sign-up",         // ✅ Recommended to add as well
  ],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)"], // don't change this
};
