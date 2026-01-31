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
import { Badge } from "@/components/ui/badge";

interface AutoAnalyticalModel {
    id: string;
    name: string;
    priority: number;
    matchCategory: string | null;
    analyticalAccountName: string | null;
    matchProductName: string | null;
}

export default function AutoAnalyticalModelPage() {
    const [models, setModels] = useState<AutoAnalyticalModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchModels = async () => {
            try {
                const response = await api.get("/auto-analytical");
                setModels(response.data);
            } catch (err) {
                setError("Failed to fetch analytical models");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchModels();
    }, []);

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center">
                <Loader2 className="mr-2 h-8 w-8 animate-spin" />
                Loading models...
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
                    <CardTitle>Auto Analytical Models</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Target Account</TableHead>
                                <TableHead>Match Product</TableHead>
                                <TableHead>Match Category</TableHead>
                                <TableHead>Priority</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {models.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center">
                                        No auto-analytical models found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                models.map((model) => (
                                    <TableRow key={model.id}>
                                        <TableCell className="font-medium">{model.name}</TableCell>
                                        <TableCell>{model.analyticalAccountName || "Unknown"}</TableCell>
                                        <TableCell>
                                            {model.matchProductName ? (
                                                <Badge variant="outline">{model.matchProductName}</Badge>
                                            ) : (
                                                <span className="text-muted-foreground">-</span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {model.matchCategory ? (
                                                <Badge variant="secondary">{model.matchCategory}</Badge>
                                            ) : (
                                                <span className="text-muted-foreground">-</span>
                                            )}
                                        </TableCell>
                                        <TableCell>{model.priority}</TableCell>
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

