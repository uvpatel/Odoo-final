import {
  pgTable,
  uuid,
  varchar,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

export const contacts = pgTable("contacts", {
  id: uuid("id").defaultRandom().primaryKey(),

  name: varchar("name", { length: 255 }).notNull(),

  email: varchar("email", { length: 255 }),

  phone: varchar("phone", { length: 50 }),

  type: varchar("type", { length: 50 }).notNull(), 
  // CUSTOMER | VENDOR

  isActive: boolean("is_active").default(true),

  createdAt: timestamp("created_at").defaultNow(),
});
