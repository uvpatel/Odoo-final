import { NextResponse } from "next/server";
import { db } from "@/db/db";
import { users } from "@/schema";
import { eq } from "drizzle-orm";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, id));

  return NextResponse.json(user[0] ?? null);
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  const result = await db
    .update(users)
    .set(body)
    .where(eq(users.id, id))
    .returning();

  return NextResponse.json(result[0]);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const result = await db
    .delete(users)
    .where(eq(users.id, id))
    .returning();

  return NextResponse.json(result[0]);
}
