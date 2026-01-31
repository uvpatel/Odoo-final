// GET, PUT, DELETE
import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Employee from "@/models/Employee"

// GET employee by ID
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params

    await connectDB()

    const employee = await Employee.findById(id)

    if (!employee) {
      return NextResponse.json(
        { error: "Employee not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(employee)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Failed to fetch employee" },
      { status: 500 }
    )
  }
}
