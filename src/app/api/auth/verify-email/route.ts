import { NextRequest,NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");
    if (!token) {
        return NextResponse.json(
        { error: "Invalid or missing token" },
        { status: 400 }
      );
    }
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    ) as { userId: string };
    await connectDB();
    const user = await User.findById(decoded.userId);
    if (!user) {
        return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }
    user.isVerified = true;
    await user.save();
    return NextResponse.json(
      { message: "Email verified successfully" },
      { status: 200 }
    );
  }
    catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}