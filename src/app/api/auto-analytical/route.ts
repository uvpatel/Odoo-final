import { NextResponse } from "next/server";
import { db } from "@/db/db";
import { requireAdmin } from "@/lib/guard";
import { eq } from "drizzle-orm";
import { analyticalAccounts, products, autoAnalyticalModels } from "@/schema";

export async function GET(req: Request) {
    await requireAdmin(req.headers);

    const data = await db
        .select({
            id: autoAnalyticalModels.id,
            name: autoAnalyticalModels.name,
            priority: autoAnalyticalModels.priority,
            matchCategory: autoAnalyticalModels.matchCategory,
            analyticalAccountName: analyticalAccounts.name,
            matchProductName: products.name,
        })
        .from(autoAnalyticalModels)
        .leftJoin(
            analyticalAccounts,
            eq(autoAnalyticalModels.analyticalAccountId, analyticalAccounts.id)
        )
        .leftJoin(products, eq(autoAnalyticalModels.matchProductId, products.id));
    return NextResponse.json(data);
}

export async function POST(req: Request) {
    await requireAdmin(req.headers);

    const body = await req.json();
    const [created] = await db.insert(autoAnalyticalModels).values(body).returning();

    return NextResponse.json(created);
}
