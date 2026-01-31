import {
    pgTable,
    uuid,
    varchar,
    text,
    integer,
    timestamp,
    boolean,
    numeric,
} from "drizzle-orm/pg-core";
import { vendors } from "./vendors";

/* ---------------- PRODUCTS ---------------- */

export const products = pgTable("products", {
    id: uuid("id").defaultRandom().primaryKey(),
    vendorId: uuid("vendor_id")
        .notNull()
        .references(() => vendors.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description"),
    basePrice: numeric("base_price", { precision: 10, scale: 2 }).notNull(),
    totalStock: integer("total_stock").default(1),
    active: boolean("active").default(true),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
});

/* ---------------- ATTRIBUTES ---------------- */

export const attributes = pgTable("attributes", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
});

export const attributeValues = pgTable("attribute_values", {
    id: uuid("id").defaultRandom().primaryKey(),
    attributeId: uuid("attribute_id")
        .notNull()
        .references(() => attributes.id, { onDelete: "cascade" }),
    value: varchar("value", { length: 100 }).notNull(),
});

/* ---------------- VARIANTS ---------------- */

export const productVariants = pgTable("product_variants", {
    id: uuid("id").defaultRandom().primaryKey(),
    productId: uuid("product_id")
        .notNull()
        .references(() => products.id, { onDelete: "cascade" }),
    priceModifier: numeric("price_modifier", { precision: 10, scale: 2 }).default("0"),
    stock: integer("stock").default(1),
});

export const variantAttributes = pgTable("variant_attributes", {
    id: uuid("id").defaultRandom().primaryKey(),
    variantId: uuid("variant_id")
        .notNull()
        .references(() => productVariants.id, { onDelete: "cascade" }),
    attributeValueId: uuid("attribute_value_id")
        .notNull()
        .references(() => attributeValues.id, { onDelete: "cascade" }),
});

/* ---------------- INFER TYPES ---------------- */

export type InsertProduct = typeof products.$inferInsert;
export type SelectProduct = typeof products.$inferSelect;

export type InsertAttribute = typeof attributes.$inferInsert;
export type SelectAttribute = typeof attributes.$inferSelect;

export type InsertAttributeValue = typeof attributeValues.$inferInsert;
export type SelectAttributeValue = typeof attributeValues.$inferSelect;

export type InsertProductVariant = typeof productVariants.$inferInsert;
export type SelectProductVariant = typeof productVariants.$inferSelect;

export type InsertVariantAttribute = typeof variantAttributes.$inferInsert;
export type SelectVariantAttribute = typeof variantAttributes.$inferSelect;
