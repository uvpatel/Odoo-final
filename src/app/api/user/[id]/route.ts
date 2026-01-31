import { NextResponse } from "next/server";
import { db } from "@/db/db";
import { usersTable } from "@/schema";
import { eq } from "drizzle-orm";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const userId = Number(id);

  if (Number.isNaN(userId)) {
    return NextResponse.json({ error: "Invalid user id" }, { status: 400 });
  }

  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, userId));

  return NextResponse.json(user[0] ?? null);
}
