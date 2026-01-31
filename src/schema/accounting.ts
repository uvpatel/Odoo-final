import {
    pgTable,
    uuid,
    varchar,
    boolean,
} from "drizzle-orm/pg-core";

/* ---------------- ACCOUNTING ---------------- */

export const analyticalAccounts = pgTable("analytical_accounts", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    code: varchar("code", { length: 50 }),
    active: boolean("active").default(true),
});

/* ---------------- INFER TYPES ---------------- */
// Add types here if needed, consistent with other files
export type InsertAnalyticalAccount = typeof analyticalAccounts.$inferInsert;
export type SelectAnalyticalAccount = typeof analyticalAccounts.$inferSelect;
