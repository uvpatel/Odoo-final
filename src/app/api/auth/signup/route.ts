import { NextResponse , NextRequest } from "next/server";

import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
    try {
    const { name, email, password, role } = await request.json();

    await connectDB();

    const existingUser = await User.find
        ({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    const token = jwt.sign(
        { userId: newUser._id, role: newUser.role },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: "7d" }
      );
    return NextResponse.json(
        { message: "User registered successfully", token, role: newUser.role },
        { status: 201 }
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