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


export const roles = ["ADMIN", "VENDOR", "CUSTOMER"] as const;
export const orderStatus = ["DRAFT", "SENT", "CONFIRMED"] as const;
export const invoiceStatus = ["DRAFT", "PAID", "PARTIAL"] as const;
export const paymentStatus = ["PENDING", "SUCCESS", "FAILED"] as const;


export const users = pgTable("usersTable", {
  id: uuid("id").defaultRandom().primaryKey(),
  clerkId: varchar("clerk_id", { length: 255 }).unique(), // Made optional
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),
  role: varchar("role", { length: 20 })
    .$type<(typeof roles)[number]>()
    .notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow(),
});