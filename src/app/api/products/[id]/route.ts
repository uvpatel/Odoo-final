import { NextResponse } from "next/server";
import { db } from "@/db/db";
import { products } from "@/schema";
import { eq } from "drizzle-orm";
import { requireAdmin } from "@/lib/guard";

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    await requireAdmin(req.headers);
    const { id } = await params;
    const body = await req.json();

    const result = await db
        .update(products)
        .set(body)
        .where(eq(products.id, id))
        .returning();

    return NextResponse.json(result[0]);
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    await requireAdmin(req.headers);
    const { id } = await params;

    const result = await db
        .delete(products)
        .where(eq(products.id, id))
        .returning();

    return NextResponse.json(result[0]);
}
