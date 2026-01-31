import {
    pgTable,
    uuid,
    varchar,
    integer,
    timestamp,
    numeric,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { products, productVariants } from "./products";

/* ---------------- ENUM HELPERS ---------------- */

export const orderStatus = ["DRAFT", "SENT", "CONFIRMED"] as const;

/* ---------------- QUOTATIONS ---------------- */

export const quotations = pgTable("quotations", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    status: varchar("status", { length: 20 }).default("DRAFT"),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
});

export const quotationItems = pgTable("quotation_items", {
    id: uuid("id").defaultRandom().primaryKey(),
    quotationId: uuid("quotation_id")
        .notNull()
        .references(() => quotations.id, { onDelete: "cascade" }),
    productId: uuid("product_id")
        .notNull()
        .references(() => products.id),
    variantId: uuid("variant_id")
        .references(() => productVariants.id),
    startDate: timestamp("start_date", { mode: "date" }).notNull(),
    endDate: timestamp("end_date", { mode: "date" }).notNull(),
    qty: integer("qty").default(1),
    price: numeric("price", { precision: 10, scale: 2 }),
});

/* ---------------- ORDERS ---------------- */

export const orders = pgTable("orders", {
    id: uuid("id").defaultRandom().primaryKey(),
    quotationId: uuid("quotation_id")
        .notNull()
        .references(() => quotations.id),
    userId: uuid("user_id")
        .notNull()
        .references(() => users.id),
    status: varchar("status", { length: 20 })
        .$type<(typeof orderStatus)[number]>()
        .default("DRAFT"),
    total: numeric("total", { precision: 12, scale: 2 }),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
});

export const orderItems = pgTable("order_items", {
    id: uuid("id").defaultRandom().primaryKey(),
    orderId: uuid("order_id")
        .notNull()
        .references(() => orders.id, { onDelete: "cascade" }),
    productId: uuid("product_id")
        .notNull()
        .references(() => products.id),
    variantId: uuid("variant_id").references(() => productVariants.id),
    startDate: timestamp("start_date", { mode: "date" }),
    endDate: timestamp("end_date", { mode: "date" }),
    qty: integer("qty"),
    price: numeric("price", { precision: 10, scale: 2 }),
});

/* ---------------- INFER TYPES ---------------- */

export type InsertQuotation = typeof quotations.$inferInsert;
export type SelectQuotation = typeof quotations.$inferSelect;

export type InsertQuotationItem = typeof quotationItems.$inferInsert;
export type SelectQuotationItem = typeof quotationItems.$inferSelect;

export type InsertOrder = typeof orders.$inferInsert;
export type SelectOrder = typeof orders.$inferSelect;

export type InsertOrderItem = typeof orderItems.$inferInsert;
export type SelectOrderItem = typeof orderItems.$inferSelect;
