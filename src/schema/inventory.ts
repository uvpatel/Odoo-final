import {
    pgTable,
    uuid,
    varchar,
    integer,
    timestamp,
    numeric,
} from "drizzle-orm/pg-core";
import { orderItems, orders } from "./sales";
import { products, productVariants } from "./products";

/* ---------------- RESERVATIONS ---------------- */

export const reservations = pgTable("reservations", {
    id: uuid("id").defaultRandom().primaryKey(),
    orderItemId: uuid("order_item_id")
        .notNull()
        .references(() => orderItems.id, { onDelete: "cascade" }),
    productId: uuid("product_id")
        .notNull()
        .references(() => products.id),
    variantId: uuid("variant_id").references(() => productVariants.id),
    startDate: timestamp("start_date", { mode: "date" }),
    endDate: timestamp("end_date", { mode: "date" }),
    qty: integer("qty"),
});

/* ---------------- PICKUP / RETURN ---------------- */

export const pickups = pgTable("pickups", {
    id: uuid("id").defaultRandom().primaryKey(),
    orderId: uuid("order_id")
        .notNull()
        .references(() => orders.id, { onDelete: "cascade" }),
    pickedAt: timestamp("picked_at", { mode: "date" }),
    status: varchar("status", { length: 20 }).default("PENDING"),
});

export const returns = pgTable("returns", {
    id: uuid("id").defaultRandom().primaryKey(),
    orderId: uuid("order_id")
        .notNull()
        .references(() => orders.id, { onDelete: "cascade" }),
    returnedAt: timestamp("returned_at", { mode: "date" }),
    lateFee: numeric("late_fee", { precision: 10, scale: 2 }).default("0"),
});

/* ---------------- INFER TYPES ---------------- */

export type InsertReservation = typeof reservations.$inferInsert;
export type SelectReservation = typeof reservations.$inferSelect;

export type InsertPickup = typeof pickups.$inferInsert;
export type SelectPickup = typeof pickups.$inferSelect;

export type InsertReturn = typeof returns.$inferInsert;
export type SelectReturn = typeof returns.$inferSelect;
