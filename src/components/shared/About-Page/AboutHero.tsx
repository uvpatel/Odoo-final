import React from "react";
import { BackgroundLines } from "@/components/ui/background-lines";

export function AboutHero() {
    return (
        <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
            <h2 className="bg-clip-text text-transparent text-center bg-linear-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
                Smart Budget Accounting <br /> Built for Shiv Furniture
            </h2>

            <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
                Shiv Furniture’s ERP platform streamlines rentals, sales, purchases, budgeting, and payments into one intelligent system.
                Track cost centers, manage orders, automate invoices, control budgets, and gain real-time financial insights to run your business smarter and faster.
            </p>


        </BackgroundLines>
    );
}
