"use client";
import React, { useState } from 'react';
import {
    Search,
    Filter,
    Plus,
    MoreHorizontal,
    Eye,
    Edit,
    Trash2,
    Grid3x3,
    List,
    Package,
    TrendingUp,
    AlertCircle,
    Download,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
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
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import SidebarWrapper from '@/components/shared/Sidebar/sidebarwrapper';

// Types
type Product = {
    id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    stock: number;
    status: 'active' | 'inactive' | 'out-of-stock';
    image: string;
    vendor: string;
};

// Sample data
const products: Product[] = [
    {
        id: 'PRD-001',
        name: 'Ergonomic Office Chair',
        description: 'High-back mesh office chair with lumbar support and adjustable armrests',
        category: 'Furniture',
        price: 249.99,
        stock: 25,
        status: 'active',
        image: '💺',
        vendor: 'ComfortSeating',
    },
    {
        id: 'PRD-002',
        name: 'Electric Standing Desk',
        description: 'Adjustable height desk with memory presets and cable management',
        category: 'Furniture',
        price: 499.99,
        stock: 0,
        status: 'out-of-stock',
        image: '🖥️',
        vendor: 'WorkWell',
    },
    {
        id: 'PRD-003',
        name: 'Oak Bookshelf',
        description: 'Solid oak 5-shelf bookcase with adjustable shelving',
        category: 'Furniture',
        price: 189.99,
        stock: 15,
        status: 'active',
        image: '📚',
        vendor: 'TimberHome',
    },
    {
        id: 'PRD-004',
        name: 'Modern Coffee Table',
        description: 'Minimalist walnut coffee table with storage shelf',
        category: 'Furniture',
        price: 129.99,
        stock: 40,
        status: 'active',
        image: '☕',
        vendor: 'UrbanLiving',
    },
    {
        id: 'PRD-005',
        name: 'Velvet Sofa',
        description: 'Mid-century modern 3-seater sofa in emerald velvet',
        category: 'Furniture',
        price: 899.99,
        stock: 5,
        status: 'active',
        image: '🛋️',
        vendor: 'LuxeInteriors',
    },
    {
        id: 'PRD-006',
        name: 'Dining Table Set',
        description: '6-person wooden dining table with matching chairs',
        category: 'Furniture',
        price: 599.99,
        stock: 8,
        status: 'active',
        image: '🍽️',
        vendor: 'FamilyGather',
    },
    {
        id: 'PRD-007',
        name: 'Queen Bed Frame',
        description: 'Upholstered platform bed frame with headboard',
        category: 'Furniture',
        price: 349.99,
        stock: 0,
        status: 'inactive',
        image: '🛏️',
        vendor: 'RestEasy',
    },
    {
        id: 'PRD-008',
        name: 'Floor Lamp',
        description: 'Industrial style floor lamp with adjustable head',
        category: 'Furniture',
        price: 79.99,
        stock: 60,
        status: 'active',
        image: '💡',
        vendor: 'BrightIdeas',
    },
];

const statusConfig = {
    active: {
        label: 'Active',
        className: 'bg-green-100 text-green-800 hover:bg-green-100',
    },
    inactive: {
        label: 'Inactive',
        className: 'bg-gray-100 text-gray-800 hover:bg-gray-100',
    },
    'out-of-stock': {
        label: 'Out of Stock',
        className: 'bg-red-100 text-red-800 hover:bg-red-100',
    },
};

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
};

export default function ProductsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

    // Filter products
    const filteredProducts = products.filter((product) => {
        const matchesSearch =
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.vendor.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory =
            categoryFilter === 'all' || product.category === categoryFilter;
        const matchesStatus =
            statusFilter === 'all' || product.status === statusFilter;
        return matchesSearch && matchesCategory && matchesStatus;
    });

    return (
        <SidebarWrapper>
            <div className="min-h-screen bg-gray-50 p-4 md:p-8">
                <div className="mx-auto max-w-7xl space-y-6">
                    {/* Header */}
                    <Header />

                    {/* Statistics Cards */}
                    <StatisticalCard products={products} />

                    {/* Filters and Search */}
                    <FilterAndSearch
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        categoryFilter={categoryFilter}
                        setCategoryFilter={setCategoryFilter}
                        statusFilter={statusFilter}
                        setStatusFilter={setStatusFilter}
                        viewMode={viewMode}
                        setViewMode={setViewMode}
                    />

                    {/* Products Grid View */}
                    <ProductsGrid products={filteredProducts} viewMode={viewMode} />

                    {/* Products List View */}
                    <ProductList products={filteredProducts} viewMode={viewMode} />

                    {/* No results */}
                    <EmptyState show={filteredProducts.length === 0} />

                    {/* Results count */}
                    {filteredProducts.length > 0 && (
                        <div className="text-sm text-muted-foreground">
                            Showing {filteredProducts.length} of {products.length} products
                        </div>
                    )}
                </div>
            </div>
        </SidebarWrapper>
    );
}

