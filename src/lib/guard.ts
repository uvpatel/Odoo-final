// lib/guard.ts
import { auth } from "@clerk/nextjs/server";

export async function requireAdmin() {
  const { userId, sessionClaims } = await auth();

  if (!userId) {
    throw new Error("Unauthorized: Not authenticated");
  }

  // Check if user has admin role in Clerk metadata
  // We cast to any to avoid "Property 'role' does not exist on type '{}'" if Clerk augmentation is not picked up
  const role = (sessionClaims?.metadata as any)?.role || (sessionClaims?.publicMetadata as any)?.role;

  console.log("User ID:", userId);
  console.log("User role:", role);

  if (role !== "ADMIN") {
    throw new Error("Forbidden: Admin access required");
  }

  return { userId, role };
}