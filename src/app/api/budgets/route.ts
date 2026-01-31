import { NextResponse } from "next/server";
import { db } from "@/db/db";
import { budgets } from "@/schema/budget";
import { requireAdmin } from "@/lib/guard";

export async function GET(req: Request) {
  await requireAdmin(req.headers);
  return NextResponse.json(await db.select().from(budgets));
}

export async function POST(req: Request) {
  await requireAdmin(req.headers);

  const body = await req.json();
  const [created] = await db.insert(budgets).values(body).returning();

  return NextResponse.json(created);
}
