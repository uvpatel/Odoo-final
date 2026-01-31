// app/dashboard/profile/page.tsx
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  User, 
  Mail, 
  Phone, 
  Building2, 
  Briefcase, 
  Calendar, 
  ShieldCheck, 
  Edit 
} from "lucide-react"


import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import data from "../../data.json"
import SidebarWrapper from "@/components/shared/Sidebar/sidebarwrapper"


export default function ProfilePage() {
  return (
    <SidebarWrapper>


       
    <div className="container mx-auto py-6 px-4 md:px-6 space-y-8">
      {/* Header + Quick Actions */}
      <Header />

      <div className="grid gap-6 md:grid-cols-12">
        {/* Left Column - Profile Card */}
          <ProfileCard />      

        {/* Right Column - Details */}
       <RightColumnDetails />
      </div>
    </div>

    </SidebarWrapper>

  )
}


function Header() {
  return(
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
          <p className="text-muted-foreground">
            Manage your personal information and account settings
          </p>
        </div>
        <Button>
          <Edit className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
      </div>
  )
}

function ProfileCard() {
  return(
    <div className="md:col-span-4 space-y-6">
    <Card className="overflow-hidden">
      <div className="h-32 bg-gradient-to-r from-violet-500/20 to-indigo-500/20" />
      <CardContent className="relative px-6 pb-6 -mt-16">
        <div className="flex flex-col items-center text-center">
          <Avatar className="h-32 w-32 border-4 border-background ring-2 ring-violet-500/30 mb-4">
            <AvatarImage src="/avatars/uv.jpg" alt="Urvil Patel" />
            <AvatarFallback className="text-4xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white">
              UP
            </AvatarFallback>
          </Avatar>

          <h2 className="text-2xl font-bold">Urvil Patel</h2>
          <p className="text-muted-foreground">Software Engineer • DevFlow</p>

          <div className="mt-3 flex flex-wrap gap-2 justify-center">
            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30">
              <ShieldCheck className="mr-1 h-3.5 w-3.5" />
              Verified
            </Badge>
            <Badge variant="secondary">Full-Time</Badge>
            <Badge variant="secondary">Remote</Badge>
          </div>
        </div>
      </CardContent>
    </Card>

    {/* Quick Info Cards */}
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Quick Info</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 text-sm">
        <div className="flex items-center gap-3">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="font-medium">Email</p>
            <p className="text-muted-foreground">urvil@example.com</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Phone className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="font-medium">Phone</p>
            <p className="text-muted-foreground">+91 98765 43210</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="font-medium">Joined</p>
            <p className="text-muted-foreground">March 15, 2023</p>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
  )
}



function RightColumnDetails(){
  return(
    <div className="md:col-span-8 space-y-6">
    {/* Personal Information */}
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Core details about you</CardDescription>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-6">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">Full Name</p>
          <p>Urvil Patel</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">Employee ID</p>
          <p>DEVF-2023-078</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">Department</p>
          <p>Engineering</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">Designation</p>
          <p>Software Engineer</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">Reporting To</p>
          <p>Senior Tech Lead - Rahul Sharma</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">Work Location</p>
          <p>Remote • Anand, Gujarat</p>
        </div>
      </CardContent>
    </Card>

    {/* Additional Cards - you can extend */}
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Current Leave Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Casual Leave</span>
              <span className="font-medium">12 days</span>
            </div>
            <div className="flex justify-between">
              <span>Earned Leave</span>
              <span className="font-medium">18 days</span>
            </div>
            <div className="flex justify-between">
              <span>Sick Leave</span>
              <span className="font-medium">8 days</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-sm">
            <li className="flex justify-between">
              <span>Applied for leave</span>
              <span className="text-muted-foreground">2 days ago</span>
            </li>
            <li className="flex justify-between">
              <span>Updated profile picture</span>
              <span className="text-muted-foreground">1 week ago</span>
            </li>
            <li className="flex justify-between">
              <span>Completed onboarding task</span>
              <span className="text-muted-foreground">3 weeks ago</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  </div>
  )
}