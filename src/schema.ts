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

/* ---------------- ENUM HELPERS ---------------- */

export const roles = ["ADMIN", "VENDOR", "CUSTOMER"] as const;
export const orderStatus = ["DRAFT", "SENT", "CONFIRMED"] as const;
export const invoiceStatus = ["DRAFT", "PAID", "PARTIAL"] as const;
export const paymentStatus = ["PENDING", "SUCCESS", "FAILED"] as const;

/* ---------------- USERS ---------------- */

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  clerkId: varchar("clerk_id", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  role: varchar("role", { length: 20 })
    .$type<(typeof roles)[number]>()
    .notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
});

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

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export type InsertVendor = typeof vendors.$inferInsert;
export type SelectVendor = typeof vendors.$inferSelect;

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

export type InsertQuotation = typeof quotations.$inferInsert;
export type SelectQuotation = typeof quotations.$inferSelect;

export type InsertQuotationItem = typeof quotationItems.$inferInsert;
export type SelectQuotationItem = typeof quotationItems.$inferSelect;

export type InsertOrder = typeof orders.$inferInsert;
export type SelectOrder = typeof orders.$inferSelect;

export type InsertOrderItem = typeof orderItems.$inferInsert;
export type SelectOrderItem = typeof orderItems.$inferSelect;

export type InsertReservation = typeof reservations.$inferInsert;
export type SelectReservation = typeof reservations.$inferSelect;

export type InsertPickup = typeof pickups.$inferInsert;
export type SelectPickup = typeof pickups.$inferSelect;

export type InsertReturn = typeof returns.$inferInsert;
export type SelectReturn = typeof returns.$inferSelect;

export type InsertInvoice = typeof invoices.$inferInsert;
export type SelectInvoice = typeof invoices.$inferSelect;

export type InsertInvoiceItem = typeof invoiceItems.$inferInsert;
export type SelectInvoiceItem = typeof invoiceItems.$inferSelect;

export type InsertPayment = typeof payments.$inferInsert;
export type SelectPayment = typeof payments.$inferSelect;
