import { requireAdmin } from "@/lib/guard";
import { db } from "@/db/db";
import { products } from "@/schema";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await requireAdmin(req.headers);
  return NextResponse.json(await db.select().from(products));
}

export async function POST(req: Request) {
  await requireAdmin(req.headers);
  const body = await req.json();
  const [p] = await db.insert(products).values(body).returning();
  return NextResponse.json(p);
}
