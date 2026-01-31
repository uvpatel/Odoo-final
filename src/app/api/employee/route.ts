import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Employee from "@/models/Employee"

// GET all employees
export async function GET() {
  try {
    await connectDB()

    const employees = await Employee.find().sort({ createdAt: -1 })

    return NextResponse.json(employees)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Failed to fetch employees" },
      { status: 500 }
    )
  }
}

// CREATE employee
export async function POST(request: Request) {
  try {
    const body = await request.json()

    await connectDB()

    const employee = await Employee.create(body)

    return NextResponse.json(employee, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Failed to create employee" },
      { status: 500 }
    )
  }
}
