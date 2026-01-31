import { NextResponse } from "next/server";
import { db } from "@/db/db";
import { budgets } from "@/schema/budget";
import { eq } from "drizzle-orm";
import { requireAdmin } from "@/lib/guard";

export async function PUT(req: Request, { params }: any) {
  await requireAdmin(req.headers);

  const body = await req.json();
  const [updated] = await db
    .update(budgets)
    .set(body)
    .where(eq(budgets.id, params.id))
    .returning();

  return NextResponse.json(updated);
}

export async function DELETE(req: Request, { params }: any) {
  await requireAdmin(req.headers);

  await db.delete(budgets).where(eq(budgets.id, params.id));
  return NextResponse.json({ success: true });
}
