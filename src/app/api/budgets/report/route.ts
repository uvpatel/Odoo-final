import { NextResponse } from "next/server";
import { db } from "@/db/db";
import { budgets } from "@/schema/budget";
import { journalEntries } from "@/schema/journal";
import { eq, and, sql } from "drizzle-orm";
import { requireAdmin } from "@/lib/guard";

export async function GET(req: Request) {
  await requireAdmin(req.headers);

  const rows = await db
    .select({
      budgetId: budgets.id,
      name: budgets.name,
      budgetAmount: budgets.amount,

      actual: sql<number>`COALESCE(SUM(${journalEntries.amount}),0)`,
    })
    .from(budgets)
    .leftJoin(
      journalEntries,
      and(
        eq(journalEntries.analyticalAccountId, budgets.analyticalAccountId),
        eq(journalEntries.status, "POSTED")
      )
    )
    .groupBy(budgets.id);

  const result = rows.map(r => {
    const variance = Number(r.budgetAmount) - Number(r.actual);
    const achievement = (Number(r.actual) / Number(r.budgetAmount)) * 100;

    return {
      ...r,
      variance,
      achievement: Number.isFinite(achievement) ? achievement.toFixed(2) : "0.00",
    };
  });

  return NextResponse.json(result);
}
