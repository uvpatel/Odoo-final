import { NextResponse } from "next/server";
import { db } from "@/db/db";
import { analyticalAccounts } from "@/schema";
import { requireAdmin } from "@/lib/guard";

export async function GET(req: Request) {
  await requireAdmin(req.headers);

  const data = await db.select().from(analyticalAccounts);
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  await requireAdmin(req.headers);

  const body = await req.json();
  const [created] = await db.insert(analyticalAccounts).values(body).returning();

  return NextResponse.json(created);
}
