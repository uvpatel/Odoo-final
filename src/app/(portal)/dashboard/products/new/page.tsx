"use client";

import React, { useState } from 'react';
import {
    ArrowLeft,
    Upload,
    Image as ImageIcon,
    Save,
    X,
    Plus,
    Trash2,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface ProductFormData {
    name: string;
    description: string;
    category: string;
    vendor: string;
    price: string;
    comparePrice: string;
    cost: string;
    sku: string;
    barcode: string;
    stock: string;
    lowStockThreshold: string;
    status: string;
    trackInventory: boolean;
    taxable: boolean;
    tags: string[];
}

export default function NewProductPage() {
    const [formData, setFormData] = useState<ProductFormData>({
        name: '',
        description: '',
        category: '',
        vendor: '',
        price: '',
        comparePrice: '',
        cost: '',
        sku: '',
        barcode: '',
        stock: '',
        lowStockThreshold: '',
        status: 'active',
        trackInventory: true,
        taxable: true,
        tags: [],
    });

    const [currentTag, setCurrentTag] = useState('');
    const [images, setImages] = useState<string[]>([]);

    const handleInputChange = (field: keyof ProductFormData, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleAddTag = () => {
        if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
            setFormData((prev) => ({
                ...prev,
                tags: [...prev.tags, currentTag.trim()],
            }));
            setCurrentTag('');
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setFormData((prev) => ({
            ...prev,
            tags: prev.tags.filter((tag) => tag !== tagToRemove),
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Add your form submission logic here
        alert('Product created successfully!');
    };
    
    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="mx-auto max-w-5xl space-y-6">
                {/* Header */}
                <Header />
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 lg:grid-cols-3">
                        {/* Main Content - Left Column */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Basic Information */}
                            <BasicInformation />

                            {/* Pricing */}
                            <Pricing />


                            {/* Inventory */}
                            <Inventory />
                        </div>

                        {/* Sidebar - Right Column */}
                        <Sidebar />
                        
                    </div>

                    {/* Bottom Actions */}
                    <BottomAction />
                </form>
            </div>
        </div>
    );
}


function BottomAction() {
    return(
        <Card>
                        <CardContent className="flex justify-end gap-2 pt-6">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => window.history.back()}
                            >
                                Cancel
                            </Button>
                            <Button type="submit">
                                <Save className="mr-2 h-4 w-4" />
                                Save Product
                            </Button>
                        </CardContent>
                    </Card>
    )
}
function BasicInformation() {
    
    const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    category: '',
    vendor: '',
    price: '',
    comparePrice: '',
    cost: '',
    sku: '',
    barcode: '',
    stock: '',
    lowStockThreshold: '',
    status: 'active',
    trackInventory: true,
    taxable: true,
    tags: [],
});

const [currentTag, setCurrentTag] = useState('');
const [images, setImages] = useState<string[]>([]);

const handleInputChange = (field: keyof ProductFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
};

const handleAddTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
        setFormData((prev) => ({
            ...prev,
            tags: [...prev.tags, currentTag.trim()],
        }));
        setCurrentTag('');
    }
};

const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
        ...prev,
        tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
};

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
    alert('Product created successfully!');
};

return(
        <Card>
                                <CardHeader>
                                    <CardTitle>Basic Information</CardTitle>
                                    <CardDescription>
                                        Essential product details and description
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">
                                            Product Name <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="name"
                                            placeholder="Enter product name"
                                            value={formData.name}
                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea
                                            id="description"
                                            placeholder="Describe your product..."
                                            rows={5}
                                            value={formData.description}
                                            onChange={(e) =>
                                                handleInputChange('description', e.target.value)
                                            }
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            Provide a detailed description of your product
                                        </p>
                                    </div>

                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="category">
                                                Category <span className="text-red-500">*</span>
                                            </Label>
                                            <Select
                                                value={formData.category}
                                                onValueChange={(value) =>
                                                    handleInputChange('category', value)
                                                }
                                            >
                                                <SelectTrigger id="category">
                                                    <SelectValue placeholder="Select category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="electronics">Electronics</SelectItem>
                                                    <SelectItem value="accessories">Accessories</SelectItem>
                                                    <SelectItem value="clothing">Clothing</SelectItem>
                                                    <SelectItem value="home">Home & Garden</SelectItem>
                                                    <SelectItem value="sports">Sports & Outdoors</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="vendor">Vendor</Label>
                                            <Input
                                                id="vendor"
                                                placeholder="Enter vendor name"
                                                value={formData.vendor}
                                                onChange={(e) =>
                                                    handleInputChange('vendor', e.target.value)
                                                }
                                                />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
    
)
}

