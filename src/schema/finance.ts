import {
    pgTable,
    uuid,
    varchar,
    text,
    timestamp,
    numeric,
} from "drizzle-orm/pg-core";
import { orders } from "./sales";
import { analyticalAccounts } from "./accounting";

/* ---------------- ENUM HELPERS ---------------- */

export const invoiceStatus = ["DRAFT", "PAID", "PARTIAL"] as const;
export const paymentStatus = ["PENDING", "SUCCESS", "FAILED"] as const;

/* ---------------- INVOICES ---------------- */

export const invoices = pgTable("invoices", {
    id: uuid("id").defaultRandom().primaryKey(),
    orderId: uuid("order_id")
        .notNull()
        .references(() => orders.id, { onDelete: "cascade" }),
    status: varchar("status", { length: 20 })
        .$type<(typeof invoiceStatus)[number]>()
        .default("DRAFT"),
    subtotal: numeric("subtotal", { precision: 12, scale: 2 }),
    tax: numeric("tax", { precision: 12, scale: 2 }),
    total: numeric("total", { precision: 12, scale: 2 }),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
});

export const invoiceItems = pgTable("invoice_items", {
    id: uuid("id").defaultRandom().primaryKey(),
    invoiceId: uuid("invoice_id")
        .notNull()
        .references(() => invoices.id, { onDelete: "cascade" }),
    description: text("description"),
    amount: numeric("amount", { precision: 10, scale: 2 }),
    analyticalAccountId: uuid("analytical_account_id").references(() => analyticalAccounts.id),
});

/* ---------------- PAYMENTS ---------------- */

export const payments = pgTable("payments", {
    id: uuid("id").defaultRandom().primaryKey(),
    invoiceId: uuid("invoice_id")
        .notNull()
        .references(() => invoices.id, { onDelete: "cascade" }),
    stripeIntentId: varchar("stripe_intent_id", { length: 255 }),
    amount: numeric("amount", { precision: 12, scale: 2 }),
    status: varchar("status", { length: 20 })
        .$type<(typeof paymentStatus)[number]>()
        .default("PENDING"),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
});

/* ---------------- INFER TYPES ---------------- */

export type InsertInvoice = typeof invoices.$inferInsert;
export type SelectInvoice = typeof invoices.$inferSelect;

export type InsertInvoiceItem = typeof invoiceItems.$inferInsert;
export type SelectInvoiceItem = typeof invoiceItems.$inferSelect;

export type InsertPayment = typeof payments.$inferInsert;
export type SelectPayment = typeof payments.$inferSelect;
