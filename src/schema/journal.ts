import {
  pgTable,
  uuid,
  varchar,
  numeric,
  date,
  timestamp,
} from "drizzle-orm/pg-core";
import { analyticalAccounts } from "@/schema";
import { contacts } from "@/schema/Contacts";

export const journalEntries = pgTable("journal_entries", {
  id: uuid("id").defaultRandom().primaryKey(),

  reference: varchar("reference", { length: 255 }), // INV-001, BILL-002

  analyticalAccountId: uuid("analytical_account_id")
    .references(() => analyticalAccounts.id)
    .notNull(),

  contactId: uuid("contact_id")
    .references(() => contacts.id),

  amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),

  type: varchar("type", { length: 20 }).notNull(), 
  // INCOME | EXPENSE

  status: varchar("status", { length: 20 }).default("DRAFT"), 
  // DRAFT | POSTED | CANCELLED

  date: date("date").notNull(),

  createdAt: timestamp("created_at").defaultNow(),
});
