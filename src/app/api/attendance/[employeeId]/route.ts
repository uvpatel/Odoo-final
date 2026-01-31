// import { NextResponse } from "next/server"
// import { connectDB } from "@/lib/db"
// import Attendance from "@/models/Attendance"

// export async function GET(
//   request: Request,
//   context: { params: Promise<{ employeeId: string }> }
// ) {
//   try {
//     const { employeeId } = await context.params

//     await connectDB()

//     const attendance = await Attendance.find({
//       employeeId,
//     }).sort({ date: -1 })

//     return NextResponse.json(attendance)
//   } catch (error) {
//     console.error(error)
//     return NextResponse.json(
//       { error: "Failed to fetch attendance" },
//       { status: 500 }
//     )
//   }
// }


// app/api/attendance/[id]/route.ts
import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Attendance from "@/models/Attendance"
import { getCurrentUser } from "@/lib/auth"

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser(req)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    await connectDB()

    const body = await req.json()

    const attendance = await Attendance.findOneAndUpdate(
      {
        _id: id,
        employeeId: user.id,
      },
      {
        checkOut: body.checkOut || new Date(),
        $setOnInsert: { status: "present" }
      },
      { new: true, runValidators: true }
    )

    if (!attendance) {
      return NextResponse.json({ error: "Attendance record not found" }, { status: 404 })
    }

    return NextResponse.json(attendance)
  } catch (error) {
    console.error("PATCH /api/attendance/[id] error:", error)
    return NextResponse.json(
      { error: "Failed to update attendance" },
      { status: 500 }
    )
  }
}