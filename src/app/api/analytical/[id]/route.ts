import { NextResponse } from "next/server";
import { db } from "@/db/db";
import { analyticalAccounts } from "@/schema";
import { eq } from "drizzle-orm";
import { requireAdmin } from "@/lib/guard";

export async function PUT(req: Request, { params }: any) {
  await requireAdmin(req.headers);

  const body = await req.json();
  const [updated] = await db
    .update(analyticalAccounts)
    .set(body)
    .where(eq(analyticalAccounts.id, params.id))
    .returning();

  return NextResponse.json(updated);
}

export async function DELETE(req: Request, { params }: any) {
  await requireAdmin(req.headers);

  await db.delete(analyticalAccounts).where(eq(analyticalAccounts.id, params.id));
  return NextResponse.json({ success: true });
}
