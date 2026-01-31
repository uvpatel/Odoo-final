// app/api/user/route.ts
import { requireAdmin } from "@/lib/guard";
import { db } from "@/db/db";
import { users } from "@/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // No need to pass headers with Clerk
    await requireAdmin();
    
    const allUsers = await db.select().from(users);
    return NextResponse.json(allUsers);
    
  } catch (error: any) {
    console.error("Error in GET /api/user:", error);
    
    if (error.message.includes("Unauthorized")) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }
    
    if (error.message.includes("Forbidden")) {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }
    
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}