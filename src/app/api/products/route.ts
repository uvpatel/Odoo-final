import { requireAdmin } from "@/lib/guard";
import { db } from "@/db/db";
import { eq, getTableColumns } from "drizzle-orm";
import { products, vendors } from "@/schema";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    await requireAdmin();
    const data = await db
    .select({
        ...getTableColumns(products),
            vendorName: vendors.companyName,
        })
        .from(products)
        .leftJoin(vendors, eq(products.vendorId, vendors.id));
    return NextResponse.json(data);
}

export async function POST(req: Request) {
    await requireAdmin();
    const body = await req.json();
    const [p] = await db.insert(products).values(body).returning();
    return NextResponse.json(p);
}
