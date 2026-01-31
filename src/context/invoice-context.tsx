"use client";

import { initialInvoiceData } from "@/lib/constants";
import { InvoiceData, InvoiceItem } from "@/types/invoice";
import { calculateTotals } from "@/utils/calculation";
import { createContext, ReactNode, useContext, useState } from "react";

interface InvoiceContextType {
  invoice: InvoiceData;
  updateInvoice: (updates: Partial<InvoiceData>) => void;
  addItem: () => void;
  removeItem: (index: number) => void;
  updateItem: (
    index: number,
    field: keyof InvoiceItem,
    value: string | number
  ) => void;
}

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

export function InvoiceProvider({ children }: { children: ReactNode }) {
  const [invoice, setInvoice] = useState<InvoiceData>(initialInvoiceData);

  const updateInvoice = (updates: Partial<InvoiceData>) => {
    const newInvoice = { ...invoice, ...updates };

    if (updates.items || updates.taxRate !== undefined) {
      const { subtotal, taxAmount, total } = calculateTotals(
        updates.items || invoice.items,
        updates.taxRate !== undefined ? updates.taxRate : invoice.taxRate
      );
      newInvoice.subtotal = subtotal;
      newInvoice.taxAmount = taxAmount;
      newInvoice.total = total;
    }

    setInvoice(newInvoice);
  };

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: "",
      quantity: 1,
      rate: 0,
      amount: 0,
    };
    updateInvoice({ items: [...invoice.items, newItem] });
  };

  const removeItem = (index: number) => {
    if (invoice.items.length > 1) {
      const newItems = invoice.items.filter((_, i) => i !== index);
      updateInvoice({ items: newItems });
    }
  };

  const updateItem = (
    index: number,
    field: keyof InvoiceItem,
    value: string | number
  ) => {
    const newItems = [...invoice.items];
    newItems[index] = { ...newItems[index], [field]: value };

    if (field === "quantity" || field === "rate") {
      const quantityValue = newItems[index].quantity;
      const rateValue = newItems[index].rate;

      let quantity: number;
      if (typeof quantityValue === "string") {
        quantity = quantityValue === "" ? 0 : Number(quantityValue);
      } else {
        quantity = quantityValue;
      }

      let rate: number;
      if (typeof rateValue === "string") {
        rate = rateValue === "" ? 0 : Number(rateValue);
      } else {
        rate = rateValue;
      }

      newItems[index].amount = quantity * rate;
    }

    updateInvoice({ items: newItems });
  };

  return (
    <InvoiceContext.Provider
      value={{ invoice, updateInvoice, addItem, removeItem, updateItem }}
    >
      {children}
    </InvoiceContext.Provider>
  );
}

export function useInvoice() {
  const context = useContext(InvoiceContext);
  if (context === undefined) {
    throw new Error("useInvoice must be used within an InvoiceProvider");
  }
  return context;
}