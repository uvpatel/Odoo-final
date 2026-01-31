"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useInvoice } from "@/context/invoice-context";
import { InvoiceItem } from "@/types/invoice";
import { Trash2, Plus } from "lucide-react";

interface InvoiceItemRowProps {
    item: InvoiceItem;
    index: number;
    canRemove: boolean;
    onUpdate: (
        index: number,
        field: keyof InvoiceItem,
        value: string | number
    ) => void;
    onRemove: (index: number) => void;
}

function InvoiceItemRow({
    item,
    index,
    canRemove,
    onUpdate,
    onRemove,
}: InvoiceItemRowProps) {
    return (
        <div className="grid grid-cols-12 gap-4 items-start">
            <div className="col-span-6">
                <Input
                    placeholder="Item description"
                    value={item.description}
                    onChange={(e) => onUpdate(index, "description", e.target.value)}
                />
            </div>
            <div className="col-span-2">
                <Input
                    type="number"
                    placeholder="Qty"
                    value={item.quantity}
                    onChange={(e) => onUpdate(index, "quantity", e.target.value)}
                    min="1"
                />
            </div>
            <div className="col-span-2">
                <Input
                    type="number"
                    placeholder="Rate"
                    value={item.rate}
                    onChange={(e) => onUpdate(index, "rate", e.target.value)}
                    min="0"
                />
            </div>
            <div className="col-span-1 flex items-center justify-end h-10 text-sm font-medium">
                {(typeof item.amount === 'number' ? item.amount : 0).toFixed(2)}
            </div>
            <div className="col-span-1 flex justify-end">
                <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => onRemove(index)}
                    disabled={!canRemove}
                    type="button"
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}

export default function ItemsList() {
    const { invoice, updateItem, removeItem, addItem } = useInvoice();

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-muted-foreground mb-2 px-1">
                <div className="col-span-6">Description</div>
                <div className="col-span-2">Quantity</div>
                <div className="col-span-2">Rate</div>
                <div className="col-span-1 text-right">Amount</div>
                <div className="col-span-1"></div>
            </div>

            <div className="space-y-2">
                {invoice.items.map((item, index) => (
                    <InvoiceItemRow
                        key={item.id}
                        item={item}
                        index={index}
                        canRemove={invoice.items.length > 1}
                        onUpdate={updateItem}
                        onRemove={removeItem}
                    />
                ))}
            </div>

            <Button
                type="button"
                variant="outline"
                onClick={addItem}
                className="w-full mt-4"
            >
                <Plus className="h-4 w-4 mr-2" />
                Add Line Item
            </Button>
        </div>
    );
}