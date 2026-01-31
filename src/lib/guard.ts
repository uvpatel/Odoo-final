import { auth } from "@/lib/auth";

export async function requireAdmin(headers: Headers) {
  const session = await auth.api.getSession({ headers });

  if (!session) throw new Error("Unauthorized");
  if (session.user.role !== "ADMIN") throw new Error("Forbidden");

  return session;
}
