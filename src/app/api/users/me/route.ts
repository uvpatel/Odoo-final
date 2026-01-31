import { NextResponse } from "next/server"
import { currentUser } from "@clerk/nextjs/server"
import { connectDB } from "@/lib/db"
import User from "@/models/User"

export async function GET() {
  try {
    // Get current user from Clerk session
    const clerkUser = await currentUser()

    if (!clerkUser) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Connect to DB
    await connectDB()

    // Find internal user by Clerk ID or email
    const user = await User.findOne({ clerkId: clerkUser.id })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Failed to fetch current user" },
      { status: 500 }
    )
  }
}
