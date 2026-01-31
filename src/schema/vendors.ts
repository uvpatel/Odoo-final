import {
    pgTable,
    uuid,
    varchar,
    timestamp,
} from "drizzle-orm/pg-core";
import { users } from "./users";

/* ---------------- VENDORS ---------------- */

export const vendors = pgTable("vendors", {
    id: uuid("id").defaultRandom().primaryKey(),
    ownerId: uuid("owner_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    companyName: varchar("company_name", { length: 255 }).notNull(),
    gstin: varchar("gstin", { length: 50 }),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
});

/* ---------------- INFER TYPES ---------------- */

export type InsertVendor = typeof vendors.$inferInsert;
export type SelectVendor = typeof vendors.$inferSelect;