function Header() {
    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Products</h1>
                <p className="text-muted-foreground mt-1">
                    Manage your product inventory
                </p>
            </div>
            <div className="flex gap-2">
                <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                </Button>
                <Button
                    size="sm"
                    onClick={() => (window.location.href = '/dashboard/products/new')}
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Product
                </Button>
            </div>
        </div>
    );
}

interface StatisticalCardProps {
    products: Product[];
}

function StatisticalCard({ products }: StatisticalCardProps) {
    const stats = {
        total: products.length,
        active: products.filter((p) => p.status === 'active').length,
        lowStock: products.filter((p) => p.stock > 0 && p.stock < 20).length,
        outOfStock: products.filter((p) => p.status === 'out-of-stock').length,
    };
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.total}</div>
                    <p className="text-xs text-muted-foreground">In your catalog</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active</CardTitle>
                    <TrendingUp className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.active}</div>
                    <p className="text-xs text-muted-foreground">Currently selling</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.lowStock}</div>
                    <p className="text-xs text-muted-foreground">Need restocking</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
                    <AlertCircle className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.outOfStock}</div>
                    <p className="text-xs text-muted-foreground">Unavailable</p>
                </CardContent>
            </Card>
        </div>
    );
}

interface FilterAndSearchProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    categoryFilter: string;
    setCategoryFilter: (category: string) => void;
    statusFilter: string;
    setStatusFilter: (status: string) => void;
    viewMode: string;
    setViewMode: (mode: string) => void;
}

function FilterAndSearch({
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    statusFilter,
    setStatusFilter,
    viewMode,
    setViewMode,
}: FilterAndSearchProps) {
    return (
        <Card>
            <CardContent className="pt-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="relative flex-1 md:max-w-sm">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9"
                        />
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                            <SelectTrigger className="w-[150px]">
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Categories</SelectItem>
                                <SelectItem value="Electronics">Electronics</SelectItem>
                                <SelectItem value="Accessories">Accessories</SelectItem>
                                <SelectItem value="Furniture">Furniture</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-[150px]">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                                <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                            </SelectContent>
                        </Select>

                        <ToggleGroup
                            type="single"
                            value={viewMode}
                            onValueChange={(v) => v && setViewMode(v)}
                        >
                            <ToggleGroupItem value="grid" aria-label="Grid view">
                                <Grid3x3 className="h-4 w-4" />
                            </ToggleGroupItem>
                            <ToggleGroupItem value="list" aria-label="List view">
                                <List className="h-4 w-4" />
                            </ToggleGroupItem>
                        </ToggleGroup>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

interface ProductsGridProps {
    products: Product[];
    viewMode: string;
}

function ProductsGrid({ products, viewMode }: ProductsGridProps) {
    if (viewMode !== 'grid') return null;

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                    <CardHeader className="p-0">
                        <div className="flex h-48 items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 text-6xl">
                            {product.image}
                        </div>
                    </CardHeader>
                    <CardContent className="p-4">
                        <div className="mb-2 flex items-start justify-between">
                            <div className="flex-1">
                                <h3 className="font-semibold line-clamp-1">{product.name}</h3>
                                <p className="text-sm text-muted-foreground">{product.vendor}</p>
                            </div>
                            <Badge className={statusConfig[product.status].className}>
                                {statusConfig[product.status].label}
                            </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                            {product.description}
                        </p>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-2xl font-bold">
                                    {formatCurrency(product.price)}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Stock: {product.stock}
                                </p>
                            </div>
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
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit Product
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-red-600">
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

interface ProductListProps {
    products: Product[];
    viewMode: string;
}

function ProductList({ products, viewMode }: ProductListProps) {
    if (viewMode !== 'list') return null;

    return (
        <Card>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Product</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Vendor</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 text-2xl">
                                            {product.image}
                                        </div>
                                        <div>
                                            <div className="font-medium">{product.name}</div>
                                            <div className="text-sm text-muted-foreground line-clamp-1">
                                                {product.description}
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>{product.category}</TableCell>
                                <TableCell>{product.vendor}</TableCell>
                                <TableCell className="font-medium">
                                    {formatCurrency(product.price)}
                                </TableCell>
                                <TableCell>
                                    <span
                                        className={
                                            product.stock < 20 ? 'text-yellow-600 font-medium' : ''
                                        }
                                    >
                                        {product.stock}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <Badge className={statusConfig[product.status].className}>
                                        {statusConfig[product.status].label}
                                    </Badge>
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
                                                <Edit className="mr-2 h-4 w-4" />
                                                Edit Product
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-red-600">
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

interface EmptyStateProps {
    show: boolean;
}

function EmptyState({ show }: EmptyStateProps) {
    if (!show) return null;

    return (
        <Card>
            <CardContent className="py-12 text-center">
                <Package className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">No products found</h3>
                <p className="text-sm text-muted-foreground">
                    Try adjusting your filters or search query
                </p>
            </CardContent>
        </Card>
    );
}