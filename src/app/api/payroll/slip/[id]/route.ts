import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Payroll from "@/models/Payroll"
import Employee from "@/models/Employee"
import { generateSalarySlip } from "@/lib/salarySlip"

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params

    await connectDB()

    const payroll = await Payroll.findById(id)
    if (!payroll) {
      return NextResponse.json({ error: "Payroll not found" }, { status: 404 })
    }

    const employee = await Employee.findById(payroll.employeeId)
    if (!employee) {
      return NextResponse.json({ error: "Employee not found" }, { status: 404 })
    }

    // ⬇️ PDF generation
    const pdfBytes = await generateSalarySlip(payroll, employee)

    // ✅ FIX HERE
    const pdfBuffer = Buffer.from(pdfBytes)

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=salary-slip-${payroll.month}.pdf`,
      },
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Failed to generate salary slip" },
      { status: 500 }
    )
  }
}
