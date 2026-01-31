// src/middleware.ts
import { clerkMiddleware } from "@clerk/nextjs/server";

// Run Clerk middleware on all routes except static files
export default clerkMiddleware({
  // Optional: you can customize your redirect behavior here
  // afterSignInUrl: "/dashboard",
  // afterSignOutUrl: "/",
});

export const config = {
  // matcher tells Next.js which routes to run middleware on
  matcher: [
    // Match all routes except Next.js internals and static assets
    "/((?!_next/static|_next/image|favicon.ico|sw.js|robots.txt).*)",
    "/api/(.*)", // Run middleware on all API routes
  ],
};
