// app/dashboard/payroll/page.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  DollarSign,
  Calendar,
  Download,
  FileText,
  TrendingUp,
  Clock,
  AlertCircle,
} from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import data from "../../data.json"
import SidebarWrapper from "@/components/shared/Sidebar/sidebarwrapper"

const currentPayslip = {
  period: "January 2026",
  gross: 92500,
  deductions: 14820,
  netPay: 77680,
  status: "processed",
  payoutDate: "31 Jan 2026",
}


export default function PayrollPage() {
  // Mock data - in real app → fetch from API / server component
  
  return (
    <SidebarWrapper>


       
    <div className="container mx-auto py-6 px-4 md:px-6 space-y-8">
      {/* Header */}
      <Header />

      {/* Current Month Summary */}
     <CurrentMonthSummary />

      {/* Salary Breakdown */}
      <SalaryBreakdown />

      {/* Payment History */}
     <PaymentHistory />

      {/* Quick Stats */}
      <QuickStats />
    </div>
    </SidebarWrapper>
    
  )
}



function QuickStats(){
  return(
    <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">YTD Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹9,84,320</div>
            <p className="text-xs text-muted-foreground">Apr 2025 - Jan 2026</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tax Deducted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rose-600">₹68,450</div>
            <p className="text-xs text-muted-foreground">This financial year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Next Payday</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">31 Jan 2026</div>
            <p className="text-xs text-muted-foreground">In 18 days</p>
          </CardContent>
        </Card>
      </div>
  )
}

function Header() {
  return(
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payroll</h1>
          <p className="text-muted-foreground">
            View your salary details, payslips and payment history
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download Form 16
          </Button>
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            View Latest Payslip
          </Button>
        </div>
      </div>
  )
}

function PaymentHistory() {
  const recentPayslips = [
    { month: "Dec 2025", netPay: 76850, status: "paid", date: "31 Dec 2025" },
    { month: "Nov 2025", netPay: 78240, status: "paid", date: "30 Nov 2025" },
    { month: "Oct 2025", netPay: 77500, status: "paid", date: "31 Oct 2025" },
    { month: "Sep 2025", netPay: 81000, status: "paid", date: "30 Sep 2025" },
  ]
  return(
    <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0">
      <div>
        <CardTitle>Payment History</CardTitle>
        <CardDescription>Last 6 months</CardDescription>
      </div>
      <Button variant="outline" size="sm">
        <Download className="mr-2 h-4 w-4" />
        Export CSV
      </Button>
    </CardHeader>
    <CardContent>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Month</TableHead>
              <TableHead>Net Pay</TableHead>
              <TableHead>Payout Date</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentPayslips.map((slip) => (
              <TableRow key={slip.month}>
                <TableCell className="font-medium">{slip.month}</TableCell>
                <TableCell>₹{slip.netPay.toLocaleString("en-IN")}</TableCell>
                <TableCell>{slip.date}</TableCell>
                <TableCell className="text-right">
                  <Badge className="bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20 border-emerald-500/30">
                    Paid
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </CardContent>
  </Card>
  )
}

function CurrentMonthSummary() {
 
  return(
    <Card className="border-emerald-200 bg-emerald-50/30 dark:bg-emerald-950/20">
    <CardHeader className="pb-4">
      <div className="flex items-center justify-between">
        <div>
          <CardTitle className="text-xl">January 2026 Salary</CardTitle>
          <CardDescription>Payout on 31st January 2026</CardDescription>
        </div>
        <Badge
          variant="outline"
          className="text-lg px-4 py-1.5 bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-900 dark:text-emerald-300 dark:border-emerald-700"
        >
          ₹{currentPayslip.netPay.toLocaleString("en-IN")}
        </Badge>
      </div>
    </CardHeader>
    <CardContent>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Gross Pay</p>
          <p className="text-2xl font-bold">
            ₹{currentPayslip.gross.toLocaleString("en-IN")}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Deductions</p>
          <p className="text-2xl font-bold text-rose-600">
            ₹{currentPayslip.deductions.toLocaleString("en-IN")}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Net Pay</p>
          <p className="text-2xl font-bold text-emerald-600">
            ₹{currentPayslip.netPay.toLocaleString("en-IN")}
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
  )
}


function SalaryBreakdown() {
  const salaryBreakdown = [
    { label: "Basic Salary", amount: 52000, type: "earning" },
    { label: "HRA", amount: 20800, type: "earning" },
    { label: "Special Allowance", amount: 14000, type: "earning" },
    { label: "Performance Bonus", amount: 5700, type: "earning" },
    { label: "PF Contribution", amount: -6240, type: "deduction" },
    { label: "Professional Tax", amount: -200, type: "deduction" },
    { label: "Income Tax", amount: -7380, type: "deduction" },
    { label: "Insurance", amount: -1000, type: "deduction" },
  ]
  

  return(
    <Card>
        <CardHeader>
          <CardTitle>Salary Breakdown - January 2026</CardTitle>
          <CardDescription>Component wise details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {salaryBreakdown.map((item, i) => (
              <div key={i} className="flex justify-between items-center py-1">
                <div className="flex items-center gap-3">
                  {item.type === "earning" ? (
                    <TrendingUp className="h-4 w-4 text-emerald-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-rose-600" />
                  )}
                  <span>{item.label}</span>
                </div>
                <span
                  className={
                    item.type === "earning"
                      ? "font-medium text-emerald-600"
                      : "font-medium text-rose-600"
                  }
                >
                  {item.type === "earning" ? "+" : "-"}₹
                  {Math.abs(item.amount).toLocaleString("en-IN")}
                </span>
              </div>
            ))}
            <div className="border-t pt-4 mt-2">
              <div className="flex justify-between font-bold text-lg">
                <span>Net Salary</span>
                <span className="text-emerald-600">
                  ₹{currentPayslip.netPay.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
  )
}