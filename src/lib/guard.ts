// lib/guard.ts
import { auth } from "@clerk/nextjs/server";

export async function requireAdmin() {
  const { userId, sessionClaims } = await auth();

  if (!userId) {
    throw new Error("Unauthorized: Not authenticated");
  }

  // Check if user has admin role in Clerk metadata
  const role = sessionClaims?.metadata?.role || sessionClaims?.publicMetadata?.role;

  console.log("User ID:", userId);
  console.log("User role:", role);

  if (role !== "ADMIN") {
    throw new Error("Forbidden: Admin access required");
  }

  return { userId, role };
}