//  // GET (Admin), POST// app/api/attendance/route.ts
// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/db";
// import Attendance from "@/models/Attendance";
// import { requireAuth } from "@/lib/auth";

// export async function POST(req: Request) {
//   const user = await requireAuth(req);
//   await connectDB();

//   const body = await req.json();

//   const attendance = await Attendance.create({
//     employeeId: body.employeeId,
//     date: new Date(),
//     checkIn: body.checkIn,
//     status: "PRESENT",
//   });

//   return NextResponse.json(attendance);
// }


// app/api/attendance/route.ts
import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Attendance from "@/models/Attendance"
import { getCurrentUser } from "@/lib/auth" // better than requireAuth for GET

export async function GET(req: Request) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    // For regular employee → show only own records
    // For admin/HR → maybe add query param ?employeeId=xxx
    const { searchParams } = new URL(req.url)
    const employeeId = searchParams.get("employeeId") || user.id

    // Optional: add date range filtering
    const from = searchParams.get("from")
    const to = searchParams.get("to")

    const query: any = { employeeId }

    if (from) query.date = { $gte: new Date(from) }
    if (to) {
      if (query.date) query.date.$lte = new Date(to)
      else query.date = { $lte: new Date(to) }
    }

    const records = await Attendance.find(query)
      .sort({ date: -1 })
      .limit(90) // roughly 3 months

    return NextResponse.json(records)
  } catch (error) {
    console.error("GET /api/attendance error:", error)
    return NextResponse.json(
      { error: "Failed to fetch attendance records" },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const body = await req.json()

    // You might want to validate that same day check-in doesn't exist already
    const existing = await Attendance.findOne({
      employeeId: user.id,
      date: {
        $gte: new Date().setHours(0, 0, 0, 0),
        $lt: new Date().setHours(23, 59, 59, 999)
      }
    })

    if (existing?.checkIn) {
      return NextResponse.json(
        { error: "Already checked in today" },
        { status: 400 }
      )
    }

    const attendance = await Attendance.create({
      employeeId: user.id,
      date: new Date(),
      checkIn: body.checkIn || new Date(),
      checkOut: null,
      status: "present",
      location: body.location,           // optional
      deviceInfo: body.deviceInfo,       // optional
      late: body.late || false,
    })

    return NextResponse.json(attendance, { status: 201 })
  } catch (error) {
    console.error("POST /api/attendance error:", error)
    return NextResponse.json(
      { error: "Failed to record attendance" },
      { status: 500 }
    )
  }
}