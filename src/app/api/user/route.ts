// app/api/user/route.ts
import { requireAdmin } from "@/lib/guard";
import { db } from "@/db/db";
import { users } from "@/schema";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    // Check admin authentication
    await requireAdmin(req.headers);
    
    // Query database
    const allUsers = await db.select().from(users);
    
    return NextResponse.json(allUsers);
  } catch (error: any) {
    console.error("Error in GET /api/user:", error);
    
    // Return specific error messages
    if (error.message?.includes("Unauthorized") || error.message?.includes("admin")) {
      return NextResponse.json(
        { error: "Unauthorized: Admin access required" },
        { status: 403 }
      );
    }
    
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}