function Sidebar() {
    const [formData, setFormData] = useState<ProductFormData>({
        name: '',
        description: '',
        category: '',
        vendor: '',
        price: '',
        comparePrice: '',
        cost: '',
        sku: '',
        barcode: '',
        stock: '',
        lowStockThreshold: '',
        status: 'active',
        trackInventory: true,
        taxable: true,
        tags: [],
    });

    const [currentTag, setCurrentTag] = useState('');
    const [images, setImages] = useState<string[]>([]);

    const handleInputChange = (field: keyof ProductFormData, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleAddTag = () => {
        if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
            setFormData((prev) => ({
                ...prev,
                tags: [...prev.tags, currentTag.trim()],
            }));
            setCurrentTag('');
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setFormData((prev) => ({
            ...prev,
            tags: prev.tags.filter((tag) => tag !== tagToRemove),
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Add your form submission logic here
        alert('Product created successfully!');
    };
    return(
         <div className="space-y-6">
                            {/* Status */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Status</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="status">Product Status</Label>
                                        <Select
                                            value={formData.status}
                                            onValueChange={(value) => handleInputChange('status', value)}
                                        >
                                            <SelectTrigger id="status">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="active">Active</SelectItem>
                                                <SelectItem value="draft">Draft</SelectItem>
                                                <SelectItem value="archived">Archived</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <Separator />

                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="taxable">Taxable</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Charge tax on this product
                                            </p>
                                        </div>
                                        <Switch
                                            id="taxable"
                                            checked={formData.taxable}
                                            onCheckedChange={(checked) =>
                                                handleInputChange('taxable', checked)
                                            }
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Product Images */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Product Images</CardTitle>
                                    <CardDescription>Add product photos</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
                                        <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
                                        <p className="text-sm font-medium">Click to upload</p>
                                        <p className="text-xs text-muted-foreground">
                                            or drag and drop
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            PNG, JPG up to 10MB
                                        </p>
                                        <Input
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            multiple
                                        />
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        First image will be the product's featured image
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Tags */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Tags</CardTitle>
                                    <CardDescription>Add searchable tags</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex gap-2">
                                        <Input
                                            placeholder="Add a tag"
                                            value={currentTag}
                                            onChange={(e) => setCurrentTag(e.target.value)}
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    handleAddTag();
                                                }
                                            }}
                                        />
                                        <Button
                                            type="button"
                                            size="sm"
                                            onClick={handleAddTag}
                                            disabled={!currentTag.trim()}
                                        >
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>

                                    {formData.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {formData.tags.map((tag) => (
                                                <Badge key={tag} variant="secondary">
                                                    {tag}
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveTag(tag)}
                                                        className="ml-1 hover:text-destructive"
                                                    >
                                                        <X className="h-3 w-3" />
                                                    </button>
                                                </Badge>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
    )
    
}


function Header() {
    const [formData, setFormData] = useState<ProductFormData>({
        name: '',
        description: '',
        category: '',
        vendor: '',
        price: '',
        comparePrice: '',
        cost: '',
        sku: '',
        barcode: '',
        stock: '',
        lowStockThreshold: '',
        status: 'active',
        trackInventory: true,
        taxable: true,
        tags: [],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Add your form submission logic here
        alert('Product created successfully!');
    };
    return (
        <div className="flex items-center gap-4">
            <Button
                variant="ghost"
                size="sm"
                onClick={() => window.history.back()}
            >
                <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex-1">
                <h1 className="text-3xl font-bold tracking-tight">Add New Product</h1>
                <p className="text-muted-foreground mt-1">
                    Create a new product for your catalog
                </p>
            </div>
            <div className="flex gap-2">
                <Button variant="outline" onClick={() => window.history.back()}>
                    Cancel
                </Button>
                <Button onClick={handleSubmit}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Product
                </Button>
            </div>
        </div>

    )

}

function Pricing() {
    const [formData, setFormData] = useState<ProductFormData>({
        name: '',
        description: '',
        category: '',
        vendor: '',
        price: '',
        comparePrice: '',
        cost: '',
        sku: '',
        barcode: '',
        stock: '',
        lowStockThreshold: '',
        status: 'active',
        trackInventory: true,
        taxable: true,
        tags: [],
    });
    const handleInputChange = (field: keyof ProductFormData, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Pricing</CardTitle>
                <CardDescription>
                    Set your product pricing and cost
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                        <Label htmlFor="price">
                            Price <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                $
                            </span>
                            <Input
                                id="price"
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                className="pl-7"
                                value={formData.price}
                                onChange={(e) =>
                                    handleInputChange('price', e.target.value)
                                }
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="comparePrice">Compare at Price</Label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                $
                            </span>
                            <Input
                                id="comparePrice"
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                className="pl-7"
                                value={formData.comparePrice}
                                onChange={(e) =>
                                    handleInputChange('comparePrice', e.target.value)
                                }
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="cost">Cost per Item</Label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                $
                            </span>
                            <Input
                                id="cost"
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                className="pl-7"
                                value={formData.cost}
                                onChange={(e) =>
                                    handleInputChange('cost', e.target.value)
                                }
                            />
                        </div>
                    </div>
                </div>

                {formData.price && formData.cost && (
                    <div className="rounded-lg bg-muted p-3">
                        <p className="text-sm">
                            <span className="font-medium">Profit Margin:</span>{' '}
                            {(
                                ((parseFloat(formData.price) -
                                    parseFloat(formData.cost)) /
                                    parseFloat(formData.price)) *
                                100
                            ).toFixed(2)}
                            %
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

function Inventory() {
    const [formData, setFormData] = useState<ProductFormData>({
        name: '',
        description: '',
        category: '',
        vendor: '',
        price: '',
        comparePrice: '',
        cost: '',
        sku: '',
        barcode: '',
        stock: '',
        lowStockThreshold: '',
        status: 'active',
        trackInventory: true,
        taxable: true,
        tags: [],
    });
    const handleInputChange = (field: keyof ProductFormData, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };
    return (
        <Card>
            <CardHeader>
                <CardTitle>Inventory</CardTitle>
                <CardDescription>
                    Manage stock levels and tracking
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label htmlFor="trackInventory">Track Inventory</Label>
                        <p className="text-sm text-muted-foreground">
                            Monitor stock levels for this product
                        </p>
                    </div>
                    <Switch
                        id="trackInventory"
                        checked={formData.trackInventory}
                        onCheckedChange={(checked) =>
                            handleInputChange('trackInventory', checked)
                        }
                    />
                </div>

                <Separator />

                <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                        <Label htmlFor="sku">SKU</Label>
                        <Input
                            id="sku"
                            placeholder="ABC-123"
                            value={formData.sku}
                            onChange={(e) => handleInputChange('sku', e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="barcode">Barcode</Label>
                        <Input
                            id="barcode"
                            placeholder="123456789"
                            value={formData.barcode}
                            onChange={(e) =>
                                handleInputChange('barcode', e.target.value)
                            }
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="stock">
                            Stock Quantity{' '}
                            {formData.trackInventory && (
                                <span className="text-red-500">*</span>
                            )}
                        </Label>
                        <Input
                            id="stock"
                            type="number"
                            placeholder="0"
                            value={formData.stock}
                            onChange={(e) =>
                                handleInputChange('stock', e.target.value)
                            }
                            required={formData.trackInventory}
                        />
                    </div>
                </div>

                {formData.trackInventory && (
                    <div className="space-y-2">
                        <Label htmlFor="lowStockThreshold">
                            Low Stock Threshold
                        </Label>
                        <Input
                            id="lowStockThreshold"
                            type="number"
                            placeholder="10"
                            value={formData.lowStockThreshold}
                            onChange={(e) =>
                                handleInputChange('lowStockThreshold', e.target.value)
                            }
                        />
                        <p className="text-xs text-muted-foreground">
                            Get notified when stock falls below this number
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}