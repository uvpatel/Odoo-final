import { pgTable, uuid, varchar, numeric, date, timestamp } from "drizzle-orm/pg-core";
import { analyticalAccounts } from "./accounting";

export const budgets = pgTable("budgets", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),

  analyticalAccountId: uuid("analytical_account_id")
    .references(() => analyticalAccounts.id)
    .notNull(),

  amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),

  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),

  createdAt: timestamp("created_at").defaultNow(),
});
