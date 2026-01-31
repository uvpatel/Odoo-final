import { requireAdmin } from "@/lib/guard";
import { db } from "@/db/db";
import { vendors } from "@/schema";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await requireAdmin(req.headers);
  return NextResponse.json(await db.select().from(vendors));
}

export async function POST(req: Request) {
  await requireAdmin(req.headers);
  const body = await req.json();
  const [v] = await db.insert(vendors).values(body).returning();
  return NextResponse.json(v);
}
