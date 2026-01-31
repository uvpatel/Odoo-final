// app/dashboard/leaves/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {  CalendarDays,  Clock, CheckCircle2, XCircle, AlertCircle,Plus,
  FileText,  Receipt} from "lucide-react"
import {  Table,  TableBody,  TableCell,TableHead,TableHeader,TableRow} from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import data from "../../data.json"
import SidebarWrapper from "@/components/shared/Sidebar/sidebarwrapper"

export default function LeavesPage() {
  // Mock data - in real app this would come from API / server component
  
  return (
    <SidebarWrapper>


        
    <div className="container mx-auto py-6 px-4 md:px-6 space-y-8">
      {/* Header */}
      <Header />

      {/* Leave Balance Cards */}
      <LeaveBalanceCards />

      {/* Recent Applications */}
      
      <RecentApplications />

      {/* Quick Stats Row */}
      <QuickStatsRow />
    </div>

    </SidebarWrapper>
    
  )
}


function QuickStatsRow(){
  return(
    <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Leaves Taken</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">This year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Available Days</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">22</div>
            <p className="text-xs text-muted-foreground">All types combined</p>
          </CardContent>
        </Card>
      </div>
  )
}


function Header() {
  return(
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leave Management</h1>
          <p className="text-muted-foreground">
            View your leave balance and track your leave applications
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Apply for Leave
        </Button>
      </div>
  )
}

function LeaveBalanceCards() {
  const leaveBalance = [
    { type: "Casual Leave", total: 12, used: 4, color: "bg-emerald-500" },
    { type: "Earned Leave", total: 20, used: 7, color: "bg-blue-500" },
    { type: "Sick Leave", total: 10, used: 1, color: "bg-amber-500" },
    { type: "Optional Holiday", total: 2, used: 0, color: "bg-purple-500" },
  ]
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {leaveBalance.map((leave) => {
          const percentage = (leave.used / leave.total) * 100
          return (
            <Card key={leave.type} className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center justify-between">
                  {leave.type}
                  <Badge variant="outline">{leave.total - leave.used} left</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Used</span>
                    <span className="font-medium">{leave.used} days</span>
                  </div>
                  <Progress value={percentage} className={`h-2 ${leave.color}`} />
                  <div className="text-xs text-muted-foreground">
                    {percentage.toFixed(0)}% utilized
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
  )
}

function RecentApplications() {
  const recentApplications = [
    {
      id: "LV-2025-042",
      type: "Casual",
      from: "10 Jan 2025",
      to: "11 Jan 2025",
      days: 2,
      status: "approved",
      applied: "05 Jan 2025",
    },
    {
      id: "LV-2025-038",
      type: "Sick",
      from: "28 Dec 2024",
      to: "29 Dec 2024",
      days: 2,
      status: "approved",
      applied: "27 Dec 2024",
    },
    {
      id: "LV-2025-021",
      type: "Earned",
      from: "15 Dec 2025",
      to: "20 Dec 2025",
      days: 6,
      status: "pending",
      applied: "02 Dec 2024",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20 border-emerald-500/30">
            Approved
          </Badge>
        )
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Recent Leave Applications</CardTitle>
            <CardDescription>Last 3 months</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <FileText className="mr-2 h-4 w-4" />
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Leave ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Days</TableHead>
                  <TableHead>Applied On</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentApplications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">{app.id}</TableCell>
                    <TableCell>{app.type}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {app.from} — {app.to}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{app.days} day{app.days > 1 ? "s" : ""}</TableCell>
                    <TableCell>{app.applied}</TableCell>
                    <TableCell className="text-right">
                      {getStatusBadge(app.status)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {recentApplications.length === 0 && (
            <div className="py-12 text-center text-muted-foreground">
              No leave applications found in the recent period
            </div>
          )}
        </CardContent>
      </Card>
  )
}