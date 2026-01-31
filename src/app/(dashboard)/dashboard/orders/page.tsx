"use client";
import React, { useState } from 'react';
import {
    Search,
    Filter,
    Download,
    MoreHorizontal,
    Eye,
    RefreshCw,
    ArrowUpDown,
    CheckCircle2,
    Clock,
    Package,
    XCircle,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
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
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import SidebarWrapper from '@/components/shared/Sidebar/sidebarwrapper';

// Types
type Order = {
    id: string;
    customer: string;
    email: string;
    total: number;
    status: 'pending' | 'completed' | 'shipped' | 'cancelled';
    createdAt: string;
};

// Sample data
const orders: Order[] = [
    {
        id: 'ORD-001',
        customer: 'John Doe',
        email: 'john@example.com',
        total: 125.50,
        status: 'completed',
        createdAt: '2023-10-24T10:00:00Z',
    },
    {
        id: 'ORD-002',
        customer: 'Jane Smith',
        email: 'jane@example.com',
        total: 249.99,
        status: 'shipped',
        createdAt: '2023-10-25T14:30:00Z',
    },
    {
        id: 'ORD-003',
        customer: 'Bob Johnson',
        email: 'bob@example.com',
        total: 89.00,
        status: 'pending',
        createdAt: '2023-10-26T09:15:00Z',
    },
    {
        id: 'ORD-004',
        customer: 'Alice Williams',
        email: 'alice@example.com',
        total: 450.75,
        status: 'completed',
        createdAt: '2023-10-27T16:45:00Z',
    },
    {
        id: 'ORD-005',
        customer: 'Charlie Brown',
        email: 'charlie@example.com',
        total: 175.25,
        status: 'cancelled',
        createdAt: '2023-10-28T11:20:00Z',
    },
    {
        id: 'ORD-006',
        customer: 'Emma Davis',
        email: 'emma@example.com',
        total: 320.00,
        status: 'shipped',
        createdAt: '2023-10-29T13:00:00Z',
    },
];

// Status badge configuration
const statusConfig: Record<Order['status'], { label: string; variant: "default" | "destructive" | "outline" | "secondary"; icon: any; className: string }> = {
    pending: {
        label: 'Pending',
        variant: 'secondary',
        icon: Clock,
        className: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
    },
    completed: {
        label: 'Completed',
        variant: 'default',
        icon: CheckCircle2,
        className: 'bg-green-100 text-green-800 hover:bg-green-100',
    },
    shipped: {
        label: 'Shipped',
        variant: 'outline',
        icon: Package,
        className: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
    },
    cancelled: {
        label: 'Cancelled',
        variant: 'destructive',
        icon: XCircle,
        className: 'bg-red-100 text-red-800 hover:bg-red-100',
    },
};

export default function OrderPage() {

    return (
         <SidebarWrapper>

        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="mx-auto max-w-7xl space-y-6">
                {/* Header */}
                <Header />

                {/* Statistics Cards */}
               
                <StatisticalCard />
                {/* Filters and Search */}
               <FiltersSearch />
            </div>
        </div>
</SidebarWrapper>
    );
}


function FiltersSearch() {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [sortOrder, setSortOrder] = useState('desc');

    // Filter and sort orders
    const filteredOrders = orders
        .filter((order) => {
            const matchesSearch =
                order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.email.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
            return matchesSearch && matchesStatus;
        })
        .sort((a, b) => {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
        });
        const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

      const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    return(
         <Card>
                    <CardHeader>
                        <CardTitle>Order List</CardTitle>
                        <CardDescription>
                            View and manage all customer orders
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div className="relative flex-1 md:max-w-sm">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="Search orders, customers, or emails..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-9"
                                />
                            </div>

                            <div className="flex gap-2">
                                <Select value={statusFilter} onValueChange={setStatusFilter}>
                                    <SelectTrigger className="w-[150px]">
                                        <Filter className="mr-2 h-4 w-4" />
                                        <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Status</SelectItem>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="completed">Completed</SelectItem>
                                        <SelectItem value="shipped">Shipped</SelectItem>
                                        <SelectItem value="cancelled">Cancelled</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
                                >
                                    <ArrowUpDown className="mr-2 h-4 w-4" />
                                    {sortOrder === 'desc' ? 'Newest' : 'Oldest'}
                                </Button>
                            </div>
                        </div>

                        {/* Orders Table */}
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Order ID</TableHead>
                                        <TableHead>Customer</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Total</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredOrders.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={7} className="text-center py-8">
                                                <p className="text-muted-foreground">No orders found</p>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredOrders.map((order) => {
                                            const StatusIcon = statusConfig[order.status].icon;
                                            return (
                                                <TableRow key={order.id}>
                                                    <TableCell className="font-medium">{order.id}</TableCell>
                                                    <TableCell>{order.customer}</TableCell>
                                                    <TableCell className="text-muted-foreground">
                                                        {order.email}
                                                    </TableCell>
                                                    <TableCell>{formatDate(order.createdAt)}</TableCell>
                                                    <TableCell>
                                                        <Badge
                                                            variant={statusConfig[order.status].variant}
                                                            className={statusConfig[order.status].className}
                                                        >
                                                            <StatusIcon className="mr-1 h-3 w-3" />
                                                            {statusConfig[order.status].label}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="text-right font-medium">
                                                        {formatCurrency(order.total)}
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
                                                                    <Eye className="mr-2 h-4 w-4" />
                                                                    View Details
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem>
                                                                    <Download className="mr-2 h-4 w-4" />
                                                                    Download Invoice
                                                                </DropdownMenuItem>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem className="text-red-600">
                                                                    <XCircle className="mr-2 h-4 w-4" />
                                                                    Cancel Order
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
                            Showing {filteredOrders.length} of {orders.length} orders
                        </div>
                    </CardContent>
                </Card>
    )
    
}
function StatisticalCard() {
    const stats = {
        total: orders.length,
        pending: orders.filter((o) => o.status === 'pending').length,
        completed: orders.filter((o) => o.status === 'completed').length,
        shipped: orders.filter((o) => o.status === 'shipped').length,
        revenue: orders
            .filter((o) => o.status === 'completed')
            .reduce((sum, o) => sum + o.total, 0),
    };
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };
    return(
         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                            <Package className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total}</div>
                            <p className="text-xs text-muted-foreground">All time orders</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pending</CardTitle>
                            <Clock className="h-4 w-4 text-yellow-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.pending}</div>
                            <p className="text-xs text-muted-foreground">Awaiting processing</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Completed</CardTitle>
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.completed}</div>
                            <p className="text-xs text-muted-foreground">Successfully delivered</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatCurrency(stats.revenue)}</div>
                            <p className="text-xs text-muted-foreground">From completed orders</p>
                        </CardContent>
                    </Card>
                </div>
    )
    
}

function Header() {
    return(
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
                        <p className="text-muted-foreground mt-1">
                            Manage and track all your orders
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Export
                        </Button>
                        <Button size="sm">
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Refresh
                        </Button>
                    </div>
                </div>
    )
    
}