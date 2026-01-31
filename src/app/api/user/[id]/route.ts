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
