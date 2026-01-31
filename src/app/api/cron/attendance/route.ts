import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Attendance from "@/models/Attendance";
import Employee from "@/models/Employee";
import Leave from "@/models/Leave";

export async function GET() {
  await connectDB();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const employees = await Employee.find();

  for (const emp of employees) {
    // Skip if leave exists
    const leave = await Leave.findOne({
      employeeId: emp._id,
      startDate: { $lte: today },
      endDate: { $gte: today },
      status: "APPROVED",
    });

    if (leave) {
      await Attendance.create({
        employeeId: emp._id,
        date: today,
        status: "LEAVE",
      });
      continue;
    }

    const attendance = await Attendance.findOne({
      employeeId: emp._id,
      date: today,
    });

    if (!attendance) {
      await Attendance.create({
        employeeId: emp._id,
        date: today,
        status: "ABSENT",
      });
    } else if (attendance.checkIn && !attendance.checkOut) {
      attendance.status = "HALF_DAY";
      await attendance.save();
    }
  }

  return NextResponse.json({ success: true });
}
