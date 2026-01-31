import { NextResponse } from "next/server";
import { db } from "@/db/db";
import { usersTable as users } from "@/schema";

export async function GET() {
    
  const result = await db.select().from(users);
  return NextResponse.json(result);
}

export async function POST(req: Request) {
  const body = await req.json();

  const result = await db.insert(users).values(body).returning();

  return NextResponse.json(result[0]);
}
