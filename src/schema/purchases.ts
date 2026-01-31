import { pgTable, uuid, varchar, numeric, timestamp, integer, date } from "drizzle-orm/pg-core";
import { vendors } from "./vendors";
import { products, productVariants } from "./products";
import { analyticalAccounts } from "./accounting";

export const purchaseOrders = pgTable("purchase_orders", {
    id: uuid("id").defaultRandom().primaryKey(),
    vendorId: uuid("vendor_id").references(() => vendors.id).notNull(),
    status: varchar("status", { length: 20 }).default("DRAFT"), // DRAFT, SENT, CONFIRMED
    total: numeric("total", { precision: 12, scale: 2 }),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const purchaseOrderItems = pgTable("purchase_order_items", {
    id: uuid("id").defaultRandom().primaryKey(),
    purchaseOrderId: uuid("purchase_order_id").references(() => purchaseOrders.id, { onDelete: "cascade" }).notNull(),
    productId: uuid("product_id").references(() => products.id).notNull(),
    variantId: uuid("variant_id").references(() => productVariants.id),
    qty: integer("qty").notNull().default(1),
    price: numeric("price", { precision: 10, scale: 2 }).notNull(),
    analyticalAccountId: uuid("analytical_account_id").references(() => analyticalAccounts.id),
});

export const vendorBills = pgTable("vendor_bills", {
    id: uuid("id").defaultRandom().primaryKey(),
    purchaseOrderId: uuid("purchase_order_id").references(() => purchaseOrders.id),
    vendorId: uuid("vendor_id").references(() => vendors.id).notNull(),
    billDate: date("bill_date").notNull(),
    status: varchar("status", { length: 20 }).default("DRAFT"), // DRAFT, POSTED, PAID
    total: numeric("total", { precision: 12, scale: 2 }),
    createdAt: timestamp("created_at").defaultNow(),
});

export const vendorBillItems = pgTable("vendor_bill_items", {
    id: uuid("id").defaultRandom().primaryKey(),
    vendorBillId: uuid("vendor_bill_id").references(() => vendorBills.id, { onDelete: "cascade" }).notNull(),
    description: varchar("description", { length: 255 }),
    amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
    analyticalAccountId: uuid("analytical_account_id").references(() => analyticalAccounts.id),
});
