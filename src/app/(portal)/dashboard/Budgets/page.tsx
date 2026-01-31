"use client";

import React, { useEffect, useState } from "react";
import api from "@/lib/axios";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface Budget {
    id: string;
    name: string;
    amount: string;
    startDate: string;
    endDate: string;
    analyticalAccountId: string;
}

export default function BudgetPage() {
    const [budgets, setBudgets] = useState<Budget[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBudgets = async () => {
            try {
                const response = await api.get("/budgets");
                setBudgets(response.data);
            } catch (err) {
                setError("Failed to fetch budgets");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBudgets();
    }, []);

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center">
                <Loader2 className="mr-2 h-8 w-8 animate-spin" />
                Loading budgets...
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div className="p-6">
            <Card>
                <CardHeader>
                    <CardTitle>Budgets</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Start Date</TableHead>
                                <TableHead>End Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {budgets.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center">
                                        No budgets found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                budgets.map((budget) => (
                                    <TableRow key={budget.id}>
                                        <TableCell>{budget.name}</TableCell>
                                        <TableCell>${budget.amount}</TableCell>
                                        <TableCell>
                                            {new Date(budget.startDate).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>
                                            {new Date(budget.endDate).toLocaleDateString()}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}

