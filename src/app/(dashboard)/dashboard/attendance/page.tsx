// app/dashboard/attendance/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Download
} from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"



import { SiteHeader } from "@/components/site-header"

import SidebarWrapper from "@/components/shared/Sidebar/sidebarwrapper"

export default function AttendancePage() {


  return (
    <SidebarWrapper>


   
    
    <div className="container mx-auto py-6 px-4 md:px-6 space-y-8">
      <Header />

      {/* Stats Cards */}

      <StatsCards />

      {/* Attendance History */}
      <AttendanceHistory />
    </div>
    </SidebarWrapper>

    
  )
}


function Header() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Attendance</h1>
        <p className="text-muted-foreground">
          Track your daily check-in/check-out and attendance history
        </p>
      </div>
      <div className="flex gap-3">
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
        <Button>Mark Attendance</Button>
      </div>
    </div>
  )
}


function AttendanceHistory() {
  const mockAttendance = [
    { date: "2025-01-10", checkIn: "09:02", checkOut: "18:15", status: "present", late: true },
    { date: "2025-01-09", checkIn: "08:55", checkOut: "18:10", status: "present", late: false },
    { date: "2025-01-08", checkIn: "-", checkOut: "-", status: "absent", late: false },
    { date: "2025-01-07", checkIn: "09:12", checkOut: "17:45", status: "present", late: true },
    { date: "2025-01-06", checkIn: "08:48", checkOut: "18:30", status: "present", late: false },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "present":
        return <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-emerald-500/30">Present</Badge>
      case "absent":
        return <Badge variant="destructive">Absent</Badge>
      case "half-day":
        return <Badge variant="secondary">Half Day</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance History</CardTitle>
        <CardDescription>January 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Check In</TableHead>
                <TableHead>Check Out</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Remarks</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAttendance.map((record, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">
                    {new Date(record.date).toLocaleDateString('en-IN', {
                      weekday: 'short',
                      day: 'numeric',
                      month: 'short'
                    })}
                  </TableCell>
                  <TableCell>
                    {record.checkIn === "-" ? (
                      <span className="text-muted-foreground">—</span>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        {record.checkIn}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    {record.checkOut === "-" ? (
                      <span className="text-muted-foreground">—</span>
                    ) : record.checkOut}
                  </TableCell>
                  <TableCell>{getStatusBadge(record.status)}</TableCell>
                  <TableCell className="text-right">
                    {record.late && (
                      <Badge variant="outline" className="border-amber-500/50 text-amber-700">
                        Late
                      </Badge>
                    )}
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

function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">This Month</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">18/22</div>
          <p className="text-xs text-muted-foreground">Days Present</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Attendance %</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-emerald-600">81.8%</div>
          <p className="text-xs text-muted-foreground">This month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Late Days</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-amber-600">4</div>
          <p className="text-xs text-muted-foreground">This month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Absent Days</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">2</div>
          <p className="text-xs text-muted-foreground">This month</p>
        </CardContent>
      </Card>
    </div>
  )
}