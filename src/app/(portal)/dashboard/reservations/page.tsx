"use client";
import React, { useState } from 'react';
import {
  Search,
  Filter,
  Calendar as CalendarIcon,
  Clock,
  User,
  MapPin,
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Download,
  Plus,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SidebarWrapper from '@/components/shared/Sidebar/sidebarwrapper';

// Types
type Reservation = {
  id: string;
  customerName: string;
  email: string;
  productName: string;
  startDate: string;
  endDate: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  totalAmount: number;
  location: string;
  notes?: string;
};

// Sample data
const reservations: Reservation[] = [
  {
    id: 'RES-001',
    customerName: 'John Smith',
    email: 'john.smith@example.com',
    productName: 'Conference Room A',
    startDate: '2026-02-05T09:00:00',
    endDate: '2026-02-05T17:00:00',
    status: 'confirmed',
    totalAmount: 500,
    location: 'Building 1, Floor 3',
    notes: 'Needs projector and whiteboard',
  },
  {
    id: 'RES-002',
    customerName: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    productName: 'Photography Equipment Set',
    startDate: '2026-02-10T08:00:00',
    endDate: '2026-02-12T20:00:00',
    status: 'pending',
    totalAmount: 850,
    location: 'Warehouse B',
  },
  {
    id: 'RES-003',
    customerName: 'Michael Chen',
    email: 'mchen@example.com',
    productName: 'Event Space',
    startDate: '2026-02-15T14:00:00',
    endDate: '2026-02-15T23:00:00',
    status: 'confirmed',
    totalAmount: 1200,
    location: 'Main Hall',
    notes: 'Wedding reception - 150 guests',
  },
  {
    id: 'RES-004',
    customerName: 'Emily Davis',
    email: 'emily.d@example.com',
    productName: 'MacBook Pro',
    startDate: '2026-01-28T10:00:00',
    endDate: '2026-01-30T18:00:00',
    status: 'completed',
    totalAmount: 300,
    location: 'Tech Depot',
  },
  {
    id: 'RES-005',
    customerName: 'Robert Brown',
    email: 'rbrown@example.com',
    productName: 'Mountain Bike',
    startDate: '2026-02-20T07:00:00',
    endDate: '2026-02-22T19:00:00',
    status: 'confirmed',
    totalAmount: 180,
    location: 'Sports Center',
  },
  {
    id: 'RES-006',
    customerName: 'Lisa Anderson',
    email: 'lisa.a@example.com',
    productName: 'Audio Recording Studio',
    startDate: '2026-02-08T12:00:00',
    endDate: '2026-02-08T20:00:00',
    status: 'cancelled',
    totalAmount: 400,
    location: 'Studio 2B',
    notes: 'Cancelled by customer',
  },
];

const statusConfig = {
  confirmed: {
    label: 'Confirmed',
    className: 'bg-green-100 text-green-800 hover:bg-green-100',
    icon: CheckCircle2,
  },
  pending: {
    label: 'Pending',
    className: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
    icon: AlertCircle,
  },
  completed: {
    label: 'Completed',
    className: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
    icon: CheckCircle2,
  },
  cancelled: {
    label: 'Cancelled',
    className: 'bg-red-100 text-red-800 hover:bg-red-100',
    icon: XCircle,
  },
};

export default function ReservationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  const filteredReservations = reservations.filter((reservation) => {
    const matchesSearch =
      reservation.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reservation.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reservation.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || reservation.status === statusFilter;

    let matchesDate = true;
    if (dateFilter !== 'all') {
      const startDate = new Date(reservation.startDate);
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const nextWeek = new Date(today);
      nextWeek.setDate(nextWeek.getDate() + 7);

      if (dateFilter === 'today') {
        matchesDate = startDate.toDateString() === today.toDateString();
      } else if (dateFilter === 'tomorrow') {
        matchesDate = startDate.toDateString() === tomorrow.toDateString();
      } else if (dateFilter === 'week') {
        matchesDate = startDate >= today && startDate <= nextWeek;
      }
    }

    return matchesSearch && matchesStatus && matchesDate;
  });

  // Calculate statistics
  const stats = {
    total: reservations.length,
    confirmed: reservations.filter((r) => r.status === 'confirmed').length,
    pending: reservations.filter((r) => r.status === 'pending').length,
    upcoming: reservations.filter(
      (r) =>
        (r.status === 'confirmed' || r.status === 'pending') &&
        new Date(r.startDate) > new Date()
    ).length,
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const hours = Math.abs(end.getTime() - start.getTime()) / 36e5;
    
    if (hours < 24) {
      return `${Math.round(hours)}h`;
    } else {
      const days = Math.floor(hours / 24);
      return `${days}d`;
    }
  };

  return (
    <SidebarWrapper>

    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Reservations</h1>
            <p className="text-muted-foreground mt-1">
              Manage your bookings and reservations
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              New Reservation
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Reservations
              </CardTitle>
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">All time bookings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.confirmed}</div>
              <p className="text-xs text-muted-foreground">Ready to go</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <AlertCircle className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pending}</div>
              <p className="text-xs text-muted-foreground">Awaiting approval</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.upcoming}</div>
              <p className="text-xs text-muted-foreground">In the future</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Reservations</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {/* Filters and Search */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="relative flex-1 md:max-w-sm">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search reservations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Select value={dateFilter} onValueChange={setDateFilter}>
                      <SelectTrigger className="w-[150px]">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Date" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Dates</SelectItem>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="tomorrow">Tomorrow</SelectItem>
                        <SelectItem value="week">Next 7 Days</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[150px]">
                        <Filter className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reservations Table */}
            <Card>
              <CardHeader>
                <CardTitle>Reservation List</CardTitle>
                <CardDescription>
                  View and manage all reservations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Reservation ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Product/Service</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredReservations.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={9} className="text-center py-8">
                            <p className="text-muted-foreground">
                              No reservations found
                            </p>
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredReservations.map((reservation) => {
                          const StatusIcon = statusConfig[reservation.status].icon;
                          return (
                              <TableRow key={reservation.id}>
                              <TableCell className="font-medium">
                                {reservation.id}
                              </TableCell>
                              <TableCell>
                                <div>
                                  <div className="font-medium">
                                    {reservation.customerName}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    {reservation.email}
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>{reservation.productName}</TableCell>
                              <TableCell>
                                <div>
                                  <div className="font-medium">
                                    {formatDate(reservation.startDate)}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    {formatTime(reservation.startDate)} -{' '}
                                    {formatTime(reservation.endDate)}
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                {getDuration(
                                  reservation.startDate,
                                  reservation.endDate
                                )}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1 text-sm">
                                  <MapPin className="h-3 w-3 text-muted-foreground" />
                                  {reservation.location}
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge
                                  className={
                                    statusConfig[reservation.status].className
                                  }
                                >
                                  <StatusIcon className="mr-1 h-3 w-3" />
                                  {statusConfig[reservation.status].label}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right font-medium">
                                {formatCurrency(reservation.totalAmount)}
                              </TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                      View Details
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      Edit Reservation
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      Send Confirmation
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    {reservation.status === 'pending' && (
                                      <DropdownMenuItem className="text-green-600">
                                        Confirm
                                      </DropdownMenuItem>
                                    )}
                                    <DropdownMenuItem className="text-red-600">
                                      Cancel Reservation
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          );
                        })
                      )}
                    </TableBody>
                  </Table>
                </div>

                {/* Results count */}
                <div className="mt-4 text-sm text-muted-foreground">
                  Showing {filteredReservations.length} of {reservations.length}{' '}
                  reservations
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-4">
            <Card>
              <CardContent className="py-8 text-center">
                <Clock className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">Upcoming Reservations</h3>
                <p className="text-sm text-muted-foreground">
                  View all future bookings and reservations
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            <Card>
              <CardContent className="py-8 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">Past Reservations</h3>
                <p className="text-sm text-muted-foreground">
                  View completed and historical reservations
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
                            </SidebarWrapper>
  );
}