import { NextRequest , NextResponse } from "next/server";


import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    await connectDB();
    const user = await User.findOne
        ({ email });        

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }   

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process
        .env.JWT_SECRET_KEY as string,
      { expiresIn: "7d" }
    );      

    return NextResponse.json(
        { message: "Login successful", token, role: user.role },
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

